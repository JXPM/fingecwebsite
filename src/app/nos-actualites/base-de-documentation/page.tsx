"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CalendarDays, 
  User, 
  Tag, 
  ArrowLeft, 
  FileText, 
  Download, 
  Filter,
  Briefcase,
  Building2,
  Users,
  Landmark,
  Info
} from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface SubscriptionForm {
  email: string;
  nom: string;
  prenom: string;
  telephone: string;
}

type RSSArticle = {
  id: string;
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
  source: string;
  author: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  resources?: {
    name: string;
    type: string;
    url: string;
  }[];
};

type ArticleCategory = 'PROFESSIONNEL' | 'PARTICULIER' | 'COLLECTIVITE' | 'SOCIAL' | 'FISCAL' | 'TOUS';

export default function BaseDocumentation() {
  const [formData, setFormData] = useState<SubscriptionForm>({
    email: '',
    nom: '',
    prenom: '',
    telephone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [articles, setArticles] = useState<RSSArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('TOUS');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/rss');
        const data = await res.json();
        const categorizedData = data.map((article: RSSArticle) => ({
          ...article,
          category: getRandomCategory(article.title)
        }));
        setArticles(categorizedData);
      } catch (err) {
        console.error('Erreur chargement articles', err);
        toast.error('Erreur lors du chargement des articles');
      } finally {
        setLoadingArticles(false);
      }
    };
    fetchArticles();
  }, []);

  const getRandomCategory = (title: string): string => {
    if (title.includes('TVA') || title.includes('BIC')) return 'PROFESSIONNEL';
    if (title.includes('taxes d\'urbanisme')) return 'COLLECTIVITE';
    if (title.includes('cession de droits sociaux')) return 'PARTICULIER';
    if (title.includes('Solidarité fiscale')) return 'PARTICULIER';
    if (title.includes('BOSS')) return 'SOCIAL';
    if (title.includes('BoFip')) return 'FISCAL';
    
    const categories = ['PROFESSIONNEL', 'PARTICULIER', 'COLLECTIVITE', 'SOCIAL', 'FISCAL'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const filteredArticles = selectedCategory === 'TOUS' 
    ? articles 
    : articles.filter(article => 
        article.category.includes(selectedCategory) || 
        (selectedCategory === 'SOCIAL' && article.source === 'BOSS') ||
        (selectedCategory === 'FISCAL' && article.source === 'BoFip')
      );

  const groupedArticles = filteredArticles.reduce((acc, article) => {
    const category = article.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, RSSArticle[]>);

  useEffect(() => {
    const isSubscribed = localStorage.getItem('newsletter_subscribed_base-documentation');
    if (isSubscribed) {
      setSubscribed(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast.error('Veuillez saisir un email valide');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'base-documentation'
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Inscription réussie !');
        setSubscribed(true);
        localStorage.setItem('newsletter_subscribed_base-documentation', 'true');
        setFormData({
          email: '',
          nom: '',
          prenom: '',
          telephone: ''
        });
      } else {
        toast.error(result.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur inscription:', error);
      toast.error('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const renderNewsletterSection = () => {
    if (subscribed) {
      return (
        <section className="py-16 bg-complementary/10">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-green-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Vous êtes inscrit à notre newsletter !
                </h3>
                <p className="text-green-700 text-lg">
                  Merci pour votre inscription. Vous recevrez nos actualités par email.
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-16 bg-complementary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-dark">Restez informé des actualités</h2>
              <p className="mb-8 text-muted-foreground">
                Inscrivez-vous à notre newsletter pour recevoir nos dernières publications.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base"
                  placeholder="exemple@email.com"
                />
              </div>

              {!showFullForm && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowFullForm(true)}
                    className="text-sm text-primary hover:text-primary/80 underline"
                  >
                    + Ajouter mes informations personnelles (optionnel)
                  </button>
                </div>
              )}

              {showFullForm && (
                <div className="space-y-4 border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="Votre prénom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowFullForm(false)}
                      className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                      - Masquer les champs optionnels
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 text-base"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Inscription en cours...
                    </div>
                  ) : (
                    "S'inscrire à la newsletter"
                  )}
                </Button>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                En vous inscrivant, vous acceptez de recevoir nos communications.
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Actualités fiscales & sociales</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Consultez notre sélection d'articles, guides et ressources pour vous tenir informé
              des actualités juridiques, comptables, fiscales et sociales.
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
              </Button>
            </div>
            
            {showFilters && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-center mb-4">Filtrer par catégorie</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant={selectedCategory === 'TOUS' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('TOUS')}
                    className="flex items-center gap-2"
                  >
                    <Tag className="h-4 w-4" />
                    Tous
                  </Button>
                  <Button
                    variant={selectedCategory === 'FISCAL' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('FISCAL')}
                    className="flex items-center gap-2"
                  >
                    <Landmark className="h-4 w-4" />
                    Fiscal
                  </Button>
                  <Button
                    variant={selectedCategory === 'SOCIAL' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('SOCIAL')}
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Social
                  </Button>
                  <Button
                    variant={selectedCategory === 'PROFESSIONNEL' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('PROFESSIONNEL')}
                    className="flex items-center gap-2"
                  >
                    <Briefcase className="h-4 w-4" />
                    Professionnels
                  </Button>
                  <Button
                    variant={selectedCategory === 'PARTICULIER' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('PARTICULIER')}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Particuliers
                  </Button>
                  <Button
                    variant={selectedCategory === 'COLLECTIVITE' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('COLLECTIVITE')}
                    className="flex items-center gap-2"
                  >
                    <Building2 className="h-4 w-4" />
                    Collectivités
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article List */}
      <section className="py-12">
        <div className="container-custom">
          {loadingArticles ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
                <div key={category} className="space-y-6">
                  <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
                    {category === 'PROFESSIONNEL' && <Briefcase className="h-5 w-5 text-blue-600" />}
                    {category === 'PARTICULIER' && <User className="h-5 w-5 text-green-600" />}
                    {category === 'COLLECTIVITE' && <Building2 className="h-5 w-5 text-purple-600" />}
                    {category === 'SOCIAL' && <Users className="h-5 w-5 text-orange-600" />}
                    {category === 'FISCAL' && <Landmark className="h-5 w-5 text-red-600" />}
                    À LA UNE {category}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryArticles.map((article) => (
                      <Card key={article.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              {article.date}
                            </div>
                          </div>
                          <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {article.excerpt || article.contentSnippet}
                          </p>
                          
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
                                      <a href={resource.url} download>
                                        <Download className="h-3 w-3" />
                                      </a>
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="w-full">
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                              Lire l'article complet
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      {renderNewsletterSection()}
    </>
  );
}