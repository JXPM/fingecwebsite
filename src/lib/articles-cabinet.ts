
interface Article {
  resources: any;
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const articles: Article[] = [
    {
      id: "1",
      title: "Nouveaux locaux pour FINGEC",
      date: "15 mars 2023",
      author: "L'équipe FINGEC",
      image: "/placeholder-office.jpg",
      excerpt: "FINGEC s'agrandit et déménage dans de nouveaux locaux plus spacieux pour mieux vous accueillir et répondre à vos besoins.",
      content: `
        <p>C'est avec grand plaisir que nous vous annonçons le déménagement de notre cabinet vers des locaux plus spacieux et modernes, situés en plein cœur de Paris.</p>
        <p>Ces nouveaux espaces nous permettront de vous accueillir dans un cadre plus agréable et fonctionnel, avec notamment :</p>
        <ul>
          <li>Des salles de réunion équipées des dernières technologies</li>
          <li>Un espace d'accueil convivial</li>
          <li>Des bureaux optimisés pour le travail collaboratif</li>
        </ul>
        <p>Ce déménagement s'inscrit dans notre volonté constante d'améliorer la qualité de nos services et de vous offrir un accompagnement toujours plus personnalisé.</p>
        <p>Nous serons ravis de vous accueillir dans nos nouveaux locaux dès le 1er avril 2023.</p>
      `,
      tags: ["Événement", "Développement"],
      resources: undefined
    },
    {
      id: "2",
      title: "Arrivée de notre nouveau collaborateur",
      date: "28 janvier 2023",
      author: "Direction",
      image: "/placeholder-team.jpg",
      excerpt: "Nous sommes heureux d'accueillir Pierre Martin au sein de notre équipe en tant que responsable du département social.",
      content: `
        <p>Nous sommes ravis d'accueillir Pierre Martin qui rejoint notre équipe en tant que responsable du département social.</p>
        <p>Pierre possède plus de 15 ans d'expérience dans le domaine du droit social et de la gestion des ressources humaines. Il a notamment exercé au sein de grands cabinets d'expertise comptable où il a développé une expertise reconnue dans l'accompagnement des TPE et PME.</p>
        <p>Son arrivée vient renforcer notre capacité à vous accompagner dans tous les aspects sociaux de votre entreprise :</p>
        <ul>
          <li>Gestion de la paie</li>
          <li>Conseil en droit social</li>
          <li>Gestion des ressources humaines</li>
          <li>Accompagnement lors des contrôles URSSAF</li>
        </ul>
        <p>Pierre sera votre interlocuteur privilégié pour toutes vos questions relatives à la gestion sociale de votre entreprise. N'hésitez pas à le contacter pour bénéficier de son expertise.</p>
      `,
      tags: ["Équipe", "Recrutement"],
      resources: undefined
    },
    {
      id: "3",
      title: "Journée portes ouvertes",
      date: "10 décembre 2022",
      author: "Service communication",
      image: "/placeholder-event.jpg",
      excerpt: "FINGEC organise une journée portes ouvertes le 15 janvier pour présenter ses services et répondre à vos questions.",
      content: `
        <p>Le cabinet FINGEC a le plaisir de vous convier à sa journée portes ouvertes qui se tiendra le 15 janvier 2023 de 10h à 18h dans nos locaux.</p>
        <p>Cette journée sera l'occasion de :</p>
        <ul>
          <li>Découvrir nos services et nos méthodes de travail</li>
          <li>Rencontrer nos experts-comptables et nos conseillers</li>
          <li>Participer à des ateliers thématiques sur la gestion d'entreprise</li>
          <li>Échanger avec d'autres chefs d'entreprise</li>
        </ul>
        <p>Programme de la journée :</p>
        <ul>
          <li>10h-12h : Présentation du cabinet et de nos services</li>
          <li>12h-14h : Cocktail déjeunatoire</li>
          <li>14h-16h : Ateliers thématiques (fiscalité, social, juridique)</li>
          <li>16h-18h : Rendez-vous individuels sur inscription</li>
        </ul>
        <p>Pour participer à cette journée, merci de vous inscrire par téléphone au 01 23 45 67 89 ou par email à contact@fingec.fr.</p>
        <p>Nous serons ravis de vous accueillir et de répondre à toutes vos questions.</p>
      `,
      tags: ["Événement", "Rencontre"],
      resources: undefined
    },
    {
      id: "4",
      title: "FINGEC certifié ISO 9001",
      date: "5 novembre 2022",
      author: "Direction",
      image: "/placeholder-certificate.jpg",
      excerpt: "Nous sommes fiers de vous annoncer l'obtention de la certification ISO 9001, gage de qualité de nos services et de notre organisation.",
      content: `
        <p>C'est avec une grande fierté que nous vous annonçons l'obtention de la certification ISO 9001:2015 pour l'ensemble de nos activités d'expertise comptable, de conseil et d'accompagnement.</p>
        <p>Cette certification, délivrée par un organisme indépendant, atteste de la qualité de notre organisation et de nos processus internes. Elle garantit à nos clients :</p>
        <ul>
          <li>Un haut niveau de qualité dans la réalisation de nos missions</li>
          <li>Une gestion rigoureuse des dossiers et des informations confidentielles</li>
          <li>Une amélioration continue de nos pratiques et de nos services</li>
          <li>Un suivi personnalisé et une réactivité accrue</li>
        </ul>
        <p>L'obtention de cette certification est le résultat d'un travail d'équipe et d'un engagement collectif dans la démarche qualité. Elle témoigne de notre volonté de vous offrir un service d'excellence et de répondre au mieux à vos attentes.</p>
        <p>Nous tenons à remercier tous nos collaborateurs pour leur implication dans cette démarche, ainsi que nos clients pour leur confiance et leur fidélité.</p>
      `,
      tags: ["Certification", "Qualité"],
      resources: undefined
    },
    {
      id: "5",
      title: "FINGEC soutient l'association Les Restaurants du Cœur",
      date: "22 octobre 2022",
      author: "Service communication",
      image: "/placeholder-charity.jpg",
      excerpt: "Dans le cadre de notre politique RSE, nous avons le plaisir de vous annoncer notre partenariat avec l'association Les Restaurants du Cœur.",
      content: `
        <p>Le cabinet FINGEC s'engage dans une démarche de responsabilité sociétale en devenant partenaire de l'association Les Restaurants du Cœur.</p>
        <p>Ce partenariat se concrétisera par :</p>
        <ul>
          <li>Un soutien financier annuel</li>
          <li>La participation de nos collaborateurs à des actions de bénévolat</li>
          <li>La mise à disposition de nos compétences pour aider l'association dans sa gestion administrative et comptable</li>
        </ul>
        <p>Nous sommes convaincus que les entreprises ont un rôle à jouer dans la société et qu'elles doivent contribuer, à leur échelle, à lutter contre la précarité et l'exclusion.</p>
        <p>Si vous souhaitez vous aussi soutenir cette association, n'hésitez pas à nous contacter pour plus d'informations.</p>
        <p>Ensemble, nous pouvons faire la différence !</p>
      `,
      tags: ["RSE", "Solidarité"],
      resources: undefined
    }
  ];
