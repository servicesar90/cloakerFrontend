// const base_url = 'http://localhost:2000';
const base_url="http://192.168.1.12:2000"


export const signupApi = `${base_url}/auth/signup`;

export const logInApi = `${base_url}/auth/login`;

export const getProfileApi = `${base_url}/profile/getProfile`;

export const createCampaignApi = `${base_url}/api/v2/campaign`;

export const getAllCampaign = `${base_url}/api/v2/campaign/all`;