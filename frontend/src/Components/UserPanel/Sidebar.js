import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import AuthContext from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Sidebar() {
  const authContext = useContext(AuthContext)
  const navigate =useNavigate()

  const logoutUser = (event) => {
    event.preventDefault()
    swal({
      title : 'آیا مطمئن هستید خارج میشوید؟',
      icon : 'warning',
      buttons : ["نه" , "آره"]
    }).then(result => {
      if(result) {
        swal({
          title : 'با موفقیت خارج شدید',
          icon : 'success',
          buttons : 'تایید'
        }).then(() => {
          authContext.logout()
          navigate('/')
        }) 
      }
    })
  }
  return (
    <div class="col-3">
      <div class="sidebar">
        <span class="sidebar__name">محمدامین سعیدی راد</span>
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              پیشخوان
            </a>
          </li>
          <li class="sidebar__item">
            <Link to='orders' class="sidebar__link">
              سفارش
            </Link>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              کیف پول من
            </a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              جزئیات حساب کاربری
            </a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              دوره های خریداری شده
            </a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              تیکت های پشتیبانی
            </a>
          </li>
          <li class="sidebar__item" onClick={logoutUser}>
            <a class="sidebar__link" href="#">
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
