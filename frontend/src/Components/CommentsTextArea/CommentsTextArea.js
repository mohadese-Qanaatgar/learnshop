import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/authContext";

import "./CommentsTextArea.css";

export default function CommentsTextArea({ comments, submitComment }) {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [commentScore , setCommentScore] = useState('-1')
  const authContext = useContext(AuthContext);

  const onChangeHandler = (event) => {
    setNewCommentBody(event.target.value);
  };

  return (
    <div class="comments">
      <div class="comments__header">
        <div class="comments__header-icon-content">
          <i class="comments__header-icon far fa-comment"></i>
        </div>
        <span class="comments__header-title">نظرات</span>
      </div>
      <div class="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <>
                <div class="comments__item">
                  <div class="comments__question">
                    <div class="comments__question-header">
                      <div class="comments__question-header-right">
                        <span class="comments__question-name comment-name">
                          {comment.creator.name}
                        </span>
                        <span class="comments__question-status comment-status">
                          {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                        </span>
                        <span class="comments__question-date comment-date">
                          {comment.createdAt.slice(0, 10)}
                        </span>
                      </div>
                      <div class="comments__question-header-left">
                        <a
                          class="comments__question-header-link comment-link"
                          href="#"
                        >
                          پاسخ
                        </a>
                      </div>
                    </div>
                    <div class="comments__question-text">
                      <p class="comments__question-paragraph comment-paragraph">
                        {comment.body}
                      </p>
                    </div>
                    {
                      comment.answerContent && (
                        <div class="comments__item">
                        <div class="comments__question">
                          <div class="comments__question-header">
                            <div class="comments__question-header-right">
                              <span class="comments__question-name comment-name">
                                {comment.answerContent.creator.name}
                              </span>
                              <span class="comments__question-status comment-status">
                                {comment.answerContent.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                              </span>
                              <span class="comments__question-date comment-date">
                                {comment.answerContent.createdAt.slice(0, 10)}
                              </span>
                            </div>
                            <div class="comments__question-header-left">
                              <a
                                class="comments__question-header-link comment-link"
                                href="#"
                              >
                                پاسخ
                              </a>
                            </div>
                          </div>
                          <div class="comments__question-text">
                            <p class="comments__question-paragraph comment-paragraph">
                              {comment.answerContent.body}
                            </p>
                          </div>
                        </div>
                      </div>  
                      )
                    }
                  </div>
                </div>
              </>
            ))}
            <div class="comments__pagantion">
              <ul class="comments__pagantion-list">
                <li class="comments__pagantion-item">
                  <a href="#" class="comments__pagantion-link">
                    <i class="fas fa-long-arrow-alt-right comments__pagantion-icon"></i>
                  </a>
                </li>
                <li class="comments__pagantion-item">
                  <a href="#" class="comments__pagantion-link">
                    1
                  </a>
                </li>
                <li class="comments__pagantion-item">
                  <a href="#" class="comments__pagantion-link">
                    2
                  </a>
                </li>
                <li class="comments__pagantion-item">
                  <a
                    href="#"
                    class="comments__pagantion-link comments__pagantion-link--active"
                  >
                    3
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {authContext.isLoggedIn === true ? (
        <>
          <div class="comments__rules">
            <span class="comments__rules-title">قوانین ثبت دیدگاه</span>
            <span class="comments__rules-item">
              <i class="fas fa-check comments__rules-icon"></i>
              اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش
              انلاین استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
            </span>
            <span class="comments__rules-item">
              <i class="fas fa-check comments__rules-icon"></i>
              دیدگاه های نامرتبط به دوره تایید نخواهد شد.
            </span>
            <span class="comments__rules-item">
              <i class="fas fa-check comments__rules-icon"></i>
              سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
            </span>
            <span class="comments__rules-item">
              <i class="fas fa-check comments__rules-icon"></i>
              از درج دیدگاه های تکراری پرهیز نمایید.
            </span>
          </div>
          <div class="comments__respond">
            <div class="comments__score">
              <span class="comments__score-title">امتیاز شما</span>
              {/* <div class="comments__score-input">
                <span class="comments__score-input-text">
                  امتیاز خود را انتخاب کنید
                </span>
                <i class="fas fa-angle-down	 comments__input-icon"></i>
              </div> */}
              <div className='col-12'>               
              <select className="form-select form-control font-bold"
              onClick={(event) => setCommentScore(event.target.value)}
              >
                <option value='-1' className="form-control">امتیاز خودر را انتخاب کنید</option>
                <option value="5">عالی</option>
                <option value="4">خیلی خوب</option>
                <option value="3">خوب</option>
                <option value="2">ضعیف</option>
                <option value="1">بد</option>
              </select>
              </div>
            </div>
            <div class="comments__respond-content">
              <div class="comments__respond-title">دیدگاه شما *</div>
              <textarea
                class="comments__score-input-respond"
                onChange={onChangeHandler}
              >
                {newCommentBody}
              </textarea>
            </div>
            <button
              type="submit"
              class="comments__respond-btn"
              onClick={() => submitComment(newCommentBody , commentScore)}
            >
              ارسال
            </button>
          </div>
        </>
      ) : (
        <div className="alert alert-danger">
          برای ثبت کامنت باید
          <Link to="/login">لاگین کنید</Link>
        </div>
      )}
    </div>
  );
}
