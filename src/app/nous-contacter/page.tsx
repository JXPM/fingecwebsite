import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import MapBox from "@/components/MapBox";

export default function NousContacter() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-primary mb-6">Nous contacter</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Informations de contact */}
            <div className="lg:col-span-1">
              <div className="bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold text-primary mb-6">Informations de contact</h2>

                <div className="space-y-6">
                  {/* Adresse */}
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Adresse</h3>
                      <p className="text-muted-foreground">
                        06 Rue Frédéric Chopin<br />
                        67118 Geispolsheim, France
                      </p>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Téléphone</h3>
                      <p className="text-muted-foreground">
                        +33 9 83 00 08 43
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        expert@fingec.com
                      </p>
                    </div>
                  </div>

                  {/* Horaires d'ouverture */}
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Horaires d'ouverture</h3>
                      <p className="text-muted-foreground">
                        Lundi - Vendredi: 8h30 - 18h00<br />
                        Samedi - Dimanche: Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte interactive */}
              <div className="mt-8">
                <MapBox />
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container-custom">
          <h2 className="heading-secondary text-center mb-12">Questions fréquentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Comment prendre rendez-vous avec un expert-comptable ?</h3>
              <p className="text-muted-foreground">
                Vous pouvez prendre rendez-vous en nous contactant par téléphone, par email ou en remplissant le formulaire de contact ci-dessus. Un de nos experts vous recontactera dans les plus brefs délais.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Quels documents dois-je apporter lors d'un premier rendez-vous ?</h3>
              <p className="text-muted-foreground">
                Pour un premier rendez-vous, nous vous recommandons d'apporter vos derniers bilans, vos statuts si vous êtes déjà constitué en société, et tout document relatif à votre activité ou à votre projet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Proposez-vous des formules adaptées aux petites entreprises ?</h3>
              <p className="text-muted-foreground">
                Oui, nous proposons des formules adaptées à tous types de structures, de l'entrepreneur individuel à la PME. N'hésitez pas à nous contacter pour en savoir plus.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">Comment se déroule la collaboration à distance ?</h3>
              <p className="text-muted-foreground">
                Nous utilisons des outils sécurisés de partage de documents et de visioconférence pour assurer un suivi efficace à distance. Nous pouvons également nous adapter à vos outils préférés.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}