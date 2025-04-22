import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calculator, CreditCard, PiggyBank, Briefcase, FileText, Building2, Globe2, Shield } from "lucide-react";

const LINKS = [
  {
    title: "Simulateur d'impôt sur le revenu",
    url: "https://www.impots.gouv.fr/simulateur/",
    description: "Calculez rapidement l’impôt sur le revenu dû pour votre foyer.",
    icon: Calculator
  },
  {
    title: "Espace professionnel impots.gouv.fr",
    url: "https://www.impots.gouv.fr/portail/professionnel",
    description: "Accédez à votre compte fiscal professionnel (déclarations, TVA, liasses fiscales, échéances).",
    icon: Briefcase
  },
  {
    title: "Simulateur Auto-Entrepreneur (charges, revenus)",
    url: "https://www.autoentrepreneur.urssaf.fr/portail/accueil/outils-et-services/simulateurs.html",
    description: "Estimez vos cotisations et votre revenu net en micro-entrepreneur.",
    icon: PiggyBank
  },
  {
    title: "URSSAF — Mon compte employeur",
    url: "https://mon.urssaf.fr/",
    description: "Déclarez et payez vos cotisations sociales en tant qu’employeur.",
    icon: CreditCard
  },
  {
    title: "Simulateur de bulletin de paie brut/net",
    url: "https://www.service-public.fr/simulateur/calcul/salaire-net-brut",
    description: "Convertissez salaire brut/net ou simulez un bulletin de paie.",
    icon: FileText
  },
  {
    title: "Création d’entreprise (guichet unique)",
    url: "https://procedures.inpi.fr/?/login",
    description: "Déclarez la création/modification de votre entreprise en ligne (INPI).",
    icon: Building2
  },
  {
    title: "Aides aux entreprises (France Num)",
    url: "https://aides-entreprises.fr/",
    description: "Recherchez toutes les aides publiques disponibles pour votre entreprise.",
    icon: Globe2
  },
  {
    title: "Simulateur RSI (TNS – travailleur non salarié)",
    url: "https://www.secu-independants.fr/cotisations/simulations/",
    description: "Estimez les cotisations sociales TNS – gérants majoritaires, professions libérales.",
    icon: Shield
  },
  {
    title: "Simulateur frais kilométriques",
    url: "https://www.service-public.fr/particuliers/vosdroits/F20558",
    description: "Calculez l’indemnité kilométrique pour les frais de déplacement professionnels.",
    icon: ExternalLink
  },
];

export default function OutilsLiensPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-[80vh]">
      <div className="container-custom">
        <div className="mb-10 max-w-2xl mx-auto text-center">
          <h1 className="heading-primary mb-4">Outils & Liens utiles</h1>
          <p className="text-muted-foreground text-lg">
            Retrouvez ici une sélection de liens et de simulateurs officiels pour faciliter votre gestion, vos obligations et vos démarches d’entreprise (fiscalité, social, création…).
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {LINKS.map((link) => (
            <Card key={link.title} className="shadow-sm hover:shadow-primary/30 transition-shadow h-full flex flex-col justify-between">
              <CardHeader className="flex-row items-center gap-4 pb-2">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <link.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{link.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow justify-between">
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    Accéder au service <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
