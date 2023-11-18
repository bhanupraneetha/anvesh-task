import React, { useState } from 'react';


const AddViewModal = ({ employee, closeModal }) => {
    return (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
         
          <h1 className="text">View Employee</h1>
          <div className="viewlist">
          <p>ID: {employee.id}</p>
          <p>Name: {employee.firstName} {employee.lastName}</p>
          <p>Email: {employee.email}</p>
          </div>
          </div>
      </div>
    );
  };
  
  const EditModal = ({ employee, closeModal, handleChange, handleUpdateEmployee }) => {
    return (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h1 className="text">Edit Employee</h1>
          <div className="editlist">
          <input
          className="editlists"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={employee.firstName}
            onChange={handleChange}
          /><br/>
          <input
          className="editlists"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={employee.lastName}
            onChange={handleChange}
          /><br/>
          <input
          className="editlists"
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
          /><br/>
          <button onClick={handleUpdateEmployee}>Update</button>
        </div>
        </div>
      </div>
    );
  };
  
  const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [viewEmployee, setViewEmployee] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
      firstName: '',
      lastName: '',
      email: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
    });
  
    const handleDelete = (id) => {
      const updatedEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(updatedEmployees);
    };
  
    const handleView = (employee) => {
      setViewEmployee(employee);
    };
  
    const handleAddModal = () => {
      setNewEmployee({ firstName: '', lastName: '', email: '' });
      setShowAddModal(true);
      setShowEditModal(false); 
    };
  
    const handleEdit = (employee) => {
      setEditMode(true);
      setEditedEmployee(employee);
      setShowAddModal(false);
      setShowEditModal(true); 
    };
  
    const handleUpdateEmployee = () => {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editedEmployee.id ? editedEmployee : employee
      );
      setEmployees(updatedEmployees);
      setEditMode(false);
      setEditedEmployee({ id: null, firstName: '', lastName: '', email: '' });
      setShowEditModal(false);
    };
  
    const handleCloseModal = () => {
      setViewEmployee(null);
      setEditMode(false);
      setShowAddModal(false);
      setShowEditModal(false); 
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (editMode) {
        setEditedEmployee({
          ...editedEmployee,
          [name]: value,
        });
      } else {
        setNewEmployee({
          ...newEmployee,
          [name]: value,
        });
      }
    };
  
    const handleSaveEmployee = () => {
      const newId = employees.length + 1;
      const addedEmployee = { id: newId, ...newEmployee };
      setEmployees([...employees, addedEmployee]);
      setShowAddModal(false);
    };
    

  return (
    <div>
      <h1 className="heading">Employee Management App</h1>
      <h2 className="headings">Employees List</h2>
      <button className="addbutton" onClick={handleAddModal}>{ 'Add Employee'}</button>

      {/* Add employee modal */}
      {showAddModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h1 className="text">Add Employee</h1>
            <div className="addlist">
              
            <input
            className="editlists"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newEmployee.firstName}
              onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
            /><br/>
             
            <input
            className="editlists"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newEmployee.lastName}
              onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
            /><br/>
             
            <input
            className="editlists"
              type="email"
              name="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            /><br/>
            <button  onClick={handleSaveEmployee}>Save</button>
          </div>
          </div>
        </div>
      )}

<table>
        <thead>
          <tr>
            <th >Employee First Name</th>
            <th >Employee Last Name</th>
            <th>Employee Email ID</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td >{employee.firstName}</td>
              <td >{employee.lastName}</td>
              <td >{employee.email}</td>
              <td >
                <div className="buttonspad">
                <button  className="buttonspad view" onClick={() => handleView(employee)}>View</button>
                <button className="buttonspad edit" onClick={() => handleEdit(employee)}>Update</button>
                <button  className="buttonspad delete"onClick={() => handleDelete(employee.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewEmployee && <AddViewModal employee={viewEmployee} closeModal={handleCloseModal} />}

      {/* Edit modal */}
      {showEditModal && (
        <EditModal
          employee={editedEmployee}
          closeModal={() => setShowEditModal(false)}
          handleChange={handleChange}
          handleUpdateEmployee={handleUpdateEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
