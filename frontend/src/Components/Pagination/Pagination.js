import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Pagination.css'

export default function Pagination({items ,itemsCount , pathname , setShownCourses}) {

  const [pagesCount ,setPagesCount] = useState(null)
  const {page} = useParams()

  useEffect(() => {
    let endIndex = itemsCount * page
    let startIndex = endIndex - itemsCount
    let paginatedItem = items.slice(startIndex ,endIndex)
    setShownCourses(paginatedItem)

    let pageNumber = Math.ceil(items / itemsCount)
    setPagesCount(pageNumber)
  } ,[page , items])

  return (
    <div className="courses-pagination">
          <ul className="courses__pagination-list">
            <li className="courses__pagination-item">
              <a href="#" className="courses__pagination-link">
                <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
              </a>
            </li>
            <li className="courses__pagination-item">
              <a href="#" className="courses__pagination-link courses__pagination-link--active">
                1
              </a>
            </li>
            <li className="courses__pagination-item">
              <a href="#" className="courses__pagination-link">
                2
              </a>
            </li>
            <li className="courses__pagination-item">
              <a href="#" className="courses__pagination-link ">
                3
              </a>
            </li>
            <li className="courses__pagination-item">
              <a href="#" className="courses__pagination-link">
                <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
              </a>
            </li>
          </ul>
        </div>
  )
}
