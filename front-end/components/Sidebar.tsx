import React from "react";
import { Title } from "./Title";
import { useRouter } from "next/router";


export const Sidebar = (props : any) =>{
  const router = useRouter();

  const goToDrivePage = () => {
    router.push('/drive');
  };
  const goToHomePage = () => {
    router.push('/');
  };
  const clickFolders = () =>{
    props.setdisplayFolders(true);
    props.setdisplayFiles(false);
  }
  const clickFiles = () =>{
    props.setdisplayFolders(false);
    props.setdisplayFiles(true);
  }
  const clickAll = () =>{
    props.setdisplayFolders(true);
    props.setdisplayFiles(true);
  }


    return (
    <>
      <div className="sidebar">
        <ul>
          <li>
          <Title />
          </li>
          <li onClick={clickAll}>
            <a>All Files and Folders</a>
          </li>
          <li onClick={clickFiles}>
            <a>All Files</a>
          </li>
          <li onClick={clickFolders}>
            <a>All Folders</a>
          </li>
          <li onClick={goToHomePage}>
            <a>Home</a>
          </li>
          <li onClick={goToDrivePage}>
            <a>Drive</a>
          </li>
        </ul>
      </div>
    </>
    );

};

