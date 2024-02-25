import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from 'sweetalert'

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/comments`)
      .then((res) => res.json())
      .then((allComments) => {
        setComments(allComments);
        console.log(allComments);
      });
  }

  const removeComment = (commentID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
        title : 'آیا از حذف مطمئن هستید؟',
        icon : 'warning',
        buttons : ['نه','آره']
    }).then(result => {
        if(result) {
            fetch(`http://localhost:4000/v1/comments/${commentID}`, {
                method : 'DELETE',
                headers : {
                    Authorization : `Bearer ${localStorageData.token}`
                }
            }).then(res => {
                if(res.ok){
                    swal({
                        title : 'کامنت مورد نظر با موفقیت حذف شد',
                        icon : 'success',
                        buttons : 'تایید'
                    }).then(result => {
                        getAllComments()
                    })
                }
            })
        }
    })
  }
  const showCommentBody = (commentBody) => {
    swal({
        title : commentBody,
        buttons : 'تایید'
    })
  }
  return (
    <>
      <DataTable title="کامنت ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>دوره</th>
              <h>مشاهده</h>
              <th>پاسخ</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr>
                <td>{index + 1}</td>
                {/* <td>{comment.creator.name}</td> */}
                <td>{comment.course}</td>
                <td></td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn"
                  onClick={() => {showCommentBody(comment.body)}}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeComment(comment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                  >
                   بن
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
