import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getCompanyInfo: build.query({
            query: () => ({
                url: `${apiUrl.companyInfo}`,
                 headers: {
                  "referrerPolicy": "unsafe_url",
                }
            }),
        }),
        updateCompanyInfo: build.mutation({
            query: (data) => ({
                url: `${apiUrl.companyInfo}`,
                method: "POST",
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
                body: data,
            })
        }),
        updateCompanyLogo: build.mutation({
            query: (data) => ({
                url: `${apiUrl.companyLogo}`,
                method: "POST",
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
                body: data,
            })
        }),
        getCompanyTags: build.query({
            query: () => ({
                url: apiUrl.companyTags,
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
            })
        })
    }),
    overrideExisting: false,

});

export const { useGetCompanyInfoQuery, useUpdateCompanyInfoMutation, useUpdateCompanyLogoMutation, useGetCompanyTagsQuery } = extendedApi;
