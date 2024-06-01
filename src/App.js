import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import SideBar from "./pages/Sidebar/SideBar";
import {HesabbookHome} from "./pages/home/HesabbookHome";
import {MainPage} from "./pages/MainPage";
import {useEffect, useState} from "react";
import {AccountManagementUsers} from "./pages/account/AccountManagementUsers";
import {MyUserDetails} from "./pages/account/MyUserDetails";
import {MyBusinessAccount} from "./pages/account/MyBusinessAccount";
import {Party} from "./pages/party/Party";
import {InventoryGodown} from "./pages/stock/InventoryGodown";
import {InventoryShop} from "./pages/stock/InventoryShop";
import {Expense} from "./pages/expense/Expense";
import {ScreenShare} from "./WebRtc/ScreenShare";
import {Chat} from "./pages/Chat";
import ExampleWithProviders from "./pages/Example";
import {CashAndBank} from "./pages/CashAndBank/CashAndBank";
import {SalesInvoice} from "./pages/Sales/SaleInvoice/SalesInvoice";
import {PaymentIn} from "./pages/Sales/PaymentIn/PaymentIn";
import POSBilling from "./pages/POSBilling/POSBilling";
import {Print} from "./pages/print/Print";
import {MainDashboard} from "./pages/Dashboard/MainDashboard";
import {MainPartyDetails} from "./pages/party/MainPartyDetails";
import {Logout} from "./pages/Logout";

function App() {
    const [flag, setFlag] = useState(true);
    const handleBooleanChange = () => {
        setFlag(prevState => !prevState);
    };
    useEffect(() => {
        console.log("Flag" ,flag);

    }, [flag]);
    return (<>
            <Router>
                {flag && (
                    <div>

                        <Routes>
                            <Route path="/" element={<HesabbookHome onBooleanChange={handleBooleanChange}/>}/>
                            <Route path="/posbilling" element={<MainPage/>}/>
                        </Routes>
                    </div>
                )}
                {!flag && (<div>
                        <SideBar>
                            <Routes>
                                <Route path="/" element={<MainDashboard/>}/>
                                <Route path="/party" element={<Party/>}/>
                                <Route path="/users" element={<Users/>}/>
                                <Route path="/app/dashboard"
                                       element={<Dashboard onBooleanChange={handleBooleanChange}/>}/>
                                <Route path="/messages" element={<Messages/>}/>
                                <Route path="/analytics" element={<Analytics/>}/>
                                <Route path="/file-manager" element={<FileManager/>}/>
                                <Route path="/order" element={<Order/>}/>
                                <Route path="/saved" element={<Saved/>}/>
                                <Route path="/settings" element={<Setting/>}/>
                                <Route path="/posbilling" element={<POSBilling/>}/>
                                <Route path="/account/manageAccount" element={<AccountManagementUsers/>}/>
                                <Route path="/account/myuser" element={<MyUserDetails/>}/>
                                <Route path="/account/business" element={<MyBusinessAccount/>}/>
                                <Route path="/stock/shop" element={<InventoryShop/>}/>
                                <Route path="/stock/godowon" element={<InventoryGodown/>}/>
                                <Route path="/bank" element={<CashAndBank/>}/>
                                <Route path="/chat" element={<Chat/>}/>
                                <Route path="/help" element={<MainPartyDetails/>}/>
                                <Route path="/sales/invoice" element={<SalesInvoice/>}/>
                                <Route path="/sales/payment-in" element={<PaymentIn/>}/>
                                <Route path="/report" element={<ExampleWithProviders/>}/>
                                <Route path="/expenses" element={<Expense/>}/>
                                <Route path="/feedback" element={<ScreenShare/>}/>
                                <Route path="/printing" element={<Print/>}/>
                                <Route path="/logout" element={<Logout setFlag={setFlag}/>}/>
                                <Route path="*" element={<> not found</>}/>
                            </Routes>
                        </SideBar>
                    </div>
                )}
            </Router>
        </>
    );
}

export default App;
