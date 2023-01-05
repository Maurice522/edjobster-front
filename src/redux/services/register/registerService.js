import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    addRegister: build.mutation({
      query: (data) => ({
        url: `${apiUrl.signUp}`,
        method: "POST",
        body: data,
      })
    }),
  }),
  overrideExisting: false,
});

export const { useAddRegisterMutation } = extendedApi; 

