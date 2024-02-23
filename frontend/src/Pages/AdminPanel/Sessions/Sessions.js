import React, { useEffect, useState } from "react";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { minValidator } from "../../../Validators/rules";
import swal from 'sweetalert'

export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCourse, setSessionCourse] = useState('-1');
  const [sessionVideo, setSessionVideo] = useState({})
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        // console.log(allCourses);
        setCourses(allCourses);
      });
  }, []);

  const createSession = (event) => {
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()

    formData.append('title' , formState.inputs.title.value)
    formData.append('time' , formState.inputs.time.value)
    formData.append('video' , sessionVideo)
    formData.append('free' , formState.inputs.free.value)


    fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${localStorageData.token}`
        },
        body : formData
    }).then(res => {
        if(res.ok) {
            swal({
                title:'جلسه با موفقیت اضافه شد',
                icon : 'success',
                buttons : 'تایید'
            }).then(() => {
                console.log('ok');
            })
        }
    })
}

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select class="select" onChange={event => setSessionCourse(event.target.value)}>
                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>{course.name}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان جلسه</label>
                <input type="file" onChange={event => setSessionVideo(event.target.files[0])} />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={createSession} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
