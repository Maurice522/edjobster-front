import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getPipeline: build.query({
      query: () => ({
        url: `${apiUrl.pipeline}`,
        headers: {
                  "referrerPolicy": "unsafe_url",
                }
      }),
    }),
    addPipelineApi: build.mutation({
      query: (data) => ({
        url: `${apiUrl.pipeline}`,
        method: 'POST',
        headers: {
                  "referrerPolicy": "unsafe_url",
                },
        body: data,
      }),
    }),
    updatePipelineApi: build.mutation({
      query: (data) => ({
        url: `${apiUrl.pipeline}`,
        method: 'POST',
        headers: {
                  "referrerPolicy": "unsafe_url",
                },
        body: data,
      }),
    }),
    deletePipelineApi: build.mutation({
      query: (id) => ({
        url: `${apiUrl.pipeline}?id=${id}`,
        method: 'DELETE',
        headers: {
                  "referrerPolicy": "unsafe_url",
                }
      }),
    }),
  }),
});

export const {
  useGetPipelineQuery,
  useAddPipelineApiMutation,
  useUpdatePipelineApiMutation,
  useDeletePipelineApiMutation,
} = extendedApi;
