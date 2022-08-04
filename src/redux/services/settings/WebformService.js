import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
      getWebform: build.query({
        query: () => ({
          url: `${apiUrl.webform}`,
        }),
      }),
      addWebformApi: build.mutation({
        query: (data) => ({
          url: `${apiUrl.webform}`,
          method: 'POST',
          body: data,
        }),
      }),
      updateWebform: build.mutation({
        query: (data) => ({
          url: `${apiUrl.webform}`,
          method: 'POST',
          body: data,
        }),
      }),
    }),
    overrideExisting: false,
  });
  
  export const { useGetWebformQuery, useAddWebformApiMutation,useUpdateWebformMutation } = extendedApi;
  