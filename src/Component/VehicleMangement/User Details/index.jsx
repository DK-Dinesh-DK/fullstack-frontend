import React, { useEffect, useState } from "react";
import { DataRequest } from "../../../service/api";
import { userApiUrl, userListUrl } from "../../../service/request";
import { AgGridReact } from "ag-grid-react";
import { Switch, ToggleButton } from "@mui/material";

function UserDetails() {
  const [userList, setUserList] = useState([]);

  const userName = sessionStorage.getItem("userName");
  const getUserList = async () => {
    let res = await DataRequest("post", userListUrl.userList, {
      userName: userName,
    });
    console.log("userList", res);
    if (res) {
      setUserList(res.data.data);
    }
  };
  const userModeChange = async (data) => {
    let res = await DataRequest("post", userListUrl.userModeUpdate, {
      userName: userName,
      ...data,
      id: data._id,
    });

    if (res) {
      console.log("userList", res);
      getUserList();
    }
  };

  useEffect(() => {
    getUserList();
  }, []);
  const columns = [
    { headerName: "User Name", field: "username", filter: true },
    { headerName: "Email", field: "email", filter: true, width: 300 },
    {
      headerName: "Blocked",
      cellRenderer: (props) => {
        return (
          <Switch
            checked={props.data.blocked === true ? true : false}
            onChange={(e) => {
              console.log("ee", e.target.value);
              userModeChange({ ...props.data, blocked: e.target.checked });
            }}
          />
        );
      },
    },
  ];
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact columnDefs={columns} rowData={userList} headerHeight={40} />
    </div>
  );
}

export default UserDetails;
