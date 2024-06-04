import "./App.css";
import {Route, Routes, useLocation} from "react-router-dom";
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
import SettingsSideBar from "./pages/Sidebar/SettingsSideBar";

export const AppContent = ({flag, handleBooleanChange, setFlag}) => {
    const [sidebarType, setSidebarType] = useState('default');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/settings') {
            setSidebarType('settings');
        } else {
            setSidebarType('default');
        }
    }, [location.pathname]);

    return (
        <>
            {flag ? (
                <div>
                    <Routes>
                        <Route path="/" element={<HesabbookHome onBooleanChange={handleBooleanChange}/>}/>
                        <Route path="/posbilling" element={<MainPage/>}/>
                    </Routes>
                </div>
            ) : (
                <div>
                    {sidebarType === 'default' ? (
                        <SideBar>
                        <Routes>
                            <Route path="/" element={<MainDashboard/>}/>
                            <Route path="/party" element={<Party/>}/>
                            <Route path="/users" element={<Users/>}/>
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
                        </Routes></SideBar>) : (
                        <SettingsSideBar>
                            <Routes>
                                <Route path="/" element={<MainDashboard/>}/>
                                <Route path="/party" element={<Party/>}/>
                                <Route path="/users" element={<Users/>}/>
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
                        </SettingsSideBar>
                    )
                    }
                </div>
            )}
        </>
    );
}


