import { NavDropdown, Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navigation.css'

const Navigation = ({ data }) => {
    const [checkAvatar, setCheckAvatar] = useState(false)
    const { username, avatar, gender } = data
    const avatarAnonymous = (gender === 'male') ? "https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png" :
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS80DuVaw5L6H3gt9grflJKGishVPNRvTesqh93ki0qXDq0BbUys7R99lUvyQUbeUB7ZD4&usqp=CAU"

    useEffect(() => {
        if (avatar !== undefined) {
            if (Object.keys(avatar).length !== 0) {
                setCheckAvatar(true)
            }
        }
    }, [avatar])

    return (
        <Navbar bg="light" expand="lg" className='fixed-top'>
            <Container>
                <Navbar.Brand href="/home">WEBSITE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Link to='/home/product' >
                            <Button>Product Management</Button>
                        </Link>
                    </Nav>

                    <Nav className='ms-auto d-flex align-items-center'>
                        <Link to='/home/profile'>
                            <img className="rounded-circle navbar-avatar" alt="avatar" src={checkAvatar === true ? `data:${avatar.contentType};base64,${avatar.name}` : avatarAnonymous} />
                        </Link>

                        <NavDropdown title={username ? username : 'User'} id="basic-nav-dropdown" className="">
                            <div className='d-flex flex-column'>
                                <Link to='/home/profile' className='profileDropDown'>Profile</Link>
                                <Link to='#' className='profileDropDown'>Settings</Link>
                            </div>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/login" onClick={() => localStorage.removeItem('authToken')}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation