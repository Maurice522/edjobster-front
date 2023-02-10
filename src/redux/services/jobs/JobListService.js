import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getJobList: build.query({
      query: () => ({
        url: `${apiUrl.jobs}all-jobs`,
      }),
    }),
    getJobDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-details/${id}`,
      }),
    }),
    getJobCandidates: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-candidates/${id}`
      })
    })
  }),
  overrideExisting: false,
});

export const {
  useGetJobListQuery,
  useGetJobDetailsQuery,
  useGetJobCandidatesQuery
} = extendedApi;
