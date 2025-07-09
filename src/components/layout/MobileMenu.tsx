"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  onClose?: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleHeaderClick = () => {
    console.log("Header cliqué !");
    router.push("/");
    if (onClose) {
      onClose();
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="flex flex-col h-full py-6 px-4">
      {/* Header avec logo cliquable */}
      <div 
        onClick={handleHeaderClick}
        className="flex flex-col items-center mb-8 cursor-pointer hover:opacity-80 transition-opacity select-none active:scale-95"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleHeaderClick();
          }
        }}
      >
        <div className="text-2xl font-bold text-primary">FINGEC</div>
        <div className="text-sm text-secondary">Ordre des experts comptables d'Alsace</div>
        
        {/* Logo placeholder */}
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mt-4">
          {/* Replace with actual logo */}
          {/* <Image src="/path/to/logo.png" alt="FINGEC Logo" width={56} height={56} /> */}
          <span className="text-primary font-bold text-2xl">F</span>
        </div>
      </div>

      <nav className="space-y-2">
        <Link
          href="/"
          className={cn(
            "block py-2 px-3 rounded-md transition-colors",
            isActive("/")
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted"
          )}
          onClick={onClose}
        >
          Accueil
        </Link>

        {/* Notre savoir-faire */}
        <div>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between py-2 px-3",
              isActive("/notre-savoir-faire")
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-muted"
            )}
            onClick={() => toggleSubmenu("savoir-faire")}
          >
            Notre savoir-faire
            {openSubmenu === "savoir-faire" ? (
              <ChevronDown className="h-4 w-4 ml-2" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-2" />
            )}
          </Button>

          {openSubmenu === "savoir-faire" && (
            <div className="pl-4 space-y-2 mt-2">
              <Link
                href="/notre-savoir-faire/comptabilite-gestion"
                className={cn(
                  "block py-2 px-3 rounded-md transition-colors",
                  isActive("/notre-savoir-faire/comptabilite-gestion")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted"
                )}
                onClick={onClose}
              >
                Comptabilité et gestion
              </Link>
              <Link
                href="/notre-savoir-faire/conseil-juridique"
                className={cn(
                  "block py-2 px-3 rounded-md transition-colors",
                  isActive("/notre-savoir-faire/conseil-juridique")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted"
                )}
                onClick={onClose}
              >
                Conseil et assistance juridique
              </Link>
              <Link
                href="/notre-savoir-faire/social"
                className={cn(
                  "block py-2 px-3 rounded-md transition-colors",
                  isActive("/notre-savoir-faire/social")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted"
                )}
                onClick={onClose}
              >
                Social
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/nos-actualites/base-de-documentation"
          className={cn(
            "block py-2 px-3 rounded-md transition-colors",
            isActive("nos-actualites/base-de-documentation")
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted"
          )}
          onClick={onClose}
        >
          Actualités fiscales & sociales
        </Link>

        <Link
          href="/nous-rejoindre"
          className={cn(
            "block py-2 px-3 rounded-md transition-colors",
            isActive("/nous-rejoindre")
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted"
          )}
          onClick={onClose}
        >
          Nous rejoindre
        </Link>

        <Link
          href="/nous-contacter"
          className={cn(
            "block py-2 px-3 rounded-md transition-colors",
            isActive("/nous-contacter")
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted"
          )}
          onClick={onClose}
        >
          Nous contacter
        </Link>
        
        <Link
          href="/outils-liens"
          className={cn(
            "block py-2 px-3 rounded-md transition-colors",
            isActive("/outils-liens")
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted"
          )}
          onClick={onClose}
        >
          Outils & Liens utiles
        </Link>
      </nav>

      <div className="mt-auto pt-6">
        <Button asChild variant="default" className="w-full">
          <Link href="/nous-contacter" onClick={onClose}>
            Prendre rendez-vous
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;