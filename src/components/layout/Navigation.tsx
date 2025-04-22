"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/") ? "bg-muted" : ""
              )}
            >
              Accueil
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={isActive("/notre-savoir-faire") ? "bg-muted" : ""}>
            Notre savoir-faire
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
              <ListItem
                href="/notre-savoir-faire/comptabilite-gestion"
                title="Comptabilité et gestion"
                isActive={isActive("/notre-savoir-faire/comptabilite-gestion")}
              >
                Services de comptabilité et solutions de gestion pour votre entreprise.
              </ListItem>
              <ListItem
                href="/notre-savoir-faire/conseil-juridique"
                title="Conseil et assistance juridique"
                isActive={isActive("/notre-savoir-faire/conseil-juridique")}
              >
                Conseil juridique et assistance dans vos démarches administratives.
              </ListItem>
              <ListItem
                href="/notre-savoir-faire/social"
                title="Social"
                isActive={isActive("/notre-savoir-faire/social")}
              >
                Gestion des ressources humaines et des aspects sociaux de votre entreprise.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={isActive("/nos-actualites") ? "bg-muted" : ""}>
            Nos actualités
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
              <ListItem
                href="/nos-actualites/vie-du-cabinet"
                title="Vie du cabinet"
                isActive={isActive("/nos-actualites/vie-du-cabinet")}
              >
                Suivez l'actualité et les événements de notre cabinet.
              </ListItem>
              <ListItem
                href="/nos-actualites/base-de-documentation"
                title="Base de documentation"
                isActive={isActive("/nos-actualites/base-de-documentation")}
              >
                Ressources et documentation pour vous accompagner.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/nous-rejoindre" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/nous-rejoindre") ? "bg-muted" : ""
              )}
            >
              Nous rejoindre
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/nous-contacter" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/nous-contacter") ? "bg-muted" : ""
              )}
            >
              Nous contacter
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/outils-liens" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/outils-liens") ? "bg-muted" : ""
              )}
            >
              Outils & Liens utiles
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
  isActive?: boolean;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, isActive, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              isActive ? "bg-accent" : "",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
) as React.FunctionComponent<ListItemProps> & { displayName?: string };

ListItem.displayName = "ListItem";

export default Navigation;
