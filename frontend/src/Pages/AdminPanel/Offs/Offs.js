import React, { useEffect, useState } from "react";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { minValidator, requiredValidator } from "../../../Validators/rules";
import swal from "sweetalert";
import DataTable from "../DataTable/DataTable";

export default function Offs() {
  const [courses, setCourses] = useState([]);
  const [offs, setOffs] = useState([]);
  const [offCourse, setOffCourse] = useState("-1");
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
      },
    },
    false
  );

  useEffect(() => {
    getAllOffs();

    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      });
  }, []);

  function getAllOffs() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/offs`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allOffs) => {
        // console.log(allOffs);
        setOffs(allOffs);
      });
  }
  const createOff = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const newOffInfos = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      course: offCourse,
      max: formState.inputs.max.value,
    };

    fetch(`http://localhost:4000/v1/offs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newOffInfos),
    }).then((res) => {
    //   console.log(res);
      if (res.ok) {
        swal({
          title: "کد تخفیف با موفقیت ایجاد شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllOffs();
        });
      }
    });
  };
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
                  validations={[requiredValidator()]}
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
                  validations={[requiredValidator()]}
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
                <select
                  class="select"
                  onClick={(event) => setOffCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={createOff} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="کدهای تخفیف">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>سازنده</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.creator}</td>
                <td>{off.max}</td>
                <td>{off.uses}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    // onClick={() => removeComment(comment._id)}
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
