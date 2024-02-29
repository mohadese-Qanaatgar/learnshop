import React, { useEffect, useState } from "react";
import "./Articles.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import BreadCrump from "../../Components/BreadCrump/BreadCrump";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import Pagination from "../../Components/Pagination/Pagination";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [shownArticles, setShownArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        // console.log(allArticles);
        setArticles(allArticles);
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
            title: "تمامی مقاله ها",
            to: "/articles/1",
          },
        ]}
      />
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownArticles.filter(article => article.publish === 1).map((article) => (
                  <ArticleBox {...article} cover="/images/blog/3.jpg" />
                ))}
                <Pagination
                  items={articles}
                  itemsCount={3}
                  pathname="/articles"
                  setShownCourses={setShownArticles}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
