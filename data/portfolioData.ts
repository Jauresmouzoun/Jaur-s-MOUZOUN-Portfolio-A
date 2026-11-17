export type LabSceneId = 'namibia-pca' | 'climate-series' | 'beninexplore';

export interface ProjectCaseStudy {
  objective: string;
  methodology: string;
  impact: string;
  metrics: { label: string; value: string }[];
  chartTitle: string;
  chartType: 'auprc' | 'benchmark' | 'timeseries' | 'pca' | 'architecture';
  chartData: Record<string, string | number>[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'data-science' | 'econometrics' | 'web-mobile';
  description: string;
  points: string[];
  tags: string[];
  badge?: string;
  period: string;
  labSceneId?: LabSceneId;
  caseStudy: ProjectCaseStudy;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  badge?: string;
  points: {
    title: string;
    description: string;
  }[];
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  location: string;
  period: string;
  degreeType: string;
  courses?: string;
  active?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: {
    name: string;
    badge?: string;
  }[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  tags: string[];
  verificationUrl?: string;
}

export interface InProgressCourseItem {
  id: string;
  title: string;
  institution: string;
}

export interface PortfolioData {
  nav: {
    home: string;
    education: string;
    experience: string;
    projects: string;
    skills: string;
    certifications: string;
    hackathons: string;
    contact: string;
    downloadCV: string;
    downloadFR: string;
    downloadEN: string;
    viewPDF: string;
    openLab3D: string;
  };
  hero: {
    badge: string;
    greeting: string;
    name: string;
    headline: string;
    subheadline: string;
    bio: string;
    contactBtn: string;
    downloadCVBtn: string;
    chooseLangCV: string;
    launch3DLabBtn: string;
    quickStats: {
      stat: string;
      label: string;
    }[];
  };
  education: {
    title: string;
    subtitle: string;
    items: EducationItem[];
  };
  experience: {
    title: string;
    subtitle: string;
    items: ExperienceItem[];
  };
  projects: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterDS: string;
    filterEcon: string;
    filterWeb: string;
    openCaseStudy: string;
    open3DView: string;
    labBannerTitle: string;
    labBannerDesc: string;
    labBannerBtn: string;
    items: ProjectItem[];
  };
  hackathons: {
    title: string;
    subtitle: string;
    name: string;
    organizer: string;
    period: string;
    description: string;
    badge: string;
    topics: string[];
  };
  skills: {
    title: string;
    subtitle: string;
    categories: SkillCategory[];
    spokenLanguagesTitle: string;
    spokenLanguages: { name: string; level: string }[];
    interestsTitle: string;
    interests: string[];
    languagesSectionKicker: string;
    languagesSectionTitle: string;
    languagesSectionSubtitle: string;
  };
  certifications: {
    kicker: string;
    title: string;
    subtitle: string;
    verifyBtn: string;
    items: CertificationItem[];
    inProgressTitle: string;
    inProgressItems: InProgressCourseItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    whatsapp: string;
    linkedin: string;
    emailBtn: string;
    whatsappBtn: string;
    linkedinBtn: string;
    callMe: string;
    locationLabel: string;
    copySuccess: string;
  };
  footer: {
    rights: string;
    tagline: string;
    backToTop: string;
  };
}

export const portfolioData: Record<'fr' | 'en', PortfolioData> = {
  fr: {
    nav: {
      home: 'Accueil',
      education: 'Formation',
      experience: 'Expériences',
      projects: 'Projets',
      skills: 'Compétences',
      certifications: 'Certifications',
      hackathons: 'Bootcamps',
      contact: 'Contact',
      downloadCV: 'CV (FR / EN)',
      downloadFR: 'CV en Français (PDF)',
      downloadEN: 'CV en Anglais (PDF)',
      viewPDF: 'Consulter le PDF',
      openLab3D: 'Labo 3D',
    },
    hero: {
      badge: 'Élève Ingénieur Statisticien Économiste · ISE 2 · ENEAM',
      greeting: 'Bonjour, je suis',
      name: 'Jaurès MOUZOUN',
      headline: 'Transformer la donnée complexe en',
      subheadline: "leviers d'action stratégique et d'aide à la décision.",
      bio: "Élève ingénieur statisticien économiste en deuxième année (ISE 2) à l'ENEAM (Université d'Abomey-Calavi), je combine une solide base en statistique mathématique et en modélisation économétrique avec une pratique concrète de la data science : machine learning, gestion de bases de données et dataviz. Rigoureux et autonome, je m'investis dans des projets à fort impact en contexte africain. Ouvert aux stages, projets et collaborations.",
      contactBtn: 'Me Contacter',
      downloadCVBtn: 'Télécharger le CV',
      chooseLangCV: 'Aperçu & choix du CV (FR / EN)',
      launch3DLabBtn: 'Explorer le Labo 3D',
      quickStats: [
        { stat: 'ISE 2', label: 'ENEAM · Promo Ingénieur' },
        { stat: '5', label: 'Projets Data Science & Économétrie' },
        { stat: '2025–2026', label: 'Secrétaire Général Adjoint BE-GISE' },
        { stat: '4', label: 'Langues parlées' },
      ],
    },
    education: {
      title: 'Formation & Parcours Académique',
      subtitle: "Un cursus d'excellence en modélisation mathématique, statistique approfondie et sciences économiques.",
      items: [
        {
          id: 'ise',
          title: "Cycle d'Ingénieur Statisticien Économiste (ISE)",
          institution: "École Nationale d'Économie Appliquée et de Management (ENEAM) — Université d'Abomey-Calavi",
          location: 'Cotonou, Bénin',
          period: "2025 – Aujourd'hui · 2e année en cours",
          degreeType: 'Diplôme d’Ingénieur (Bac+5)',
          courses: 'Économétrie des données de panel, modèles logit, analyse des données multidimensionnelles (ACP/ACM), théorie de la mesure et probabilités, séries temporelles, macroéconomie approfondie.',
          active: true,
        },
        {
          id: 'licence',
          title: 'Licence en Statistique',
          institution: "École Nationale d'Économie Appliquée et de Management (ENEAM)",
          location: 'Cotonou, Bénin',
          period: '2022 – 2025',
          degreeType: 'Statistique Économique et Sectorielle',
          courses: 'Statistique inférentielle, échantillonnage et sondages, comptabilité nationale, microéconomie, bases de données relationnelles, analyse exploratoire.',
          active: false,
        },
        {
          id: 'bac',
          title: 'Baccalauréat Scientifique – Série D (Sciences)',
          institution: 'Complexe Scolaire Saint Jean-Baptiste de Dogbo',
          location: 'Bénin',
          period: '2022',
          degreeType: 'Diplôme d’État',
          courses: 'Mathématiques, Sciences physiques et chimie, Sciences de la vie et de la terre.',
          active: false,
        },
      ],
    },
    experience: {
      title: 'Expériences Professionnelles & Associatives',
      subtitle: "De l'analyse statistique rigoureuse au pilotage de campagnes digitales et à la vie étudiante.",
      items: [
        {
          id: 'dpaf',
          role: 'Stagiaire académique – Analyse statistique',
          organization: 'DPAF – Ministère des Enseignements Secondaire, Technique et de la Formation Professionnelle',
          location: 'Bénin',
          period: 'Mai – Juin 2025',
          badge: 'Secteur Public · Économétrie',
          points: [
            {
              title: 'Analyse des Inégalités',
              description: 'Modélisation en données de panel pour identifier les déterminants des inégalités de réussite aux examens nationaux (BEPC et BAC).',
            },
            {
              title: 'Automatisation VBA',
              description: "Développement d'un script VBA calculant l'indice de Gini des taux de réussite par zone et par département (2015–2023), éliminant les calculs manuels répétitifs.",
            },
            {
              title: 'Aide à la Décision',
              description: 'Interprétation statistique des résultats et production de visualisations graphiques pour les documents officiels adressés à la Direction.',
            },
          ],
        },
        {
          id: 'socioanimer',
          role: 'Alternant – Marketing digital',
          organization: 'Socioanimer',
          location: 'Cotonou, Bénin',
          period: 'Fév. – Juin 2025',
          badge: 'Marketing & Web',
          points: [
            {
              title: 'Performance Digitale',
              description: "Conception, monitoring et gestion d'un portefeuille de campagnes publicitaires en ligne orientées ROI.",
            },
            {
              title: 'Optimisation Web & UX',
              description: "Collaboration directe avec l'équipe de développement technique pour l'amélioration continue du site et des tunnels de conversion.",
            },
            {
              title: 'Content Marketing & Community',
              description: "Déploiement d'une stratégie de contenu structurée sur les réseaux sociaux afin d'accroître la visibilité et l'engagement communautaire.",
            },
          ],
        },
        {
          id: 'begise',
          role: 'Secrétaire Général Adjoint',
          organization: 'BE-GISE (Bureau du Groupe des Ingénieurs Statisticiens Économistes)',
          location: 'ENEAM, Cotonou',
          period: 'En cours',
          badge: 'Leadership · Vie Associative',
          points: [
            {
              title: 'Coordination & Communication',
              description: "Animation de la communication globale et de la vie associative de la communauté des élèves ingénieurs ISE ; organisation d'événements scientifiques et culturels.",
            },
            {
              title: 'Partenariat Stratégique ICPM',
              description: "Participation active à la négociation et signature du protocole d'accord avec l'ICPM pour l'organisation de l'ICPM Challenge 2026 (signé le 11 juin 2026).",
            },
          ],
        },
      ],
    },
    projects: {
      title: 'Projets Techniques & Data Science',
      subtitle: 'Études de cas détaillées en machine learning, économétrie appliquée, séries temporelles et scènes 3D interactives.',
      filterAll: 'Tous les projets',
      filterDS: 'Data Science & IA',
      filterEcon: 'Économétrie & Stat',
      filterWeb: 'Web & Mobile',
      openCaseStudy: 'Étude de cas & Graphiques',
      open3DView: 'Visualiser en 3D',
      labBannerTitle: 'Laboratoire 3D Interactif (Three.js / WebGL)',
      labBannerDesc: 'Explorez l’espace factoriel de l’ACP Namibie, le relief climatique de Cotonou (2005–2024) et le diorama BeninExplore en 3D temps réel.',
      labBannerBtn: 'Ouvrir le Labo 3D',
      items: [
        {
          id: 'fraud-detection',
          title: 'Détection de Fraude par Carte Bancaire',
          subtitle: 'Machine Learning pour événements rares et forte asymétrie de classe',
          category: 'data-science',
          description: "Conception d'une chaîne complète de détection de transactions frauduleuses dans un environnement hautement déséquilibré, déployée dans une application web interactive.",
          points: [
            'Rééchantillonnage avancé avec SMOTE pour équilibrer la classe minoritaire.',
            "Évaluation fine via l'AUPRC (Area Under the Precision-Recall Curve), métrique optimale pour les événements rares.",
            'Déploiement d’un tableau de bord interactif Streamlit pour la restitution des résultats en temps réel.',
          ],
          tags: ['Python', 'SMOTE', 'AUPRC', 'Streamlit', 'Scikit-Learn'],
          badge: 'Streamlit Web App',
          period: 'Récent',
          caseStudy: {
            objective: 'Détecter les transactions frauduleuses (< 0,2 % des opérations) tout en minimisant les fausses alertes pour les clients légitimes.',
            methodology: 'Normalisation robuste des montants, rééchantillonnage SMOTE uniquement sur les plis d’entraînement (validation croisée stratifiée) et comparaison des courbes Precision-Recall.',
            impact: 'Réduction significative des faux négatifs sans dégrader la précision opérationnelle, avec déploiement d’un simulateur Streamlit prêt pour la démonstration.',
            metrics: [
              { label: 'Score AUPRC (SMOTE + RF)', value: '0.89' },
              { label: 'Rappel (Recall)', value: '86.4 %' },
              { label: 'Déséquilibre initial', value: '0.17 %' },
            ],
            chartTitle: 'Courbe Précision-Rappel (Comparaison SMOTE vs Baseline)',
            chartType: 'auprc',
            chartData: [
              { recall: '0.1', smote: 0.98, baseline: 0.72 },
              { recall: '0.2', smote: 0.96, baseline: 0.65 },
              { recall: '0.4', smote: 0.93, baseline: 0.54 },
              { recall: '0.6', smote: 0.90, baseline: 0.42 },
              { recall: '0.75', smote: 0.85, baseline: 0.31 },
              { recall: '0.85', smote: 0.78, baseline: 0.20 },
              { recall: '0.95', smote: 0.52, baseline: 0.08 },
            ],
          },
        },
        {
          id: 'kidney-disease',
          title: 'Prédiction de la Maladie Rénale Chronique',
          subtitle: 'Benchmark de modèles de classification supervisée',
          category: 'data-science',
          description: 'Étude comparative approfondie de différents algorithmes de machine learning pour le diagnostic précoce des patients atteints de maladie rénale chronique (ckd / notckd).',
          points: [
            'Nettoyage des données cliniques, imputation des valeurs manquantes et normalisation.',
            'Comparaison systématique de KNN, arbres de décision, forêts aléatoires, boosting et XGBoost.',
            'Optimisation des hyperparamètres et analyse de l’importance relative des biomarqueurs.',
          ],
          tags: ['Python', 'XGBoost', 'Random Forest', 'KNN', 'Classification'],
          badge: 'Healthcare ML',
          period: 'Récent',
          caseStudy: {
            objective: 'Classifier avec une fiabilité maximale les patients (ckd vs notckd) à partir de 24 variables cliniques et biologiques souvent incomplètes.',
            methodology: 'Imputation itérative (MICE/Médiane selon distribution), encodage des marqueurs qualitatifs, recherche par grille (GridSearchCV) sur 5 familles de modèles.',
            impact: 'Les méthodes d’ensemble (Random Forest & XGBoost) identifient hémoglobine, gravité spécifique et créatinine sérique comme prédicteurs majeurs.',
            metrics: [
              { label: 'Exactitude XGBoost', value: '98.8 %' },
              { label: 'F1-Score (ckd)', value: '0.99' },
              { label: 'Modèles comparés', value: '5' },
            ],
            chartTitle: 'Benchmark des Modèles (Accuracy & F1-Score en %)',
            chartType: 'benchmark',
            chartData: [
              { model: 'KNN', accuracy: 91.2, f1: 90.5 },
              { model: 'Arbre Décision', accuracy: 93.8, f1: 93.2 },
              { model: 'Boosting', accuracy: 97.5, f1: 97.3 },
              { model: 'Random Forest', accuracy: 98.1, f1: 98.0 },
              { model: 'XGBoost', accuracy: 98.8, f1: 98.9 },
            ],
          },
        },
        {
          id: 'climate-series',
          title: 'Analyse des Séries Climatiques de Cotonou',
          subtitle: 'Séries temporelles historiques 2005–2024 & Prévisions NASA POWER',
          category: 'econometrics',
          description: 'Modélisation économétrique et statistique sur 20 ans de relevés climatiques (précipitations, humidité relative) de la station de Cotonou.',
          points: [
            'Décomposition temporelle (tendance, saisonnalité) et analyse des autocorrélations (ACF / PACF).',
            'Détection statistique des ruptures de structure climatique sur la période 2005–2024.',
            'Prévision quantitative à court et moyen terme par la méthode de lissage exponentiel de Holt-Winters.',
          ],
          tags: ['Python', 'NASA POWER', 'Holt-Winters', 'Time Series', 'Pandas'],
          badge: 'Séries Temporelles',
          period: 'ISE 1',
          labSceneId: 'climate-series',
          caseStudy: {
            objective: 'Modéliser la dynamique pluviométrique et hygrométrique à Cotonou sur 20 ans pour détecter d’éventuelles ruptures climatiques et anticiper les tendances.',
            methodology: 'Extraction NASA POWER (2005–2024), décomposition additive/multiplicative, tests de stationnarité et ruptures structurelles, calibrage saisonnier Holt-Winters.',
            impact: 'Mise en évidence du cycle bimodal des précipitations côtières et génération de trajectoires prévisionnelles robustes (visualisables en relief 3D).',
            metrics: [
              { label: 'Période couverte', value: '20 ans' },
              { label: 'Observations mensuelles', value: '240' },
              { label: 'Méthode prévision', value: 'Holt-Winters' },
            ],
            chartTitle: 'Précipitations moyennes annuelles & Tendance Holt-Winters (mm/an)',
            chartType: 'timeseries',
            chartData: [
              { year: '2006', observed: 1180, forecast: 1160 },
              { year: '2009', observed: 1290, forecast: 1230 },
              { year: '2012', observed: 1140, forecast: 1200 },
              { year: '2015', observed: 1380, forecast: 1280 },
              { year: '2018', observed: 1420, forecast: 1350 },
              { year: '2021', observed: 1310, forecast: 1370 },
              { year: '2024', observed: 1460, forecast: 1430 },
              { year: '2025*', observed: 1445, forecast: 1455 },
            ],
          },
        },
        {
          id: 'namibia-pca',
          title: 'ACP des Indicateurs Socioéconomiques de la Namibie',
          subtitle: 'Analyse multidimensionnelle WDI (2000–2024)',
          category: 'econometrics',
          description: "Analyse factorielle approfondie des trajectoires macroéconomiques et sociales de la Namibie à partir des données de la Banque Mondiale (WDI).",
          points: [
            'Analyse en Composantes Principales (ACP) sur 9 variables socioéconomiques clés.',
            'Validation préalable de la matrice de corrélation avec un indice KMO remarquable de 0,72.',
            '3 axes factoriels retenus expliquant 86,6 % de la variance totale, documentés dans un rapport exhaustif de restitution.',
          ],
          tags: ['R', 'FactoMineR', 'ggplot2', 'World Bank WDI', 'ACP / PCA'],
          badge: '86.6 % Variance',
          period: 'ISE 1',
          labSceneId: 'namibia-pca',
          caseStudy: {
            objective: 'Synthétiser 25 ans d’évolution macroéconomique et humaine de la Namibie à partir de 9 indicateurs de développement (WDI).',
            methodology: 'Standardisation, test de sphéricité de Bartlett & indice KMO (0,72), extraction des valeurs propres (critère de Kaiser & coude de Cattell) via FactoMineR.',
            impact: 'Compression sans perte majeure d’information : les 3 premiers axes résument 86,6 % de l’inertie totale, explorables dans le Labo 3D interactif.',
            metrics: [
              { label: 'Variance expliquée (3 axes)', value: '86.6 %' },
              { label: 'Indice KMO', value: '0.72' },
              { label: 'Variables WDI', value: '9' },
            ],
            chartTitle: 'Éboulis des valeurs propres — Variance par axe factoriel (%)',
            chartType: 'pca',
            chartData: [
              { axis: 'Dim 1', variance: 48.2, cumulative: 48.2 },
              { axis: 'Dim 2', variance: 24.5, cumulative: 72.7 },
              { axis: 'Dim 3', variance: 13.9, cumulative: 86.6 },
              { axis: 'Dim 4', variance: 6.1, cumulative: 92.7 },
              { axis: 'Dim 5', variance: 3.4, cumulative: 96.1 },
            ],
          },
        },
        {
          id: 'beninexplore',
          title: 'BeninExplore',
          subtitle: 'Application mobile d’écotourisme & d’artisanat avec IA générative',
          category: 'web-mobile',
          description: "Plateforme mobile hybride valorisant le patrimoine culturel, touristique et artisanal du Bénin, enrichie d'un compagnon intelligent.",
          points: [
            'Carte interactive des circuits écotouristiques et réservation en direct.',
            'Place de marché intégrée pour les artisans locaux.',
            'Chatbot intelligent « Griot » propulsé par l’IA générative pour raconter l’histoire et guider les voyageurs.',
          ],
          tags: ['.NET MAUI', 'Blazor Hybrid', 'Generative AI', 'Chatbot Griot', 'C#'],
          badge: 'En cours',
          period: 'En cours',
          labSceneId: 'beninexplore',
          caseStudy: {
            objective: 'Connecter les voyageurs aux sites écotouristiques béninois et aux artisans locaux grâce à une expérience mobile unifiée et un guide culturel IA.',
            methodology: 'Architecture .NET MAUI Blazor Hybrid permettant le partage de composants UI web et l’accès natif mobile (géolocalisation, mode hors-ligne partiel), couplée à un assistant LLM (« Griot »).',
            impact: 'Valorisation numérique des circuits culturels (Pendjari, Ganvié, Ouidah, Tata Somba) avec un aperçu diorama 3D disponible dans le laboratoire.',
            metrics: [
              { label: 'Architecture', value: '.NET MAUI' },
              { label: 'Assistant IA', value: 'Griot LLM' },
              { label: 'Modules clés', value: '4' },
            ],
            chartTitle: 'Répartition fonctionnelle de la plateforme BeninExplore (%)',
            chartType: 'architecture',
            chartData: [
              { module: 'Carte & Circuits', weight: 35 },
              { module: 'Marketplace Artisanat', weight: 28 },
              { module: 'Chatbot IA Griot', weight: 22 },
              { module: 'Réservations', weight: 15 },
            ],
          },
        },
      ],
    },
    hackathons: {
      title: 'Hackathons & Bootcamps IA',
      subtitle: 'Immersion intensive, travail d’équipe sous pression et résolution de défis réels.',
      name: 'Deep Learning IndabaX Bénin',
      organizer: 'AI Bootcamp / Hackathon – Blemama',
      period: 'Récent',
      badge: 'Deep Learning & IA',
      description: 'Immersion pratique en apprentissage profond (Deep Learning) et intelligence artificielle. Résolution collaborative de cas d’usage concrets, prototypage rapide et évaluation d’architectures neuronales en équipe pluridisciplinaire.',
      topics: ['Deep Learning', 'Computer Vision / NLP', 'Résolution de cas concrets', 'Pitch & Restitution'],
    },
    skills: {
      title: 'Compétences Techniques & Méthodes',
      subtitle: 'Un profil hybride à la croisée des statistiques rigoureuses, de la programmation data et de la vision métier.',
      categories: [
        {
          title: 'Langages & Logiciels',
          icon: 'code',
          items: [
            { name: 'R / RStudio', badge: 'Avancé' },
            { name: 'Python', badge: 'Data Science & ML' },
            { name: 'Stata', badge: 'Économétrie' },
            { name: 'VBA (Excel)', badge: 'Automatisation' },
            { name: 'Excel / XLSTAT', badge: 'Modélisation' },
            { name: 'SQL (SQL Server)', badge: 'Requêtes & BDD' },
          ],
        },
        {
          title: 'Data & Visualisation',
          icon: 'barChart',
          items: [
            { name: 'Power BI', badge: 'Dashboards' },
            { name: 'Tableaux de bord Excel', badge: 'Automatisés' },
            { name: 'Streamlit', badge: 'Web Apps Data' },
            { name: 'ggplot2', badge: 'R Dataviz' },
            { name: 'Three.js / WebGL', badge: 'Scènes 3D' },
          ],
        },
        {
          title: 'Méthodes Économétriques & IA',
          icon: 'cpu',
          items: [
            { name: 'Économétrie de panel', badge: 'Spécialité' },
            { name: 'Modèles Logit / Probit', badge: 'Choix discrets' },
            { name: 'Statistique mathématique', badge: 'Théorie & Inférence' },
            { name: 'ACP / ACM (Analyse factorielle)', badge: 'Multivariée' },
            { name: 'Séries temporelles (Holt-Winters)', badge: 'Prévision' },
            { name: 'Machine Learning (XGBoost, RF, KNN)', badge: 'Supervisé' },
          ],
        },
        {
          title: 'Compétences Transversales',
          icon: 'check',
          items: [
            { name: 'Rigueur méthodologique' },
            { name: 'Autonomie & Proactivité' },
            { name: 'Gestion du temps & Projets' },
            { name: 'Communication interdisciplinaire' },
            { name: 'Conception graphique & Présentation' },
            { name: 'Esprit de synthèse' },
          ],
        },
      ],
      spokenLanguagesTitle: 'Langues',
      spokenLanguages: [
        { name: 'Français', level: 'Langue maternelle / Courant' },
        { name: 'Anglais', level: 'Professionnel / Technique' },
        { name: 'Fon', level: 'Langue nationale' },
        { name: 'Adja', level: 'Langue nationale' },
      ],
      interestsTitle: 'Centres d’intérêt',
      interests: ['Endurance & Sports', 'Jeux vidéo & Stratégie', 'Lecture & Sciences', 'Graphisme & Design', 'Vie associative & Mentorat'],
      languagesSectionKicker: 'Profil Complémentaire',
      languagesSectionTitle: 'Langues & Centres d’intérêt',
      languagesSectionSubtitle: 'Maîtrise linguistique multiculturelle et engagements personnels.',
    },
    certifications: {
      kicker: 'Crédentiels vérifiables',
      title: 'Certifications',
      subtitle: 'Des compétences validées par des organismes reconnus, chaque certificat étant vérifiable en ligne.',
      verifyBtn: 'Vérifier le certificat',
      items: [
        {
          id: 'hackerrank-sql-basic',
          name: 'SQL (Basic)',
          issuer: 'HackerRank',
          date: 'Novembre 2026',
          tags: ['SQL', 'Requêtes complexes', 'Bases de données relationnelles'],
          verificationUrl: 'https://www.hackerrank.com/certificates/iframe/ef88cd65a2f9',
        },
        {
          id: 'hackerrank-r-intermediate',
          name: 'R (Intermédiaire)',
          issuer: 'HackerRank',
          date: 'Novembre 2026',
          tags: ['R', 'Programmation statistique', 'Manipulation de données'],
          verificationUrl: 'https://www.hackerrank.com/certificates/iframe/82e4a33ff618',
        },
      ],
      inProgressTitle: 'Formations en cours',
      inProgressItems: [
        {
          id: 'harvardx-cs50-ai',
          title: "CS50's Introduction to Artificial Intelligence with Python",
          institution: 'HarvardX',
        },
        {
          id: 'imfx-fpp1',
          title: 'Programmation et Politiques Financières, 1re partie',
          institution: 'FMI (IMFx)',
        },
        {
          id: 'imfx-mds',
          title: 'Diagnostic macroéconomique',
          institution: 'FMI (IMFx)',
        },
      ],
    },
    contact: {
      title: 'Démarrons une collaboration',
      subtitle: "À la recherche d'un profil alliant modélisation statistique, intelligence artificielle et rigueur d'ingénieur ? Échangeons dès aujourd'hui.",
      email: 'jaures23mzn@gmail.com',
      phone: '+229 01 57 41 30 29',
      location: 'Cotonou, Bénin',
      whatsapp: 'https://wa.me/2290157413029',
      linkedin: 'https://bit.ly/4kwda4C',
      emailBtn: 'M’envoyer un email',
      whatsappBtn: 'Discuter sur WhatsApp',
      linkedinBtn: 'Voir le profil LinkedIn',
      callMe: 'Appeler directement',
      locationLabel: 'Basé à Cotonou, Bénin',
      copySuccess: 'Copié dans le presse-papier !',
    },
    footer: {
      rights: 'Tous droits réservés.',
      tagline: 'Élève Ingénieur Statisticien Économiste — ENEAM, Université d’Abomey-Calavi',
      backToTop: 'Retour en haut',
    },
  },

  en: {
    nav: {
      home: 'Home',
      education: 'Education',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      certifications: 'Certifications',
      hackathons: 'Bootcamps',
      contact: 'Contact',
      downloadCV: 'Resume (FR / EN)',
      downloadFR: 'French CV (PDF)',
      downloadEN: 'English Resume (PDF)',
      viewPDF: 'View PDF Online',
      openLab3D: '3D Lab',
    },
    hero: {
      badge: 'Engineering Student in Statistics & Economics · ISE 2 · ENEAM',
      greeting: 'Hello, I am',
      name: 'Jaurès MOUZOUN',
      headline: 'Turning complex data into',
      subheadline: 'strategic leverage and actionable decision-support tools.',
      bio: 'Second-year engineering student in Statistics and Economics (ISE 2) at ENEAM (University of Abomey-Calavi), combining a strong foundation in mathematical statistics and econometric modelling with hands-on data science practice: machine learning, database management, and data visualisation. Rigorous and self-driven, I turn complex data into decision-support tools and enjoy projects with real impact in an African context. Open to internships, projects, and collaborations.',
      contactBtn: 'Get in Touch',
      downloadCVBtn: 'Download Resume',
      chooseLangCV: 'Preview & choose resume (FR / EN)',
      launch3DLabBtn: 'Launch 3D Lab',
      quickStats: [
        { stat: 'ISE 2', label: 'ENEAM · Engineering Track' },
        { stat: '5', label: 'Data Science & Econometrics Projects' },
        { stat: '2025–2026', label: 'Deputy Secretary General BE-GISE' },
        { stat: '4', label: 'Spoken Languages' },
      ],
    },
    education: {
      title: 'Education & Academic Journey',
      subtitle: 'Excellence curriculum covering mathematical modelling, advanced statistics, and economic theories.',
      items: [
        {
          id: 'ise',
          title: 'Engineering Degree in Statistics and Economics (ISE)',
          institution: 'National School of Applied Economics and Management (ENEAM) — University of Abomey-Calavi',
          location: 'Cotonou, Benin',
          period: '2025 – Present · 2nd year ongoing',
          degreeType: "Engineer's Degree (Master's level)",
          courses: 'Panel-data econometrics, logit models, multivariate data analysis (PCA/MCA), measure theory and probability, time series, advanced macroeconomics.',
          active: true,
        },
        {
          id: 'licence',
          title: "Bachelor's Degree in Statistics",
          institution: 'National School of Applied Economics and Management (ENEAM)',
          location: 'Cotonou, Benin',
          period: '2022 – 2025',
          degreeType: 'Economic and Sectoral Statistics',
          courses: 'Inferential statistics, sampling techniques & surveys, national accounting, microeconomics, relational databases, exploratory analysis.',
          active: false,
        },
        {
          id: 'bac',
          title: 'High School Diploma (Baccalauréat) – Series D (Sciences)',
          institution: 'Complexe Scolaire Saint Jean-Baptiste de Dogbo',
          location: 'Benin',
          period: '2022',
          degreeType: 'State Diploma with Honors',
          courses: 'Mathematics, Physics & Chemistry, Life & Earth Sciences.',
          active: false,
        },
      ],
    },
    experience: {
      title: 'Professional & Associative Experience',
      subtitle: 'From rigorous statistical modeling and automation to digital marketing campaigns and community leadership.',
      items: [
        {
          id: 'dpaf',
          role: 'Academic Intern – Statistical Analysis',
          organization: 'DPAF – Ministry of Secondary, Technical and Vocational Education',
          location: 'Benin',
          period: 'May – June 2025',
          badge: 'Public Sector · Econometrics',
          points: [
            {
              title: 'Inequality Analysis',
              description: 'Built panel-data models to identify the key explanatory factors driving disparities in national exam results (BEPC and BAC).',
            },
            {
              title: 'VBA Automation',
              description: 'Developed a custom VBA automation script computing the Gini index of pass rates across zones and departments (2015–2023), eliminating manual calculation errors.',
            },
            {
              title: 'Decision Support',
              description: 'Interpreted statistical results and synthesized findings into visual charts for official strategic documents addressed to executive management.',
            },
          ],
        },
        {
          id: 'socioanimer',
          role: 'Work-study – Digital Marketing',
          organization: 'Socioanimer',
          location: 'Cotonou, Benin',
          period: 'Feb. – June 2025',
          badge: 'Digital Marketing & Growth',
          points: [
            {
              title: 'Digital Performance',
              description: 'Designed, monitored, and optimized a portfolio of online advertising campaigns focused on maximizing ROI.',
            },
            {
              title: 'Web & UX Optimization',
              description: 'Collaborated closely with web developers to iteratively enhance website usability, user experience, and conversion funnels.',
            },
            {
              title: 'Content Marketing',
              description: 'Rolled out a structured social-media content strategy to cultivate community engagement and brand authority.',
            },
          ],
        },
        {
          id: 'begise',
          role: 'Deputy Secretary General',
          organization: 'BE-GISE (Student Board of the ISE Group)',
          location: 'ENEAM, Cotonou',
          period: 'Ongoing',
          badge: 'Leadership · Governance',
          points: [
            {
              title: 'Coordination & Community',
              description: 'Coordinated external communication and campus community initiatives for the ISE student body; organized academic and networking events.',
            },
            {
              title: 'ICPM Strategic Partnership',
              description: 'Instrumental in establishing the institutional partnership with ICPM for the ICPM Challenge 2026 (memorandum signed on 11 June 2026).',
            },
          ],
        },
      ],
    },
    projects: {
      title: 'Technical & Data Science Projects',
      subtitle: 'Interactive case studies in machine learning, applied econometrics, time-series forecasting, and real-time 3D scenes.',
      filterAll: 'All Projects',
      filterDS: 'Data Science & AI',
      filterEcon: 'Econometrics & Stat',
      filterWeb: 'Web & Mobile',
      openCaseStudy: 'Case Study & Charts',
      open3DView: 'Inspect in 3D',
      labBannerTitle: 'Interactive 3D Laboratory (Three.js / WebGL)',
      labBannerDesc: 'Inspect the Namibia PCA 3D factorial space, Cotonou Climate Spatio-Temporal Relief (2005–2024), and the BeninExplore diorama in real-time 3D.',
      labBannerBtn: 'Launch 3D Lab',
      items: [
        {
          id: 'fraud-detection',
          title: 'Credit Card Fraud Detection',
          subtitle: 'Machine learning on imbalanced datasets & rare-event classification',
          category: 'data-science',
          description: 'End-to-end fraud detection pipeline designed for high class imbalance, packaged into a live interactive web application.',
          points: [
            'Handled heavily imbalanced transactions using SMOTE resampling.',
            'Evaluated model performance using AUPRC (Area Under the Precision-Recall Curve), the gold standard metric for rare events.',
            'Deployed an intuitive Streamlit interactive dashboard to visualize predictions and precision-recall trade-offs.',
          ],
          tags: ['Python', 'SMOTE', 'AUPRC', 'Streamlit', 'Scikit-Learn'],
          badge: 'Streamlit Web App',
          period: 'Recent',
          caseStudy: {
            objective: 'Identify rare fraudulent transactions (< 0.2% of traffic) while keeping false positives minimal for legitimate cardholders.',
            methodology: 'Robust feature scaling, SMOTE oversampling strictly inside stratified CV training folds, and evaluation through Precision-Recall AUC.',
            impact: 'Strong reduction in missed fraud cases without sacrificing operational precision, delivered via an interactive Streamlit app.',
            metrics: [
              { label: 'AUPRC Score (SMOTE + RF)', value: '0.89' },
              { label: 'Recall', value: '86.4%' },
              { label: 'Fraud Rate', value: '0.17%' },
            ],
            chartTitle: 'Precision-Recall Curve (SMOTE vs Baseline)',
            chartType: 'auprc',
            chartData: [
              { recall: '0.1', smote: 0.98, baseline: 0.72 },
              { recall: '0.2', smote: 0.96, baseline: 0.65 },
              { recall: '0.4', smote: 0.93, baseline: 0.54 },
              { recall: '0.6', smote: 0.90, baseline: 0.42 },
              { recall: '0.75', smote: 0.85, baseline: 0.31 },
              { recall: '0.85', smote: 0.78, baseline: 0.20 },
              { recall: '0.95', smote: 0.52, baseline: 0.08 },
            ],
          },
        },
        {
          id: 'kidney-disease',
          title: 'Chronic Kidney Disease Prediction',
          subtitle: 'Supervised classification benchmark across multiple ML architectures',
          category: 'data-science',
          description: 'Comparative study of classification algorithms to identify early markers and classify ckd/notckd patient profiles.',
          points: [
            'Preprocessed clinical markers, imputed missing data, and standardized features.',
            'Benchmarked KNN, Decision Tree, Random Forest, Gradient Boosting, and XGBoost.',
            'Analyzed feature importance to highlight decisive clinical parameters.',
          ],
          tags: ['Python', 'XGBoost', 'Random Forest', 'KNN', 'Classification'],
          badge: 'Healthcare ML',
          period: 'Recent',
          caseStudy: {
            objective: 'Accurately classify ckd vs notckd clinical profiles across 24 noisy laboratory and physiological features.',
            methodology: 'Iterative missing-value imputation, categorical encoding, and GridSearchCV hyperparameter tuning across five classifier families.',
            impact: 'Ensemble learners (Random Forest & XGBoost) surfaced hemoglobin, specific gravity, and serum creatinine as top diagnostic predictors.',
            metrics: [
              { label: 'XGBoost Accuracy', value: '98.8%' },
              { label: 'F1-Score (ckd)', value: '0.99' },
              { label: 'Models Benchmarked', value: '5' },
            ],
            chartTitle: 'Classifier Benchmark (Accuracy & F1-Score %)',
            chartType: 'benchmark',
            chartData: [
              { model: 'KNN', accuracy: 91.2, f1: 90.5 },
              { model: 'Decision Tree', accuracy: 93.8, f1: 93.2 },
              { model: 'Boosting', accuracy: 97.5, f1: 97.3 },
              { model: 'Random Forest', accuracy: 98.1, f1: 98.0 },
              { model: 'XGBoost', accuracy: 98.8, f1: 98.9 },
            ],
          },
        },
        {
          id: 'climate-series',
          title: 'Climate Time-Series Analysis, Cotonou',
          subtitle: 'Historical 2005–2024 analysis & forecasting with NASA POWER data',
          category: 'econometrics',
          description: 'Statistical decomposition and econometric modeling of 20 years of rainfall and atmospheric humidity records in Cotonou.',
          points: [
            'Conducted seasonal decomposition, autocorrelation (ACF/PACF), and stationarity checks.',
            'Detected structural regime shifts and precipitation breaks across the 2005–2024 period.',
            'Generated short- and medium-term weather forecasts using Holt-Winters exponential smoothing.',
          ],
          tags: ['Python', 'NASA POWER', 'Holt-Winters', 'Time Series', 'Pandas'],
          badge: 'Time-Series',
          period: 'ISE 1',
          labSceneId: 'climate-series',
          caseStudy: {
            objective: 'Model 20 years of coastal rainfall and relative humidity in Cotonou to detect structural breaks and forecast short-term climate patterns.',
            methodology: 'NASA POWER satellite dataset ingestion (2005–2024), seasonal decomposition, break-point testing, and Holt-Winters triple exponential smoothing.',
            impact: 'Captured Cotonou’s bimodal rainy regime and structural shifts, inspectable as an interactive 3D spatio-temporal surface in the 3D Lab.',
            metrics: [
              { label: 'Span', value: '20 Years' },
              { label: 'Monthly Records', value: '240' },
              { label: 'Forecast Model', value: 'Holt-Winters' },
            ],
            chartTitle: 'Annual Rainfall & Holt-Winters Trend (mm/yr)',
            chartType: 'timeseries',
            chartData: [
              { year: '2006', observed: 1180, forecast: 1160 },
              { year: '2009', observed: 1290, forecast: 1230 },
              { year: '2012', observed: 1140, forecast: 1200 },
              { year: '2015', observed: 1380, forecast: 1280 },
              { year: '2018', observed: 1420, forecast: 1350 },
              { year: '2021', observed: 1310, forecast: 1370 },
              { year: '2024', observed: 1460, forecast: 1430 },
              { year: '2025*', observed: 1445, forecast: 1455 },
            ],
          },
        },
        {
          id: 'namibia-pca',
          title: "PCA of Namibia's Socioeconomic Indicators",
          subtitle: 'Multivariate factorial analysis on World Bank WDI (2000–2024)',
          category: 'econometrics',
          description: "Dimensionality reduction and trajectory modeling on Namibia's development indicators over a quarter-century.",
          points: [
            'Principal Component Analysis (PCA) executed on 9 key World Development Indicators.',
            'Verified correlation matrix factorizability with an excellent Kaiser-Meyer-Olkin (KMO) score of 0.72.',
            'Retained 3 primary factorial axes capturing 86.6% of cumulative variance, compiled into a comprehensive policy brief.',
          ],
          tags: ['R', 'FactoMineR', 'ggplot2', 'World Bank WDI', 'PCA'],
          badge: '86.6% Variance',
          period: 'ISE 1',
          labSceneId: 'namibia-pca',
          caseStudy: {
            objective: "Synthesize 25 years of Namibia's macroeconomic and social development across 9 World Development Indicators.",
            methodology: 'Standardized PCA using R FactoMineR, validated via Bartlett sphericity test and KMO (0.72), keeping 3 orthogonal axes.',
            impact: 'Retained 86.6% of total variance with high interpretability — explore the 3D factorial coordinate space directly inside the 3D Lab.',
            metrics: [
              { label: 'Variance Explained (3 Axes)', value: '86.6%' },
              { label: 'KMO Index', value: '0.72' },
              { label: 'WDI Indicators', value: '9' },
            ],
            chartTitle: 'Scree Plot — Variance Explained per Principal Axis (%)',
            chartType: 'pca',
            chartData: [
              { axis: 'Dim 1', variance: 48.2, cumulative: 48.2 },
              { axis: 'Dim 2', variance: 24.5, cumulative: 72.7 },
              { axis: 'Dim 3', variance: 13.9, cumulative: 86.6 },
              { axis: 'Dim 4', variance: 6.1, cumulative: 92.7 },
              { axis: 'Dim 5', variance: 3.4, cumulative: 96.1 },
            ],
          },
        },
        {
          id: 'beninexplore',
          title: 'BeninExplore',
          subtitle: 'Ecotourism & craft promotion mobile app powered by generative AI',
          category: 'web-mobile',
          description: "Hybrid cross-platform app dedicated to Beninese cultural heritage and tourism, featuring an intelligent conversational travel assistant.",
          points: [
            'Interactive map showcasing ecotourism itineraries and direct circuit bookings.',
            'Integrated craft marketplace supporting local artisans.',
            'Context-aware generative AI chatbot named "Griot" sharing historical stories and practical travel guidance.',
          ],
          tags: ['.NET MAUI', 'Blazor Hybrid', 'Generative AI', 'Chatbot Griot', 'C#'],
          badge: 'Ongoing',
          period: 'Ongoing',
          labSceneId: 'beninexplore',
          caseStudy: {
            objective: 'Promote Beninese ecotourism trails and local craftspeople through a hybrid mobile experience paired with a generative AI cultural guide.',
            methodology: 'Cross-platform .NET MAUI Blazor Hybrid architecture combining native device APIs (maps, bookings) with the "Griot" conversational LLM assistant.',
            impact: 'Showcases key cultural routes (Pendjari, Ganvié, Ouidah, Tata Somba), accompanied by a procedural 3D architectural diorama in the 3D Lab.',
            metrics: [
              { label: 'Framework', value: '.NET MAUI' },
              { label: 'AI Assistant', value: 'Griot LLM' },
              { label: 'Core Modules', value: '4' },
            ],
            chartTitle: 'BeninExplore Functional Module Breakdown (%)',
            chartType: 'architecture',
            chartData: [
              { module: 'Map & Circuits', weight: 35 },
              { module: 'Craft Marketplace', weight: 28 },
              { module: 'Griot AI Chatbot', weight: 22 },
              { module: 'Trip Booking', weight: 15 },
            ],
          },
        },
      ],
    },
    hackathons: {
      title: 'Hackathons & AI Bootcamps',
      subtitle: 'Hands-on immersion, fast-paced team innovation, and solving concrete African challenges.',
      name: 'Deep Learning IndabaX Benin',
      organizer: 'AI Bootcamp / Hackathon – Blemama',
      period: 'Recent',
      badge: 'Deep Learning & AI',
      description: 'Practical immersion in deep learning and artificial intelligence architectures. Team-based problem solving on real-world use cases, rapid model prototyping, and technical presentation before industry mentors.',
      topics: ['Deep Learning', 'Computer Vision & NLP', 'Real-world problem solving', 'Pitch & Showcase'],
    },
    skills: {
      title: 'Technical Skills & Methods',
      subtitle: 'A versatile profile uniting rigorous econometric foundations, modern data science programming, and business acumen.',
      categories: [
        {
          title: 'Languages & Software',
          icon: 'code',
          items: [
            { name: 'R / RStudio', badge: 'Advanced' },
            { name: 'Python', badge: 'Data Science & ML' },
            { name: 'Stata', badge: 'Econometrics' },
            { name: 'VBA (Excel)', badge: 'Automation' },
            { name: 'Excel / XLSTAT', badge: 'Modeling' },
            { name: 'SQL (SQL Server)', badge: 'Querying & DB' },
          ],
        },
        {
          title: 'Data & Visualization',
          icon: 'barChart',
          items: [
            { name: 'Power BI', badge: 'Dashboards' },
            { name: 'Excel Dashboards', badge: 'Automated' },
            { name: 'Streamlit', badge: 'Data Web Apps' },
            { name: 'ggplot2', badge: 'R Dataviz' },
            { name: 'Three.js / WebGL', badge: '3D Scenes' },
          ],
        },
        {
          title: 'Econometric & ML Methods',
          icon: 'cpu',
          items: [
            { name: 'Panel Data Econometrics', badge: 'Specialty' },
            { name: 'Logit / Probit Models', badge: 'Discrete Choice' },
            { name: 'Mathematical Statistics', badge: 'Inference' },
            { name: 'PCA / MCA (Factor Analysis)', badge: 'Multivariate' },
            { name: 'Time Series (Holt-Winters)', badge: 'Forecasting' },
            { name: 'Machine Learning (XGBoost, RF, KNN)', badge: 'Supervised' },
          ],
        },
        {
          title: 'Soft Skills & Transversal',
          icon: 'check',
          items: [
            { name: 'Methodological Rigour' },
            { name: 'Autonomy & Proactivity' },
            { name: 'Time & Project Management' },
            { name: 'Cross-Disciplinary Communication' },
            { name: 'Graphic Design & Layout' },
            { name: 'Analytical Synthesis' },
          ],
        },
      ],
      spokenLanguagesTitle: 'Spoken Languages',
      spokenLanguages: [
        { name: 'French', level: 'Native / Bilingual' },
        { name: 'English', level: 'Professional / Technical' },
        { name: 'Fon', level: 'National Language' },
        { name: 'Adja', level: 'National Language' },
      ],
      interestsTitle: 'Interests & Activities',
      interests: ['Endurance Sports', 'Video Games & Strategy', 'Reading & Science', 'Graphic Design', 'Community Leadership & Mentorship'],
      languagesSectionKicker: 'Personal Profile',
      languagesSectionTitle: 'Languages & Interests',
      languagesSectionSubtitle: 'Multilingual communication skills and personal pursuits.',
    },
    certifications: {
      kicker: 'Verifiable credentials',
      title: 'Certifications',
      subtitle: 'Skills validated by recognised institutions, each certificate independently verifiable online.',
      verifyBtn: 'Verify certificate',
      items: [
        {
          id: 'hackerrank-sql-basic',
          name: 'SQL (Basic)',
          issuer: 'HackerRank',
          date: 'November 2026',
          tags: ['SQL', 'Complex Queries', 'Relational Databases'],
          verificationUrl: 'https://www.hackerrank.com/certificates/iframe/ef88cd65a2f9',
        },
        {
          id: 'hackerrank-r-intermediate',
          name: 'R (Intermediate)',
          issuer: 'HackerRank',
          date: 'November 2026',
          tags: ['R', 'Statistical Programming', 'Data Manipulation'],
          verificationUrl: 'https://www.hackerrank.com/certificates/iframe/82e4a33ff618',
        },
      ],
      inProgressTitle: 'In progress',
      inProgressItems: [
        {
          id: 'harvardx-cs50-ai',
          title: "CS50's Introduction to Artificial Intelligence with Python",
          institution: 'HarvardX',
        },
        {
          id: 'imfx-fpp1',
          title: 'Financial Programming and Policies, Part 1',
          institution: 'IMF (IMFx)',
        },
        {
          id: 'imfx-mds',
          title: 'Macroeconomic Diagnostics',
          institution: 'IMF (IMFx)',
        },
      ],
    },
    contact: {
      title: "Let's Start a Conversation",
      subtitle: "Looking for a candidate with proven econometric rigor, data science mastery, and an engineer's mindset? Reach out today.",
      email: 'jaures23mzn@gmail.com',
      phone: '+229 01 57 41 30 29',
      location: 'Cotonou, Benin',
      whatsapp: 'https://wa.me/2290157413029',
      linkedin: 'https://bit.ly/4kwda4C',
      emailBtn: 'Send an Email',
      whatsappBtn: 'Chat on WhatsApp',
      linkedinBtn: 'View LinkedIn Profile',
      callMe: 'Direct Phone Call',
      locationLabel: 'Based in Cotonou, Benin',
      copySuccess: 'Copied to clipboard!',
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: 'Engineering Student in Statistics and Economics — ENEAM, University of Abomey-Calavi',
      backToTop: 'Back to top',
    },
  },
};
