// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Header } from "@/components/layout/header"
// import { Footer } from "@/componennts/"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Mail, Lock, ArrowRight } from "lucide-react"
// import { api, API_ENDPOINTS } from "@/lib/api"
// import { useToast } from "@/hooks/use-toast"
// import { motion } from "framer-motion"

// export default function LoginPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   })
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const response = await api.post(API_ENDPOINTS.login, {
//         email: formData.email,
//         password: formData.password,
//       })

//       // Store auth token and user data
//       localStorage.setItem("auth_token", response.token)
//       localStorage.setItem("user", JSON.stringify(response.user))

//       toast({
//         title: "Login Successful",
//         description: "Welcome back to Summit Coaches!",
//       })

//       // Redirect to dashboard
//       router.push("/dashboard")
//     } catch (error) {
//       toast({
//         title: "Login Failed",
//         description: error instanceof Error ? error.message : "Invalid email or password",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <main className="flex-1 bg-gradient-to-br from-primary-light/30 to-white py-12">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mx-auto max-w-md"
//           >
//             <div className="mb-8 text-center">
//               <h1 className="mb-2 text-3xl font-bold text-secondary">Welcome Back</h1>
//               <p className="text-secondary-light">Login to manage your bookings</p>
//             </div>

//             <div className="rounded-2xl bg-white p-8 shadow-lg">
//               <form onSubmit={handleSubmit} className="space-y-6">
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
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="remember"
//                       checked={formData.remember}
//                       onCheckedChange={(checked) => setFormData({ ...formData, remember: checked as boolean })}
//                     />
//                     <Label htmlFor="remember" className="cursor-pointer text-sm font-normal">
//                       Remember me
//                     </Label>
//                   </div>
//                   <Link href="/forgot-password" className="text-sm text-primary hover:underline">
//                     Forgot password?
//                   </Link>
//                 </div>

//                 <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
//                   {isLoading ? "Logging in..." : "Login"}
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </form>

//               <div className="mt-6 text-center text-sm">
//                 <span className="text-secondary-light">Don't have an account? </span>
//                 <Link href="/register" className="font-medium text-primary hover:underline">
//                   Sign up
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }
