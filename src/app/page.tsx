import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, FileText, PieChart, Users, Briefcase, Clock, Award, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Section Héro */}
      <section className="relative bg-gray-50 py-20 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Votre <span className="text-primary">expert-comptable</span> vous accompagne
              </h1>
              <p className="text-lg text-gray-600 mt-4 md:text-xl">
                FINGEC met son expertise au service de votre entreprise pour une gestion optimale de votre comptabilité et de votre développement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg">
                  <Link href="/nous-contacter">
                    Prendre rendez-vous
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/notre-savoir-faire">
                    Découvrir nos services <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-sm">Image du cabinet ou professionnels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-primary mb-4">Notre savoir-faire</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Des services de qualité pour répondre à tous vos besoins en matière de comptabilité, de fiscalité et de gestion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Comptabilité et gestion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tenue complète de la comptabilité, élaboration des bilans, comptes de résultat et supervision financière adaptée à vos besoins.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/notre-savoir-faire/comptabilite-gestion">
                    En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Service 2 */}
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Conseil et assistance juridique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Accompagnement dans vos démarches juridiques, conseils adaptés et solutions stratégiques pour optimiser votre entreprise.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/notre-savoir-faire/conseil-juridique">
                    En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Service 3 */}
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Social</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gestion complète du social : bulletins de paie, déclarations sociales, contrats de travail et conseil en ressources humaines.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/notre-savoir-faire/social">
                    En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="py-20 bg-secondary/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-sm">Image professionnelle du cabinet</span>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="heading-primary mb-2">À propos de FINGEC</h2>
              <p className="text-lg text-muted-foreground">
                Depuis notre création, nous accompagnons avec expertise nos clients dans la gestion de leur comptabilité et le développement de leur activité.
              </p>
              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Expertise reconnue</h3>
                    <p className="text-muted-foreground">Une équipe expérimentée et qualifiée pour vous accompagner.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Proximité client</h3>
                    <p className="text-muted-foreground">Un suivi personnalisé et adapté à vos besoins spécifiques.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Réactivité</h3>
                    <p className="text-muted-foreground">Des réponses rapides à vos questions et demandes.</p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-4">
                <Link href="/nous-contacter">
                  Nous contacter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous choisir */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-primary mb-4">Pourquoi choisir FINGEC ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nous proposons un accompagnement sur mesure, basé sur l'expertise et la confiance, pour vous aider à atteindre vos objectifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Atout 1 */}
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Confiance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Relation durable fondée sur la confidentialité et la sécurité de vos données.
                </p>
              </CardContent>
            </Card>

            {/* Atout 2 */}
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Compétence</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Équipe qualifiée avec des formations continues pour un service de qualité.
                </p>
              </CardContent>
            </Card>

            {/* Atout 3 */}
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Expérience</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Des années d'expérience dans tous types de secteurs et d'entreprises.
                </p>
              </CardContent>
            </Card>

            {/* Atout 4 */}
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Disponibilité</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  À votre disposition pour répondre à vos questions et vous accompagner.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Contact rapide */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Besoin d'un conseil ou d'une information ?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contactez notre équipe d'experts. Nous vous répondrons dans les plus brefs délais.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white">
              <Link href="/nous-contacter">
                Nous contacter
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="tel:+33123456789">
                +33 9 83 00 08 43
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
