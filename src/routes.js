import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import ClientPage from './pages/Client';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import CareerSite from './pages/settings/career-site/CareerSite';
import Departments from './pages/settings/institute/Departments';
import Designations from './pages/settings/institute/Designations';
import Addresses from './pages/settings/institute/Addresses';
import Degrees from './pages/settings/institute/Degrees';
import List from './pages/settings/users/List';
import Approvals from './pages/settings/users/Approvals';
import Stages from './pages/settings/hiring-pipeline/Stages';
import Pipelines from './pages/settings/hiring-pipeline/Pipelines';
import NewHiringPipeline from './pages/settings/hiring-pipeline/NewHiringPipeline';
import Categories from './pages/settings/email-templates/Categories';
import Templates from './pages/settings/email-templates/Templates';
import Fields from './pages/settings/candidate-settings/Fields';
import Webforms from './pages/settings/candidate-settings/Webforms';
import AssessmentCategories from './pages/settings/candidate-settings/AssessmentCategories';
import JobBoards from './pages/settings/job-boards/JobBoards';
import Billing from './pages/settings/billing/Billing';
import Jobs from './pages/main/jobs/Jobs';
import CreateJob from './pages/main/jobs/CreateJob';
import Candidates from './pages/main/candidates/Candidates';
import CreateCandidate from './pages/main/candidates/CreateCandidate';
import EditCandidate from './pages/main/candidates/EditCandidate';
import Interviews from './pages/main/interviews/Interviews';
import CreateInterview from './pages/main/interviews/CreateInterview';
import EditInterview from './pages/main/interviews/EditInterview';
import Assessments from './pages/main/assessments/Assessments';
import CreateAssessment from './pages/main/assessments/CreateAssessment';
import EditAssessment from './pages/main/assessments/EditAssessment';
import JobsList from './pages/main/jobs/jobs-list/JobsList';
import JobApplyStepper from './pages/settings/client/JobApplyStepper';
import CandidateList from './pages/main/candidates/CandidateList';
import JobNotes from './components/Notes/JobNotes';
import InterviewDetails from './pages/main/interviews/InterviewDetails';
import IndCanJob from './pages/individualCandidate/Jobs';
import IndCanCandidates from './pages/individualCandidate/Candidates';
import IndCanScheduleInterview from './pages/individualCandidate/ScheduleInterview';
import IndCanSendMail from './pages/individualCandidate/SendMail';

import SuperDashboard from './pages/superadmin/SuperDashboard';
import SuperDashboardCard from './layouts/superdashboard/SuperDashboardCard';
import AddUser from './components/users/AddUser';
import NewAddUser from './components/users/NewAddUser'
import AddUserCreatePassword from './components/users/AddUserCreatePassword';
import EditUser from './components/users/EditUser';
import Bill from './pages/settings/billing/Bill';
import NewIS from './pages/settings/institute/NewIS';
import CreateEmail from './pages/settings/email-templates/CreateEmail';
import NewUserList from './pages/settings/users/NewUserList'
import DashboardNavbar from './layouts/dashboard/DashboardNavbar';
import DashboardWithoutSidebar from './layouts/dashboard/DashboardwithoutSidebar'
import CreateWebform from './pages/settings/candidate-settings/CreateWebform';
import NewcreateCandidate from './pages/main/CreateCandidate/NewcreateCandidate';
import NewCreateInterview from './pages/main/CreateNewInteview/NewCreateInterview';
import CareerSiteDescription from './pages/SubDomain/CareerSiteDescription';
import InstitueAddress from './pages/settings/institute/InstitueAddress';
import SingleJobView from './pages/SubDomain/SingleJobView';
import JobApplication from './pages/SubDomain/JobApplication';
import ApplyClient from './pages/settings/client/ApplyClient';
import WebformFillup from './pages/settings/client/WebformFillup';
import PerticularCandidate from './pages/main/candidates/PerticularCandidate';
import CompleteAssesment from './pages/SubDomain/Steps/CompleteAssesment';
import PerticularJob from './pages/main/jobs/PerticularJob';





// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: '/dashboard/user/adduser', element: <AddUser /> },
        // { path: '/dashboard/user/NewaddUser', element: <NewAddUser /> },
        { path: '/dashboard/user/adduser/createpassword', element: <AddUserCreatePassword /> },
        { path: '/dashboard/user/edit-user', element: <EditUser /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: '/dashboard/jobs', element: <Jobs /> },
        { path: '/dashboard/jobs/create-job', element: <CreateJob /> },
        { path: '/dashboard/jobs/job-list/add-notes', element: <JobNotes /> },
        { path: '/dashboard/jobs/candidate-list', element: <CandidateList /> },
        { path: '/dashboard/jobs/edit-job/:editJobId', element: <CreateJob /> },

        { path: '/dashboard/candidates', element: <Candidates /> },
        { path: '/dashboard/candidates/create-candidate', element: <NewcreateCandidate /> },
        { path: '/dashboard/candidates/edit-candidate', element: <EditCandidate /> },

        //  Individuals can
        // { path: '/dashboard/candidates/newcreate', element: <IndCanJob /> },
        // { path: '/dashboard/candidates/scheduleinterview', element: <IndCanScheduleInterview /> },
        { path: '/dashboard/candidates/sendmail', element: <IndCanSendMail /> },

        
        // { path: '/dashboard/candidates/candidate-details', element: <CandidateDetails /> },
        { path: '/dashboard/interviews', element: <Interviews /> },
        { path: '/dashboard/interviews/create-interview', element: <CreateInterview /> },
        { path: '/dashboard/interviews/edit-interview', element: <EditInterview /> },
        { path: '/dashboard/interviews/interview-details', element: <InterviewDetails /> },
        { path: '/dashboard/assessments', element: <Assessments /> },
        { path: '/dashboard/assessments/create-assessment', element: <CreateAssessment /> },
        { path: '/dashboard/assessments/edit-assessment', element: <EditAssessment /> },
        { path: '/dashboard/career-site', element: <CareerSite /> },
        { path: 'institute-setting/departments', element: <Departments /> },
        { path: 'institute-setting/designations', element: <Designations /> },
        { path: 'institute-setting/addresses', element: <Addresses /> },
        { path: 'institute-setting/degrees', element: <Degrees /> },
        { path: 'users/list', element: <List /> },
        { path: 'users/approvals', element: <Approvals /> },
        { path: 'hiring-pipeline/stages/:id', element: <Stages /> },
        { path: 'hiring-pipeline/pipelines', element: <NewHiringPipeline /> },
        { path: 'hiring-pipeline/new-pipelines', element: <NewHiringPipeline /> },
        { path: 'email-templates/categories', element: <Categories /> },
        { path: 'email-templates/templates', element: <Templates /> },
        { path: 'candidate-settings/fields', element: <Fields /> },
        { path: '/dashboard/candidate-settings/webforms', element: <Webforms /> },
        { path: '/dashboard/candidate-settings/webforms/new', element: <CreateWebform /> },
        { path: 'candidate-settings/assessment-categories', element: <AssessmentCategories /> },
        { path: '/dashboard/job-boards', element: <JobBoards /> },
        { path: '/dashboard/billing', element: <Billing /> },
        { path: '/dashboard/bills', element: <Billing /> },

        //  {New Institute Settings page(combined)}
        { path: '/dashboard/InstituteSettings/settings', element: <NewIS /> },
        { path: '/dashboard/InstituteSettings/address', element: <InstitueAddress /> },
        { path: '/dashboard/NewHiringPipeline', element: <NewHiringPipeline /> },
        { path: '/dashboard/createEmail', element: <CreateEmail /> },
        { path: '/dashboard/newuserlist', element: <NewUserList /> },
      ],
    },
    {
      path: '/superdashboard',
      element: <SuperDashboard />,
      children: [

        { path: '/superdashboard', element: <SuperDashboardCard /> },
        { path: '/superdashboard/candidates', element: <CandidateList /> },
      ],
    },
    {
      path: '/client',
      element: <Navigate to="jobs-list" />,
      children: [
        { path: 'clientName', element: <ClientPage /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        // { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'jobs-list', element: <JobsList /> },
        { path: 'job-apply', element: <JobApplyStepper /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardWithoutSidebar />,
      children: [

        { path: '/dashboard/candidates/scheduleinterview', element: <IndCanScheduleInterview /> },
        { path: '/dashboard/candidates/newcreate', element: <NewcreateCandidate /> },
        { path: '/dashboard/Newcandidates', element: <NewcreateCandidate /> },
        { path: '/dashboard/NewInterview', element: <NewCreateInterview /> },
        { path: '/dashboard/candidates/candidate', element: <IndCanCandidates /> },
        { path: '/dashboard/Institute-Description', element: <CareerSiteDescription />},
        { path: '/dashboard/Institute-Description/Individual-Job/:id', element: <SingleJobView />},
        { path: '/dashboard/Institute-Description/Individual-Job/Application/:webform', element: <JobApplication />},
        { path: '/dashboard/Apply', element: <ApplyClient />},
        { path: '/dashboard/wf', element: <WebformFillup />},
        { path: '/dashboard/candidate/perticularCandidate/:id', element: <PerticularCandidate />},
        { path: '/dashboard/candidate/jobDetails/:id', element: <PerticularJob />},
        { path: '/dashboard/assesment123', element: <CompleteAssesment />},
        { path: '/dashboard/app', element: <DashboardApp />},





      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
