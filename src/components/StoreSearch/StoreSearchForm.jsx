/* eslint-disable react-hooks/exhaustive-deps */
import StoreContext from "context/StoreContext";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContainer as Form } from "../AdsSearch/AdsSearch.styled";

const StoreSearchForm = () => {
  const { search, setSearch, searched, handleSubmitSearch } = useContext(
    StoreContext
  );
  const [firstClick, setFirstClick] = useState(false);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const btnRf = useRef(null);
  const rf = useRef(null);
  useEffect(() => {
    if (!firstClick && searched.length > 0) {
      btnRf.current.click();
      setFirstClick(true);
    }
  }, [searched]);
  useEffect(() => {
    rf.current.focus();
    return () => setSearch("");
  }, []);
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        name="search"
        value={search}
        ref={rf}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmitSearch} ref={btnRf}>
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
    </Form>
  );
};

export default StoreSearchForm;
