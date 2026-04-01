// app/api/rss/route.ts

export const dynamic = "auto";
export const revalidate = 3600;
export const runtime = 'nodejs';

interface RSSItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  excerpt: string;
  tags: string[];
  source: string;
  date: string;
  author: string;
  category?: string;
  resources?: {
    name: string;
    type: string;
    url: string;
  }[];
}

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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const BOSS_FALLBACK_ITEM: RSSItem = {
  id: "fallback-boss",
  title: "Actualites BOSS",
  link: "https://boss.gouv.fr/portail/accueil/actualites-boss-et-rescrits.html",
  pubDate: new Date().toISOString(),
  contentSnippet:
    "Le flux BOSS est temporairement inaccessible depuis notre serveur. Consultez les actualites sociales directement sur le site officiel.",
  source: "BOSS",
  author: "BOSS",
  date: new Date().toLocaleDateString("fr-FR"),
  excerpt:
    "Le flux BOSS est temporairement inaccessible depuis notre serveur. Consultez les actualites sociales directement sur le site officiel.",
  tags: ["Social", "Officiel"],
  resources: [],
};

async function fetchFeedContent(url: string, source: string) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 14000);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "FINGEC-RSS-Fetcher/1.0 (+https://fingecwebsite.vercel.app)",
          "Accept": "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5",
        },
        next: { revalidate: 3600 }
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      const isLastAttempt = attempt === maxAttempts;
      const prefix = `[RSS:${source}] tentative ${attempt}/${maxAttempts}`;

      if (isLastAttempt) {
        const causeCode =
          typeof error === "object" &&
          error !== null &&
          "cause" in error &&
          typeof (error as { cause?: unknown }).cause === "object" &&
          (error as { cause?: { code?: string } }).cause?.code
            ? (error as { cause: { code: string } }).cause.code
            : "UNKNOWN";
        console.error(`${prefix} - echec final (${causeCode})`);
        return null;
      }

      console.warn(`${prefix} - echec, nouvelle tentative`);
      await sleep(400 * attempt);
    }
  }

  return null;
}

function parseRssContent(xmlString: string, source: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  
  let match;
  while ((match = itemRegex.exec(xmlString)) !== null) {
    const itemContent = match[1];
    const titleMatch = /<title>([\s\S]*?)<\/title>/.exec(itemContent);
    const linkMatch = /<link>([\s\S]*?)<\/link>/.exec(itemContent);
    const pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(itemContent);
    const descMatch = /<description>([\s\S]*?)<\/description>/.exec(itemContent);
    const descriptionText = descMatch?.[1]?.replace(/<[^>]*>?/gm, '') || '';

    // BOFiP n'expose pas toujours pubDate: on tente de lire "publie le jj/mm/aaaa" dans la description.
    let normalizedPubDate = pubDateMatch?.[1]?.trim();
    if (!normalizedPubDate) {
      const frenchDateMatch = /publi[ée]\s+le\s+(\d{2})\/(\d{2})\/(\d{4})/i.exec(descriptionText);
      if (frenchDateMatch) {
        const [, day, month, year] = frenchDateMatch;
        normalizedPubDate = `${year}-${month}-${day}T12:00:00.000Z`;
      }
    }
    if (!normalizedPubDate) {
      normalizedPubDate = '1970-01-01T00:00:00.000Z';
    }

    items.push({
      id: `rss-${source.toLowerCase()}-${items.length}`,
      title: titleMatch?.[1]?.trim() || 'Sans titre',
      link: linkMatch?.[1]?.trim() || '#',
      pubDate: normalizedPubDate,
      contentSnippet: (descriptionText.substring(0, 200) + '...'),
      source,
      author: source, // Utilisez source comme auteur par défaut
      date: new Date(normalizedPubDate).toLocaleDateString('fr-FR'),
      excerpt: (descriptionText.substring(0, 200) + '...'),
      tags: ['Fiscal', 'Officiel'],
      resources: [] // Tableau vide par défaut
    });
  }

  return items;
}

export async function GET() {
  try {
    const feedPromises = FEED_URLS.map(async (feed) => {
      const content = await fetchFeedContent(feed.url, feed.source);
      return content ? parseRssContent(content, feed.source) : [];
    });

    const results = await Promise.all(feedPromises);
    const allItems = results
      .flat()
      .sort((a, b) => {
        const dateDiff = new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        if (dateDiff !== 0) return dateDiff;
        return `${a.source}-${a.title}`.localeCompare(`${b.source}-${b.title}`);
      });

    // Si BOSS est indisponible, on conserve une entree sociale informative.
    if (!allItems.some((item) => item.source.toUpperCase().includes("BOSS"))) {
      allItems.push(BOSS_FALLBACK_ITEM);
      allItems.sort((a, b) => {
        const dateDiff = new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        if (dateDiff !== 0) return dateDiff;
        return `${a.source}-${a.title}`.localeCompare(`${b.source}-${b.title}`);
      });
    }

    const topItems = allItems.slice(0, 8);
    if (topItems.length === 0) {
      return new Response(JSON.stringify([
        {
          id: 'fallback-bofip',
          title: 'Actualites BOFiP',
          link: 'https://bofip.impots.gouv.fr/bofip',
          pubDate: new Date().toISOString(),
          contentSnippet: 'Consultez les dernieres actualites fiscales officielles publiees par la DGFiP.',
          source: 'BOFiP',
          author: 'BOFiP',
          date: new Date().toLocaleDateString('fr-FR'),
          excerpt: 'Consultez les dernieres actualites fiscales officielles publiees par la DGFiP.',
          tags: ['Fiscal', 'Officiel'],
          resources: []
        },
        {
          id: 'fallback-boss',
          title: 'Actualites BOSS',
          link: 'https://boss.gouv.fr/portail/accueil/actualites-boss-et-rescrits.html',
          pubDate: new Date().toISOString(),
          contentSnippet: 'Consultez les dernieres mises a jour sociales et paie sur le Bulletin Officiel de la Securite Sociale.',
          source: 'BOSS',
          author: 'BOSS',
          date: new Date().toLocaleDateString('fr-FR'),
          excerpt: 'Consultez les dernieres mises a jour sociales et paie sur le Bulletin Officiel de la Securite Sociale.',
          tags: ['Social', 'Officiel'],
          resources: []
        }
      ]), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=1800'
        }
      });
    }

    return new Response(JSON.stringify(topItems), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
      }
    });
  } catch (error) {
    console.error('Error processing feeds:', error);
    
    return new Response(JSON.stringify([{
      id: 'error-fallback',
      title: 'Service temporairement indisponible',
      contentSnippet: 'Les actualités ne sont pas disponibles pour le moment. Veuillez réessayer plus tard.',
      source: 'Système',
      author: 'Administrateur',
      date: new Date().toLocaleDateString('fr-FR'),
      excerpt: 'Les flux RSS ne sont pas disponibles pour le moment.',
      tags: ['Erreur'],
      resources: []
    }]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}