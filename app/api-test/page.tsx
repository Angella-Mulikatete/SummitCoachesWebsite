'use client';

import { useRoutes, useTrips, useFeaturedRoutes } from '@/hooks/use-api';

export default function ApiTestPage() {
    const { data: routes, isLoading: routesLoading, error: routesError } = useRoutes({ active: true });
    const { data: trips, isLoading: tripsLoading, error: tripsError } = useTrips();
    const { data: featuredRoutes, isLoading: featuredLoading } = useFeaturedRoutes(3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        🚀 API Integration Test
                    </h1>
                    <p className="text-slate-600">
                        Testing Laravel backend API integration with auto-generated TypeScript SDK
                    </p>
                    <div className="mt-4 flex gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            ✓ React Query
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            ✓ Typed SDK
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            ✓ Auto-generated
                        </span>
                    </div>
                </div>

                {/* Routes Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🗺️</span>
                        Active Routes
                    </h2>

                    {routesLoading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    )}

                    {routesError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 font-medium">Error loading routes</p>
                            <p className="text-red-600 text-sm mt-1">
                                {routesError instanceof Error ? routesError.message : 'Failed to fetch routes'}
                            </p>
                        </div>
                    )}

                    {routes && routes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {routes.slice(0, 4).map((route: any, idx: number) => (
                                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                                    <h3 className="font-semibold text-slate-900">{route.name || 'Unnamed Route'}</h3>
                                    <p className="text-sm text-slate-600 mt-1">
                                        {route.origin} → {route.destination}
                                    </p>
                                    {route.distance_km && (
                                        <p className="text-xs text-slate-500 mt-2">
                                            Distance: {route.distance_km} km
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : routes && (
                        <p className="text-slate-500 text-center py-8">No active routes found</p>
                    )}
                </div>

                {/* Trips Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🚌</span>
                        Available Trips
                    </h2>

                    {tripsLoading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        </div>
                    )}

                    {tripsError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 font-medium">Error loading trips</p>
                            <p className="text-red-600 text-sm mt-1">
                                {tripsError instanceof Error ? tripsError.message : 'Failed to fetch trips'}
                            </p>
                        </div>
                    )}

                    {trips && trips.data ? (
                        <div className="space-y-3">
                            {trips.data.slice(0, 3).map((trip: any, idx: number) => (
                                <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-slate-900">
                                                Trip #{trip.id || idx + 1}
                                            </h3>
                                            <p className="text-sm text-slate-600 mt-1">
                                                {trip.trip_date} at {trip.departure_time}
                                            </p>
                                        </div>
                                        {trip.available_seats && (
                                            <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                                                {trip.available_seats} seats
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : trips && (
                        <p className="text-slate-500 text-center py-8">No trips available</p>
                    )}
                </div>

                {/* Featured Routes Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">⭐</span>
                        Featured Routes
                    </h2>

                    {featuredLoading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                        </div>
                    )}

                    {featuredRoutes && featuredRoutes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {featuredRoutes.map((route: any, idx: number) => (
                                <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 text-center">
                                    <div className="text-3xl mb-2">🌟</div>
                                    <h3 className="font-semibold text-slate-900">{route.name || 'Featured Route'}</h3>
                                    <p className="text-xs text-slate-600 mt-1">
                                        {route.origin} - {route.destination}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : featuredRoutes && (
                        <p className="text-slate-500 text-center py-8">No featured routes available</p>
                    )}
                </div>

                {/* API Info */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-8 text-white">
                    <h2 className="text-xl font-bold mb-4">✅ Integration Status</h2>
                    <div className="space-y-2 text-sm">
                        <p>✓ TypeScript SDK generated from swagger.json</p>
                        <p>✓ React Query hooks created for data fetching</p>
                        <p>✓ Auto-generated 27 service classes</p>
                        <p>✓ Type-safe API calls with IntelliSense</p>
                        <p className="pt-2 text-slate-400">
                            Base URL: {process.env.NEXT_PUBLIC_API_BASE_URL || 'https://summit.mellonhardware.com/api/v1'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
