import axios from "axios";

const baseURL = 'https://react-crud-dbffc-default-rtdb.firebaseio.com';

export const getEmploye = async () => {
    try {
        const response = await axios.get(`${baseURL}/employe.json`);
        const jsonData = response.data;
        console.log(jsonData)
        if (jsonData === null) {
            return [];
        } else {
            return Object.keys(jsonData).map((key) => ({ id: key, ...jsonData[key] }));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export const postEmploye = async (employee) => {
    try {
        await axios.post(`${baseURL}/employe.json`, employee);
    } catch (error) {
        console.error('Error posting employee:', error);
    }
};


export const deleteEmploye = async (id) => {
    try{
        await axios.delete(`${baseURL}/employe/${id}.json`)
    }catch (error) {
        console.log('error occured')
      }
 }

 export const updateEmploye= async(id,employee)=>{


    try{
        await axios.put(`${baseURL}/employe/${id}.json`,employee)


    }
    catch(error)
    {
        console.log(error)
    }
 }