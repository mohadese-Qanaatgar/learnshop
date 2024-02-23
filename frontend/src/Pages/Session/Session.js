import React, { useEffect } from 'react'
import Topbar from '../../Components/AdminPanel/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { useParams } from 'react-router'

export default function Session() {
    const {courseName , sessionID} = useParams()

    useEffect(() => {} ,[])

  return (
    <>
    <Topbar/>
    <Navbar/>

    <Footer/>
    </>
  )
}
