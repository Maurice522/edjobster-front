import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/api';
// initialize an empty api service that we'll inject endpoints into later as needed


export const apiBasePath = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().login.authToken || JSON.parse(localStorage.getItem("globalUser")).access;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
});
