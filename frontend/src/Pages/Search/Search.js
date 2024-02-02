import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import "./Search.css";
import { useParams } from "react-router-dom";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

export default function Search() {
  const [courses, setCourese] = useState([]);
  const [articles, setArticles] = useState([]);

  const { value } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((allData) => {
        setCourese(allData.allResultCourses);
        setArticles(allData.allResultArticles);
        console.log(allData);
      });
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="courses">
        <div className="container">
          <div className="row">
            <SectionHeader
              title="نتیجه دوره ها برای جستجو"
              desc="سکوی پرتاب شما به سوی موفقیت"
              btnTitle=""
              btnHref=""
            />
            {courses.length === 0 ? (
              <div className="alert alert-warning">
                دوره ای برای جستجوی شما وجود ندارد
              </div>
            ) : (
              <>
                {courses.map((course) => (
                  <CourseBox key={course._id} {...course} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="courses">
        <div className="container">
          <div className="row">
            <SectionHeader
              title="نتیجه مقالات برای جستجوی شما"
              desc="پیش به سوی ارتقای دانش"
              btnTitle=""
              btnHref=""
            />
            {articles.length === 0 ? (
              <div className="alert alert-warning">
                مقاله ای برای جستجوی شما وجود ندارد
              </div>
            ) : (
              <>
                {articles.map((article) => (
                  <ArticleBox
                    key={article._id}
                    {...article}
                    cover="/images/blog/3.jpg"
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
