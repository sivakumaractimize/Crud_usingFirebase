import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    
    createEmployeeStart,
    createEmployeeSuccess,
    createEmployeeError,
    loadEmployeeStart,
    loadEmployeeSuccess,
    loadEmployeeError,
    updateEmployeeStart,
    updateEmployeeSuccess,
    updateEmployeeError,
    deleteEmployeeStart,
    deleteEmployeeSuccess,
    deleteEmployeeError,
} from '../redux/Actions/Action';
import { getEmploye, postEmploye, deleteEmploye, updateEmploye } from '../Api';
import { Icon } from '@iconify-icon/react';

const Employe = ({ employeData, loading, error, dispatch }) => {
    useEffect(() => {
        getEmpData();
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        desg: '',
        loc: '',
        gender: '',
        image: null,
    });

    const [id, setId] = useState('');
    const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
    const [selectedImage, setSelectedImage] = useState(''); // Selected image URL
    const [displayEmployee, setDisplayEmployee] = useState({
        Fname: "",
        Lname: "",
        Desg: "",
        lOC: "",
    });
    const inputRef = useRef(null);

    const getEmpData = async () => {
        dispatch(loadEmployeeStart());
        try {
            const employedata = await getEmploye();
            dispatch(loadEmployeeSuccess(employedata));
        } catch (error) {
            dispatch(loadEmployeeError(error));
            console.error("Error fetching Employe data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddEmployee = async () => {
        const { firstName, lastName, desg, loc, gender, image } = formData;
        if (!firstName || !lastName || !desg || !loc || !gender || !image) {
            alert("Please enter all details");
            return;
        }

        dispatch(createEmployeeStart());
        try {
            const base64Image = await convertImageToBase64(image);
            const newEmployee = {
                FirstName: firstName,
                LastName: lastName,
                Desg: desg,
                Loc: loc,
                Gender: gender,
                Image: base64Image,
            };
            const createdEmployee = await postEmploye(newEmployee);
            dispatch(createEmployeeSuccess(createdEmployee));
            getEmpData();
            setFormData({
                firstName: '',
                lastName: '',
                desg: '',
                loc: '',
                gender: '',
                image: null,
            });
            inputRef.current.value = "";
        } catch (error) {
            dispatch(createEmployeeError(error));
            console.error("Error adding employee:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete...?")) {
            dispatch(deleteEmployeeStart());
            try {
                await deleteEmploye(id);
                dispatch(deleteEmployeeSuccess(id));
                getEmpData();
            } catch (error) {
                dispatch(deleteEmployeeError(error));
                console.error("Employee not Deleted:", error);
            }
        }
    };

    const handleEdit = (id) => {
        const selectEmployee = employeData.find((employee) => employee.id === id);
        setId(selectEmployee.id);
        setFormData({
            firstName: selectEmployee.FirstName,
            lastName: selectEmployee.LastName,
            desg: selectEmployee.Desg,
            loc: selectEmployee.Loc,
            gender: selectEmployee.Gender,
            image: null,
        });
        setIsEditMode(true); // Set edit mode
    };

    const handleUpdate = async () => {
        const { firstName, lastName, desg, loc, gender, image } = formData;
        if (!firstName || !lastName || !desg || !loc || !gender || !image) {
            alert("Please enter all details");
            return;
        }

        dispatch(updateEmployeeStart());
        try {
            const base64Image = await convertImageToBase64(image);
            const updatedEmployee = {
                FirstName: firstName,
                LastName: lastName,
                Desg: desg,
                Loc: loc,
                Gender: gender,
                Image: base64Image,
            };
            await updateEmploye(id, updatedEmployee);
            dispatch(updateEmployeeSuccess(updatedEmployee));
            getEmpData();
            setFormData({
                firstName: '',
                lastName: '',
                desg: '',
                loc: '',
                gender: '',
                image: null,
            });
            setIsEditMode(false); // Exit edit mode
            inputRef.current.value = "";
        } catch (error) {
            dispatch(updateEmployeeError(error));
            console.error("Error updating employee:", error);
        }
    };

    const convertImageToBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
        });
    };

    const handledImageUrl = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const displyDetails = (name, lname, desg, loc) => {
        setDisplayEmployee({
            Fname: name,
            Lname: lname,
            Desg: desg,
            Loc: loc,
        });
    };

    return (
        <>
            <h1>EMPLOYEE CRUD</h1>
            <div className="container d-flex flex-column align-items-center">
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="Enter first name"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Enter last name"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="text"
                        name="desg"
                        value={formData.desg}
                        placeholder="Enter Designation"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="text"
                        name="loc"
                        value={formData.loc}
                        placeholder="Enter Location"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-12 col-sm-4 text-start">
                    <label>Select Gender</label>
                    <div>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        ref={inputRef}
                        type="file"
                        onChange={handledImageUrl}
                    />
                </div>
                {!isEditMode && (
                    <button className="btn btn-success" onClick={handleAddEmployee}>
                        Add Employee
                    </button>
                )}
                {isEditMode && (
                    <button className="btn btn-info" onClick={handleUpdate}>
                        Update Details
                    </button>
                )}
            </div>
            <div className="container col-12 col-sm-6">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Location</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Details</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeData.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.FirstName}</td>
                                    <td>{employee.LastName}</td>
                                    <td>{employee.Desg}</td>
                                    <td>{employee.Loc}</td>
                                    <td>{employee.Gender}</td>
                                    <td>
                                        <button className="btn" onClick={() => { openModal(employee.Image); displyDetails(employee.FirstName, employee.LastName, employee.Desg, employee.Loc) }}>
                                            <Icon icon="mdi:eye" />
                                        </button>
                                    </td>
                                    <td><button className="btn" onClick={() => handleEdit(employee.id)}><Icon className="text-success" icon="lucide:edit" /></button></td>
                                    <td><button className="btn" onClick={() => handleDelete(employee.id)}><Icon className="text-danger" icon="material-symbols:delete" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {modalVisible && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h5 className="modal-title">Employee Details</h5>
                                <Icon className="close position-absolute top-1 end-0 me-3 text-danger" icon="iconamoon:close-bold" onClick={closeModal} />
                            </div>
                            <div className="modal-body">
                                <img src={selectedImage} alt="Employee" id="empimg" className="img-fluid" />
                            </div>
                            <h3>Name: {displayEmployee.Fname} {displayEmployee.Lname}</h3>
                            <h3>Designation: {displayEmployee.Desg}</h3>
                            <h3>Location: {displayEmployee.Loc}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = state => ({
    employeData: state.employeData,
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps)(Employe);
