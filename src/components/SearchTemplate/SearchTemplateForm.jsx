/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Ripples from "components/Utilities/Ripples";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContainer as Form } from "./SearchTemplate.styled";

const SearchTemplateForm = ({ context: Context, list = [] }) => {
  const {
    search,
    setSearch,
    searched,
    handleSubmitSearch,
    firstClick,
    setFirstClick,
  } = useContext(Context);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const btnRf = useRef(null);
  const rf = useRef(null);
  useEffect(() => {
    console.log();
    console.log(searched, firstClick, search);
    if (!firstClick && searched.length > 0) {
      setSearch(searched);
      btnRf.current.click();
      setFirstClick(true);
    }
  }, [searched]);
  useEffect(() => {
    if (list.length === 0) {
      rf.current.focus();
    }
  }, []);
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <input
        autoComplete="off"
        type="text"
        name="search"
        value={search}
        ref={rf}
        onChange={handleChange}
      />
      <Ripples onClick={handleSubmitSearch} color="gray" radius="5px">
        <button type="submit" ref={btnRf} style={{ width: "50px" }}>
          <svg
            enableBackground="new 0 0 100 100"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 100 100"
          >
            <path
              clipRule="evenodd"
              d="M64.5,44.6c0-11.6-9.4-20.9-20.9-20.9c-11.6,0-20.9,9.4-20.9,20.9  c0,11.6,9.4,20.9,20.9,20.9C55.1,65.6,64.5,56.2,64.5,44.6z M80,79.3l-1.8,1.8l-19-19c-4.2,3.7-9.6,6-15.7,6  c-13,0-23.5-10.5-23.5-23.5c0-13,10.5-23.5,23.5-23.5c13,0,23.5,10.5,23.5,23.5c0,6-2.3,11.5-6,15.7L80,79.3z"
              fill="#aaa"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </Ripples>
    </Form>
  );
};

export default SearchTemplateForm;
