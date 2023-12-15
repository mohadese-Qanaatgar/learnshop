import React from 'react';
import './PopularCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader';

export default function PopularCourses() {
  return (
    <div class="popular">
      <div class="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="بهترین دوره ها براساس انتخاب شما"
          btnTitle=''
        />
      </div>
    </div>
  );
}
