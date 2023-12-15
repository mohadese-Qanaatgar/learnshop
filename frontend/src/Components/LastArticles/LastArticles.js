import React from 'react';
import './LastArticles.css';
import SectionHeader from '../SectionHeader/SectionHeader';

export default function LastArticles() {
  return (
    <section class="articles">
      <div class="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
        />
      </div>
    </section>
  );
}
