import adsService from "api/adsService";
import ReportTemplate from "components/Store/ReportTemplate";
import AuthAlert from "components/Utilities/AuthAlert";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import ReportTemp from "components/Utilities/ReportTemp";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrMsg, setAlert, setErrMsg } from "store/actions/_MainAction";
import handleApiErrors from "utilities/handleApiErrors";

const AdsReport = () => {
  const [report, setReport] = useState(false);
  const { loading, adsSingle } = useSelector(({ ads }) => ads);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  const handleReport = () => {
    if (loading) return;
    setReport(true);
  };

  const handleSendReport = async (form) => {
    setReport(false);
    await setLoading1(true);
    dispatch(clearErrMsg());
    try {
      const data = await adsService.adsReport({
        ads: adsSingle?.ads?.token,
        title: form?.title,
        text: form?.description,
      });
      handleApiErrors(data)
        .then(({ alert }) => {
          dispatch(
            setAlert({
              mode: "adsReport",
              show: true,
              title: alert?.title,
              msg: alert?.message,
            })
          );
        })
        .catch((e) => {
          dispatch(
            setAlert({
              mode: "adsReport",
              show: true,
              title: e?.title,
              msg: e?.message,
            })
          );
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
    await setLoading1(false);
  };
  return (
    <Fragment>
      {loading1 ? <ModalConnection /> : null}
      {notifAlert.mode === "adsReport" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      {report ? (
        <ReportTemplate
          onCancel={() => setReport(false)}
          onSubmit={handleSendReport}
        />
      ) : null}
      <ReportTemp
        onReport={handleReport}
        style={{ paddingLeft: 0, margin: 0 }}
      />
    </Fragment>
  );
};

export default AdsReport;
