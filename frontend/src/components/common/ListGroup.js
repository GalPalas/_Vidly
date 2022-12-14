import React from "react";

const ListGroup = ({ items, selectedItem, onItemsSelect }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item._id}
          onClick={() => onItemsSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
