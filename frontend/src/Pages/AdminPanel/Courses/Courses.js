import React, { useEffect, useState } from 'react'
import DataTable from '../DataTable/DataTable'
import swal from 'sweetalert'

export default function Courses() {

  const [courses , setCourses] = useState([])


  useEffect(() => {
    getAllCourses()
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
  return (
   <>
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
