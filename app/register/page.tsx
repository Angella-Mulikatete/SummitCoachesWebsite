// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react"
// import { api, API_ENDPOINTS } from "@/lib/api"
// import { useToast } from "@/hooks/use-toast"
// import { motion } from "framer-motion"

// export default function RegisterPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     agreeToTerms: false,
//   })
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (formData.password !== formData.confirmPassword) {
//       toast({
//         title: "Password Mismatch",
//         description: "Passwords do not match",
//         variant: "destructive",
//       })
//       return
//     }

//     if (!formData.agreeToTerms) {
//       toast({
//         title: "Terms Required",
//         description: "Please agree to the terms and conditions",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsLoading(true)

//     try {
//       const response = await api.post(API_ENDPOINTS.register, {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//       })

//       // Store auth token and user data
//       localStorage.setItem("auth_token", response.token)
//       localStorage.setItem("user", JSON.stringify(response.user))

//       toast({
//         title: "Registration Successful",
//         description: "Welcome to Summit Coaches!",
//       })

//       // Redirect to dashboard
//       router.push("/dashboard")
//     } catch (error) {
//       toast({
//         title: "Registration Failed",
//         description: error instanceof Error ? error.message : "Please try again later",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="flex-1 bg-gradient-to-br from-primary-light/30 to-white py-12">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mx-auto max-w-md"
//           >
//             <div className="mb-8 text-center">
//               <h1 className="mb-2 text-3xl font-bold text-secondary">Create Account</h1>
//               <p className="text-secondary-light">Join Summit Coaches today</p>
//             </div>

//             <div className="rounded-2xl bg-white p-8 shadow-lg">
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="name"
//                       placeholder="John Doe"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="your@email.com"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="phone"
//                       type="tel"
//                       placeholder="+256 700 000 000"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={formData.password}
//                       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                       className="pl-10"
//                       required
//                       minLength={8}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword">Confirm Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="confirmPassword"
//                       type="password"
//                       placeholder="••••••••"
//                       value={formData.confirmPassword}
//                       onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                       className="pl-10"
//                       required
//                       minLength={8}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-2">
//                   <Checkbox
//                     id="terms"
//                     checked={formData.agreeToTerms}
//                     onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
//                   />
//                   <Label htmlFor="terms" className="cursor-pointer text-sm font-normal leading-relaxed">
//                     I agree to the{" "}
//                     <Link href="/terms" className="text-primary hover:underline">
//                       Terms and Conditions
//                     </Link>{" "}
//                     and{" "}
//                     <Link href="/terms" className="text-primary hover:underline">
//                       Privacy Policy
//                     </Link>
//                   </Label>
//                 </div>

//                 <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
//                   {isLoading ? "Creating account..." : "Create Account"}
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </form>

//               <div className="mt-6 text-center text-sm">
//                 <span className="text-secondary-light">Already have an account? </span>
//                 <Link href="/" className="font-medium text-primary hover:underline">
//                   Login
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </main>
   
//     </div>
//   )
// }
