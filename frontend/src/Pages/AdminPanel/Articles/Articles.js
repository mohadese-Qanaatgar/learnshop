import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
   getAllArticles()
  }, []);

  function getAllArticles () {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles);
      });
  }

  const removeArticle = (articleID) => {
    swal({
      title : 'آیا از حذف مطمئن هستید',
      icon : 'warning',
      buttons: ["نه", "آره"],
    }).then(result => {
      if(result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        fetch(`http://localhost:4000/v1/articles/${articleID}`,{
          method : 'DELETE',
          headers : {
            Authorization : `Bearer ${localStorageData.token}`
          }
        }).then(res => {
          if(res.ok) {
            swal({
              title : 'مقاله با موفقیت حذف شد',
              icon : 'success',
              buttons : 'تایید'
            }).then(() => {
              getAllArticles()
            })
          }
        })
      }
    })
  }
  return (
    <>
      <DataTable title="مقاله ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeArticle(article._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
