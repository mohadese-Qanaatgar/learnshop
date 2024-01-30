import React, { useEffect, useState } from "react";
import "./PreSellCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from "../CourseBox/CourseBox";

export default function PreSellCourses() {

  const [preSellCourses ,setPreSellCourses] =useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/presell`)
    .then(res => res.json())
    .then(allPresellCourses => {
      // console.log(allPresellCourses);
      setPreSellCourses(allPresellCourses)
    })
  } ,[])
  return (
    <div class="presell">
      <div class="container">
        <SectionHeader title="دوره های پیش فروش" btnTitle="" />
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
                {preSellCourses.map((course) => (
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
