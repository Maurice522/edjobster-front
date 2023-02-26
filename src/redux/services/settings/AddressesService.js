import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getAddresses: build.query({
            query: () => ({
                url: `${apiUrl.address}`,
                 headers: {
                  "referrerPolicy": "unsafe_url",
                }
            }),
        }),
        addAddresses: build.mutation({
            query: (data) => ({
                url: `${apiUrl.address}`,
                method: "POST",
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
                body: data,
            })
        }),
        updateAddresses: build.mutation({
            query: (data) => ({
                url: `${apiUrl.address}`,
                method: "POST",
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
                body: data,
            })
        }),
        deleteAddresses: build.mutation({
            query: (id) => ({
                url: `${apiUrl.address}?id=${id}`,
                 headers: {
                  "referrerPolicy": "unsafe_url",
                },
                method: "DELETE",
            })
        }),
        getAddresseDetails: build.query({
            query: (id) => ({
                url: `${apiUrl.address}${id}`,
                 headers: {
                  "referrerPolicy": "unsafe_url",
                }
            }),
        }),
    }),
    overrideExisting: false,
});
export const { useGetAddressesQuery, useDeleteAddressesMutation, useAddAddressesMutation, useUpdateAddressesMutation,
    useGetAddresseDetailsQuery
} = extendedApi;
