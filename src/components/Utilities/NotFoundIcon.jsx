import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import {
  MessageWrapper,
  MsgItemCustom,
  MessageContainer,
  MessageItem,
} from "../../page/Events/StyledEvents";

const NotFoundIcon = ({ title = "", special = false }) => {
  return (
    <MessageWrapper>
      <MessageContainer className={`${special ? "specialMessageBox" : ""}`}>
        <MsgItemCustom>
          <PriorityHighIcon />
        </MsgItemCustom>

        {/*
        <MessageItem style={{ marginTop: "15px" }}>
          داده ای یافت نشد!
        </MessageItem>
        */}
        <MessageItem>{title}</MessageItem>
      </MessageContainer>
    </MessageWrapper>
  );
};

export default NotFoundIcon;
