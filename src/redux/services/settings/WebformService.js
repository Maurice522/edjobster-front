import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getWebform: build.query({
      query: () => ({
        url: `${apiUrl.webform}`,
        headers: {
                  "referrerPolicy": "unsafe_url",
                }
      }),
    }),
    getWebformDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.webform}?id=${id}`,
        method: 'GET',
        headers: {
                  "referrerPolicy": "unsafe_url",
                }
      }),
    }),
    addWebformApi: build.mutation({
      query: (data) => ({
        url: `${apiUrl.webform}`,
        method: 'POST',
        headers: {
                  "referrerPolicy": "unsafe_url",
                },
        body: data,
      }),
    }),
    updateWebform: build.mutation({
      query: (data) => ({
        url: `${apiUrl.webform}`,
        method: 'POST',
        headers: {
                  "referrerPolicy": "unsafe_url",
                },
        body: data,
      }),
    }),
    deleteWebform: build.mutation({
      query: (id) => ({
        url: `${apiUrl.webform}?id=${id}`,
        method: 'DELETE',
        headers: {
                  "referrerPolicy": "unsafe_url",
                }
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWebformQuery,
  useGetWebformDetailsQuery,
  useAddWebformApiMutation,
  useUpdateWebformMutation,
  useDeleteWebformMutation,
} = extendedApi;
