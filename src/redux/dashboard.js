import { apiUrl } from "../utils/api";
import { apiBasePath } from "./services/BaseUrl";

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    dashStats: build.query({
      query: () => ({
        url: `${apiUrl.jobs}dashboard-stats/`,
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
    
  }),
  overrideExisting: false,
});

export const {
  useDashStatsQuery,
} = extendedApi;
