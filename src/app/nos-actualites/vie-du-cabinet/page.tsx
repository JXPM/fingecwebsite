import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, User, Tag, ArrowLeft } from "lucide-react";
import { articles } from "@/lib/articles-cabinet";

export default function VieDuCabinet() {

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Vie du cabinet</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Découvrez les dernières actualités de notre cabinet, nos événements, 
              nos nouveaux collaborateurs et nos engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Article List */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex mb-8">
            <Button asChild variant="ghost" className="flex items-center text-muted-foreground">
              <Link href="/nos-actualites">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux actualités
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="shadow-md hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <User className="h-3 w-3 mr-1" />
                    {article.author}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative h-48 bg-slate-200 rounded-md mb-4">
                    {/* Image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="text-sm">Image article</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <div key={index} className="flex items-center text-xs rounded-full px-2 py-1 bg-primary/10 text-primary">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/nos-actualites/vie-du-cabinet/article-${article.id}`}>
                      Lire l'article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-complementary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Restez informé de la vie du cabinet</h2>
            <p className="mb-8 text-muted-foreground">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et événements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="px-4 py-2 rounded-md w-full sm:w-auto border border-gray-300"
              />
              <Button>
                S'inscrire
              </Button>
            </div>
            <p className="text-sm mt-4 text-muted-foreground">
              En vous inscrivant, vous acceptez de recevoir nos communications. Vous pourrez vous désinscrire à tout moment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}