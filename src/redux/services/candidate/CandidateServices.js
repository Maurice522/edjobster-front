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
        url: `${apiUrl.candidate}applications/?id=${id}`,
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
        url: `${apiUrl.ca}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      })
    })
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
} = extendedApi;
