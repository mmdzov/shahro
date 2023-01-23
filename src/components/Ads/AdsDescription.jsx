import useLoading from "hooks/useLoading";
import { useSelector } from "react-redux";
import styled from "styled-components";
import toPersian from "utilities/ToPersian";
import { Fragment } from "react";
import DescriptionLoading from "components/Utilities/Loadings/DescriptionLoading";

const AdsDescription = () => {
  const { ads } = useSelector(({ ads }) => ads.adsSingle);
  const { loading } = useLoading(ads);
  if (loading) return <DescriptionLoading />;
  return (
    <div>
      <div>
        <AdsText>
          {toPersian(ads?.text)
            ?.split("\\n")
            ?.map((item) => (
              <Fragment key={~(Math.random() * 99999999999999)}>
                <span>
                  {item}
                  <br />
                </span>
              </Fragment>
            ))}
        </AdsText>
      </div>
    </div>
  );
};
const AdsText = styled.div`
  margin-top: 15px;
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 28px;
`;
export default AdsDescription;
