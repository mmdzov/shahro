import {
  ProdReportTitle,
  ProdSpecSeeMore,
} from "components/Store/Product.styled";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const ReportTemp = ({ onReport, ...props }) => {
  return (
    <ProdSpecSeeMore
      style={{ paddingLeft: 13, margin: "0 15px" }}
      onClick={onReport}
      {...props}
    >
      <ProdReportTitle>گزارش</ProdReportTitle>
      <ArrowBackIosIcon style={{ fontSize: 12, color: "#6b6b6b" }} />
    </ProdSpecSeeMore>
  );
};

export default ReportTemp;
