"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
        ? "bg-white shadow-md py-2"
        : "bg-white/95 py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between px-0 w-full max-w-full">
        {/* FINGEC Title - Left Section */}
        <div className="flex flex-col items-start pl-9">
          <div className="font-bold text-5xl text-primary tracking-tighter">
            FINGEC
          </div>
          <div className="text-xs text-secondary hidden md:block">
            Ordre des experts comptables d'Alsace
          </div>
        </div>
        
        {/* Navigation - Centered Section */}
        <div className="hidden md:flex flex-1 items-center justify-center mx-4">
          <Navigation />
        </div>

        {/* Logo - Right Section */}
        <div className="flex items-center pr-9">
          <div className="hidden md:block">
            <Button asChild variant="default" size="sm" className="mr-4">
              <Link href="/nous-contacter">
                Prendre RDV
              </Link>
            </Button>
          </div>
          <Link href="/" className="relative flex items-center">
            <div className="w-12 h-12 bg-primary/10  flex items-center justify-center">
              <Image src="/images/Fingec-Logo-Final-Fond-Blanc LOGO.jpg" alt="FINGEC Logo" width={40} height={40} />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button - Right Section (Mobile only) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;