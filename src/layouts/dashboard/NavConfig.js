// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// Edited by kundan agrawal for update nav bar section
const newNavBar = [
  {
    title: 'Career Site',
    path: '/dashboard/career-site',
    icon: getIcon('material-symbols:home-outline-rounded')
  },
  {
    title: 'Institute Setting',
    path: '/dashboard/InstituteSettings',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
    children: [
      // { title: 'New User List', path: '/dashboard/newuserlist' },
      { title: 'User List', path: '/dashboard/users/list' },
      { title: 'Approvals', path: '/dashboard/users/approvals' },
    ],
  },
  {
    title: 'Hiring Pipeline',
    path: '/dashboard/hiring-pipeline',
    icon: getIcon('eva:shopping-bag-fill'),
    children: [
      { title: 'Stages', path: '/dashboard/hiring-pipeline/stages' },
      { title: 'Pipelines', path: '/dashboard/hiring-pipeline/pipelines' },
    ],
  },
  { title: 'Email Templates', path: '/dashboard/email-templates/templates',icon:getIcon('mdi:cube-send') },
  { title: 'Webforms',
    path: '/dashboard/candidate-settings/webforms',
    icon: getIcon('ri:bar-chart-line')
  },
  {
    title: 'Job Boards',
    path: '/dashboard/job-boards',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Billing',
    path: '/dashboard/bills',
    icon: getIcon('eva:person-add-fill'),
  },

];
// Edited above by kundan agrawal for update nav bar section

const mainSideBarData = [
  {
    title: 'Jobs',
    path: '/dashboard/jobs',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Candidates',
    path: '/dashboard/candidates',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Interviews',
    path: '/dashboard/interviews',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Assessments',
    path: '/dashboard/assessments',
    icon: getIcon('eva:file-text-fill'),
  },
];

const settingsSideBarData = [
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
    children: [
      { title: 'User List', path: '/dashboard/users/list' },
      { title: 'Approvals', path: '/dashboard/users/approvals' },
    ],
  },
  {
    title: 'Hiring Pipeline',
    path: '/dashboard/hiring-pipeline',
    icon: getIcon('eva:shopping-bag-fill'),
    children: [
      { title: 'Stages', path: '/dashboard/hiring-pipeline/stages' },
      { title: 'Pipelines', path: '/dashboard/hiring-pipeline/pipelines' },
    ],
  },
  {
    title: 'Email Templates',
    path: '/dashboard/email-templates',
    icon: getIcon('eva:file-text-fill'),
    children: [
      { title: 'Categories', path: '/dashboard/email-templates/categories' },
      { title: 'Templates', path: '/dashboard/email-templates/templates' },
    ],
  },
  {
    title: 'Candidate Settings',
    path: '/dashboard/candidate-settings',
    icon: getIcon('eva:lock-fill'),
    children: [
      { title: 'Fields', path: '/dashboard/candidate-settings/fields' },
      { title: 'Webforms', path: '/dashboard/candidate-settings/webforms' },
      { title: 'Assessment Categories', path: '/dashboard/candidate-settings/assessment-categories' },
    ],
  },
  {
    title: 'Job Boards',
    path: '/dashboard/job-boards',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Billing',
    path: '/dashboard/billing',
    icon: getIcon('eva:person-add-fill'),
  },
];

export { newNavBar, mainSideBarData, settingsSideBarData };
