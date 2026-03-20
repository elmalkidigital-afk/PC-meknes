# ✅ SETUP RAPIDE: Meta Tag Google Search Console

## 🎯 ÉTAPES POUR VÉRIFIER VOTRE PROPRIÉTÉ

### ÉTAPE 1: Allez sur Google Search Console
👉 https://search.google.com/search-console

### ÉTAPE 2: Créez une propriété "Préfixe de l'URL"
1. Cliquez sur **"Ajouter une propriété"**
2. Choisissez **"Préfixe de l'URL"** (2e option)
3. Entrez: `https://pc-meknes.fr`
4. Cliquez **"Continuer"**

### ÉTAPE 3: Google va vous donner un meta tag
Vous verrez une boîte de dialogue avec:
- **Titre:** "Valider la propriété"
- **URL:** `https://pc-meknes.fr/`
- Une liste de méthodes de vérification

### ÉTAPE 4: Cliquez sur "Meta tag HTML"
1. Dans la liste des méthodes, trouvez **"Balise meta HTML"**
2. Cliquez dessus pour la sélectionner
3. Vous verrez un code qui ressemble à ça:

```html
<meta name="google-site-verification" content="1a2b3c4d5e6f7g8h9i0j_xyz123ABC" />
```

### ÉTAPE 5: Copier le meta tag
1. **Cliquez sur le bouton "Copier"** (à droite du code)
2. Le code est maintenant dans le presse-papiers

### ÉTAPE 6: Ajouter le meta tag au HTML
1. Ouvrir le fichier: `/public/index.html`
2. Chercher la ligne du canonical URL:
   ```html
   <link rel="canonical" href="https://pc-meknes.fr">
   ```
3. **Ajouter juste après** ces quelques lignes:
   ```html
   <!-- Google Search Console Verification -->
   <meta name="google-site-verification" content="VOTRE_CODE_ICI" />
   ```
4. **Remplacer** `VOTRE_CODE_ICI` par le code copié (la partie après `content="..."`)
5. Sauvegarder le fichier
6. Déployer le site

### ÉTAPE 7: Vérifier la propriété
1. **Retournez à Google Search Console**
2. **Cliquez le bouton "Vérifier"** dans la boîte de dialogue
3. ✅ **Vous devriez voir:** "Propriété vérifiée"

---

## 📋 EXEMPLE COMPLET

Si Google vous donne ce code:
```html
<meta name="google-site-verification" content="abcd1234efgh5678ijkl9012" />
```

Votre HTML doit ressembler à ça:
```html
...
  <meta name="language" content="French">
  <meta name="geo.placename" content="Meknès, Maroc">
  <meta name="geo.region" content="MA-FEZ">
  <meta name="geo.position" content="33.884611;-5.5302346">
  <link rel="canonical" href="https://pc-meknes.fr">

  <!-- Google Search Console Verification -->
  <meta name="google-site-verification" content="abcd1234efgh5678ijkl9012" />

  <meta property="og:image" content="https://res.cloudinary.com/...">
...
```

---

## ⏱️ TEMPS REQUIS
- ✅ Ajouter le meta tag: **2 minutes**
- ✅ Déployer le site: **1-2 minutes**
- ✅ Vérifier dans GSC: **1 minute**

**Total: ~5 minutes ⏱️**

---

## ✅ APRÈS LA VÉRIFICATION

Une fois que GSC montre "Propriété vérifiée", vous pouvez:

1. ✅ Soumettre le sitemap: `https://pc-meknes.fr/sitemap.xml`
2. ✅ Demander l'indexation
3. ✅ Voir vos statistiques de classement

---

## 🆘 PROBLÈMES COURANTS

### "Je ne vois pas le bouton Vérifier"
→ Attendez 10 secondes après avoir ajouté le meta tag au HTML
→ Assurez-vous que le site est déployé
→ Vérifiez que vous avez copié exactement le code

### "Propriété vérifiée, mais je ne vois rien d'autre"
→ C'est normal! Allez à: Google Search Console → Accueil
→ Vous verrez votre propriété listée

### "Erreur: Le contenu du meta tag n'a pas pu être trouvé"
→ Vérifier que le meta tag est dans le `<head>` (avant `</head>`)
→ Vérifier qu'il n'y a pas d'espace ou de caractère supplémentaire
→ Vérifier que le site est bien déployé (pas en local)

---

## 📊 PROCHAINES ÉTAPES (APRÈS VÉRIFICATION)

1. Soumettre le sitemap
2. Demander l'indexation manuelle
3. Vérifier la couverture (Coverage)
4. Vérifier Core Web Vitals
5. Configurer Google Analytics 4

👉 **Lire après:** `SEO-ACTION-PLAN-30DAYS.md`

---

**Créé:** 2026-03-13
**Temps estimé:** 5 minutes
**Prochaine étape:** Soumettre sitemap dans GSC