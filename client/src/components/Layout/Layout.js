import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";

// const Layout = () object destructuring
const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh", maxWidth: 1280, margin: "auto" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app",
  description: "Mern Stack Project app",
  keyword: "mern, react, node mongodb",
  author: "StypeSpectrum",
};

export default Layout;
