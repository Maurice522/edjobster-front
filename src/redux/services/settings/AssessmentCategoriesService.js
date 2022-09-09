import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getAssessmentCategories: build.query({
      query: () => ({
        url: `${apiUrl.assessmentCategories}`,
      }),
    }),
    addAssessmentCategories: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assessmentCategories}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAssessmentCategories: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assessmentCategories}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteAssessmentCategories: build.mutation({
      query: (id) => ({
        url: `${apiUrl.assessmentCategories}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssessmentCategoriesQuery,
  useDeleteAssessmentCategoriesMutation,
  useAddAssessmentCategoriesMutation,
  useUpdateAssessmentCategoriesMutation,
} = extendedApi;
