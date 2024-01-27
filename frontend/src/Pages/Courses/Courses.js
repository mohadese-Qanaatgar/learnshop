import React, { useEffect, useState } from 'react'
import './Courses.css'
import Topbar from '../../Components/Topbar/Topbar';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import CourseBox from '../../Components/CourseBox/CourseBox'
import Pagination from '../../Components/Pagination/Pagination'


export default function Courses() {

  const [courses , setCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
    .then(res => res.json())
    .then(allCourses => setCourses(allCourses))
  } ,[])

  return (
    <>
    <Topbar/>
    <Navbar/>
    <BreadCrump
        links={[
          { id: 1, title: 'خانه', to: '/' },
          {
            id: 2,
            title: 'دوره ها',
            to: '/courses',
          },
         
        ]}
      />
      <section className='courses'>
        <div className='container'>
            <div className='courses-content'>
                <div className='container'>
                    <div className='row'>
                      {courses.map(course => (
                        <CourseBox {...course}/>
                      ))}
                        <Pagination/>
                    </div>
                </div>
            </div>
        </div>
      </section>
    <Footer/>
    </>
  )
}
