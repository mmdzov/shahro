import {
  DirectHeader as Container,
  DirectHeaderInput,
  SearchIcon,
} from "./Direct.styled";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useDispatch } from "react-redux";
import usePath from "hooks/usePath";
import { setLoading } from "store/actions/_MainAction";

const DirectHeader = () => {
  const [search, setSearch] = useState("");
  const [distanceAbove, setDistanceAbove] = useState(false);
  const { getLastRoute, goBack } = usePath();
  const getScroll = () => {
    const y = document.body.getBoundingClientRect().y;
    if (y < 50) {
      setDistanceAbove(true);
    } else setDistanceAbove(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("scroll", () => getScroll());
    // eslint-disable-nexdt-line react-hooks/exhaustive-deps
  }, []);
  const handleBack = () => {
    const route = getLastRoute(-2).route;
    if (route === "/") {
      dispatch(setLoading("directToHome", true));
    }
    goBack();
  };
  return (
    <Container
      style={{
        boxShadow: distanceAbove
          ? "rgb(216 216 216) 0px 5px 13px -1px"
          : "unset",
      }}
    >
      <div onClick={handleBack}>
        <ArrowForwardIosIcon
          style={{ fontSize: "1.4rem", color: "#6b6b6b", cursor: "pointer" }}
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} style={{ width: "100%" }}>
        <div className="flex relative">
          <DirectHeaderInput
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="جستجو"
          />
          <SearchIcon style={{ cursor: "pointer" }}>
            <SearchOutlinedIcon />
          </SearchIcon>
        </div>
      </form>
    </Container>
  );
};

export default DirectHeader;
