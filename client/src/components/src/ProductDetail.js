import React from 'react'
import { useState } from 'react'
import { Container, Card, Row, Col, Button, Carousel, NavDropdown, Form, Nav } from 'react-bootstrap'
import { useOutletContext, useLocation, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const ProductDetail = () => {
    const slug = useLocation()
    let productId
    let userId
    let productManager
    let product
    let userAvatar
    const token = localStorage.getItem('authToken')
    token ? productId = slug.pathname.split('/home/product-detail/')[1] : productId = slug.pathname.split('/product-detail/')[1]

    const data = useOutletContext()
    const publicData = data[0]
    const productInfor = publicData[0]
    const userInfor = publicData[1]
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [commentData, setCommentData] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [postResponse, setPostResponse] = useState()
    const [error, setError] = useState(false)
    const date = Date.now()
    const btn = document.querySelector('.commentBtn-js')
    const inputComment = document.querySelector('.inputComment-js')

    useEffect(() => {
        if (comments.length === 0) {
            window.scrollTo(0, 0)
        } else {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [comments])
    // get product and shop manager
    if (productInfor !== undefined && comment === '') {
        product = productInfor.find(product => product._id === productId)
        productManager = userInfor.find(user => user.id === product.user)
        localStorage.setItem(`price${productId}`, product.price)
    }
    const [price, setPrice] = useState(localStorage.getItem(`price${productId}`))

    // set avatar comment
    if (token) {
        const privateData = data[1]
        userId = privateData._id
        userAvatar = privateData.avatar
    }

    // check if  available data to comment
    if (productInfor === undefined) {
        if (inputComment !== null) {
            inputComment.disabled = true
        }
    } else {
        if (inputComment !== null) {
            inputComment.disabled = false
        }
    }

    //disabled comment btn
    useEffect(() => {
        if (comment === null || comment === '') {
            if (btn !== null) {
                btn.disabled = true
            }
        } else {
            if (btn !== null) {
                btn.disabled = false
            }
        }
    }, [comment])

    // quantity handler
    useEffect(() => {
        const quantityInput = document.querySelector('.quantityHandler-js')
        if (quantityInput) {
            quantityInput.addEventListener('change', function (e) {
                setPrice(product.price * Number(e.target.value))
            })
        }
    }, [quantity])

    // pass product data to cart 
    const dataHandler = () => {
        console.log(product.amount);
        const productData = [{
            name: product.title,
            price,
            quantity,
            productId,
            img: product.images[0],
            amount: product.amount

        }]
        if (!localStorage.getItem(`productData${userId}`)) {
            localStorage.setItem(`productData${userId}`, JSON.stringify(productData))
        } else {
            const storedData = JSON.parse(localStorage.getItem(`productData${userId}`))
            const productCheck = storedData.find(data => data.productId === productId)
            if (productCheck) {
                const productDataa = [{
                    name: product.title,
                    price: Number(productCheck.price) + Number(price),
                    quantity: Number(productCheck.quantity) + Number(quantity),
                    productId,
                    img: product.images[0],
                    amount: product.amount
                }]
                const remainData = storedData.filter(data => data.productId !== productId)
                localStorage.setItem(`productData${userId}`, JSON.stringify([...productDataa, ...remainData]))
            } else {
                localStorage.setItem(`productData${userId}`, JSON.stringify([...productData, ...storedData]))
            }
        }
        localStorage.removeItem(`price${productId}`)
    }

    // buy handler
    const buyHandler = () => {
        const privateData = data[1]
        const productData = {
            name: product.title,
            price,
            quantity,
            productId,
            phone: privateData.phone,
            address: privateData.address,
            username: privateData.username,
            img: product.images[0],
            amount: product.amount
        }
        localStorage.setItem(`buy${userId}`, JSON.stringify(productData))
        localStorage.removeItem(`price${productId}`)
    }

    // get comment data
    useEffect(() => {
        if (productId !== null) {
            const getComments = async () => {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                try {
                    const { data } = await axios.get('/api/public/comments', { params: { productId } }, config)
                    if (data.data !== null) {
                        setCommentData(data.data.comments)
                    }
                } catch (error) {
                    setError(error.response.data.error)
                    setTimeout(() => {
                        setError("");
                    }, 5000);
                }
            }
            getComments()
        }
    }, [postResponse])

    //post comment data
    useEffect(() => {
        // post data
        if (userId !== undefined && comment !== '') {
            const postComments = async () => {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                try {
                    const { data } = await axios.post('/api/public/comments', {
                        productId,
                        comments: [{
                            userId,
                            userAvatar: userAvatar.name,
                            content: comment,
                            date: new Date(date).toString()
                        }],
                    },
                        config)
                    setPostResponse(data.data)
                    setComment('')
                } catch (error) {
                    setError(error.response.data.error)
                    setTimeout(() => {
                        setError("");
                    }, 5000);
                }
            }
            postComments()
        }
    }, [comments])

    // handle comment
    const commentHandler = async (e) => {
        e.preventDefault()
        setComments(prev => [...prev, comment])
    }


    return (
        <>
            <Container className='mt-70px mb-100px'>
                <div className='d-flex justify-content-center mb-4'>
                    <h2>PRODUCT DETAIL</h2>
                </div>
                {product !== undefined && (<Row>
                    <Col lg={5}>
                        <Card>
                            <Card.Body>
                                <Carousel >
                                    {product.images.map((image, index) => (
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
                                </Carousel>
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col lg={12}>
                                <Card className='mt-4 '>
                                    <Card.Body >
                                        <h3>Shop:</h3>
                                        {productManager === undefined ? (
                                            <h5>Anonymous..!</h5>
                                        ) :
                                            <div>
                                                <NavDropdown.Divider />
                                                <Nav.Link href='#' className='d-flex'>
                                                    <Card.Img className="rounded-circle navbar-avatar mx-3" alt="avatar" src={`data:${productManager.avatar.contentType};base64,${productManager.avatar.name}`} />
                                                    <Card.Text style={{ color: 'black' }}>{productManager.username}</Card.Text>
                                                </Nav.Link></div>}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={1}></Col>

                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    {product.subtitle}
                                </Card.Text>
                                <Row className='d-flex mb-3 align-items-center '>
                                    <Col lg={2}>
                                        <strong className='m-auto'>${price}</strong>
                                    </Col>
                                    <Col lg={3}>
                                        <Form.Control
                                            required
                                            type="number"
                                            min={1}
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                            className='quantityHandler-js'
                                        />
                                    </Col>
                                </Row>
                                <div className='my-3'>
                                    Quantity: <strong>{product.amount}</strong>
                                </div>
                                <Link to={token ? `/home/buy/${userId}` : '/login'}><Button variant="primary" onClick={buyHandler}>Buy</Button></Link>
                                <Link to={`/home/cart/${userId}`}><Button variant="primary" className='mx-4' onClick={dataHandler}>Add to cart</Button></Link>
                            </Card.Body>
                        </Card>

                        <Card className='mt-5'>
                            <Card.Body>
                                <Card.Title>
                                    Description:
                                </Card.Title>
                                <Card.Text>
                                    <strong>{product.description}</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>)}

                <Row className='mt-4'>
                    <Col lg={12}>
                        <Card>
                            <Card.Body>
                                <div className='mx-3'>
                                    <Card.Title>Comments</Card.Title>
                                </div>
                                <NavDropdown.Divider />
                                {error && <span variant='danger'>{error}</span>}

                                <Form onSubmit={commentHandler}>
                                    {
                                        commentData !== undefined && commentData.map((data, index) => (
                                            <Row className='mb-4 mt-3 d-flex align-items-center' key={index}>
                                                <Col lg={1} >
                                                    <Form.Group className='d-flex justify-content-end'>
                                                        <Card.Img alt='avatar' src={`data:image/jpeg;base64,${data.userAvatar}`} className="rounded-circle navbar-avatar " />
                                                    </Form.Group>
                                                </Col>

                                                <Col lg={9}>
                                                    <h5>{data.content}</h5>
                                                    <Form.Text muted>
                                                        {data.date}
                                                    </Form.Text>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                    {token ? (
                                        <>
                                            <Row className='d-flex align-items-center' >
                                                <Col lg={1} >
                                                    {userAvatar !== undefined &&
                                                        <Form.Group className='d-flex justify-content-end'>
                                                            <Card.Img alt='avatar' src={`data:${userAvatar.contentType};base64,${userAvatar.name}`} className="rounded-circle navbar-avatar " />
                                                        </Form.Group>}
                                                </Col>
                                                <Col lg={9}>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Control
                                                            as="textarea"
                                                            placeholder="Enter comemnt"
                                                            onChange={e => setComment(e.target.value)}
                                                            value={comment}
                                                            className='inputComment-js'
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={2} >
                                                    <Button variant="primary" type="submit" className='commentBtn-js' disabled>
                                                        Comment
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    ) :
                                        (<Row className='d-flex align-items-center' >
                                            <Col lg={1} >
                                            </Col>
                                            <Col lg={9}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Control as="textarea" placeholder="Enter comemnt" disabled />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={2} >
                                                <Button variant="primary" type="submit" disabled>
                                                    Comment
                                                </Button>
                                            </Col>
                                            <Row>
                                                <Col className='mt-4 d-flex justify-content-center'>
                                                    <Card.Text>You must login to comment
                                                        <Link to='/login'>
                                                            <Button className='mx-3'>Login</Button>
                                                        </Link>
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                        </Row>)}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductDetail