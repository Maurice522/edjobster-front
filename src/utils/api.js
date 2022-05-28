const baseUrl = 'http://34.125.49.10:8080/';

const apiUrl = {
  signIn: `${baseUrl}account/sign-in/`,
  department: `${baseUrl}settings/department/`,
  degree: `${baseUrl}settings/degree/`,
  designation: `${baseUrl}settings/designation/`,
  companyInfo: `${baseUrl}account/company-info/`,
  companyLogo: `${baseUrl}account/company-logo/`,
  country: `${baseUrl}common/countires/`,
  state: `${baseUrl}common/states/?id=`,
  city: `${baseUrl}common/cities/?id=`,
  address: `${baseUrl}settings/location/`,
  user: `${baseUrl}account/members/`
};

export { baseUrl, apiUrl };
