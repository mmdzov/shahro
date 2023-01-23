import BarLayout from "layouts/BarLayout";
import ErrorImages from "components/Utilities/ErrorImages";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import styled from "styled-components";
import { useEffect } from "react";

const PreviewProfile = () => {
  //   const handleMore = () => {};
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  return (
    <BarLayout
      title="اطلاعات حساب کاربری"
      // hasMoreIcon handleMore={handleMore}
    >
      <Header>
        <ErrorImages
          person
          width={100}
          height={100}
          style={{ transform: "scale(1.5)" }}
        />
        <div
          className="align-middle"
          style={{ marginTop: 23, textAlign: "center" }}
        >
          <div style={{ fontSize: "1.4rem" }}>mmdzov</div>
          <Status>آنلاین</Status>
        </div>
      </Header>
      <div style={{ marginTop: 15 }}>
        <Item>
          <div>
            <InfoOutlinedIcon />
          </div>
          <div>
            <Content>fsdfkvpoxkcvposkovkspvSDVkxvokzxcvxclvx</Content>
            <Label>بیوگرافی</Label>
          </div>
        </Item>
        <Item>
          <div>
            <FingerprintIcon />
          </div>
          <div>
            <Content>mmdzov</Content>
            <Label>شناسه کاربری</Label>
          </div>
        </Item>
        <Item>
          <div>
            <LocalPhoneOutlinedIcon />
          </div>
          <div>
            <Content>09343578643</Content>
            <Label>تلفن همراه</Label>
          </div>
        </Item>
      </div>
    </BarLayout>
  );
};

const Label = styled.div`
  font-size: 0.8rem;
  margin-top: 7px;
  color: #3a3a3a;
`;

const Content = styled.div`
  overflow-wrap: anywhere;
  max-height: 46px;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  margin-bottom: 30px;
  & > div:first-of-type {
    padding: 0 12px;
    & > svg {
      font-size: 1.8rem !important;
      color: #828282;
    }
  }
`;

export const Status = styled.div`
  font-size: 0.9rem;
  color: #0089ff;
  font-weight: 600;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export default PreviewProfile;
