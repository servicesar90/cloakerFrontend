import axios from "axios";



export const createApiFunction = async(type,api, params, data)=>{
    let response
    switch (type){
        case "get":{
            response = await axios.get(`${api}${params ? `/${params}`: ""}`);
            break;
        }
        case "post": {
             response = await axios.post(`${api}${params ? `/${params}`: ""}`, data);
             
             break;
        }
    }
    return response;
}

export const apiFunction = async(type,api, params, data)=>{
    const header= {Authorization: `Bearer ${localStorage.getItem("token")}`};
    let response
    switch (type){
        case "get":{
            response = await axios.get(`${api}${params ? `/${params}`: ""}`, {header});
            break;
        }
        case "post": {
             response = await axios.post(`${api}${params ? `/${params}`: ""}`, data, {header});
             break;
        }
    }
    return response;
}