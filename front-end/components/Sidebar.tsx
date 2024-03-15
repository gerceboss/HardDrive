import React from "react";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="#">All Files</a>
        </li>
        <li>
          <a href="#">All Folders</a>
        </li>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/drive">Drive</a>
        </li>
      </ul>
    </div>
  );
};
