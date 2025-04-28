import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function Social() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Social</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe d'experts en gestion sociale vous accompagne dans toutes
              vos démarches liées aux ressources humaines et à la paie.
            </p>
          </div>
        </div>
      </section>

      {/* Services principaux */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
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
            </div>
            <div className="relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-sm">Image illustrant la gestion de la paie</span>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] bg-slate-200 rounded-lg shadow-xl">
              {/* Emplacement pour une image professionnelle */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-sm">Image illustrant la gestion RH</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
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
            </div>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-20 bg-secondary/5">
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

            {/* Service 2 */}
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

            {/* Service 3 */}
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
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-secondary text-center mb-12">Pourquoi externaliser votre gestion sociale ?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-complementary text-white">
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
      </section>
    </>
  );
}
