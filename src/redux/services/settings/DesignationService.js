import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        designationGet: build.query({
            query: () => ({
                url: `${apiUrl.designation}`,
                headers: {
                  "referrerPolicy": "unsafe_url",
                },
            }),
        }),
        addDesignation: build.mutation({
            query: (data) => ({
                url: `${apiUrl.designation}`,
                method: "POST",
                headers: {
                  "referrerPolicy": "unsafe_url",
                },
                body: data,
            })
        }),
        updateDesignation: build.mutation({
            query: (data) => ({
                url: `${apiUrl.designation}`,
                method: "POST",
                headers: {
                  "referrerPolicy": "unsafe_url",
                },
                body: data,
            })
        }),
        deleteDesignation: build.mutation({
            query: (id) => ({
                url: `${apiUrl.designation}?id=${id}`,
                method: "DELETE",
                headers: {
                  "referrerPolicy": "unsafe_url",
                },
            })
        }),
    }),
    overrideExisting: false,
});

export const { useDesignationGetQuery, useAddDesignationMutation, useUpdateDesignationMutation, useDeleteDesignationMutation } = extendedApi;
