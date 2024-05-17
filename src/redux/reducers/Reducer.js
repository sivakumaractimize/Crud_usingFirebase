import { SET_DATA } from "../actions/Actiontypes";

const initialState = {
    employeData: [],
};

const Reducer = (state = initialState, action) => {
    console.log("reducer ok")
    switch (action.type) {
        
        case SET_DATA:
            return {
                ...state,
                employeData: action.payload,
            };
        default:
            return state;
    }
};

export default Reducer;