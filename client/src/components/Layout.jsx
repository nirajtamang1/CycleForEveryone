import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta className="description" content={description}></meta>
        <meta className="keywords" content={keywords}></meta>
        <meta className="author" content={author}></meta>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </>
  );
};
Layout.defaultProps = {
  title: "Cycle For Everyone",
  description: "Mern Stack Project",
  keywords: "React, Node, MongoDB, Express",
  author: "Niraj Tamang",
};
export default Layout;
