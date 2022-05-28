import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getUsersApi: build.query({
            query: () => ({
                url: `${apiUrl.user}`,
            }),
        }),
        addUserApi: build.mutation({
            query: (data) => ({
                url: `${apiUrl.user}`,
                method: "POST",
                body: data,
            })
        }),
        updateUserApi: build.mutation({
            query: (data) => ({
                url: `${apiUrl.user}`,
                method: "POST",
                body: data,
            })
        }),
        deleteUserApi: build.mutation({
            query: (id) => ({
                url: `${apiUrl.user}?id=${id}`,
                method: "DELETE",
            })
        }),

    }),
    overrideExisting: false,
});
export const { useGetUsersApiQuery, useAddUserApiMutation, useUpdateUserApiMutation, useDeleteUserApiMutation } = extendedApi;
