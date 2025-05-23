"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, FileText, PieChart, Users, Briefcase, Clock, Award, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function Home() {
  // Animation pour la Hero Section
  const heroControls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false });

  // Références pour les autres sections
  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const servicesControls = useAnimation();
  
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
  const aboutControls = useAnimation();
  
  const whyUsRef = useRef(null);
  const isWhyUsInView = useInView(whyUsRef, { once: true, amount: 0.2 });
  const whyUsControls = useAnimation();
  
  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: true, amount: 0.3 });
  const contactControls = useAnimation();

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start("visible");
    } else {
      heroControls.start("hidden");
    }
    
    if (isServicesInView) {
      servicesControls.start("visible");
    }
    
    if (isAboutInView) {
      aboutControls.start("visible");
    }
    
    if (isWhyUsInView) {
      whyUsControls.start("visible");
    }
    
    if (isContactInView) {
      contactControls.start("visible");
    }
  }, [isHeroInView, isServicesInView, isAboutInView, isWhyUsInView, isContactInView, 
      heroControls, servicesControls, aboutControls, whyUsControls, contactControls]);

  return (
    <>
      {/* Section Héro avec animation de texte */}
      <section ref={heroRef} className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="/images/pagep.avif"
            alt="Équipe FINGEC"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Contenu animé */}
        <div className="container-custom h-full flex flex-col justify-center relative z-10">
          <motion.div
            initial="hidden"
            animate={heroControls}
            variants={{
              hidden: { opacity: 0},
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.5
                }
              }
            }}
            className="max-w-3xl mx-auto text-center space-y-6 text-white"
          >
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 1.2,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }
                }
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md"
            >
              Votre <span className="text-primary-300">expert-comptable</span> vous accompagne
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.4
                  }
                }
              }}
              className="text-lg md:text-xl text-gray-100 drop-shadow-md"
            >
              FINGEC met son expertise au service de votre entreprise.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.2,
                    delay: 0.8
                  }
                }
              }}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.8,
                      ease: "backOut"
                    }
                  }
                }}
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary-600">
                  <Link href="/nous-contacter">Prendre rendez-vous</Link>
                </Button>
              </motion.div>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.8,
                      ease: "backOut"
                    }
                  }
                }}
              >
                <Button asChild variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20">
                  <Link href="/notre-savoir-faire">
                    Découvrir nos services <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Section Services */}
      <section ref={servicesRef} className="py-20 min-h-[50vh]">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={servicesControls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
            className="text-center mb-12"
          >
            <h2 className="heading-primary mb-4">Notre savoir-faire</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Des services de qualité pour répondre à tous vos besoins.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={servicesControls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Service 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Comptabilité et gestion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tenue complète de la comptabilité, élaboration des bilans, comptes de résultat et supervision financière adaptée à vos besoins.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/notre-savoir-faire/comptabilite-gestion">
                      En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Conseil et assistance juridique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Accompagnement dans vos démarches juridiques, conseils adaptés et solutions stratégiques pour optimiser votre entreprise.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/notre-savoir-faire/conseil-juridique">
                      En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Social</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gestion complète du social : bulletins de paie, déclarations sociales, contrats de travail et conseil en ressources humaines.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/notre-savoir-faire/social">
                      En savoir plus <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section À propos */}
      <section ref={aboutRef} className="py-20 bg-complementary/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={aboutControls}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.8 }
                }
              }}
              className="order-2 lg:order-1 relative h-[400px] bg-slate-200 rounded-lg shadow-xl"
            >
              <Image
                src="/images/equipe.png"
                alt="Équipe FINGEC"
                fill
                className="object-cover rounded-lg"
                priority
                quality={90}
              />
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={aboutControls}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.8,
                    staggerChildren: 0.15,
                    delayChildren: 0.3
                  }
                }
              }}
              className="order-1 lg:order-2 space-y-6"
            >
              <h2 className="heading-primary mb-2">À propos de FINGEC</h2>
              <p className="text-lg text-muted-foreground">
                Depuis notre création, nous accompagnons avec expertise nos clients dans la gestion de leur comptabilité et le développement de leur activité.
              </p>
              <div className="space-y-4 mt-6">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.5 }
                    }
                  }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Expertise reconnue</h3>
                    <p className="text-muted-foreground">Une équipe expérimentée et qualifiée pour vous accompagner.</p>
                  </div>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.5 }
                    }
                  }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Proximité client</h3>
                    <p className="text-muted-foreground">Un suivi personnalisé et adapté à vos besoins spécifiques.</p>
                  </div>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.5 }
                    }
                  }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Réactivité</h3>
                    <p className="text-muted-foreground">Des réponses rapides à vos questions et demandes.</p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5 }
                  }
                }}
              >
                <Button asChild className="mt-4">
                  <Link href="/nous-contacter">
                    Nous contacter
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous choisir */}
      <section ref={whyUsRef} className="py-20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={whyUsControls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }
            }}
            className="text-center mb-12"
          >
            <h2 className="heading-primary mb-4">Pourquoi choisir FINGEC ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nous proposons un accompagnement sur mesure, basé sur l'expertise et la confiance, pour vous aider à atteindre vos objectifs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={whyUsControls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Atout 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.5
                  }
                }
              }}
            >
              <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Confiance</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Relation durable fondée sur la confidentialité et la sécurité de vos données.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Atout 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.5
                  }
                }
              }}
            >
              <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Compétence</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Équipe qualifiée avec des formations continues pour un service de qualité.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Atout 3 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.5 
                  }
                }
              }}
            >
              <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Briefcase className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Expérience</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Des années d'expérience dans tous types de secteurs et d'entreprises.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Atout 4 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.5
                  }
                }
              }}
            >
              <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Disponibilité</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    À votre disposition pour répondre à vos questions et vous accompagner.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Contact rapide */}
      <section ref={contactRef} className="py-16 bg-complementary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            animate={contactControls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6 }
                }
              }}
              className="text-3xl font-bold mb-6"
            >
              Besoin d'un conseil ou d'une information ?
            </motion.h2>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6 }
                }
              }}
              className="text-lg mb-8 max-w-2xl mx-auto"
            >
              Contactez notre équipe d'experts. Nous vous répondrons dans les plus brefs délais.
            </motion.p>
            
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.5 }
                  }
                }}
              >
                <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white">
                  <Link href="/nous-contacter">
                    Nous contacter
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.5 }
                  }
                }}
              >
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                  <Link href="tel:+33123456789">
                    +33 9 83 00 08 43
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

