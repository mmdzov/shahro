import React from "react";
import toPersian from "utilities/ToPersian";

const PostContent = ({ post }) => {
  const trimBreaks = (text) => {
    const convert = text.split(/^\s*[\r\n]/gm);
    return convert.join("\n\n");
  };
  return (
    <>
      {post !== null && (
        <div className={`container mx-auto px-10`}>
          <br />
          <h1 className={"text-xl font-bold mb-1 mt-4"}>{post.title}</h1>
          <h6 className="mb-8" style={{ fontSize: ".9rem" }}>
            {post?.subtitle}
          </h6>
          <p
            className={`whitespace-pre-wrap`}
            style={{
              lineHeight: "3rem",
              // word-break: break-all;
              fontFamily: "noto regular",
              fontWeight: 400,
            }}
          >
            {toPersian(trimBreaks(post.text))}
          </p>
        </div>
      )}
    </>
  );
};

export default PostContent;
