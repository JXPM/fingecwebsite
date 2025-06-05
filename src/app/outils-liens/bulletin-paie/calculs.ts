export const TAUX_2025 = {
    SALARIALES: {
      CSG_DEDUCTIBLE: 6.8,
      CSG_NON_DEDUCTIBLE: 2.4,
      CRDS: 0.5,
      SECURITE_SOCIALE: 0.75,
      ASSURANCE_CHOMAGE: 2.4,
      RETRAITE_BASE: 6.9,
      RETRAITE_COMPLEMENTAIRE: 3.15,
      PREVOYANCE_CADRE: 1.5,
    },
    
    PATRONALES: {
      NON_CADRE: 42,
      CADRE: 45,
      DIRIGEANT: 50,
    },
    
    IMPOT: {
      TRANCHES: [
        { min: 0, max: 11294, taux: 0 },
        { min: 11294, max: 28797, taux: 11 },
        { min: 28797, max: 82341, taux: 30 },
        { min: 82341, max: 177106, taux: 41 },
        { min: 177106, max: Infinity, taux: 45 }
      ],
      ABATTEMENT_SALARIE: 10,
      ABATTEMENT_MIN: 468,
      ABATTEMENT_MAX: 12627
    },
    
    PRELEVEMENTS: {
      CELIBATAIRE: 7.5,
      MARIE_SANS_ENFANT: 6.5,
      MARIE_AVEC_ENFANTS: 4.5,
      MARIE_UN_SEUL_SALAIRE: 5.5
    }
};
  
export const TAUX_2024 = {
    SALARIALES: {
      CSG_DEDUCTIBLE: 6.8,
      CSG_NON_DEDUCTIBLE: 2.4,
      CRDS: 0.5,
      SECURITE_SOCIALE: 0.75,
      ASSURANCE_CHOMAGE: 2.4,
      RETRAITE_BASE: 6.9,
      RETRAITE_COMPLEMENTAIRE: 3.15,
      PREVOYANCE_CADRE: 1.5,
    },
    PATRONALES: {
      NON_CADRE: 42,
      CADRE: 45,
      DIRIGEANT: 50,
    },
    IMPOT: {
      TRANCHES: [
        { min: 0, max: 11085, taux: 0 },
        { min: 11085, max: 28221, taux: 11 },
        { min: 28221, max: 80816, taux: 30 },
        { min: 80816, max: 173502, taux: 41 },
        { min: 173502, max: Infinity, taux: 45 }
      ],
      ABATTEMENT_SALARIE: 10,
      ABATTEMENT_MIN: 458,
      ABATTEMENT_MAX: 12384
    },
    PRELEVEMENTS: {
      CELIBATAIRE: 7.5,
      MARIE_SANS_ENFANT: 6.5,
      MARIE_AVEC_ENFANTS: 4.5,
      MARIE_UN_SEUL_SALAIRE: 5.5
    }
};
  
const TAUX_PAR_ANNEE: Record<number, typeof TAUX_2025> = {
    2024: TAUX_2024,
    2025: TAUX_2025,
};
  
export function getCurrentRates(annee?: number) {
    const anneeActuelle = annee || new Date().getFullYear();
    return TAUX_PAR_ANNEE[anneeActuelle] || TAUX_2025;
}
  
function calculerImpotRevenu(revenuImposable: number, taux: typeof TAUX_2025) {
    let impot = 0;
    
    for (const tranche of taux.IMPOT.TRANCHES) {
      if (revenuImposable > tranche.min) {
        const baseImposable = Math.min(revenuImposable, tranche.max) - tranche.min;
        impot += (baseImposable * tranche.taux) / 100;
      }
    }
    
    return Math.max(0, impot);
}
  
export function calculerSalaireNet(
    brut: number, 
    cadre: boolean = false, 
    annee?: number,
    situationFamiliale: string = 'celibataire',
    tempsPartiel: number = 100
) {
    const taux = getCurrentRates(annee);
    const t = taux.SALARIALES;
    
    const brutAjuste = brut;
    const brutAnnuel = brutAjuste * 12;
    
    const csgDeductible = brutAjuste * (t.CSG_DEDUCTIBLE / 100);
    const csgNonDeductible = brutAjuste * (t.CSG_NON_DEDUCTIBLE / 100);
    const crds = brutAjuste * (t.CRDS / 100);
    const secu = brutAjuste * (t.SECURITE_SOCIALE / 100);
    const chomage = brutAjuste * (t.ASSURANCE_CHOMAGE / 100);
    const retraiteBase = brutAjuste * (t.RETRAITE_BASE / 100);
    const retraiteComplementaire = brutAjuste * (t.RETRAITE_COMPLEMENTAIRE / 100);
    const prevoyance = cadre ? brutAjuste * (t.PREVOYANCE_CADRE / 100) : 0;
    
    const totalCotisations = csgDeductible + csgNonDeductible + crds + secu + chomage + retraiteBase + retraiteComplementaire + prevoyance;
    const netAvantImpots = brutAjuste - totalCotisations;
    
    const revenuImposableAnnuel = brutAnnuel - (csgDeductible * 12);
    const abattement = Math.min(
      Math.max(revenuImposableAnnuel * (taux.IMPOT.ABATTEMENT_SALARIE / 100), taux.IMPOT.ABATTEMENT_MIN),
      taux.IMPOT.ABATTEMENT_MAX
    );
    const revenuImposableNet = Math.max(0, revenuImposableAnnuel - abattement);
    
    const impotAnnuel = calculerImpotRevenu(revenuImposableNet, taux);
    const impotMensuel = impotAnnuel / 12;
    
    let tauxPrelevement = 0;
    switch(situationFamiliale) {
      case 'marie_sans_enfant': tauxPrelevement = taux.PRELEVEMENTS.MARIE_SANS_ENFANT; break;
      case 'marie_avec_enfants': tauxPrelevement = taux.PRELEVEMENTS.MARIE_AVEC_ENFANTS; break;
      case 'marie_un_seul_salaire': tauxPrelevement = taux.PRELEVEMENTS.MARIE_UN_SEUL_SALAIRE; break;
      default: tauxPrelevement = taux.PRELEVEMENTS.CELIBATAIRE;
    }
    
    const prelevementSource = brutAjuste * (tauxPrelevement / 100);
    const netApresImpots = netAvantImpots - prelevementSource;
    
    const heuresMensuelle = 151.67 * (tempsPartiel / 100);
    const brutHoraire = brutAjuste / heuresMensuelle;
    const netAvantImpotsHoraire = netAvantImpots / heuresMensuelle;
    const netApresImpotsHoraire = netApresImpots / heuresMensuelle;
    
    return {
      brut: brutAjuste,
      brutAnnuel,
      netAvantImpots,
      netApresImpots,
      impotMensuel,
      prelevementSource,
      brutHoraire,
      netAvantImpotsHoraire,
      netApresImpotsHoraire,
      heuresMensuelle,
      tempsPartiel,
      anneeReference: annee || new Date().getFullYear(),
      cotisations: {
        csgDeductible,
        csgNonDeductible,
        csg: csgDeductible + csgNonDeductible,
        crds,
        secu,
        chomage,
        retraite: retraiteBase + retraiteComplementaire,
        retraiteBase,
        retraiteComplementaire,
        prevoyance,
        total: totalCotisations
      }
    };
}
  
export function calculerSalaireBrut(
    net: number, 
    cadre: boolean = false, 
    annee?: number,
    situationFamiliale: string = 'celibataire',
    tempsPartiel: number = 100,
    typeNet: 'avant_impots' | 'apres_impots' = 'avant_impots'
) {
    const tauxCharges = cadre ? 0.25 : 0.23;
    let brutEstime = typeNet === 'avant_impots' ? net / (1 - tauxCharges) : net / (1 - tauxCharges - 0.08);
    
    for (let i = 0; i < 10; i++) {
      const resultat = calculerSalaireNet(brutEstime, cadre, annee, situationFamiliale, tempsPartiel);
      const netCalcule = typeNet === 'avant_impots' ? resultat.netAvantImpots : resultat.netApresImpots;
      const erreur = netCalcule - net;
      
      if (Math.abs(erreur) < 0.01) break;
      
      brutEstime = brutEstime - (erreur / (1 - tauxCharges));
    }
    
    return calculerSalaireNet(brutEstime, cadre, annee, situationFamiliale, tempsPartiel);
}
  
export function calculerCoutEmployeur(
    brut: number, 
    status: string = "non-cadre", 
    annee?: number
) {
    const taux = getCurrentRates(annee);
    let tauxPatronal;
    
    switch(status) {
      case "cadre":
        tauxPatronal = taux.PATRONALES.CADRE;
        break;
      case "executive":
        tauxPatronal = taux.PATRONALES.DIRIGEANT;
        break;
      default:
        tauxPatronal = taux.PATRONALES.NON_CADRE;
    }
    
    const cotisationsPatronales = brut * (tauxPatronal / 100);
    
    return {
      coutTotal: brut + cotisationsPatronales,
      cotisationsPatronales,
      anneeReference: annee || new Date().getFullYear()
    };
}
  
export function convertirSalaire(salaireMensuel: number, tempsPartiel: number = 100) {
    const heuresMensuelle = 151.67 * (tempsPartiel / 100);
    const salaireAnnuel = salaireMensuel * 12;
    const salaireHoraire = salaireMensuel / heuresMensuelle;
    
    return {
      mensuel: salaireMensuel,
      annuel: salaireAnnuel,
      horaire: salaireHoraire,
      heuresMensuelle
    };
}
  
export function getAnneesDisponibles(): number[] {
    return Object.keys(TAUX_PAR_ANNEE)
      .map(Number)
      .sort((a, b) => b - a);
}