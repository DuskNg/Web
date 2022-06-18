import { Carousel, Container, Nav, Row, Col, Card, Form, Button, OverlayTrigger, Popover, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { Link, useOutletContext } from 'react-router-dom'


const Home = () => {
    const data = useOutletContext()
    const publicData = data[0]
    const productInfor = publicData[0]

    const token = localStorage.getItem('authToken')
    let userId
    if (token) {
        const privateData = data[1]
        userId = privateData._id
    }
    const cart = JSON.parse(localStorage.getItem(`productData${userId}`))
    
    return (
        <>
            <Container className='mt-70px'>
                <Row>
                    <Col lg={8}>
                        <Form>
                            <Form.Group className="mb-3 d-flex align-items-center justify-content-between" controlId="formBasicEmail">
                                <Form.Label className='mb-0'>Search</Form.Label>
                                <Form.Control type="text" placeholder="Search product" className='w-89' />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col lg={4} className='mb-3'>
                        <>
                            <OverlayTrigger
                                trigger="click"
                                placement='bottom'
                                overlay={
                                    <Popover id={'popover-positioned-bottom'} style={{ width: '18rem' }}>
                                        <Popover.Header as="h3"> Shopping Cart</Popover.Header>
                                        {token ? (
                                            <Popover.Body className='d-flex flex-column'>
                                                {(cart !== null) && cart.map((data, index) => (
                                                    <Link to={`/home/cart/${userId}`} key={index}>
                                                        <Card className='mt-1'>
                                                            <Card.Body className='d-flex flex-row align-items-center'>
                                                                <Card.Img style={{ width: '1.5rem' }} src={`data:image/jpeg;base64,${data.img}`} className='mx-2' />
                                                                <Card.Text><strong>{data.name}</strong></Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Link>
                                                ))
                                                }
                                                {(cart === null || cart.length === 0) && <strong className='mx-auto'>You have nothing in cart</strong>}
                                            </Popover.Body>
                                        )
                                            : (
                                                <Popover.Body className='d-flex flex-column'>
                                                    Bạn chưa đăng nhập, vui lòng bấm đăng nhập để xem giỏ hàng.
                                                    <Link to='/login'>
                                                        <Button className='w-50 mt-3 '>Đăng nhập</Button>
                                                    </Link>
                                                </Popover.Body>
                                            )}
                                    </Popover>
                                }
                            >
                                <div className='d-flex justify-content-center h-100 align-items-center'><FaShoppingCart size='2em' color='#aeafb1' /></div>
                            </OverlayTrigger>
                        </>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className='flex-sm-md-column-reverse'>
                    <Col sm={12} lg={8}>
                        <div className='Carousel-wrap'>
                            <Carousel>
                                <Carousel.Item className='Carousel-item'>
                                    <img className="d-block w-100" src="https://s.meta.com.vn/img/thumb.ashx/Data/image/2022/01/13/anh-dep-thien-nhien-5.jpg" alt="First slide" />
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item className='Carousel-item'>
                                    <img className="d-block w-100" src="https://s.meta.com.vn/img/thumb.ashx/Data/image/2022/01/13/anh-dep-thien-nhien-4.jpg" alt="Second slide" />

                                    <Carousel.Caption>
                                        <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item className='Carousel-item'>
                                    <img className="d-block w-100" src="https://s.meta.com.vn/img/thumb.ashx/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg" alt="Third slide" />
                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>

                        </div>
                    </Col>

                    <Col sm={12} lg={4} className='mb-2'>
                        <Card className='h-100'>
                            <div>intro..</div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className="border-top mt-3">
                <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/home">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/home">item 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/home">item 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/home">item 3</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/home">item 4</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>

            <Container className='mb-5'>
                <Row>
                    <Col lg={3} className='hide-on-xs' >
                        <Card>
                            <div>Category</div>
                        </Card>
                    </Col>

                    <Col lg={9} sm={12}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    {productInfor !== undefined && productInfor.map((product, index) => (
                                        <Col lg={4} key={index}>
                                            <Card className='mt-3'>

                                                <Card.Img variant="top" src={`data:image/jpeg;base64,${product.images[0]}`} key={index} />
                                                <Card.Body className="d-flex justify-content-center flex-column">
                                                    <Card.Title>{product.title}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">{product.subtitle}</Card.Subtitle>
                                                    <NavDropdown.Divider />
                                                    <Card.Text className="mt-2">
                                                        Price: ${product.price}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Amount: {product.amount}
                                                    </Card.Text>
                                                    <div className="mx-auto mt-2">
                                                        <Link to={token ? `/home/product-detail/${product._id}` : `product-detail/${product._id}`}>
                                                            <Button variant="primary" type="submit" style={{ width: '10rem' }}>
                                                                <strong>Detail</strong>
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home