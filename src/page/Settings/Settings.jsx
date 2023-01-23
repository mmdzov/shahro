import Setting from "components/Settings/Setting";
import BarLayout from "layouts/BarLayout";
import { Helmet } from "react-helmet";

const Settings = () => {
  return (
    <BarLayout title="تنظیمات" mode="setting">
      <Helmet>
        <title>تنظیمات - اپلیکیشن شهری میرسه</title>
        <meta name="keywords" content="تنظیمات - اپلیکیشن شهری میرسه"></meta>
      </Helmet>
      <Setting />
    </BarLayout>
  );
};

export default Settings;
