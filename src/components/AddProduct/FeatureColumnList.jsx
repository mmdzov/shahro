import CustomInput from "components/Utilities/CustomInput";
import { useEffect, useState } from "react";
import {
  FeatureColumnContainer,
  FeatureColumnIItem,
} from "./AddProductForm.styled";

const FeatureColumnList = ({ count = 0, columnsCallback = () => {}, id }) => {
  const [perRow, setPerRow] = useState([]);
  useEffect(() => {
    if (count > perRow.length) {
      setPerRow([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perRow]);
  useEffect(() => {
    // setPerRow([]);
    const perRowCountList = [];
    for (let i = 0; i < count; i++) {
      perRowCountList.push({
        name: "name" + ~~(Math.random() * 999999999),
        title: "",
        value: "",
        id: "id" + ~~(Math.random() * 999999999),
      });
    }
    columnsCallback(id, perRowCountList);
    setPerRow(perRowCountList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const handleChange = (e, mode) => {
    const { name, value } = e.target;
    const cols = [...perRow];
    const index = cols.findIndex((item) => item.name === name);
    cols[index][mode] = value;
    columnsCallback(id, cols, index);
    setPerRow(cols);
  };
  return (
    <FeatureColumnContainer count={count}>
      {perRow.map((item) => (
        <FeatureColumnIItem key={item.id}>
          <CustomInput
            mode="group"
            name={item.name}
            value={item.title}
            tabIndex="-1"
            label="نام ویژگی"
            onChange={(e) => handleChange(e, "title")}
          />
          <CustomInput
            mode="group"
            name={item.name}
            value={item.value}
            label="توضیح ویژگی"
            tabIndex="-1"
            onChange={(e) => handleChange(e, "value")}
          />
        </FeatureColumnIItem>
      ))}
    </FeatureColumnContainer>
  );
};

export default FeatureColumnList;
