// const base_url = 'http://localhost:2000';
// // const base_url="http://192.168.1.12:2000"
// const base_url="http://192.168.1.3:2000";

const base_url = "https://app.clockerly.io"

const base_url= "https://app.clockerly.io"


export const signupApi = `${base_url}/auth/signup`;

export const logInApi = `${base_url}/auth/login`;

export const getProfileApi = `${base_url}/profile/getProfile`;

export const createCampaignApi = `${base_url}/api/v2/campaign`;

export const getAllCampaign = `${base_url}/api/v2/campaign/all`;
export const getAllCampNames = `${base_url}/api/v2/campaign/campnames`
export const clicksbycampaign = `${base_url}/api/v2/campaign/clicksbycamp`
export const signOutApi = `${base_url}/auth/signout`;