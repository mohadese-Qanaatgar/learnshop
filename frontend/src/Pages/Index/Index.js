import React from 'react'
import './Index.css'
import Header from '../../Components/Header/Header'
import LastCourses from '../../Components/LastCourses/LastCourses'
import AboutUs from '../../Components/AboutUS/AboutUs'
import PopularCourses from '../../Components/PopularCourses/PopularCourses'
import PreSellCourses from '../../Components/PreSellCourses/PreSellCourses'
import LastArticles from '../../Components/LastArticles/LastArticles'
import Footer from '../../Components/Footer/Footer'

export default function Index() {
  return (
    <>
    <Header/>
    <LastCourses/>
    <AboutUs/>
    <PopularCourses/>
    <PreSellCourses/>
    <LastArticles/>
    <Footer/>
    </>
  )
}
