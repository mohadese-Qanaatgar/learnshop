import React from 'react';
import './LastCourses.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import CourseBox from '../CourseBox/CourseBox';

export default function LastCourses() {
  return (
    <>
      <div class="courses">
        <div class="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاب شما به سوی موفقیت"
            btnTitle="تمامی دوره ها"
          />
          <div class="courses-content">
            <div class="container">
              <div class="row">
                <CourseBox
                  title="دوره پروژه محور متخصص جنگو"
                  teacher="رضا دولتی"
                  users='500'
                  price='1,000,000'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
