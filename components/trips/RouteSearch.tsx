
'use client';

import { useState } from 'react';
import { Calendar, MapPin, Search, X } from 'lucide-react';

interface RouteSearchProps {
    onSearch: (filters: {
        origin?: string;
        destination?: string;
        date?: Date;
    }) => void;
    className?: string;
}

export default function RouteSearch({ onSearch, className }: RouteSearchProps) {
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [date, setDate] = useState<Date>();

    // You'll need to fetch routes to populate dropdowns
    // This should fetch from /routes endpoint without filters
    const [routes, setRoutes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all routes on mount to populate dropdowns
    useState(() => {
        fetch('https://summit.mellonhardware.com/api/v1/routes', {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE'
            }
        })
        .then(res => res.json())
        .then(data => {
            setRoutes(data.data || []);
            setIsLoading(false);
        })
        .catch(err => {
            console.error('Failed to fetch routes:', err);
            setIsLoading(false);
        });
    });

    // Extract unique origins and destinations
    const origins = Array.from(
        new Set(routes.map((r) => r.origin).filter(Boolean))
    ).sort();
    
    const destinations = Array.from(
        new Set(routes.map((r) => r.destination).filter(Boolean))
    ).sort();

    const handleSearch = () => {
        onSearch({
            origin: origin && origin !== 'all' ? origin : undefined,
            destination: destination && destination !== 'all' ? destination : undefined,
            date: date,
        });
    };

    const handleClear = () => {
        setOrigin('');
        setDestination('');
        setDate(undefined);
        onSearch({});
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <div className={`bg-white p-6 rounded-lg shadow-lg border border-gray-100 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Origin Select */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        From
                    </label>
                    <select 
                        value={origin} 
                        onChange={(e) => setOrigin(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Origin</option>
                        <option value="all">Any Location</option>
                        {origins.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Destination Select */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        To
                    </label>
                    <select 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Destination</option>
                        <option value="all">Any Location</option>
                        {destinations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        Date
                    </label>
                    <input
                        type="date"
                        value={date ? date.toISOString().split('T')[0] : ''}
                        onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Search & Clear Buttons */}
                <div className="flex items-end gap-2">
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <Search className="w-4 h-4" />
                        Search
                    </button>
                    {(origin || destination || date) && (
                        <button
                            onClick={handleClear}
                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}




