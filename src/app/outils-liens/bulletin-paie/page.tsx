"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BulletinPDF } from "./bulletinPDF";

// Types
type Cotisations = {
  csg: number;
  crds: number;
  secu: number;
  chomage: number;
  retraite: number;
  prevoyance: number;
  total: number;
};

type Resultats = {
  brut: number;
  netAvantImpots: number;
  coutTotal: number;
  cotisations: Cotisations;
  cotisationsPatronales: number;
};

export default function BulletinPaieSimulator() {
  const [resultats, setResultats] = useState<Resultats | null>(null);
  const [calculationType, setCalculationType] = useState<string>("brut-to-net");
  const [contractType, setContractType] = useState<string>("cdi");
  const [status, setStatus] = useState<string>("non-cadre");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    const brut = calculationType === "brut-to-net" 
      ? Number(data.salary)
      : calculerBrutFromNet(Number(data.salary), status === "cadre");
    
    const net = calculerSalaireNet(brut, status === "cadre");
    const coutEmployeur = calculerCoutEmployeur(brut, status === "cadre");
    
    setResultats({
      ...net,
      ...coutEmployeur
    });
  };

  const calculerBrutFromNet = (net: number, cadre: boolean): number => {
    // Approximation - en réalité besoin d'un calcul plus complexe
    const tauxCotisations = cadre ? 0.23 : 0.22; // Exemple simplifié
    return net / (1 - tauxCotisations);
  };

  const calculerSalaireNet = (brut: number, cadre: boolean) => {
    // Taux 2024 (à actualiser)
    const cotisations: Cotisations = {
      csg: brut * 0.092,
      crds: brut * 0.005,
      secu: brut * 0.069,
      chomage: brut * 0.0305,
      retraite: brut * 0.1015,
      prevoyance: cadre ? brut * 0.015 : 0,
      total: 0
    };
    
    cotisations.total = Object.values(cotisations).reduce((a, b) => a + b, 0);
    
    return {
      brut,
      netAvantImpots: brut - cotisations.total,
      cotisations
    };
  };

  const calculerCoutEmployeur = (brut: number, cadre: boolean) => {
    // Taux patronaux 2024 (simplifié)
    const cotisationsPatronales = brut * (cadre ? 0.45 : 0.42);
    
    return {
      coutTotal: brut + cotisationsPatronales,
      cotisationsPatronales
    };
  };

  const resetForm = () => {
    setResultats(null);
    setCalculationType("brut-to-net");
    setContractType("cdi");
    setStatus("non-cadre");
  };

  return (
    <section className="py-12 bg-gray-50 min-h-[80vh]">
      <div className="container-custom">
        <div className="mb-10 max-w-2xl mx-auto text-center">
          <h1 className="heading-primary mb-4">Simulateur de bulletin de paie</h1>
          <p className="text-muted-foreground text-lg">
            Convertissez facilement entre salaire brut et net, et simulez un bulletin de paie complet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de simulation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Paramètres de simulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calculationType">Type de calcul</Label>
                  <Select defaultValue={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brut-to-net">Brut → Net</SelectItem>
                      <SelectItem value="net-to-brut">Net → Brut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Montant</Label>
                  <Input 
                    id="salary" 
                    name="salary" 
                    type="number" 
                    placeholder="Entrez le montant" 
                    required 
                    min={0}
                    step={0.01}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractType">Type de contrat</Label>
                  <Select defaultValue={contractType} onValueChange={setContractType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un contrat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cdi">CDI</SelectItem>
                      <SelectItem value="cdd">CDD</SelectItem>
                      <SelectItem value="interim">Intérim</SelectItem>
                      <SelectItem value="apprentissage">Apprentissage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select defaultValue={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cadre">Cadre</SelectItem>
                      <SelectItem value="non-cadre">Non-cadre</SelectItem>
                      <SelectItem value="executive">Cadre dirigeant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Calculer
                  </Button>
                  <Button 
                    variant="outline" 
                    type="reset" 
                    className="flex-1"
                    onClick={resetForm}
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Réinitialiser
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Résultats */}
          <Card>
            <CardHeader>
              <CardTitle>Résultats de la simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span>Salaire brut</span>
                  <span className="font-medium">
                    {resultats?.brut ? resultats.brut.toFixed(2) + ' €' : '- €'}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Salaire net avant impôt</span>
                  <span className="font-medium">
                    {resultats?.netAvantImpots ? resultats.netAvantImpots.toFixed(2) + ' €' : '- €'}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Cotisations salariales</span>
                  <span className="font-medium">
                    {resultats?.cotisations ? resultats.cotisations.total.toFixed(2) + ' €' : '- €'}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Cotisations patronales</span>
                  <span className="font-medium">
                    {resultats?.cotisationsPatronales ? resultats.cotisationsPatronales.toFixed(2) + ' €' : '- €'}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2 font-semibold">
                  <span>Coût total employeur</span>
                  <span className="font-medium">
                    {resultats?.coutTotal ? resultats.coutTotal.toFixed(2) + ' €' : '- €'}
                  </span>
                </div>
              </div>

              {/* Détails des cotisations */}
              {resultats && (
                <div className="mt-6 pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">Détail des cotisations salariales:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>CSG</span>
                      <span>{resultats.cotisations.csg.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>CRDS</span>
                      <span>{resultats.cotisations.crds.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sécurité sociale</span>
                      <span>{resultats.cotisations.secu.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Assurance chômage</span>
                      <span>{resultats.cotisations.chomage.toFixed(2)} €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Retraite</span>
                      <span>{resultats.cotisations.retraite.toFixed(2)} €</span>
                    </li>
                    {resultats.cotisations.prevoyance > 0 && (
                      <li className="flex justify-between">
                        <span>Prévoyance (cadre)</span>
                        <span>{resultats.cotisations.prevoyance.toFixed(2)} €</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Section pour télécharger/générer le bulletin */}
              <div className="mt-8 pt-6 border-t">
                {resultats ? (
                  <PDFDownloadLink 
                    document={<BulletinPDF data={resultats} />} 
                    fileName={`bulletin-paie-${new Date().toISOString().slice(0,10)}.pdf`}
                  >
                    {({ loading }) => (
                      <Button className="w-full" disabled={loading}>
                        {loading ? "Génération en cours..." : "Télécharger le bulletin (PDF)"}
                      </Button>
                    )}
                  </PDFDownloadLink>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Générer le bulletin de paie (PDF)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section d'informations */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Informations sur le calcul</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm">
              <p>
                Ce simulateur permet de convertir entre salaire brut et net en prenant en compte les cotisations sociales obligatoires en France.
              </p>
              <ul className="list-disc pl-5">
                <li>Les calculs sont basés sur les taux en vigueur pour l'année en cours</li>
                <li>Les résultats sont donnés à titre indicatif</li>
                <li>Pour un calcul précis, consultez un expert comptable</li>
                <li>Les taux utilisés sont des moyennes et peuvent varier selon votre situation</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}