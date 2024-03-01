import React, { useEffect, useState } from "react";
import "./CourseInfo.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import BreadCrump from "../../Components/BreadCrump/BreadCrump";
import CourseDetailBox from "../../Components/CourseDetailBox/CourseDetailBox";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import swal from 'sweetalert'
import { Link } from "react-router-dom";

export default function CourseInfo() {
  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [score, setScore] = useState(5);
  const [courseDetailes, setCourseDetailes] = useState({});
  const [courseTeacher , setCourseTeacher] =useState({})
  const [courseCategory , setCourseCategory] = useState([])

  const { courseName } = useParams();

  useEffect(() => {

    getCourseDetailes()
  }, []);

  function getCourseDetailes () {

    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          localStorageData === null ? null : localStorageData.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        // console.log(courseInfo);
        setComments(courseInfo.comments);
        setSessions(courseInfo.sessions);
        setCreatedAt(courseInfo.createdAt);
        setUpdatedAt(courseInfo.updatedAt);
        setCourseDetailes(courseInfo);
        setCourseTeacher(courseInfo.creator)
        setCourseCategory(courseInfo.categoryID)
        // console.log(courseInfo);
      });
  }

  const submitComment = (newCommentBody,commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)}
        );
        swal ( {
          title : 'کامنت شما ثبت شد',
          icon: 'success',
          button : 'تایید'
        }).then(() => {
          getCourseDetailes()
        })
  };
  // const registerInCourse = (course) => {
  //   const localStorageData = JSON.parse(localStorage.getItem("user"));

  //   console.log(course);
  //   if(course.price === 0) {
  //     swal({
  //       title : 'آیا از ثبت نام در دوره اطمینان دارید؟',
  //       icon: 'success',
  //       buttons : ['نه','آره']
  //     }).then(result => {
  //       if(result) {
  //         fetch(`http://localhost:4000/v1/courses/${course._id}/register` , {
  //           method : 'POST',
  //           headers : {
  //             Authorization : `Bearer ${localStorageData.token}`,
  //             'Content_Type' : 'application/json'
  //           },
  //           body : JSON.stringify({
  //             price : course.price
  //           })
  //         }).then(res => {
  //           if(res.ok) {
  //             swal({
  //               title : 'با موفقیت ثبت نام شدید',
  //               icon : 'success',
  //               buttons : 'تایید'
  //             })
  //           }
  //         })
  //       }
  //     })
  //   } else {
  //     swal({
  //       title : 'آیا از ثبت نام در دوره اطمینان دارید؟',
  //       icon: 'success',
  //       buttons : ['نه','آره']
  //     }).then(result => {
  //       if(result) {
  //         swal({
  //           title : 'در صورت داشتن کد تخفیف آن را وارد کنید',
  //           content : 'input',
  //           buttons : ["ثبت نام بدون کد تخفیف","اعمال کد تخفیف"]
  //         }).then(code => {
  //           // console.log(result === null);
  //           if(code === null){
  //               fetch(`http://localhost:4000/v1/courses/${course._id}/register` , {
  //                 method : 'POST',
  //                 headers : {
  //                   Authorization : `Bearer ${localStorageData.token}`,
  //                   'Content_Type' : 'application/json'
  //                 },
  //                 body : JSON.stringify({
  //                   price : course.price
  //                 })
  //               }).then(res => {
  //                 if(res.ok) {
  //                   swal({
  //                     title : 'با موفقیت ثبت نام شدید',
  //                     icon : 'success',
  //                     buttons : 'تایید'
  //                   })
  //                 }
  //               })
  //           } else {
  //             fetch(`http://localhost:4000/v1/offs/${code}`,{
  //               method : 'POST',
  //               headers : {
  //                 Authorization : `Bearer ${localStorageData.token}`,
  //                 'Content-Type' : 'application/json'
  //               },
  //               body : JSON.stringify({
  //                 course : course._id
  //               })
  //             }).then(res => {
  //               console.log(res);
  //               if(res.status === 404 ){
  //                 swal({
  //                   title: "کد تخفیف معتبر نیست",
  //                   icon : 'error',
  //                   buttons : "تایید"
  //                 })
  //               } else if(res.status === 409){
  //                 swal({
  //                   title : "کد تخفیف قبلا استفاده شده",
  //                   icon : 'error',
  //                   buttons : 'تایید'
  //                 })
  //               } else {
  //                 return res.json()
  //               }
  //             }).then(code => {
  //               console.log(code);
  //               fetch(`http://localhost:4000/v1/courses/${course._id}/register`,{
  //                 method : 'POST',
  //                 headers : {
  //                   Authorization : `Bearer ${localStorageData.token}`,
  //                   'Content-Type' : 'application/json'
  //                 },
  //                 body : JSON.stringify({
  //                   price : course.price - (course.price * Number(code.percent)/100)
  //                 })
  //               }).then(res => {
  //                 if(res.ok) {
  //                   swal({
  //                     title : 'ثبت نام با موفقیت انجام شد',
  //                     icon: 'success',
  //                     buttons : 'تایید'
  //                   }).then(() => {
  //                     getCourseDetailes()
  //                   })
  //                 }
  //               })
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // }
  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: course.price,
            }),
          }).then((res) => {
            console.log(res);
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                getCourseDetailes();
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          swal({
            title: "در صورت داشتن کد تخفیف وارد کنید:",
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((code) => {
            if (code === null) {
              fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  price: course.price,
                }),
              }).then((res) => {
                console.log(res);
                if (res.ok) {
                  swal({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    buttons: "اوکی",
                  }).then(() => {
                    getCourseDetailes();
                  });
                }
              });
            } else {
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  course: course._id,
                }),
              })
                .then((res) => {
                  console.log(res);

                  if (res.status === 404) {
                    swal({
                      title: "کد تخفیف معتبر نیست",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else if (res.status === 409) {
                    swal({
                      title: "کد تخفیف قبلا استفاده شده :/",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else {
                    return res.json();
                  }
                })
                .then((code) => {
                  fetch(
                    `http://localhost:4000/v1/courses/${course._id}/register`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${
                          JSON.parse(localStorage.getItem("user")).token
                        }`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        price: course.price - (course.price * code.percent / 100)
                      }),
                    }
                  ).then((res) => {
                    console.log(res);
                    if (res.ok) {
                      swal({
                        title: "ثبت نام با موفقیت انجام شد",
                        icon: "success",
                        buttons: "اوکی",
                      }).then(() => {
                        getCourseDetailes();
                      });
                    }
                  });
                });
            }
          });
        }
      });
    }
  };
  return (
    <>
      <Topbar />
      <Navbar />
      <BreadCrump
        links={[
          { id: 1, title: "خانه", to: "/" },
          {
            id: 2,
            title: "آموزش برنامه نویس فرانت اند",
            to: "/category-info/frontend",
          },
          {
            id: 3,
            title: "دوره متخصص جاوااسکریپت",
            to: "/course-info/js-expert",
          },
        ]}
      />
      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                {courseCategory.title}
              </a>
              <h1 className="course-info__title">
                آموزش 20 کتابخانه جاوااسکریپت برای بازار کار
              </h1>
              <p className="course-info__text">{courseDetailes.description}</p>
              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-6">
              <video
                src=""
                poster="/images/courses/js_project.png"
                className="course-info__video"
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>
      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course">
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailBox
                      title="وضعیت دوره:"
                      text="به اتمام رسیده"
                      icon="graduation-cap"
                    />
                    <CourseDetailBox
                      title="زمان برگزاری"
                      text={createdAt.slice(0, 10)}
                      icon="clock"
                    />
                    <CourseDetailBox
                      title="آخرین به روز رسانی:"
                      text={updatedAt.slice(0, 10)}
                      icon="calendar-alt"
                    />
                    <CourseDetailBox
                      title="روش پشتیبانی:"
                      text="آنلاین"
                      icon="user-alt"
                    />
                    <CourseDetailBox
                      title="پیش نیاز:"
                      text="HTML CSS"
                      icon="info-circle"
                    />
                    <CourseDetailBox
                      title="نوع مشاهده"
                      text="ضبط شده/آنلاین"
                      icon="play"
                    />
                  </div>
                </div>
                {/*Start course progress */}
                <div className="course-progress">
                  <div className="course-progress__header">
                    <i className="fas fa-chart-line course-progress__icon"></i>
                    <span className="course-progress__title">
                      درصد پیشرفت دوره: 100%
                    </span>
                  </div>
                  <div className="progress course-progress__bar">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                {/*Finish course progress */}
                {/*Start Introduction */}
                <div className="introduction">
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                    </span>
                    <img
                      src="/images/info/1.gif"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                      مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                      بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                      کرده باشد{" "}
                    </p>
                    <p className="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="introduction__btns">
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی ویدیوها
                    </a>
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div className="introduction__topic">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item className="accordion" eventKey="0">
                        <Accordion.Header> جلسات دوره</Accordion.Header>
                        {sessions.map((session, index) => (
                          <Accordion.Body>
                            {
                              (session.free === 1 || courseDetailes.isUserRegisteredToThisCourse) ?
                              (
                                <>
                                 <div className="accordion-body introduction__accordion-body">
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  {index + 1}
                                </span>
                                <i className="fab fa-youtube introduction__accordion-icon"></i>
                                <Link
                                 to={`/${courseName}/${session._id}`}
                                  className="introduction__accordion-link"
                                >
                                  {session.title}
                                </Link>
                              </div>
                              <div className="introduction__accordion-left">
                                <span className="introduction__accordion-time">
                                  {session.time}
                                </span>
                              </div>
                            </div>
                                </>
                              ) :
                              (
                                <>
                                 <div className="accordion-body introduction__accordion-body">
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  {index + 1}
                                </span>
                                <i className="fab fa-youtube introduction__accordion-icon"></i>
                                <span
                                  className="introduction__accordion-link"
                                >
                                  {session.title}
                                </span>
                              </div>
                              <div className="introduction__accordion-left">
                                <span className="introduction__accordion-time">
                                 {session.time}
                                </span>
                                <i className="fa fa-lock"></i>
                              </div>
                            </div>
                                </>
                              )
                            }
                           
                          </Accordion.Body>
                        ))}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                {/*Finish Introduction */}
                {/*Start teacher detailes */}
                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <img
                        src={courseTeacher.profile}
                        alt="Teacher Profile"
                        className="techer-details__header-img"
                      />
                      <div className="techer-details__header-titles">
                        <a href="#" className="techer-details__header-link">
                          {courseTeacher.name}
                        </a>
                        <span className="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span className="techer-details__header-name">
                        {courseTeacher.role}
                        </span>
                    </div>
                  </div>
                  <p className="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                    سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                    زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>
                {/*Finish teacher detailes */}

                <CommentsTextArea
                  comments={comments}
                  submitComment={submitComment}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    {comments.isUserRegisteredToThisCourse ? (
                      <span className="course-info__register-title">
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>
                        دانشجوی دوره هستید
                      </span>
                    ) : (
                      <span className="course-info__register-title" onClick={() => registerInCourse(courseDetailes)}>
                        ثبت نام در دوره
                      </span>
                    )}
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span className="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span className="course-info__total-sale-number">
                          {courseDetailes.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          {comments.length}
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <span className="course-info__short-url">
                    https://learn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span className="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href="#" style={{ color: "blue", fontWeight: "bold" }}>
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__courses-title">
                    دوره های مرتبط
                  </span>
                  <ul className="course-info__courses-list">
                    <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src="/images/courses/js_project.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          پروژه های تخصصی با جاوا اسکریپت
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src="/images/courses/fareelancer.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          تعیین قیمت پروژه های فریلنسری
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src="/images/courses/nodejs.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          دوره Api نویسی
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src="/images/courses/jango.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          متخصص جنگو
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
