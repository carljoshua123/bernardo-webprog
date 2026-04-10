import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ArticleListPage from "./pages/ArticleListPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// ✅ NEW IMPORTS
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "articles", element: <ArticleListPage /> },
      { path: "articles/:name", element: <ArticlePage /> },

      // ✅ AUTH ROUTES
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;