import BookingFlow from '@/components/booking/booking-flow'

export default function BookTripPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900">Complete Your Booking</h1>
                <p className="mt-2 text-slate-600">Follow the steps below to secure your seat</p>
            </div>

            <BookingFlow tripId={params.id} />
        </div>
    )
}
