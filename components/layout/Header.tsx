'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bus, Menu, X, User, LogOut, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { authStorage } from '@/lib/auth';
import { useLogout, useAccount } from '@/hooks/use-api';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const logoutMutation = useLogout();
  const { data: account } = useAccount();

  useEffect(() => {
    setIsAuthenticated(authStorage.isAuthenticated());

    // Listen for storage changes to update auth state
    const handleStorageChange = () => {
      setIsAuthenticated(authStorage.isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Trips', href: '/trips' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Bus className="h-8 w-8 text-[#0ea5e9]" />
            </motion.div>
            <span className="text-xl font-bold text-[#1e293b]">Summit Coaches</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-[#1e293b] hover:text-[#0ea5e9] transition-colors font-medium"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Authentication Navigation */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white">
                      {account?.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-medium text-[#1e293b]">
                      {account?.name || 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/bookings" className="cursor-pointer">
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#e0f2fe] font-semibold"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1e293b]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#1e293b] hover:text-[#0ea5e9] transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Authentication Links */}
            <div className="border-t border-gray-200 mt-2 pt-2 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account/bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-[#1e293b] hover:text-[#0ea5e9] transition-colors"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-[#1e293b] hover:text-[#0ea5e9] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-[#0ea5e9] font-medium hover:text-[#0284c7] transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
