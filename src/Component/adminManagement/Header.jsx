import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import MainDrawer from "../Drawer";

function Header() {
  const navigate = useNavigate();
  const UserName = sessionStorage.getItem("userName");
  const [drawer, setDrawer] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        padding: "5px 0",
        backgroundColor: "darkblue",
      }}
    >
      <div>
        <MenuIcon
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => {
            setDrawer(!drawer);
          }}
        />
      </div>
      <div style={{ width: "65%", color: "white", fontSize: "20px" }}>
        <label>VEHICLE DETAILS </label>
      </div>
      <div style={{ width: "15%", color: "white" }}>
        <label>Welcome {UserName}</label>
      </div>
      <div style={{ width: "10%" }}>
        <label
          style={{
            cursor: "pointer",
            color: "white",
            textDecoration: "underline",
          }}
          onClick={() => {
            sessionStorage.clear();
            navigate("/");
          }}
        >
          Log Out
        </label>
      </div>
      <MainDrawer drawer={drawer} onClose={()=>setDrawer(false)} />
    </div>
  );
}

export default Header;
