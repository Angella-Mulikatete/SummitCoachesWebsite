'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useRoutes } from '@/hooks/use-api';

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

    const { data: routes } = useRoutes({ active: true });

    // Extract unique origins and destinations
    const origins = Array.from(new Set(routes?.map((r) => r.origin).filter(Boolean))).sort();
    const destinations = Array.from(new Set(routes?.map((r) => r.destination).filter(Boolean))).sort();

    const handleSearch = () => {
        onSearch({
            origin: origin === 'all' ? undefined : origin,
            destination: destination === 'all' ? undefined : destination,
            date,
        });
    };

    return (
        <div className={cn("bg-white p-4 rounded-lg shadow-lg border border-gray-100", className)}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Origin Select */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        From
                    </label>
                    <Select value={origin} onValueChange={setOrigin}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Origin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any Location</SelectItem>
                            {origins.map((loc) => (
                                <SelectItem key={loc} value={loc as string}>
                                    {loc}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Destination Select */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        To
                    </label>
                    <Select value={destination} onValueChange={setDestination}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Destination" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any Location</SelectItem>
                            {destinations.map((loc) => (
                                <SelectItem key={loc} value={loc as string}>
                                    {loc}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        onClick={handleSearch}
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Search Trips
                    </Button>
                </div>
            </div>
        </div>
    );
}
