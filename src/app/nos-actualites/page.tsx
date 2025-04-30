import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, CalendarDays, User } from "lucide-react";
import { articles as articlesCabinet } from "@/lib/articles-cabinet";
import { articles as articlesDocs } from "@/lib/articles";

export default function NosActualites() {
  // Formatage des articles avec leur catégorie
  const formattedArticlesCabinet = articlesCabinet.map(article => ({
    ...article,
    category: "vie-du-cabinet"
  }));

  const formattedArticlesDocs = articlesDocs.map(article => ({
    ...article,
    category: "base-de-documentation"
  }));

  // Combinaison et tri des articles
  const sortedActualities = [...formattedArticlesCabinet, ...formattedArticlesDocs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
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

            <TabsContent value="tout">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedActualities.map((article) => (
                  <ArticleCard key={`${article.category}-${article.id}`} article={article} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cabinet">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {formattedArticlesCabinet.map((article) => (
                  <ArticleCard key={`cabinet-${article.id}`} article={article} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documentation">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {formattedArticlesDocs.map((article) => (
                  <ArticleCard key={`docs-${article.id}`} article={article} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
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
              En vous inscrivant, vous acceptez de recevoir nos communications.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({ article }: { article: any }) {
  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
            {article.category === "vie-du-cabinet" ? "Vie du cabinet" : "Documentation"}
          </span>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3 mr-1" />
            {article.date}
          </div>
        </div>
        <CardTitle className="text-xl">{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <User className="h-3 w-3 mr-1" />
            {article.author}
          </div>
          <p className="text-muted-foreground">
            {article.excerpt}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/nos-actualites/${article.category}/${article.id}`}>
            Lire la suite <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}