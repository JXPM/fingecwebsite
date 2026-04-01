'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    tarteaucitron: any;
    __tarteaucitronInitialized?: boolean;
    __fingecTacServicesRegistered?: boolean;
  }
}

const TarteaucitronInit = () => {
  useEffect(() => {
    // Empêche une double initialisation (montage multiple/StrictMode)
    if (window.__tarteaucitronInitialized) {
      return;
    }

    // Fonction pour charger les scripts de manière asynchrone
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Vérifier si le script existe déjà
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initTarteaucitron = async () => {
      try {
        // Charger les scripts dans l'ordre correct
        await loadScript('/tarteaucitron/tarteaucitron.js');
        await loadScript('/tarteaucitron/tarteaucitron.services.js');
        
        // Attendre un petit délai pour s'assurer que les scripts sont bien chargés
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Vérifier que tarteaucitron est disponible
        if (typeof window.tarteaucitron !== 'undefined') {
          if (!window.__fingecTacServicesRegistered) {
            window.tarteaucitron.services.mapbox = {
              key: "mapbox",
              type: "other",
              name: "Carte interactive (Mapbox)",
              uri: "https://www.mapbox.com/legal/privacy",
              needConsent: true,
              cookies: [],
              js: function () {},
              fallback: function () {}
            };
            window.__fingecTacServicesRegistered = true;
          }

          window.__tarteaucitronInitialized = true;

          // Configuration de Tarteaucitron
          window.tarteaucitron.init({
            privacyUrl: "/politique-confidentialite", // URL de votre politique de confidentialité
            hashtag: "#tarteaucitron", // Hashtag pour ouvrir le panneau
            cookieName: "tarteaucitron", // Nom du cookie
            orientation: "middle", // Position de la bannière (top, middle, bottom)
            groupServices: false, // Grouper les services par catégorie
            showAlertSmall: false, // Afficher l'alerte en petit
            cookieslist: false, // Afficher la liste des cookies
            closePopup: false, // Fermer automatiquement le popup
            showIcon: true, // Afficher l'icône
            iconPosition: "BottomLeft", // Position de l'icône (BottomRight, BottomLeft, TopRight, TopLeft)
            iconSrc: "/images/cookie-mascot.png", // Icône personnalisée
            adblocker: false, // Détecter les adblockers
            DenyAllCta: true, // Bouton "Tout refuser"
            AcceptAllCta: true, // Bouton "Tout accepter"
            highPrivacy: true, // Mode haute confidentialité
            handleBrowserDNTRequest: false, // Respecter le Do Not Track
            googleConsentMode: true, // Meilleure compatibilité conformité Google
            removeCredit: false, // Retirer le crédit Tarteaucitron
            moreInfoLink: true, // Lien "Plus d'informations"
            useExternalCss: false, // Utiliser un CSS externe
            useExternalJs: false, // Utiliser un JS externe
            readmoreLink: "", // Lien "En savoir plus"
            mandatory: false, // Ne pas afficher la section "Cookies obligatoires"
            mandatoryCta: false // Pas de CTA associé aux services obligatoires
          });

          (window.tarteaucitron.job = window.tarteaucitron.job || []).push("mapbox");

          // Ouvrir automatiquement le panneau au premier chargement
          setTimeout(() => {
            if (window.tarteaucitron && typeof window.tarteaucitron.userInterface?.openPanel === 'function') {
              // Vérifier si c'est la première visite (pas de cookie tarteaucitron)
              const tarteaucitronCookie = document.cookie.split(';').find(cookie => 
                cookie.trim().startsWith('tarteaucitron=')
              );
              
              if (!tarteaucitronCookie) {
                window.tarteaucitron.userInterface.openPanel();
              }
            }
          }, 500);

          // Exemple d'ajout de services - décommentez selon vos besoins
          
          // Google Analytics 4
          // window.tarteaucitron.user.gtagUa = 'G-XXXXXXXXXX';
          // (window.tarteaucitron.job = window.tarteaucitron.job || []).push('gtag');
          
          // Google Tag Manager
          // window.tarteaucitron.user.googletagmanagerId = 'GTM-XXXXXXX';
          // (window.tarteaucitron.job = window.tarteaucitron.job || []).push('googletagmanager');
          
          // Facebook Pixel
          // window.tarteaucitron.user.facebookpixelId = 'XXXXXXXXXXXXXXXXX';
          // (window.tarteaucitron.job = window.tarteaucitron.job || []).push('facebookpixel');
          
          // YouTube
          // (window.tarteaucitron.job = window.tarteaucitron.job || []).push('youtube');
          
          // Google Maps
          // (window.tarteaucitron.job = window.tarteaucitron.job || []).push('googlemaps');
          
          console.log('Tarteaucitron initialisé avec succès');
        } else {
          window.__tarteaucitronInitialized = false;
          console.error('Tarteaucitron n\'est pas disponible');
        }
      } catch (error) {
        window.__tarteaucitronInitialized = false;
        console.error('Erreur lors du chargement de Tarteaucitron:', error);
      }
    };

    // Lancer l'initialisation
    initTarteaucitron();

    // Cleanup function
    return () => {
      // Nettoyer si nécessaire
      if (typeof window.tarteaucitron !== 'undefined') {
        // Optionnel : nettoyer les événements ou états si nécessaire
      }
    };
  }, []);

  return (
    <>
      {/* Conteneur principal pour Tarteaucitron */}
      <div id="tarteaucitronRoot"></div>
    </>
  );
};

export default TarteaucitronInit;