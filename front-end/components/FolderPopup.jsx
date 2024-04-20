import React, { useState } from 'react';

export const FolderPopup = (props) => {

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Create New Folder</h2>
        <input
          type="text"
          placeholder="Enter folder name"
          value={props.folderName}
          onChange={(e) => props.setFolderName(e.target.value)}
        />
        <div className="buttons">
          <button onClick={props.createFolder}>Create</button>
          <button onClick={() => props.setShowForm(0)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
