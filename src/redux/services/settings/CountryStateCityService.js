import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath?.injectEndpoints({
    endpoints: (build) => ({
        getCountry: build.query({
            query: () => ({
                url: `${apiUrl.country}`,
                headers: {
                  'Authorization': `Token ${localStorage?.getItem("globalUser")?.access}`,
                  "referrerPolicy": "unsafe_url",
                }
            }),
        }),
        getState: build.query({
            query: (id) => `${apiUrl.state}${id}`,
            headers: {
              'Authorization': `Token ${localStorage?.getItem("globalUser")?.access}`,
                  "referrerPolicy": "unsafe_url",
            }
        }),
        getCity: build.query({
            query: (id) => `${apiUrl.city}${id}`,
            headers: {
              'Authorization': `Token ${localStorage?.getItem("globalUser")?.access}`,
                  "referrerPolicy": "unsafe_url",
            }
        }),
    }),
    overrideExisting: false,
});

export const { useGetCountryQuery, useGetStateQuery, useGetCityQuery } = extendedApi;
