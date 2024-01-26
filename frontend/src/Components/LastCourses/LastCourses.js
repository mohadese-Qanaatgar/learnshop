import React, { useEffect, useState } from 'react';
import './LastCourses.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import CourseBox from '../CourseBox/CourseBox';

export default function LastCourses() {
  const [courses , setCourses] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/v1/courses').then(res => res.json())
    .then(allCourses => {
      setCourses(allCourses)
    })
  },[])
  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاب شما به سوی موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref={'courses'}
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.splice(0,6).map((course) => (
                <CourseBox {...course}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
