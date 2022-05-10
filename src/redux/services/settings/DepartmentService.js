import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

console.log("spiBase", apiBasePath);

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        department: build.query({
            query: (header) => {
                console.log(header);
                return {
                    url: `${apiUrl.department}`,
                    method: 'GET',
                }
            },
        }),
    }),
    overrideExisting: false,
});

export const { useDepartmentQuery } = extendedApi;
