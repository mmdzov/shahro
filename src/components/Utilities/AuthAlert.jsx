import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useDispatch } from "react-redux";
import { closeAuthAlert } from "../../store/actions/authActions";
import styled from "styled-components";
import { clearAlert } from "store/actions/_MainAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "8px",
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

const AuthAlert = ({
  alert,
  absolute = true,
  go = () => {},
  clicked,
  setClick = () => {},
  ...props
}) => {
  const rf = useRef(null);

  useEffect(() => {
    setOpen(true);
    rf.current?.focus();
  }, []);
  const dispatch = useDispatch();

  let title = alert.title;
  let message = alert.message;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const root = document.getElementById("root");
    if (open && absolute) {
      root.style.position = "absolute";
      root.style.width = "100%";
      root.style.right = "0px";
    } else {
      root.style.position = "unset";
      root.style.width = "100%";
      root.style.right = "unset";
    }
  }, [absolute, open]);
  const handleClose = () => {
    setOpen(false);
    dispatch(clearAlert());
    dispatch(closeAuthAlert());
    setClick(false);
    go();
    const root = document.getElementById("root");
    root.style.position = "unset";
    root.style.width = "100%";
    root.style.right = "unset";
  };
  useEffect(() => {
    if (clicked) {
      const mw = document.getElementById("modalWrapper");
      mw?.click();
    }
  }, [clicked]);
  return (
    <div>
      <ModalContainer
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        onBlur={handleClose}
        tabIndex="1"
        ref={rf}
        {...props}
      >
        <ModalWrapper
          className={classes.paper}
          onClick={handleClose}
          id="modalWrapper"
        >
          <h1 className="text-xl font-bold my-5">{title}</h1>
          <p>{message}</p>
          {/*
          <button
            onClick={handleClose}
            className="text-white w-full text-center rounded-full bg-blue-600 my-5 p-3 focus:outline-none"
          >
            باشه
          </button>
        */}
        </ModalWrapper>
      </ModalContainer>
    </div>
  );
};

const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  z-index: 9999999999 !important;
`;
const ModalWrapper = styled.div`
  /* background: red; */
`;

export default AuthAlert;
