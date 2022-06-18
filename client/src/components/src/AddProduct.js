import axios from 'axios'
import { useState } from "react"
import { Form, Button, Container, Card, Row, Col, NavDropdown, Carousel } from "react-bootstrap"
import { FaPlus } from 'react-icons/fa'
import './AddProduct.css'
import { useNavigate } from 'react-router-dom'



const AddProduct = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('Product Title')
    const [subtitle, setSubtitle] = useState('Product Subtitle')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(100)
    const [amount, setAmount] = useState(200)
    const [category, setCategory] = useState('')
    const [images, setImages] = useState(null)
    const [error, setError] = useState(null)
    const [dataError, setDataError] = useState(false)

    //submit form
    const addProductHandler = async (e) => {
        e.preventDefault()

        if (!images || images.length === 0) {
            return setError('We need at least 1 image!')

        } else {
            const formdata = new FormData()
            formdata.append('title', title)
            formdata.append('subtitle', subtitle)
            formdata.append('description', description)
            formdata.append('category', category)
            formdata.append('price', price)
            formdata.append('amount', amount)
            formdata.append('token', localStorage.getItem('authToken'))

            images.forEach(image => {
                formdata.append('images', image)
            })

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                transformRequest: formdata => formdata,
            }

            try {
                const freeMemory = document.querySelectorAll('.imageUpload-js')
                freeMemory.onload = function () {
                    URL.revokeObjectURL(freeMemory.src) // free memory
                }

                //post data
                await axios.post('/api/public', formdata, config)

                navigate('/home/product-list')
            }
            catch (error) {
                setDataError(error.response.data.error)
                setTimeout(() => {
                    setDataError("");
                }, 5000);
            }

        }
    }
    // upload images
    const handleImage = (e) => {
        const imgs = Array.from(e.target.files)  //convert fileList to array
        if (imgs.length > 3) {
            setError('Maximum: 3 images')
            setTimeout(() => {
                setError(false)
            }, 5000);

        } else {
            setImages(imgs)
            setError(null)
        }

    }

    return (
        <Container className="mb-5 mt-70px ">
            <Row>
                <Col lg={6}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-center">
                                <h3>Add a Product</h3>
                            </div>
                            <Form className="mt-3 d-flex justify-content-center flex-column" onSubmit={addProductHandler}>
                                <Form.Group className="mb-3" controlId="Text">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Text">
                                    <Form.Label>SubTitle:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter subtitle"
                                        value={subtitle}
                                        onChange={e => setSubtitle(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Textarea">
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        placeholder="Enter Description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Amount:</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Enter amount(min = 10 products)"
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
                                    <Form.Control required type="number" placeholder="Enter Price" onChange={e => setPrice(e.target.value)} value={price} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Image(maximum: 3):</Form.Label>
                                    <Card>
                                        <Card.Body>
                                            <Row className="d-flex justify-content-around">
                                                {(images === null || images.length === 0) ? (
                                                    <Col lg={3} md={3} sm={3}>
                                                        <Card className="mb-0">
                                                            <Form.Label htmlFor="addImageProduct-id" className="addImageProduct mb-0">
                                                                <FaPlus color="hwb(0deg 52% 45%)" />
                                                            </Form.Label>
                                                            <Form.Control type="file" id='addImageProduct-id' className="d-none" multiple="multiple" onChange={handleImage} />
                                                        </Card>
                                                    </Col>
                                                ) : ((images.map((image, index) => (
                                                    <Col lg={3} md={3} sm={3} key={index}>
                                                        <Form.Label className="image-frame" htmlFor='addImageProduct-id'>
                                                            <Card.Img variant="top" src={URL.createObjectURL(image)} id='img' className="imageUpload imageUpload-js" />
                                                        </Form.Label>
                                                        <Form.Control type="file" id='addImageProduct-id' className="d-none" multiple="multiple" onChange={handleImage} name='images' />
                                                    </Col>
                                                ))))
                                                }
                                                {error !== null && <strong style={{ color: 'red' }}>{error}</strong>}
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Form.Group>

                                <div className="mx-auto mt-3">
                                    <Button variant="primary" type="submit" style={{ width: '15rem' }}>
                                        <strong>Add</strong>
                                    </Button>
                                </div>
                            </Form>
                            {dataError && <span>{dataError}</span>}
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={2}>
                </Col>

                <Col lg={4}>
                    <Card style={{ width: '18rem' }} className='position-fixed'>
                        {(images === null || images.length === 0) ?
                            (<Card.Img variant="top" src="https://thumbs.dreamstime.com/b/cartoon-tee-shirt-black-white-line-retro-style-vector-available-37025604.jpg" />)
                            :
                            (
                                <Carousel>
                                    {images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="Carousel-image imageUpload-js">
                                                <img
                                                    className="d-block w-100"
                                                    src={URL.createObjectURL(image)}
                                                />
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )
                        }
                        <NavDropdown.Divider />
                        <Card.Body className="d-flex justify-content-center flex-column">
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
                            <NavDropdown.Divider />
                            <Card.Text className="mt-2">
                                Price: ${price}
                            </Card.Text>
                            <Card.Text>
                                Amount: {amount}
                            </Card.Text>
                            <div className="mx-auto mt-2">
                                <Button variant="primary" type="submit" style={{ width: '15rem' }}>
                                    <strong>Detail</strong>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AddProduct