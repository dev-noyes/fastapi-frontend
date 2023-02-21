import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./error-page";
import QRcode from "./routes/qrcode";
import Color from "./routes/color";
import Trend from "./routes/trend";
import Comment from "./routes/comment";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Popular from "./routes/popular";
import Analysis from "./routes/analysis";
import ImageColorPalette from "./routes/image-palette";
import Memo from "./routes/memo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/qrcode",
    element: <QRcode />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/color",
    element: <Color />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/youtube-comment",
    element: <Comment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/google-trend",
    element: <Trend />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/youtube-popular",
    element: <Popular />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/youtube-analysis",
    element: <Analysis />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/color_palette",
    element: <ImageColorPalette />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/memo",
    element: <Memo />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
