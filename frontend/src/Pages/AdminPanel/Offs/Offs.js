import React, { useEffect, useState } from 'react'
import Input from '../../../Components/Form/Input'
import { useForm } from '../../../hooks/useForm'
import { minValidator  } from '../../../Validators/rules'

export default function Offs() {
    const [courses , setCourses] = useState([])
    const [offCourse , setOffCourse] = useState('-1')
    const [formState, onInputHandler] = useForm(
        {
            code: {
                value: "",
                isValid: false,
              },
              percent: {
                value: "",
                isValid: false,
              },
              max: {
                value: "",
                isValid: false,
              }
        },
        false
      );

      useEffect(() => {
        getAllCourses()
      },[])

    function getAllCourses () {
        fetch(`http://localhost:4000/v1/courses`)
        .then(res => res.json())
        .then(allCourses => {
            setCourses(allCourses)
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
                <label class="input-title">کد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="code"
                  validations={[minValidator(5)]}
                  placeholder="لطفا کد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">درصد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="percent"
                  validations={[minValidator(5)]}
                  placeholder="لطفا درصد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">حداکثر استفاده</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="max"
                  validations={[minValidator(5)]}
                  placeholder="حداکثر ستفاده از کد تخفیف"
                />
                <span class="error-message text-danger"></span>
              </div>
              </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select class="select" onClick={event => setOffCourse(event.target.value)}>
                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                    {courses.map(course => (
                        <option key={course._id} value={course._id}>{course.name}</option>
                    ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
          
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن"/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
