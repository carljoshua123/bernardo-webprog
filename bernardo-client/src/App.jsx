import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ArticleListPage from "./pages/ArticleListPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// Router configuration (unchanged)
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
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "*", element: <NotFoundPage /> }, // Catch-all for unknown routes
    ],
  },
]);

function App() {
  // Wrap everything in AuthProvider (unchanged)
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;