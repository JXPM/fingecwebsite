// Taux de cotisations sociales (exemples - à mettre à jour avec les taux réels)
const TAUX = {
    CSG: 9.2,
    CRDS: 0.5,
    SECURITE_SOCIALE: 6.9,
    ASSURANCE_CHOMAGE: 3.05,
    RETRAITE: 10.15,
    PREVOYANCE: 1.5,
    // ... autres taux
  };
  
  export function calculerSalaireNet(brut: number, cadre: boolean = false) {
    // Calcul des différentes cotisations
    const csg = brut * (TAUX.CSG / 100);
    const crds = brut * (TAUX.CRDS / 100);
    const secu = brut * (TAUX.SECURITE_SOCIALE / 100);
    const chomage = brut * (TAUX.ASSURANCE_CHOMAGE / 100);
    const retraite = brut * (TAUX.RETRAITE / 100);
    
    // Cotisations supplémentaires pour les cadres
    const prevoyance = cadre ? brut * (TAUX.PREVOYANCE / 100) : 0;
    
    const totalCotisations = csg + crds + secu + chomage + retraite + prevoyance;
    const netAvantImpots = brut - totalCotisations;
    
    return {
      brut,
      netAvantImpots,
      cotisations: {
        csg,
        crds,
        secu,
        chomage,
        retraite,
        prevoyance,
        total: totalCotisations
      }
    };
  }
  
  export function calculerCoutEmployeur(brut: number, cadre: boolean = false) {
    // Cotisations patronales (exemples)
    const cotisationsPatronales = brut * 0.42; // ~42% en moyenne
    
    return {
      coutTotal: brut + cotisationsPatronales,
      cotisationsPatronales
    };
  }