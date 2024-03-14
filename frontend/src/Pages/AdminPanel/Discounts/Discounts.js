import React, { useState } from "react";
import swal from "sweetalert";

export default function Discounts() {
  const [discount, setDiscount] = useState("");

  const setDiscounts = (event) => {
    event.preventDefault();
    const reqBody = {
      discount,
    };
    fetch(`http://localhost:4000/v1/offs/all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if(res.ok) {
            swal({
                title: 'کمپین با موفقیت ایجاد شد',
                icon: 'success',
                buttons: "تایید"
            })
        }
      })
  };
  
  return (
    <>
      <div class="home-title">
        <span>برگزاری کمپین جدید</span>
      </div>
      <form class="form">
        <div class="col-6">
          <div class="name input">
            <label class="input-title">عنوان</label>
            <input
              type="text"
              value={discount}
              placeholder="لطفا عنوان را وارد کنید..."
              onChange={(event) => setDiscount(event.target.value)}
            />
            <span class="error-message text-danger"></span>
          </div>
        </div>
        <div class="col-12">
          <div class="bottom-form">
            <div class="submit-btn">
              <input type="submit" value="ایجاد کمپین" onClick={setDiscounts} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
