import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        degreeGet: build.query({
            query: () => ({
                url: `${apiUrl.degree}`,
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
            }),
        }),
        addDegree: build.mutation({
            query: (data) => ({
                url: `${apiUrl.degree}`,
                method: "POST",
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
                body: data,
            })
        }),
        updateDegree: build.mutation({
            query: (data) => ({
                url: `${apiUrl.degree}`,
                method: "POST",
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
                body: data,
            })
        }),
        deleteDegree: build.mutation({
            query: (id) => ({
                url: `${apiUrl.degree}?id=${id}`,
                method: "DELETE",
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
            })
        }),
    }),
    overrideExisting: false,
});
export const { 
    useDegreeGetQuery, 
    useAddDegreeMutation, 
    useUpdateDegreeMutation, 
    useDeleteDegreeMutation
} = extendedApi;
