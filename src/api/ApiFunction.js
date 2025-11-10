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
            console.log("pst case");
            
             response = await axios.post(`${api}${params ? `/${params}`: ""}`, data, {headers});
             break;
        }
         case "patch": {
             response = await axios.patch(`${api}${params ? `/${params}`: ""}`, data, {headers});
             break;
        }
         case "delete": {
            console.log("dlt case",headers);
            try {
                response = await axios.delete(`${api}${params ? `/${params}`: ""}`, {
    data,
    headers
  });
                
            } catch (error) {
                console.log("hfds",error);
                
            }
             console.log("hgfjdshjfd",response);
             
             break;
        }
    }
    return response;
}