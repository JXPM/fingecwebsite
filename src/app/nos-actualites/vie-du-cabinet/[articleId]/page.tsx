import { notFound } from "next/navigation";
import { articles } from "@/lib/articles-cabinet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

export async function generateStaticParams() {
  return articles.map((article) => ({
    articleId: article.id,
  }));
}

export default function ArticlePage({ params }: { params: { articleId: string } }) {
const article = articles.find((a) => a.id === params.articleId);
  if (!article) {
    return notFound();
  }


  return (
    <div className="container-custom py-12">
      <div className="flex mb-8">
        <Button asChild variant="ghost" className="flex items-center text-muted-foreground">
          <Link href="/nos-actualites/base-de-documentation">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la documentation
          </Link>
        </Button>
      </div>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Publié le {article.date}</span>
            <span>Par {article.author}</span>
          </div>
        </header>

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

        {article.resources && article.resources.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Ressources associées</h2>
            <ul className="space-y-2">
              {article.resources.map((resource: { name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; type: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, idx: Key | null | undefined) => (
                <li key={idx} className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span className="mr-2">{resource.name}</span>
                  <span className="text-xs text-muted-foreground">({resource.type})</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                    <Download className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}