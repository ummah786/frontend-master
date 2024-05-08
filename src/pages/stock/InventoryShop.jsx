import {
  Box,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import * as React from "react";
import { useEffect, useState } from "react";
import { InventoryDataModel } from "../../datamodel/ManageUserDataModel";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import UserRole from "../../jsonfile/Role";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Delete from "@mui/icons-material/Delete";
import {
  addExistingInventory,
  addExistingMangeUser,
  addInventory,
  addKeyRack,
  addKeyWarehouse,
  addManageUser,
  updateInventory,
  updateManageUser,
} from "../../redux/Action";
import ArticleIcon from "@mui/icons-material/Article";
import * as XLSX from "xlsx";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { DELETE_KEY_VALUE, SAVE_KEY_VALUE } from "../apiendpoint/APIEndPoint";
import { List, ListItem, ListItemButton } from "@mui/joy";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledTableCell,
  StyledTableRow,
} from "../../commonStyle";
import {
  addKeyCategory,
  addKeyCompany,
  addParty,
  removeKeyCategory,
  removeParty,
} from "../../redux/Action";

import { Input } from "@mui/joy";

export const InventoryShop = () => {
  const [enable, setEnable] = useState(true);
  const [enableBulk, setEnableBulk] = useState(true);
  const [inventoryObject, setInventoryObject] = useState(InventoryDataModel);
  const [inventory, setInventory] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginReducerValue);
  const { partyUser } = useSelector((state) => state.partyReducerValue);
  const [openRack, setOpenRack] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openWarehouse, setOpenWarehouse] = React.useState(false);
  const [openCompany, setOpenCompany] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setInventoryObject({
      ...inventoryObject,
      lowStockCheckBox: event.target.checked,
    });
  };
  const handleBooleanChange = () => {
    setInventoryObject(InventoryDataModel);
    setEnable(false);
    setEnableBulk(true);
  };

  function handleBooleanCancelChange() {
    setEnableBulk(true);
    setEnable(true);
    setExcelData([]);
    setColumns([]);
    setFiles([]);
  }

  const handleBulkChange = () => {
    setEnableBulk(false);
    setEnable(true);
  };

  const handleTextFieldChange = (event, field) => {
    setInventoryObject({
      ...inventoryObject,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    inventoryObject["primary_user_id"] = loginData.primary_user_id;
    inventoryObject["secondary_user_id"] = loginData.secondary_user_id;
    const response = await axios.post(
      "http://localhost:8700/hesabbook/inventory/save",
      inventoryObject
    );
    console.log("Submit Response :--    ", response.data);
    console.log("on Submit :-->", inventoryObject);
    dispatch(addExistingInventory(response.data));
    setInventoryObject(InventoryDataModel);
    setEnable((prevState) => !prevState);
  };

  async function handleDelete(id, event) {
    console.log("DELETE ID " + id);
    const response = await axios.post(
      `http://localhost:8700/hesabbook/inventory/delete/${id}`
    );
    console.log("Submit delete Response :--    ", response.data);
    fetchAllManageUserData();
  }

  function handleEdit(id, data) {
    handleBooleanChange();
    findObjectById(id);
    fetchAllManageUserData();
    dispatch(updateInventory(data));
  }

  const findObjectById = (id) => {
    const foundItem = inventory.find((item) => item.id === id);
    if (foundItem) {
      setInventoryObject(foundItem);
    } else {
      console.log("Object with ID", id, "not found");
    }
  };

  function fetchAllManageUserData() {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8700/hesabbook/inventory/all/${loginData.primary_user_id}`
        );
        console.log(response.data.response);
        setInventory(response.data.response);
        dispatch(addInventory(response.data.response));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    return fetchData;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8700/hesabbook/inventory/all/${loginData.primary_user_id}`
        );
        console.log("Party Response ", response.data.response);
        if (response.data.code === 200) {
          setInventory(response.data.response);
          dispatch(addInventory(response.data.response));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setInventory]);

  function handleView(id, row) {}

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFiles(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const headers = data.shift();
      const columns = headers.map((header, index) => ({
        field: "col" + index,
        headerName: header,
        width: 150,
      }));
      const rows = data.map((row, rowIndex) => {
        const rowData = {};
        row.forEach((cell, cellIndex) => {
          rowData["col" + cellIndex] = cell;
        });
        rowData.id = rowIndex + 1; // Assigning unique id to each row
        return rowData;
      });
      setColumns(columns);
      setExcelData(rows);
    };
    reader.readAsBinaryString(file);
  };

  function FileUpload({ onFileChange }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      onFileChange(file);
    };
    return (
      <div>
        <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
      </div>
    );
  }

  const handleSave = async () => {
    console.log("excel sheet  ", excelData);
    console.log("data sheet ", columns);
    const formData = new FormData();
    formData.append("file", files);
    const response = await axios.post(
      `http://localhost:8700/hesabbook/inventory/upload/${loginData.primary_user_id}/${loginData.secondary_user_id}`,
      excelData
    );
    console.log("response from handleSave ", response.data);
  };

  // rack warehouse company category details

  const [addCategory, setAddCategory] = React.useState([]);
  const [categoryApi, setCategoryApi] = useState();

  const keyCompanyData = useSelector((state) => state.keyCompanyReducerValue);
  const keyCategoryData = useSelector((state) => state.keyCategoryReducerValue);
  const KeyRackData = useSelector((state) => state.keyRackReducerValue);
  const KeyWarehouseData = useSelector(
    (state) => state.keyWarehouseReducerValue
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const closeModelForRack = () => {
    setOpenRack(false);
    setAddCategory([]);
  };
  const closeModelForWarehouse = () => {
    setOpenWarehouse(false);
    setAddCategory([]);
  };
  const closeModelForCompany = () => {
    setOpenCompany(false);
    setAddCategory([]);
  };

  const closeModelForCategory = () => {
    setOpenCategory(false);
    setAddCategory([]);
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const handleClickForCategory = (e) => {
    e.preventDefault();
    handleSubmitToKeyValuePairForCategory();
    setCategoryApi("");
  };
  const handleSubmitToKeyValuePairForCategory = async () => {
    try {
      const response = await axios.post(
        SAVE_KEY_VALUE,
        {
          kes: "category",
          value: categoryApi,
          primary_user_id: loginData.primary_user_id,
        },
        axiosConfig
      );
      console.log("save Categroy response ", response.data.response.value);
      dispatch(
        addKeyCategory([response.data.response.value, ...keyCategoryData])
      );
      setAddCategory([...addCategory, response.data.response]);
      console.log("Add Category ", addCategory);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClickForRack = (e) => {
    e.preventDefault();
    handleSubmitToKeyValuePairForRack();
    setCategoryApi("");
  };
  const handleSubmitToKeyValuePairForRack = async () => {
    try {
      const response = await axios.post(
        SAVE_KEY_VALUE,
        {
          kes: "rack",
          value: categoryApi,
          primary_user_id: loginData.primary_user_id,
        },
        axiosConfig
      );
      console.log("save rack response ", response.data.response.value);
      dispatch(addKeyRack([response.data.response.value, ...KeyRackData]));
      setAddCategory([...addCategory, response.data.response]);
      console.log("Add rack ", addCategory);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClickForCompany = (e) => {
    e.preventDefault();
    handleSubmitToKeyValuePairForCompany();
    setCategoryApi("");
  };
  const handleSubmitToKeyValuePairForCompany = async () => {
    try {
      const response = await axios.post(
        SAVE_KEY_VALUE,
        {
          kes: "company",
          value: categoryApi,
          primary_user_id: loginData.primary_user_id,
        },
        axiosConfig
      );
      console.log("save company response ", response.data.response.value);
      dispatch(
        addKeyCompany([response.data.response.value, ...keyCompanyData])
      );
      setAddCategory([...addCategory, response.data.response]);
      console.log("Add company ", addCategory);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickForWarehouse = (e) => {
    e.preventDefault();
    handleSubmitToKeyValuePairForWarehouse();
    setCategoryApi("");
  };
  const handleSubmitToKeyValuePairForWarehouse = async () => {
    try {
      const response = await axios.post(
        SAVE_KEY_VALUE,
        {
          kes: "warehouse",
          value: categoryApi,
          primary_user_id: loginData.primary_user_id,
        },
        axiosConfig
      );
      console.log("save warehouse response ", response.data.response.value);
      dispatch(
        addKeyWarehouse([response.data.response.value, ...KeyWarehouseData])
      );
      setAddCategory([...addCategory, response.data.response]);
      console.log("Add Category ", addCategory);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  async function deleteCategory(id, value) {
    try {
      const response = await axios.get(DELETE_KEY_VALUE + `/${id}`);
      console.log("DELETE CATEGORY  ", response.data.response);
      //add logic for remove from
      // dispatch(removeKeyCategory(value));
      setAddCategory((prevItems) => prevItems.filter((item) => item.id !== id));
      console.log("Add Category ", addCategory);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      {enable && enableBulk && (
        <Box>
          <Box>
            <Button variant="contained">Inventory</Button>
            <Box sx={{ right: "0", float: "right" }}>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button onClick={handleBooleanChange}>Create Inventory</Button>
                <Button onClick={handleBulkChange}>
                  Create Bulk Inventory
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ width: "50%" }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search by Item or Item Code or Batch No or Challan No"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>
              <Box sx={{ width: "50%" }}>
                <ButtonGroup>
                  <Button>Show Low Stock</Button>
                  <Button>Item Expiring in 30 Days</Button>
                  <Button>Select Product Category</Button>
                </ButtonGroup>
              </Box>
            </Box>
            <Box>
              <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table
                  sx={{ minWidth: 1250 }}
                  aria-label="customized table"
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Item</StyledTableCell>
                      <StyledTableCell align="center">
                        Item Code
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Total Stock
                      </StyledTableCell>
                      <StyledTableCell align="center">MRP</StyledTableCell>
                      <StyledTableCell align="center">
                        Selling Price
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Purchase Price
                      </StyledTableCell>
                      <StyledTableCell align="center">Actions</StyledTableCell>
                      <StyledTableCell align="center">View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inventory &&
                      inventory.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell align="center">
                            {row.item}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.itemCode}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.totalStock}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.mrp}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.salePrice}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.purchasePrice}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleEdit(row.id, row)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(row.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleView(row.id, row)}
                            >
                              <ArticleIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      )}
      {!enable && (
        <Box>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Button size="small" variant="contained">
                Create Inventory
              </Button>
            </Box>
            <Box
              sx={{
                float: "right",
                alignItems: "center",
                marginLeft: "50px",
              }}
            >
              <Button
                size="small"
                variant="contained"
                onClick={handleBooleanCancelChange}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleBooleanCancelChange}
              >
                Save
              </Button>
            </Box>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box
                sx={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Item"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.item}
                  onChange={(event) => handleTextFieldChange(event, "item")}
                />
                <TextField
                  id="outlined-basic"
                  label="Item Code"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.itemCode}
                  onChange={(event) => handleTextFieldChange(event, "itemCode")}
                />
                <TextField
                  id="outlined-basic"
                  label="Bar Code"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.barCodeValue}
                  onChange={(event) =>
                    handleTextFieldChange(event, "barCodeValue")
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Item Description"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.itemDescription}
                  onChange={(event) =>
                    handleTextFieldChange(event, "itemDescription")
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="MRP"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.mrp}
                  onChange={(event) => handleTextFieldChange(event, "mrp")}
                />
                <Box sx={{ display: "flex" }}>
                  <TextField
                    id="outlined-basic"
                    label="Sale Price"
                    variant="outlined"
                    sx={{ margin: "10px", width: "60%" }}
                    value={inventoryObject.salePrice}
                    onChange={(event) =>
                      handleTextFieldChange(event, "salePrice")
                    }
                  />
                  <TextField
                    sx={{ margin: "10px", width: "60%" }}
                    select
                    value={inventoryObject.salePriceTax}
                    onChange={(event) =>
                      handleTextFieldChange(event, "salePriceTax")
                    }
                    label="Tax"
                    variant="outlined"
                    margin="normal"
                  >
                    {UserRole.taxType.map((userrole) => (
                      <MenuItem key={userrole.name} value={userrole.name}>
                        {userrole.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    id="outlined-basic"
                    label="Purchase Price"
                    variant="outlined"
                    sx={{ margin: "10px", width: "60%" }}
                    value={inventoryObject.purchasePrice}
                    onChange={(event) =>
                      handleTextFieldChange(event, "purchasePrice")
                    }
                  />
                  <TextField
                    select
                    value={inventoryObject.purchasePriceTax}
                    onChange={(event) =>
                      handleTextFieldChange(event, "purchasePriceTax")
                    }
                    label="Tax"
                    variant="outlined"
                    margin="normal"
                    sx={{ margin: "10px", width: "60%" }}
                  >
                    {UserRole.taxType.map((userrole) => (
                      <MenuItem key={userrole.name} value={userrole.name}>
                        {userrole.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                  paddingRight: "50px",
                }}
              >
                <TextField
                  fullWidth
                  select
                  value={inventoryObject.gst}
                  onChange={(event) => handleTextFieldChange(event, "gst")}
                  label="GST %"
                  variant="outlined"
                  margin="normal"
                >
                  {UserRole.GST.map((userrole) => (
                    <MenuItem key={userrole.name} value={userrole.name}>
                      {userrole.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-basic"
                  label="CGST"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.cgst}
                  onChange={(event) => handleTextFieldChange(event, "cgst")}
                />
                <TextField
                  id="outlined-basic"
                  label="IGST"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.igst}
                  onChange={(event) => handleTextFieldChange(event, "igst")}
                />
                <TextField
                  id="outlined-basic"
                  label="SGST"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.sgst}
                  onChange={(event) => handleTextFieldChange(event, "sgst")}
                />
                <TextField
                  id="outlined-basic"
                  label="UTGST"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.utgst}
                  onChange={(event) => handleTextFieldChange(event, "utgst")}
                />
                <TextField
                  id="outlined-basic"
                  label="Cess"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.compensationCess}
                  onChange={(event) =>
                    handleTextFieldChange(event, "compensationCess")
                  }
                />
                <TextField
                  fullWidth
                  select
                  value={inventoryObject.supplier}
                  onChange={(event) => handleTextFieldChange(event, "supplier")}
                  label="Supplier"
                  variant="outlined"
                  margin="normal"
                >
                  {Array.isArray(partyUser) &&
                    partyUser.map((userrole) =>
                      // Check if userrole.partyType is equal to 'supplier'
                      userrole.partyType === "Supplier" ? (
                        <MenuItem key={userrole.id} value={userrole.pname}>
                          {userrole.pname}
                        </MenuItem>
                      ) : null // Render null if partyType is not 'supplier'
                    )}
                </TextField>
              </Box>
              <Box
                sx={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                  paddingRight: "50px",
                }}
              >
                <TextField
                  fullWidth
                  select
                  value={inventoryObject.rackNo}
                  onChange={(event) => handleTextFieldChange(event, "rackNo")}
                  label="Rack"
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem onClick={() => setOpenRack(true)}>
                    Create a New Rack
                  </MenuItem>
                  {Array.isArray(KeyRackData) &&
                    KeyRackData.map((userrole) => (
                      <MenuItem key={userrole} value={userrole}>
                        {userrole}
                      </MenuItem>
                    ))}
                </TextField>
                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={openRack}
                  onClose={closeModelForRack}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Box sx={style}>
                      <Box
                        sx={{
                          marginTop: 8,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography component="h1" variant="h5">
                          Save Into Category
                        </Typography>
                        <Box
                          component="form"
                          onSubmit={handleClickForRack}
                          noValidate
                          sx={{ mt: 1 }}
                        >
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Category"
                            label="Categroy"
                            name="Category"
                            autoComplete="Category"
                            value={categoryApi}
                            onChange={(e) => setCategoryApi(e.target.value)}
                            autoFocus
                          />
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleClickForRack}
                            sx={{
                              mt: 3,
                              mb: 2,
                              color: "whitesmoke",
                              background: "#212121",
                            }}
                          >
                            Submit
                          </Button>
                          <List sx={{ maxWidth: 300 }}>
                            {addCategory.length > 0 ? (
                              addCategory.map((item, index) => (
                                <ListItem
                                  endAction={
                                    <IconButton
                                      aria-label="Delete"
                                      size="sm"
                                      color="danger"
                                    >
                                      <Delete
                                        onClick={() =>
                                          deleteCategory(item.id, item.value)
                                        }
                                      />
                                    </IconButton>
                                  }
                                >
                                  <ListItemButton key={index}>
                                    {item.value}
                                  </ListItemButton>
                                </ListItem>
                              ))
                            ) : (
                              <p>Add New Rack</p>
                            )}
                          </List>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Modal>

                <TextField
                  fullWidth
                  select
                  value={inventoryObject.category}
                  onChange={(event) => handleTextFieldChange(event, "category")}
                  label="Category"
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem onClick={() => setOpenCategory(true)}>
                    Create a New Category
                  </MenuItem>
                  {Array.isArray(keyCategoryData) &&
                    keyCategoryData.map((userrole) => (
                      <MenuItem key={userrole} value={userrole}>
                        {userrole}
                      </MenuItem>
                    ))}
                </TextField>
                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={openCategory}
                  onClose={closeModelForCategory}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Box sx={style}>
                      <Box
                        sx={{
                          marginTop: 8,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography component="h1" variant="h5">
                          Save Into Category
                        </Typography>
                        <Box
                          component="form"
                          onSubmit={handleClickForCategory}
                          noValidate
                          sx={{ mt: 1 }}
                        >
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Category"
                            label="Categroy"
                            name="Category"
                            autoComplete="Category"
                            value={categoryApi}
                            onChange={(e) => setCategoryApi(e.target.value)}
                            autoFocus
                          />
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleClickForCategory}
                            sx={{
                              mt: 3,
                              mb: 2,
                              color: "whitesmoke",
                              background: "#212121",
                            }}
                          >
                            Submit
                          </Button>
                          <List sx={{ maxWidth: 300 }}>
                            {addCategory.length > 0 ? (
                              addCategory.map((item, index) => (
                                <ListItem
                                  endAction={
                                    <IconButton
                                      aria-label="Delete"
                                      size="sm"
                                      color="danger"
                                    >
                                      <Delete
                                        onClick={() =>
                                          deleteCategory(item.id, item.value)
                                        }
                                      />
                                    </IconButton>
                                  }
                                >
                                  <ListItemButton key={index}>
                                    {item.value}
                                  </ListItemButton>
                                </ListItem>
                              ))
                            ) : (
                              <p>Add New Category</p>
                            )}
                          </List>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
                <TextField
                  fullWidth
                  select
                  value={inventoryObject.warehouse}
                  onChange={(event) =>
                    handleTextFieldChange(event, "warehouse")
                  }
                  label="Warehouse"
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem onClick={() => setOpenWarehouse(true)}>
                    Create a New WareHouse
                  </MenuItem>
                  {Array.isArray(KeyWarehouseData) &&
                    KeyWarehouseData.map((userrole) => (
                      <MenuItem key={userrole} value={userrole}>
                        {userrole}
                      </MenuItem>
                    ))}
                </TextField>
                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={openWarehouse}
                  onClose={closeModelForWarehouse}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Box sx={style}>
                      <Box
                        sx={{
                          marginTop: 8,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography component="h1" variant="h5">
                          Save Into Category
                        </Typography>
                        <Box
                          component="form"
                          onSubmit={handleClickForWarehouse}
                          noValidate
                          sx={{ mt: 1 }}
                        >
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Category"
                            label="Categroy"
                            name="Category"
                            autoComplete="Category"
                            value={categoryApi}
                            onChange={(e) => setCategoryApi(e.target.value)}
                            autoFocus
                          />
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleClickForWarehouse}
                            sx={{
                              mt: 3,
                              mb: 2,
                              color: "whitesmoke",
                              background: "#212121",
                            }}
                          >
                            Submit
                          </Button>
                          <List sx={{ maxWidth: 300 }}>
                            {addCategory.length > 0 ? (
                              addCategory.map((item, index) => (
                                <ListItem
                                  endAction={
                                    <IconButton
                                      aria-label="Delete"
                                      size="sm"
                                      color="danger"
                                    >
                                      <Delete
                                        onClick={() =>
                                          deleteCategory(item.id, item.value)
                                        }
                                      />
                                    </IconButton>
                                  }
                                >
                                  <ListItemButton key={index}>
                                    {item.value}
                                  </ListItemButton>
                                </ListItem>
                              ))
                            ) : (
                              <p>Add New WareHouse</p>
                            )}
                          </List>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
                <TextField
                  fullWidth
                  select
                  value={inventoryObject.companyName}
                  onChange={(event) =>
                    handleTextFieldChange(event, "companyName")
                  }
                  label="Company Name"
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem onClick={() => setOpenCompany(true)}>
                    Create a New Company
                  </MenuItem>
                  {Array.isArray(keyCompanyData) &&
                    keyCompanyData.map((userrole) => (
                      <MenuItem key={userrole} value={userrole}>
                        {userrole}
                      </MenuItem>
                    ))}
                </TextField>
                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={openCompany}
                  onClose={closeModelForCompany}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Box sx={style}>
                      <Box
                        sx={{
                          marginTop: 8,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography component="h1" variant="h5">
                          Save Into Category
                        </Typography>
                        <Box
                          component="form"
                          onSubmit={handleClickForCompany}
                          noValidate
                          sx={{ mt: 1 }}
                        >
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Category"
                            label="Categroy"
                            name="Category"
                            autoComplete="Category"
                            value={categoryApi}
                            onChange={(e) => setCategoryApi(e.target.value)}
                            autoFocus
                          />
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleClickForCompany}
                            sx={{
                              mt: 3,
                              mb: 2,
                              color: "whitesmoke",
                              background: "#212121",
                            }}
                          >
                            Submit
                          </Button>
                          <List sx={{ maxWidth: 300 }}>
                            {addCategory.length > 0 ? (
                              addCategory.map((item, index) => (
                                <ListItem
                                  endAction={
                                    <IconButton
                                      aria-label="Delete"
                                      size="sm"
                                      color="danger"
                                    >
                                      <Delete
                                        onClick={() =>
                                          deleteCategory(item.id, item.value)
                                        }
                                      />
                                    </IconButton>
                                  }
                                >
                                  <ListItemButton key={index}>
                                    {item.value}
                                  </ListItemButton>
                                </ListItem>
                              ))
                            ) : (
                              <p>Add New Company</p>
                            )}
                          </List>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Modal>

                <TextField
                  id="outlined-basic"
                  label="HSN Code"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.hsn}
                  onChange={(event) => handleTextFieldChange(event, "hsn")}
                />
                <TextField
                  id="outlined-basic"
                  label="Batch No"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.batchNo}
                  onChange={(event) => handleTextFieldChange(event, "batchNo")}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inventoryObject.lowStockCheckBox}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Enable Low Stock"
                />
                {inventoryObject.lowStockCheckBox && (
                  <TextField
                    label="Low Stock"
                    value={inventoryObject.lowStock}
                    onChange={(event) =>
                      handleTextFieldChange(event, "lowStock")
                    }
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                  paddingRight: "50px",
                }}
              >
                <Input
                  type="date"
                  value={inventoryObject.mfgDate}
                  label="Manufacture Date"
                  onChange={(event) => handleTextFieldChange(event, "mfgDate")}
                />
                <Input
                  type="date"
                  value={inventoryObject.expireDate}
                  label="Expire Date"
                  onChange={(event) =>
                    handleTextFieldChange(event, "expireDate")
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Salt"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.salt}
                  onChange={(event) => handleTextFieldChange(event, "salt")}
                />
                <TextField
                  id="outlined-basic"
                  label="Package Items"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.packageItems}
                  onChange={(event) =>
                    handleTextFieldChange(event, "packageItems")
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Total Stock"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.totalStock}
                  onChange={(event) =>
                    handleTextFieldChange(event, "totalStock")
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Unit"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.unitNo}
                  onChange={(event) => handleTextFieldChange(event, "unitNo")}
                />
                <TextField
                  id="outlined-basic"
                  label="Challan No"
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  value={inventoryObject.challanNo}
                  onChange={(event) =>
                    handleTextFieldChange(event, "challanNo")
                  }
                />
                <Box>
                  <Button type="submit" variant="contained" color="primary">
                    SUBMIT
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      )}
      {!enableBulk && (
        <Box>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Button size="small" variant="contained">
                Create Bulk Inventory
              </Button>
            </Box>
            <Box
              sx={{
                float: "right",
                alignItems: "center",
                marginLeft: "50px",
                display: "flex",
              }}
            >
              <Box>
                <a
                  href={require("../../file/ProductSample.xlsx")}
                  download="ProductSample.xlsx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    /// onClick={handleClick}
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "whitesmoke",
                      background: "#212121",
                    }}
                  >
                    Download the sample file
                  </Button>
                </a>
              </Box>
              <Button
                size="small"
                variant="contained"
                onClick={handleBooleanCancelChange}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleBooleanCancelChange}
              >
                Save
              </Button>
            </Box>
          </Box>
          <input type="file" onChange={handleFileUpload} />
          {excelData.length > 0 && (
            <Box
              sx={{
                height: 550,
                width: 1300,
                "& .actions": {
                  color: "text.secondary",
                },
                "& .textPrimary": {
                  color: "text.primary",
                },
              }}
            >
              <DataGrid
                rows={excelData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
              />
              <button onClick={handleSave}>Save</button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
