import React, { useEffect, useState } from 'react'
import DataTable from '../DataTable/DataTable'
import swal from 'sweetalert'

export default function Menus() {

  const [menus , setMenus] = useState([])

  useEffect(() => {
    getAllMenus()
  },[])

  function getAllMenus () {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    fetch(`http://localhost:4000/v1/menus/all`)
    .then(res => res.json())
    .then(allMenus => {
      setMenus(allMenus)
    })
  }

  const removeMenu = (menuID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title : 'آیا از حذف مطمدن هستید؟',
      icon : 'warning',
      buttons : ["نه" , "آره"]
    }).then(result => {
      if(result) {
        fetch(`http://localhost:4000/v1/menus/${menuID}` , {
          method : 'DELETE',
          headers : {
            Authorization : `Bearer ${localStorageData.token}`
          }
        }).then(res => {
          if(res.ok) {
            swal({
              title : "منو با موفقیت حذف شد",
              icon : 'success',
              buttons : 'تایید'
            }).then(() => {getAllMenus()})
          }
        })
      }
    })

    
  }

  return (
    <>
    <DataTable title='منوها'>
      <table className='table'>
        <thead>
          <tr>
            <th>شناسه</th>
            <th>عنوان</th>
            <th>مقصد</th>
            <th>فرزند...</th>
            <th>ویرایش</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu , index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{menu.title}</td>
              <td>{menu.href}</td>
              <td>{
                menu.parent ? menu.parent.title : (<i className='fa fa-check'></i>)
                }</td>
              <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeMenu(menu._id)}
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
  )
}
