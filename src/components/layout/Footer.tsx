"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Linkedin,
  Twitter
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/10 pt-12 pb-4">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et présentation */}
          <div>
            <div className="font-bold text-2xl text-primary mb-4">FINGEC</div>
            <p className="text-muted-foreground mb-6">
              Cabinet d'expertise comptable engagé à vos côtés pour vous accompagner dans la gestion et le développement de votre entreprise.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 p-0">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 p-0">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 p-0">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nos services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/notre-savoir-faire/comptabilite-gestion" className="text-muted-foreground hover:text-primary transition-colors">
                  Comptabilité et gestion
                </Link>
              </li>
              <li>
                <Link href="/notre-savoir-faire/conseil-juridique" className="text-muted-foreground hover:text-primary transition-colors">
                  Conseil et assistance juridique
                </Link>
              </li>
              <li>
                <Link href="/notre-savoir-faire/social" className="text-muted-foreground hover:text-primary transition-colors">
                  Social
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/nos-actualites" className="text-muted-foreground hover:text-primary transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/nous-rejoindre" className="text-muted-foreground hover:text-primary transition-colors">
                  Carrières
                </Link>
              </li>
              <li>
                <Link href="/nous-contacter" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-muted-foreground">
                  06 Rue Frédéric Chopin<br />67118 Geispolsheim, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">+33 9 83 00 08 43</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">expert@fingec.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-muted-foreground">
                  Lun - Ven: 9h00- 18h00<br />
                  Sam - Dim: Fermé
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>© {currentYear} FINGEC. Tous droits réservés.</div>
          <div className="mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors mr-4">
              Politique de confidentialité
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
