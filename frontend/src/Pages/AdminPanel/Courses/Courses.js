import React, { useEffect, useState } from 'react'
import DataTable from '../DataTable/DataTable'
import swal from 'sweetalert'
import './Courses.css'

export default function Courses() {

  const [courses , setCourses] = useState([])
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCourses()
    fetch(`http://localhost:4000/v1/category`)
    .then((res) => res.json())
    .then((allCategories) => {
      setCategories(allCategories);
    });
  } ,[])

  function getAllCourses () {
const localStorageData = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/courses`,{
      headers :{
        Authorization : `Bearer ${localStorageData.token}`
      }
    }).then(res => res.json())
    .then(allCourses => {
      console.log(allCourses);
      setCourses(allCourses)
    })
  }

  const removeCourse = (courseID) => {
    swal({
      title : 'آیا مطمئن هستید میخواهید حذف کنید؟',
      icon : 'warning',
      buttons : ["نه","آره"]
    }).then(result => {
      if(result) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        fetch(`http://localhost:4000/v1/courses/${courseID}` , {
          method : 'DELETE',
          headers : {
            Authorization : `Bearer ${localStorageData.token}`
          }
        }).then(res => res.json())
        .then(result => {
          swal({
            title : 'دوره با موفقیت حذف شد',
            icon : 'success',
            buttons : 'تایید'
          }).then(() => getAllCourses())
        })
      }
    })
  }
  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };
  return (
   <>
   <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا نام محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">تعداد محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا تعداد محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
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
                <label class="input-title">عکس محصول</label>
                <input type="file" id="file" />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">موجودی</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>موجود</span>
                        <input
                          type="radio"
                          value="avalibe"
                          name="condition"
                          checked
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>ناموجود</span>
                        <input
                          type="radio"
                          value="unavailable"
                          name="condition"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="presell">
                <label class="input-title">وضعیت دوره</label>
                <div class="radios">
                  <div class="presell-true">
                    <label>
                      <span>پیش فروش</span>
                      <input
                        type="radio"
                        value="presell"
                        name="presell"
                        checked
                      />
                    </label>
                  </div>
                  <div class="presell-false">
                    <label>
                      <span>در حال برگزاری</span>
                      <input type="radio" value="onperforming" name="presell" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
   <DataTable title='دوره ها'>
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
                <td>{course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</td>
                <td>{course.isComplete === 0 ? 'درحال برگذاری' : 'تکمیل شده'}</td>
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
  )
}
