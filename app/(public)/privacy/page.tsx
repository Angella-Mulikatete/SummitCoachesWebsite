'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe]">
      <div className="relative py-20 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl max-w-2xl mx-auto">
              How we collect, use, and protect your personal information
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
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">1. Information We Collect</h2>
              <p className="text-[#475569] mb-3">
                We collect personal information that you provide to us when booking trips, including
                your name, email address, phone number, and payment information.
              </p>
              <p className="text-[#475569]">
                We also collect information automatically through your use of our website, including
                IP address, browser type, and pages visited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">2. How We Use Your Information</h2>
              <p className="text-[#475569] mb-3">
                We use your information to process bookings, communicate with you about your trips,
                and provide customer support.
              </p>
              <p className="text-[#475569]">
                We may also use your information to send you marketing communications about our
                services, but only if you have opted in to receive such communications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">3. Data Security</h2>
              <p className="text-[#475569]">
                We implement appropriate security measures to protect your personal information from
                unauthorized access, alteration, disclosure, or destruction. All payment information
                is encrypted and processed securely.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">4. Sharing Your Information</h2>
              <p className="text-[#475569]">
                We do not sell your personal information to third parties. We may share your
                information with service providers who help us operate our business, but only to
                the extent necessary to provide those services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">5. Your Rights</h2>
              <p className="text-[#475569]">
                You have the right to access, correct, or delete your personal information at any
                time. You also have the right to opt out of marketing communications. To exercise
                these rights, please contact us at privacy@summitcoaches.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">6. Contact Us</h2>
              <p className="text-[#475569]">
                If you have any questions about this privacy policy, please contact us at
                privacy@summitcoaches.com or call us at +1 (555) 123-4567.
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
