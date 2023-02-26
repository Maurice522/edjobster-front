import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getWebformDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.webform}/?id=${id}`,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
                  "referrerPolicy": "unsafe_url",
        }
      }),
    }),
    addWebformFields: build.mutation({
      query: (data) => ({
        url: `${apiUrl.webform}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
                  "referrerPolicy": "unsafe_url",
        }
      }),
    }),
    updateWebformFields: build.mutation({
      query: (data) => ({
        url: `${apiUrl.webform}`,
        method: 'POST',
        body: data,
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
  useGetWebformDetailsQuery, 
  useAddWebformFieldsMutation, 
  useUpdateWebformFieldsMutation 
} = extendedApi;
  
