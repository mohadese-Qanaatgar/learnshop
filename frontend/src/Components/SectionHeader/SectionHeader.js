import React from 'react';
import './SectionHeader.css';

export default function SectionHeader() {
  return (
    <div class="courses-header">
      <div class="courses-header__right">
        <span class="courses-header__title title">جدیدترین دوره ها</span>
        <span class="courses-header__text">سکوی پرتاپ شما به سمت موفقیت</span>
      </div>
      <div class="courses-header__left">
        <a href="#" class="courses-header__link">
          تمامی دوره ها
          <i class="fas fa-arrow-left courses-header__icon"></i>
        </a>
      </div>
    </div>
  );
}
