import React, { useState, useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import "./index.css";
import { useNavigate } from "react-router-dom";
export default function MainDrawer(props) {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        console.log("Yesss");
        if (ref.current && !ref.current.contains(event.target)) {
          props.onClose();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem("isadmin");

  return (
    <Drawer
      anchor={"left"}
      open={props.drawer}
      style={{ width: "max-content" }}
    >
      <div ref={wrapperRef} style={{ width: "max-content", height: "100%" }}>
        <div
          className="drawer-item"
          onClick={() => {
            navigate("/dashboard-table");
          }}
        >
          Vehicle Details
        </div>
        {isAdmin === "true" && (
          <div
            className="drawer-item"
            onClick={() => {
              navigate("/dashboard-table/user-details");
            }}
          >
            User Details
          </div>
        )}
        <div className="drawer-item">Sales Details </div>
      </div>
    </Drawer>
  );
}
