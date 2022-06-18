import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navigation from '../src/Navigation';
import { useOutletContext } from 'react-router-dom';

const PrivateScreen = () => {
  const getPublicData = useOutletContext()
  const [error, setError] = useState('')
  const [getPrivateData, setGetPrivateData] = useState({})

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      }
      try {
        const { data } = await axios.get('/api/private', config)

        if (data.data) {
          setGetPrivateData(data.data)

        }
      } catch (error) {
        localStorage.removeItem('authToken')
        setError('You are not authorized, please Login')
      }
    }

    fetchPrivateData()
  }, [])
  
  return error ? <>
    <span className='error-message'>{error}</span>
    <Link to='/login'><Button className='mx-auto d-flex justify-content-center'>Login</Button></Link></>
    : (
      <>
        <Navigation data={getPrivateData} />
        <Outlet context={[getPublicData, getPrivateData,]} />
      </>

    )
}


export default PrivateScreen