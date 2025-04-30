"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  FileText,
  LineChart,
  UserCheck,
  ClipboardCheck,
  Calculator,
  ArrowRight
} from "lucide-react";

// Composant pour les animations basées sur l'intersection observer
type AnimationType = "fade" | "slideRight" | "slideLeft" | "slideUp" | "zoomIn";

function AnimatedSection({ children, className, animation = "fade" }: { children: React.ReactNode; className?: string; animation?: AnimationType }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animations = {
    fade: "opacity-0 transition-opacity duration-1000 ease-in-out",
    slideRight: "opacity-0 -translate-x-10 transition-all duration-1000 ease-out",
    slideLeft: "opacity-0 translate-x-10 transition-all duration-1000 ease-out",
    slideUp: "opacity-0 translate-y-10 transition-all duration-1000 ease-out", 
    zoomIn: "opacity-0 scale-95 transition-all duration-1000 ease-out",
  };

  return (
    <div
      ref={ref}
      className={`${className} ${animations[animation]} ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default function Social() {
  return (
    <>
      {/* Hero Section */}
      <AnimatedSection animation="fade" className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Social</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe d'experts en gestion sociale vous accompagne dans toutes
              vos démarches liées aux ressources humaines et à la paie.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Services principaux */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <AnimatedSection animation="slideRight">
              <h2 className="heading-secondary mb-6">Gestion de la paie</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nous prenons en charge l'ensemble de vos obligations sociales liées
                à la paie, vous permettant de vous concentrer sur votre activité.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Bulletins de paie</h3>
                    <p className="text-muted-foreground">Établissement des bulletins de paie conformes à la législation en vigueur</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Déclarations sociales</h3>
                    <p className="text-muted-foreground">Déclaration sociale nominative (DSN), déclarations Urssaf, retraite, prévoyance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Charges sociales</h3>
                    <p className="text-muted-foreground">Calcul et vérification des charges sociales, optimisation des coûts</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideLeft" className="relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <Image
                    src="/images/paie.jpg"
                    alt="Image de gestion de la paie"
                    className="object-cover w-full h-full rounded-lg"
                    priority
                    fill
                    quality={90}
                />
              </div>
            </AnimatedSection>
          </div>

          <Separator className="my-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slideRight" className="order-2 md:order-1 relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Image
                    src="/images/RH.jpg"
                    alt="Image de gestion des ressources humaines"
                    className="object-cover w-full h-full rounded-lg"
                    priority
                    fill
                    quality={90}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideLeft" className="order-1 md:order-2">
              <h2 className="heading-secondary mb-6">Gestion des ressources humaines</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nous vous accompagnons dans la gestion administrative de vos ressources
                humaines pour une relation employeur-salarié optimale.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <UserCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Contrats de travail</h3>
                    <p className="text-muted-foreground">Rédaction, modification et rupture des contrats de travail</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Obligations légales</h3>
                    <p className="text-muted-foreground">Registre du personnel, affichages obligatoires, règlement intérieur</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Gestion des absences</h3>
                    <p className="text-muted-foreground">Suivi des congés, arrêts maladie, accidents du travail</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <AnimatedSection animation="slideUp" className="py-20 bg-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Nos services en détail</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez l'ensemble de nos services dédiés à la gestion sociale et
              aux ressources humaines de votre entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Service 1 */}
            <AnimatedSection animation="zoomIn" className="delay-100">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Gestion complète de la paie</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Établissement des bulletins de paie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Déclarations sociales (DSN)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Solde de tout compte</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Attestations diverses</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Service 2 */}
            <AnimatedSection animation="zoomIn" className="delay-300">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Administration du personnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Rédaction des contrats de travail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Gestion des entrées et sorties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Suivi des périodes d'essai</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Procédures disciplinaires</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Service 3 */}
            <AnimatedSection animation="zoomIn" className="delay-500">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ClipboardCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Conseil social</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Veille juridique et sociale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Audit de conformité sociale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Optimisation des charges sociales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Accompagnement contrôle Urssaf</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Avantages */}
      <AnimatedSection animation="slideUp" className="py-20 mb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-secondary text-center mb-12">Pourquoi externaliser votre gestion sociale ?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection animation="slideUp" className="delay-100">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <ClipboardCheck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Conformité garantie</h3>
                        <p className="text-muted-foreground">
                          Assurez-vous du respect des obligations légales et
                          réglementaires en constante évolution.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" className="delay-200">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Calculator className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Maîtrise des coûts</h3>
                        <p className="text-muted-foreground">
                          Réduisez vos coûts administratifs et bénéficiez d'un
                          service adapté à vos besoins.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" className="delay-300">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <LineChart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Gain de temps</h3>
                        <p className="text-muted-foreground">
                          Concentrez-vous sur votre cœur de métier en déléguant
                          les tâches administratives chronophages.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" className="delay-400">
                <Card className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Expertise dédiée</h3>
                        <p className="text-muted-foreground">
                          Bénéficiez de l'expertise de professionnels spécialisés
                          dans le domaine social et RH.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection animation="fade" className="py-16 bg-complementary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Simplifiez votre gestion sociale</h2>
            <p className="mb-8">
              Contactez nos experts pour un accompagnement personnalisé et adapté
              aux besoins spécifiques de votre entreprise.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link href="/nous-contacter">
                Prendre rendez-vous
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}