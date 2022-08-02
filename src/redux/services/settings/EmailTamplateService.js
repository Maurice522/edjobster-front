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
  }),
  overrideExisting: false,
});

export const { useGetEmailTamplateQuery, useGetEmailVariableTamplateQuery, useAddEmailTemplateMutation } = extendedApi;
