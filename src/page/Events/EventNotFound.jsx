import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import {
  MessageWrapper,
  MsgItemCustom,
  MessageContainer,
  MessageItem,
} from "./StyledEvents";

const EventNotFound = () => {
  return (
    <MessageWrapper>
      <MessageContainer>
        <MsgItemCustom>
          <PriorityHighIcon />
        </MsgItemCustom>

        {/*
        <MessageItem style={{ marginTop: "15px" }}>
          داده ای یافت نشد!
        </MessageItem>
        */}
        <MessageItem>هیچ رویدادی برای این ماه ثبت نکرده اید.</MessageItem>
      </MessageContainer>
    </MessageWrapper>
  );
};

export default EventNotFound;
