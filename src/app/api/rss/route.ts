import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const FEED_URLS = [
  {
    url: 'https://bofip.impots.gouv.fr/bofip/ext/rss.xml?actualites=1&publications=1&series=IR-CHAMP:IR-BASE:IR-LIQ:IR-RICI:IR-DECLA:IR-PAS:IR-PAIE:IR-PROCD:IR-CESS:IR-DOMIC:IR-CHR:RSA-CHAMP:RSA-GEO:RSA-BASE:RSA-PENS:RSA-ES:RSA-GER:RPPM-PVBMC:RPPM-RCM:RPPM-PVBMI:RFPI-CHAMP:RFPI-BASE:RFPI-DECLA:RFPI-SPEC:RFPI-PROCD:RFPI-CTRL:RFPI-PVI:RFPI-PVINR:RFPI-SPI:RFPI-TDC:RFPI-TPVIE:BA-CHAMP:BA-REG:BA-BASE:BA-LIQ:BA-RICI:BA-DECLA:BA-PROCD:BA-SECT:BA-CESS:BNC-CHAMP:BNC-BASE:BNC-RICI:BNC-DECLA:BNC-PROCD:BNC-SECT:BNC-CESS:BIC-CHAMP:BIC-BASE:BIC-PDSTK:BIC-CHG:BIC-PVMV:BIC-AMT:BIC-PROV:BIC-DEF:BIC-RICI:BIC-DECLA:BIC-PROCD:BIC-CESS:BIC-PTP:IS-CHAMP:IS-BASE:IS-DEF:IS-LIQ:IS-RICI:IS-DECLA:IS-AUT:IS-PROCD:IS-GEO:IS-CESS:IS-FUS:IS-GPE:TVA-CHAMP:TVA-BASE:TVA-LIQ:TVA-DED:TVA-DECLA:TVA-PROCD:TVA-GEO:TVA-SECT:TVA-IMM:TVA-AU:TCA-TSN:TCA-OCE:TCA-CDP:TCA-CAEA:TCA-RSAB:TCA-RSD:TCA-PPA:TCA-TPA:TCA-CSR:TCA-AHJ:TCA-RSP:TCA-PJP:TCA-PJC:TCA-TPC:TCA-BNA:TCA-AUTO:TCA-RPE:TCA-FIN:TCA-POLL:CVAE-CHAMP:CVAE-BASE:CVAE-LIQ:CVAE-LIEU:CVAE-DECLA:CVAE-PROCD:TPS-TS:TPS-PEEC:TPS-EMOE:TPS-THR:TFP-CAP:TFP-IFER:TFP-MINES:TFP-GUF:TFP-PYL:TFP-TEM:TFP-TSC:TFP-TASC:TFP-ASSUR:TFP-TFSCT:TFP-TEH:AIS-MOB:AIS-CCN:IF-COLOC:IF-TFNB:IF-TFB:IF-TH:IF-CFE:IF-AUT:PAT-IFI:PAT-ISF:PAT-TPC:PAT-CAP:ENR-DG:ENR-DMTOI:ENR-DMTOM:ENR-JOMI:ENR-DMTG:ENR-PTG:ENR-AVS:ENR-TIM:TCAS-ASSUR:TCAS-AUT:REC-PART:REC-PRO:REC-PREA:REC-GAR:REC-FORCE:REC-SOLID:REC-EVTS:DAE-10:DAE-20:CF-DG:CF-CPF:CF-COM:CF-IOR:CF-PGR:CF-CMSS:CF-INF:CTX-DG:CTX-PREA:CTX-ADM:CTX-JUD:CTX-DRO:CTX-REP:CTX-RDI:CTX-GCX:CTX-DRS:CTX-BF:SJ-AGR:SJ-RES:INT-DG:INT-AEA:INT-CVB:CAD-TOPO:CAD-REM:CAD-AFR:CAD-MAJ:CAD-INFO:CAD-DIFF:DJC-COVID19:DJC-CADA:DJC-FIN:DJC-OA:DJC-EXPC:DJC-TDC:DJC-TRUST:DJC-SECR:DJC-ARF:DJC-DES:BAREME-000000:FORM-000000:LETTRE-000000:CARTE-000000:ANNX-000000&maxR=10&maxJ=14',
    source: 'BOFiP'
  },
  {
    url: 'https://boss.gouv.fr/portail/fil-rss-boss-rescrit/pagecontent/flux-actualites.rss',
    source: 'BOSS'
  }
];

export async function GET() {
  try {
    const allItems = [];

    for (const feed of FEED_URLS) {
      const response = await fetch(feed.url);
      const xmlString = await response.text();

      // Expressions régulières pour extraire les infos
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      const titleRegex = /<title>([\s\S]*?)<\/title>/;
      const linkRegex = /<link>([\s\S]*?)<\/link>/;
      const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;
      const descriptionRegex = /<description>([\s\S]*?)<\/description>/;

      let match;
      while ((match = itemRegex.exec(xmlString)) !== null) {
        const itemContent = match[1];
        const title = titleRegex.exec(itemContent)?.[1]?.trim() || 'Sans titre';
        const link = linkRegex.exec(itemContent)?.[1]?.trim() || '#';
        const pubDate = pubDateRegex.exec(itemContent)?.[1]?.trim() || new Date().toISOString();
        const description = descriptionRegex.exec(itemContent)?.[1]?.trim() || '';
        
        // Nettoyer la description (supprimer les balises HTML)
        const contentSnippet = description.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...';

        allItems.push({
          id: `rss-${allItems.length}`,
          title,
          link,
          pubDate,
          contentSnippet,
          source: feed.source,
          author: feed.source,
          date: new Date(pubDate).toLocaleDateString('fr-FR'),
          excerpt: contentSnippet,
          tags: ['Fiscal', 'Officiel'],
          resources: []
        });
      }
    }

    if (allItems.length === 0) {
      throw new Error('Aucun article trouvé dans les flux RSS.');
    }

    // Trie par date décroissante
    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json(allItems.slice(0, 12)); // on limite à 12 résultats
  } catch (error: unknown) {
    console.error('Erreur de récupération des flux:', error);
    return NextResponse.json(
      {
        error: 'Erreur de récupération des flux RSS',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}