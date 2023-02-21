import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath?.injectEndpoints({
    endpoints: (build) => ({
        getTestimonials: build.query({
            query: () => ({
                url: apiUrl.testimonials,
                headers: {
                    'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            }),
        }),
        addTestimonial: build.mutation({
            query: (data) => ({
                url: apiUrl.testimonials,
                method: "POST",
                body: data,
                headers: {
                    'Authorization': `Token ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            })
        })
    }),
    overrideExisting: false,
});

export const { useGetTestimonialsQuery } = extendedApi;