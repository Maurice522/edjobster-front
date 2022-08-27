import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getLocation: build.query({
            query: () => ({
                url: `${apiUrl.location}`,
            }),
        }),
        
    }),
    overrideExisting: false,
});

export const { useGetLocationQuery } = extendedApi;
