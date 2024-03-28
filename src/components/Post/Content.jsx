import React from "react";

const Content = ({ tweet }) => {
  return (
    <>
      {tweet.textContent && <p>{tweet.textContent}</p>}
      {tweet.imageContent && (
        <img
          src={tweet.imageContent}
          className="max-h-[400px] object-cover w-full rounded-lg my-2"
          alt="NYC"
        />
      )}
    </>
  );
};

export default Content;
