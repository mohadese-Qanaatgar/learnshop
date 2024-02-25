import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/Login/Login";
import Articles from "./Pages/Articles/Articles";
import Register from "./Pages/Register/Register";
import Contact from "./Pages/Contact/Contact";
import Search from "./Pages/Search/Search";
import AdminPanel from "./Pages/AdminPanel/Index";
import Users from "./Pages/AdminPanel/Users/Users";
import AdminCourses from "./Pages/AdminPanel/Courses/Courses";
import Menus from "./Pages/AdminPanel/Menus/Menus";
import AdminArticles from "./Pages/AdminPanel/Articles/Articles";
import AdminCategory from './Pages/AdminPanel/Category/Category'
import AdminContact from './Pages/AdminPanel/Contact/Contact'
import Sessions from "./Pages/AdminPanel/Sessions/Sessions";
import Session from "./Pages/Session/Session";
import Comments from "./Pages/AdminPanel/Comments/Comments";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session/>},
  {
    path: "/p-admin/*",
    element: <AdminPanel />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "courses",
        element: <AdminCourses />,
      },
      {
        path: "menus",
        element: <Menus />,
      },
      {
        path: "articles",
        element: <AdminArticles />,
      },
      {
        path: "category",
        element: <AdminCategory/>,
      },
      {
        path: "contacts",
        element: <AdminContact/>,
      },
      {
        path: "sessions",
        element: <Sessions/>,
      },
      {
        path: "comments",
        element: <Comments/>,
      }
    ],
  },
];

export default routes;
