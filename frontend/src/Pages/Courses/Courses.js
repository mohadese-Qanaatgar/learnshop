import React from 'react'
import './Courses.css'
import Topbar from '../../Components/Topbar/Topbar';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import CourseBox from '../../Components/CourseBox/CourseBox'
import Pagination from '../../Components/Pagination/Pagination'


export default function Courses() {
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
                        <CourseBox
                        title='متخصص جنکو'
                        teacher='محمد محمدی'
                        price='1,500,000'
                        users='500'
                        />
                        <CourseBox
                        title='متخصص جنکو'
                        teacher='محمد محمدی'
                        price='1,500,000'
                        users='500'
                        />
                        <CourseBox
                        title='متخصص جنکو'
                        teacher='محمد محمدی'
                        price='1,500,000'
                        users='500'
                        />
                        <CourseBox
                        title='متخصص جنکو'
                        teacher='محمد محمدی'
                        price='1,500,000'
                        users='500'
                        />
                        <CourseBox
                        title='متخصص جنکو'
                        teacher='محمد محمدی'
                        price='1,500,000'
                        users='500'
                        />
                        <CourseBox
                        title='متخصص جنکو'
                        teacher='محمد محمدی'
                        price='1,500,000'
                        users='500'
                        />
                        <CourseBox
                        title='متخصص جنکو'
                        teacher='محمد محمدی'
                        price='1,500,000'
                        users='500'
                        />
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
