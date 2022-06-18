import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Product.css'
import { FaPlusCircle } from 'react-icons/fa'

const Product = () => {
    return (
        <>
            <Container className='mt-30vh'>
                <Row>
                    <Col lg={6} sm={12} >
                        <Card style={{ width: '18rem' }} className='m-auto card-height'>
                            <Card.Body className='d-flex justify-content-center flex-column'>
                                <h1 className='mx-auto'> Product List</h1>

                                <div className='m-auto'>
                                    <Link to='/home/product-list'>
                                        <Button className='btn-detailItems'><h3>Detail</h3></Button>
                                    </Link>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6} sm={12} >
                        <Card style={{ width: '18rem' }} className='m-auto card-height'>
                            <Card.Body className='d-flex justify-content-center flex-column'>
                                <h1 className='mx-auto'> Add Product</h1>

                                <div className='m-auto'>
                                    <Link to='/home/add-product'>
                                        <Button className='btn-detailItems'><FaPlusCircle size='3em'/></Button>
                                    </Link>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </>
    )
}

export default Product