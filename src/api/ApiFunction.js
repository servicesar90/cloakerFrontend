import axios from "axios";


//without header
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


//with header
export const apiFunction = async(type,api, params, data)=>{
    const headers= {Authorization: `Bearer ${localStorage.getItem("token")}`};
    let response
    switch (type){
        case "get":{
            response = await axios.get(`${api}${params ? `/${params}`: ""}`,{ headers });
            break;
        }
        case "post": {
             response = await axios.post(`${api}${params ? `/${params}`: ""}`, data, {headers});
             break;
        }
    }
    return response;
}