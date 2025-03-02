"use client";
import React from "react";
import Link from "next/link";
import Navbar from "./navbar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Home, Wallet, Shirt, Heart, Settings } from "lucide-react";

// Enhanced Color System with Darker Tones
const COLORS = {
  primary: {
    main: "#5B32BF", // Darker purple
    light: "#6A1BB2", // Darker violet
    dark: "#3A00B0", // Deeper dark purple
    gradient: "rgba(91, 50, 191, 0.15)",
  },
  secondary: {
    main: "#00D1B1", // Darker teal
    light: "#00CCCC", // Darker cyan
    dark: "#00B69D", // Deeper teal
    gradient: "rgba(0, 209, 177, 0.15)",
  },
  accent: {
    pink: "#CC00CC", // Darker magenta
    red: "#CC154B", // Darker crimson
    pinkGradient: "rgba(204, 0, 204, 0.15)",
    redGradient: "rgba(204, 21, 75, 0.15)",
  },
  background: {
    dark: "#0F061F", // Much darker purple-black
    light: "#1A0F34", // Darker purple background
    glass: "rgba(26, 15, 52, 0.25)",
  },
  text: {
    primary: "#E6E6E6", // Slightly dimmer white
    secondary: "rgba(230, 230, 230, 0.7)",
    muted: "rgba(230, 230, 230, 0.5)",
  },
  glass: {
    background: "rgba(26, 15, 52, 0.2)",
    border: "rgba(91, 50, 191, 0.1)",
    highlight: "rgba(230, 230, 230, 0.05)",
    shadow: "rgba(0, 0, 0, 0.3)", // Darker shadow
  },
};

// Enhanced Styles Object
const styles = {
  glassCard: `
    backdrop-blur-md
    bg-[${COLORS.glass.background}]
    border border-[${COLORS.glass.border}]
    rounded-xl
    overflow-hidden
    transition-all duration-300
    hover:shadow-[0_8px_32px_${COLORS.primary.main}1A]
  `,
  glassEffect: `
    backdrop-blur-lg
    bg-[${COLORS.glass.background}]
    border border-[${COLORS.glass.border}]
    rounded-lg
  `,
  backgroundGradient: `
    bg-gradient-to-b from-[${COLORS.background.light}] to-[${COLORS.background.dark}]
    relative
  `,
  gradientText: `
    bg-clip-text text-transparent 
    bg-gradient-to-r from-[${COLORS.secondary.main}] via-[${COLORS.primary.main}] to-[${COLORS.accent.pink}]
    animate-gradient
  `,
};

// Global Styles
const GlobalStyles = `
  :root {
    --primary-main: ${COLORS.primary.main};
    --primary-light: ${COLORS.primary.light};
    --primary-dark: ${COLORS.primary.dark};
    --secondary-main: ${COLORS.secondary.main};
    --secondary-light: ${COLORS.secondary.light};
    --secondary-dark: ${COLORS.secondary.dark};
    --background-dark: ${COLORS.background.dark};
    --background-light: ${COLORS.background.light};
  }

  body {
    background: var(--background-dark);
    color: ${COLORS.text.primary};
  }

  .glass-card {
    background: ${COLORS.glass.background};
    backdrop-filter: blur(16px);
    border: 1px solid ${COLORS.glass.border};
    box-shadow: 0 8px 32px ${COLORS.primary.main}1A;
  }

  .glass-card:hover {
    background: rgba(26, 15, 52, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 12px 40px ${COLORS.primary.main}26;
  }

  @keyframes pulse {
    0%, 100% { opacity: var(--tw-opacity); }
    50% { opacity: calc(var(--tw-opacity) * 0.5); }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient {
    background-size: 200% auto;
    animation: gradient 10s ease infinite;
  }

  .animate-pulse {
    animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

// Background Elements Component
const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 ${styles.backgroundGradient}`} />

      {/* Ambient Glows - Darker and More Subtle */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#CC00CC] rounded-full filter blur-[150px] opacity-[0.10] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5B32BF] rounded-full filter blur-[180px] opacity-[0.08] animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-[#00CCCC] rounded-full filter blur-[130px] opacity-[0.07] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#CC154B] rounded-full filter blur-[160px] opacity-[0.06] animate-pulse" />
    </div>
  );
};

// Navigation Items
const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/thrift", label: "Thrift Tokens", icon: Wallet },
  { href: "/dashboard/manage-clothes", label: "Manage Clothes", icon: Shirt },
  {
    href: "/dashboard/manage-donation",
    label: "Donation Centers",
    icon: Heart,
  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

// Glass Card Component
const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-xl
        backdrop-blur-xl
        ${className}
      `}
      style={{
        background: `linear-gradient(135deg, ${COLORS.glass.background} 0%, ${COLORS.glass.highlight} 50%, ${COLORS.glass.background} 100%)`,
        borderTop: `1px solid ${COLORS.glass.highlight}`,
        borderLeft: `1px solid ${COLORS.glass.highlight}`,
        boxShadow: `0 6px 8px -1px ${COLORS.glass.shadow}, 0 4px 6px -1px ${COLORS.glass.shadow}`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// SideNav Component
function SideNav() {
  return (
    <GlassCard className="h-[calc(100vh-64px)] p-6">
      {/* Navigation Links */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <motion.div whileHover={{ x: 5 }} className="relative group">
              <div
                className={`
                flex items-center gap-3
                px-4 py-3
                rounded-lg
                text-[${COLORS.text.secondary}]
                hover:text-white
                transition-all duration-300
                hover:bg-[${COLORS.primary.main}]/10
              `}
              >
                <item.icon size={20} />
                <span>{item.label}</span>

                {/* Hover Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg"
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.primary.gradient}, transparent)`,
                  }}
                  initial={{ x: -100 }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          </Link>
        ))}
      </nav>
    </GlassCard>
  );
}

// Main Dashboard Layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <style jsx global>
        {GlobalStyles}
      </style>
      <div className={`min-h-screen ${styles.backgroundGradient}`}>
        <BackgroundElements />

        <div className="relative z-10">
          {/* Top Navigation */}
          <Navbar />

          <div className="flex">
            {/* Sidebar */}
            <aside className="fixed top-16 bottom-0 w-64 hidden md:block p-4">
              <SideNav />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard className="p-6">
                    {/* Main Content */}
                    <div className="relative">{children}</div>
                  </GlassCard>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}