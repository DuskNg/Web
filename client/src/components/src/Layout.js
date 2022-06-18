
import { Container, NavDropdown, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom';
import './Layout.css'

const Layout = () => {
    const getPublicData = useOutletContext()
    if (localStorage.getItem('authToken')) {
        localStorage.removeItem('authToken')
    }
    return (
        <>
            <Navbar bg="light" expand="lg" className='fixed-top'>
                <Container>
                    <Navbar.Brand href="/home">WEBSITE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className='ms-auto d-flex align-items-center'>
                            <Link to='/home/profile'>
                                <img className="rounded-circle navbar-avatar" alt="avatar" src="https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png" />
                            </Link>
                            <NavDropdown title="User" id="basic-nav-dropdown" className="">
                                <NavDropdown.Item href="/home/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/#more">More</NavDropdown.Item>
                            </NavDropdown>
                            <div className='d-flex'>
                                <Nav.Link href="/register">Đăng kí</Nav.Link>
                                <Nav.Link href="/login">Đăng nhập</Nav.Link></div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet context={[getPublicData]} />

        </>
    )
}


export default Layout