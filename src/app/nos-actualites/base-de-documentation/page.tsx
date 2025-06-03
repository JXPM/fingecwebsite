"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, User, Tag, ArrowLeft, FileText, Download } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { articles } from "@/lib/articles";
import { toast } from "react-hot-toast";

interface SubscriptionForm {
  email: string;
  nom: string;
  prenom: string;
  telephone: string;
}

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

  // Vérifier si l'utilisateur est déjà inscrit
  useEffect(() => {
    const isSubscribed = localStorage.getItem('newsletter_subscribed_base-documentation');
    if (isSubscribed) {
      setSubscribed(true);
    }
  }, []);

  // Inscription aux notifications push (optionnel)
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker enregistré:', registration);
    } catch (error) {
      console.error('Erreur Service Worker:', error);
    }
  };

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
        toast.success('Inscription réussie ! Vérifiez votre email.');
        setSubscribed(true);
        localStorage.setItem('newsletter_subscribed_base-documentation', 'true');
        
        // Demander permission pour notifications push
        await requestNotificationPermission(result.subscriberId);
        
        // Reset form
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

  const requestNotificationPermission = async (subscriberId: number) => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
          });

          // Envoyer les détails au serveur
          await fetch('/api/newsletter/push-subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              subscriberId,
              subscription
            }),
          });

          toast.success('Notifications activées !');
        } catch (error) {
          console.error('Erreur notifications push:', error);
        }
      }
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
                  Merci pour votre inscription. Vous recevrez nos actualités de la base documentaire par email et notifications push.
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
                Inscrivez-vous à notre newsletter pour recevoir nos dernières publications et veilles juridiques de la base documentaire.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email (toujours visible) */}
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

              {/* Bouton pour afficher les champs optionnels */}
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

              {/* Champs optionnels */}
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
                En vous inscrivant, vous acceptez de recevoir nos communications. Vous pourrez vous désinscrire à tout moment.
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
                    <Link href={`/nos-actualites/base-de-documentation/${article.id}`}>
                      Lire l'article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {renderNewsletterSection()}
    </>
  );
}