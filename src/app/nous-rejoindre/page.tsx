import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BriefcaseBusiness, Handshake, GraduationCap, Users } from "lucide-react";
import ApplicationForm from "@/components/forms/ApplicationForm";

export default function NousRejoindre() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Rejoignez notre équipe</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Découvrez nos opportunités de carrière et rejoignez un cabinet d'expertise comptable
              dynamique, innovant et soucieux du bien-être de ses collaborateurs.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi nous rejoindre */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="heading-secondary text-center mb-12">Pourquoi rejoindre FINGEC ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BriefcaseBusiness className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Expertise reconnue</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Travaillez au sein d'un cabinet d'expertise comptable reconnu pour son professionnalisme et sa qualité de service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Formation continue</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Bénéficiez de formations régulières pour développer vos compétences et rester à jour dans votre domaine.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Équipe soudée</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Intégrez une équipe dynamique et bienveillante où l'esprit d'équipe et l'entraide sont des valeurs essentielles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Handshake className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Évolution de carrière</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Profitez d'opportunités d'évolution au sein du cabinet grâce à un suivi personnalisé de votre parcours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos offres d'emploi */}
<section className="py-20 bg-secondary/5">
  <div className="container-custom">
    <h2 className="heading-secondary text-center mb-12">Nos offres d'emploi actuelles</h2>

    {/*
      POUR AJOUTER DES OFFRES D'EMPLOI :
      1. Supprimez la div avec la classe "no-offers" ci-dessous
      2. Décommentez le bloc d'offres d'emploi qui suit
      3. Modifiez ou ajoutez des offres selon vos besoins
    */}
    
    {/* Aucune offre actuellement - ce bloc est affiché quand il n'y a pas d'offres */}
    <div className="no-offers bg-gray-100 p-8 rounded-lg max-w-3xl mx-auto text-center">
      <p className="text-lg text-gray-500 mb-4">
        Nous n'avons pas d'offres d'emploi disponibles pour le moment.
      </p>
      <p className="text-gray-400">
        Vous pouvez tout de même nous envoyer une candidature spontanée via le formulaire ci-dessous.
      </p>
    </div>

    {/*
      BLOC D'OFFRES D'EMPLOI (actuellement désactivé)
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Offre 1 
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Comptable confirmé(e) H/F</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Nous recherchons un(e) comptable confirmé(e) pour renforcer notre équipe comptabilité.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Profil recherché :</h4>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Minimum 3 ans d'expérience en cabinet</li>
                  <li>DCG ou équivalent</li>
                  <li>Maîtrise des logiciels comptables</li>
                  <li>Rigueur et autonomie</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Type de contrat :</h4>
                <p className="text-muted-foreground mt-1">CDI - Temps plein</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="#postuler">
                Postuler maintenant <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        {/* Offre 2 
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Assistant(e) comptable H/F</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Nous recherchons un(e) assistant(e) comptable pour soutenir nos équipes dans leurs missions.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Profil recherché :</h4>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>BTS Comptabilité ou équivalent</li>
                  <li>Première expérience appréciée</li>
                  <li>Connaissance des outils informatiques</li>
                  <li>Organisé(e) et dynamique</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Type de contrat :</h4>
                <p className="text-muted-foreground mt-1">CDI - Temps plein</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="#postuler">
                Postuler maintenant <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    */}
  </div>
</section>

      {/* Formulaire de candidature */}
      <section id="postuler" className="py-20 scroll-mt-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-secondary text-center mb-8">Postulez chez FINGEC</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Que vous postuliez à une offre spécifique ou envoyiez une candidature spontanée,
              nous étudierons votre profil avec attention.
            </p>

            <Tabs defaultValue="offres" className="w-full mb-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="offres">Postuler à une offre</TabsTrigger>
                <TabsTrigger value="spontanee">Candidature spontanée</TabsTrigger>
              </TabsList>
              <TabsContent value="offres" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <ApplicationForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="spontanee" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <ApplicationForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-secondary/5">
        <div className="container-custom">
          <h2 className="heading-secondary text-center mb-12">Ils ont rejoint FINGEC</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Témoignage 1 */}
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <p className="italic text-muted-foreground">
                    "J'ai rejoint FINGEC il y a 3 ans comme comptable et j'apprécie particulièrement
                    l'ambiance de travail et les possibilités d'évolution offertes par le cabinet."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                  <div>
                    <p className="font-medium">Sophie M.</p>
                    <p className="text-sm text-muted-foreground">Comptable</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Témoignage 2 */}
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <p className="italic text-muted-foreground">
                    "En tant que débutant, j'ai été très bien encadré par mon équipe. La formation continue
                    me permet de progresser rapidement dans mes compétences."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                  <div>
                    <p className="font-medium">Thomas L.</p>
                    <p className="text-sm text-muted-foreground">Assistant comptable</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Témoignage 3 */}
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <p className="italic text-muted-foreground">
                    "Ce qui me plaît chez FINGEC, c'est la diversité des missions et des clients.
                    Chaque jour apporte de nouveaux défis et de nouvelles opportunités d'apprentissage."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                  <div>
                    <p className="font-medium">Julie D.</p>
                    <p className="text-sm text-muted-foreground">Responsable sociale</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
