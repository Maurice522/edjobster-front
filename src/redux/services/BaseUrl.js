import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/api';
// initialize an empty api service that we'll inject endpoints into later as needed

console.log(baseUrl);
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
});
