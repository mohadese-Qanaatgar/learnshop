import React from 'react';
import './CourseInfo.css';
import Topbar from '../../Components/Topbar/Topbar';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';

export default function CourseInfo() {
  return (
    <>
      <Topbar />
      <Navbar />
      <BreadCrump
        links={[
          { id: 1, title: 'خانه', to: '/' },
          {
            id: 2,
            title: 'آموزش برنامه نویس فرانت اند',
            to: '/category-info/frontend',
          },
          {
            id: 3,
            title: 'دوره متخصص جاوااسکریپت',
            to: '/course-info/js-expert',
          },
        ]}
      />
      <Footer />
    </>
  );
}
