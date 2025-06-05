import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";

Font.register({
  family: "Open Sans",
  fonts: [
    { src: "https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf" },
    { src: "https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhs.ttf", fontWeight: 600 }
  ]
});

const logo = "/images/fingec-logo-final.png";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Open Sans"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "solid"
  },
  logo: {
    width: 100,
    height: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center"
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#334155"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 12
  },
  label: {
    color: "#64748b"
  },
  value: {
    fontWeight: "semibold"
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    borderTopStyle: "solid",
    fontWeight: "bold"
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    borderTopStyle: "solid",
    fontSize: 10,
    color: "#64748b",
    textAlign: "center"
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    fontSize: 11
  }
});

type BulletinPDFProps = {
  resultats: {
    brut: number;
    brutAnnuel: number;
    netAvantImpots: number;
    netApresImpots: number;
    prelevementSource: number;
    impotMensuel: number;
    brutHoraire: number;
    netAvantImpotsHoraire: number;
    netApresImpotsHoraire: number;
    heuresMensuelle: number;
    coutTotal: number;
    cotisationsPatronales: number;
    tempsPartiel: number;
    anneeReference: number;
    cotisations: {
      csgDeductible: number;
      csgNonDeductible: number;
      csg: number;
      crds: number;
      secu: number;
      chomage: number;
      retraite: number;
      retraiteBase: number;
      retraiteComplementaire: number;
      prevoyance: number;
      total: number;
    };
  };
  status: string;
  situationFamiliale: string;
  contractType: string;
  tempsPartiel: number;
};

export const BulletinPDF = ({ 
  resultats, 
  status, 
  situationFamiliale, 
  contractType, 
  tempsPartiel 
}: BulletinPDFProps) => {
  
  const formatAmount = (amount: number) => {
    return amount?.toFixed(2) || "0.00";
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "cadre": return "Cadre";
      case "executive": return "Cadre dirigeant";
      default: return "Non-cadre";
    }
  };

  const getSituationLabel = (situation: string) => {
    switch (situation) {
      case "marie_sans_enfant": return "Marié sans enfant";
      case "marie_avec_enfants": return "Marié avec enfants";
      case "marie_un_seul_salaire": return "Marié un seul salaire";
      default: return "Célibataire";
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>BULLETIN DE PAIE</Text>
            <Text style={styles.subtitle}>
              Simulation générée le {new Date().toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations générales</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Statut:</Text>
            <Text style={styles.value}>{getStatusLabel(status)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Type de contrat:</Text>
            <Text style={styles.value}>{contractType.toUpperCase()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Temps de travail:</Text>
            <Text style={styles.value}>{tempsPartiel}% ({formatAmount(resultats.heuresMensuelle)}h/mois)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Situation familiale:</Text>
            <Text style={styles.value}>{getSituationLabel(situationFamiliale)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Année de référence:</Text>
            <Text style={styles.value}>{resultats.anneeReference}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rémunération</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Salaire brut mensuel:</Text>
            <Text style={styles.value}>{formatAmount(resultats.brut)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Salaire brut annuel:</Text>
            <Text style={styles.value}>{formatAmount(resultats.brutAnnuel)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Salaire brut horaire:</Text>
            <Text style={styles.value}>{formatAmount(resultats.brutHoraire)} €/h</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cotisations salariales</Text>
          <View style={styles.row}>
            <Text style={styles.label}>CSG déductible:</Text>
            <Text style={styles.value}>{formatAmount(resultats.cotisations.csgDeductible)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CSG non déductible:</Text>
            <Text style={styles.value}>{formatAmount(resultats.cotisations.csgNonDeductible)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CRDS:</Text>
            <Text style={styles.value}>{formatAmount(resultats.cotisations.crds)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sécurité sociale:</Text>
            <Text style={styles.value}>{formatAmount(resultats.cotisations.secu)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Assurance chômage:</Text>
            <Text style={styles.value}>{formatAmount(resultats.cotisations.chomage)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Retraite de base:</Text>
            <Text style={styles.value}>{formatAmount(resultats.cotisations.retraiteBase)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Retraite complémentaire:</Text>
            <Text style={styles.value}>{formatAmount(resultats.cotisations.retraiteComplementaire)} €</Text>
          </View>
          {resultats.cotisations.prevoyance > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Prévoyance:</Text>
              <Text style={styles.value}>{formatAmount(resultats.cotisations.prevoyance)} €</Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text>Total cotisations salariales:</Text>
            <Text>{formatAmount(resultats.cotisations.total)} €</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salaires nets</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Salaire net avant impôt:</Text>
            <Text style={styles.value}>{formatAmount(resultats.netAvantImpots)} €</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Prélèvement à la source:</Text>
            <Text style={styles.value}>{formatAmount(resultats.prelevementSource)} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Salaire net après impôt:</Text>
            <Text>{formatAmount(resultats.netApresImpots)} €</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cotisations patronales</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total cotisations patronales:</Text>
            <Text style={styles.value}>{formatAmount(resultats.cotisationsPatronales)} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Coût total pour l'employeur:</Text>
            <Text>{formatAmount(resultats.coutTotal)} €</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Équivalents horaires</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Net avant impôt horaire:</Text>
            <Text style={styles.value}>{formatAmount(resultats.netAvantImpotsHoraire)} €/h</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Net après impôt horaire:</Text>
            <Text style={styles.value}>{formatAmount(resultats.netApresImpotsHoraire)} €/h</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Ce document est une simulation à titre informatif et ne constitue pas un bulletin de paie officiel.</Text>
          <Text>Généré via Fingec simulateur - {new Date().toLocaleDateString('fr-FR')}</Text>
        </View>
      </Page>
    </Document>
  );
};