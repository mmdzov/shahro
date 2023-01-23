import useLoading from "hooks/useLoading";
import useSlideScroll from "hooks/useSlideScroll";
import { useSelector } from "react-redux";
import SlideTempImg from "../SlideTemp/SlideTempImg";
import ProductImg from "components/SlideTemp/productImg";
import ImageIcon from "@material-ui/icons/Image";
import styled from "styled-components";
import Slider from "components/Utilities/Slider";

const AdsSingleSlider = () => {
  const { slides } = useSelector(({ ads }) => ads.adsSingle);
  const { loading } = useLoading(slides);
  const { handleError } = useSlideScroll(slides, "slider");

  if (loading) return <ProductImg height="330px" />;
  if (slides?.length === 0)
    return (
      <AdsNotFound>
        <ImageIcon />
      </AdsNotFound>
    );
  if (slides?.length === 1)
    return (
      <SlideTempImg
        isError={slides[0]?.error}
        onProblem={handleError}
        token={slides[0]?.token}
        src={slides[0]?.image}
        // style={{ height: "330" }}
        height={330}
      />
    );
  return <Slider slides={slides} ads />;
};

const AdsNotFound = styled.div`
  height: 332px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    font-size: 6rem;
    color: #ababab;
  }
`;

// const Slider = styled(AdsSlider)`
//   @media (min-width: 640px) {
//     margin-top: 10px;
//   }
// `;

export default AdsSingleSlider;
