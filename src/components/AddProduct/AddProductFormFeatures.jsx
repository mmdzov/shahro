/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import AddProductContext from "context/AddProductContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { FeaturesContainer, FeatureRow } from "./AddProductForm.styled";
import FeatureButtons from "./FeatureButtons";
import FeatureColumnList from "./FeatureColumnList";

const AddProductFormFeatures = ({ defaultRows = 1 }) => {
  // const [rows, setRows] = useState([]);
  const [whenTrue, setWhenTrue] = useState(false);
  const { form, setForm, count, setCount } = useContext(AddProductContext);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const rws = [...form?.features];
    for (let i = 0; i < defaultRows; i++) {
      rws.push({
        id: ~~(Math.random() * 99999999),
        isLastItem: i + 1 === defaultRows ? true : false,
        canDelete: i + 1 === defaultRows ? false : true,
        columns: [],
      });
    }
    setForm((prev) => ({ ...prev, features: rws }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function getWidth() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", () => getWidth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (width <= 469) setCount(1);
  //   if (width >= 470) setCount(2);
  //   if (width >= 720) setCount(3);
  //   if (width >= 1024) setCount(4);
  //   if (width >= 1320) setCount(5);
  // }, [width]);
  const handleAppendRow = () => {
    let rws = [...form?.features];
    rws = rws.map((item) => {
      item.isLastItem = false;
      item.canDelete = true;
      return item;
    });
    rws.push({
      id: ~~(Math.random() * 99999999),
      isLastItem: true,
      canDelete: true,
      columns: [],
    });
    setForm((prev) => ({ ...prev, features: rws }));
  };

  useEffect(() => {
    const rws = [...form?.features];
    if (rws.length === 1 && !whenTrue) {
      setWhenTrue(true);
      const getCol = rws[0].columns.some((item) => {
        if (item?.title?.length > 0 || item?.value?.length > 0) return true;
        return false;
      });
      if (getCol) {
        rws[0].canDelete = true;
        handleDeleteRow(rws[0].id, "fromHook");
        // setWhenTrue(false);
      } else {
        rws[0].canDelete = false;
        setForm((prev) => ({ ...prev, features: rws }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form?.features, whenTrue]);

  const handleDeleteRow = (id, from = "") => {
    const rws = [...form?.features];
    if (from !== "fromHook") {
      setWhenTrue(false);
    } else if (rws.length === 1) return;
    let deletedRow = rws.filter((item) => item.id !== id);
    deletedRow = deletedRow.map((item) => {
      item.isLastItem = false;
      item.canDelete = true;
      return item;
    });
    const index = deletedRow.length - 1;
    if (deletedRow.length > 0) {
      deletedRow[index].isLastItem = true;
      deletedRow[index].canDelete = true;
    } else {
      deletedRow.push({
        id: ~~(Math.random() * 99999999),
        isLastItem: true,
        canDelete: true,
        columns: [],
      });
    }
    setForm((prev) => ({ ...prev, features: deletedRow }));
  };
  const columnCallback = (id, column, colIndex) => {
    const index = form?.features.findIndex((item) => item.id === id);
    const rws = [...form?.features];
    const item = rws[index];
    item.columns = column;
    const itemCol = item.columns[colIndex];
    if (itemCol?.title?.length > 0 || itemCol?.value?.length > 0) {
      item.canDelete = true;
    } else {
      item.canDelete = true;
    }
    // rws[index] = item;
    setForm((prev) => ({ ...prev, features: rws }));
  };
  return (
    <FeaturesContainer>
      {form?.features.map((item) => (
        <FeatureRow key={item.id} className="addProductFormFeatureBackground">
          <FeatureColumnList
            count={count}
            id={item.id}
            columnsCallback={columnCallback}
          />
          <FeatureButtons
            isLastItem={item.isLastItem}
            length={form?.features.length}
            canDelete={item.canDelete}
            onAppend={handleAppendRow}
            onDelete={() => handleDeleteRow(item.id)}
          />
        </FeatureRow>
      ))}
    </FeaturesContainer>
  );
};

export default AddProductFormFeatures;
