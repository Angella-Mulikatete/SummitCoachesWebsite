'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe]">
      <div className="relative py-20 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Please read these terms carefully before booking with Summit Coaches
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">1. Booking Terms</h2>
              <p className="text-[#475569] mb-3">
                All bookings are subject to availability and confirmation. A booking is confirmed only when
                you receive a confirmation email from Summit Coaches.
              </p>
              <p className="text-[#475569]">
                Payment must be received in full at the time of booking unless otherwise agreed in writing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">2. Cancellation Policy</h2>
              <p className="text-[#475569] mb-3">
                Cancellations made more than 30 days before departure: Full refund minus 10% administration fee.
              </p>
              <p className="text-[#475569] mb-3">
                Cancellations made 15-30 days before departure: 50% refund of total booking cost.
              </p>
              <p className="text-[#475569]">
                Cancellations made less than 15 days before departure: No refund.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">3. Travel Insurance</h2>
              <p className="text-[#475569]">
                We strongly recommend that all passengers take out comprehensive travel insurance to cover
                cancellation, medical expenses, personal injury, and loss of baggage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">4. Passenger Responsibilities</h2>
              <p className="text-[#475569] mb-3">
                Passengers must arrive at the departure point at least 15 minutes before the scheduled
                departure time.
              </p>
              <p className="text-[#475569]">
                Passengers are responsible for ensuring they have valid travel documents, including
                passports and visas if required.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">5. Changes to Bookings</h2>
              <p className="text-[#475569]">
                Changes to bookings are subject to availability and may incur an administration fee.
                All change requests must be made in writing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">6. Limitation of Liability</h2>
              <p className="text-[#475569]">
                Summit Coaches accepts no liability for delays, cancellations, or changes to itineraries
                caused by circumstances beyond our control, including but not limited to weather conditions,
                traffic incidents, or mechanical issues.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">7. Behavior</h2>
              <p className="text-[#475569]">
                We reserve the right to refuse travel to any passenger who is behaving in a manner that
                may cause danger, distress, or annoyance to other passengers or our staff.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">8. Contact</h2>
              <p className="text-[#475569]">
                If you have any questions about these terms and conditions, please contact us at
                info@summitcoaches.com or call us at +1 (555) 123-4567.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-[#475569] text-center">
              Last updated: November 2024
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
