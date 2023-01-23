import {
  ProdPadding,
  ProdParent,
  ProdSpecContainer,
  ProdSpecItem,
  ProdSpecItemDesc,
  ProdSpecItemTitle,
  ProdSpecList,
  ProdSpecSeeMore,
  ProdTopTitle,
} from "./Product.styled";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { setInFeature } from "store/actions/productAction";
import useLoading from "hooks/useLoading";
import ContentLoader from "react-content-loader";

const ProductSpecifications = ({ prod }) => {
  const history = useHistory();
  const [spec, setSpec] = useState([]);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    // let spc = prod?.features.slice(0, 4);
    let spc = prod?.features;
    setSpec(spc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod]);
  const handleSeeMore = () => {
    dispatch(setInFeature({ ftr: prod?.features, title: prod?.title }));
    history.push(`/store/product/features/${pathname.split("/")[3]}`);
  };
  const { loading } = useLoading(prod);
  if (loading)
    <div>
      <ContentLoader height={20} width={"100%"}>
        <rect x="80%" y="0" rx="5" ry="5" width="100%" height="20" />
      </ContentLoader>
    </div>;
  return (
    <ProdParent>
      <ProdPadding>
        <ProdSpecContainer>
          <ProdTopTitle style={{ padding: "15px 0px" }}>مشخصات</ProdTopTitle>
          <ProdSpecList>
            {!loading ? (
              spec?.slice(0,4).map((item) => (
                <ProdSpecItem key={item.name}>
                  <ProdSpecItemTitle>{item.name} :</ProdSpecItemTitle>
                  <ProdSpecItemDesc>
                    {+item.value
                      ? item.value.toLocaleString("fa-IR")
                      : item.value}
                  </ProdSpecItemDesc>
                </ProdSpecItem>
              ))
            ) : (
              <ContentLoader width={"100%"} height={200}>
                <rect x="37" y="34" rx="0" ry="0" width="100%" height="0" />
                <rect x="28" y="29" rx="0" ry="0" width="100%" height="32" />
                <rect x="28" y="71" rx="0" ry="0" width="100%" height="32" />
                <rect x="434" y="94" rx="0" ry="0" width="100%" height="0" />
                <rect x="29" y="116" rx="0" ry="0" width="100%" height="32" />
              </ContentLoader>
            )}
          </ProdSpecList>
          {!loading && prod?.features.length > 4 ? (
            <ProdSpecSeeMore onClick={handleSeeMore}>
              <span>ادامه مطلب</span>
              <ArrowBackIosIcon style={{ fontSize: 12, color: "#6b6b6b" }} />
            </ProdSpecSeeMore>
          ) : null}
        </ProdSpecContainer>
      </ProdPadding>
    </ProdParent>
  );
};

export default ProductSpecifications;
