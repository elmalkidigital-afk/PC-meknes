# 🔍 Google Search Console - Guide Setup Rapide

## 📌 POURQUOI C'EST CRITIQUE

Google Search Console vous permet de:
- ✅ Voir comment Google voit votre site
- ✅ Soumettre votre sitemap
- ✅ Vérifier les erreurs d'indexation
- ✅ Voir vos rankings et CTR
- ✅ Recevoir les alertes de Google

**⏱️ Temps requis:** 5 minutes

---

## 🚀 ÉTAPE 1: CRÉER UNE PROPRIÉTÉ GSC

1. **Allez sur:** https://search.google.com/search-console
2. **Connectez-vous** avec votre compte Google (weblinecreation88@gmail.com)
3. **Cliquez sur:** "Ajouter une propriété"
4. **Choisissez:** "Domaine"
5. **Entrez:** `pc-meknes.fr`
6. **Cliquez:** "Continuer"

---

## ✅ ÉTAPE 2: VÉRIFIER LA PROPRIÉTÉ

### Méthode Recommandée: Meta Tag HTML

1. **Copier** le meta tag fourni par Google (ressemble à ça):
```html
<meta name="google-site-verification" content="1a2b3c4d5e6f7g8h9i0j" />
```

2. **Ajouter ce tag** dans le `<head>` du fichier `/public/index.html`
   - Placer après le canonical (ligne ~32)

3. **Sauvegarder** et **déployer** le site

4. **Revenir à GSC** et **cliquer "Vérifier"**

**Vous devriez voir:** "La propriété a été vérifiée" ✅

---

## 📋 ÉTAPE 3: SOUMETTRE LE SITEMAP

1. **Dans GSC:** Allez à "Sitemaps" (menu de gauche)
2. **Cliquez:** "Nouvelle soumission de sitemap"
3. **Entrez:** `https://pc-meknes.fr/sitemap.xml`
4. **Cliquez:** "Soumettre"

**Résultat attendu:** "Sitemap reçu"

---

## 🔧 ÉTAPE 4: VÉRIFIER LA COUVERTURE

1. **Allez à:** "Couverture" (Coverage)
2. **Vérifiez** qu'il n'y a pas d'erreurs rouges
3. **Attendez** 24-48h pour l'indexation complète

### Que chercher:
- ✅ "Valide" (pages indexées correctement)
- ⚠️ "Valide avec avertissements" (peut être ignoré)
- ❌ "Erreur" (à corriger)
- 🚫 "Exclue" (normal pour certain contenu)

---

## 📱 ÉTAPE 5: VÉRIFIER L'UTILISABILITÉ MOBILE

1. **Allez à:** "Rapports" → "Mobile Usability"
2. **Vérifiez** qu'il n'y a pas d'erreurs
3. **Cliquez sur les erreurs** pour les détails

---

## 📊 ÉTAPE 6: VÉRIFIER CORE WEB VITALS

1. **Allez à:** "Rapports" → "Core Web Vitals"
2. **Vérifiez** les scores:
   - 🟢 Bon: LCP < 2.5s, FID < 100ms, CLS < 0.1
   - 🟡 À améliorer
   - 🔴 Mauvais

**Action:** Améliorer avec PageSpeed Insights

---

## 🔗 ÉTAPE 7: SOUMETTRE L'URL MANUELLE

1. **Allez à:** Barre de recherche en haut
2. **Entrez:** `https://pc-meknes.fr`
3. **Cliquez:** "Demander l'indexation"

Google va réindexer votre page rapidement (24h)

---

## 📈 ÉTAPE 8: CONFIGURER LES PARAMÈTRES

### Vérifier l'URL cible:
1. **Paramètres** (roue cog)
2. **Vérifier:** "Domaine par défaut" = `pc-meknes.fr`
3. **Vérifier:** "Géolocalisation" = Maroc

### Ajouter des utilisateurs:
1. **Paramètres** → **Utilisateurs et autorisations**
2. **Ajouter:** votre email secondaire si nécessaire
3. **Rôle:** Propriétaire ou Éditeur

---

## 📊 ÉTAPE 9: COMPRENDRE VOS DONNÉES

### Onglet "Performance":
- **Clics:** Nombre de personnes ayant cliqué vers votre site
- **Impressions:** Nombre de fois que votre site a apparu dans Google
- **CTR:** Click-Through Rate (clics ÷ impressions)
- **Position:** Votre position moyenne dans les résultats

**Exemple:**
```
Mot-clé: "réparation PC Meknès"
Clics: 25
Impressions: 300
CTR: 8.3%
Position: 8
```

### Amélior CTR = mieux écrire les titres/descriptions

---

## 🔔 ÉTAPE 10: CONFIGURER LES ALERTES

1. **Paramètres** → **Préférences de notification**
2. **Cocher:**
   - ✅ Problèmes de sécurité critiques
   - ✅ Erreurs d'indexation importantes
   - ✅ Problèmes d'utilisabilité mobile

---

## 📅 MEILLEURES PRATIQUES

### À FAIRE ✅

✅ Vérifier GSC 1x par semaine
✅ Surveiller Core Web Vitals
✅ Ajouter nouvelles pages au sitemap
✅ Vérifier les erreurs d'indexation
✅ Analyser les mots-clés performants

### À ÉVITER ❌

❌ Spammer GSC avec des demandes de réindexation
❌ Ignorer les avertissements de sécurité
❌ Changer de domaine sans redirection 301
❌ Mettre noindex sur des pages importantes

---

## 🎯 OBJECTIFS À ATTEINDRE

### Semaine 1:
- ✅ Propriété vérifiée
- ✅ Sitemap soumis
- ✅ 0 erreurs de couverture

### Mois 1:
- ✅ 50%+ des pages indexées
- ✅ Impressions commencent à augmenter
- ✅ Aucune erreur mobile

### Mois 3:
- ✅ Classements pour 5+ mots-clés
- ✅ 100+ clics/mois
- ✅ Position moyenne < 10 pour top keywords

---

## 🆘 PROBLÈMES COURANTS

### "Mon site n'est pas indexé"
- **Solution:** Vérifier robots.txt, sitemap, erreurs d'indexation

### "Erreurs de couverture"
- **Solution:** Vérifier les metas redirections, status codes

### "Pas d'impressions malgré l'indexation"
- **Solution:** Attendre (peut prendre 2-4 semaines) + Améliorer contenu

### "Core Web Vitals mauvais"
- **Solution:** Compresser images, minifier JS/CSS, réduire redirections

---

## 📞 RESSOURCES UTILES

- **Google Search Console Help:** https://support.google.com/webmasters
- **Search Console Academy:** https://www.youtube.com/playlist?list=PLMPXsvCL32N0uDaiEEVFrFbLc1FwozDNl
- **SEO Starter Guide:** https://developers.google.com/search/docs

---

**Créé le:** 2026-03-13
**Statut:** Prêt à être mis en place ✅