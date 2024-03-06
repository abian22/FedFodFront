import React from "react";

function AccountInfoContainer({ children, title }) {
  return (
    <>
      <div className="accountContainer">
        <h2>{title}</h2>
      </div>
      <div className="container">
        <form className="formContainer">{children}</form>
      </div>
    </>
  );
}

export default AccountInfoContainer;
