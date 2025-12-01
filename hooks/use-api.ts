// 'use client';

// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import {
//     AccountsService,
//     AuthenticationService,
//     TripsService,
//     BookingsService,
//     RoutesService,
//     TicketsService,
//     ParcelsService,
//     type Account,
//     type Trip,
//     type Booking,
//     type Route,
// } from '@/lib/api-client';
// import { authStorage } from '@/lib/auth';

// // ==================== AUTHENTICATION ====================

// /**
//  * Hook for user registration (staff)
//  */
// export function useRegisterStaff() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (data: {
//             name: string;
//             email: string;
//             password: string;
//             password_confirmation: string;
//             phone: string;
//             role_id: number;
//             gender: 'male' | 'female' | 'other';
//             address?: string;
//             id_type?: 'NIN' | 'Passport' | 'DriverLicense';
//             id_number?: string;
//             company_id?: number;
//         }) => {
//             const response = await AuthenticationService.b0D9De5185E5Cc811554Ad1Ee4E06E6(data);
//             return response;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['auth'] });
//         },
//     });
// }

// /**
//  * Hook for user login
//  */
// export function useLogin() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (credentials: { email: string; password: string; code?: string }) => {
//             const response = await AuthenticationService.d66635C4992Aeaa6Aa44Ff653D0563(credentials);

//             // Store the token if returned
//             if ('token' in response && response.token) {
//                 authStorage.setToken(response.token as string);
//             }

//             return response;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['auth'] });
//             queryClient.invalidateQueries({ queryKey: ['account'] });
//         },
//     });
// }

// /**
//  * Hook for user logout
//  */
// export function useLogout() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async () => {
//             const response = await AuthenticationService.abf3B64A4Bc7838D56346F05A5153Af();
//             authStorage.removeToken();
//             return response;
//         },
//         onSuccess: () => {
//             queryClient.clear(); // Clear all queries on logout
//         },
//     });
// }

// // ==================== ACCOUNT ====================

// /**
//  * Hook to get the current user's account
//  */
// export function useAccount() {
//     return useQuery<Account>({
//         queryKey: ['account'],
//         queryFn: async () => {
//             const response = await AccountsService.getMyAccount();
//             return response.data as Account;
//         },
//         enabled: authStorage.isAuthenticated(),
//     });
// }

// /**
//  * Hook to get all accounts (with pagination)
//  */
// export function useAccounts(page = 1, perPage = 15) {
//     return useQuery({
//         queryKey: ['accounts', page, perPage],
//         queryFn: async () => {
//             const response = await AccountsService.listAccounts(perPage, page);
//             return response;
//         },
//         enabled: authStorage.isAuthenticated(),
//     });
// }

// /**
//  * Hook to get account by ID
//  */
// export function useAccountById(id: number) {
//     return useQuery({
//         queryKey: ['account', id],
//         queryFn: async () => {
//             const response = await AccountsService.getAccountById(id);
//             return response.data;
//         },
//         enabled: authStorage.isAuthenticated() && !!id,
//     });
// }

// // ==================== TRIPS ====================

// /**
//  * Hook to get all trips with optional filters
//  * Public endpoint - no authentication required
//  */
// export function useTrips(filters?: {
//     routeId?: number;
//     tripDate?: string;
//     origin?: string;
//     destination?: string;
//     perPage?: number;
// }) {
//     return useQuery({
//         queryKey: ['trips', filters],
//         queryFn: async () => {
//             try {
//                 const response = await TripsService.ed65B907Bc4Ee55E575689B029B07(
//                     filters?.routeId,
//                     filters?.tripDate,
//                     filters?.origin,
//                     filters?.destination,
//                     filters?.perPage
//                 );

//                 console.log('Trips API Response:', response);
//                 return response;
//             } catch (error) {
//                 console.error('Trips API Error:', error);
//                 throw error;
//             }
//         },
//         retry: 1,
//         staleTime: 5 * 60 * 1000, // 5 minutes
//     });
// }

// /**
//  * Hook to get a single trip by ID
//  */
// export function useTrip(id: number) {
//     return useQuery({
//         queryKey: ['trip', id],
//         queryFn: async () => {
//             const response = await TripsService.d78Ac59A3Df1420C8B62A5D47B9Dc(id);
//             return response;
//         },
//         enabled: !!id,
//     });
// }

// /**
//  * Hook to get trip seat availability
//  */
// export function useTripAvailability(id: number) {
//     return useQuery({
//         queryKey: ['trip', id, 'availability'],
//         queryFn: async () => {
//             const response = await TripsService.e09511B2880Bfda79155F604745(id);
//             return response;
//         },
//         enabled: !!id,
//     });
// }

// /**
//  * Hook to get trip seat layout
//  */
// export function useTripSeats(id: number) {
//     return useQuery({
//         queryKey: ['trip', id, 'seats'],
//         queryFn: async () => {
//             const response = await TripsService.eeb467Ecf00267071Efb77Ed0(id);
//             return response;
//         },
//         enabled: !!id,
//     });
// }

// // ==================== ROUTES ====================

// /**
//  * Hook to get all routes
//  * Public endpoint - no authentication required
//  */
// export function useRoutes(filters?: {
//     companyId?: number;
//     active?: boolean;
//     search?: string;
//     dateFilter?: string;
//     hasTrips?: boolean;
//     minSeats?: number;
// }) {
//     return useQuery({
//         queryKey: ['routes', filters],
//         queryFn: async () => {
//             const response = await RoutesService.getAllRoutes(
//                 filters?.companyId,
//                 filters?.active,
//                 filters?.search,
//                 filters?.dateFilter,
//                 filters?.hasTrips,
//                 filters?.minSeats
//             );
//             return response.data as Route[];
//         },
//     });
// }

// /**
//  * Hook to get a single route by ID
//  */
// export function useRoute(id: number) {
//     return useQuery({
//         queryKey: ['route', id],
//         queryFn: async () => {
//             const response = await RoutesService.getRouteById(id);
//             return response.data;
//         },
//         enabled: !!id,
//     });
// }

// /**
//  * Hook to get popular routes
//  */
// export function usePopularRoutes(limit = 10, days = 30) {
//     return useQuery({
//         queryKey: ['routes', 'popular', limit, days],
//         queryFn: async () => {
//             const response = await RoutesService.getPopularRoutes(limit, days);
//             return response.data;
//         },
//     });
// }

// /**
//  * Hook to get featured routes
//  */
// export function useFeaturedRoutes(limit = 6) {
//     return useQuery({
//         queryKey: ['routes', 'featured', limit],
//         queryFn: async () => {
//             const response = await RoutesService.getFeaturedRoutes(limit);
//             return response.data;
//         },
//     });
// }

// // ==================== BOOKINGS ====================

// /**
//  * Hook to get all bookings
//  */
// export function useBookings(filters?: {
//     perPage?: number;
//     status?: 'pending' | 'confirmed' | 'cancelled';
//     paymentStatus?: 'unpaid' | 'paid';
//     bookingType?: 'passenger' | 'luggage' | 'parcel' | 'mixed';
//     tripId?: number;
//     passengerId?: number;
// }) {
//     return useQuery({
//         queryKey: ['bookings', filters],
//         queryFn: async () => {
//             const response = await BookingsService.b89B932C131E727A3720A01899Acd0A2(
//                 filters?.perPage,
//                 filters?.status,
//                 filters?.paymentStatus,
//                 filters?.bookingType,
//                 filters?.tripId,
//                 filters?.passengerId
//             );
//             return response.data;
//         },
//         enabled: authStorage.isAuthenticated(),
//     });
// }

// /**
//  * Hook to get a single booking by ID
//  */
// export function useBooking(id: number) {
//     return useQuery({
//         queryKey: ['booking', id],
//         queryFn: async () => {
//             const response = await BookingsService.a7E24B15B1F9Fe6C357532B3C5200A3(id);
//             return response.data;
//         },
//         enabled: authStorage.isAuthenticated() && !!id,
//     });
// }

// /**
//  * Hook to create a new booking
//  */
// export function useCreateBooking() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (bookingData: any) => {
//             const response = await BookingsService.aa028B063E31D6Efe9C093Aa88(bookingData);
//             return response.data;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['bookings'] });
//         },
//     });
// }

// /**
//  * Hook to cancel a booking
//  */
// export function useCancelBooking() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (id: number) => {
//             const response = await BookingsService.bc3Aca96Afaea31759C232E7B998E3(id);
//             return response;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['bookings'] });
//         },
//     });
// }

// // ==================== TICKETS ====================

// /**
//  * Hook to verify a ticket
//  */
// export function useVerifyTicket(ticketNumber: string) {
//     return useQuery({
//         queryKey: ['tickets', 'verify', ticketNumber],
//         queryFn: async () => {
//             const response = await TicketsService.aa82Ee859Fa62Ac7Cabae200E5F5472(ticketNumber);
//             return response.data;
//         },
//         enabled: authStorage.isAuthenticated() && !!ticketNumber,
//     });
// }

// // ==================== PARCELS ====================

// /**
//  * Hook to track a parcel
//  * Public endpoint - no authentication required
//  */
// export function useTrackParcel(trackingCode: string) {
//     return useQuery({
//         queryKey: ['parcel', 'track', trackingCode],
//         queryFn: async () => {
//             const response = await ParcelsService.bbf02Af402D4Cde6A5Fd3D69E022F90(trackingCode);
//             return response.data;
//         },
//         enabled: !!trackingCode,
//     });
// }

















'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    AccountsService,
    AuthenticationService,
    TripsService,
    BookingsService,
    RoutesService,
    TicketsService,
    ParcelsService,
    type Account,
    type Trip,
    type Booking,
    type Route,
    OpenAPI,
} from '@/lib/api-client';
import { authStorage } from '@/lib/auth';

// ==================== AUTHENTICATION ====================

/**
 * Hook for user registration (staff)
    TripsService,
    BookingsService,
    RoutesService,
    TicketsService,
    ParcelsService,
    type Account,
    type Trip,
    type Booking,
    type Route,
} from '@/lib/api-client';
import { authStorage } from '@/lib/auth';

// ==================== AUTHENTICATION ====================

/**
 * Hook for user registration (staff)
 */
export function useRegisterStaff() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
            phone: string;
            role_id: number;
            gender: 'male' | 'female' | 'other';
            address?: string;
            id_type?: 'NIN' | 'Passport' | 'DriverLicense';
            id_number?: string;
            company_id?: number;
        }) => {
            const response = await AuthenticationService.b0D9De5185E5Cc811554Ad1Ee4E06E6(data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] });
        },
    });
}

/**
 * Hook for user login
 */
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string; code?: string }) => {
            const response = await AuthenticationService.d66635C4992Aeaa6Aa44Ff653D0563(credentials);

            // Store the token if returned
            if ('token' in response && response.token) {
                authStorage.setToken(response.token as string);
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            queryClient.invalidateQueries({ queryKey: ['account'] });
        },
    });
}

/**
 * Hook for user logout
 */
export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await AuthenticationService.abf3B64A4Bc7838D56346F05A5153Af();
            authStorage.removeToken();
            return response;
        },
        onSuccess: () => {
            queryClient.clear(); // Clear all queries on logout
        },
    });
}

// ==================== ACCOUNT ====================

/**
 * Hook to get the current user's account
 */
export function useAccount() {
    return useQuery<Account>({
        queryKey: ['account'],
        queryFn: async () => {
            const response = await AccountsService.getMyAccount();
            return response.data as Account;
        },
        enabled: authStorage.isAuthenticated(),
    });
}

/**
 * Hook to get all accounts (with pagination)
 */
export function useAccounts(page = 1, perPage = 15) {
    return useQuery({
        queryKey: ['accounts', page, perPage],
        queryFn: async () => {
            const response = await AccountsService.listAccounts(perPage, page);
            return response;
        },
        enabled: authStorage.isAuthenticated(),
    });
}

/**
 * Hook to get account by ID
 */
export function useAccountById(id: number) {
    return useQuery({
        queryKey: ['account', id],
        queryFn: async () => {
            const response = await AccountsService.getAccountById(id);
            return response.data;
        },
        enabled: authStorage.isAuthenticated() && !!id,
    });
}

// ==================== TRIPS ====================

/**
 * Hook to get all trips with optional filters
 * Public endpoint - no authentication required
 */
export function useTrips(filters?: {
    routeId?: number;
    tripDate?: string;
    origin?: string;
    destination?: string;
    perPage?: number;
}) {
    return useQuery({
        queryKey: ['trips', filters],
        queryFn: async () => {
            const response = await TripsService.ed65B907Bc4Ee55E575689B029B07(
                filters?.routeId,
                filters?.tripDate,
                filters?.origin,
                filters?.destination,
                filters?.perPage
            );
            return response;
        },
    });
}

/**
 * Hook to get a single trip by ID
 */
export function useTrip(id: number) {
    return useQuery({
        queryKey: ['trip', id],
        queryFn: async () => {
            const response = await TripsService.d78Ac59A3Df1420C8B62A5D47B9Dc(id);
            return response;
        },
        enabled: !!id,
    });
}

/**
 * Hook to get trip seat availability
 */
export function useTripAvailability(id: number) {
    return useQuery({
        queryKey: ['trip', id, 'availability'],
        queryFn: async () => {
            const response = await TripsService.e09511B2880Bfda79155F604745(id);
            return response;
        },
        enabled: !!id,
    });
}

/**
 * Hook to get trip seat layout
 */
export function useTripSeats(id: number) {
    return useQuery({
        queryKey: ['trip', id, 'seats'],
        queryFn: async () => {
            const response = await TripsService.eeb467Ecf00267071Efb77Ed0(id);
            return response;
        },
        enabled: !!id,
    });
}

// ==================== ROUTES ====================

// /**
//  * Hook to get all routes
//  * Public endpoint - no authentication required
//  */
// export function useRoutes(filters?: {
//     companyId?: number;
//     active?: boolean;
//     search?: string;
//     dateFilter?: string;
//     hasTrips?: boolean;
//     minSeats?: number;
// }) {
//     return useQuery({
//         queryKey: ['routes', filters],
//         queryFn: async () => {
//             const response = await RoutesService.getAllRoutes(
//                 filters?.companyId,
//                 filters?.active,
//                 filters?.search,
//                 filters?.dateFilter,
//                 filters?.hasTrips,
//                 filters?.minSeats
//             );
//             return response.data as Route[];
//         },
//     });
// }

// /**
//  * Hook to get a single route by ID
//  */
// export function useRoute(id: number) {
//     return useQuery({
//         queryKey: ['route', id],
//         queryFn: async () => {
//             const response = await RoutesService.getRouteById(id);
//             return response.data;
//         },
//         enabled: !!id,
//     });
// }


// hooks/use-api.ts

/**
 * Hook to get routes with filters
 * Uses /routes endpoint with active, date_filter, has_trips parameters
 */
export function useRoutes(filters?: {
    companyId?: number;
    active?: boolean;
    search?: string;
    dateFilter?: string;
    hasTrips?: boolean;
    minSeats?: number;
}) {
    return useQuery({
        queryKey: ['routes', filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters?.companyId) params.append('company_id', filters.companyId.toString());
            if (filters?.active !== undefined) params.append('active', filters.active.toString());
            if (filters?.search) params.append('search', filters.search);
            if (filters?.dateFilter) params.append('date_filter', filters.dateFilter);
            if (filters?.hasTrips !== undefined) params.append('has_trips', filters.hasTrips.toString());
            if (filters?.minSeats) params.append('min_seats', filters.minSeats.toString());

            const response = await fetch(
                `https://summit.mellonhardware.com/api/v1/routes?${params.toString()}`,
                {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch routes');
            }

            const data = await response.json();
            return data.data as Route[];
        },
    });
}

/**
 * Hook to get trips for a specific route
 * Uses /routes/{id}/trips endpoint
 */
export function useRouteTrips(routeId: number, date?: string) {
    return useQuery({
        queryKey: ['route-trips', routeId, date],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (date) params.append('date', date);

            const response = await fetch(
                `https://summit.mellonhardware.com/api/v1/routes/${routeId}/trips?${params.toString()}`,
                {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch route trips');
            }

            const data = await response.json();
            return data.data;
        },
        enabled: !!routeId,
    });
}



/**
 * Hook to get popular routes
 */
export function usePopularRoutes(limit = 10, days = 30) {
    return useQuery({
        queryKey: ['routes', 'popular', limit, days],
        queryFn: async () => {
            const response = await RoutesService.getPopularRoutes(limit, days);
            return response.data;
        },
    });
}

/**
 * Hook to get featured routes
 */
export function useFeaturedRoutes(limit = 6) {
    return useQuery({
        queryKey: ['routes', 'featured', limit],
        queryFn: async () => {
            const response = await RoutesService.getFeaturedRoutes(limit);
            return response.data;
        },
    });
}

// ==================== BOOKINGS ====================

/**
 * Hook to get all bookings
 */
export function useBookings(filters?: {
    perPage?: number;
    status?: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus?: 'unpaid' | 'paid';
    bookingType?: 'passenger' | 'luggage' | 'parcel' | 'mixed';
    tripId?: number;
    passengerId?: number;
}) {
    return useQuery({
        queryKey: ['bookings', filters],
        queryFn: async () => {
            const response = await BookingsService.b89B932C131E727A3720A01899Acd0A2(
                filters?.perPage,
                filters?.status,
                filters?.paymentStatus,
                filters?.bookingType,
                filters?.tripId,
                filters?.passengerId
            );
            return response.data;
        },
        enabled: authStorage.isAuthenticated(),
    });
}

/**
 * Hook to get a single booking by ID
 */
export function useBooking(id: number) {
    return useQuery({
        queryKey: ['booking', id],
        queryFn: async () => {
            const response = await BookingsService.a7E24B15B1F9Fe6C357532B3C5200A3(id);
            return response.data;
        },
        enabled: authStorage.isAuthenticated() && !!id,
    });
}

/**
 * Hook to create a new booking
 */
export function useCreateBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (bookingData: any) => {
            const response = await BookingsService.aa028B063E31D6Efe9C093Aa88(bookingData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}

/**
 * Hook to cancel a booking
 */
export function useCancelBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await BookingsService.bc3Aca96Afaea31759C232E7B998E3(id);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}

// ==================== TICKETS ====================

/**
 * Hook to verify a ticket
 */
export function useVerifyTicket(ticketNumber: string) {
    return useQuery({
        queryKey: ['tickets', 'verify', ticketNumber],
        queryFn: async () => {
            const response = await TicketsService.aa82Ee859Fa62Ac7Cabae200E5F5472(ticketNumber);
            return response.data;
        },
        enabled: authStorage.isAuthenticated() && !!ticketNumber,
    });
}



// ==================== PARCELS ====================

/**
 * Hook to track a parcel
 * Public endpoint - no authentication required
 */
export function useTrackParcel(trackingCode: string) {
    return useQuery({
        queryKey: ['parcel', 'track', trackingCode],
        queryFn: async () => {
            const response = await ParcelsService.bbf02Af402D4Cde6A5Fd3D69E022F90(trackingCode);
            return response.data;
        },
        enabled: !!trackingCode,
    });
}

/**
 * Hook to get trips via route-based search
 * Searches routes by origin/destination, then fetches trips for matching routes
 * Public endpoint - no authentication required
 */
export function useTripsViaRoutes(filters?: {
    origin?: string;
    destination?: string;
    tripDate?: string;
}) {
    return useQuery({
        queryKey: ['trips-via-routes', filters],
        queryFn: async () => {
            console.log('useTripsViaRoutes called with filters:', filters);
            try {
                // If no filters, fetch trips directly
                if (!filters?.origin && !filters?.destination) {
                    console.log('No origin/destination filters, fetching all trips');
                    const response = await TripsService.ed65B907Bc4Ee55E575689B029B07(
                        undefined,
                        filters?.tripDate,
                        undefined,
                        undefined,
                        undefined
                    );
                    return response;
                }

                console.log('Fetching all routes for client-side filtering');
                // Fetch all routes directly to avoid active=true default in RoutesService
                const routesResponse = await fetch(`${OpenAPI.BASE}/routes`, {
                    headers: {
                        'Accept': 'application/json',
                    }
                }).then(res => res.json());

                console.log('Fetched routes from API:', routesResponse.data);
                console.log('Filter criteria:', { origin: filters.origin, destination: filters.destination });

                // Filter routes client-side for better accuracy
                const matchingRoutes = (routesResponse.data || []).filter((route: any) => {
                    console.log(`Checking route ${route.id}: ${route.origin} → ${route.destination}`);
                    let matches = true;
                    if (filters.origin && filters.origin !== 'all') {
                        const originMatches = route.origin?.toLowerCase() === filters.origin.toLowerCase();
                        console.log(`  Origin match: ${route.origin} vs ${filters.origin} = ${originMatches}`);
                        matches = matches && originMatches;
                    }
                    if (filters.destination && filters.destination !== 'all') {
                        const destMatches = route.destination?.toLowerCase() === filters.destination.toLowerCase();
                        console.log(`  Dest match: ${route.destination} vs ${filters.destination} = ${destMatches}`);
                        matches = matches && destMatches;
                    }
                    console.log(`  Final match result: ${matches}`);
                    return matches;
                });

                console.log('Matching routes:', matchingRoutes);

                // If no routes found, return empty result
                if (matchingRoutes.length === 0) {
                    return {
                        data: {
                            trips: []
                        }
                    };
                }

                // Fetch trips for each matching route
                const allTripsPromises = matchingRoutes.map(async (route: any) => {
                    try {
                        console.log(`Fetching trips for route ${route.id} with date ${filters.tripDate}`);
                        const tripsResponse = await RoutesService.getRouteTrips(
                            route.id,
                            filters.tripDate
                        );
                        console.log(`Trips for route ${route.id}:`, tripsResponse.data?.trips);
                        return tripsResponse.data?.trips || [];
                    } catch (error) {
                        console.error(`Failed to fetch trips for route ${route.id}:`, error);
                        return [];
                    }
                });

                const allTripsArrays = await Promise.all(allTripsPromises);
                const allTrips = allTripsArrays.flat();

                // Return in the same format as regular trips endpoint
                return {
                    data: {
                        trips: allTrips
                    }
                };
            } catch (error) {
                console.error('Trips via routes error:', error);
                throw error;
            }
        },
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

