import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getEmailCategory: build.query({
      query: () => ({
        url: `${apiUrl.emailCategory}`,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
          "referrerPolicy": "unsafe_url",
        }
      }),
    }),
    addEmailCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailCategory}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
          "referrerPolicy": "unsafe_url",
        }
      }),
    }),
    updateEmailCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailCategory}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
          "referrerPolicy": "unsafe_url",
        }
      }),
    }),
    deleteEmailCategory: build.mutation({
      query: (id) => ({
        url: `${apiUrl.emailCategory}?id=${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
          "referrerPolicy": "unsafe_url",
        }
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEmailCategoryQuery,
  useAddEmailCategoryMutation,
  useUpdateEmailCategoryMutation,
  useDeleteEmailCategoryMutation,
} = extendedApi;
