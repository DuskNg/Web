import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Col, Container, NavDropdown, Row, Modal } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Buy = () => {
  const slug = useLocation()
  const userId = slug.pathname.split('/home/buy/')[1]
  const data = JSON.parse(localStorage.getItem(`buy${userId}`))
  const [showModal, setShowModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [error, setError] = useState()

  const buyHandler = async () => {
    const products = JSON.parse(localStorage.getItem(`productData${userId}`))
    const remainAmount = Number(data.amount) - Number(data.quantity)
    const productId = data.productId
    if (products) {
      const reaminProduct = products.filter(product => product.productId !== data.productId)
      localStorage.removeItem(`productData${userId}`)
      data.amount = remainAmount
      localStorage.setItem(`productData${userId}`, JSON.stringify(reaminProduct))
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      await axios.post('/api/public/updateAmount', { remainAmount, productId }, config)
      setShowModal(false)
      setShowSuccessModal(true)
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => {
        setError("");
      }, 5000);
    }

  }

  return (
    <>
      <Container className='mt-70px'>
        <div className='d-flex justify-content-center mb-4'>
          <h2>BUY CONFIRM</h2>
        </div>
        {error && <span variant='danger'>{error}</span>}
        <Row className='mt-3'>
          <Col lg={5}>
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Img alt='productImg' src={`data:image/jpeg;base64,${data.img}`} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={1}></Col>

          <Col lg={6}>
            <Card>
              <Card.Body>
                <div className='d-flex justify-content-center mb-1'>
                  <h4>Product</h4>
                </div>
                <Card.Title><strong>{data.name}</strong></Card.Title>
                <Card.Text>Quantity: <strong>{data.quantity}</strong></Card.Text>
                <Card.Text>Price: $<strong>{data.price}</strong></Card.Text>
                <NavDropdown.Divider />
                <div className='d-flex justify-content-center mb-1'>
                  <h4>BUYER</h4>
                </div>
                <Card.Title> <strong>{data.username}</strong></Card.Title>
                <Card.Text>Phone: <strong>{data.phone}</strong></Card.Text>
                <Card.Text>Address: <strong>{data.address}</strong></Card.Text>
                <NavDropdown.Divider />
                <div className='d-flex justify-content-center'>
                  <Button className='mt-2' onClick={() => setShowModal(true)}>Confirm</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Buying..</Modal.Title>
        </Modal.Header>
        <Modal.Body>Click 'Buy' to confirm an order!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={buyHandler}>
            Buy
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>

        </Modal.Footer>

      </Modal>
      <Modal show={showSuccessModal} >
        <Modal.Header>
          <Modal.Title>Your order has been placed successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <a href='/home'>
            <Button variant="primary">
              Home
            </Button>
          </a>
          <Link to={`/home/cart/${userId}`}>
            <Button variant="primary">
              Cart
            </Button></Link>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Buy