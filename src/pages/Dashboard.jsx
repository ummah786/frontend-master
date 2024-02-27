import React from 'react'

function Dashboard({onBooleanChange}) {
    const handleClick = () => {
        // Trigger the function passed from the parent with the new boolean value
        onBooleanChange();
    };
    return (
        <>
            <div>Dashboard</div>
            <div>
                <button onClick={handleClick}>Set Boolean Value</button>
            </div>
        </>

    )
}

export default Dashboard
