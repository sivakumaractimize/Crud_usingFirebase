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
} from '../Actions/Actiontypes';

const initialState = {
    employeData: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    console.log("reducer action:", action);
    switch (action.type) {
        

        case CREATE_EMPLOYE_START:
        case LOAD_EMPLOYE_START:
        case UPDATE_EMPLOYE_START:
        case DELETE_EMPLOYE_START:
            return {
                ...state,
                loading: true,
                error: null
            };

        case CREATE_EMPLOYE_SUCCESS:
            return {
                ...state,
                loading: false,
                employeData: [...state.employeData, action.payload]
            };

        case LOAD_EMPLOYE_SUCCESS:
            return {
                ...state,
                loading: false,
                employeData: action.payload
            };

        case UPDATE_EMPLOYE_SUCCESS:
            return {
                ...state,
                loading: false,
                employeData: state.employeData.map(employee =>
                    employee.id === action.payload.id ? action.payload : employee
                )
            };

        case DELETE_EMPLOYE_SUCCESS:
            return {
                ...state,
                loading: false,
                employeData: state.employeData.filter(employee => employee.id !== action.payload)
            };

        case CREATE_EMPLOYE_ERROR:
        case LOAD_EMPLOYE_ERROR:
        case UPDATE_EMPLOYE_ERROR:
        case DELETE_EMPLOYE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default reducer;
