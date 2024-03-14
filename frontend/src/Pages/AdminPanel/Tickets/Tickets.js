import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import swal from 'sweetalert'

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTickets()
  }, []);

  function getAllTickets () {
    fetch(`http://localhost:4000/v1/tickets`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
        .then((res) => res.json())
        .then((allTicket) => {
          console.log(allTicket);
          setTickets(allTicket);
        });
  }

  const showTicketBody = (body) => {
    swal({
        title : body,
        buttons : 'تایید'
    })
  }

  const answerToTicket = (ticketID) => {
    swal({
        title : 'لطفا پاسخ مورد نظر را وارد کنید',
        content : 'input',
        buttons : 'تایید'
    }).then(value => {
        // console.log(value);
        if(value) {
            const ticketAnswerInfos = {
                ticketID,
                body : value
            }
            fetch(`http://localhost:4000/v1/tickets/answer`,{
                method : 'POST',
                headers : {
                    Authorization : `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                      }`,
                      'Content-Type' : 'application/json'
                },
                body : JSON.stringify(ticketAnswerInfos)
            }).then(res => {
                if(res.ok){
                    swal({
                        title :'پاسخ شما با موفقیت ثبت شد',
                        icon : 'success',
                        buttons : "تایید"
                    }).then(() => {
                        getAllTickets()
                    })
                }
            })
        }
    })
  }
  return (
    <>
      <DataTable title="تیکت ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>نوع تیکت</th>
              <th>دوره</th>
              <th>الویت</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user}</td>
                <td>{ticket.title}</td>
                <td>{ticket.departmentID}</td>
                <td>{ticket.course ? ticket.course : "--"}</td>
                <td>
                  {ticket.priority === 1 && "بالا"}
                  {ticket.priority === 2 && "متوسط"}
                  {ticket.priority === 3 && "کم"}
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                      onClick={() => {showTicketBody(ticket.body)}}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  {
                    ticket.answer === 1 ? 'پاسخ داده شده' : (
                        <>
                        <button type="button" class="btn btn-primary edit-btn"
                  onClick={() => {answerToTicket(ticket._id)}}
                  >
                    پاسخ
                  </button>
                        </>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
