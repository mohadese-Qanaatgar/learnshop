import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";

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
        console.log(allUsers);
      });
  }, []);
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
                  <button type="button" class="btn btn-danger delete-btn">
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
