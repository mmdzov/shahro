import AuthAlert from "components/Utilities/AuthAlert";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { sendComment } from "../../../store/actions/postAction";

const CommentForm = ({ token, sendComment }) => {
  const [text, setText] = useState("");
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [error, setError] = useState({
    show: false,
    message: "توجه ! حداقل سه حرف میتوانید وارد کنید.",
  });
  const [loading, setLoading] = useState(false);
  const submitComment = async (e) => {
    e.preventDefault();
    if (text.length < 4) {
      setError((prevState) => ({
        ...prevState,
        show: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        show: false,
      }));
      await setLoading(true);
      await sendComment(text, token);
      setText("");
      await setLoading(false);
    }
  };
  return (
    <form
      className={`flex flex-col px-5 justify-center my-4`}
      onSubmit={submitComment}
    >
      {loading ? <ModalConnection /> : null}
      {notifAlert.mode === "addPostComment" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          absolute={false}
        />
      ) : null}
      <label htmlFor="comment">نظر شما...</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full p-2 my-4 h-24 border-2 rounded-md border-blue-500 `}
        id="comment"
      />
      <div className="flex items-center justify-between column-flex-col-reverse">
        <button
          className={`p-2 rounded-3xl bg-blue-600 text-white w-24 font-bold focus:outline-none`}
          style={{ textAlign: "center", margin: 0, marginBottom: "10px" }}
        >
          ثبت نظر
        </button>
        {error.show ? (
          <p className="text-red-500 text-sm font-bold ml-10">
            {error.message}
          </p>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendComment: (message, token) => dispatch(sendComment(message, token)),
  };
};

export default connect(null, mapDispatchToProps)(CommentForm);
