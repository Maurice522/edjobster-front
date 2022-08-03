import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getEmailTamplate: build.query({
      query: () => ({
        url: `${apiUrl.emailtamplate}`,
      }),
    }),
    getEmailVariableTamplate: build.query({
      query: () => ({
        url: `${apiUrl.emailVariables}`,
      }),
    }),
    addEmailTemplate: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailtamplate}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteEmailTemplate: build.mutation({
      query: (id) => ({
        url: `${apiUrl.emailtamplate}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetEmailTamplateQuery, useGetEmailVariableTamplateQuery, useAddEmailTemplateMutation, useDeleteEmailTemplateMutation } = extendedApi;
