"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, User, Tag, ArrowLeft, FileText, Download } from "lucide-react";
import { FormEvent, useState } from "react";

export default function BaseDocumentation() {
  // Articles factices pour la démo
  const articles = [
    {
      id: 1,
      title: "Nouvelles obligations fiscales pour les entreprises",
      date: "5 avril 2023",
      author: "Département fiscal",
      image: "/placeholder-tax.jpg",
      excerpt: "Récapitulatif des nouvelles mesures fiscales et obligations déclaratives pour les entreprises en 2023.",
      content: `
        <p>L'année 2023 apporte son lot de nouveautés en matière fiscale pour les entreprises. Voici un récapitulatif des principales mesures à connaître.</p>
        <h3>1. Aménagement de la contribution économique territoriale (CET)</h3>
        <p>La cotisation sur la valeur ajoutée des entreprises (CVAE) est progressivement supprimée sur deux ans :</p>
        <ul>
          <li>Réduction de 50% pour les impositions dues au titre de 2023</li>
          <li>Suppression complète à compter de 2024</li>
        </ul>
        <h3>2. Amortissement du fonds commercial</h3>
        <p>La possibilité d'amortir fiscalement les fonds commerciaux acquis entre le 1er janvier 2022 et le 31 décembre 2025 est maintenue.</p>
        <h3>3. Crédit d'impôt recherche</h3>
        <p>Les modalités de calcul du crédit d'impôt recherche sont modifiées pour les dépenses exposées à compter du 1er janvier 2023 :</p>
        <ul>
          <li>Unification du taux à 30% pour toutes les entreprises</li>
          <li>Simplification des obligations déclaratives</li>
        </ul>
        <h3>4. Facturation électronique</h3>
        <p>La généralisation de la facturation électronique est reportée au :</p>
        <ul>
          <li>1er juillet 2024 pour les grandes entreprises</li>
          <li>1er janvier 2025 pour les ETI</li>
          <li>1er janvier 2026 pour les PME et TPE</li>
        </ul>
        <p>Pour être accompagné dans la mise en place de ces nouvelles mesures, n'hésitez pas à contacter notre département fiscal.</p>
      `,
      tags: ["Fiscalité", "Réglementation"],
      resources: [
        { name: "Guide complet des obligations fiscales 2023", type: "PDF" },
        { name: "Calendrier des échéances fiscales", type: "PDF" }
      ]
    },
    {
      id: 2,
      title: "Guide : La facturation électronique",
      date: "18 février 2023",
      author: "Service comptabilité",
      image: "/placeholder-invoice.jpg",
      excerpt: "Tout ce que vous devez savoir sur la facturation électronique obligatoire à partir de 2024 : processus, avantages et mise en conformité.",
      content: `
        <p>La facturation électronique deviendra progressivement obligatoire en France à partir de 2024. Voici ce que vous devez savoir pour vous y préparer.</p>
        <h3>Qu'est-ce que la facturation électronique ?</h3>
        <p>Il s'agit d'un système d'échange dématérialisé de factures entre entreprises, via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF).</p>
        <h3>Calendrier de déploiement</h3>
        <p>La mise en œuvre se fera progressivement :</p>
        <ul>
          <li>1er juillet 2024 : obligation d'émission pour les grandes entreprises</li>
          <li>1er janvier 2025 : obligation d'émission pour les ETI</li>
          <li>1er janvier 2026 : obligation d'émission pour les PME et TPE</li>
        </ul>
        <p>Toutes les entreprises devront être en mesure de recevoir des factures électroniques dès le 1er juillet 2024, quelle que soit leur taille.</p>
        <h3>Avantages de la facturation électronique</h3>
        <ul>
          <li>Réduction des coûts de traitement (impression, envoi, saisie, archivage)</li>
          <li>Accélération des délais de paiement</li>
          <li>Diminution des erreurs</li>
          <li>Gain de temps</li>
          <li>Bénéfice environnemental</li>
        </ul>
        <h3>Comment s'y préparer ?</h3>
        <p>Pour anticiper cette évolution, nous vous recommandons de :</p>
        <ul>
          <li>Évaluer votre système de facturation actuel</li>
          <li>Choisir une solution adaptée à vos besoins</li>
          <li>Former vos équipes</li>
          <li>Tester la solution avant la date d'obligation</li>
        </ul>
        <p>Notre cabinet peut vous accompagner dans cette transition vers la facturation électronique. N'hésitez pas à nous contacter pour plus d'informations.</p>
      `,
      tags: ["Comptabilité", "Numérique"],
      resources: [
        { name: "Infographie - La facturation électronique en 5 points", type: "PDF" },
        { name: "Checklist de préparation à la facturation électronique", type: "PDF" }
      ]
    },
    {
      id: 3,
      title: "Les aides à l'embauche en 2023",
      date: "22 janvier 2023",
      author: "Département social",
      image: "/placeholder-hiring.jpg",
      excerpt: "Guide complet des dispositifs d'aide à l'embauche et des exonérations de charges disponibles pour les entreprises en 2023.",
      content: `
        <p>En 2023, plusieurs dispositifs d'aide à l'embauche sont disponibles pour les entreprises. Voici un tour d'horizon des principales mesures.</p>
        <h3>1. Contrat d'apprentissage</h3>
        <p>L'aide exceptionnelle à l'embauche d'apprentis est prolongée jusqu'au 31 décembre 2023 :</p>
        <ul>
          <li>5 000 € pour un apprenti mineur</li>
          <li>8 000 € pour un apprenti majeur</li>
        </ul>
        <p>Cette aide concerne les contrats conclus pour la préparation d'un diplôme jusqu'au niveau Bac+5.</p>
        <h3>2. Contrat de professionnalisation</h3>
        <p>Une aide similaire est disponible pour les contrats de professionnalisation :</p>
        <ul>
          <li>5 000 € pour un alternant mineur</li>
          <li>8 000 € pour un alternant majeur</li>
        </ul>
        <h3>3. Emploi Franc+</h3>
        <p>Ce dispositif vise à favoriser l'embauche de personnes résidant dans un quartier prioritaire de la politique de la ville (QPV) :</p>
        <ul>
          <li>15 000 € sur 3 ans pour une embauche en CDI (5 000 € par an)</li>
          <li>5 000 € sur 2 ans pour une embauche en CDD d'au moins 6 mois (2 500 € par an)</li>
        </ul>
        <h3>4. Aide à l'embauche de travailleurs handicapés</h3>
        <p>Une aide pouvant aller jusqu'à 4 000 € est accordée pour l'embauche d'un travailleur handicapé, sous certaines conditions.</p>
        <h3>5. Réduction générale des cotisations patronales</h3>
        <p>Cette réduction, également appelée "réduction Fillon", s'applique aux rémunérations ne dépassant pas 1,6 SMIC.</p>
        <p>Pour bénéficier de ces aides et connaître les démarches à effectuer, notre service social est à votre disposition.</p>
      `,
      tags: ["Social", "RH"],
      resources: [
        { name: "Tableau comparatif des aides à l'embauche", type: "PDF" },
        { name: "Modèle de contrat d'apprentissage", type: "DOCX" }
      ]
    },
    {
      id: 4,
      title: "Réforme de l'assurance chômage : ce qui change en 2023",
      date: "10 janvier 2023",
      author: "Département social",
      image: "/placeholder-unemployment.jpg",
      excerpt: "La réforme de l'assurance chômage entrée en vigueur au 1er février 2023 modifie les conditions d'éligibilité et le calcul des allocations.",
      content: `
        <p>La réforme de l'assurance chômage est entrée en vigueur le 1er février 2023. Voici les principaux changements à connaître.</p>
        <h3>Durée d'affiliation minimale</h3>
        <p>Pour avoir droit aux allocations chômage, il faut désormais avoir travaillé au moins 6 mois (contre 4 mois précédemment) au cours des 24 derniers mois (36 mois pour les plus de 53 ans).</p>
        <h3>Durée d'indemnisation</h3>
        <p>La durée maximale d'indemnisation est réduite de 25% pour les demandeurs d'emploi dont la procédure de licenciement est engagée à compter du 1er février 2023 :</p>
        <ul>
          <li>18 mois maximum au lieu de 24 mois pour les moins de 53 ans</li>
          <li>22,5 mois maximum au lieu de 30 mois pour les 53-54 ans</li>
          <li>27 mois maximum au lieu de 36 mois pour les 55 ans et plus</li>
        </ul>
        <p>Cette réduction ne s'applique pas dans les départements d'outre-mer et dans les zones où le taux de chômage est supérieur à 9%.</p>
        <h3>Calcul du salaire journalier de référence (SJR)</h3>
        <p>Le mode de calcul du SJR, qui sert de base au montant de l'allocation, est maintenu tel qu'il a été défini par la réforme de 2021.</p>
        <h3>Abandons de poste</h3>
        <p>Les salariés ayant abandonné leur poste sont désormais présumés démissionnaires, ce qui peut entraîner la privation des allocations chômage.</p>
        <h3>Refus de CDI après un CDD</h3>
        <p>Le refus de deux propositions de CDI à l'issue d'un CDD peut également entraîner la privation des allocations chômage.</p>
        <p>Ces modifications nécessitent une adaptation des politiques RH. Notre département social peut vous conseiller sur les implications de cette réforme pour votre entreprise.</p>
      `,
      tags: ["Social", "Réglementation"],
      resources: [
        { name: "Synthèse de la réforme de l'assurance chômage", type: "PDF" }
      ]
    },
    {
      id: 5,
      title: "Indices et taux pour 2023",
      date: "5 janvier 2023",
      author: "Département comptabilité",
      image: "/placeholder-rates.jpg",
      excerpt: "Retrouvez tous les indices et taux utiles pour l'année 2023 : SMIC, plafond de la Sécurité sociale, taux d'intérêt légal, etc.",
      content: `
        <p>Voici les principaux indices et taux applicables en 2023 :</p>
        <h3>SMIC</h3>
        <ul>
          <li>SMIC horaire brut : 11,27 € (au 1er janvier 2023)</li>
          <li>SMIC mensuel brut (base 35h) : 1 709,28 €</li>
        </ul>
        <h3>Plafond de la Sécurité sociale</h3>
        <ul>
          <li>Plafond mensuel : 3 666 €</li>
          <li>Plafond annuel : 43 992 €</li>
        </ul>
        <h3>Taux d'intérêt légal</h3>
        <ul>
          <li>Pour les créances des personnes physiques n'agissant pas pour des besoins professionnels : 4,47 %</li>
          <li>Pour les autres cas : 2,06 %</li>
        </ul>
        <h3>Indice des loyers commerciaux (ILC)</h3>
        <ul>
          <li>4e trimestre 2022 : 126,31 (+ 5,79 % sur un an)</li>
        </ul>
        <h3>Indice des loyers des activités tertiaires (ILAT)</h3>
        <ul>
          <li>4e trimestre 2022 : 124,65 (+ 5,98 % sur un an)</li>
        </ul>
        <h3>Indice de référence des loyers (IRL)</h3>
        <ul>
          <li>4e trimestre 2022 : 137,26 (+ 3,50 % sur un an)</li>
        </ul>
        <h3>Taux de l'usure</h3>
        <p>Pour les entreprises (1er trimestre 2023) :</p>
        <ul>
          <li>Découverts : 14,71 %</li>
          <li>Prêts à taux fixe d'une durée inférieure ou égale à 2 ans : 5,54 %</li>
          <li>Prêts à taux fixe d'une durée supérieure à 2 ans : 5,83 %</li>
        </ul>
        <p>Ces taux sont susceptibles d'évoluer en cours d'année. Pour des informations actualisées, n'hésitez pas à consulter notre tableau de bord ou à contacter votre conseiller.</p>
      `,
      tags: ["Actualités", "Indicateurs"],
      resources: [
        { name: "Tableau des indices et taux 2023 (mis à jour trimestriellement)", type: "XLSX" }
      ]
    }
  ];

  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Base de documentation</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Consultez notre sélection d'articles, guides et ressources pour vous tenir informé 
              des actualités juridiques, comptables, fiscales et sociales.
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
                  
                  {/* Resources */}
                  {article.resources && article.resources.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Ressources disponibles:</h4>
                      <ul className="space-y-1">
                        {article.resources.map((resource, idx) => (
                          <li key={`${article.id}-resource-${idx}`} className="flex items-center text-sm text-primary">
                            <FileText className="h-3 w-3 mr-1" />
                            <span>{resource.name}</span>
                            <span className="text-xs text-muted-foreground ml-1">({resource.type})</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <Download className="h-3 w-3" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <div key={`${article.id}-tag-${tag}`} className="flex items-center text-xs rounded-full px-2 py-1 bg-primary/10 text-primary">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/nos-actualites/base-de-documentation/article-${article.id}`}>
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
            <h2 className="text-2xl font-bold mb-4 text-dark">Restez informé des actualités</h2>
            <p className="mb-8 text-muted-foreground">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières publications et veilles juridiques.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          className="px-4 py-2 rounded-md w-full sm:w-auto border border-gray-300"
          required
        />
              <Button>
                S'inscrire
              </Button>
            </form>
            <p className="text-sm mt-4 text-muted-foreground">
              En vous inscrivant, vous acceptez de recevoir nos communications. Vous pourrez vous désinscrire à tout moment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}