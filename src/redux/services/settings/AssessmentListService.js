import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getAssessmentList: build.query({
      query: () => ({
        url: `${apiUrl.assessmentList}`,
      }),
    }),
    deleteAssessmentList: build.mutation({
      query: (id) => ({
        url: `${apiUrl.assessmentList}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAssessmentListQuery, useDeleteAssessmentListMutation } = extendedApi;
