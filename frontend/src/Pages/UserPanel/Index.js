import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/UserPanel/Sidebar'
import './Index.css'

export default function Index() {
    return (
        <>
          <Topbar />
          <Navbar />
  
          <section class="content">
          <div class="content-header">
              <div class="container">
                  <span class="content-header__title">حساب کاربری من</span>
                  <span class="content-header__subtitle">پیشخوان</span>
              </div>
          </div>
          <div class="content-main">
              <div class="container">
                  <div class="row">
                      <Sidebar />
  
                      <Outlet />
  
                  </div>
              </div>
          </div>
      </section>
  
          <Footer />
        </>
    )
  }
