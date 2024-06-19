import React, {useEffect, useState} from "react";
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import Typography from "@mui/joy/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Close} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@material-ui/icons/Search";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import UserRole from "../../../jsonfile/Role.json";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import {Transition} from "react-transition-group";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import dayjs from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import {useDispatch, useSelector} from "react-redux";
import {StyledTableCell, StyledTableRow,getDate} from "../../../commonStyle";
import axios from "axios";
import {DELETE_KEY_VALUE, SAVE_ADDRESS, SAVE_KEY_VALUE,} from "../../apiendpoint/APIEndPoint";
import ButtonGroup from "@mui/material/ButtonGroup";
import {List, ListItem, ListItemButton} from "@mui/joy";
import {InventoryDataModel, partnerDataModel,} from "../../../datamodel/ManageUserDataModel";
import {addExistingInventory, addKeyCategory, addKeyCompany, addParty, addSalePurchase,} from "../../../redux/Action";
import Delete from "@mui/icons-material/Delete";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
};



export const DeliveryChallanEdit = ({
                                        onBooleanChange,
                                        idFlagView,
                                        editFlag,
                                        filterSalePurchase,
                                    }) => {
    const [filteredParty, setFilteredParty] = useState([]);
    const [salePurchaseObject, setSalePurchaseObject] =
        useState(filterSalePurchase);
    const [inventoryObject, setInventoryObject] = useState(InventoryDataModel);
    const [openCompany, setOpenCompany] = React.useState(false);
    const [openPartyModal, setOpenPartyModal] = React.useState(false);
    const [openCategoryParty, setOpenCategoryParty] = React.useState(false);
    const [openItemModal, setOpenItemModal] = React.useState(false);
    const [onSelectOfShipTo, setOnSelectOfShipTo] = React.useState(null);
    const [editOpen, setEditOpen] = React.useState(false);
    const [shipToAddress, setShipToAddress] = useState(
        filterSalePurchase.partyShippingAddress
    );
    const [shipToFlag, setShipToFlag] = React.useState(true);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [fields, setFields] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [openNotes, setOpenNotes] = useState(false);
    const [openTermCondition, setOpenTermCondition] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [showAddDiscount, setShowAddDiscount] = useState(false);
    const [checked, setChecked] = useState(filterSalePurchase.autoRoundOffMark);
    const [checkedMark, setCheckedMark] = useState(false);
    const [manageUserObj, setManageUserObj] = useState(partnerDataModel);
    const [billTo, setBillTo] = useState({
        id: filterSalePurchase.partyId,
        pname: filterSalePurchase.partyName,
        mobileNumber: filterSalePurchase.partyPhone,
        billingAddress: filterSalePurchase.partyBillingAddress,
        gstNumber: filterSalePurchase.partyGst,
    });
    const [shipTo, setShipTo] = useState("");
    const [logoImage, setLogoImage] = useState("");
    const [uploadImage, setUploadImage] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const {partyUser} = useSelector((state) => state.partyReducerValue);
    const {inventoryUser} = useSelector((state) => state.inventoryReducerValue);
    const {salePurchaseUser} = useSelector(
        (state) => state.salePurchaseReducerValue
    );
    const loginData = useSelector((state) => state.loginReducerValue);
    const [filter, setFilter] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [inventorys, setInventorys] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [addNewItemsFlagModal, setAddNewItemsFlagModal] = useState(false);
    const keyCategoryData = useSelector((state) => state.keyCategoryReducerValue);
    const keyCompanyData = useSelector((state) => state.keyCompanyReducerValue);
    const [addCategory, setAddCategory] = React.useState([]);
    const [categoryApi, setCategoryApi] = useState();
    const [totalTaxTable, setTotalTaxTable] = useState("");
    const [totalDiscountTable, setTotalDiscountTable] = useState("");
    const [totalAmountTable, setTotalAmountTable] = useState(0);
    const [totalAmountTableOperation, setTotalAmountTableOperation] = useState(
        filterSalePurchase.totalAmount
    );
    const [autoRoundOffValue, setAutoRoundOffValue] = useState(0);
    const [addDiscount, setAddDiscount] = useState(0);
    const [amountRecieved, setAmountRecieved] = useState(
        filterSalePurchase.amountReceived
    );
    const [balanceAmount, setBalanceAmount] = useState(
        filterSalePurchase.balanceAmount
    );
    const [totalAmountWithOutTax, setTotalAmountWithOutTax] = useState("");
    const [rValues, setRValues] = useState([]);
    const [rRates, setRRates] = useState([]);
    const dispatch = useDispatch();
    const [deliveryDate, setDeliveryDate] = React.useState(
        dayjs(getDate())
    );
    const [saleInvoiceDate, setSaleInvoiceDate] = React.useState(
        dayjs(getDate())
    );
    const [deliveryDueDate, setDeliveryDueDate] = React.useState(dayjs(getDate()));
    const [dueDate, setDueDate] = React.useState(dayjs(getDate()));
    const [doubleCheckedForCheckMar, setDoubleCheckedForCheckMar] =
        useState(false);
    useEffect(() => {
        if (!idFlagView) {
            return;
        }
        try {
            const filteredData = salePurchaseUser.filter(
                (employee) => employee.id === idFlagView
            );
            if (filteredData.length === 0) return;
            const filteredResponse = filteredData[0];
            const jsonArray = JSON.parse(filteredResponse.items);
            setSalePurchaseObject(filteredResponse);
            setFilteredEmployees(jsonArray);
            setEmployees(jsonArray);
            setShipToAddress(filteredResponse.partyShippingAddress);
            setShipTo({mobileNumber: filteredResponse.partyPhone});

            //   setCheckedMark(filteredResponse.markFullyPaid);
            setChecked(filteredResponse.autoRoundOffMark);
            setAutoRoundOffValue(filteredResponse.autoRoundOffValue);
            setAddDiscount(filteredResponse.addDiscount);
            if (filteredResponse.addDiscount) {
                setShowAddDiscount(true);
                setAddDiscount(filteredResponse.addDiscount);
            } else {
                setShowAddDiscount(false);
                setAddDiscount(filteredResponse.addDiscount);
            }
            if (filteredResponse.salesInvoiceDate) {
                const parsedDate = dayjs(filteredResponse.salesInvoiceDate);
                setSaleInvoiceDate(parsedDate);
            }
            if (filteredResponse.salesDueDate) {
                const parsedDate = dayjs(filteredResponse.salesDueDate);
                setDueDate(parsedDate);
            }
            if (filteredResponse.addAdditionalCharges) {
                const addAdditional = JSON.parse(filteredResponse.addAdditionalCharges);
                setFields(addAdditional);
            }
            if (filteredResponse.addNote) {
                setOpenNotes(true);
            }
            if (filteredResponse.addTermsAndCondition) {
                setOpenTermCondition(true);
            }
            setTotalAmountTableOperation(filteredResponse.totalAmount);
            setAmountRecieved(filteredResponse.amountReceived);
            setBalanceAmount(filteredResponse.balanceAmount);
        } catch (error) {
            console.error("An error occurred while processing the data:", error);
        }
    }, [idFlagView, editFlag]);
    useEffect(() => {
        console.log("SsalePurchaseObject :--- >>  ", salePurchaseObject);
    }, [partyUser, billTo, salePurchaseObject]);
    useEffect(() => {
        employees.forEach((employee) => updateRValuesAndRates(employee));
        const totalAmountWithOutTaxReturn = employees.reduce(
            (acc, emp) => acc + parseFloat(emp.quantity) * parseFloat(emp.salePrice),
            0
        );
        setTotalAmountWithOutTax(totalAmountWithOutTaxReturn);
        const totalTaxTableValue = employees.reduce((accumulator, employee) => {
            const rateIncrement = parseFloat(employee.gst);
            if (!isNaN(rateIncrement)) {
                return accumulator + parseFloat(employee.gst);
            }
            return accumulator;
        }, 0);
        const totalDiscountTableValue = employees.reduce(
            (acc, emp) => acc + parseFloat(emp.discount),
            0
        );
        const totalAmountTableValue = employees.reduce(
            (acc, emp) => acc + emp.total,
            0
        );
        const formattedValue = totalAmountTableValue.toFixed(2);
        console.log(formattedValue); // Output: "101.71"
        setTotalAmountTable(formattedValue);
        setTotalAmountTableOperation(formattedValue);
        setTotalDiscountTable(totalDiscountTableValue);
        setTotalTaxTable(totalTaxTableValue);
    }, [employees]);

    const updateRValuesAndRates = (employee) => {
        if (employee.gst) {
            const calculatedRValue =
                (employee.salePrice * employee.quantity * employee.gst) / 200;
            const calculatedRRate = employee.gst / 2;
            const index = employees.findIndex((emp) => emp.id === employee.id); // Find index of current employee

            // Update or push new values
            if (index !== -1) {
                setRValues((prevRValues) => {
                    const updatedValues = [...prevRValues];
                    updatedValues[index] = calculatedRValue;
                    return updatedValues;
                });
                setRRates((prevRRates) => {
                    const updatedRates = [...prevRRates];
                    updatedRates[index] = calculatedRRate;
                    return updatedRates;
                });
            } else {
                setRValues((prevRValues) => [...prevRValues, calculatedRValue]);
                setRRates((prevRRates) => [...prevRRates, calculatedRRate]);
            }
        } else {
            const index = employees.findIndex((emp) => emp.id === employee.id); // Find index of current employee

            // Clear values if employee no longer has gst property
            if (index !== -1) {
                setRValues((prevRValues) => {
                    const updatedValues = [...prevRValues];
                    updatedValues.splice(index, 1);
                    return updatedValues;
                });
                setRRates((prevRRates) => {
                    const updatedRates = [...prevRRates];
                    updatedRates.splice(index, 1);
                    return updatedRates;
                });
            }
        }
    };

    const handleChangeForFilterCategory = (event, newValue) => {
        setFilterCategory(newValue);
    };
    useEffect(() => {
        if (Array.isArray(inventorys)) {
            if (
                filterCategory === "" ||
                filterCategory === undefined ||
                filterCategory === null
            ) {
                setFilteredEmployees(inventorys); // Set filteredEmployees to the original inventorys data
            } else {
                const filteredData = inventorys.filter((employee) => {
                    return employee.category.includes(filterCategory);
                });
                setFilteredEmployees(filteredData);
            }
        }
    }, [filterCategory, inventorys]);

    useEffect(() => {
        if (Array.isArray(inventorys)) {
            const filteredData = inventorys.filter((employee) => {
                return employee.item.toLowerCase().includes(filter.toLowerCase());
            });
            setFilteredEmployees(filteredData);
        }
    }, [filter, inventorys]);

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

    const handleSubmitForParty = async (event) => {
        event.preventDefault();
        manageUserObj["primary_user_id"] = loginData.primary_user_id;
        manageUserObj["secondary_user_id"] = loginData.secondary_user_id;
        const response = await axios.post(
            "http://localhost:8700/hesabbook/partner/save",
            manageUserObj
        );
        console.log("Submit Response :--    ", response.data);
        console.log("on Submit :-->", manageUserObj);
        addObjectOnTop(response.data.response);
        setManageUserObj(partnerDataModel);
    };
    const addObjectOnTop = (newObject) => {
        const existingIndex = partyUser.findIndex(
            (item) => item.id === newObject.id
        );
        if (existingIndex === -1) {
            dispatch(addParty([newObject, ...partyUser]));
        } else {
            const updatedArray = [...partyUser];
            updatedArray[existingIndex] = newObject;
            dispatch(addParty(updatedArray));
        }
    };

    const handleAddNewItems = () => {
        setAddNewItemsFlagModal(true);
    };
    const handleTextFieldChangeForInventory = (event, field) => {
        setInventoryObject({
            ...inventoryObject,
            [field]: event.target.value,
        });
        console.log("Inventory ", inventoryObject);
    };

    const handleTextFieldChangeParty = (event, field) => {
        setManageUserObj({
            ...manageUserObj,
            [field]: event.target.value,
        });
        console.log("sale Purchase", manageUserObj);
    };

    const handleTextFieldChange = (event, field) => {
        setSalePurchaseObject({
            ...salePurchaseObject,
            [field]: event.target.value,
        });
        console.log("sale Purchase", salePurchaseObject);
    };

    useEffect(() => {
        setInventorys(
            inventoryUser.map((inventory) => {
                return {
                    ...inventory,
                    quantity: 1,
                    discount: 0,
                };
            })
        );
        console.log("Inventory >>  " + inventorys);
    }, [inventoryUser]);

    const increaseSalary = (id) => {
        const updatedEmployees = inventorys.map((emp) => {
            if (emp.id === id) {
                return {...emp, quantity: emp.quantity + 1};
            }
            return emp;
        });
        setInventorys(updatedEmployees);
    };

    const decreaseSalary = (id) => {
        const updatedEmployees = inventorys.map((emp) => {
            if (emp.id === id) {
                return {...emp, quantity: emp.quantity - 1};
            }
            return emp;
        });
        setInventorys(updatedEmployees);
    };

    const handleCheckboxClick = (id) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            );
        }
        setSelectedRows(newSelected);
    };

    const handleSubmitForItemSelect = (e) => {
        //handle for Item select from modal
        e.preventDefault();
        const selectedRowsValues = selectedRows.map((item) =>
            findMatchingObject(item, inventorys)
        );
        updateTotal(selectedRowsValues);
        setOpenItemModal(false);
    };

    const calculateTotal = (item) => {
        return (
            item.quantity * item.salePrice -
            item.discount +
            (item.quantity * item.salePrice * item.gst) / 100
        );
    };

    const updateTotal = (employeess) => {
        console.log("Employee     " + employees);
        const updatedEmployees = employeess.map((employee) => {
            return {...employee, total: calculateTotal(employee)};
        });
        setEmployees(updatedEmployees);
    };

    const findMatchingObject = (id, list) => {
        return list.find((item) => item.id === id);
    };

    const [shipId, setShipId] = useState("");
    const [editId, setEditId] = React.useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [stateLoc, setStateLoc] = useState("");
    const [zip, setZip] = useState("");
    let axiosConfig = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
        },
    };

    const handleForNewItemCreation = async (e) => {
        e.preventDefault();
        inventoryObject["primary_user_id"] = loginData.primary_user_id;
        inventoryObject["secondary_user_id"] = loginData.secondary_user_id;
        const response = await axios.post(
            "http://localhost:8700/hesabbook/inventory/save",
            inventoryObject
        );
        console.log("Submit Response :--    ", response.data);
        console.log("on Submit :-->", inventoryObject);
        dispatch(addExistingInventory(response.data.response));
        setInventoryObject(InventoryDataModel);
        handleAddNewItems();
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                SAVE_ADDRESS + "/" + `${editId}`,
                {
                    id: shipId,
                    multipleShippingAddress: [
                        {
                            id: editId,
                            address: address,
                            city: city,
                            state: stateLoc,
                            zip: zip,
                        },
                    ],
                },
                axiosConfig
            );
            console.log(response.data); // Handle response data
            if (response.data.code === 200) {
                console.log("hesab response if ", response.data.response);
                setShipTo(response.data.response);
                //  dispatch(addLogin(response.data.response));
                // onBooleanChange();
            } else {
                console.log("hesab response else ", response.data.response);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        closeEditOpenFlag();
    };

    function closeEditOpenFlag() {
        setEditOpen(false);
        setShipId("");
        setEditId("");
        setAddress("");
        setCity("");
        setStateLoc("");
        setZip("");
    }

    function handleEdit(id, data, shipToId) {
        setShipId(shipToId);
        setEditId(id);
        setAddress(data.address);
        setCity(data.city);
        setStateLoc(data.state);
        setZip(data.zip);
        setEditOpen(true);
    }

    const handleChange = (event, shipvalue) => {
        console.log("Ship Value ", shipvalue);
        console.log("bill TO ", billTo);
        setOnSelectOfShipTo(event);
        setOpenCategory(false);
    };

    useEffect(() => {
        if (onSelectOfShipTo) {
            setShipToAddress(onSelectOfShipTo);
            const updatedObject = {
                ...salePurchaseObject,
                shipAddress: onSelectOfShipTo,
            };
            setSalePurchaseObject(updatedObject);
        }
    }, [onSelectOfShipTo]);

    const openModalPartyValue = () => {
        setOpenPartyModal(true);
    };
    const handleBilltoSHipToo = (event) => {
        const selectedParty = event.target.value;

        if (!selectedParty) {
            console.error("Event target value is undefined");
            return;
        }

        const {shippingAddress, billingAddress, mobileNumber, gstNumber} = selectedParty;

        // If shippingAddress is undefined, set it to an empty string
        const updatedShippingAddress = shippingAddress || "";

        setShipTo(selectedParty);
        setBillTo(selectedParty);
        setShipToAddress(updatedShippingAddress);
        setShipToFlag(false);

        const updatedObject = {
            ...salePurchaseObject,
            billAddress: billingAddress,
            phone: mobileNumber,
            gst: gstNumber,
            shipAddress: updatedShippingAddress, // Use updatedShippingAddress here
        };

        setSalePurchaseObject(updatedObject);
    };

    const handleSHipToo = (event) => {
        setShipTo(event.target.value);
    };

    const handleImageUpload = (event, setImage) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChangeChecked = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        const addAdditionalCharge = fields.reduce((acc, emp) => {
            const parsedValue = parseFloat(emp.value);
            if (isNaN(parsedValue)) {
                return acc;
            }
            return acc + parsedValue;
        }, 0);
        let totalAmount = parseFloat(totalAmountTable);
        let roundOff = parseFloat(autoRoundOffValue);
        let taxable = parseFloat(addDiscount);
        let additionalCharge = parseFloat(addAdditionalCharge);
        if (isNaN(totalAmount)) {
            console.error("Invalid total amount:", totalAmountTable);
            totalAmount = 0;
        }
        if (isNaN(roundOff)) {
            console.error("Invalid auto round off value:", autoRoundOffValue);
            roundOff = 0;
        }
        if (isNaN(taxable)) {
            console.error("Invalid taxable amount:", addDiscount);
            taxable = 0;
        }
        if (isNaN(additionalCharge)) {
            console.error("Invalid additional charge value:", addAdditionalCharge);
            additionalCharge = 0;
        }
        const newValue = totalAmount + roundOff - taxable + additionalCharge;
        if (!checked) {
            setTotalAmountTableOperation(newValue);
        } else {
            const roundedNumber = Math.round(newValue);
            setTotalAmountTableOperation(roundedNumber);
        }
        if (doubleCheckedForCheckMar) {
            if (!checkedMark) {
                const updatedValue = Math.max(
                    totalAmountTableOperation - amountRecieved,
                    0
                );
                // Update the balance amount state
                setBalanceAmount(updatedValue);
                // setBalanceAmount();
            } else {
                setBalanceAmount(0);
                setAmountRecieved(totalAmountTableOperation);
            }
        }
    }, [
        autoRoundOffValue,
        fields,
        addDiscount,
        totalAmountTable,
        checked,
        amountRecieved,
        balanceAmount,
        checkedMark,
    ]);

    const handleChangeCheckedMarkAsFUll = (event) => {
        setDoubleCheckedForCheckMar(true);
        setCheckedMark(event.target.checked);
    };
    const handleForSetAmountRecived = (event) => {
        setDoubleCheckedForCheckMar(true);
        setAmountRecieved(event.target.value);
    };

    const addField = () => {
        setFields([...fields, {key: "", value: ""}]);
    };
    const removeField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };
    const handleInputChangess = (index, keyOrValue, e) => {
        const updatedFields = [...fields];
        updatedFields[index][keyOrValue] = e.target.value;
        setFields(updatedFields);
        console.log("Fields >>   ", fields);
    };

    const handleToggleNotes = () => {
        setOpenNotes(!openNotes);
    };
    const handleToggleTermCondition = () => {
        setOpenTermCondition(!openTermCondition);
    };
    const addRow = () => {
        setOpenItemModal(true);
    };
    const deleteRow = (id) => {
        const updatedEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(updatedEmployees);
        setRRates([]);
        setRValues([]);
    };
    const handleInputChange = (id, key, value) => {
        const updatedEmployees = employees.map((employee) => {
            if (employee.id === id) {
                if (key === "quantity") {
                    employee.total =
                        value * employee.salePrice -
                        (employee.gst / 100) * value * employee.salePrice -
                        employee.discount;
                    employee.total = value * employee.salePrice;
                    return {...employee, [key]: value};
                } else if (key === "discount") {
                    employee.total =
                        employee.salePrice * employee.quantity +
                        (employee.gst / 100) * employee.salePrice * employee.quantity;
                    employee.total = employee.total - value;
                    return {...employee, [key]: value};
                } else if (key === "gst") {
                    employee.total =
                        employee.salePrice * employee.quantity - employee.discount;
                    employee.total = employee.total + (value / 100) * employee.total;
                    return {...employee, [key]: value};
                } else {
                    return {...employee, [key]: value};
                }
            }
            return employee;
        });
        setEmployees(updatedEmployees);
    };

    const handleSubmitSaleInvoiceCreate = async (e) => {
        e.preventDefault();
        salePurchaseObject["primary_user_id"] = loginData.primary_user_id;
        salePurchaseObject["secondary_user_id"] = loginData.secondary_user_id;
        salePurchaseObject["deliveryDate"] = deliveryDate;
        salePurchaseObject["deliveryDueDate"] = deliveryDueDate;
        salePurchaseObject["totalAmount"] = totalAmountTableOperation;
        salePurchaseObject["addAdditionalCharges"] = JSON.stringify(fields);

        salePurchaseObject["amountReceived"] = amountRecieved;
        salePurchaseObject["balanceAmount"] = balanceAmount;
        salePurchaseObject["addDiscount"] = addDiscount;

        salePurchaseObject["autoRoundOffValue"] = autoRoundOffValue;
        salePurchaseObject["autoRoundOffMark"] = checked;
        salePurchaseObject["markFullyPaid"] = checkedMark;

        salePurchaseObject["billType"] = "DELIVERY_CHALLAN";

        salePurchaseObject["primary_user_id"] = loginData.primary_user_id;
        salePurchaseObject["secondary_user_id"] = loginData.secondary_user_id;
        salePurchaseObject["items"] = JSON.stringify(employees);

        //Party Information
        salePurchaseObject["partyId"] = billTo.id;
        salePurchaseObject["partyName"] = billTo.pname;
        salePurchaseObject["partyPhone"] = billTo.mobileNumber;
        salePurchaseObject["partyBillingAddress"] = billTo.billingAddress;
        salePurchaseObject["partyShippingAddress"] = shipToAddress;
        salePurchaseObject["partyGst"] = billTo.gstNumber;

        console.log("Sale Purchase Object ", salePurchaseObject);
        const response = await axios.post(
            "http://localhost:8700/hesabbook/sale/purchase/save",
            salePurchaseObject
        );
        console.log("Response   ", response);
        addObjectOnTopSalePurchase(response.data.response);

        onBooleanChange();
    };

    const addObjectOnTopSalePurchase = (newObject) => {
        const existingIndex = salePurchaseUser.findIndex(
            (item) => item.id === newObject.id
        );
        if (existingIndex === -1) {
            dispatch(addSalePurchase([newObject, ...salePurchaseUser]));
        } else {
            const updatedArray = [...salePurchaseUser];
            updatedArray[existingIndex] = newObject;
            dispatch(addSalePurchase(updatedArray));
        }
    };
    return (
        <Box component="form" onSubmit={handleSubmitSaleInvoiceCreate}>
            <Box sx={{maxHeight: 300}}>
                <Box>
                    <Button variant="contained">Delivery Challan Edit</Button>
                    <Box
                        sx={{right: "0", float: "right", justifyContent: "space-around"}}
                    >
                        <ButtonGroup
                            variant="contained"
                            aria-label="Basic button group"
                            sx={{justifyContent: "space-around"}}
                        >
                            <Button onClick={onBooleanChange}>Cancel</Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmitSaleInvoiceCreate}
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Box>

                <Box>
                    <Card variant="outlined">
                        <Box sx={{height: "100px", width: "100px"}}>
                            {logoImage ? (
                                <Box sx={{display: "flex", position: "relative"}}>
                                    <CardMedia
                                        sx={{
                                            height: "90px",
                                            width: "90px",
                                            margin: "10px",
                                            borderStyle: "dashed",
                                            borderWidth: "2px",
                                        }}
                                        image={logoImage}
                                        alt="Add Company Logo"
                                    />
                                    <IconButton
                                        sx={{
                                            opacity: "0.9",
                                            top: "-1px",
                                            color: "black",
                                            backgroundColor: "white",
                                            marginLeft: "70px",
                                            position: "absolute",
                                        }}
                                        onClick={() => setLogoImage(null)}
                                    >
                                        <CloseIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
                            ) : (
                                <label htmlFor="image-upload-1">
                                    <Button
                                        variant="plain"
                                        sx={{
                                            borderStyle: "dashed",
                                            borderWidth: "2px",
                                            textAlign: "center",
                                        }}
                                        component="span"
                                    >
                                        Add Company Logo
                                    </Button>
                                </label>
                            )}
                        </Box>
                        <input
                            accept="image/*"
                            style={{display: "none"}}
                            id="image-upload-1"
                            type="file"
                            onChange={(event) => handleImageUpload(event, setLogoImage)}
                        />
                    </Card>
                    <Typography>Ummah Hub</Typography>
                </Box>
                <Box sx={{display: "flex"}}>
                    <Box
                        sx={{
                            width: "60%",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "50%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <TextField
                                    select
                                    fullWidth={true}
                                    sx={{margin: "10px"}}
                                    label={billTo.pname}
                                    variant="outlined"
                                    margin="normal"
                                    value={billTo.pname}
                                    onChange={(event) => handleBilltoSHipToo(event)}
                                >
                                    <MenuItem onClick={openModalPartyValue}>
                                        Create a New Party
                                    </MenuItem>
                                    {partyUser.map((indi) => (
                                        <MenuItem key={indi.id} value={indi}>
                                            {indi.pname} - {indi.company}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Modal
                                    open={openPartyModal}
                                    onClose={() => setOpenPartyModal(false)}
                                    aria-labelledby="child-modal-title"
                                    aria-describedby="child-modal-description"
                                >
                                    <Box sx={{...style, width: 200}}>
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                width: 1000,
                                                bgcolor: "background.paper",
                                                border: "2px solid #000",
                                                boxShadow: 24,
                                                p: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        borderStyle: "dashed",
                                                        borderWidth: "2px",
                                                    }}
                                                >
                                                    <Typography component="h1" variant="h5">
                                                        Add New Party
                                                    </Typography>
                                                    <ModalClose
                                                        variant="plain"
                                                        sx={{
                                                            m: 1,
                                                            borderStyle: "dashed",
                                                            borderWidth: "2px",
                                                        }}
                                                    />
                                                </Box>
                                                <Box component="form" onSubmit={handleSubmitForParty}>
                                                    <Box>
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Name"
                                                            variant="outlined"
                                                            sx={{margin: "10px"}}
                                                            value={manageUserObj.pname}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(event, "pname")
                                                            }
                                                        />

                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Phone Number"
                                                            variant="outlined"
                                                            sx={{margin: "10px"}}
                                                            value={manageUserObj.mobileNumber}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(
                                                                    event,
                                                                    "mobileNumber"
                                                                )
                                                            }
                                                        />
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Email Address"
                                                            variant="outlined"
                                                            sx={{margin: "10px"}}
                                                            value={manageUserObj.email}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(event, "email")
                                                            }
                                                        />
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Billing Address"
                                                            variant="outlined"
                                                            sx={{margin: "10px"}}
                                                            value={manageUserObj.billingAddress}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(
                                                                    event,
                                                                    "billingAddress"
                                                                )
                                                            }
                                                        />
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Shipping Address"
                                                            variant="outlined"
                                                            sx={{margin: "10px"}}
                                                            value={manageUserObj.shippingAddress}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(
                                                                    event,
                                                                    "shippingAddress"
                                                                )
                                                            }
                                                        />
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Company Name"
                                                            variant="outlined"
                                                            sx={{margin: "10px"}}
                                                            value={manageUserObj.company}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(event, "company")
                                                            }
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            select
                                                            value={manageUserObj.partyType}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(event, "partyType")
                                                            }
                                                            label="Party Type"
                                                            variant="outlined"
                                                            margin="normal"
                                                        >
                                                            {UserRole.PartyType.map((userrole) => (
                                                                <MenuItem
                                                                    key={userrole.name}
                                                                    value={userrole.name}
                                                                >
                                                                    {userrole.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="GST Number"
                                                            variant="outlined"
                                                            sx={{margin: "10px"}}
                                                            value={manageUserObj.gstNumber}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(event, "gstNumber")
                                                            }
                                                        />

                                                        <TextField
                                                            fullWidth
                                                            select
                                                            value={manageUserObj.partyCategory}
                                                            onChange={(event) =>
                                                                handleTextFieldChangeParty(
                                                                    event,
                                                                    "partyCategory"
                                                                )
                                                            }
                                                            label="Category"
                                                            variant="outlined"
                                                            margin="normal"
                                                        >
                                                            <MenuItem
                                                                onClick={() => setOpenCategoryParty(true)}
                                                            >
                                                                Create a New Category
                                                            </MenuItem>
                                                            {Array.isArray(keyCategoryData) &&
                                                                keyCategoryData.map((userrole) => (
                                                                    <MenuItem key={userrole} value={userrole}>
                                                                        {userrole}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                        <Transition in={openCategoryParty} timeout={400}>
                                                            <Modal
                                                                open={openCategoryParty}
                                                                onClose={() => setOpenCategoryParty(false)}
                                                                aria-labelledby="modal-modal-title"
                                                                aria-describedby="modal-modal-description"
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Box sx={style}>
                                                                    <Box
                                                                        sx={{
                                                                            marginTop: 8,
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            alignItems: "center",
                                                                        }}
                                                                    >
                                                                        <ModalClose variant="plain" sx={{m: 1}}/>
                                                                        <Typography component="h1" variant="h5">
                                                                            Save Into Category
                                                                        </Typography>
                                                                        <Box
                                                                            component="form"
                                                                            onSubmit={handleClickForCategory}
                                                                            noValidate
                                                                            sx={{mt: 1}}
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
                                                                                onChange={(e) =>
                                                                                    setCategoryApi(e.target.value)
                                                                                }
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
                                                                            <List sx={{maxWidth: 300}}>
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
                                                                                                            deleteCategory(
                                                                                                                item.id,
                                                                                                                item.value
                                                                                                            )
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
                                                            </Modal>
                                                        </Transition>
                                                    </Box>

                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={handleSubmitForParty}
                                                        sx={{
                                                            mt: 3,
                                                            mb: 2,
                                                            color: "whitesmoke",
                                                            background: "#212121",
                                                        }}
                                                    >
                                                        Submit
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Modal>
                            </Box>
                            <Box
                                sx={{
                                    width: "50%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <TextField
                                    select
                                    fullWidth={true}
                                    sx={{margin: "10px"}}
                                    label="Ship To"
                                    variant="outlined"
                                    margin="normal"
                                    disabled={shipToFlag}
                                    onChange={(event) => handleSHipToo(event)}
                                >
                                    <MenuItem onClick={() => setOpenCategory(true)}>
                                        Change Shipping Address
                                    </MenuItem>
                                </TextField>
                            </Box>
                            <Transition in={openCategory} timeout={400}>
                                <Modal
                                    open={openCategory}
                                    onClose={() => setOpenCategory(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box sx={style}>
                                        <Typography variant="h2" sx={{marginLeft: "10px"}}>
                                            Change Shipping Address
                                        </Typography>
                                        <ModalClose
                                            variant="plain"
                                            sx={{
                                                borderStyle: "dashed",
                                                borderWidth: "1px",
                                            }}
                                        />
                                        <Box sx={{margin: "5px"}}>
                                            <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                                <Table
                                                    sx={{minWidth: 350}}
                                                    aria-label="customized table"
                                                    stickyHeader
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell align="center">
                                                                Address
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                Actions
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                Select
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <StyledTableRow key="1">
                                                            <StyledTableCell align="center">
                                                                {shipTo.shippingAddress}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {" "}
                                                                NA{" "}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Button
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    sx={{margin: "10px"}}
                                                                    onClick={() =>
                                                                        handleChange(shipTo.shippingAddress, shipTo)
                                                                    }
                                                                >
                                                                    Select
                                                                </Button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        {shipTo &&
                                                            shipTo.multipleShippingAddress &&
                                                            shipTo.multipleShippingAddress.map((shipIn) => (
                                                                <StyledTableRow key={shipIn.id}>
                                                                    <StyledTableCell align="center">
                                                                        {shipIn.address},{shipIn.city},
                                                                        {shipIn.state},{shipIn.zip}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <IconButton
                                                                            aria-label="edit"
                                                                            onClick={() =>
                                                                                handleEdit(shipIn.id, shipIn, shipTo.id)
                                                                            }
                                                                        >
                                                                            <EditIcon/>
                                                                        </IconButton>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        {shipIn && (
                                                                            <Button
                                                                                variant="outlined"
                                                                                color="primary"
                                                                                sx={{margin: "10px"}}
                                                                                onClick={() =>
                                                                                    handleChange(
                                                                                        shipIn.address +
                                                                                        " " +
                                                                                        shipIn.city +
                                                                                        " " +
                                                                                        shipIn.state +
                                                                                        " " +
                                                                                        shipIn.zip,
                                                                                        shipIn
                                                                                    )
                                                                                }
                                                                            >
                                                                                Select
                                                                            </Button>
                                                                        )}
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                                <Modal
                                                    open={editOpen}
                                                    onClose={() => setEditOpen(false)}
                                                    aria-labelledby="child-modal-title"
                                                    aria-describedby="child-modal-description"
                                                >
                                                    <Box sx={{...style, width: 200}}>
                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                                width: 500,
                                                                bgcolor: "background.paper",
                                                                border: "2px solid #000",
                                                                boxShadow: 24,
                                                                p: 1,
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        borderStyle: "dashed",
                                                                        borderWidth: "2px",
                                                                    }}
                                                                >
                                                                    <Typography component="h1" variant="h5">
                                                                        Edit Shipping Address
                                                                    </Typography>
                                                                    <ModalClose
                                                                        variant="plain"
                                                                        sx={{
                                                                            m: 1,
                                                                            borderStyle: "dashed",
                                                                            borderWidth: "2px",
                                                                        }}
                                                                    />
                                                                </Box>
                                                                <Box component="form" onSubmit={handleClick}>
                                                                    <Box>
                                                                        <TextField
                                                                            sx={{width: "100%"}}
                                                                            margin="normal"
                                                                            value={address}
                                                                            label="Street Address*"
                                                                            onChange={(e) =>
                                                                                setAddress(e.target.value)
                                                                            }
                                                                            fullWidth={true}
                                                                        />
                                                                    </Box>
                                                                    <Box>
                                                                        <TextField
                                                                            margin="normal"
                                                                            fullWidth
                                                                            value={city}
                                                                            label="City*"
                                                                            onChange={(e) => setCity(e.target.value)}
                                                                        />
                                                                    </Box>
                                                                    <Box sx={{display: "flex"}}>
                                                                        <TextField
                                                                            select
                                                                            fullWidth={true}
                                                                            sx={{margin: "10px"}}
                                                                            label="State"
                                                                            value={stateLoc}
                                                                            variant="outlined"
                                                                            margin="normal"
                                                                            onChange={(event) =>
                                                                                setStateLoc(event.target.value)
                                                                            }
                                                                        >
                                                                            {UserRole.india.map((indi) => (
                                                                                <MenuItem
                                                                                    key={indi.name}
                                                                                    value={indi.name}
                                                                                >
                                                                                    {indi.name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </TextField>
                                                                    </Box>
                                                                    <Box>
                                                                        <TextField
                                                                            margin="normal"
                                                                            required
                                                                            value={zip}
                                                                            label="Pin Code *"
                                                                            fullWidth={true}
                                                                            onChange={(e) => setZip(e.target.value)}
                                                                        />
                                                                    </Box>

                                                                    <Button
                                                                        type="submit"
                                                                        fullWidth
                                                                        variant="contained"
                                                                        onClick={handleClick}
                                                                        sx={{
                                                                            mt: 3,
                                                                            mb: 2,
                                                                            color: "whitesmoke",
                                                                            background: "#212121",
                                                                        }}
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Modal>
                                            </TableContainer>
                                        </Box>
                                        <ChildModal
                                            shipId={shipTo.id}
                                            setShipTo={setShipTo}
                                            setBillTo={setBillTo}
                                        />
                                    </Box>
                                </Modal>
                            </Transition>
                        </Box>
                        <Box sx={{display: "flex"}}>
                            <Box
                                sx={{
                                    width: "50%",
                                }}
                            >
                                <Box sx={{margin: "5px"}}>
                                    <label style={{fontSize: "12px"}}>
                                        Address :- <strong>{billTo.billingAddress}</strong>
                                    </label>
                                </Box>{" "}
                                <Box sx={{margin: "5px"}}>
                                    <label style={{fontSize: "12px"}}>
                                        Phone :- {billTo.mobileNumber}
                                    </label>
                                </Box>
                                <Box sx={{margin: "5px"}}>
                                    <label style={{fontSize: "12px"}}>
                                        GST :- {billTo.gstNumber}
                                    </label>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: "50%",
                                }}
                            >
                                <Box sx={{margin: "10px"}}>
                                    <label style={{fontSize: "12px"}}>
                                        Address :- <strong>{shipToAddress}</strong>
                                    </label>
                                </Box>{" "}
                                <Box sx={{margin: "10px"}}>
                                    <label style={{fontSize: "12px"}}>
                                        Phone :- {shipTo.mobileNumber}
                                    </label>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "40%",
                            borderStyle: "dashed",
                            borderWidth: "2px",
                        }}
                    >
                        <Box sx={{display: "flex"}}>
                            <Box sx={{width: "50%", margin: "10px"}}>
                                <TextField
                                    label="Challan No: "
                                    disabled={true}
                                    onChange={(event) =>
                                        handleTextFieldChange(event, "deliveryNo")
                                    }
                                    value={salePurchaseObject.deliveryNo}
                                />
                            </Box>
                            <Box sx={{width: "50%", margin: "10px"}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                                        <DatePicker
                                            label="Challan Date:"
                                            value={deliveryDate}
                                            onChange={(newValue) => setDeliveryDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{display: "flex"}}>
                            <Box sx={{width: "50%", margin: "10px"}}>
                                <TextField
                                    label="Payment Terms: "
                                    value={salePurchaseObject.paymentTerms}
                                    onChange={(event) =>
                                        handleTextFieldChange(event, "paymentTerms")
                                    }
                                />
                            </Box>
                            <Box sx={{width: "50%", margin: "10px"}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                                        <DatePicker
                                            label="Due Date:"
                                            value={deliveryDueDate}
                                            onChange={(newValue) => setDeliveryDueDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{minWidth: 1250}}
                            aria-label="customized table"
                            stickyHeader
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">NO</StyledTableCell>
                                    <StyledTableCell align="center">ITEMS</StyledTableCell>
                                    <StyledTableCell align="center">HSN</StyledTableCell>
                                    <StyledTableCell align="center">
                                        PRICE/ITEM (₹)
                                    </StyledTableCell>
                                    <StyledTableCell align="center">QTY</StyledTableCell>
                                    <StyledTableCell align="center">DISCOUNT</StyledTableCell>
                                    <StyledTableCell align="center">TAX</StyledTableCell>
                                    <StyledTableCell align="center">AMOUNT (₹)</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.id}
                                                disabled={true}
                                                onChange={(e) =>
                                                    handleInputChange(employee.id, "id", e.target.value)
                                                }
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.item}
                                                disabled={true}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        employee.item,
                                                        "item",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.hsn}
                                                disabled={true}
                                                onChange={(e) =>
                                                    handleInputChange(employee.id, "hsn", e.target.value)
                                                }
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                disabled={true}
                                                value={employee.salePrice}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        employee.salePrice,
                                                        "salePrice",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.quantity}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        employee.id,
                                                        "quantity",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.discount}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        employee.id,
                                                        "discount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                select
                                                value={employee.gst}
                                                onChange={(e) =>
                                                    handleInputChange(employee.id, "gst", e.target.value)
                                                }
                                            >
                                                {UserRole.GST.map((indi) => (
                                                    <MenuItem key={indi.name} value={indi.name}>
                                                        {indi.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <TextField
                                                value={employee.total}
                                                //   onChange={(e) => handleInputChange(employee.id, 'total', employee.quantity * employee.rate)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button onClick={() => deleteRow(employee.id)}>
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button
                            onClick={addRow}
                            sx={{
                                width: "100%",
                                borderStyle: "dashed",
                                borderWidth: "2px",
                                textAlign: "center",
                                alignItems: "center",
                            }}
                        >
                            Add Items
                        </Button>
                        <Modal
                            open={openItemModal}
                            onClose={() => setOpenItemModal(false)}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{...style, width: 200}}>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: 1000,
                                        bgcolor: "background.paper",
                                        border: "2px solid #000",
                                        boxShadow: 24,
                                        p: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography component="h1" variant="h3">
                                                Add Items
                                            </Typography>
                                            <ModalClose
                                                variant="plain"
                                                sx={{
                                                    borderStyle: "dashed",
                                                    borderWidth: "1px",
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            component="form"
                                            onSubmit={handleSubmitForItemSelect}
                                            sx={{width: "100%"}}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    margin: "5px",
                                                }}
                                            >
                                                <Box sx={{width: "35%", margin: "5px"}}>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Search Items"
                                                        variant="outlined"
                                                        value={filter}
                                                        onChange={(e) => setFilter(e.target.value)}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <SearchIcon
                                                                    sx={{
                                                                        marginRight: 1,
                                                                        color: "action.active",
                                                                    }}
                                                                />
                                                            ),
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{width: "35%", margin: "5px"}}>
                                                    <Autocomplete
                                                        value={filterCategory}
                                                        onChange={handleChangeForFilterCategory}
                                                        options={keyCategoryData}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Select Category"
                                                                variant="outlined"
                                                            />
                                                        )}
                                                    />
                                                </Box>
                                                <Box sx={{width: "30%", margin: "5px"}}>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        sx={{width: "275px", height: "55px"}}
                                                        onClick={handleAddNewItems}
                                                    >
                                                        +Add New Items
                                                    </Button>
                                                    <Modal
                                                        open={addNewItemsFlagModal}
                                                        onClose={() => setAddNewItemsFlagModal(false)}
                                                        aria-labelledby="child-modal-title"
                                                        aria-describedby="child-modal-description"
                                                    >
                                                        <Box sx={{...style, width: 200}}>
                                                            <Box
                                                                sx={{
                                                                    position: "absolute",
                                                                    top: "50%",
                                                                    left: "50%",
                                                                    transform: "translate(-50%, -50%)",
                                                                    width: 1000,
                                                                    bgcolor: "background.paper",
                                                                    border: "2px solid #000",
                                                                    boxShadow: 24,
                                                                    p: 1,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            borderStyle: "dashed",
                                                                            borderWidth: "2px",
                                                                        }}
                                                                    >
                                                                        <Typography component="h1" variant="h5">
                                                                            Add New Items
                                                                        </Typography>
                                                                        <ModalClose
                                                                            variant="plain"
                                                                            sx={{
                                                                                m: 1,
                                                                                borderStyle: "dashed",
                                                                                borderWidth: "2px",
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                    <Box
                                                                        component="form"
                                                                        onSubmit={handleForNewItemCreation}
                                                                    >
                                                                        <Box>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                label="Item"
                                                                                variant="outlined"
                                                                                sx={{margin: "10px"}}
                                                                                value={inventoryObject.item}
                                                                                onChange={(event) =>
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "item"
                                                                                    )
                                                                                }
                                                                            />
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                label="Item Code"
                                                                                variant="outlined"
                                                                                sx={{margin: "10px"}}
                                                                                value={inventoryObject.itemCode}
                                                                                onChange={(event) =>
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "itemCode"
                                                                                    )
                                                                                }
                                                                            />
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                label="Bar Code"
                                                                                variant="outlined"
                                                                                sx={{margin: "10px"}}
                                                                                value={inventoryObject.barCodeValue}
                                                                                onChange={(event) =>
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "barCodeValue"
                                                                                    )
                                                                                }
                                                                            />{" "}
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                label="MRP"
                                                                                variant="outlined"
                                                                                sx={{margin: "10px"}}
                                                                                value={inventoryObject.mrp}
                                                                                onChange={(event) =>
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "mrp"
                                                                                    )
                                                                                }
                                                                            />
                                                                            <Box sx={{display: "flex"}}>
                                                                                <TextField
                                                                                    id="outlined-basic"
                                                                                    label="Sale Price"
                                                                                    variant="outlined"
                                                                                    sx={{margin: "10px", width: "60%"}}
                                                                                    value={inventoryObject.salePrice}
                                                                                    onChange={(event) =>
                                                                                        handleTextFieldChangeForInventory(
                                                                                            event,
                                                                                            "salePrice"
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <TextField
                                                                                    sx={{margin: "10px", width: "60%"}}
                                                                                    select
                                                                                    value={inventoryObject.salePriceTax}
                                                                                    onChange={(event) =>
                                                                                        handleTextFieldChangeForInventory(
                                                                                            event,
                                                                                            "salePriceTax"
                                                                                        )
                                                                                    }
                                                                                    label="Tax"
                                                                                    variant="outlined"
                                                                                    margin="normal"
                                                                                >
                                                                                    {UserRole.taxType.map((userrole) => (
                                                                                        <MenuItem
                                                                                            key={userrole.name}
                                                                                            value={userrole.name}
                                                                                        >
                                                                                            {userrole.name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </TextField>
                                                                            </Box>
                                                                            <Box sx={{display: "flex"}}>
                                                                                <TextField
                                                                                    id="outlined-basic"
                                                                                    label="Purchase Price"
                                                                                    variant="outlined"
                                                                                    sx={{margin: "10px", width: "60%"}}
                                                                                    value={inventoryObject.purchasePrice}
                                                                                    onChange={(event) =>
                                                                                        handleTextFieldChangeForInventory(
                                                                                            event,
                                                                                            "purchasePrice"
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <TextField
                                                                                    select
                                                                                    value={
                                                                                        inventoryObject.purchasePriceTax
                                                                                    }
                                                                                    onChange={(event) =>
                                                                                        handleTextFieldChangeForInventory(
                                                                                            event,
                                                                                            "purchasePriceTax"
                                                                                        )
                                                                                    }
                                                                                    label="Tax"
                                                                                    variant="outlined"
                                                                                    margin="normal"
                                                                                    sx={{margin: "10px", width: "60%"}}
                                                                                >
                                                                                    {UserRole.taxType.map((userrole) => (
                                                                                        <MenuItem
                                                                                            key={userrole.name}
                                                                                            value={userrole.name}
                                                                                        >
                                                                                            {userrole.name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </TextField>
                                                                            </Box>
                                                                            <TextField
                                                                                fullWidth
                                                                                select
                                                                                value={inventoryObject.gst}
                                                                                onChange={(event) =>
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "gst"
                                                                                    )
                                                                                }
                                                                                label="GST %"
                                                                                variant="outlined"
                                                                                margin="normal"
                                                                            >
                                                                                {UserRole.GST.map((userrole) => (
                                                                                    <MenuItem
                                                                                        key={userrole.name}
                                                                                        value={userrole.name}
                                                                                    >
                                                                                        {userrole.name}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </TextField>
                                                                            <TextField
                                                                                fullWidth
                                                                                select
                                                                                value={inventoryObject.category}
                                                                                onChange={(event) =>
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "category"
                                                                                    )
                                                                                }
                                                                                label="Category"
                                                                                variant="outlined"
                                                                                margin="normal"
                                                                            >
                                                                                <MenuItem
                                                                                    onClick={() => setOpenCategory(true)}
                                                                                >
                                                                                    Create a New Category
                                                                                </MenuItem>
                                                                                {Array.isArray(keyCategoryData) &&
                                                                                    keyCategoryData.map((userrole) => (
                                                                                        <MenuItem
                                                                                            key={userrole}
                                                                                            value={userrole}
                                                                                        >
                                                                                            {userrole}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                            </TextField>
                                                                            <Modal
                                                                                aria-labelledby="modal-title"
                                                                                aria-describedby="modal-desc"
                                                                                open={openCategory}
                                                                                onClose={() => setOpenCategory(false)}
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
                                                                                            <ModalClose
                                                                                                variant="plain"
                                                                                                sx={{m: 1}}
                                                                                            />
                                                                                            <Typography
                                                                                                component="h1"
                                                                                                variant="h5"
                                                                                            >
                                                                                                Save Into Category
                                                                                            </Typography>
                                                                                            <Box
                                                                                                component="form"
                                                                                                onSubmit={
                                                                                                    handleClickForCategory
                                                                                                }
                                                                                                noValidate
                                                                                                sx={{mt: 1}}
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
                                                                                                    onChange={(e) =>
                                                                                                        setCategoryApi(
                                                                                                            e.target.value
                                                                                                        )
                                                                                                    }
                                                                                                    autoFocus
                                                                                                />
                                                                                                <Button
                                                                                                    type="submit"
                                                                                                    fullWidth
                                                                                                    variant="contained"
                                                                                                    onClick={
                                                                                                        handleClickForCategory
                                                                                                    }
                                                                                                    sx={{
                                                                                                        mt: 3,
                                                                                                        mb: 2,
                                                                                                        color: "whitesmoke",
                                                                                                        background: "#212121",
                                                                                                    }}
                                                                                                >
                                                                                                    Submit
                                                                                                </Button>
                                                                                                <List
                                                                                                    sx={{maxWidth: 300}}>
                                                                                                    {addCategory.length > 0 ? (
                                                                                                        addCategory.map(
                                                                                                            (item, index) => (
                                                                                                                <ListItem
                                                                                                                    endAction={
                                                                                                                        <IconButton
                                                                                                                            aria-label="Delete"
                                                                                                                            size="sm"
                                                                                                                            color="danger"
                                                                                                                        >
                                                                                                                            <Delete
                                                                                                                                onClick={() =>
                                                                                                                                    deleteCategory(
                                                                                                                                        item.id,
                                                                                                                                        item.value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />
                                                                                                                        </IconButton>
                                                                                                                    }
                                                                                                                >
                                                                                                                    <ListItemButton
                                                                                                                        key={index}
                                                                                                                    >
                                                                                                                        {item.value}
                                                                                                                    </ListItemButton>
                                                                                                                </ListItem>
                                                                                                            )
                                                                                                        )
                                                                                                    ) : (
                                                                                                        <p>Add New
                                                                                                            Category</p>
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
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "companyName"
                                                                                    )
                                                                                }
                                                                                label="Company Name"
                                                                                variant="outlined"
                                                                                margin="normal"
                                                                            >
                                                                                <MenuItem
                                                                                    onClick={() => setOpenCompany(true)}
                                                                                >
                                                                                    Create a New Company
                                                                                </MenuItem>
                                                                                {Array.isArray(keyCompanyData) &&
                                                                                    keyCompanyData.map((userrole) => (
                                                                                        <MenuItem
                                                                                            key={userrole}
                                                                                            value={userrole}
                                                                                        >
                                                                                            {userrole}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                            </TextField>
                                                                            <Modal
                                                                                aria-labelledby="modal-title"
                                                                                aria-describedby="modal-desc"
                                                                                open={openCompany}
                                                                                onClose={() => setOpenCompany(false)}
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
                                                                                            <ModalClose
                                                                                                variant="plain"
                                                                                                sx={{m: 1}}
                                                                                            />
                                                                                            <Typography
                                                                                                component="h1"
                                                                                                variant="h5"
                                                                                            >
                                                                                                Save Into Category
                                                                                            </Typography>
                                                                                            <Box
                                                                                                component="form"
                                                                                                onSubmit={handleClickForCompany}
                                                                                                noValidate
                                                                                                sx={{mt: 1}}
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
                                                                                                    onChange={(e) =>
                                                                                                        setCategoryApi(
                                                                                                            e.target.value
                                                                                                        )
                                                                                                    }
                                                                                                    autoFocus
                                                                                                />
                                                                                                <Button
                                                                                                    type="submit"
                                                                                                    fullWidth
                                                                                                    variant="contained"
                                                                                                    onClick={
                                                                                                        handleClickForCompany
                                                                                                    }
                                                                                                    sx={{
                                                                                                        mt: 3,
                                                                                                        mb: 2,
                                                                                                        color: "whitesmoke",
                                                                                                        background: "#212121",
                                                                                                    }}
                                                                                                >
                                                                                                    Submit
                                                                                                </Button>
                                                                                                <List
                                                                                                    sx={{maxWidth: 300}}>
                                                                                                    {addCategory.length > 0 ? (
                                                                                                        addCategory.map(
                                                                                                            (item, index) => (
                                                                                                                <ListItem
                                                                                                                    endAction={
                                                                                                                        <IconButton
                                                                                                                            aria-label="Delete"
                                                                                                                            size="sm"
                                                                                                                            color="danger"
                                                                                                                        >
                                                                                                                            <Delete
                                                                                                                                onClick={() =>
                                                                                                                                    deleteCategory(
                                                                                                                                        item.id,
                                                                                                                                        item.value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />
                                                                                                                        </IconButton>
                                                                                                                    }
                                                                                                                >
                                                                                                                    <ListItemButton
                                                                                                                        key={index}
                                                                                                                    >
                                                                                                                        {item.value}
                                                                                                                    </ListItemButton>
                                                                                                                </ListItem>
                                                                                                            )
                                                                                                        )
                                                                                                    ) : (
                                                                                                        <p>Add New
                                                                                                            Company</p>
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
                                                                                sx={{margin: "10px"}}
                                                                                value={inventoryObject.hsn}
                                                                                onChange={(event) =>
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "hsn"
                                                                                    )
                                                                                }
                                                                            />
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                label="Total Stock"
                                                                                variant="outlined"
                                                                                sx={{margin: "10px"}}
                                                                                value={inventoryObject.totalStock}
                                                                                onChange={(event) =>
                                                                                    handleTextFieldChangeForInventory(
                                                                                        event,
                                                                                        "totalStock"
                                                                                    )
                                                                                }
                                                                            />
                                                                        </Box>

                                                                        <Button
                                                                            type="submit"
                                                                            fullWidth
                                                                            variant="contained"
                                                                            onClick={handleForNewItemCreation}
                                                                            sx={{
                                                                                mt: 3,
                                                                                mb: 2,
                                                                                color: "whitesmoke",
                                                                                background: "#212121",
                                                                            }}
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Modal>
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    margin: "5px",
                                                    borderStyle: "dashed",
                                                    borderWidth: "1px",
                                                }}
                                            >
                                                <TableContainer
                                                    component={Paper}
                                                    sx={{maxHeight: 350, minHeight: 350}}
                                                >
                                                    <Table
                                                        sx={{minWidth: 650}}
                                                        aria-label="simple table"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox
                                                                        indeterminate={
                                                                            selectedRows.length > 0 &&
                                                                            selectedRows.length < inventorys.length
                                                                        }
                                                                        checked={
                                                                            selectedRows.length === inventorys.length
                                                                        }
                                                                        onChange={() =>
                                                                            setSelectedRows(
                                                                                selectedRows.length ===
                                                                                inventorys.length
                                                                                    ? []
                                                                                    : inventorys.map((row) => row.id)
                                                                            )
                                                                        }
                                                                    />
                                                                </TableCell>
                                                                <TableCell>ITEM NAME</TableCell>
                                                                <TableCell align="center">ITEM CODE</TableCell>
                                                                <TableCell align="center">
                                                                    SALES PRICE
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    PURCHASE PRICE
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    CURRENT STOCK
                                                                </TableCell>
                                                                <TableCell align="center">QUANTITY</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {Array.isArray(filteredEmployees) &&
                                                                filteredEmployees.map((row) => (
                                                                    <TableRow
                                                                        key={row.name}
                                                                        sx={{
                                                                            "&:last-child td, &:last-child th": {
                                                                                border: 0,
                                                                            },
                                                                        }}
                                                                    >
                                                                        <TableCell padding="checkbox">
                                                                            <Checkbox
                                                                                checked={
                                                                                    selectedRows.indexOf(row.id) !== -1
                                                                                }
                                                                                onClick={() =>
                                                                                    handleCheckboxClick(row.id)
                                                                                }
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">
                                                                            {row.item}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {row.itemCode}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {row.salePrice}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {row.purchasePrice}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {row.totalStock}
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            <Box>
                                                                                <ButtonGroup
                                                                                    size="small"
                                                                                    aria-label="small outlined button group"
                                                                                >
                                                                                    <Button
                                                                                        onClick={() =>
                                                                                            decreaseSalary(row.id)
                                                                                        }
                                                                                    >
                                                                                        -
                                                                                    </Button>
                                                                                    <Button disabled>
                                                                                        {row.quantity}
                                                                                    </Button>
                                                                                    <Button
                                                                                        onClick={() =>
                                                                                            increaseSalary(row.id)
                                                                                        }
                                                                                    >
                                                                                        +
                                                                                    </Button>
                                                                                </ButtonGroup>
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>

                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                onClick={handleSubmitForItemSelect}
                                                sx={{
                                                    mt: 3,
                                                    mb: 2,
                                                    color: "whitesmoke",
                                                    background: "#212121",
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>

                        <Table
                            sx={{minWidth: 1250}}
                            aria-label="customized table"
                            stickyHeader
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" style={{color: "black"}}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{color: "black"}}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{color: "black"}}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{color: "black"}}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{color: "black"}}>
                                        1
                                    </StyledTableCell>
                                    <StyledTableCell align="center">SUBTOTAL</StyledTableCell>
                                    <StyledTableCell align="center">
                                        (₹) {totalDiscountTable}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        (₹) {totalTaxTable}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        (₹) {totalAmountTable}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{color: "black"}}>
                                        1
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{display: "flex"}}>
                    <Box sx={{width: "50%"}}>
                        <Box sx={{padding: "10px"}}>
                            <Button
                                onClick={handleToggleNotes}
                                variant="contained"
                                color="primary"
                            >
                                +Add Notes
                            </Button>
                            {openNotes && (
                                <Box sx={{display: "flex", padding: "10px"}}>
                                    <TextField
                                        label="Enter Notes"
                                        variant="outlined"
                                        fullWidth={true}
                                        value={salePurchaseObject.addNote}
                                        onChange={(event) =>
                                            handleTextFieldChange(event, "addNote")
                                        }
                                    />
                                    <IconButton onClick={handleToggleNotes}>
                                        <Close/>
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                        <Box sx={{padding: "10px"}}>
                            <Button
                                onClick={handleToggleTermCondition}
                                variant="contained"
                                color="primary"
                            >
                                +Terms and Conditions
                            </Button>
                            {openTermCondition && (
                                <Box sx={{display: "flex", padding: "10px"}}>
                                    <TextField
                                        label="Enter Terms & Conditions"
                                        variant="outlined"
                                        fullWidth={true}
                                        value={salePurchaseObject.addTermsAndCondition}
                                        onChange={(event) =>
                                            handleTextFieldChange(event, "addTermsAndCondition")
                                        }
                                    />
                                    <IconButton onClick={handleToggleTermCondition}>
                                        <Close/>
                                    </IconButton>
                                </Box>
                            )}
                            {!openTermCondition && (
                                <Box sx={{padding: "10px"}}>
                                    <Typography>
                                        1. Goods once sold will not be taken back or exchanged{" "}
                                    </Typography>
                                    <Typography>
                                        2. All disputes are subject to [ENTER_YOUR_CITY_NAME]
                                        jurisdiction only
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{width: "50%"}}>
                        {/*                        <Box>
                              <Button variant="contained" onClick={handleAddDiscount}>
                                  Add Additional Charges
                              </Button>
                              {boxes.map((box, index) => (
                                  <Box key={box.id} mt={2} p={2} border={1} display="flex" alignItems="center">
                                      <TextField label="Enter Text" fullWidth/>
                                      <IconButton onClick={() => handleCloseBox(box.id)}>
                                          <CloseIcon/>
                                      </IconButton>
                                  </Box>
                              ))}
                          </Box>*/}
                        <Box>
                            <Box sx={{padding: "10px"}}>
                                <Button variant="contained" onClick={addField}>
                                    Add Additional Charges
                                </Button>
                                {fields.map((field, index) => (
                                    <Box
                                        key={index}
                                        sx={{marginTop: 2, display: "flex", alignItems: "center"}}
                                    >
                                        <Box sx={{width: "65%"}}>
                                            <TextField
                                                label="Enter Charges (ex.Transport Charge)"
                                                value={field.key}
                                                onChange={(e) => handleInputChangess(index, "key", e)}
                                                disabled={field.disabled}
                                                sx={{marginRight: 1}}
                                            />
                                        </Box>{" "}
                                        <Box sx={{width: "25%"}}>
                                            <TextField
                                                label=" ₹ "
                                                value={field.value}
                                                onChange={(e) => handleInputChangess(index, "value", e)}
                                                disabled={field.disabled}
                                                inputProps={{
                                                    inputMode: "decimal",
                                                    pattern: "[0-9]*[.,]?[0-9]*",
                                                }}
                                                type="number"
                                                sx={{marginRight: 1}}
                                            />{" "}
                                        </Box>{" "}
                                        <Box sx={{width: "10%"}}>
                                            <IconButton
                                                onClick={() => removeField(index)}
                                                disabled={field.disabled}
                                            >
                                                <CloseIcon/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}
                                {fields.length === 0}
                            </Box>
                            <Box sx={{padding: "10px", display: "flex"}}>
                                <Box sx={{width: "65%"}}>
                                    <Typography>Taxable Amount</Typography>
                                </Box>{" "}
                                <Box sx={{width: "25%"}}>
                                    <h4>{totalAmountWithOutTax}</h4>
                                </Box>
                            </Box>
                            <Box sx={{padding: "10px", display: "flex"}}>
                                <Box sx={{width: "65%"}}>
                                    {rRates.map((rats) => (
                                        <>
                                            <Typography>SGST@{rats}</Typography>
                                            <Typography>CGST@{rats}</Typography>
                                        </>
                                    ))}
                                </Box>{" "}
                                <Box sx={{width: "25%"}}>
                                    {rValues.map((rats) => (
                                        <>
                                            <Typography>(₹){rats}</Typography>
                                            <Typography>(₹){rats}</Typography>
                                        </>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{padding: "10px"}}>
                                <Button
                                    variant="contained"
                                    onClick={() => setShowAddDiscount(!showAddDiscount)}
                                >
                                    + Add Discount
                                </Button>
                                {showAddDiscount ? (
                                    <Box
                                        sx={{marginTop: 2, display: "flex", alignItems: "center"}}
                                    >
                                        <Box sx={{width: "65%"}}>
                                            <TextField
                                                label="Add Discount"
                                                value="Add Discount"
                                                disabled={true}
                                                sx={{marginRight: 1}}
                                            />
                                        </Box>
                                        <Box sx={{width: "25%"}}>
                                            <TextField
                                                label=" ₹ "
                                                onChange={(event) => setAddDiscount(event.target.value)}
                                                value={addDiscount}
                                                inputProps={{
                                                    inputMode: "decimal",
                                                    pattern: "[0-9]*[.,]?[0-9]*",
                                                }}
                                                type="number"
                                                sx={{marginRight: 1}}
                                            />
                                        </Box>
                                        <Box sx={{width: "10%"}}>
                                            <IconButton
                                                onClick={() => {
                                                    setShowAddDiscount(!showAddDiscount);
                                                    setTextValue(0);
                                                }}
                                            >
                                                <CloseIcon/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box></Box>
                                )}
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{padding: "10px", display: "flex"}}>
                                <Box sx={{width: "65%"}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChangeChecked}
                                            />
                                        }
                                        label="Auto Round Off"
                                    />
                                </Box>
                                <Box sx={{width: "25%"}}>
                                    <TextField
                                        label=" ₹ "
                                        value={autoRoundOffValue}
                                        onChange={(e) => setAutoRoundOffValue(e.target.value)}
                                        inputProps={{
                                            inputMode: "decimal",
                                            pattern: "[0-9]*[.,]?[0-9]*",
                                        }}
                                        type="number"
                                        sx={{marginRight: 1}}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{padding: "10px", display: "flex"}} variant="outlined">
                                <Box sx={{width: "65%"}}>
                                    <Typography>Total Amount</Typography>
                                </Box>
                                <Box sx={{width: "25%"}}>
                                    <Typography> ₹ {totalAmountTableOperation}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Box sx={{padding: "10px", display: "flex"}}>
                                <Box sx={{width: "65%"}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkedMark}
                                                onChange={handleChangeCheckedMarkAsFUll}
                                            />
                                        }
                                        label="Marked As Fully Paid"
                                    />
                                </Box>
                                <Box sx={{width: "25%"}}></Box>
                            </Box>
                            <Box
                                sx={{
                                    padding: "10px",
                                    display: "flex",
                                    borderStyle: "dashed",
                                    borderWidth: "2px",
                                }}
                            >
                                <Box sx={{width: "65%"}}>
                                    <Typography>Amount Received</Typography>
                                </Box>
                                <Box sx={{width: "35%", display: "flex"}}>
                                    <TextField
                                        label=" ₹  "
                                        value={amountRecieved}
                                        onChange={handleForSetAmountRecived}
                                        inputProps={{
                                            inputMode: "decimal",
                                            pattern: "[0-9]*[.,]?[0-9]*",
                                        }}
                                        type="number"
                                        sx={{marginRight: 1}}
                                    />
                                    <TextField
                                        fullWidth
                                        select
                                        label="Mode"
                                        value={salePurchaseObject.paymentMode}
                                        onChange={(event) =>
                                            handleTextFieldChange(event, "paymentMode")
                                        }
                                        variant="outlined"
                                        sx={{marginRight: 1}}
                                    >
                                        {UserRole.paymentMode.map((userrole) => (
                                            <MenuItem key={userrole.name} value={userrole.name}>
                                                {userrole.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{padding: "10px", display: "flex"}}>
                                <Box sx={{width: "65%"}}>
                                    <Typography>Balance Amount</Typography>
                                </Box>
                                <Box sx={{width: "25%"}}>
                                    <Typography> ₹ {balanceAmount}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Card variant="outlined">
                                <Box>
                                    {uploadImage ? (
                                        <Box sx={{display: "flex", position: "relative"}}>
                                            <CardMedia
                                                sx={{
                                                    height: "90px",
                                                    width: "90px",
                                                    margin: "10px",
                                                    borderStyle: "dashed",
                                                    borderWidth: "2px",
                                                }}
                                                image={uploadImage}
                                                alt="Upload Signature"
                                            />
                                            <IconButton
                                                onClick={() => setUploadImage("")}
                                                sx={{
                                                    opacity: "0.8",
                                                    top: "0px",
                                                    color: "black",
                                                    backgroundColor: "white",
                                                    marginLeft: "75px",
                                                    position: "absolute",
                                                }}
                                            >
                                                <CloseIcon/>
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <label htmlFor="image-upload-2">
                                            <Button
                                                variant="plain"
                                                component="span"
                                                sx={{
                                                    borderStyle: "dashed",
                                                    borderWidth: "2px",
                                                }}
                                            >
                                                Upload Signature
                                            </Button>
                                        </label>
                                    )}
                                </Box>
                                <input
                                    accept="image/*"
                                    style={{display: "none"}}
                                    id="image-upload-2"
                                    type="file"
                                    onChange={(event) => handleImageUpload(event, setUploadImage)}
                                />
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
const ChildModal = ({shipId, setShipTo, setBillTo}) => {
    const [open, setOpen] = React.useState(false);
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [stateLoc, setStateLoc] = useState("");
    const [zip, setZip] = useState("");
    const {partyUser} = useSelector((state) => state.partyReducerValue);
    const dispatch = useDispatch();
    let axiosConfig = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
        },
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                SAVE_ADDRESS,
                {
                    id: shipId,
                    multipleShippingAddress: [
                        {
                            address: address,
                            city: city,
                            state: stateLoc,
                            zip: zip,
                        },
                    ],
                },
                axiosConfig
            );
            console.log(response.data); // Handle response data
            if (response.data.code === 200) {
                addObjectOnTop(response.data.response);
                console.log("hesab response if ", response.data.response);
                setShipTo(response.data.response);
                setBillTo(response.data.response);
                //  dispatch(addLogin(response.data.response));
                // onBooleanChange();
            } else {
                console.log("hesab response else ", response.data.response);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        handleClose();
    };

    const addObjectOnTop = (newObject) => {
        const existingIndex = partyUser.findIndex(
            (item) => item.id === newObject.id
        );
        if (existingIndex === -1) {
            dispatch(addParty([newObject, ...partyUser]));
        } else {
            const updatedArray = [...partyUser];
            updatedArray[existingIndex] = newObject;
            dispatch(addParty(updatedArray));
        }
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleOpen}
                sx={{margin: "10px"}}
            >
                Add New Shipping Address
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: 200}}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 500,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    borderStyle: "dashed",
                                    borderWidth: "2px",
                                }}
                            >
                                <Typography component="h1" variant="h5">
                                    Edit Shipping Address
                                </Typography>
                                <ModalClose
                                    variant="plain"
                                    sx={{
                                        m: 1,
                                        borderStyle: "dashed",
                                        borderWidth: "2px",
                                    }}
                                />
                            </Box>
                            <Box component="form" onSubmit={handleClick}>
                                <Box>
                                    <TextField
                                        sx={{width: "100%"}}
                                        margin="normal"
                                        label="Street Address*"
                                        onChange={(e) => setAddress(e.target.value)}
                                        fullWidth={true}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="City*"
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{display: "flex"}}>
                                    <TextField
                                        select
                                        fullWidth={true}
                                        sx={{margin: "10px"}}
                                        label="State"
                                        variant="outlined"
                                        margin="normal"
                                        onChange={(event) => setStateLoc(event.target.value)}
                                    >
                                        {UserRole.india.map((indi) => (
                                            <MenuItem key={indi.name} value={indi.name}>
                                                {indi.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Pin Code *"
                                        fullWidth={true}
                                        onChange={(e) => setZip(e.target.value)}
                                    />
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleClick}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        color: "whitesmoke",
                                        background: "#212121",
                                    }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
};
