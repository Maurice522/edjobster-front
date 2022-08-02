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
  user: `${baseUrl}account/members/`,
  activate_deactivate_user: `${baseUrl}account/activate-member/`,
  stage: `${baseUrl}settings/pipeline-stage/`,
  status: `${baseUrl}settings/pipeline-details/`,
  pipeline: `${baseUrl}settings/pipeline/`,
  emailCategory: `${baseUrl}settings/email-category/`,
  emailtamplate: `${baseUrl}settings/email-template/`,
  emailVariables: `${baseUrl}settings/email-field/`,
};

export { baseUrl, apiUrl };
