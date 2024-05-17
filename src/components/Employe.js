import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setData } from '../redux/actions/Action';
import { getEmploye, postEmploye, deleteEmploye, updateEmploye } from '../Api';
import { Icon } from '@iconify-icon/react';

const Employe = ({ employeData, setData }) => {
    useEffect(() => {
        getEmpData();
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [desg, setDesg] = useState('');
    const [loc, setLoc] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const [id, setId] = useState('');
    const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
    const [selectedImage, setSelectedImage] = useState(''); // Selected image URL
    const [displayEmployee, setDisplayEmployee] = useState({
        Fname: "",
        Lname:"",
        Desg: "",
        lOC: ""
    });
    

    const getEmpData = async () => {
        try {
            const employedata = await getEmploye();
            setData(employedata);
        } catch (error) {
            console.error("Error fetching Employe data:", error);
        }
    };

    const handleAddEmployee = async () => {
        if (firstName === "" || lastName === "" || desg === "" || loc === "" || gender === "" || !image) {
            alert("Please enter all details");
        } else {
            try {
                const base64Image = await convertImageToBase64(image);// calling the base64 fuction to get url assign to new varible
                const newEmployee = {
                    FirstName: firstName,
                    LastName: lastName,
                    Desg: desg,
                    Loc: loc,
                    Gender: gender,
                    Image: base64Image
                };
                await postEmploye(newEmployee);
                getEmpData();
                // Clear input fields after adding employee
                setFirstName('');
                setLastName('');
                setDesg('');
                setLoc('');
                setGender('');
                setImage(null);
            } catch (error) {
                console.error("Error adding employee:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete...?")) {
            try {
                await deleteEmploye(id);
                console.log("delete ok");
                getEmpData();
            } catch (error) {
                console.log("Employee not Deleted");
            }
        }
    };

    const handleEdit = (id) => {
        const selectEmployee = employeData.find((employee) => employee.id === id);
        setId(selectEmployee.id);
        setFirstName(selectEmployee.FirstName);
        setLastName(selectEmployee.LastName);
        setDesg(selectEmployee.Desg);
        setLoc(selectEmployee.Loc);
        setGender(selectEmployee.Gender);
        setImage(null); // Reset image field
        setIsEditMode(true); // Set edit mode
    };

    const handleUpdate = async () => {
        if (firstName === "" || lastName === "" || desg === "" || loc === "" || gender === "" || !image) {
            alert("Please enter all details");
        } else {
            try {
                const base64Image = await convertImageToBase64(image); // calling the base64 fuction to get url assign to new varible
                const updatedEmployee = {
                    FirstName: firstName,
                    LastName: lastName,
                    Desg: desg,
                    Loc: loc,
                    Gender: gender,
                    Image: base64Image
                };
                await updateEmploye(id, updatedEmployee);
                getEmpData();
                // Clear input fields after updating employee
                setFirstName('');
                setLastName('');
                setDesg('');
                setLoc('');
                setGender('');
                setImage(null);
                setIsEditMode(false); // Exit edit mode
            } catch (error) {
                console.error("Error updating employee:", error);
            }
        }
    };
  // convert to image to base64 url
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
        setImage(e.target.files[0]); // Update image state
    };

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const displyDetails = (name,lname, desg, loc) => {
        setDisplayEmployee({
            Fname: name,
            Lname:lname,
            Desg: desg,
            Loc: loc
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
                        value={firstName}
                        placeholder="Enter first name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                {/* Other input fields */}
                   

                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="text"
                        value={lastName}
                        placeholder="Enter last name"
                        onChange={(e) => setLastName(e.target.value)}
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
                <div className="form-group col-12 col-sm-4 text-start">
                <label > Select Gender</label>
                    <div>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
                <div className="form-group col-12 col-sm-4">
                    <input
                        className="form-control mb-3"
                        type="file"
                        onChange={handledImageUrl}
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
                                <button className="btn" onClick={() => { openModal(employee.Image); displyDetails(employee.FirstName,employee.LastName,employee.Desg,employee.Loc) }}>

                                    <Icon icon="mdi:eye" />
                                    </button>
                                </td>
                                <td><button className='btn' onClick={() => handleEdit(employee.id)}><Icon icon="lucide:edit" /></button></td>
                                <td><button className='btn' onClick={() => handleDelete(employee.id)}><Icon className='text-danger' icon="material-symbols:delete" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Image Modal */}
            {modalVisible && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header  text-center">
                                <h5 className="modal-title">Employee  Detalis</h5>
                                {/* <button type="button" className="close position-absolute top-1 end-0 me-3 text-danger" onClick={closeModal}> */}
                                <Icon className='close position-absolute top-1 end-0 me-3 text-danger fa-1' icon="iconamoon:close-bold"  onClick={closeModal}/>
                                {/* </button> */}
                            </div>
                            <div className="modal-body">
                                <img  src={selectedImage} alt="Employee" id='empimg' className="img-fluid " />
                            </div>
                            <h3 > Name :{displayEmployee.Fname} {displayEmployee.Lname}</h3>
                            <h3 >Designation :{displayEmployee.Desg}</h3>
                            <h3 >Location: { displayEmployee.Loc}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = state => {
    return {
        employeData: state.employeData,
    };
};

const mapDispatchToProps = {
    setData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Employe);
