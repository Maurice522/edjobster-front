import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getWebformDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.webform}/?id=${id}`,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addWebformFields: build.mutation({
      query: (data) => ({
        url: `${apiUrl.webform}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    updateWebformFields: build.mutation({
      query: (data) => ({
        url: `${apiUrl.webform}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetWebformDetailsQuery, 
  useAddWebformFieldsMutation, 
  useUpdateWebformFieldsMutation 
} = extendedApi;
  