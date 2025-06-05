"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, RotateCw, Clock, Euro, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BulletinPDF } from "./bulletinPDF";
import { calculerSalaireNet, calculerSalaireBrut, calculerCoutEmployeur } from "./calculs";

type Cotisations = {
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

type Resultats = {
  anneeReference: number;
  brut: number;
  brutAnnuel: number;
  netAvantImpots: number;
  netApresImpots: number;
  impotMensuel: number;
  prelevementSource: number;
  brutHoraire: number;
  netAvantImpotsHoraire: number;
  netApresImpotsHoraire: number;
  heuresMensuelle: number;
  coutTotal: number;
  cotisations: Cotisations;
  cotisationsPatronales: number;
  tempsPartiel: number;
};

export default function BulletinPaieSimulator() {
  const [resultats, setResultats] = useState<Resultats | null>(null);
  const [calculationType, setCalculationType] = useState<string>("brut-to-net");
  const [periodType, setPeriodType] = useState<string>("mensuel");
  const [contractType, setContractType] = useState<string>("cdi");
  const [status, setStatus] = useState<string>("non-cadre");
  const [situationFamiliale, setSituationFamiliale] = useState<string>("celibataire");
  const [tempsPartiel, setTempsPartiel] = useState<string>("100");
  const [typeNet, setTypeNet] = useState<"avant_impots" | "apres_impots">("avant_impots");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      let salary = Number(data.salary);
      const tempsPartielNum = Number(tempsPartiel);
      const estCadre = status === "cadre";
      
      if (periodType === "annuel") {
        salary = salary / 12;
      }
      
      let resultatNet;
      
      if (calculationType === "brut-to-net") {
        resultatNet = calculerSalaireNet(salary, estCadre, undefined, situationFamiliale, tempsPartielNum);
      } else {
        resultatNet = calculerSalaireBrut(salary, estCadre, undefined, situationFamiliale, tempsPartielNum, typeNet);
      }
      
      const coutEmployeur = calculerCoutEmployeur(resultatNet.brut, status);
      
      setResultats({
        ...resultatNet,
        ...coutEmployeur
      });
    } catch (error) {
      console.error("Erreur de calcul:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResultats(null);
    setCalculationType("brut-to-net");
    setPeriodType("mensuel");
    setContractType("cdi");
    setStatus("non-cadre");
    setSituationFamiliale("celibataire");
    setTempsPartiel("100");
    setTypeNet("avant_impots");
  };

  const getSalaryPlaceholder = () => {
    const baseMensuel = calculationType === "brut-to-net" ? "2100" : "1650";
    const baseAnnuel = calculationType === "brut-to-net" ? "25200" : "19800";
    
    if (periodType === "annuel") {
      return `Ex: ${baseAnnuel}`;
    }
    return `Ex: ${baseMensuel}`;
  };

  const getSalaryLabel = () => {
    const typeLabel = calculationType === "brut-to-net" ? "brut" : "net";
    const periodLabel = periodType === "mensuel" ? "mensuel" : "annuel";
    return `Salaire ${typeLabel} ${periodLabel}`;
  };

  return (
    <section className="py-12 bg-gray-50 min-h-[80vh]">
      <div className="container-custom">
        <div className="mb-10 max-w-2xl mx-auto text-center">
          <h1 className="heading-primary mb-4">Simulateur de bulletin de paie</h1>
          <p className="text-muted-foreground text-lg">
            Convertissez facilement entre salaire brut et net, et simulez un bulletin de paie complet avec calculs horaires et après impôts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <Select 
                    defaultValue={calculationType} 
                    onValueChange={setCalculationType}
                  >
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
                  <Label htmlFor="periodType">Période</Label>
                  <Select 
                    defaultValue={periodType} 
                    onValueChange={setPeriodType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensuel">Mensuel</SelectItem>
                      <SelectItem value="annuel">Annuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "net-to-brut" && (
                  <div className="space-y-2">
                    <Label htmlFor="typeNet">Type de net</Label>
                    <Select 
                      defaultValue={typeNet} 
                      onValueChange={(value: string) => setTypeNet(value as "avant_impots" | "apres_impots")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="avant_impots">Net avant impôts</SelectItem>
                        <SelectItem value="apres_impots">Net après impôts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="salary">
                    {getSalaryLabel()}
                  </Label>
                  <Input 
                    id="salary" 
                    name="salary" 
                    type="number" 
                    placeholder={getSalaryPlaceholder()}
                    required 
                    min={0}
                    step={0.01}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempsPartiel">Temps de travail (%)</Label>
                  <Select 
                    defaultValue={tempsPartiel} 
                    onValueChange={setTempsPartiel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le temps" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">Temps plein (100%)</SelectItem>
                      <SelectItem value="80">80% (4/5e)</SelectItem>
                      <SelectItem value="50">50% (mi-temps)</SelectItem>
                      <SelectItem value="25">25% (quart temps)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select 
                    defaultValue={status} 
                    onValueChange={setStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="non-cadre">Non-cadre</SelectItem>
                      <SelectItem value="cadre">Cadre</SelectItem>
                      <SelectItem value="executive">Cadre dirigeant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="situationFamiliale">Situation familiale (pour l'impôt)</Label>
                  <Select 
                    defaultValue={situationFamiliale} 
                    onValueChange={setSituationFamiliale}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une situation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celibataire">Célibataire</SelectItem>
                      <SelectItem value="marie_sans_enfant">Marié sans enfant</SelectItem>
                      <SelectItem value="marie_avec_enfants">Marié avec enfants</SelectItem>
                      <SelectItem value="marie_un_seul_salaire">Marié un seul salaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractType">Type de contrat</Label>
                  <Select 
                    defaultValue={contractType} 
                    onValueChange={setContractType}
                  >
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

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Calcul en cours..." : "Calculer"}
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

          <Card>
            <CardHeader>
              <CardTitle>Résultats de la simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Euro className="w-4 h-4" />
                    Salaires mensuels
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Salaire brut</span>
                      <span className="font-medium">
                        {resultats?.brut ? resultats.brut.toFixed(2) + ' €' : '- €'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Salaire net avant impôt</span>
                      <span className="font-medium">
                        {resultats?.netAvantImpots ? resultats.netAvantImpots.toFixed(2) + ' €' : '- €'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prélèvement à la source</span>
                      <span className="font-medium text-red-600">
                        -{resultats?.prelevementSource ? resultats.prelevementSource.toFixed(2) + ' €' : '- €'}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-green-600">
                      <span>Salaire net après impôt</span>
                      <span>
                        {resultats?.netApresImpots ? resultats.netApresImpots.toFixed(2) + ' €' : '- €'}
                      </span>
                    </div>
                  </div>
                </div>

                {resultats && (
                  <div className="border-b pb-4">
                    <h3 className="font-semibold flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4" />
                      Salaires horaires ({resultats.heuresMensuelle.toFixed(1)}h/mois)
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Brut horaire</span>
                        <span className="font-medium">
                          {resultats.brutHoraire.toFixed(2)} €/h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net avant impôt horaire</span>
                        <span className="font-medium">
                          {resultats.netAvantImpotsHoraire.toFixed(2)} €/h
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-green-600">
                        <span>Net après impôt horaire</span>
                        <span>
                          {resultats.netApresImpotsHoraire.toFixed(2)} €/h
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {resultats && (
                  <div className="border-b pb-4">
                    <h3 className="font-semibold flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4" />
                      Salaires annuels
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Brut annuel</span>
                        <span className="font-medium">
                          {resultats.brutAnnuel.toFixed(0)} €
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net avant impôts annuels</span>
                        <span className="font-medium">
                          {(resultats.netAvantImpots * 12).toFixed(0)} €
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-green-600">
                        <span>Net apres impôts annuels</span>
                        <span>
                          {(resultats.netApresImpots * 12).toFixed(0)} €
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-3">Coûts employeur</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cotisations patronales</span>
                      <span className="font-medium">
                        {resultats?.cotisationsPatronales ? resultats.cotisationsPatronales.toFixed(2) + ' €' : '- €'}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-red-600">
                      <span>Coût total employeur</span>
                      <span>
                        {resultats?.coutTotal ? resultats.coutTotal.toFixed(2) + ' €' : '- €'}
                      </span>
                    </div>
                  </div>
                </div>

                {resultats?.cotisations && (
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-3">Détail des cotisations salariales</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>CSG déductible</span>
                        <span>{resultats.cotisations.csgDeductible.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CSG non déductible</span>
                        <span>{resultats.cotisations.csgNonDeductible.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CRDS</span>
                        <span>{resultats.cotisations.crds.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sécurité sociale</span>
                        <span>{resultats.cotisations.secu.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assurance chômage</span>
                        <span>{resultats.cotisations.chomage.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retraite de base</span>
                        <span>{resultats.cotisations.retraiteBase.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retraite complémentaire</span>
                        <span>{resultats.cotisations.retraiteComplementaire.toFixed(2)} €</span>
                      </div>
                      {status === "cadre" && (
                        <div className="flex justify-between">
                          <span>Prévoyance cadre</span>
                          <span>{resultats.cotisations.prevoyance.toFixed(2)} €</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold pt-2 border-t">
                        <span>Total cotisations</span>
                        <span>{resultats.cotisations.total.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>
                )}

                {resultats &&(  
                  <div className="pt-4">
                    <PDFDownloadLink
                      document={
                        <BulletinPDF 
                          resultats={resultats}
                          status={status}
                          situationFamiliale={situationFamiliale}
                          contractType={contractType}
                          tempsPartiel={Number(tempsPartiel)}
                        />
                      }
                      fileName={`bulletin-paie-simulation-${new Date().toISOString().split('T')[0]}.pdf`}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? (
                          <Button disabled className="w-full">
                            Génération du PDF...
                          </Button>
                        ) : (
                          <Button className="w-full">
                            Télécharger le bulletin PDF
                          </Button>
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                )}

                {!resultats && (
                  <div className="text-center text-muted-foreground py-8">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Remplissez le formulaire et cliquez sur "Calculer" pour voir les résultats</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {resultats && (
          <div className="mt-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Informations sur les calculs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Barèmes utilisés</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Taux officiels {resultats.anneeReference || new Date().getFullYear()}</li>
                      <li>• CSG : 9,2% (6,8% déductible + 2,4% non déductible)</li>
                      <li>• CRDS : 0,5%</li>
                      <li>• Temps de travail : {resultats.heuresMensuelle.toFixed(1)}h/mois</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Précisions importantes</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Calculs indicatifs, non contractuels</li>
                      <li>• Prélèvement à la source estimé</li>
                      <li>• Cotisations patronales moyennes</li>
                      <li>• Base légale : 35h/semaine</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}