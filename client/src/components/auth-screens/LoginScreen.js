import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './LoginScreen.css'

const LoginScreen = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginHandler = async (e) => {
        e.preventDefault()
        // define type(ở đây là json) cho header của request để nói với server là dữ liệu ở body của request(req.body)
        // sẽ được định dạng theo kiểu đó. khi đó req trả về, server sẽ check header đầu tiên để biết cách đọc dữ liệu trong body
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.post('/api/auth/login', { email, password }, config)

            localStorage.setItem('authToken', data.token)

            navigate('/home')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <div className="login-screen">
            <form onSubmit={loginHandler} className="login-screen__form">
                <h3 className="login-screen__title">
                    Login
                </h3>

                {error && <span className="error-message">{error}</span>}

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

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary ">Login</button>
                </div>

                <span className="login-screen__subtext">Don't have an account? <Link to='/register'>Register</Link></span>
            </form>
        </div>
    )
}

export default LoginScreen