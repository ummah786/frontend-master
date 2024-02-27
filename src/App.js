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
import {Rap} from "./pages/Rap";
import {PosBilling} from "./pages/PosBilling";
import {MainPage} from "./pages/MainPage";
import {useState} from "react";

function App() {
    const [flag, setFlag] = useState(true);
    const handleBooleanChange = () => {
        setFlag(prevState => !prevState);
    };
    return (<>
            <Router>
                {flag && (
                    <div>

                            <Routes>
                                <Route path="/" element={<Rap onBooleanChange={handleBooleanChange}/>}/>
                                <Route path="/posbilling" element={<MainPage/>}/>
                            </Routes>
                    </div>
                )}
                {!flag && (<div>
                        <SideBar>
                            <Routes>
                                <Route path="/" element={<Dashboard onBooleanChange={handleBooleanChange}/>}/>
                                <Route path="/users" element={<Users/>}/>
                                <Route path="/messages" element={<Messages/>}/>
                                <Route path="/analytics" element={<Analytics/>}/>
                                <Route path="/file-manager" element={<FileManager/>}/>
                                <Route path="/order" element={<Order/>}/>
                                <Route path="/saved" element={<Saved/>}/>
                                <Route path="/settings" element={<Setting/>}/>
                                <Route path="/posbilling" element={<PosBilling/>}/>
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
