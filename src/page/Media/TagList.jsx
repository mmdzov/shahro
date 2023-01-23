/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  changeCategory,
  setLoadingMedia,
} from "../../store/actions/mediaActions";
import CategoryLodaing from "../../components/Utilities/Loadings/CategoryLodaing";
import classes from "./TagItem.module.css";
import styled from "styled-components";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const TagList = ({ tags, setLoadingMedia, loading }) => {
  const { hasCat } = useSelector(({ media }) => media);
  const { cats } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickTag = () => {
    setLoadingMedia();
    dispatch(changeCategory(cats, history));
  };
  useEffect(() => {
    if (!hasCat) {
      onClickTag(cats ?? null);
    }
  }, [cats]);
  return (
    <>
      {!loading ? (
        tags && (
          <div className={`flex overflow-x-auto mx-4 mt-5 mb-2 pb-0`}>
            {tags?.map((tag, index) => (
              <NavLink
                to={`/media${tag.token ? "/" + tag.token : ""}`}
                activeClassName="activeLink"
                exact
                key={index}
                className={` ${classes.TagItem} rounded-lg shadow-sm bg-white py-1 px-2 border border-gray-300 mx-1 font-bold cursor-pointer flex-shrink-0 my-2 `}
              >
                {tag.name}
              </NavLink>
            ))}
          </div>
        )
      ) : (
        <CategoryLodaing />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.media.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoadingMedia: () => dispatch(setLoadingMedia()),
    changeCategory: (catToken) => dispatch(changeCategory(catToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagList);
