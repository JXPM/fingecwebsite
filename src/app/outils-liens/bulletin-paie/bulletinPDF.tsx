import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

// Enregistrer une police si nécessaire
Font.register({
  family: "Open Sans",
  fonts: [
    { src: "https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf" },
    { src: "https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhs.ttf", fontWeight: 600 }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Open Sans"
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "solid"
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
  }
});

export const BulletinPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>BULLETIN DE PAIE</Text>
        <Text style={styles.subtitle}>Simulation générée le {new Date().toLocaleDateString('fr-FR')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rémunération</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Salaire brut:</Text>
          <Text style={styles.value}>{data.brut.toFixed(2)} €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Salaire net avant impôt:</Text>
          <Text style={styles.value}>{data.netAvantImpots.toFixed(2)} €</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cotisations salariales</Text>
        <View style={styles.row}>
          <Text style={styles.label}>CSG:</Text>
          <Text style={styles.value}>{data.cotisations.csg.toFixed(2)} €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CRDS:</Text>
          <Text style={styles.value}>{data.cotisations.crds.toFixed(2)} €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sécurité sociale:</Text>
          <Text style={styles.value}>{data.cotisations.secu.toFixed(2)} €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Assurance chômage:</Text>
          <Text style={styles.value}>{data.cotisations.chomage.toFixed(2)} €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Retraite:</Text>
          <Text style={styles.value}>{data.cotisations.retraite.toFixed(2)} €</Text>
        </View>
        {data.cotisations.prevoyance > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Prévoyance:</Text>
            <Text style={styles.value}>{data.cotisations.prevoyance.toFixed(2)} €</Text>
          </View>
        )}
        <View style={styles.totalRow}>
          <Text>Total cotisations salariales:</Text>
          <Text>{data.cotisations.total.toFixed(2)} €</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cotisations patronales</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total cotisations patronales:</Text>
          <Text style={styles.value}>{data.cotisationsPatronales.toFixed(2)} €</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>Coût total pour l'employeur:</Text>
          <Text>{data.coutTotal.toFixed(2)} €</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Ce document est une simulation à titre informatif et ne constitue pas un bulletin de paie officiel.</Text>
        <Text>Généré via [VotreApplication] - {new Date().toLocaleDateString('fr-FR')}</Text>
      </View>
    </Page>
  </Document>
);