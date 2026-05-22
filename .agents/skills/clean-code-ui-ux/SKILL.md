---
name: clean-code-ui-ux
description: >
  Clean code principles for React Admin + MUI UI/UX development. Covers strict
  separation of style tokens (themeConfig.ts), reusable SxProps (components.ts),
  theme overrides (theme.ts), dark mode support, and shared generic components.
  Use this whenever you need to write or refactor UI code following the project's
  design system, ensure proper style/logic separation, or understand the 3-layer
  styling architecture (tokens → style objects → theme overrides).
---

# Clean Code UI/UX — React Admin + MUI

## Principles

1. **Séparation stricte** : Le code de style (couleurs, ombres, bordures, transitions, gradients) ne doit jamais être mélangé avec la logique métier ou la structure des composants.
2. **Système de design centralisé** : Tous les tokens visuels vivent dans un seul fichier (`themeConfig.ts`). Tout le code de style y fait référence — aucune valeur hardcodée.
3. **Couches superposées** : Tokens → Objets de style réutilisables → Thème MUI → `sx` dans les composants.
4. **Composants partagés** : Tout composant utilisé à plus de 2 endroits est extrait dans `src/generic/`.
5. **Personnalisation de React Admin** : Les surcharges de composants RA passent par le thème MUI, pas par des wrappers ad-hoc.

---

## Architecture des Styles (3 couches)

```
┌────────────────────────────────────────────────────────────────────┐
│  Couche 1: themeConfig.ts                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │  colors   │ │gradients │ │ shadows  │ │borderRadius│ │spacing │ │
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤ ├─────────┤ │
│  │transitions│ │typography│ │getShadow()│ │getBorder()│ │get*Bg()│ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └─────────┘ │
└────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│  Couche 2: components.ts                                           │
│  SxProps<Theme> pré-composés pour les familles de composants       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │appBarStyles││menuStyles││formStyles ││datagridStyles││showStyles│
│  │homePageStyles││layoutStyles││operationFormStyles││skeletonStyles│
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └─────────┘ │
└────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│  Couche 3: theme.ts                                                │
│  createAppTheme(mode) → MuiTheme                                   │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  Palette (mode) + Typography + Components overrides       │     │
│  │  • MUI: MuiButton, MuiCard, MuiTextField, MuiTable...    │     │
│  │  • RA: RaCreate, RaEdit, RaSimpleForm, RaToolbar...      │     │
│  └──────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────┘
```

---

## Couche 1 — `themeConfig.ts` (Tokens)

Un fichier qui exporte UNIQUEMENT des valeurs pures (pas de JSX, pas de composants).

### Règles

- **Toutes** les couleurs, gradients, ombres, bordures, transitions, espacements, typographies sont ici.
- Support **light/dark** via des objets parallèles (`colors.light.*` / `colors.dark.*`).
- Fonctions helpers pour les valeurs dynamiques selon le mode : `getShadow(mode, size)`, `getBorder(mode)`, `getPrimaryBg(mode)`, `getDivider(mode)`, etc.
- Objets de hover communs : `commonHover.row(mode)`, `commonHover.translateX`, `commonHover.lift`.

### Exemple

```ts
// themeConfig.ts
export const colors = {
  primary: { main: '#4285F4', light: '#5B9CF6', dark: '#3367D6' },
  light: {
    background: { default: '#f0f4f9', paper: '#ffffff' },
    text: { primary: '#1a1a2e', secondary: '#5f6368' },
  },
  dark: {
    background: { default: '#0f172a', paper: '#1e293b' },
    text: { primary: '#f1f5f9', secondary: '#94a3b8' },
  },
}

export const getShadow = (mode, size) =>
  mode === 'light' ? shadows.light[size] : shadows.dark[size]
```

### Ce qui NE doit PAS être dans themeConfig.ts

- ❌ Composants React
- ❌ Objets `sx` avec des références au thème
- ❌ Logique métier
- ❌ `createTheme()` — ça va dans `theme.ts`

---

## Couche 2 — `components.ts` (Objets de style réutilisables)

Exporte des objets `SxProps<Theme>` prêts à l'emploi, organisés par domaine.

### Règles

- Chaque objet de style importe ses tokens depuis `themeConfig.ts`.
- Les valeurs dynamiques (mode light/dark) utilisent des closures : `(theme: Theme) => getXxx(theme.palette.mode)`.
- Jamais de valeurs hardcodées — tout passe par les tokens.
- `as const` pour le typage strict.

### Exemple

```ts
// components.ts
import { borderRadius as br, transitions, getShadow, getDivider } from './themeConfig'

export const formStyles = {
  card: {
    borderRadius: br.lg,
    boxShadow: (theme) => getShadow(theme.palette.mode, 'sm'),
    border: (theme) => `1px solid ${getDivider(theme.palette.mode)}`,
  },
  saveButton: {
    borderRadius: br.sm,
    textTransform: 'none',
    fontWeight: 500,
    background: gradients.primary,
    '&:hover': {
      background: gradients.primary,
      filter: 'brightness(1.1)',
    },
  },
} as const
```

### Organisation

Séparer par famille de composants :

| Export | Pour |
|--------|------|
| `appBarStyles` | AppBar, sélecteurs, icônes |
| `menuStyles` | Sidebar, navigation, sections |
| `formStyles` | Formulaires, cartes, champs, boutons |
| `datagridStyles` | Datagrid, tableaux |
| `showStyles` | Pages Show, infocards, champs |
| `homePageStyles` | Page d'accueil, boutons d'action |
| `layoutStyles` | Layout global, conteneurs |
| `operationFormStyles` | Formulaires d'opérations complexes |
| `skeletonStyles` | États de chargement |
| `emptyStateStyles` | États vides |

---

## Couche 3 — `theme.ts` (Thème MUI + surcharges RA)

Fonction `createAppTheme(mode)` qui produit un thème MUI complet.

### Palette

Créée à partir des tokens `colors` :

```ts
const createPalette = (mode) => ({
  mode,
  ...(mode === 'light' ? colors.light : colors.dark),
  primary: colors.primary,
  secondary: colors.secondary,
  // ...
})
```

### Surcharges de composants MUI

Tous les composants Material UI sont surchargés ici :

```ts
MuiButton: {
  styleOverrides: {
    root: {
      borderRadius: br.md,
      textTransform: 'none',
      transition: transitions.default,
      '&:hover': { transform: 'translateY(-1px)' },
    },
    containedPrimary: {
      background: gradients.primary,
      boxShadow: getShadow(mode, 'primary'),
    },
  },
},
```

Composants à systématiquement surcharger :

| Composant MUI | Pourquoi |
|---|---|
| `MuiButton` | Boutons avec gradients, hover effects |
| `MuiCard` | Coins arrondis, ombres, bordures |
| `MuiTextField` | Champs avec fond subtil, focus glow |
| `MuiSelect` | Hauteur, padding, fond |
| `MuiTable/MuiTableHead/MuiTableBody` | En-têtes stylisés, hover rows |
| `MuiChip` | Badges colorés |
| `MuiAlert` | Alertes avec alpha backgrounds |
| `MuiDialog` | Ombre portée, coins arrondis |
| `MuiTabs` | Indicateur gradient |
| `MuiTooltip` | Style moderne |

### Surcharges de composants React Admin (Ra*)

Tous les composants React Admin avec préfixe `Ra` sont accessibles via `components`.

| Composant RA | À surcharger |
|---|---|
| `RaCreate`, `RaEdit`, `RaShow` | Fond transparent, max-width centré |
| `RaSimpleForm` | Carte blanche avec ombre, padding |
| `RaTabbedForm` | Carte avec ombre, overflow hidden |
| `RaToolbar` | Flex-end, divider top, espacement |
| `RaSaveButton` | Gradient primaire, shadow |
| `RaDeleteButton` | Petit rond rouge |
| `RaList` | Fond transparent |
| `RaFilterForm` | Carte avec ombre |
| `RaTextField` | Label uppercase, valeur en gras |
| `RaTopToolbar` | Margin bottom, flex-end |
| `RaBulkActionsToolbar` | Fond alpha primary |
| `RaEmpty` | Centré, padding |
| `RaLoading` | Centré |

### Exemple complet

```ts
const commonComponentOverrides = (mode) => ({
  RaSimpleForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : colors.dark.background.paper,
        borderRadius: br.lg,
        padding: { xs: 2, sm: 3, md: 4 },
        boxShadow: getShadow(mode, 'sm'),
        border: `1px solid ${getBorder(mode)}`,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: br.md, textTransform: 'none' },
    },
  },
})
```

---

## Utilisation dans les composants

### Jamais de `style={}` — toujours `sx`

```tsx
// ✅ BON — sx avec tokens du thème
<Card sx={formStyles.card}>
  <Typography>Contenu</Typography>
</Card>

// ✅ BON — sx avec import direct de themeConfig
<Button sx={{
  background: gradients.primary,
  borderRadius: br.md,
  transition: transitions.default,
  '&:hover': { filter: 'brightness(1.1)' },
}}>

// ❌ MAUVAIS — valeurs hardcodées
<Card style={{ borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
<Button style={{ background: '#4285F4' }}>
```

### Import pattern

```tsx
// Importer depuis themeConfig pour les tokens purs
import { gradients, borderRadius as br, getShadow, colors } from '../../style/themeConfig'

// Importer depuis components pour les sx pré-composés
import { formStyles, datagridStyles } from '../../style/components'
```

---

## Composants partagés (`src/generic/`)

Tout composant utilisé dans plusieurs modules est extrait ici.

### Liste des composants génériques typiques

| Composant | Rôle |
|---|---|
| `ReferenceSelectWithCreate` | Select avec création inline dans un dialogue |
| `SelectWithCreateProvider` | Fabriques pour chaque type d'entité |
| `ResponsiveDatagrid` | Datagrid qui cache des colonnes selon la taille d'écran |
| `GenericContext` | Fabrique de contextes (CompanyContext, JobContext, etc.) |
| `GenericSelector` | Selecteur d'entité avec contexte |
| `FormToolbar` | Barre d'outils Save + Retour |

### Comment créer un composant générique

1. Si le même pattern apparaît dans ≥ 2 endroits → extraire dans `src/generic/`.
2. Props génériques (éviter les dépendances vers des types métier spécifiques).
3. Pas de logique métier — les comportements spécifiques sont passés via callbacks/props ou par factory.

---

## Personnalisation de l'UI React Admin

React Admin fournit des points d'extension qu'il faut utiliser dans cet ordre :

### 1. Surcharges via le thème (recommandé)

```ts
// style/theme.ts
RaCreate: {
  styleOverrides: {
    main: {
      maxWidth: '900px',
      margin: '24px auto',
    },
  },
},
```

Cela s'applique automatiquement à **toutes** les pages Create/Edit/Show.

### 2. Composants personnalisés passés à `<Admin>`

```tsx
// core/App.tsx
<Admin
  layout={CustomLayout}     // Layout personnalisé
  loginPage={CustomLogin}   // Page de login
  authProvider={authProvider}
  dataProvider={dataProvider}
>
```

### 3. Composants d'infrastructure personnalisés

- **Layout** : `src/core/Layout.tsx` — wrapper autour du Layout RA avec AppBar/Menu personnalisés.
- **AppBar** : `src/core/AppBar.tsx` — ajoute sélecteurs d'entité, bouton home/back, toggle dark mode.
- **Menu** : `src/core/Menu.tsx` — menu entièrement custom avec sections colorées, icônes, RBAC.

### 4. Pages custom avec `<CustomRoutes>`

```tsx
<CustomRoutes>
  <Route path="/purchases_activity" element={<PurchaseActivityForm />} />
</CustomRoutes>
```

---

## Séparation Logique / UI

### Règle d'or

Un fichier `.tsx` ne devrait **jamais** contenir plus d'un de ces trois éléments :

| Type | Contenu | Exemple |
|---|---|---|
| **Tokens** | Couleurs, ombres, espacements | `themeConfig.ts` |
| **Style** | Objets sx, surcharges de thème | `components.ts`, `theme.ts` |
| **Logique** | États, appels API, rendu conditionnel | `MaterialForm.tsx`, `ExpenseList.tsx` |

### Anti-patrons

```tsx
// ❌ MAUVAIS — style hardcodé dans la logique
<Button style={{
  background: 'linear-gradient(135deg, #4285F4 0%, #5B9CF6 100%)',
  borderRadius: '4px',
  textTransform: 'none',
}}>

// ❌ MAUVAIS — couleurs en dur
<Typography sx={{ color: '#5f6368', fontSize: '0.75rem' }}>

// ❌ MAUVAIS — ombre en dur
<Card sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
```

```tsx
// ✅ BON — tokens centralisés
<Button sx={{
  background: gradients.primary,
  borderRadius: br.md,
  textTransform: 'none',
}}>

// ✅ BON — via les objets de style
<Typography sx={{ color: 'text.secondary', fontSize: 'caption.fontSize' }}>

// ✅ BON — via le thème
<Card>
```

---

## Gestion du Dark Mode

Le `ThemeContext` (`src/style/ThemeContext.tsx`) fournit `{ mode, toggleMode }`.

```tsx
const { mode } = useThemeMode()
const shadow = getShadow(mode, 'md')
```

Dans les objets `sx` et les surcharges de thème, les valeurs dynamiques utilisent des closures :

```ts
sx={{
  boxShadow: (theme) => getShadow(theme.palette.mode, 'sm'),
  border: (theme) => `1px solid ${getBorder(theme.palette.mode)}`,
}}
```

---

## Checklist pour un composant propre (UI/UX)

- [ ] Pas de valeurs hardcodées (couleurs, ombres, bordures, gradients)
- [ ] Les tokens viennent de `themeConfig.ts`
- [ ] Les objets `sx` réutilisables viennent de `components.ts`
- [ ] Pas de `style={}` — uniquement `sx`
- [ ] Les surcharges RA sont dans `theme.ts`, pas dans le composant
- [ ] Le composant est dans `src/generic/` si utilisé ≥ 2 fois
- [ ] La logique métier et le style sont dans des fichiers séparés
- [ ] Le dark mode est géré (via closures ou `useThemeMode()`)
- [ ] Pas de magic numbers pour les espacements — utiliser `spacing` ou `theme.spacing()`

---

## Organisation des fichiers — Résumé

```
src/
  style/
    themeConfig.ts       -- Tokens purs (couleurs, gradients, ombres, etc.)
    components.ts        -- Objets SxProps<Theme> réutilisables
    theme.ts             -- createAppTheme() → thème MUI complet
    ThemeContext.tsx      -- Contexte light/dark
    index.ts             -- Barillet d'export
  generic/
    ReferenceSelectWithCreate.tsx  -- Select + création inline
    SelectWithCreateProvider.tsx    -- Fabriques de selects
    ResponsiveDatagrid.tsx          -- Datagrid responsive
    GenericContext.tsx              -- Fabrique de contextes
    GenericSelector.tsx             -- Sélecteur d'entité
    FormToolbar.tsx                 -- Barre d'outils formulaire
  core/
    Layout.tsx           -- Layout RA personnalisé
    AppBar.tsx           -- AppBar avec sélecteurs + dark toggle
    Menu.tsx             -- Menu latéral avec sections RBAC
  config/
    dynamicResources.ts  -- Construction d'URLs pour l'API
    homeButtons.ts       -- Configuration déclarative des boutons d'accueil
  auth/
    authProvider.tsx     -- AuthProvider custom (login, RBAC)
    dataProvider.ts      -- DataProvider custom (REST, JWT)
    CustomLogin.tsx      -- Page de login personnalisée
  features/              -- Modules métier (un dossier par domaine)
    users/               -- Exemple : users, companies, jobs, expenses...
```

---

## Références

Les fichiers suivants illustrent ces patterns dans le code existant :

| Fichier | Enseigne |
|---|---|
| `src/style/themeConfig.ts` | Définition des tokens |
| `src/style/components.ts` | Objets SxProps réutilisables |
| `src/style/theme.ts` | Thème MUI + surcharges Ra* |
| `src/style/ThemeContext.tsx` | Contexte dark mode |
| `src/generic/ReferenceSelectWithCreate.tsx` | Composant générique composé |
| `src/generic/SelectWithCreateProvider.tsx` | Fabrique de composants |
| `src/generic/ResponsiveDatagrid.tsx` | Composant générique responsive |
| `src/generic/GenericContext.tsx` | Fabrique de contextes |
| `src/generic/GenericSelector.tsx` | Sélecteur d'entité |
| `src/core/Layout.tsx` | Layout personnalisé |
| `src/core/AppBar.tsx` | AppBar personnalisée |
| `src/core/Menu.tsx` | Menu personnalisé |
| `src/auth/CustomLogin.tsx` | Page de login personnalisée |
| `src/config/homeButtons.ts` | Configuration déclarative |
