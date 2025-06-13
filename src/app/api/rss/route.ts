import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Gardez cette ligne si vous n'utilisez pas output: export

const FEED_URL = 'https://bofip.impots.gouv.fr/bofip/ext/rss.xml?actualites=1&publications=1&series=IR-CHAMP:IR-BASE:IR-LIQ:IR-RICI:IR-DECLA:IR-PAS:IR-PAIE:IR-PROCD:IR-CESS:IR-DOMIC:IR-CHR:RSA-CHAMP:RSA-GEO:RSA-BASE:RSA-PENS:RSA-ES:RSA-GER:RPPM-PVBMC:RPPM-RCM:RPPM-PVBMI:RFPI-CHAMP:RFPI-BASE:RFPI-DECLA:RFPI-SPEC:RFPI-PROCD:RFPI-CTRL:RFPI-PVI:RFPI-PVINR:RFPI-SPI:RFPI-TDC:RFPI-TPVIE:BA-CHAMP:BA-REG:BA-BASE:BA-LIQ:BA-RICI:BA-DECLA:BA-PROCD:BA-SECT:BA-CESS:BNC-CHAMP:BNC-BASE:BNC-RICI:BNC-DECLA:BNC-PROCD:BNC-SECT:BNC-CESS:BIC-CHAMP:BIC-BASE:BIC-PDSTK:BIC-CHG:BIC-PVMV:BIC-AMT:BIC-PROV:BIC-DEF:BIC-RICI:BIC-DECLA:BIC-PROCD:BIC-CESS:BIC-PTP:IS-CHAMP:IS-BASE:IS-DEF:IS-LIQ:IS-RICI:IS-DECLA:IS-AUT:IS-PROCD:IS-GEO:IS-CESS:IS-FUS:IS-GPE:TVA-CHAMP:TVA-BASE:TVA-LIQ:TVA-DED:TVA-DECLA:TVA-PROCD:TVA-GEO:TVA-SECT:TVA-IMM:TVA-AU:TCA-TSN:TCA-OCE:TCA-CDP:TCA-CAEA:TCA-RSAB:TCA-RSD:TCA-PPA:TCA-TPA:TCA-CSR:TCA-AHJ:TCA-RSP:TCA-PJP:TCA-PJC:TCA-TPC:TCA-BNA:TCA-AUTO:TCA-RPE:TCA-FIN:TCA-POLL:CVAE-CHAMP:CVAE-BASE:CVAE-LIQ:CVAE-LIEU:CVAE-DECLA:CVAE-PROCD:TPS-TS:TPS-PEEC:TPS-EMOE:TPS-THR:TFP-CAP:TFP-IFER:TFP-MINES:TFP-GUF:TFP-PYL:TFP-TEM:TFP-TSC:TFP-TASC:TFP-ASSUR:TFP-TFSCT:TFP-TEH:AIS-MOB:AIS-CCN:IF-COLOC:IF-TFNB:IF-TFB:IF-TH:IF-CFE:IF-AUT:PAT-IFI:PAT-ISF:PAT-TPC:PAT-CAP:ENR-DG:ENR-DMTOI:ENR-DMTOM:ENR-JOMI:ENR-DMTG:ENR-PTG:ENR-AVS:ENR-TIM:TCAS-ASSUR:TCAS-AUT:REC-PART:REC-PRO:REC-PREA:REC-GAR:REC-FORCE:REC-SOLID:REC-EVTS:DAE-10:DAE-20:CF-DG:CF-CPF:CF-COM:CF-IOR:CF-PGR:CF-CMSS:CF-INF:CTX-DG:CTX-PREA:CTX-ADM:CTX-JUD:CTX-DRO:CTX-REP:CTX-RDI:CTX-GCX:CTX-DRS:CTX-BF:SJ-AGR:SJ-RES:INT-DG:INT-AEA:INT-CVB:CAD-TOPO:CAD-REM:CAD-AFR:CAD-MAJ:CAD-INFO:CAD-DIFF:DJC-COVID19:DJC-CADA:DJC-FIN:DJC-OA:DJC-EXPC:DJC-TDC:DJC-TRUST:DJC-SECR:DJC-ARF:DJC-DES:BAREME-000000:FORM-000000:LETTRE-000000:CARTE-000000:ANNX-000000&maxR=10&maxJ=14';

export async function GET() {
  try {
    // Option 1: Utiliser fetch directement pour plus de contrôle
    const response = await fetch(FEED_URL);
    const xmlString = await response.text();
    
    // Simple transformation pour extraire les données (solution basique)
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>([\s\S]*?)<\/title>/;
    const linkRegex = /<link>([\s\S]*?)<\/link>/;
    const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;

    let match;
    while ((match = itemRegex.exec(xmlString)) !== null) {
      const itemContent = match[1];
      items.push({
        title: itemContent.match(titleRegex)?.[1]?.trim() || 'Sans titre',
        link: itemContent.match(linkRegex)?.[1]?.trim() || '#',
        pubDate: itemContent.match(pubDateRegex)?.[1]?.trim() || new Date().toISOString(),
        source: 'Impôts - Actualités'
      });
    }

    if (items.length === 0) {
      throw new Error('Aucun article trouvé dans le flux RSS');
    }

    return NextResponse.json(items.slice(0, 10));
  } catch (error: unknown) {
    console.error('Erreur de récupération du flux:', error);
    return NextResponse.json(
      { 
        error: 'Erreur de récupération du flux',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  } 
}