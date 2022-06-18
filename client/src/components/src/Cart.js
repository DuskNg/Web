import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Modal } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useOutletContext } from 'react-router-dom'

const Cart = () => {
    const navigate = useNavigate()
    const data = useOutletContext()
    const privateData = data[1]
    const slug = useLocation()
    const userId = slug.pathname.split('/home/cart/')[1]
    const productData = JSON.parse(localStorage.getItem(`productData${userId}`))
    const [productId, setProductId] = useState()
    const [getId, setGetId] = useState()
    const [showModal, setShowModal] = useState(false)
    let countIndex = 1

    const deleteHandler = () => {
        const remainProductData = productData.filter(data => data.productId !== productId)
        localStorage.removeItem(`productData${userId}`)
        localStorage.setItem(`productData${userId}`, JSON.stringify(remainProductData))
        setShowModal(false)
    }

    useEffect(() => {
        if (getId && privateData) {
            const product = productData.find(data => data.productId === getId)
            product.phone = privateData.phone
            product.address = privateData.address
            product.username = privateData.username
            localStorage.setItem(`buy${userId}`, JSON.stringify(product))
            console.log(product);
            navigate(`/home/buy/${userId}`)
        }
    }, [getId])

    return (
        <>
            <Container className='mt-70px'>
                <div className='d-flex justify-content-center mb-4'>
                    <h2>SHOPPING CART</h2>
                </div>

                <Table hover className='my-3'>
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{ width: "22%" }}>Name</th>
                            <th style={{ width: "22%" }}>Quantity</th>
                            <th style={{ width: "22%" }}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData !== null && productData.map((data, index) => (
                            <tr key={index}>
                                <td>{countIndex++}</td>
                                <td>{data.name}</td>
                                <td>{data.quantity}</td>
                                <td>${data.price}</td>
                                <td><Link to={`/home/product-detail/${data.productId}`}>
                                    <Button className='px-3'>Detail</Button></Link>
                                    <Button className='px-4 mx-3' onClick={() => setGetId(data.productId)}>Buy</Button>
                                    <Button onClick={() => { return (setProductId(data.productId), setShowModal(true)) }} className='deleteBtn-js'>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {(productData === null || productData.length === 0) && (
                    <div className='d-flex align-items-center justify-content-center mt-4'>
                        <strong>Not product yet, click here</strong>
                        <a href='/home'><Button className='mx-2'>Home</Button></a>
                    </div>
                )}
            </Container>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>Delete?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Would you like to delete it?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteHandler}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal></>
    )
}

export default Cart