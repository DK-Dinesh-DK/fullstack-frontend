import React, { useEffect, useState } from "react";
import { DataRequest } from "../../../service/api";
import { FormLabel, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "../../index.css";
import { tableApiUrl } from "../../../service/request";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@mui/material";
import AddTable from ".";

const VehicleDetails = () => {
  const [tableData, setTableData] = useState([]);

  const [newDataModal, setNewDataModal] = useState(false);
  const [editDataModal, setEditDataModal] = useState(false);
  const [deleteDataModal, setDeleteDataModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newData, setNewData] = useState({
    type: "",
    modal: "",
    cost: "",
    color: "",
    company: "",
    id: "",
  });
  const [edit, setEdit] = useState(true);

  const navigate = useNavigate();

  const Token = sessionStorage.getItem("token");

  const isAdmin = sessionStorage.getItem("isadmin");
  const userName = sessionStorage.getItem("userName");

  async function getdata() {
    var res = await DataRequest("get", tableApiUrl.getTableData, {
      token: Token,
    });
    console.log("---", res);
    if (res.data.status === 200) {
      setTableData(res.data.items);
    } else {
      setErrorModal(!errorModal);
      res.data.message
        ? setErrorMessage(res.data.message)
        : setErrorMessage("Something Went Wrong");
    }
  }
  useEffect(() => {
    getdata();
  }, []);

  async function AddItem() {
    if (
      newData.color !== "" ||
      newData.company !== "" ||
      newData.cost !== "" ||
      newData.modal !== "" ||
      newData.type !== ""
    ) {
      var response = await DataRequest("post", tableApiUrl.addTableData, {
        ...newData,
        token: Token,
        userName:userName
      });
      if (response.status === 200) {
        setNewDataModal(!newDataModal);
        setNewData({
          type: "",
          modal: "",
          cost: "",
          color: "",
          company: "",
          id: "",
        });
      }
    }
  }

  const deleteItem = async (value) => {
    var res = await DataRequest("delete", tableApiUrl.deleteTabledata, {
      id: value,
      token: Token,
      userName:userName
    });
    if (res.status === 200) {
      setDeleteDataModal(!deleteDataModal);
    }
  };

  const EditItem = (item) => {
    setNewData({
      type: item.type,
      modal: item.modal,
      cost: item.cost,
      color: item.color,
      company: item.company,
      id: item._id,
    });
  };
  const updateData = async () => {
    if (
      newData.color !== "" ||
      newData.company !== "" ||
      newData.cost !== "" ||
      newData.modal !== "" ||
      newData.type !== ""
    ) {
      var res = await DataRequest("put", tableApiUrl.editTableData, {
        ...newData,
        token: Token,
        userName:userName
      });
      if (res.status === 200) {
        setEditDataModal(!editDataModal);
        setNewData({
          type: "",
          modal: "",
          cost: "",
          color: "",
          company: "",
          id: "",
        });
      }
    } else {
      alert("Please Enter atleast any one field");
    }
  };

  const columnData = [
    {
      headerName: "S.No",
      width: 80,
      valueFormatter: (params) => params.node.rowIndex,
    },
    { headerName: "Type", field: "type", filter: true, width: 150 },
    { headerName: "Company", field: "company", filter: true, width: 150 },
    { headerName: "Modal", field: "modal", filter: true, width: 150 },
    { headerName: "Color", field: "color", filter: true, width: 150 },
    { headerName: "Cost", field: "cost", filter: true, width: 150 },
    ...(isAdmin === "true"
      ? [
          {
            headerName: "Edit",
            cellRenderer: (params) => {
              return (
                <Button
                  variant="contained"
                  data-testid={`edit-${params.rowIndex}`}
                  onClick={(event) => {
                    EditItem(params.data);
                    setEdit(false);
                  }}
                >
                  <EditIcon />
                  Edit
                </Button>
              );
            },
          },
          {
            headerName: "Delete",
            cellRenderer: (params) => {
              return (
                <Button
                  variant="contained"
                  // style={{ backgroundColor: "green", width: "100px", color: "white" }}
                  data-testid={`delete-${params.rowIndex}`}
                  onClick={() => {
                    deleteItem(params.data._id);
                  }}
                >
                  <DeleteOutlinedIcon style={{ height: "100%" }} />
                  Delete
                </Button>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <>
      {isAdmin === "true" && (
        <div className="input-container">
          <FormLabel> Type:</FormLabel>
          <Input
            name="type"
            value={newData.type}
            placeholder="Enter Type"
            onChange={(e) => {
              setNewData({ ...newData, type: e.target.value });
            }}
          />

          <FormLabel> Company:</FormLabel>

          <Input
            value={newData.company}
            name="company"
            placeholder="Enter Company"
            onChange={(e) => {
              setNewData({ ...newData, company: e.target.value });
            }}
          />
          <FormLabel>Modal:</FormLabel>
          <Input
            name="modal"
            placeholder="Enter Modal"
            style={{ textAlign: "center" }}
            value={newData.modal}
            onChange={(e) => {
              setNewData({ ...newData, modal: e.target.value });
            }}
          />
          <FormLabel>Color:</FormLabel>
          <Input
            value={newData.color}
            placeholder="Enter Color"
            onChange={(e) => {
              setNewData({ ...newData, color: e.target.value });
            }}
          />
          <FormLabel>Cost:</FormLabel>
          <Input
            name="cost"
            placeholder="Enter Cost"
            value={newData.cost}
            onChange={(e) => {
              setNewData({ ...newData, cost: e.target.value });
            }}
          />
          {edit ? (
            <Button
              variant="contained"
              data-testid="add"
              style={{ width: "80px", backgroundColor: "blue", color: "white" }}
              onClick={AddItem}
            >
              Add
            </Button>
          ) : (
            <Button
              variant="contained"
              data-testid="update"
              style={{ width: "80px", backgroundColor: "blue", color: "white" }}
              onClick={() => {
                updateData();
              }}
            >
              Update
            </Button>
          )}
        </div>
      )}
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnData}
          rowData={tableData}
          rowHeight={40}
          headerHeight={40}
        />
      </div>
      <Modal className="modal" show={newDataModal}>
        <div className="modal-div">
          <p>New Data Added To Table Successfully</p>
          <Button
            onClick={() => {
              setNewDataModal(!newDataModal);
              getdata();
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
      <Modal className="modal" show={editDataModal}>
        <div className="modal-div">
          <p>Table Data is Updated Successfully.</p>
          <Button
            onClick={() => {
              setEditDataModal(!editDataModal);
              getdata();
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
      <Modal className="modal" show={deleteDataModal}>
        <div className="modal-div">
          <p>Table Data is Deleted Successfully.</p>
          <Button
            onClick={() => {
              setDeleteDataModal(!deleteDataModal);
              getdata();
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
      <Modal className="modal" show={errorModal}>
        <div className="modal-div">
          <p>{errorMessage}</p>
          <Button
            onClick={() => {
              setErrorModal(!errorModal);
              navigate("/");
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default VehicleDetails;
