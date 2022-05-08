import { emptySplitApi } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

console.log('apiUrl.signIn', apiUrl.signIn);
const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.query({
      query: (data) => {
        console.log('data', data);
        return {
          url: `${apiUrl.signIn}`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePostQuery } = extendedApi;
