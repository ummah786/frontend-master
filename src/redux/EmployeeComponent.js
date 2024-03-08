import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEmployee, removeEmployee, updateEmployee } from './Action.js';

const EmployeeComponent = () => {
    const employees = useSelector(state => state.employees);
    const dispatch = useDispatch();

    const [newEmployee, setNewEmployee] = useState({ id: '', name: '', department: '' });

    const handleAddEmployee = () => {
        dispatch(addEmployee(newEmployee));
        setNewEmployee({ id: '', name: '', department: '' }); // Clear input fields
    };

    const handleRemoveEmployee = (employeeId) => {
        dispatch(removeEmployee(employeeId));
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        dispatch(updateEmployee(updatedEmployee));
    };

    return (
        <div>
            <h2>Employee Management</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name} - {employee.department}
                        <button onClick={() => handleRemoveEmployee(employee.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Add Employee</h3>
            <input
                type="text"
                placeholder="Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
            />
            <input
                type="text"
                placeholder="Department"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
            />
            <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
    );
};

export default EmployeeComponent;
