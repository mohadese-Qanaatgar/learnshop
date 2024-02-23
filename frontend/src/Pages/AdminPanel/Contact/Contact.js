import React, { useEffect, useState } from "react";
import DataTable from "./../DataTable/DataTable";
import swal from "sweetalert";

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts()
  }, []);

  function getAllContacts() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/contact`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allContacts) => {
        setContacts(allContacts);
      });
  }

  const showContactBody = (body) => {
    swal({
      title: body,
      buttons: "خواندم",
    });
  };

  const sendAnswerToContatc = (contactEmail) => {
    swal({
      title: "لطفا پاسخ را وارد کنید",
      content: "input",
      buttons: "ارسال پاسخ",
    }).then((value) => {
      const localStorageData = JSON.parse(localStorage.getItem("user"));

      const answerInfo = {
        email: contactEmail,
        answer: value,
      };
      fetch(`http://localhost:4000/v1/contact/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify(answerInfo),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) => console.log(result));
    });
  };

  const removeContact = (contactID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "آیا از حذف مطمئن هستید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/contact/${contactID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })
          .then((res) => {
            if(res.ok){
              swal({
                title : 'پیغام با موفقیت حذف شد',
                icon : 'success',
                buttons : 'تایید'
              }).then(result => {
                getAllContacts()
              })
            }
          })
         
      }
    });
  };

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
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => showContactBody(contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  ّ
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeContact(contact._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => sendAnswerToContatc(contact.email)}
                  >
                    پاسخ
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
