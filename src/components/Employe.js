import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setData } from '../redux/actions/Action';
import { getEmploye, postEmploye , deleteEmploye, updateEmploye} from '../Api';

const Employe = ({ employeData, setData }) => {
    useEffect(() => {
        getEmpData();
    }, []);

    const [name, setName] = useState('');
    const [desg, setDesg] = useState('');
    const [loc, setLoc] = useState('');
    const [id, setId] = useState('');
    const [isEditMode, setIsEditMode] = useState(false); // Track edit mode

    const getEmpData = async () => {
        try {
            const employedata = await getEmploye();
            setData(employedata);
        } catch (error) {
            console.error("Error fetching Employe data:", error);
        }
    };

    const handleAddEmployee = async () => {
        if (name === "" || desg === "" || loc === "") {
            alert("Please enter details");
        } else {
            try {
                const newEmployee = {
                    Name: name,
                    Desg: desg,
                    Loc: loc
                };
                await postEmploye(newEmployee);
                getEmpData();
                // Clear input fields after adding employee
                setName('');
                setDesg('');
                setLoc('');
            } catch (error) {
                console.error("Error adding employee:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        alert("Are you sure want to delete...?")
        try {
            await deleteEmploye(id);
            console.log("delete ok");
            getEmpData();
        } catch(error) {
            console.log("Employee not Deleted");
        }
    };

    const handleEdit = (id) => {
        const selectEmployee = employeData.find((employee) => employee.id === id);
        setId(selectEmployee.id);
        setName(selectEmployee.Name);
        setDesg(selectEmployee.Desg);
        setLoc(selectEmployee.Loc);
        setIsEditMode(true); // Set edit mode
    };

    const handleUpdate = async () => {
        if (name === "" || desg === "" || loc === "") {
            alert("Please enter details");
        } else {
            try {
                const updatedEmployee = {
                    Name: name,
                    Desg: desg,
                    Loc: loc
                };
                 await updateEmploye(id, updatedEmployee);
                getEmpData();
                // Clear input fields after updating employee
                setName('');
                setDesg('');
                setLoc('');
                setIsEditMode(false); // Exit edit mode
            } catch (error) {
                console.error("Error updating employee:", error);
            }
        }
    };

    return (
        <>
            <h1>EMPLOYEE CRUD</h1>
            <div className="container d-flex flex-column align-items-center">
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="text"
                        value={desg}
                        placeholder="Enter Designation"
                        onChange={(e) => setDesg(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="text"
                        value={loc}
                        placeholder="Enter Location"
                        onChange={(e) => setLoc(e.target.value)}
                    />
                </div>
                {!isEditMode && (
                    <button className='btn btn-success' onClick={handleAddEmployee}>Add Employee</button>
                )}
                {isEditMode && (
                    <button className='btn btn-info' onClick={handleUpdate}>Update Details</button>
                )}
            </div>
            <div className='container col-12 col-sm-6'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Emp Designation</th>
                            <th scope="col">Emp Location</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employeData.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.Name}</td>
                                <td>{employee.Desg}</td>
                                <td>{employee.Loc}</td>
                                <td><button className='btn btn-warning' onClick={() => handleEdit(employee.id)}>Edit</button></td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(employee.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    console.log( 'this is map state ---->', state.employeData)
    return {
        employeData: state.employeData,
    };
};

const mapDispatchToProps = {
    setData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Employe);
