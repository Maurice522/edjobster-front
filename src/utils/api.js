// const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/';
const baseUrl = 'http://localhost:8000/';

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
  webform: `${baseUrl}settings/webform/`,
  fields: `${baseUrl}settings/webform-fields/`,
  assementCategory: `${baseUrl}jobs/assesment-category/`,
  assesment:`${baseUrl}jobs/assesment/`,
  assesmentQuestions: `${baseUrl}jobs/assesment-question/`,
  jobs: `${baseUrl}jobs/`,  
  candidate:`${baseUrl}candidate/`,
  interview:`${baseUrl}interview/schedule/`,
  location:`${baseUrl}settings/location/`,  
  notes: `${baseUrl}candidate/notes/`,
  notesType:`${baseUrl}common/note-types/`,
  signUp: `${baseUrl}account/sign-up/`
};

export { baseUrl, apiUrl };