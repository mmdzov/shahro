import {
  SessionNotFound,
  SettingListContainer,
  SettingListItem,
  SettingListTitle,
} from "./Session.styled";
import SettingItem from "./SettingItem";

const SettingList = ({ title, items, current = false }) => {
  return (
    <>
      <SettingListTitle>{title} :</SettingListTitle>
      <SettingListContainer>
        <SettingListItem>
          {items?.length > 0 ? (
            items?.map((item) => (
              <SettingItem
                current={current}
                {...item}
                key={item?.token || ~~(Math.random() * 99999999)}
                hasCurrent={current}
              />
            ))
          ) : (
            <SessionNotFound>درحال حاظر نشستی موجود نیست!</SessionNotFound>
          )}
        </SettingListItem>
      </SettingListContainer>
    </>
  );
};

export default SettingList;
