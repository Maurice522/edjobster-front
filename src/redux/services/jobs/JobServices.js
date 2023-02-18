import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    jobStats: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-stats/?job=${id}`,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
    getJob: build.query({
      query: () => ({
        url: `${apiUrl.jobs}all-jobs?page=1`,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
    getJobeDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-details/${id}`,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
   
    addJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.jobs}job/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),

    deleteJob: build.mutation({
      query: (id) => ({
        url: `${apiUrl.jobs}job/?id=${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      })
    }),
    updateJobStatus: build.mutation({
      query: (data) => ({
        url: `${apiUrl.jobs}job-stats/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      })
    })
  }),
  overrideExisting: false,
});

export const {
  useJobStatsQuery,
  useGetJobQuery,
  useGetJobeDetailsQuery,
  useAddJobMutation,
  useDeleteJobMutation,
  useUpdateJobStatusMutation
} = extendedApi;
