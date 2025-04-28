"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  FileCheck, 
  PieChart, 
  Calculator, 
  BarChart, 
  FileText, 
  ArrowRight 
} from "lucide-react";
import Image from "next/image";

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

export default function ComptabiliteGestion() {
  return (
    <>
      {/* Hero Section */}
      <AnimatedSection animation="fade" className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Comptabilité et Gestion</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe d'experts-comptables vous accompagne pour une gestion 
              optimale de votre comptabilité et de vos finances d'entreprise.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Services principaux */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <AnimatedSection animation="slideRight" className={undefined}>
              <h2 className="heading-secondary mb-6">Nos services comptables</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nous proposons une gamme complète de services comptables adaptés à vos 
                besoins spécifiques, qu'il s'agisse de la tenue de votre comptabilité au 
                quotidien ou de l'élaboration de vos états financiers.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Tenue de comptabilité</h3>
                    <p className="text-muted-foreground">Saisie des pièces comptables, rapprochements bancaires, suivi de trésorerie</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Établissement des comptes annuels</h3>
                    <p className="text-muted-foreground">Bilan, compte de résultat, annexes légales et fiscales</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Gestion fiscale</h3>
                    <p className="text-muted-foreground">Déclarations de TVA, établissement des déclarations fiscales, optimisation fiscale</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideLeft" className="relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <Image
                  src="/images/servicecomptable.webp"
                  alt="Image de comptabilité"
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
                  src="/images/servicegestion.jpg"
                  alt="Image de gestion"
                  className="object-cover w-full h-full rounded-lg"
                  priority
                  fill
                  quality={90}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideLeft" className="order-1 md:order-2">
              <h2 className="heading-secondary mb-6">Nos services de gestion</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nous vous aidons à piloter efficacement votre activité grâce à des outils 
                de suivi et d'analyse adaptés à vos enjeux.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Tableaux de bord et reporting</h3>
                    <p className="text-muted-foreground">Suivi d'activité personnalisé, indicateurs de performance clés</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Budgets prévisionnels</h3>
                    <p className="text-muted-foreground">Construction de budgets, analyse d'écarts, plans de financement</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Analyse de rentabilité</h3>
                    <p className="text-muted-foreground">Calcul des coûts, analyse des marges, optimisation des charges</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nos offres */}
      <AnimatedSection animation="slideUp" className="py-20 bg-complementary/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Nos offres adaptées à votre activité</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nous proposons différentes formules pour répondre précisément à vos besoins,
              quelle que soit la taille de votre entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Offre 1 */}
            <AnimatedSection animation="zoomIn" className="delay-100">
              <Card className="bg-white shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileCheck className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Essentiel</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pour les entrepreneurs individuels et micro-entreprises
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Tenue comptable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Déclarations fiscales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Établissement des comptes annuels</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Button asChild className="w-full mt-2">
                      <Link href="/nous-contacter">
                        Demander un devis
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Offre 2 */}
            <AnimatedSection animation="zoomIn" className="delay-300">
              <Card className="bg-white shadow-md relative border-primary">
                <div className="absolute top-1 inset-x-2 bg-primary text-white text-center py-1 text-sm font-medium">
                  Recommandé
                </div>
                <CardHeader className="text-center pt-10">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Business</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pour les TPE et petites PME
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Tenue comptable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Déclarations fiscales et sociales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Tableaux de bord trimestriels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Accompagnement fiscal</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Button asChild className="w-full mt-2">
                      <Link href="/nous-contacter">
                        Demander un devis
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Offre 3 */}
            <AnimatedSection animation="zoomIn" className="delay-500">
              <Card className="bg-white shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <PieChart className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Premium</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pour les PME et structures complexes
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Tenue comptable complète</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Suivi de gestion mensuel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Budgets prévisionnels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Conseil stratégique dédié</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Button asChild className="w-full mt-2">
                      <Link href="/nous-contacter">
                        Demander un devis
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Témoignages */}
      <AnimatedSection animation="slideUp" className="py-20 mb-16">
        <div className="container-custom">
          <h2 className="heading-secondary text-center mb-12">Ce que nos clients disent</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Témoignage 1 */}
            <AnimatedSection animation="slideUp" className="delay-100">
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="italic text-muted-foreground">
                      "Grâce à FINGEC, j'ai une vision claire de ma comptabilité et je peux me 
                      concentrer sur le développement de mon entreprise. Un accompagnement de qualité !"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                    <div>
                      <p className="font-medium">Marie L.</p>
                      <p className="text-sm text-muted-foreground">Dirigeante de TPE</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Témoignage 2 */}
            <AnimatedSection animation="slideUp" className="delay-300">
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="italic text-muted-foreground">
                      "Les tableaux de bord mis en place par FINGEC nous permettent de piloter 
                      efficacement notre activité et d'anticiper les difficultés."
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                    <div>
                      <p className="font-medium">Paul M.</p>
                      <p className="text-sm text-muted-foreground">Directeur financier</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Témoignage 3 */}
            <AnimatedSection animation="slideUp" className="delay-500">
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="italic text-muted-foreground">
                      "Un cabinet à l'écoute qui sait s'adapter à nos spécificités. 
                      Professionnalisme et réactivité sont au rendez-vous."
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                    <div>
                      <p className="font-medium">Sophie T.</p>
                      <p className="text-sm text-muted-foreground">Gérante de société</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection animation="fade" className="py-16 bg-complementary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à optimiser la gestion de votre entreprise ?</h2>
            <p className="mb-8">
              Contactez-nous pour un premier rendez-vous sans engagement et découvrez 
              comment nous pouvons vous accompagner dans le développement de votre activité.
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