import "./App.css";
import {Route, Routes, useLocation} from "react-router-dom";
import SideBar from "./pages/Sidebar/SideBar";
import {HesabbookHome} from "./pages/Home/HesabbookHome";
import React, {useEffect, useState} from "react";
import {AccountManagementUsers} from "./pages/Account/AccountManagementUsers";
import {MyUserDetails} from "./pages/Account/MyUserDetails";
import {MyBusinessAccount} from "./pages/Account/MyBusinessAccount";
import {Party} from "./pages/Party/Party";
import {InventoryGodown} from "./pages/Stock/InventoryGodown";
import {InventoryShop} from "./pages/Stock/InventoryShop";
import {Expense} from "./pages/Expense/Expense";
import {Chat} from "./pages/ChatComponent/Chat";
import {CashAndBank} from "./pages/CashAndBank/CashAndBank";
import {SalesInvoice} from "./pages/Sales/SaleInvoice/SalesInvoice";
import {PaymentIn} from "./pages/Sales/PaymentIn/PaymentIn";
import POSBilling from "./pages/POSBilling/POSBilling";
import {Print} from "./pages/Print/Print";
import {MainDashboard} from "./pages/Dashboard/MainDashboard";
import {MainPartyDetails} from "./pages/Party/MainPartyDetails";
import {Logout} from "./pages/Logout";
import SettingsSideBar from "./pages/Sidebar/SettingsSideBar";
import {MainReport} from "./pages/Report/MainReport";
import Feedback from "./pages/Feedback/Feedback";
import HelpSupport from "./pages/HelpSupport/HelpSupport";
import {Pricing} from "./pages/Pricing/Pricing";
import Attendance from "./pages/Attendance/Attendance";
import {ReportDetail} from "./pages/Report/ReportDetail";
import {Quotation} from "./pages/Sales/QuotationEstimate/Quotation";
import {SalesReturn} from "./pages/Sales/SalesReturn/SalesReturn";
import {CreditNote} from "./pages/Sales/CreditNote/CreditNote";
import {ProformaInvoice} from "./pages/Sales/ProformaInvoice/ProformaInvoice";
import {DeliveryChallan} from "./pages/Sales/DeliveryChallan/DeliveryChallan";
import {PurchaseInvoices} from "./pages/Purchases/PurchaseInvoices/PurchaseInvoices";
import {PurchaseOrders} from "./pages/Purchases/PurchaseOrders/PurchaseOrders";
import {PurchaseReturn} from "./pages/Purchases/PurchaseReturn/PurchaseReturn";
import {PaymentOut} from "./pages/Purchases/PaymentOut/PaymentOut";
import {DebitNote} from "./pages/Purchases/DebitNote/DebitNote";
import AllTransactions from "./pages/Dashboard/AllTransactions";

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
            <Route path="/transactions" element={<AllTransactions/>}/>
            <Route path="/party" element={<Party/>}/>s
            <Route path="/posbilling" element={<POSBilling/>}/>
            <Route path="/stock/shop" element={<InventoryShop/>}/>
            <Route path="/stock/godowon" element={<InventoryGodown/>}/>
            <Route path="/bank" element={<CashAndBank/>}/>
            <Route path="/report" element={<MainReport/>}/>
            <Route path="/reports/:report" element={<ReportDetail/>}/>

            <Route path="/chat" element={<Chat/>}/>
            <Route path="/help" element={<MainPartyDetails/>}/>
            {/*Sale*/}
            <Route path="/sales/invoice" element={<SalesInvoice/>}/>
            <Route path="/sales/payment-in" element={<PaymentIn/>}/>
            <Route path="/sales/estimate" element={<Quotation/>}/>
            <Route path="/sales/return" element={<SalesReturn/>}/>
            <Route path="/sales/credit-note" element={<CreditNote/>}/>
            <Route path="/sales/delivery" element={<DeliveryChallan/>}/>
            <Route path="/sales/proforma" element={<ProformaInvoice/>}/>
            {/* Purchase*/}
            <Route path="/purchases/invoice" element={<PurchaseInvoices/>}/>
            <Route path="/purchases/order" element={<PurchaseOrders/>}/>
            <Route path="/purchases/return" element={<PurchaseReturn/>}/>
            <Route path="/purchases/payment-out" element={<PaymentOut/>}/>
            <Route path="/purchases/debit-note" element={<DebitNote/>}/>

            <Route path="/expenses" element={<Expense/>}/>
            <Route path="/feedback" element={<Feedback/>}/>
            <Route path="/attendance" element={<Attendance/>}/>


            <Route path="/settings/manage/users" element={<AccountManagementUsers/>}/>
            <Route path="/settings/account" element={<MyUserDetails/>}/>
            <Route path="/settings/manage/business" element={<MyBusinessAccount/>}/>
            <Route path="/settings/thermal/print" element={<Print/>}/>
            <Route path="/settings/pricing" element={<Pricing/>}/>
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


