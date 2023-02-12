import { apiBasePath } from '../BaseUrl';
import { apiUrl, baseUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getInterviewerDetails: build.query({
            query: () => ({
                url: `${baseUrl}settings/contacts`,
                headers: {
                    'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            }),
        }),

    }),
    overrideExisting: false,
});
export const { useGetInterviewerDetailsQuery } = extendedApi;
