import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card, Col, Row, Container, NavDropdown, ListGroup, Button, Modal, Form, CloseButton } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import './Profile.css'


const Profile = () => {
    const data = useOutletContext()
    const privateData = data[1]
    const { _id, username, email, gender, phone, address, avatar } = privateData

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [checkAvatar, setCheckAvatar] = useState(false)
    const avatarAnonymous = (gender === 'male' ? "https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png" :
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS80DuVaw5L6H3gt9grflJKGishVPNRvTesqh93ki0qXDq0BbUys7R99lUvyQUbeUB7ZD4&usqp=CAU")

    // Modal update profile
    const [updateUsername, setUpdateUsername] = useState('')
    const [updatePhone, setUpdatePhone] = useState('')
    const [updateAddress, setUpdateAddress] = useState('')
    const [error, setError] = useState('')

    const updateProfileHandler = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        try {
            await axios.put('/api/private/update', { username: updateUsername, phone: updatePhone, address: updateAddress }, config)
            window.location.reload()
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    // Modal upload avatar
    const [image, setImage] = useState(null)
    
    const upLoadImageHandler = async (e) => {
        const formdata = new FormData()
        formdata.append('image', image)
        
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
            transformRequest: formdata => formdata,
        }
        try {
            await axios.post('/api/private/upload', formdata, config,)
            
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    
    const handleFile = (e) => {
        var img = document.getElementById('img');
        img.src = URL.createObjectURL(e.target.files[0]);
        img.onload = function () {
            URL.revokeObjectURL(img.src) // free memory
        }
        setImage(e.target.files[0])
    }
    
    useEffect(() => {
        if (avatar !== undefined) {
            if (Object.keys(avatar).length !== 0) {
                setCheckAvatar(true)
            }
        }
    }, [avatar])

    useEffect(() => {
        const updateBtnHandler = async () => {
            if (showUpdateModal === true && _id) {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    },
                }
                try {
                    const { data } = await axios.get('/api/private/userData', config)
                    setUpdateUsername(data.data.username)
                    setUpdatePhone(data.data.phone)
                    setUpdateAddress(data.data.address)
                } catch (error) {

                }
            }
        }
        updateBtnHandler()
    }, [showUpdateModal])
    return (
        <>
            <Container className='mt-70px'>
                <Row >
                    <Col lg={3}>
                        <Card className='w-100 h-100 mt-3'>
                            <Form className='d-flex flex-column'>
                                <img className="rounded-circle w-50 mx-auto my-3" alt="avatar" src={checkAvatar === true ? `data:${avatar.contentType};base64,${avatar.name}` : avatarAnonymous} />
                                <Button onClick={() => setShowUploadModal(true)} className='w-50 mx-auto mt-3'>Upload</Button>
                            </Form>

                            <NavDropdown.Divider />
                            <Card.Body className='mx-auto'>
                                <Card.Title >{username}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={9}>
                        <Card className='w-100 h-100 mt-3'>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item ><strong>Username: </strong>{username}</ListGroup.Item>
                                    <ListGroup.Item ><strong>Email: </strong> {email}</ListGroup.Item>
                                    <ListGroup.Item ><strong>Phone:</strong> {phone ? phone : "Not update yet!"}</ListGroup.Item>
                                    <ListGroup.Item ><strong>Adress: </strong> {address ? address : "Not update yet!"}</ListGroup.Item>
                                </ListGroup>

                                <div className='d-flex justify-content-end mt-3' >
                                    <Button onClick={() => setShowUpdateModal(true)}>
                                        Update
                                    </Button>
                                </div>
                            </Card.Body>

                        </Card>

                    </Col>
                </Row>
            </Container>

            <Modal
                show={showUpdateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Information Update
                    </Modal.Title>
                    <CloseButton onClick={() => setShowUpdateModal(false)} />
                </Modal.Header>
                <Modal.Body>
                    {error && <span className="error-message">{error}</span>}
                    <Form onSubmit={updateProfileHandler} className='mt-3'>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={updateUsername} onChange={e => setUpdateUsername(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3"  >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" disabled placeholder={email} />
                            <Form.Text className="text-muted">
                                Email can not be changed!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Add phone number" value={updatePhone} onChange={e => setUpdatePhone(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Add address" value={updateAddress} onChange={e => setUpdateAddress(e.target.value)} />
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button type='submit'>Update</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal
                show={showUploadModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Avatar update
                    </Modal.Title>
                    <CloseButton onClick={() => setShowUploadModal(false)} />
                </Modal.Header>


                <Modal.Body>
                    <Form className='d-flex flex-column' onSubmit={upLoadImageHandler}>
                        <div className='wrap w-50 mx-auto'>
                            <Card.Img variant="top" src={checkAvatar === true ? `data:${avatar.contentType};base64,${avatar.name}` : avatarAnonymous} className='rounded-circle profileImage-upload' id='img' />
                        </div>

                        <NavDropdown.Divider />
                        <div className='d-flex w-50 mt-3 mx-auto '>
                            <Form.Control type='file' onChange={handleFile} name='image' />
                            <Button type='submit' className='mx-2 w-100'> Save</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Profile