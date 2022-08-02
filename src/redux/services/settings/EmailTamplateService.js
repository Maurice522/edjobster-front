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
  }),
  overrideExisting: false,
});

export const { useGetEmailTamplateQuery,useGetEmailVariableTamplateQuery } = extendedApi;
