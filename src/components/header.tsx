"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-semibold text-emerald-600">
                MundoChef
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/browse"
              className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            >
              Browse
            </Link>
            <Link
              href="/meal-plan"
              className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            >
              Meal Plans
            </Link>
            <Link
              href="/onboarding"
              className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            >
              Preferences
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search recipes..."
                className="w-[200px] lg:w-[300px]"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <ThemeToggle />
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 hidden md:inline-flex"
              size="sm"
            >
              <Link href="/onboarding">Get Meal Plan</Link>
            </Button>
            <Button
              variant="ghost"
              className="md:hidden"
              size="icon"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t mt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/browse"
                className="px-3 py-2 text-gray-700 hover:text-emerald-600"
              >
                Browse
              </Link>
              <Link
                href="/meal-plan"
                className="px-3 py-2 text-gray-700 hover:text-emerald-600"
              >
                Meal Plans
              </Link>
              <Link
                href="/onboarding"
                className="px-3 py-2 text-gray-700 hover:text-emerald-600"
              >
                Preferences
              </Link>
              <div className="relative mt-2">
                <Input
                  type="search"
                  placeholder="Search recipes..."
                  className="w-full"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 mt-2">
                <Link href="/onboarding">Get Meal Plan</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
