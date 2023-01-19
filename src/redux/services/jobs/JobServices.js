import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getJob: build.query({
      query: () => ({
        url: `${apiUrl.jobs}job/?page=1`,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
    getJobeDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-details/?id=${id}`,
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
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobQuery,
  useGetJobeDetailsQuery,
  useAddJobMutation,
  useDeleteJobMutation,
} = extendedApi;
