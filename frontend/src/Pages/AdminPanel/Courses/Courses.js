import React, { useEffect, useState } from 'react'
import DataTable from '../DataTable/DataTable'

export default function Courses() {

  const [courses , setCourses] = useState([])


  useEffect(() => {
    
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
  } ,[])
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
