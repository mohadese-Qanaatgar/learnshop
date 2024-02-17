import React, { useEffect, useState } from 'react'
import DataTable from './../DataTable/DataTable'

export default function Contact() {

    const [contacts , setContacts] = useState([])

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        fetch(`http://localhost:4000/v1/contact` , {
            headers : {
                Authorization : `Bearer ${localStorageData.token}`
            }
        }).then(res => res.json())
        .then(allContacts => {
            setContacts(allContacts)
        })
    } ,[])
    
  return (
    <>
    <DataTable title="پیغام ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    مشاهده پیغام
                  </button>
                </td>
                <td>ّ
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    // onClick={() => removeContact(contact._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    پاسخ
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
