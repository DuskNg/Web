import React from 'react'
import { Card, Container, Row, Col, Carousel, Form, Button } from 'react-bootstrap'
import { useOutletContext, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProductUpdate = () => {
    const navigate = useNavigate()
    const data = useOutletContext()
    const publicData = data[0]
    const productInfor = publicData[0]
    const slug = useLocation()
    const productId = slug.pathname.split('/home/product-update/')[1]
    let product

    if (productInfor !== undefined) {
        product = productInfor.find(product => {
            if (product._id === productId) {
                return product
            }
            return null
        })
    }

    if (!localStorage.getItem(`product${productId}`)) {
        localStorage.setItem(`product${productId}`, JSON.stringify(product))
    }
    // useEffect(() => {
    //     if (product !== undefined) {
    //         const checkUpdateProduct = JSON.stringify(product) === localStorage.getItem(`product${productId}`)
    //         console.log(checkUpdateProduct);
    //         if (!checkUpdateProduct) {
    //             localStorage.removeItem(`product${productId}`)
    //             localStorage.setItem(`product${productId}`, JSON.stringify(product))
    //             window.location.reload()
    //         }
    //     }
    // }, [product])

    const storeProduct = JSON.parse(localStorage.getItem(`product${productId}`))

    const [title, setTitle] = useState(storeProduct.title)
    const [subtitle, setSubtitle] = useState(storeProduct.subtitle)
    const [description, setDescription] = useState(storeProduct.description)
    const [price, setPrice] = useState(storeProduct.price)
    const [amount, setAmount] = useState(storeProduct.amount)
    const [category, setCategory] = useState(storeProduct.category)
    const [images, setImages] = useState(storeProduct.images)
    const [error, setError] = useState(false)
    const [changeImage, setChangeImage] = useState(null)


    const updateProductHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('id', storeProduct._id)
        formData.append('title', title)
        formData.append('subtitle', subtitle)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('price', price)
        formData.append('amount', amount)

        images.forEach(image => {
            formData.append('images', image)
        })
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                transformRequest: formdata => formdata,
            }
            await axios.put('/api/public', formData, config)
            localStorage.removeItem(`product${productId}`)
            navigate('/home/product-list')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("");
            }, 5000);
        }

    }

    const updateImageHandler = (e) => {
        const imgs = Array.from(e.target.files)  //convert fileList to array
        setImages(imgs)
        setChangeImage(true)
    }

    return (
        <Container className='mt-70px mb-5'>
            {error && <span>{error}</span>}
            <Row>
                <Col lg={12}>
                    <div className='d-flex justify-content-center mb-4'>
                        <h2>PRODUCT UPDATE</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4} >
                    <Card className='position-fixed' style={{ width: '20rem' }}>
                        <Card.Body >
                            {changeImage === null ? (
                                <Carousel >
                                    {images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="Carousel-image mx-auto" >
                                                <img
                                                    className="d-block w-100"
                                                    src={`data:image/jpeg;base64,${image}`}
                                                    alt='anh 1'
                                                />
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>) : (
                                <Carousel >
                                    {images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="Carousel-image imageUpload-js " >
                                                <Card.Img className="d-block w-100"
                                                    src={URL.createObjectURL(image)}
                                                    alt='anh' />
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )}

                            <Form.Label htmlFor="addImageProduct-id" className="addImageProduct mb-0 mx-auto">
                                <Card>
                                    <Card.Body>
                                        <strong>Change</strong>
                                    </Card.Body>
                                </Card>
                            </Form.Label>
                            <Form.Control type="file" id='addImageProduct-id' className="d-none" multiple="multiple" onChange={updateImageHandler} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={1}></Col>

                <Col lg={7}>
                    <Card>
                        <Card.Body>
                            <Form className="mt-3 d-flex justify-content-center flex-column" onSubmit={updateProductHandler}>
                                <Form.Group className="mb-3" controlId="Text">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder='Enter title'
                                        value={title}
                                        onChange={e => setTitle(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Text">
                                    <Form.Label>SubTitle:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder='Enter subtitle'
                                        value={subtitle}
                                        onChange={e => setSubtitle(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Textarea">
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        placeholder='Enter description'
                                        value={description || ''}
                                        onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Amount:</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder='Enter amount'
                                        min={10} max={10000}
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Checkbox">
                                    <Form.Label>Category:</Form.Label>
                                    <div className="d-flex justify-content-around">
                                        <div className="d-flex">
                                            <Form.Check required type="radio" className="mx-2" value='pant' name="category" onClick={e => setCategory(e.target.value)} />
                                            <Form.Check.Label>Pant</Form.Check.Label>
                                        </div>

                                        <div className="d-flex">
                                            <Form.Check required type="radio" className="mx-2" value='shirt' name="category" onClick={e => setCategory(e.target.value)} />
                                            <Form.Check.Label>Shirt</Form.Check.Label>
                                        </div>

                                        <div className="d-flex">
                                            <Form.Check required type="radio" className="mx-2" value='shoes' name="category" onClick={e => setCategory(e.target.value)} />
                                            <Form.Check.Label>Shoes</Form.Check.Label>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Label>Price($):</Form.Label>
                                    <Form.Control required type="number" placeholder='Enter price' onChange={e => setPrice(e.target.value)} value={price} />
                                </Form.Group>

                                <div className="mx-auto mt-3">
                                    <Button variant="primary" type="submit" style={{ width: '15rem' }}>
                                        <strong>Update</strong>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}



export default ProductUpdate