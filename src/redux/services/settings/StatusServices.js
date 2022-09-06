import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getStatusApi: build.query({
      query: (data) => ({
        url: `${apiUrl.status}`,
        mathod: 'GET',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetStatusApiQuery } = extendedApi;
