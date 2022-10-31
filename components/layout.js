import React from "react";
import Basket from "./Basket";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Basket />
      {children}
    </div>
  );
}

export default Layout;
