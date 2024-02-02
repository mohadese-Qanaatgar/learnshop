import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowNotificationBox, setIsShowNotificationBox] = useState(false);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    // console.log(localStorageData);

    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAdminInfo(data);
        setAdminNotifications(data.notifications);
      });
  }, [seeNotification]);

  function seeNotification(notificationID) {
    console.log(notificationID);
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      
  }

  return (
    <div class="container-fluid">
      <div class="container">
        <div
          class={`home-header ${
            isShowNotificationBox ? "active-modal-notfication" : ""
          }`}
        >
          {/* <div class='home-header active-modal-notfication'> */}
          <div class="home-right">
            <div class="home-searchbar">
              <input type="text" class="search-bar" placeholder="جستجو..." />
            </div>
            <div class="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationBox(true)}
              >
                <i class="far fa-bell"></i>
              </button>
            </div>
            <div
              class="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationBox(true)}
              onMouseLeave={() => setIsShowNotificationBox(false)}
            >
              <ul class="home-notification-modal-list">
                {adminNotifications.length === 0 ? (
                  <li class="home-notification-modal-item">
                    نوتیفیکیشنی برای نمایش وجود ندارد
                  </li>
                ) : (
                  <>
                    {adminNotifications.map((notification) => (
                      <li
                        key={notification._id}
                        class="home-notification-modal-item"
                      >
                        <span class="home-notification-modal-text">
                          {notification.msg}
                        </span>
                        <label class="switch">
                          <a
                            href="javascript:void(0)"
                            onClick={() => seeNotification(notification._id)}
                          >
                            دیدم
                          </a>
                        </label>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div class="home-left">
            <div class="home-profile">
              <div class="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div class="home-profile-icon">
                <i class="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
