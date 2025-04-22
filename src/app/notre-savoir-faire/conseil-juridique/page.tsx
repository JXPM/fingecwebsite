import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Scale, 
  Building, 
  FileText, 
  Briefcase, 
  FileCheck, 
  ArrowRight 
} from "lucide-react";

export default function ConseilJuridique() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Conseil et assistance juridique</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe d'experts vous accompagne dans tous les aspects juridiques 
              de votre entreprise, de sa création à sa transmission.
            </p>
          </div>
        </div>
      </section>

      {/* Services principaux */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="heading-secondary mb-6">Conseil juridique</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nos experts vous conseillent sur tous les aspects juridiques de votre activité 
                et vous aident à faire les choix les plus adaptés à votre situation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Choix de la structure juridique</h3>
                    <p className="text-muted-foreground">Analyse des différentes formes juridiques, conseil personnalisé, impact fiscal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Gestion des assemblées</h3>
                    <p className="text-muted-foreground">Préparation et tenue des assemblées générales, rédaction des procès-verbaux</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Rédaction et revue de contrats</h3>
                    <p className="text-muted-foreground">CGV, contrats commerciaux, baux commerciaux, accords de confidentialité</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-sm">Image illustrant le conseil juridique</span>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-sm">Image illustrant l'assistance juridique</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="heading-secondary mb-6">Assistance juridique</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nous vous accompagnons dans toutes vos démarches juridiques et administratives 
                pour vous permettre de vous concentrer sur votre cœur de métier.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Création d'entreprise</h3>
                    <p className="text-muted-foreground">Constitution de société, rédaction des statuts, formalités administratives</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Secrétariat juridique</h3>
                    <p className="text-muted-foreground">Tenue des registres, suivi des obligations légales, dépôt des comptes annuels</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Modifications statutaires</h3>
                    <p className="text-muted-foreground">Augmentation de capital, changement de dirigeant, transfert de siège social</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines d'expertise */}
      <section className="py-20 bg-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Nos domaines d'expertise</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Notre équipe d'experts vous accompagne dans tous vos projets,
              quelle que soit leur nature ou leur complexité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Création et modification */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Création et modification d'entreprise</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Choix du statut juridique adapté</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Rédaction des statuts sur mesure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Réalisation des formalités administratives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Modifications statutaires</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Opérations juridiques */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Opérations juridiques</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Cession et acquisition d'entreprise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Restructuration d'entreprise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Fusion et scission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Transmission d'entreprise</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Secrétariat juridique */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secrétariat juridique</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Tenue du registre des mouvements de titres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Organisation des assemblées générales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Rédaction des procès-verbaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Dépôt des comptes annuels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-secondary text-center mb-12">Nos engagements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Expertise juridique</h3>
                      <p className="text-muted-foreground">
                        Notre équipe d'experts est formée en permanence sur les évolutions 
                        législatives et réglementaires pour vous garantir un conseil de qualité.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Solutions adaptées</h3>
                      <p className="text-muted-foreground">
                        Nous élaborons des solutions sur mesure adaptées à vos spécificités et 
                        à vos objectifs, en tenant compte de vos contraintes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Confidentialité</h3>
                      <p className="text-muted-foreground">
                        Nous garantissons une confidentialité totale dans le traitement de vos 
                        dossiers et des informations que vous nous confiez.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Accompagnement global</h3>
                      <p className="text-muted-foreground">
                        Nous vous accompagnons à chaque étape de la vie de votre entreprise, 
                        de sa création à sa transmission.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'un conseil juridique ?</h2>
            <p className="mb-8">
              Contactez-nous pour un premier rendez-vous sans engagement et découvrez 
              comment nous pouvons vous accompagner dans vos projets juridiques.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link href="/nous-contacter">
                Prendre rendez-vous
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}