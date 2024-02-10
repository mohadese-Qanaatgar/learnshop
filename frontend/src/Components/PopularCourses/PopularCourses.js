import React, { useEffect, useState } from 'react';
import './PopularCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from "../CourseBox/CourseBox";

export default function PopularCourses() {
  
  const [popularCourses , setPopularCourses] =useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/popular`)
    .then(res => res.json())
    .then(allPopularCourses => {
      // console.log(allPopularCourses);
      setPopularCourses(allPopularCourses)
    })
  } ,[])
  console.log(popularCourses);
  return (
    <div class="popular">
      <div class="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="بهترین دوره ها براساس انتخاب شما"
          btnTitle=''
        />
         <div className="courses-content">
          <div className="container">
            <div className="row">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="mySwiper"
              >
                {popularCourses.map((course) => (
                  <SwiperSlide>
                    <CourseBox {...course} isSlider={true}/>
                    </SwiperSlide>

                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
