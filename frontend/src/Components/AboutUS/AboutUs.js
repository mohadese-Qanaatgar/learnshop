import React from 'react';
import './AboutUs.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import AboutUsBox from '../AboutUsBox/AboutUsBox';

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="container">
        <SectionHeader
          title="؟ما چه کمکی بهتون میکنیم"
          desc="این آکادمی آموزشی یک آکادمی خصوصی است."
          btnTitle=""
        />

        <div className="container">
          <div className="row">
            <AboutUsBox
              title="دوره های اختصاصی"
              desc="با پشتیبانی و کیفیت بالا ارائه میده!"
              icon={<i className="far fa-copyright about-us__icon"></i>}
            />
            <AboutUsBox
              title=" اجازه تدریس"
              desc="به هر مدرسی اجازه تدریس نمیده چون کیفیت براش مهمه."
              icon={<i class="fas fa-leaf about-us__icon"></i>}
            />
            <AboutUsBox
              title="دوره پولی و رایگان"
              desc="براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در
                    پشتیبانی و اپدیت دوره ارائه بده"
              icon={<i class="fas fa-gem about-us__icon"></i>}
            />
            <AboutUsBox
              title="اهمیت به کاربر"
              desc="
                    اولویت اول و آخر آکادمی آموزش برنامه نویسی اهمیت به
                    کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار
                    "
              icon={<i class="fas fa-crown about-us__icon"></i>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
