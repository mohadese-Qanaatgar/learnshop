import React, { useEffect, useState } from "react";
import "./ArticleInfo.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import BreadCrump from "../../Components/BreadCrump/BreadCrump";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import { useParams } from "react-router-dom";
import domPurify from "dompurify";

export default function ArticleInfo() {
  const [articleDetailes, setArticleDetailes] = useState([]);
  const [articleCategory, setArticleCategory] = useState([]);
  const [articleCreator, setArticleCreator] = useState([]);
  const [articleCreatedAt, setArticleCreatedAt] = useState([]);
  const { articleName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then((res) => res.json())
      .then((articleInfo) => {
        console.log(articleInfo);
        setArticleDetailes(articleInfo);
        setArticleCategory(articleInfo.categoryID);
        setArticleCreator(articleInfo.creator);
        setArticleCreatedAt(articleInfo.createdAt);
      });
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />
      <BreadCrump
        links={[
          { id: 1, title: "خانه", to: "/" },
          {
            id: 2,
            title: "مقاله ها",
            to: "/category-info/frontend",
          },
          {
            id: 3,
            title: "ویو vs ریکت",
            to: "/course-info/js-expert",
          },
        ]}
      />
      <main class="main">
        <div class="container">
          <div class="row">
            <div class="col-8">
              <div class="article">
                <h1 class="article__title">{articleDetailes.title}</h1>
                <div class="article__header">
                  <div class="article-header__category article-header__item">
                    <i class="far fa-folder article-header__icon"></i>
                    <a href="#" class="article-header__text">
                      {articleCategory.title}
                    </a>
                  </div>
                  <div class="article-header__category article-header__item">
                    <i class="far fa-user article-header__icon"></i>
                    <span class="article-header__text">
                      ارسال شده توسط {articleCreator.name}
                    </span>
                  </div>
                  <div class="article-header__category article-header__item">
                    <i class="far fa-eye article-header__icon"></i>
                    <span class="article-header__text">
                      تاریخ انتشار :{articleCreatedAt.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <img
                  src="/images/blog/1.jpg"
                  alt="Article Cover"
                  class="article__banner"
                />
                <div class="article__score">
                  <div class="article__score-icons">
                    <img
                      src="/images/svgs/star_fill.svg"
                      class="article__score-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      class="article__score-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      class="article__score-icon"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      class="article__score-icon"
                    />
                    <img
                      src="/images/svgs/star.svg"
                      class="article__score-icon"
                    />
                  </div>
                  <span class="article__score-text">4.2/5 - (5 امتیاز)</span>
                </div>

                <p class="article__paragraph paragraph">
                  جاوا اسکریپت یکی از زبان‌های برنامه‌نویسی اصلی حوزه فرانت‌اند
                  است که به واسطه فریم ورک‌های آن می‌توان انواع وب سایت‌ها،
                  اپلیکیشن‌ها و وب اپلیکیشن‌ها را طراحی کرد. به طور کلی بعد از
                  یادگیری html و css معمولاً باید آموزش جاوا اسکریپت را نیز فرا
                  بگیرید. . چرا که این زبان تکمیل‌کننده html و css بوده و در
                  چنین شرایطی موقعیت‌های شغلی بیشتر را در اختیار خواهید داشت و
                  همچنین می‌توانید پروژه‌های گسترده‌تری را انجام دهید. در حال
                  حاضر با وجود منابع رایگان موجود در وب شما به راحتی می‌توانید
                  زبان جاوا اسکریپت را به صورت حرفه‌ای فرا بگیرید. به همین واسطه
                  در ادامه مطلب قصد داریم سایت‌های شاخص آموزش این زبان
                  برنامه‌نویسی در جهان را به شما معرفی کنیم و در آخر بگوییم که
                  بهترین سایت آموزش جاوا اسکریپت کدام است.
                </p>
                <div class="article-read">
                  <span class="article-read__title">
                    آنچه در این مقاله خواهید خواند
                  </span>
                  <ul class="article-read__list">
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">
                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                      </a>
                    </li>
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">
                        یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!
                      </a>
                    </li>
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">
                        ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:
                      </a>
                    </li>
                  </ul>
                </div>
                <img
                  src="/images/blog/2.jpg"
                  alt="Article Image"
                  class="article__seconadary-banner"
                />
                <div
                  class="article-section"
                  // dangerouslySetInnerHTML={{
                  //   __html: domPurify.sanitize(articleDetailes.body)
                  // }}
                >
                  {/* <h2 class="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p class="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p> */}
                  <img
                    src="/images/blog/3.jpg"
                    alt="article body img"
                    class="article-section__img"
                  />
                </div>
                <div class="article-social-media">
                  <span class="article-social-media__text">اشتراک گذاری :</span>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-telegram-plane article-social-media__icon"></i>
                  </a>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-twitter article-social-media__icon"></i>
                  </a>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-facebook-f article-social-media__icon"></i>
                  </a>
                </div>
                <div class="suggestion-articles">
                  <div class="row">
                    <div class="col-6">
                      <div class="suggestion-articles__right suggestion-articles__content">
                        <a href="#" class="suggestion-articles__icon-link">
                          <i class="fas fa-arrow-right suggestion-articles__icon"></i>
                        </a>
                        <a href="#" class="suggestion-articles__link">
                          سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                          تجربه برنامه نویسان
                        </a>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="suggestion-articles__left suggestion-articles__content">
                        <a href="#" class="suggestion-articles__icon-link">
                          <i class="fas fa-arrow-left suggestion-articles__icon"></i>
                        </a>
                        <a href="#" class="suggestion-articles__link">
                          سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                          تجربه برنامه نویسان
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <CommentsTextArea /> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
