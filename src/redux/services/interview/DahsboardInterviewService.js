import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getInterviewListAll: build.query({
            query: () => ({
                url: `${apiUrl.interview}`,
                headers: {
                    'Authorization': `Token ${localStorage.getItem("globalUser").access}`
                }
            }),
        }),
        getInterviewDetails: build.query({
            query: (id) => ({
                url: `${apiUrl.interview}?id=${id}`,
                headers: {
                    'Authorization': `Token ${localStorage.getItem("globalUser").access}`
                }
            }),
        }),
        getInterviewLatest: build.query({
            query: (id) => ({
                url: `${apiUrl.interview}?id=${id}`,
                headers: {
                    'Authorization': `Token ${localStorage.getItem("globalUser").access}`
                }
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetInterviewListAllQuery,
    useGetInterviewDetailsQuery,
    useGetInterviewLatestQuery,

} = extendedApi;
