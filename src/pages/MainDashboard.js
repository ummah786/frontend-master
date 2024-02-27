import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Messages from "./Messages";
import Analytics from "./Analytics";
import FileManager from "./FileManager";
import Order from "./Order";
import Saved from "./Saved";
import Setting from "./Setting";
import SideBar from "./Sidebar/SideBar";

export function MainDashboard() {
    return (
        <>
            <SideBar>
                <Routes>
                    <Route path="app/dashboard" element={<Dashboard/>}/>
                    <Route path="app/parties" element={<Users/>}/>
                    <Route path="app/messages" element={<Messages/>}/>
                    <Route path="app/analytics" element={<Analytics/>}/>
                    <Route path="app/file-manager" element={<FileManager/>}/>
                    <Route path="app/order" element={<Order/>}/>
                    <Route path="app/saved" element={<Saved/>}/>
                    <Route path="app/settings" element={<Setting/>}/>

                    <Route path="*" element={<> not found</>}/>
                </Routes>
            </SideBar>
        </>
    )
}
