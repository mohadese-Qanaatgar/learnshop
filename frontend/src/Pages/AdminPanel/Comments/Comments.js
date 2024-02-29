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
        // console.log(allComments);
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

  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از بن مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت بن شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
                getAllComments()
            })
          }
        });
      }
    });
  }
  const answerToComment = (commentID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title : 'لطفا پاسخ مورد نظر را وارد کنید',
      content : 'input',
      buttons : 'ثبت'
    }).then(answerText => {
      if(answerText) {
        const commentAnswer = {
          body : answerText
        }
        fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${localStorageData.token}`
          },
          body : JSON.stringify(commentAnswer)
        }).then(res => {
          if(res.ok){
           swal({
            title : 'پاسخ شما ثبت شد',
            icon : 'success',
            buttons : 'تایید'
           }).then(() => {
            getAllComments()
           })
          }
        })
      }
    })
  }
  const acceptComment = (commentID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title : 'آیا از تایید مطمئن هستید',
      icon : 'warning',
      buttons : ["نه" , "آره"]
    }).then(result => {
      if(result) {
        fetch(`http://localhost:4000/v1/comments/accept/${commentID}`,{
          method : 'PUT',
          headers : {
            Authorization : `Bearer ${localStorageData.token}`
          }
        }).then(res => {
          if(res.ok){
            swal({
              title : 'کامنت مورد نظر با موفقیت تایید شد',
              icon : 'success',
              buttons : "تایید"
            }).then(() => {
              getAllComments()
            })
          }
        })
      }
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
              <th>تایید</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr>
                <td
                className={comment.answer === 1 ? 'answer-comment' : 'no-answer-comment'}
                >{index + 1}</td>
                <td>{comment.creator.name}</td>
                <td>{comment.course}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn"
                  onClick={() => {showCommentBody(comment.body)}}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn"
                  onClick={() => answerToComment(comment._id)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn"
                  onClick={() => acceptComment(comment._id)}
                  >
                   تایید
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
                    onClick={() => banUser(comment.creator._id)}
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
