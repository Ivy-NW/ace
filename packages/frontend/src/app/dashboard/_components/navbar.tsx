import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  House,
  ShoppingBag,
  Heart,
  LayoutDashboard,
} from "lucide-react";

// Color System - Blending both designs
const COLORS = {
  primary: {
    main: "#7B42FF",
    light: "#8A2BE2",
    dark: "#4A00E0",
  },
  secondary: {
    main: "#00FFD1",
    light: "#00FFFF",
    dark: "#00E6BD",
  },
  accent: {
    pink: "#FF00FF",
    red: "#FF1B6B",
  },
  background: {
    dark: "#1A0B3B",
    light: "#2A1B54",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    muted: "rgba(255, 255, 255, 0.5)",
  },
  glass: {
    background: "rgba(42, 27, 84, 0.2)",
    border: "rgba(123, 66, 255, 0.1)",
  },
};

interface NavLink {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navLinks: NavLink[] = [
    { name: "Home", icon: <House className="w-5 h-5" />, path: "../../" },
    { name: "Shop", icon: <ShoppingBag className="w-5 h-5" />, path: "../../marketplace" },
    { name: "Donate", icon: <Heart className="w-5 h-5" />, path: "../../donate" },
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "../../dashboard" },
  ];

  return (
    <>
      <style jsx>{`
        .navbar {
          background: ${scrolled ? 'rgba(26, 11, 59, 0.85)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(16px)' : 'none'};
          border-bottom: 1px solid ${scrolled ? 'rgba(123, 66, 255, 0.1)' : 'transparent'};
          transition: all 0.3s ease;
        }

        .logo-container {
          position: relative;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-container:hover {
          transform: translateY(-2px);
        }

        .logo-glow {
          position: absolute;
          inset: -8px;
          background: linear-gradient(to right, ${COLORS.primary.main}, ${COLORS.secondary.main});
          opacity: 0;
          border-radius: 12px;
          filter: blur(12px);
          transition: opacity 0.5s ease;
        }

        .logo-container:hover .logo-glow {
          opacity: 0.6;
        }

        .logo-text {
          background: linear-gradient(to right, ${COLORS.secondary.main}, ${COLORS.primary.light});
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transition: all 0.3s ease;
        }

        .nav-link {
          position: relative;
          color: ${COLORS.text.primary};
          transition: all 0.3s ease;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link:hover {
          color: ${COLORS.secondary.main};
          background: rgba(0, 255, 209, 0.1);
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(to right, ${COLORS.secondary.main}, ${COLORS.primary.main});
          transition: width 0.3s ease;
        }

        .nav-link:hover::before {
          width: 80%;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, ${COLORS.secondary.main}10, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover::after {
          opacity: 0.4;
        }

        .nav-icon {
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .nav-link:hover .nav-icon {
          transform: scale(1.2);
          color: ${COLORS.secondary.main};
        }

        .connect-button-wrapper {
          position: relative;
          z-index: 10;
        }

        .connect-button-glow {
          position: absolute;
          inset: -4px;
          background: linear-gradient(to right, ${COLORS.secondary.main}, ${COLORS.primary.main});
          opacity: 0;
          border-radius: 12px;
          filter: blur(8px);
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .connect-button-wrapper:hover .connect-button-glow {
          opacity: 0.6;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }

        .pulse-effect {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        :global(.rainbow-kit-connect-button) {
          background: rgba(42, 27, 84, 0.4) !important;
          backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(123, 66, 255, 0.2) !important;
          transition: all 0.3s ease !important;
          color: white !important;
        }

        :global(.rainbow-kit-connect-button:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 16px rgba(123, 66, 255, 0.3) !important;
          border: 1px solid rgba(0, 255, 209, 0.4) !important;
        }
      `}</style>

      <nav className={`navbar sticky top-0 z-50 py-4`}>
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="logo-container flex items-center cursor-pointer">
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center"
            >
              <div className="logo-glow" />
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-lg blur-md pulse-effect"></div>
                <Image
                  src="/my-business-name-high-resolution-logo-transparent.png"
                  alt="Ace Logo"
                  width={45}
                  height={45}
                  className="rounded-lg relative z-10"
                  priority
                />
              </div>
              <h1 className="logo-text text-2xl font-bold ml-2">
                Ace
              </h1>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} className="nav-link-container">
                <motion.div
                  className="nav-link"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="nav-icon">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Connect Button */}
          <motion.div 
            className="connect-button-wrapper"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="connect-button-glow"></div>
            <ConnectButton 
              accountStatus="avatar"
              chainStatus="icon"
              showBalance={false}
            />
          </motion.div>
        </div>

        {/* Mobile Menu - Shown on small screens */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1A0B3B]/90 backdrop-blur-lg border-t border-[#7B42FF]/20 py-3 px-6">
          <div className="flex justify-between items-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} className="flex flex-col items-center space-y-1">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#2A1B54]/80 flex items-center justify-center"
                >
                  {link.icon}
                </motion.div>
                <span className="text-xs text-white/80">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;