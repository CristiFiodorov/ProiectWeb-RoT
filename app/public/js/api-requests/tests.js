import { baseURL } from "./const.js";

export const getAllTests = async () => {
    try {
        const request = await fetch(baseURL + '/tests');
        const response = await request.json();
        if(response?.success === false){
            console.log("ERROR");
            //TODO handle error
            return [];
        }
        console.log(response);
        return response?.data;
    } catch(error){
        console.log(error);
    }
}


