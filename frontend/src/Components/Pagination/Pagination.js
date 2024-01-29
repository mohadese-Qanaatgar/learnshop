import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Pagination.css";

export default function Pagination({
  items,
  itemsCount,
  pathname,
  setShownCourses,
}) {
  const [pagesCount, setPagesCount] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemsCount * page;
    let startIndex = endIndex - itemsCount;
    let paginatedItem = items.slice(startIndex, endIndex);
    setShownCourses(paginatedItem);

    let pageNumber = Math.ceil(items.length / itemsCount);
    setPagesCount(pageNumber);
  }, [page, items]);

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {Array(pagesCount)
          .fill(0)
          .map((item, index) => (
            <li className="courses__pagination-item">
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link courses__pagination-link--active"
                >
                  {index + 1}
                </Link>
              ) : (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link"
                >
                  {index + 1}
                </Link>
              )}
            </li>
          ))}

        {/* <li className="courses__pagination-item">
              <a href="#" className="courses__pagination-link">
                <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
              </a>
            </li> */}
      </ul>
    </div>
  );
}
