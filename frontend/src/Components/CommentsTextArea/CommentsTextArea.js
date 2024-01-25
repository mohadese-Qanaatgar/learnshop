import React, { useContext } from "react";
import AuthContext from "../../Context/authContext";
import "./CommentsTextArea.css";
import { Link } from "react-router-dom";

export default function CommentsTextArea({ comments }) {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  return (
    <>
      {authContext.isLoggedIn ? (
        <div className="comments">
          <span className="comments__title">دیدگاهتان را بنویسید</span>
          <span className="comments__text">
            <a href="#">با عنوان محدثه قناعت گر راد وارد شده اید.</a>
            <a href="#">خارج میشوید? </a>
            بخش های موردنیاز علامت گذاری شده اند *
          </span>
          <div git Name="comments_content">
            <span className="comments__content-title">دیدگاه *</span>
            <textarea className="comments__content-textarea"></textarea>
          </div>
          <button type="submit" className="comments__button">
            فرستادن دیدگاه
          </button>
        </div>
      ) : (
        <div className="alert alert-danger">
          برای ثبت کامنت باید
          <Link to="/login">لاگین کنید</Link>
        </div>
      )}
    </>
  );
}
