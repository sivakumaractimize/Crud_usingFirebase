import {

    CREATE_EMPLOYE_START,
    CREATE_EMPLOYE_SUCCESS,
    CREATE_EMPLOYE_ERROR,
    LOAD_EMPLOYE_START,
    LOAD_EMPLOYE_SUCCESS,
    LOAD_EMPLOYE_ERROR,
    UPDATE_EMPLOYE_START,
    UPDATE_EMPLOYE_SUCCESS,
    UPDATE_EMPLOYE_ERROR,
    DELETE_EMPLOYE_START,
    DELETE_EMPLOYE_SUCCESS,
    DELETE_EMPLOYE_ERROR
} from './Actiontypes';



export const createEmployeeStart = () => ({
    type: CREATE_EMPLOYE_START,
});

export const createEmployeeSuccess = (employee) => ({
    type: CREATE_EMPLOYE_SUCCESS,
    payload: employee,
});

export const createEmployeeError = (error) => ({
    type: CREATE_EMPLOYE_ERROR,
    payload: error,
});

export const loadEmployeeStart = () => ({
    type: LOAD_EMPLOYE_START,
});

export const loadEmployeeSuccess = (employees) => ({
    type: LOAD_EMPLOYE_SUCCESS,
    payload: employees,
});

export const loadEmployeeError = (error) => ({
    type: LOAD_EMPLOYE_ERROR,
    payload: error,
});


export const updateEmployeeStart = () => ({
    type: UPDATE_EMPLOYE_START,
});

export const updateEmployeeSuccess = (employee) => ({
    type: UPDATE_EMPLOYE_SUCCESS,
    payload: employee,
});

export const updateEmployeeError = (error) => ({
    type: UPDATE_EMPLOYE_ERROR,
    payload: error,
});


export const deleteEmployeeStart = () => ({
    type: DELETE_EMPLOYE_START,
});

export const deleteEmployeeSuccess = (employeeId) => ({
    type: DELETE_EMPLOYE_SUCCESS,
    payload: employeeId,
});

export const deleteEmployeeError = (error) => ({
    type: DELETE_EMPLOYE_ERROR,
    payload: error,
});
