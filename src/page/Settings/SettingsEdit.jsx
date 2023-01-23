import { Helmet } from "react-helmet";
import styled from "styled-components";

const { default: SettingEdit } = require("components/Settings/SettiingEdit");

const SettingsEdit = () => {
  return (
    <Container>
      <Helmet>
        <title>ویرایش حساب کاربری - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content="ویرایش حساب کاربری - اپلیکیشن شهری میرسه"
        ></meta>
      </Helmet>
      <SettingEdit />
    </Container>
  );
};

const Container = styled.div`
  /* margin-top: 35px; */
`;

export default SettingsEdit;
