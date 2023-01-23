import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

function Toast({ alert }) {
  useEffect(() => {
    if (alert) {
      notify();
    }
  }, [alert]);
  const notify = () => {
    // toast("Default Notification !");

    toast.success(alert.message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    // toast.error("Error Notification !", {
    //   position: toast.POSITION.TOP_LEFT
    // });

    // toast.warn("Warning Notification !", {
    //   position: toast.POSITION.BOTTOM_LEFT
    // });

    // toast.info("Info Notification !", {
    //   position: toast.POSITION.BOTTOM_CENTER
    // });

    // toast("Custom Style Notification with css class!", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    //   className: 'foo-bar'
    // });
  };
}

const mapStateToProps = (state) => {
  return {
    alert: state.general.alert,
    openAlert: state.general.openAlert,
  };
};

export default connect(mapStateToProps)(Toast);
