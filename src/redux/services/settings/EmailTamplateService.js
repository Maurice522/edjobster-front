import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getEmailTamplate: build.query({
      query: () => ({
        url: `${apiUrl.emailtamplate}`,
        headers: {
                  "referrerPolicy": "unsafe_url",
                }
      }),
    }),
    getEmailVariableTamplate: build.query({
      query: () => ({
        url: `${apiUrl.emailVariables}`,
        headers: {
                  "referrerPolicy": "unsafe_url",
                }
      }),
    }),
    getEmailTemplateById: build.query({
      query: (id) => ({
        url: `${apiUrl.emailtamplate}${id}`,
        headers: {
                  "referrerPolicy": "unsafe_url",
                }
      }),
    }),
    updateEmailTemplate: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailtamplate}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
                  "referrerPolicy": "unsafe_url",
        }
      }),
    }),
    addEmailTemplate: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailtamplate}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
                  "referrerPolicy": "unsafe_url",
        }
      }),
    }),
    deleteEmailTemplate: build.mutation({
      query: (id) => ({
        url: `${apiUrl.emailtamplate}?id=${id}`,
        headers: {
                  "referrerPolicy": "unsafe_url",
                },
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEmailTamplateQuery,
  useGetEmailVariableTamplateQuery,
  useGetEmailTemplateByIdQuery,
  useUpdateEmailTemplateMutation,
  useAddEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
} = extendedApi;
