import "./App.css";
import {Route, Routes, useLocation} from "react-router-dom";
import SideBar from "./pages/Sidebar/SideBar";
import {HesabbookHome} from "./pages/home/HesabbookHome";
import React, {useEffect, useState} from "react";
import {AccountManagementUsers} from "./pages/account/AccountManagementUsers";
import {MyUserDetails} from "./pages/account/MyUserDetails";
import {MyBusinessAccount} from "./pages/account/MyBusinessAccount";
import {Party} from "./pages/party/Party";
import {InventoryGodown} from "./pages/stock/InventoryGodown";
import {InventoryShop} from "./pages/stock/InventoryShop";
import {Expense} from "./pages/expense/Expense";
import {ScreenShare} from "./WebRtc/ScreenShare";
import {Chat} from "./pages/Chat";
import {CashAndBank} from "./pages/CashAndBank/CashAndBank";
import {SalesInvoice} from "./pages/Sales/SaleInvoice/SalesInvoice";
import {PaymentIn} from "./pages/Sales/PaymentIn/PaymentIn";
import POSBilling from "./pages/POSBilling/POSBilling";
import {Print} from "./pages/print/Print";
import {MainDashboard} from "./pages/Dashboard/MainDashboard";
import {MainPartyDetails} from "./pages/party/MainPartyDetails";
import {Logout} from "./pages/Logout";
import SettingsSideBar from "./pages/Sidebar/SettingsSideBar";
import Report from "./pages/Report/Report";
import Feedback from "./pages/Feedback/Feedback";
import {AiFillHeart} from "react-icons/ai";
import HelpSupport from "./pages/HelpSupport/HelpSupport";

export const AppContent = ({flag, handleBooleanChange, setFlag}) => {
    const [sidebarType, setSidebarType] = useState('default');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/settings')) {
            setSidebarType('settings');
        } else {
            setSidebarType('default');
        }
    }, [location.pathname]);

    function getRoutesAndElement() {
        return <Routes>
            <Route path="/" element={<MainDashboard/>}/>
            <Route path="/party" element={<Party/>}/>
            <Route path="/posbilling" element={<POSBilling/>}/>
            <Route path="/stock/shop" element={<InventoryShop/>}/>
            <Route path="/stock/godowon" element={<InventoryGodown/>}/>
            <Route path="/bank" element={<CashAndBank/>}/>
            <Route path="/report" element={<Report/>}/>

            <Route path="/chat" element={<Chat/>}/>
            <Route path="/help" element={<MainPartyDetails/>}/>
            <Route path="/sales/invoice" element={<SalesInvoice/>}/>
            <Route path="/sales/payment-in" element={<PaymentIn/>}/>
            <Route path="/expenses" element={<Expense/>}/>
            <Route path="/feedback" element={<ScreenShare/>}/>

            <Route path="/settings/manage/users" element={<AccountManagementUsers/>}/>
            <Route path="/settings/account" element={<MyUserDetails/>}/>
            <Route path="/settings/manage/business" element={<MyBusinessAccount/>}/>
            <Route path="/settings/thermal/print" element={<Print/>}/>
            <Route path="/settings/help/support" element={<HelpSupport/>}/>
            <Route path="/settings/feedback" element={<Feedback/>}/>

            <Route path="/logout" element={<Logout setFlag={setFlag}/>}/>

            <Route path="*" element={<> not found</>}/>
        </Routes>;
    }

    return (
        <>
            {flag ? (
                <div>
                    <Routes>
                        <Route path="/" element={<HesabbookHome onBooleanChange={handleBooleanChange}/>}/>
                    </Routes>
                </div>
            ) : (
                <div>
                    {sidebarType === 'default' ? (
                        <SideBar>
                            {getRoutesAndElement()}
                        </SideBar>) : (
                        <SettingsSideBar>
                            {getRoutesAndElement()}
                        </SettingsSideBar>
                    )
                    }
                </div>
            )}
        </>
    );
}


