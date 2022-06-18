import { Link, Outlet } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const PublicScreen = () => {
    const [error, setError] = useState('')
    const [getPublicData, setGetPublicData] = useState([])

    useEffect(() => {
        const fetchPublicData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            try {
                const { data } = await axios.get('/api/public', config)
                setGetPublicData(data.data)            
            } catch (error) {
                setError(error.response.data.error)
                setTimeout(() => {
                    setError("");
                }, 5000);
            }
        }
        fetchPublicData()
    }, [])
    
        return (
            error ? <>
                <span className='error-message'>{error}</span>
                <Link to='/login'><Button className='mx-auto d-flex justify-content-center'>Login</Button></Link></> : (

                <>
                    <Outlet context={getPublicData} />
                </>
            )
        )
    }




export default PublicScreen