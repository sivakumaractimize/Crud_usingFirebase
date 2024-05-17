import { SET_DATA } from "./Actiontypes";


export const setData = (data) => {
 
    console.log('this is action --->', data)
    return {
        type: SET_DATA,
        payload: data,
    };
};


