# 🚀 Plan d'Action SEO 30 Jours - PC-MEKNES

## 📅 SEMAINE 1: Configuration & Indexation

### 🗓️ JOUR 1 (Jeudi 13 Mars)

**Objectif:** Déployer les fichiers SEO et vérifier la mise en ligne

- [ ] **Vérifier le déploiement:**
  - Aller sur https://pc-meknes.fr
  - Vérifier que le site charge correctement
  - Faire F12 → Vérifier que le canonical est présent (`<link rel="canonical" href="https://pc-meknes.fr">`)

- [ ] **Tester les fichiers créés:**
  - Vérifier https://pc-meknes.fr/sitemap.xml (doit afficher du XML)
  - Vérifier https://pc-meknes.fr/robots.txt (doit afficher du texte)

- [ ] **Valider le JSON-LD:**
  - Allez sur https://schema.org/validator/
  - Entrez https://pc-meknes.fr
  - Vérifier qu'il n'y a pas d'erreurs (warnings OK)

---

### 🗓️ JOUR 2 (Vendredi 14 Mars)

**Objectif:** Configurer Google Search Console

- [ ] **Créer propriété GSC:**
  1. Allez sur https://search.google.com/search-console
  2. Connectez-vous (weblinecreation88@gmail.com)
  3. Cliquez "Ajouter une propriété"
  4. Entrez: `pc-meknes.fr`

- [ ] **Vérifier avec meta tag:**
  1. Copier le meta tag fourni par Google
  2. **Ajouter au HTML:**
     - Ouvrir `/public/index.html`
     - Ajouter après le canonical (ligne ~32)
  3. Sauvegarder et déployer
  4. Retour à GSC → Cliquer "Vérifier"

- [ ] **À la vérification:** ✅ Vous devriez voir "Propriété vérifiée"

---

### 🗓️ JOUR 3 (Samedi 15 Mars)

**Objectif:** Soumettre le sitemap et les URLs

- [ ] **Soumettre sitemap dans GSC:**
  1. Allez à: Sitemaps (menu gauche)
  2. Cliquez: "Nouvelle soumission"
  3. Entrez: `https://pc-meknes.fr/sitemap.xml`
  4. Cliquez: "Soumettre"

- [ ] **Demander l'indexation manuelle:**
  1. Barre de recherche GSC (en haut)
  2. Entrez: `https://pc-meknes.fr`
  3. Cliquez: "Demander l'indexation"

- [ ] **Configurer les paramètres GSC:**
  1. Paramètres (roue cog) → Sitelinks de recherche
  2. Géolocalisation: Vérifier = Maroc
  3. URL cible: Vérifier = pc-meknes.fr

---

### 🗓️ JOUR 4-5 (Dimanche-Lundi 16-17 Mars)

**Objectif:** Tester performance et corriger les erreurs

- [ ] **Tester Core Web Vitals:**
  1. Aller sur: https://pagespeed.web.dev/
  2. Entrer: `https://pc-meknes.fr`
  3. Analyser les scores:
     - LCP (Largest Contentful Paint)
     - CLS (Cumulative Layout Shift)
     - FID (First Input Delay)

- [ ] **Tester Mobile Usability:**
  1. Aller sur: https://search.google.com/test/mobile-friendly
  2. Entrer: `https://pc-meknes.fr`
  3. Vérifier qu'il n'y a pas d'erreurs

- [ ] **Tester le schema:**
  1. Aller sur: https://search.google.com/test/rich-results
  2. Entrer: `https://pc-meknes.fr`
  3. Vérifier les "LocalBusiness" et "Organization"

---

### 🗓️ JOUR 6-7 (Mardi-Mercredi 18-19 Mars)

**Objectif:** Vérifier l'indexation dans GSC

- [ ] **Attendre indexation (24-48h)**

- [ ] **Une fois indexé, vérifier:**
  1. GSC → Coverage
  2. Chercher "Valide" (pages indexées)
  3. S'assurer qu'il n'y a pas d'erreurs rouges

- [ ] **Checker les statistiques:**
  1. GSC → Performance
  2. Attendre les premières impressions (peut prendre 3-7 jours)

---

## 📅 SEMAINE 2: Analytics & Content

### 🗓️ JOUR 8 (Jeudi 20 Mars)

**Objectif:** Configurer Google Analytics 4

- [ ] **Créer compte GA4:**
  1. Aller sur: https://analytics.google.com
  2. Cliquer: "Créer"
  3. Choisir: "Web"
  4. Entrer URL: `pc-meknes.fr`
  5. Suivre les instructions

- [ ] **Ajouter le code de suivi au site:**
  1. Copier le script GA4 fourni (commence par `gtag`)
  2. Ajouter dans `/public/index.html`
  3. Avant `</head>`

- [ ] **Connecter avec Google Search Console:**
  1. GA4 → Admin → Property Settings
  2. Search Console Linking
  3. Ajouter GSC

---

### 🗓️ JOUR 9-10 (Vendredi-Samedi 21-22 Mars)

**Objectif:** Créer du contenu blog pour SEO local

**Article #1: "Réparation PC à Meknès: Guide Complet"**

Créer un fichier: `/blog/reparation-pc-meknes.html` avec:

```html
<article>
  <h1>Réparation PC à Meknès: Guide Complet 2026</h1>

  <p>Votre ordinateur portable ou bureau a besoin d'une réparation?
  Vous cherchez un bon réparateur à Meknès?</p>

  <h2>Problèmes Courants avec les PC à Meknès</h2>
  <ul>
    <li>Surchauffe (climat chaud)</li>
    <li>Lenteurs (besoin d'optimisation)</li>
    <li>Virus (naviguer sans protection)</li>
    <li>Écrans noirs</li>
  </ul>

  <h2>Quand Chercher un Réparateur?</h2>
  <p>Vous devriez contacter PC-MEKNES si...</p>

  <h2>Pourquoi Choisir PC-MEKNES?</h2>
  <ul>
    <li>Diagnostic gratuit (vs 100-200 DH ailleurs)</li>
    <li>5 ans d'expérience en France</li>
    <li>Intervention sous 24h</li>
    <li>Prix transparents</li>
  </ul>

  <h2>Autres Services à Meknès</h2>
  <p>Nous réparons aussi...</p>

  <p><strong>Basé à:</strong> Bassatine, Meknès</p>
  <p><strong>Téléphone:</strong> +212 699 245 542</p>
</article>
```

- [ ] **Créer le fichier blog**
- [ ] **Ajouter lien dans sitemap**
- [ ] **Ajouter lien interne depuis homepage**

---

### 🗓️ JOUR 11-12 (Dimanche-Lundi 23-24 Mars)

**Objectif:** Créer pages de localisation

**Pages à créer:**

1. `/pages/reparation-pc-bassatine.html`
2. `/pages/reparation-mobile-meknes.html`
3. `/pages/diagnostique-gratuit-meknes.html`

Chaque page doit:
- ✅ Avoir H1 unique avec mots-clé local
- ✅ 500+ mots de contenu
- ✅ Inclure l'adresse (Bassatine, Meknès)
- ✅ Inclure le téléphone
- ✅ Lier vers homepage
- ✅ Ajouter au sitemap

---

### 🗓️ JOUR 13-14 (Mardi-Mercredi 25-26 Mars)

**Objectif:** Netlinking local

- [ ] **Lister 10 annuaires locaux Maroc:**
  - Pages Jaunes (pages-jaunes.ma)
  - Annuaire.ma
  - Justacotéde.com
  - Annuaire Maroc (.fr avec annuaire Maroc)
  - Lokalisé (si dispo)
  - Autres

- [ ] **Pour chaque annuaire:**
  1. S'inscrire (gratuit généralement)
  2. Remplir tous les champs:
     - Nom: PC-MEKNES
     - Adresse: Zone C, Bloc F, Bassatine, Meknès
     - Téléphone: +212 699 245 542
     - Website: https://pc-meknes.fr
     - Catégories: Réparation PC, Services informatiques
  3. Vérifier la publication

---

## 📅 SEMAINE 3: Optimisation & Monitoring

### 🗓️ JOUR 15-16 (Jeudi-Vendredi 27-28 Mars)

**Objectif:** Optimiser images et performance

- [ ] **Compresser les images du site:**
  - Utiliser TinyPNG (tinypng.com) ou Compressor.io
  - Convertir en WebP si possible
  - Viser < 100KB par image

- [ ] **Minifier CSS et JavaScript:**
  - CSS: minifier css.css
  - JS: minifier js scripts

- [ ] **Ajouter lazy-loading:**
  - Ajouter `loading="lazy"` sur les images
  - Ajouter `decoding="async"` sur les images

- [ ] **Re-tester PageSpeed:**
  - https://pagespeed.web.dev/
  - Comparer avant/après

---

### 🗓️ JOUR 17-18 (Samedi-Dimanche 29-30 Mars)

**Objectif:** Configurer suivi des conversions

- [ ] **Configurer Goal dans GA4:**
  1. GA4 → Admin → Goals
  2. Créer goal: "Formulaire Contact Soumis"
  3. Créer goal: "WhatsApp Click"
  4. Créer goal: "Appel Téléphone"

- [ ] **Configurer Conversion Tracking:**
  1. Chaque contact form submit = conversion
  2. Chaque clic WhatsApp = conversion
  3. Chaque appel = conversion

- [ ] **Monitorer dans GSC:**
  - GSC → Performance
  - Voir les mots-clés = impressions
  - Mettre à jour les descriptions si CTR faible

---

### 🗓️ JOUR 19-21 (Lundi-Mercredi 31 Mars - 2 Avril)

**Objectif:** Monitoring et ajustements

- [ ] **Vérifier GSC quotidiennement:**
  - Chercher erreurs de couverture
  - Voir apparition des premiers classements
  - Vérifier Core Web Vitals

- [ ] **Vérifier GA4 quotidiennement:**
  - Voir premiers visits
  - Voir sources de trafic
  - Voir pages plus visitées

- [ ] **Améliorer les contenus faibles:**
  - Pages avec faible CTR → améliorer titre/description
  - Pages non indexées → vérifier robots.txt
  - Pages avec erreurs → corriger

---

## 📊 MÉTRIQUES À SUIVRE (JOUR 21)

À ce point, vous devriez avoir:

- ✅ Site entièrement indexé dans Google
- ✅ 5-10 impressions en Google Search
- ✅ 1-5 clics en Google Search
- ✅ Core Web Vitals verts
- ✅ 0 erreurs de couverture
- ✅ GA4 tracking opérationnel
- ✅ 3-5 pages de contenu
- ✅ Présence dans 5-10 annuaires locaux

---

## 📅 SEMAINE 4: Contenu & Stratégie

### 🗓️ JOUR 22-26 (Jeudi-Lundi 3-7 Avril)

**Objectif:** Créer 2-3 articles de blog supplémentaires

**Article #2:** "Déblocage FRP Meknès: Comment ça fonctionne?"
- Mots-clés: "déblocage FRP Meknès", "déblocage compte Google Meknès"
- 800+ mots
- Étapes détaillées
- FAQ

**Article #3:** "5 Signes que Votre PC a Besoin d'une Réparation"
- Mots-clés: "réparation informatique Meknès"
- 600+ mots
- Images explicatives
- CTA vers contact

**Article #4:** "Montage PC Meknès: Tout ce que Vous Devez Savoir"
- Mots-clés: "montage PC Meknès"
- 800+ mots
- Portofolio/exemples
- Devis

- [ ] **Pour chaque article:**
  1. Créer le fichier HTML
  2. Ajouter au sitemap
  3. Ajouter lien interne
  4. Ajouter meta description
  5. Créer URL SEO-friendly

---

### 🗓️ JOUR 27-30 (Mardi-Vendredi 8-11 Avril)

**Objectif:** Création de stratégie long-terme

- [ ] **Analyser les résultats GSC:**
  - Quels mots-clés génèrent du trafic?
  - Quelles pages sont les plus visitées?
  - Où améliorer?

- [ ] **Analyser GA4:**
  - Source trafic #1?
  - Taux de rebond par page?
  - Conversion rate?

- [ ] **Planifier contenu pour les 30 prochains jours:**
  - 4 articles de blog (1 par semaine)
  - 2-3 pages de localisation supplémentaires
  - FAQ section

- [ ] **Planifier backlinks pour les 30 prochains jours:**
  - 5-10 partenaires locaux à contacter
  - 2-3 articles invités (guest posts)
  - 1 communauté locale (forum)

---

## 🎯 OBJECTIFS J+30

**Attendez-vous à:**

| Métrique | Objectif | Réaliste? |
|----------|----------|-----------|
| Pages indexées | 10-20 | ✅ Oui |
| Impressions mensuelles | 100-200 | ✅ Oui |
| Clics mensuels | 10-20 | ✅ Oui |
| Classements (top 50) | 3-5 keywords | ✅ Oui |
| GA4 sessions | 30-50 | ✅ Oui |
| Leads (contacts) | 2-5 | ✅ Oui |
| Core Web Vitals | 90+ score | ⚠️ Dépend images |

---

## 💡 TIPS BONUS

### Réactions à Avoir Si:

**"Je n'ai pas d'impressions après 2 semaines"**
- C'est normal! Google peut prendre jusqu'à 4 semaines
- Assurez-vous que le site est indexé dans GSC
- Vérifier robots.txt

**"Mon site est lent (Core Web Vitals mauvais)"**
- Compresser les images en priorité
- Utiliser un CDN (déjà utilisé: Cloudinary ✅)
- Minifier CSS/JS

**"Mon taux de clic (CTR) est faible"**
- Amélorer title + meta description
- Rendre plus accrocheur
- Inclure des chiffres/emojis

---

## 🔄 À PARTIR DU JOUR 31

Continuer le cycle:

**Hebdomadaire:**
- [ ] Vérifier GSC (Performance)
- [ ] Créer 1 article blog
- [ ] Contacter 2-3 partenaires pour backlinks

**Mensuel:**
- [ ] Analyser toutes les données
- [ ] Ajuster stratégie de mots-clés
- [ ] Créer rapport SEO

**Trimestriel:**
- [ ] Audit technique complet
- [ ] Benchmarking vs concurrents
- [ ] Planifier pour prochain trimestre

---

**Créé le:** 2026-03-13
**Mis à jour:** 2026-03-13
**Prochain contrôle:** 2026-04-13 (J+31)