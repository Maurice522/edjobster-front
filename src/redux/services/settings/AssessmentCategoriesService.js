import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getAssessmentCategories: build.query({
      query: () => ({
        // eslint-disable-next-line no-undef
        url: `${apiUrl.assementCategory}`,
      }),
    }),
    addAssessmentCategories: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assementCategory}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAssessmentCategories: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assementCategory}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteAssessmentCategories: build.mutation({
      query: (id) => ({
        url: `${apiUrl.assementCategory}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssessmentCategoriesQuery,
  useAddAssessmentCategoriesMutation,
  useDeleteAssessmentCategoriesMutation,
  useUpdateAssessmentCategoriesMutation,
} = extendedApi;
