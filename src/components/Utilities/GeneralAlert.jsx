import React from "react";
import classes from "./GeneralAlert.module.css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const GeneralAlert = ({ alert }) => {
  let title = alert.title;
  let message = alert.message;
  return (
    <div
      className={`${classes.AlertBox}`}
      style={{
        backgroundColor:
          alert.color === "red" ? "generalAlertRed" : "generalAlertGreen",
      }}
    >
      <div className={`${classes.AlertBoxIconBox}`}>
        <InfoOutlinedIcon className={`${classes.AlertBoxIcon}`} />
      </div>
      <div className={`${classes.alertBoxTextBox}`}>
        <h1 className={`${classes.AlertBoxTitle} text-sm`}>{title}</h1>
        <p className={`${classes.AlertBoxMessage}`}>{message}</p>
      </div>
    </div>
  );
};

export default GeneralAlert;
