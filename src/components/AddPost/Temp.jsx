import CustomInput from "components/Utilities/CustomInput";
import styled from "styled-components";
import toToman from "utilities/toToman";
import "./Temp.css";
const Temp = ({
  change,
  msg,
  tel = false,
  label,
  value,
  name,
  amount,
  type = true,
  dir = "rtl",
  ...props
}) => {
  return (
    <div
      style={{
        position: "relative",
        height: tel ? 110 : type ? 110 : 190,
        color: msg ? "red" : "black",
      }}
    >
      <CustomInput
        fontSize="1rem"
        fontWeight="600"
        value={value}
        label={label}
        type={tel ? "tel" : type ? "input" : "textarea"}
        mode="group"
        name={name}
        onChange={change}
        style={{
          height: type ? 45 : 135,
          border: msg ? "1px solid red" : "1px solid #0095ff",
          borderRadius: 5,
          margin: "5px 5px 20px 5px",
          direction: dir,
        }}
        className={`tempInput`}
      />
      <Invalid>
        <span>{msg}</span>
        {amount ? <Amount>{toToman(amount)}</Amount> : null}
      </Invalid>
    </div>
  );
};

const Amount = styled.div`
  color: #40a6fd;
  font-weight: 600;
`;

const Invalid = styled.div`
  font-size: 0.8rem;
  display: grid;
  width: 100%;
  padding: 0 7px;
  padding-right: 15px;
  margin-top: -20px;
  grid-template-columns: 1fr auto;
`;

export default Temp;
