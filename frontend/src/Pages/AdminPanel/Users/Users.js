import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from 'sweetalert'

export default function Users() {
  const [users, setUsers] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allUsers) => {
        setUsers(allUsers);
        // console.log(allUsers);
      });
  }, [users]);

  const removeHandler = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title : 'آیا مطمئن هستید میخواهید حذف کنید؟',
      icon:'warning',
      buttons : [ 'نه','آره'] 
    }).then(result => {
      if(result) {
        fetch(`http://localhost:4000/v1/users/${userID}`,{
          method : 'DELETE',
          headers : {
            Authorization : `Bearer ${localStorageData.token}`
          }
        }).then(res => {
          if(res.ok){
            swal({
              title:'کاربر با موفقیت حذف شد',
              icon:'success',
              buttons :'اوکی'
            })
          }
        })
      }
    })
  }
  return (
    <>
      <DataTable title="کاربران">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th> نام و نام خانوادگی</th>
              {/* <th>شماره</th> */}
              <th>ایمیل</th>
              {/* <th>رمز عبور</th> */}
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user , index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                {/* <td>{user.phone}</td> */}
                <td>{user.email}</td>
                {/* <td>{user.password}</td> */}
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={() => removeHandler(user._id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn">
                    بن
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
