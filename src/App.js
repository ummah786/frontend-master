import {useEffect, useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {AppContent} from "./AppContent";

function App() {
    const [flag, setFlag] = useState(true);
    const handleBooleanChange = () => {
        setFlag(prevState => !prevState);
    };

    useEffect(() => {
        console.log("Flag", flag);
    }, [flag]);

    return (
        <Router>
            <AppContent flag={flag} handleBooleanChange={handleBooleanChange} setFlag={setFlag} />
        </Router>
    );
}

export default App;