import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "../../../Validators/rules";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [courseStatus , setCourseStatus] = useState('start')
  const [courseCover ,setCourseCover] = useState({})

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  function getAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/courses`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        // console.log(allCourses);
        setCourses(allCourses);
      });
  }

  const removeCourse = (courseID) => {
    swal({
      title: "آیا مطمئن هستید میخواهید حذف کنید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            swal({
              title: "دوره با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => getAllCourses());
          });
      }
    });
  };
  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };

  const addNewCourse = (event) => {
    event.preventDefault()
    console.log(formState);
  }

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <Input
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات دوره</label>
                <Input
                  id="description"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا توضیحات را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">Url دوره </label>
                <Input
                  id="shortName"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا Url دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره</label>
                <Input
                  id="price"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">نحوه پشتیبانی دوره</label>
                <Input
                  id="support"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نحوه پشتیبانی را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس دوره</label>
                <input type="file" id="file" onChange={event => {
                  console.log(event.target.files[0]);
                  setCourseCover(event.target.files[0])
                }}/>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={event => setCourseStatus(event.target.value)}
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input type="radio" value="presell" name="condition"
                        onInput={event => setCourseStatus(event.target.value)} />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewCourse} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام محصول</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  {course.price === 0
                    ? "رایگان"
                    : course.price.toLocaleString()}
                </td>
                <td>
                  {course.isComplete === 0 ? "درحال برگذاری" : "تکمیل شده"}
                </td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID.name}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeCourse(course._id)}
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
