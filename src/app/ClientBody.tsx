"use client";

import { useEffect, useState } from "react";
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
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Remove any extension-added classes during hydration
  useEffect(() => {
    document.body.className = "antialiased";
    
    // Ne pas animer lors du premier chargement
    setIsFirstMount(false);
  }, []);

  // Variantes d'animation différentes selon le type de page
  const getPageVariants = () => {
    // Animation spécifique pour la page d'accueil
    if (pathname === "/") {
      return {
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    
    // Animation pour les pages de services
    if (pathname.includes("/notre-savoir-faire")) {
      return {
        hidden: { opacity: 0, x: 100 },
        enter: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
      };
    }
    
    // Animation pour les pages de contact
    if (pathname.includes("/nous-contacter")) {
      return {
        hidden: { opacity: 0, scale: 0.95 },
        enter: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.05 },
      };
    }
    
    // Animation par défaut pour les autres pages
    return {
      hidden: { opacity: 0, y: 30 },
      enter: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -30 },
    };
  };

  // Transitions personnalisées selon le type de page
  const getPageTransition = () => {
    if (pathname === "/") {
      return {
        type: "tween",
        ease: "easeOut",
        duration: 0.7,
      };
    }
    
    return {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.5,
    };
  };

  return (
    <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
      <Header />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait" initial={isFirstMount}>
          <motion.div
            key={pathname}
            variants={getPageVariants()}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={getPageTransition()}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      
      {/* Le ChatbotWidget pourrait bénéficier de sa propre animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChatbotWidget />
      </motion.div>
      
      {/* Overlay de transition (optionnel) */}
      <AnimatePresence>
        {pathname !== "/" && (
          <motion.div
            key="overlay"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ 
              position: "fixed", 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: "var(--primary)",
              transformOrigin: "right",
              zIndex: 9999,
              pointerEvents: "none"
            }}
          />
        )}
      </AnimatePresence>
    </body>
  );
}