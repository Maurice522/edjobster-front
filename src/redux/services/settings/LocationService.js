import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getLocation: build.query({
            query: () => ({
                url: `${apiUrl.location}`,
                headers: {
                  'Authorization': `Token ${localStorage.getItem("globalUser").access}`,
                  "referrerPolicy": "unsafe_url",
                }
            }),
        }),
        
    }),
    overrideExisting: false,
});

export const { useGetLocationQuery } = extendedApi;
