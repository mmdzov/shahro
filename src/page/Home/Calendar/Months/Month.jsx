import React from "react";
import styled from "styled-components";

const Month = React.forwardRef((props, ref) => {
  return (
    <Container
      onClick={props.handleClick}
      ref={ref}
      data-id={props["data-id"]}
      style={{ cursor: "pointer" }}
      className={`relative m-2 inline-block justify-center items-center  rounded-md h-24 w-48 text-white bg-gradient-to-r ${props.gradient} `}
    >
      <MonthItem>{props.monthName}</MonthItem>
    </Container>
  );
});
const Container = styled.div`
  cursor: pointer;
  height: 50px;
  width: 180px;
  display: grid;
  margin: 0 5px;
  &:last-of-type {
    margin-right: 10px;
  }
  &:first-of-type {
    margin-left: 10px;
  }
`;
const MonthItem = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export default Month;
