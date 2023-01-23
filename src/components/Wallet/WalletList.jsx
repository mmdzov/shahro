import {
  Container,
  List,
  Item,
  Row,
  Row1Wrapper,
  Time,
  Price,
  Label,
  Plus,
} from "./Wallet.styled";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ToPersian from "utilities/ToPersian";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Arrow = ({ mode = "deposit" }) => {
  return (
    <Icon className="walletListIconBackground">
      {mode === "deposit" ? (
        <ArrowDownwardIcon style={{ color: "#08b308", fontSize: "1.2rem" }} />
      ) : (
        <ArrowUpwardIcon style={{ color: "#f45b5b", fontSize: "1.2rem" }} />
      )}
    </Icon>
  );
};

const WalletList = () => {
  const { wallet } = useSelector(({ account }) => account);
  return (
    <Container>
      <Transactions>تراکنش ها</Transactions>
      <List>
        {wallet?.map((item) => (
          <Item key={~~(Math.random() * 99999999)} className="walletItem">
            <Row>
              <Row1Wrapper>
                <Arrow mode={item?.type === 1 ? "deposit" : "pickUp"} />
                <span style={{ fontWeight: 600 }}>
                  {item?.type === 1 ? "واریز" : "برداشت"}
                </span>
              </Row1Wrapper>
              <Time style={{ direction: "ltr" }}>
                {ToPersian(item?.datetime)}
              </Time>
            </Row>
            <Row>
              <div className="flex items-center">
                <Price
                  color={item?.type === 1 ? "#08b308" : "rgb(244, 91, 91)"}
                >
                  {(item?.value).toLocaleString("fa-IR")}{" "}
                  <Plus>{item?.type === 1 ? "+" : "-"}</Plus>
                </Price>
                <Label>{item?.type === 1 ? "افزایش" : "کاهش"} موجودی</Label>
              </div>
            </Row>
            <Row style={{ height: 29 }}>
              <div className="flex">
                <Label>شماره ارجاع : </Label>
                <div>{item?.hash}</div>
              </div>
            </Row>
          </Item>
        ))}
      </List>
    </Container>
  );
};

const Icon = styled.div`
  width: 30px;
  border-radius: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Transactions = styled.span`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export default WalletList;
