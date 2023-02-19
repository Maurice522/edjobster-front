import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getCandidateList: build.query({
      query: () => ({
        url: `${apiUrl.candidate}candidate/`,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    getCandidateDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.candidate}details/?id=${id}`,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addApplyJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.candidate}apply/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addCandidateResume: build.mutation({
        query: (data) => ({
          url: `${apiUrl.candidate}resume-parse/`,
          method: 'POST',
          body: data,
          headers: {
            'Authorization': `Token ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
    addCandidateDetails: build.mutation({
        query: (data) => ({
          url: `${apiUrl.candidate}create-candidate/`,
          method: 'POST',
          body: data,
          headers: {
            'Authorization': `Token ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
    updateCandidate: build.mutation({
      query: (data) => ({
        url: `${apiUrl.candidate}applications/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    deleteCandidate: build.mutation({
      query: (id) => ({
        url: `${apiUrl.candidate}applications/?id=${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addCandidate: build.mutation({
      query: (data) => ({
        url: `${apiUrl.createCandidate}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      })
    }),
    addCandidateWithResume: build.mutation({
      query: (data) => ({
        url: `${apiUrl.createCandidateWithResume}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      })
    }),
    assignJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.candidate}assign-job/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    getApplicants: build.query({
      query: (id) => ({
        url: `${apiUrl.candidate}applicant-get/candidate/${id}`,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      })
    }),
    updateCandidateStatus: build.mutation({
      query: (data) => ({
        url: `${apiUrl.candidate}update-candidate-status/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      })
    }),
    candidateStats: build.query({
      query: (id) => ({
        url: `${apiUrl.candidate}update-candidate-stats/?candidate=${id}`,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCandidateDetailsMutation,
  useGetCandidateListQuery,
  useGetCandidateDetailsQuery,
  useAddApplyJobMutation,
  useAddCandidateResumeMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
  useAddCandidateMutation,
  useAddCandidateWithResumeMutation,
  useAssignJobMutation,
  useGetApplicantsQuery,
  useUpdateCandidateStatusMutation,
  useCandidateStatsQuery
} = extendedApi;
