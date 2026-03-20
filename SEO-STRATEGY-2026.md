# 🎯 SEO Strategy 2026 - PC-MEKNES

## AUDIT TECHNIQUE RÉALISÉ ✅

### ✅ Optimisations Complétées

1. **Métadonnées & Canonical URL**
   - ✅ Canonical changé de `pc-meknes.web.app` → `pc-meknes.fr`
   - ✅ Ajout og:url vers le bon domaine
   - ✅ Métadonnées géographiques (geo.placename, geo.region, geo.position)
   - ✅ Language declarations

2. **Structure de Données (Schema.org)**
   - ✅ LocalBusiness Schema (nom, adresse, téléphone, horaires, services)
   - ✅ Organization Schema
   - ✅ BreadcrumbList Schema
   - ✅ GeoCoordinates (33.884611, -5.5302346)
   - ✅ Service Schema (Réparation PC, Réparation Mobile)

3. **Fichiers Indexation**
   - ✅ sitemap.xml créé
   - ✅ robots.txt créé
   - ✅ .htaccess pour redirections SSL & www

4. **Open Graph & Social**
   - ✅ og:title, og:description, og:image
   - ✅ Twitter Card
   - ✅ Theme color et favicon

---

## 🔧 PROCHAINES ÉTAPES (PRIORITÉ)

### ÉTAPE 1: GOOGLE SEARCH CONSOLE (CRITIQUE)

**Action immédiate:**
1. Aller à: https://search.google.com/search-console
2. Cliquer "Ajouter une propriété"
3. Entrer: `https://pc-meknes.fr`
4. **Méthode de vérification recommandée:** Tag HTML
   - Copier le meta tag généré
   - L'ajouter dans `<head>` du HTML (après le canonical)
   - Cliquer "Vérifier" dans GSC

**Après vérification:**
- ✅ Soumettre le sitemap: https://pc-meknes.fr/sitemap.xml
- ✅ Soumettre l'URL de la page d'accueil
- ✅ Vérifier "Coverage" pour les erreurs
- ✅ Vérifier "Mobile Usability"
- ✅ Vérifier "Core Web Vitals"

### ÉTAPE 2: GOOGLE ANALYTICS 4 (GA4)

**Ajouter le script GA4:**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**À faire:**
1. Créer un compte Google Analytics 4
2. Remplacer `G-XXXXXXXXXX` par votre ID
3. Connecter avec Google Search Console

### ÉTAPE 3: GOOGLE BUSINESS PROFILE

**Vous l'avez déjà fait! ✅**
- ✅ Profil créé et en validation
- À faire: Attendre validation Google (~5 jours)
- Puis: Ajouter photos et avis

---

## 📍 SEO LOCAL (MAROC & MEKNÈS)

### Mots-clés Prioritaires:

#### Niveau 1 (Priority 1)
- `réparation PC Meknès`
- `réparation ordinateur Meknès`
- `réparation téléphone Meknès`
- `diagnostic gratuit Meknès`

#### Niveau 2 (Priority 2)
- `réparation PC Bassatine`
- `technicien informatique Meknès`
- `montage PC Meknès`
- `réparation mobile Meknès`

#### Niveau 3 (Priority 3)
- `pâte thermique Meknès`
- `déblocage FRP Meknès`
- `optimisation PC Meknès`
- `virus malware Meknès`

### Géolocalisation Optimisée:
- ✅ Adresse complète dans schema
- ✅ Coordonnées GPS (33.884611, -5.5302346)
- ✅ Région: Fès-Meknès (code "MA-FEZ")
- ✅ Google Business Profile actif

---

## ⚡ OPTIMISATIONS TECHNIQUES

### Core Web Vitals

**À mesurer sur:** https://pagespeed.web.dev/

Cibles 2026:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**Actions:**
- [ ] Compresser les images (WebP format)
- [ ] Lazy-load les images non-critiques
- [ ] Minifier CSS/JS
- [ ] Utiliser CDN (Cloudinary pour les images ✅)
- [ ] Réduire les third-party scripts

### Mobile-First Indexing
- ✅ Design responsive en place
- [ ] Tester sur https://search.google.com/test/mobile-friendly

### Images SEO
- [ ] Ajouter alt text détaillés
- [ ] Compresser à < 100KB chacune
- [ ] Convertir en WebP
- [ ] Ajouter dimensionsattributes

---

## 📝 CONTENU & NETLINKING

### Blog/Contenu supplémentaire

À créer (+ autorité de domaine):

1. **Guide "Réparation PC à Meknès"** (2000+ mots)
   - Problèmes courants
   - Quand chercher un réparateur
   - Pourquoi choisir PC-MEKNES

2. **FAQ Local**
   - Questions clients réelles
   - Réponses détaillées (FAQ Schema)

3. **Localisation par quartier**
   - "Réparation PC Bassatine"
   - "Réparation PC Ville Nouvelle"
   - "Réparation PC Medina"

### Stratégie Backlinks

#### Local (Facile):
- [ ] Annuaires Maroc (pages-jaunes, annuaire.ma)
- [ ] Chambres Commerce Meknès
- [ ] Listes locales/forums Meknès
- [ ] Partenaires locaux
- [ ] Facebook/Instagram (liens)

#### Régional:
- [ ] Sites tech Maroc
- [ ] Blogs réparation Maroc
- [ ] Communautés gaming Maroc

---

## 🔗 DOMAINE vs FIREBASE

### Situation Actuelle:
- ✅ Domaine principal: `pc-meknes.fr`
- ✅ Domaine Firebase: `pc-meknes.web.app`
- ✅ Canonical: `pc-meknes.fr` (correct ✅)
- ✅ Robots.txt: pointe vers `.fr` (correct ✅)

**Important:** Tous les liens externes/internes doivent utiliser `pc-meknes.fr`

---

## 📊 MÉTRIQUES À SUIVRE

### Priorité 1:
- [ ] Ranking pour 5 mots-clés locaux
- [ ] Organic traffic (GA4)
- [ ] Core Web Vitals scores
- [ ] Indexation GSC (Coverage)

### Priorité 2:
- [ ] Backlinks (via Google Search Console)
- [ ] Impressions vs Clics (Google Search Console)
- [ ] Taux de clic (CTR) moyenne
- [ ] Position moyenne pour top keywords

### Priorité 3:
- [ ] Conversions (contacts via formulaire)
- [ ] Temps sur site
- [ ] Bounce rate
- [ ] Pages par session

---

## 🎬 PLAN EXÉCUTION (SEMAINE 1)

### Jour 1-2:
- [ ] Mettre à jour HTML avec corrections
- [ ] Pousser les fichiers (sitemap, robots, .htaccess)
- [ ] Vérifier le déploiement sur `pc-meknes.fr`

### Jour 3:
- [ ] Créer compte Google Search Console
- [ ] Ajouter propriété `pc-meknes.fr`
- [ ] Vérifier avec meta tag HTML
- [ ] Soumettre sitemap

### Jour 4-5:
- [ ] Vérifier indexation GSC
- [ ] Vérifier Core Web Vitals
- [ ] Corriger les erreurs (coverage, mobile usability)

### Semaine 2:
- [ ] Ajouter GA4
- [ ] Configurer Google Business Profile
- [ ] Créer contenu blog (1er article)
- [ ] Commencer netlinking local

---

## 🚀 LONG-TERME (3-6 MOIS)

- Objectif: **Top 3 pour "réparation PC Meknès"**
- 10+ articles de blog
- 30+ backlinks locaux
- 100+ leads organiques/mois
- 5+ avis Google Business Profile

---

## 📋 RÉSUMÉ FICHIERS CRÉÉS

✅ **Public folder:**
- `sitemap.xml` - Plan du site pour Google
- `robots.txt` - Instructions crawl
- `.htaccess` - Redirections & headers sécurité
- `schema-markup.json` - Référence JSON-LD

✅ **Métadonnées HTML:**
- Canonical URL corrigé
- og:url et og:image
- Localisation géo
- JSON-LD schemas intégrés

---

## 🆘 BESOIN D'AIDE?

1. **GSC:** https://support.google.com/webmasters
2. **SEO Audit:** https://pagespeed.web.dev/
3. **Schema Test:** https://schema.org/validator/
4. **Mobile Test:** https://search.google.com/test/mobile-friendly
5. **Keyword Research:** Google Keyword Planner (gratuit)

---

**Date de création:** 2026-03-13
**Statut:** ✅ Optimisations techniques complétées - En attente configuration GSC