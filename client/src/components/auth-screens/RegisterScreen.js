import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import './RegisterScreen.css'

const RegisterScreen = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)


    const registerHandler = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                setError('')
            }, 5000);
            return setError('Confirm password Failure!')
        }
        try {
            const { data } = await axios.post('/api/auth/register', { username, email, gender, password }, config)

            localStorage.setItem('authToken', data.token)

            setShowModal(true)

        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    return (
        <>
            <div className="register-screen">
                <form onSubmit={registerHandler} className="register-screen__form">
                    <h3 className="register-screen__title">
                        Register
                    </h3>
                    {error && <span className="error-message">{error}</span>}
                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input
                            type="text"
                            required
                            id="name"
                            placeholder="Enter Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            required
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <Form.Label>Gender:</Form.Label>
                    <div className="mb-3 d-flex justify-content-around">
                        <Form.Check
                            type='radio'
                            label='Male'
                            value='male'
                            name="group1"
                            onClick={e => setGender(e.target.value)}

                        />
                        <Form.Check
                            type='radio'
                            label='Female'
                            value='female'
                            name="group1"
                            onClick={e => setGender(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            required
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm">Confirm Password:</label>
                        <input
                            type="password"
                            required
                            id="confirm"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Register</button>

                    </div>
                    {showModal && <ShowModal />}
                    <span className="register-screen__subtext">Already have an account? <Link to='/login'>Login</Link></span>
                </form>
            </div>
        </>
    )
}

const ShowModal = () => {
    const navigate = useNavigate()
    return (
        <Modal show size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Đăng kí thành công!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn đã đăng kí tài khoản thành công, vui lòng bấm đăng nhập!</p>

            </Modal.Body>
            <Modal.Footer className="flex-row flex-nowrap">
                <Button className="p-2 w-50" onClick={() => navigate('/login')}>Login</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default RegisterScreen