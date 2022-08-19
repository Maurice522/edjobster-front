import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getJob: build.query({
      query: () => ({
        url: `${apiUrl.jobs}`,
      }),
    }),
   
    addJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.jobs}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.jobs}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteJob: build.mutation({
      query: (id) => ({
        url: `${apiUrl.jobs}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = extendedApi;
