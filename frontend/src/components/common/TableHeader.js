import React from "react";

const TableHeader = ({ columns, onSort, sortColumn }) => {
  const raisSort = (path) => {
    const SortColumn = { ...sortColumn };
    if (SortColumn.path === path)
      SortColumn.order = SortColumn.order === "asc" ? "desc" : "asc";
    else {
      SortColumn.path = path;
      SortColumn.order = "asc";
    }
    onSort(SortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="bi bi-caret-up-fill"></i>;
    return <i className="bi bi-caret-down-fill"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            style={{ cursor: "pointer" }}
            key={column.path || column.key}
            onClick={() => raisSort(column.path)}
          >
            {column.lable} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
