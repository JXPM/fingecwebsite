"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatbotWidget from "@/components/chat/ChatbotWidget";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Remove any extension-added classes during hydration
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  // Configuration des animations
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  };

  return (
    <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
      <Header />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            variants={pageVariants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={pageTransition}
            className="h-full" // Assure que l'animation couvre tout le contenu
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatbotWidget />
    </body>
  );
}