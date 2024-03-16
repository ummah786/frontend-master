import {Box, ButtonGroup, TextField} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {InventoryDataModel} from "../../datamodel/ManageUserDataModel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import UserRole from '../../jsonfile/Role';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from 'react-redux';
import {addExistingMangeUser, addManageUser, updateManageUser} from "../../redux/Action";
import ArticleIcon from '@mui/icons-material/Article';
import * as XLSX from 'xlsx';
import {DataGrid} from "@mui/x-data-grid";
import {Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow} from "../../commonStyle";
import {Input} from "@mui/joy";


export const InventoryShop = () => {
    const [enable, setEnable] = useState(true);
    const [enableBulk, setEnableBulk] = useState(true);
    const [inventoryObject, setInventoryObject] = useState(InventoryDataModel);
    const [inventory, setInventory] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [files, setFiles] = useState([]);

    const dispatch = useDispatch();
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
    }

    const handleTextFieldChange = (event, field) => {
        setInventoryObject({
            ...inventoryObject,
            [field]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8700/hesabbook/inventory/save', inventoryObject);
        console.log('Submit Response :--    ', response.data);
        console.log('on Submit :-->', inventoryObject);
        dispatch(addExistingMangeUser(response.data));
        setInventoryObject(InventoryDataModel);
        setEnable(prevState => !prevState);
    };

    async function handleDelete(id, event) {
        console.log("DELETE ID " + id)
        const response = await axios.post(`http://localhost:8700/hesabbook/inventory/delete/${id}`);
        console.log('Submit delete Response :--    ', response.data);
        fetchAllManageUserData();
    }

    function handleEdit(id, data) {
        handleBooleanChange();
        findObjectById(id);
        fetchAllManageUserData();
        dispatch(updateManageUser(data));
    }

    const findObjectById = (id) => {
        const foundItem = inventory.find(item => item.id === id);
        if (foundItem) {
            setInventoryObject(foundItem);
        } else {
            console.log('Object with ID', id, 'not found');
        }
    };

    function fetchAllManageUserData() {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8700/hesabbook/inventory/all');
                console.log(response.data);
                setInventory(response.data);
                localStorage.setItem('mangeUser', inventory);
                dispatch(addManageUser(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        return fetchData;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8700/hesabbook/inventory/all');
                console.log('Party Response ', response.data.response);
                if (response.data.code === 200) {
                    setInventory(response.data.response);
                    localStorage.setItem('Party-details', response.data.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [setInventory]);

    function handleView(id, row) {

    }


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFiles(e.target.files[0])
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, {type: 'binary'});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, {header: 1});
            const headers = data.shift();
            const columns = headers.map((header, index) => ({
                field: 'col' + index,
                headerName: header,
                width: 150,
            }));
            const rows = data.map((row, rowIndex) => {
                const rowData = {};
                row.forEach((cell, cellIndex) => {
                    rowData['col' + cellIndex] = cell;
                });
                rowData.id = rowIndex + 1; // Assigning unique id to each row
                return rowData;
            });
            setColumns(columns);
            setExcelData(rows);
        };
        reader.readAsBinaryString(file);
    };


    function FileUpload({onFileChange}) {
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            onFileChange(file);
        };
        return (
            <div>
                <input type="file" accept=".xls, .xlsx" onChange={handleFileChange}/>
            </div>
        );
    }


    const handleSave = async () => {
        console.log("excel sheet  ", excelData);
        console.log("data sheet ", columns);
        const formData = new FormData();
        formData.append('file', files);
        const response = await axios.post('http://localhost:8700/hesabbook/inventory/upload', excelData);
        console.log("response from handleSave ", response.data)

    };
    return (
        <>
            {(enable && enableBulk) && (
                <Box>
                    <Box>
                        <Button variant="contained">Inventory</Button>
                        <Box sx={{right: '0', float: 'right'}}>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button onClick={handleBooleanChange}>Create Inventory</Button>
                                <Button onClick={handleBulkChange}>Create Bulk Inventory</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{display: 'flex', width: '100%'}}>
                            <Box sx={{width: '50%'}}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search by Item or Item Code or Batch No or Challan No"
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </Search>
                            </Box>
                            <Box sx={{width: '50%'}}>
                                <ButtonGroup>
                                    <Button>Show Low Stock</Button>
                                    <Button>Item Expiring in 30 Days</Button>
                                    <Button>Select Product Category</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                        <Box>
                            <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Item</StyledTableCell>
                                            <StyledTableCell align="center">Item Code</StyledTableCell>
                                            <StyledTableCell align="center">Total Stock</StyledTableCell>
                                            <StyledTableCell align="center">MRP</StyledTableCell>
                                            <StyledTableCell align="center">Selling Price</StyledTableCell>
                                            <StyledTableCell align="center">Purchase Price</StyledTableCell>
                                            <StyledTableCell align="center">Actions</StyledTableCell>
                                            <StyledTableCell align="center">View</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {inventory.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell align="center">{row.item}</StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{row.itemCode}</StyledTableCell>
                                                <StyledTableCell align="center">{row.totalStock}</StyledTableCell>
                                                <StyledTableCell align="center">{row.mrp}</StyledTableCell>
                                                <StyledTableCell align="center">{row.salePrice}</StyledTableCell>
                                                <StyledTableCell align="center">{row.purchasePrice}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton aria-label="edit"
                                                                onClick={() => handleEdit(row.id, row)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton aria-label="delete"
                                                                onClick={() => handleDelete(row.id)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton aria-label="edit"
                                                                onClick={() => handleView(row.id, row)}>
                                                        <ArticleIcon/>
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
            {
                !enable && (
                    <Box>
                        <Box sx={{display: 'flex'}}>
                            <Box>
                                <Button size="small" variant="contained">Create Partner</Button>
                            </Box>
                            <Box sx={{float: 'right', alignItems: 'center', marginLeft: "50px"}}>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Cancel</Button>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Save</Button>
                            </Box>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{width: '100%', display: 'flex'}}>
                                <Box sx={{
                                    width: '25%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: "10px",
                                }}>
                                    <TextField id="outlined-basic" label="Item" variant="outlined" sx={{margin: '10px'}}
                                               value={inventoryObject.item}
                                               onChange={(event) => handleTextFieldChange(event, 'pname')}/>
                                    <TextField id="outlined-basic" label="Item Code" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.mobileNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'mobileNumber')}/>
                                    <TextField id="outlined-basic" label="Bar Code" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.email}
                                               onChange={(event) => handleTextFieldChange(event, 'email')}/>
                                    <TextField id="outlined-basic" label="Item Description" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={inventoryObject.billingAddress}
                                               onChange={(event) => handleTextFieldChange(event, 'billingAddress')}/>

                                    <TextField id="outlined-basic" label="MRP" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={inventoryObject.shippingAddress}
                                               onChange={(event) => handleTextFieldChange(event, 'shippingAddress')}/>

                                    <TextField id="outlined-basic" label="Sale Price" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={inventoryObject.shippingAddress}
                                               onChange={(event) => handleTextFieldChange(event, 'shippingAddress')}/>

                                    <TextField id="outlined-basic" label="Purchase Price" variant="outlined"
                                               sx={{margin: '10px'}}
                                               value={inventoryObject.shippingAddress}
                                               onChange={(event) => handleTextFieldChange(event, 'shippingAddress')}/>


                                </Box>
                                <Box sx={{
                                    width: '25%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: "10px",
                                    paddingRight: '50px'
                                }}>
                                    <TextField
                                        fullWidth
                                        select
                                        value={inventoryObject.partyType}
                                        onChange={(event) => handleTextFieldChange(event, 'partyType')}
                                        label="GST "
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        {
                                            UserRole.PartyType.map(userrole => (
                                                <MenuItem key={userrole.name}
                                                          value={userrole.name}>{userrole.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField id="outlined-basic" label="CGST" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>
                                    <TextField id="outlined-basic" label="IGST" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>
                                    <TextField id="outlined-basic" label="SGST" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>
                                    <TextField id="outlined-basic" label="UTGST" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>
                                    <TextField id="outlined-basic" label="Cess" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>
                                    <TextField id="outlined-basic" label="Supplier" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.partyCategory}
                                               onChange={(event) => handleTextFieldChange(event, 'partyCategory')}/>
                                </Box> <Box sx={{
                                width: '25%',
                                display: 'flex',
                                flexDirection: 'column',
                                margin: "10px",
                                paddingRight: '50px'
                            }}>
                                <TextField id="outlined-basic" label="Rack" variant="outlined"
                                           sx={{margin: '10px'}}
                                           value={inventoryObject.shippingAddress}
                                           onChange={(event) => handleTextFieldChange(event, 'shippingAddress')}/>

                                <TextField id="outlined-basic" label="Category" variant="outlined"
                                           sx={{margin: '10px'}}
                                           value={inventoryObject.shippingAddress}
                                           onChange={(event) => handleTextFieldChange(event, 'shippingAddress')}/>


                                <TextField id="outlined-basic" label="Company" variant="outlined" sx={{margin: '10px'}}
                                           value={inventoryObject.company}
                                           onChange={(event) => handleTextFieldChange(event, 'company')}/>
                                <TextField id="outlined-basic" label="Warehouse" variant="outlined"
                                           sx={{margin: '10px'}} value={inventoryObject.creditLimit}
                                           onChange={(event) => handleTextFieldChange(event, 'creditLimit')}/>
                                <TextField id="outlined-basic" label="HSN Code" variant="outlined"
                                           sx={{margin: '10px'}} value={inventoryObject.creditLimit}
                                           onChange={(event) => handleTextFieldChange(event, 'creditLimit')}/>
                                <TextField id="outlined-basic" label="Batch No" variant="outlined"
                                           sx={{margin: '10px'}} value={inventoryObject.creditLimit}
                                           onChange={(event) => handleTextFieldChange(event, 'creditLimit')}/>
                            </Box>
                                <Box sx={{
                                    width: '25%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: "10px",
                                    paddingRight: '50px'
                                }}>
                                    <Input
                                        type="date"
                                        value={inventoryObject.dob}
                                        label="Manufacture Date"
                                        onChange={(event) => handleTextFieldChange(event, 'dob')}
                                    />
                                    <Input
                                        type="date"
                                        value={inventoryObject.dob}
                                        label="Expire Date"
                                        onChange={(event) => handleTextFieldChange(event, 'dob')}
                                    />
                                    <TextField id="outlined-basic" label="Salt" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>
                                    <TextField id="outlined-basic" label="Package Items" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>
                                    <TextField id="outlined-basic" label="Low Stock" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.gstNumber}
                                               onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>
                                    <TextField id="outlined-basic" label="Total Stock" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.partyCategory}
                                               onChange={(event) => handleTextFieldChange(event, 'partyCategory')}/>
                                    <TextField id="outlined-basic" label="Unit" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.creditLimit}
                                               onChange={(event) => handleTextFieldChange(event, 'creditLimit')}/>
                                    <TextField id="outlined-basic" label="Challan" variant="outlined"
                                               sx={{margin: '10px'}} value={inventoryObject.creditLimit}
                                               onChange={(event) => handleTextFieldChange(event, 'creditLimit')}/>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                )
            }
            {
                !enableBulk && (
                    <Box>
                        <Box sx={{display: 'flex'}}>
                            <Box>
                                <Button size="small" variant="contained">Create Bulk Inventory</Button>
                            </Box>
                            <Box sx={{float: 'right', alignItems: 'center', marginLeft: "50px", display: 'flex'}}>
                                <Box>
                                    <a
                                        href={require('../../file/ProductSample.xlsx')}
                                        download="ProductSample.xlsx"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            /// onClick={handleClick}
                                            sx={{mt: 3, mb: 2, color: "whitesmoke", background: '#212121'}}
                                        >
                                            Download the sample file
                                        </Button>
                                    </a>
                                </Box>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Cancel</Button>
                                <Button size="small" variant="contained" onClick={handleBooleanCancelChange}>Save</Button>
                            </Box>
                        </Box>
                        <input type="file" onChange={handleFileUpload}/>
                        {
                            excelData.length > 0 && (
                                <Box
                                    sx={{
                                        height: 550,
                                        width: 1300,
                                        '& .actions': {
                                            color: 'text.secondary',
                                        },
                                        '& .textPrimary': {
                                            color: 'text.primary',
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
                            )
                        }
                    </Box>
                )}
        </>
    )
}