import React from "react";
import ErrorImages from "./ErrorImages";

const AuthorLogo = ({ logo }) => {
  return <ErrorImages src={logo} person width={45} height={45} />;
};

export default AuthorLogo;
