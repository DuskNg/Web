import React from 'react'
import { useState } from 'react';
import { Button, Container, Table, NavDropdown, Modal, Form } from 'react-bootstrap'
import { Link, useOutletContext } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    //reload page one time
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
    const [publicData, privateData] = useOutletContext()
    const productInfor = publicData[0]
    const [show, setShow] = useState(false)

    const [productId, setProductId] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const userId = privateData._id
    let countIndex = 0

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log(productId);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            await axios.delete('/api/public', { data: { productId } }, config)
            navigate('/home/product-list')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    return (
        <>
            <Container className='mb-5 d-flex flex-column mt-70px abc'>
                {error !== false && <span variant='danger'>SomeThing Wrong...</span>}
                <h1>Product List</h1>
                <NavDropdown.Divider />

                <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Price</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productInfor !== undefined && productInfor.map((product, index) => {
                                if (product.user === userId) {
                                    return (<tr key={index}>
                                        <td>{++countIndex}</td>
                                        <td>{product.title}</td>
                                        <td>{product.amount} </td>
                                        <td>${product.price}</td>
                                        <td>{product.createdAt}</td>
                                        <td>
                                            <Link to={`/home/product-update/${product._id}`}>
                                                <Button>Update</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button variant='danger' onClick={() => (setShow(true), setProductId(product._id))} className='DeleteBtn-js'>Delete</Button>
                                        </td>
                                    </tr>)
                                }
                            })}

                        </tbody>
                    </Table>
                </div>
                <div className='mt-3 mx-auto'>
                    <Link to='/home/add-product'>
                        <Button>Add product</Button>
                    </Link>
                </div>
            </Container>

            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Would you like to delete it?</Modal.Body>
                <Modal.Footer>
                    <Form onSubmit={handleDelete}>
                        <Button variant="danger" type='submit'>
                            Delete
                        </Button>
                    </Form>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}


export default ProductList