import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, FileText, Briefcase, Users, HandCoins, FileCheck, Building, Scale, Receipt, ClipboardCheck } from "lucide-react";

export default function NotreSavoirFaire() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Notre savoir-faire</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Chez FINGEC, nous mettons notre expertise au service de votre entreprise. Notre équipe
              de professionnels qualifiés vous accompagne dans tous les aspects comptables, juridiques
              et sociaux de votre activité.
            </p>
          </div>
        </div>
      </section>

      {/* Services principaux */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="heading-secondary text-center mb-12">Nos domaines d'expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Comptabilité et gestion */}
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Comptabilité et gestion</CardTitle>
                <CardDescription>
                  Optimisez la gestion financière de votre entreprise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Tenue et révision de la comptabilité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HandCoins className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Établissement des comptes annuels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Receipt className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Déclarations fiscales et gestion de TVA</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/notre-savoir-faire/comptabilite-gestion">
                    Découvrir <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Conseil et assistance juridique */}
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Conseil et assistance juridique</CardTitle>
                <CardDescription>
                  Sécurisez votre activité avec nos conseils juridiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Création, modification et transmission d'entreprise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Scale className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Conseil juridique et fiscal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Secrétariat juridique et assistance administrative</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/notre-savoir-faire/conseil-juridique">
                    Découvrir <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Social */}
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Social</CardTitle>
                <CardDescription>
                  Gérez efficacement vos ressources humaines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Établissement des bulletins de paie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Gestion des contrats de travail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Déclarations sociales et accompagnement RH</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/notre-savoir-faire/social">
                    Découvrir <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Notre approche */}
      <section className="py-20 bg-secondary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-secondary text-center mb-8">Notre approche personnalisée</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Chez FINGEC, nous croyons qu'une relation de confiance se construit sur l'écoute
              et la compréhension de vos besoins spécifiques.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Pour les entrepreneurs individuels
                </h3>
                <p className="text-muted-foreground mb-4">
                  Un accompagnement adapté à la taille de votre activité, avec des solutions simples
                  et efficaces pour vous permettre de vous concentrer sur votre cœur de métier.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Forfaits adaptés aux micro-entreprises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Conseils pour l'optimisation fiscale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Assistance à la création d'entreprise</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Pour les PME et ETI
                </h3>
                <p className="text-muted-foreground mb-4">
                  Des services complets pour vous accompagner dans votre croissance, avec une vision
                  stratégique et des outils de pilotage adaptés à vos enjeux.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Suivi comptable régulier et personnalisé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Tableaux de bord et outils d'aide à la décision</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Conseil en gestion et développement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-complementary rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Besoin d'une expertise comptable adaptée à votre activité ?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Prenez rendez-vous pour échanger sur vos besoins spécifiques et découvrir
              comment nous pouvons vous accompagner dans la réussite de votre entreprise.
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
