import React, { useState } from 'react';

export const FilePopup = (props) =>{
    
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Upload New File</h2>
        <input
          type="file"
          placeholder="Browse File"
          onChange={(e) => {
            if (e.target.files) {
              props.setFile(e.target.files[0]);
            }
          }}
        />
        <div className="buttons">
          <button onClick={props.uploadToIpfs}>Upload</button>
          <button onClick={() => props.setShowImgForm(0)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}