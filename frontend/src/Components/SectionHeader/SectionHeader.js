import React from 'react';
import './SectionHeader.css';

export default function SectionHeader({ title, desc, btnTitle }) {
  return (
    <div className="courses-header">
      <div className="courses-header__right">
        <span className="courses-header__title title">{title}</span>
        <span className="courses-header__text">{desc}</span>
      </div>
      {btnTitle.length !== 0 ? (
        <div className="courses-header__left">
          <a href="#" className="courses-header__link">
            {btnTitle}
            <i className="fas fa-arrow-left courses-header__icon"></i>
          </a>
        </div>
      ) : null}
    </div>
  );
}
