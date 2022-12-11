import React from "react";

const Like = ({ liked, onLikeToggle }) => {
  let classes = "bi bi-heart";
  if (liked) classes += "-fill";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={onLikeToggle}
    ></i>
  );
};

export default Like;
