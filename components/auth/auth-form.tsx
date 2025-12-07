"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { api, API_ENDPOINTS } from "@/lib/api"
import { LoginPayload, RegisterPayload, AuthResponse } from "@/lib/types"

const loginSchema = z.object({
    input: z.string().min(1, "Email or phone is required"),
    password: z.string().min(1, "Password is required"),
})

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
    address: z.string().optional(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
})

interface AuthFormProps {
    onSuccess: (user: any) => void
}

export function AuthForm({ onSuccess }: AuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            input: "",
            password: "",
        },
    })

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
            address: "",
        },
    })


const onLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    setError("")
    try {
        // ✅ Backend expects 'login' field which can be email or phone
        const payload: LoginPayload = {
            login: values.input,
            password: values.password,
        };

        console.log('🔐 Login payload:', payload) // Debug log

        const response = await api.post<AuthResponse>(API_ENDPOINTS.login, payload)

        console.log('✅ Login response:', response) // Debug log

        if (response.success && response.token) {
            // Store token
            if (typeof window !== "undefined") {
                localStorage.setItem("auth_token", response.token)
            }
            onSuccess(response.user)
        } else {
            setError(response.message || "Login failed")
        }
    } catch (err: any) {
        console.error('❌ Login error:', err)
        setError(err.message || "An error occurred during login")
    } finally {
        setIsLoading(false)
    }
}

    const onRegister = async (values: z.infer<typeof registerSchema>) => {
        setIsLoading(true)
        setError("")
        console.log("Submitting registration:", values);
        try {
            const payload: RegisterPayload = {
                ...values,
            }
            const response = await api.post<AuthResponse>(API_ENDPOINTS.register, payload)
            console.log("Registration success:", response);
            if (response.success) {
                if (response.token) {
                    if (typeof window !== "undefined") {
                        localStorage.setItem("auth_token", response.token)
                    }
                    onSuccess(response.user)
                } else {
                    // Try to auto-login to skip verification step if possible
                    try {
                        const loginRes = await api.post<AuthResponse>(API_ENDPOINTS.login, {
                            input: values.email,
                            password: values.password
                        })
                        if (loginRes.success && loginRes.token) {
                            if (typeof window !== "undefined") {
                                localStorage.setItem("auth_token", loginRes.token)
                            }
                            onSuccess(loginRes.user)
                            return
                        }
                    } catch (e) {
                        console.error("Auto-login failed:", e)
                    }

                    setError("Account created! Please check your email to verify.")
                }
            } else {
                console.log("Registration failed response:", response);
                setError(response.message || "Registration failed")

                if ((response as any).errors) {
                    const apiErrors = (response as any).errors;
                    if (apiErrors.email) registerForm.setError("email", { message: apiErrors.email[0] });
                    if (apiErrors.phone) registerForm.setError("phone", { message: apiErrors.phone[0] });
                    if (apiErrors.password) registerForm.setError("password", { message: apiErrors.password[0] });
                }
            }
        } catch (err: any) {
            console.error("Registration error caught:", err);
            const apiErrors = err.response?.data?.errors || err.errors;
            console.log("Parsed API Errors:", apiErrors);

            if (apiErrors) {
                if (apiErrors.email) registerForm.setError("email", { message: apiErrors.email[0] });
                if (apiErrors.phone) registerForm.setError("phone", { message: apiErrors.phone[0] });
                if (apiErrors.password) registerForm.setError("password", { message: apiErrors.password[0] });
                setError("Please fix the errors below.")
            } else {
                setError(err.message || "An error occurred during registration")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold text-center mb-6">Welcome to Summit Coaches</h2>

            {
                error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                        {error}
                    </div>
                )
            }

            <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                            <FormField
                                control={loginForm.control}
                                name="input"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email or Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email or phone" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Login
                            </Button>
                        </form>
                    </Form>
                </TabsContent>

                <TabsContent value="register">
                    <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                            <FormField
                                control={registerForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0770000000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Kampala Road" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={registerForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="******" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={registerForm.control}
                                    name="password_confirmation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="******" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Create Account
                            </Button>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>
        </div >
    )
}
