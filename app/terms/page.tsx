// "use client"

// import { Header } from "@/components/layout/header"
// import { Footer } from "@/components/layout/footer"
// import useSWR from "swr"
// import { API_ENDPOINTS } from "@/lib/api"
// import type { DynamicContent } from "@/lib/types"
// import { motion } from "framer-motion"
// import { format } from "date-fns"

// export default function TermsPage() {
//   const { data: content, isLoading } = useSWR<DynamicContent>(API_ENDPOINTS.terms)

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-br from-primary-light/30 to-white py-16 md:py-24">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mx-auto max-w-3xl text-center"
//             >
//               <h1 className="mb-6 text-balance text-4xl font-bold text-secondary md:text-5xl">Terms & Conditions</h1>
//               <p className="text-pretty text-lg leading-relaxed text-secondary-light">
//                 Please read these terms carefully before using our services
//               </p>
//               {content?.updatedAt && (
//                 <p className="mt-4 text-sm text-muted-foreground">
//                   Last updated: {format(new Date(content.updatedAt), "MMMM dd, yyyy")}
//                 </p>
//               )}
//             </motion.div>
//           </div>
//         </section>

//         {/* Content Section */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             {isLoading ? (
//               <div className="mx-auto max-w-4xl animate-pulse space-y-4">
//                 <div className="h-6 w-3/4 rounded bg-muted" />
//                 <div className="h-4 w-full rounded bg-muted" />
//                 <div className="h-4 w-5/6 rounded bg-muted" />
//                 <div className="h-4 w-full rounded bg-muted" />
//                 <div className="h-4 w-4/5 rounded bg-muted" />
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="prose prose-lg mx-auto max-w-4xl"
//               >
//                 <div
//                   className="leading-relaxed text-secondary-light"
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       content?.content ||
//                       `
//                     <h2>1. Booking and Payment</h2>
//                     <p>All bookings made through our website are subject to confirmation. Payment must be made at our office before departure.</p>
                    
//                     <h2>2. Cancellation Policy</h2>
//                     <p>Cancellations made 24 hours before departure are eligible for a full refund. Cancellations made less than 24 hours before departure will incur a 50% cancellation fee.</p>
                    
//                     <h2>3. Passenger Responsibilities</h2>
//                     <p>Passengers must arrive at least 30 minutes before departure time. Valid identification must be presented when boarding.</p>
                    
//                     <h2>4. Luggage Policy</h2>
//                     <p>Each passenger is allowed one piece of luggage up to 20kg. Additional luggage will be charged according to our pricing policy.</p>
                    
//                     <h2>5. Safety and Conduct</h2>
//                     <p>Passengers must comply with all safety regulations and instructions from our staff. Disruptive behavior may result in removal from the bus without refund.</p>
                    
//                     <h2>6. Liability</h2>
//                     <p>Summit Coaches is not liable for delays caused by circumstances beyond our control, including weather, traffic, or mechanical issues.</p>
                    
//                     <h2>7. Changes to Terms</h2>
//                     <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.</p>
//                   `,
//                   }}
//                 />
//               </motion.div>
//             )}
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }
