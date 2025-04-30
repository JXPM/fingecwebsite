import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, CalendarDays, User } from "lucide-react";

export default function NosActualites() {
  const actualitiesCabinet = [
    {
      id: 1,
      title: "Nouveaux locaux pour FINGEC",
      date: "15 mars 2023",
      author: "L'équipe FINGEC",
      excerpt: "FINGEC s'agrandit et déménage dans de nouveaux locaux plus spacieux pour mieux vous accueillir et répondre à vos besoins.",
      category: "vie-du-cabinet",
    },
    {
      id: 2,
      title: "Arrivée de notre nouveau collaborateur",
      date: "28 janvier 2023",
      author: "Direction",
      excerpt: "Nous sommes heureux d'accueillir Pierre Martin au sein de notre équipe en tant que responsable du département social.",
      category: "vie-du-cabinet",
    },
    {
      id: 3,
      title: "Journée portes ouvertes",
      date: "10 décembre 2022",
      author: "Service communication",
      excerpt: "FINGEC organise une journée portes ouvertes le 15 janvier pour présenter ses services et répondre à vos questions.",
      category: "vie-du-cabinet",
    },
  ];

  const actualitiesDocumentation = [
    {
      id: 4,
      title: "Nouvelles obligations fiscales pour les entreprises",
      date: "5 avril 2023",
      author: "Département fiscal",
      excerpt: "Récapitulatif des nouvelles mesures fiscales et obligations déclaratives pour les entreprises en 2023.",
      category: "base-de-documentation",
    },
    {
      id: 5,
      title: "Guide : La facturation électronique",
      date: "18 février 2023",
      author: "Service comptabilité",
      excerpt: "Tout ce que vous devez savoir sur la facturation électronique obligatoire à partir de 2024 : processus, avantages et mise en conformité.",
      category: "base-de-documentation",
    },
    {
      id: 6,
      title: "Les aides à l'embauche en 2023",
      date: "22 janvier 2023",
      author: "Département social",
      excerpt: "Guide complet des dispositifs d'aide à l'embauche et des exonérations de charges disponibles pour les entreprises en 2023.",
      category: "base-de-documentation",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Nos actualités</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Restez informé des dernières nouvelles de notre cabinet et des évolutions
              réglementaires qui concernent votre activité.
            </p>
          </div>
        </div>
      </section>

      {/* Actualités */}
      <section className="py-20">
        <div className="container-custom">
          <Tabs defaultValue="tout" className="w-full mb-8">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="tout">Tout</TabsTrigger>
                <TabsTrigger value="cabinet">Vie du cabinet</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
              </TabsList>
            </div>

            {/* Toutes les actualités */}
            <TabsContent value="tout">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...actualitiesCabinet, ...actualitiesDocumentation].map((actualite) => (
                  <Card key={actualite.id} className="shadow-md hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {actualite.category === "vie-du-cabinet" ? "Vie du cabinet" : "Documentation"}
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {actualite.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{actualite.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <User className="h-3 w-3 mr-1" />
                          {actualite.author}
                        </div>
                        <p className="text-muted-foreground">
                          {actualite.excerpt}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/nos-actualites/${actualite.category}/article-${actualite.id}`}>
                          Lire la suite <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Vie du cabinet */}
            <TabsContent value="cabinet">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {actualitiesCabinet.map((actualite) => (
                  <Card key={actualite.id} className="shadow-md hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          Vie du cabinet
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {actualite.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{actualite.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <User className="h-3 w-3 mr-1" />
                          {actualite.author}
                        </div>
                        <p className="text-muted-foreground">
                          {actualite.excerpt}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/nos-actualites/${actualite.category}/article-${actualite.id}`}>
                          Lire la suite <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Documentation */}
            <TabsContent value="documentation">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {actualitiesDocumentation.map((actualite) => (
                  <Card key={actualite.id} className="shadow-md hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          Documentation
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {actualite.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{actualite.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <User className="h-3 w-3 mr-1" />
                          {actualite.author}
                        </div>
                        <p className="text-muted-foreground">
                          {actualite.excerpt}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/nos-actualites/${actualite.category}/article-${actualite.id}`}>
                          Lire la suite <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg- text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et conseils.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-4 py-2 rounded-md w-full sm:w-auto text-gray-900"
              />
              <Button className="bg-white text-primary hover:bg-white/90">
                S'inscrire
              </Button>
            </div>
            <p className="text-sm mt-4 text-white/80">
              En vous inscrivant, vous acceptez de recevoir nos communications. Vous pourrez vous désinscrire à tout moment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
