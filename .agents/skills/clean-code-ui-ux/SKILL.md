---
name: clean-code-ui-ux
description: >
  Clean code principles for managing UI/style in a React Admin + MUI application.
  Covers the 3-layer styling architecture (tokens → style objects → theme overrides),
  usage patterns in components, and how to customize React Admin pages (Show, List,
  Create, Edit) via the theme system.
---

# Architecture des styles (3 couches)

```
┌──────────────────────────────────────────────────┐
│  Couche 1: themeConfig.ts                         │
│  Valeurs pures (couleurs, ombres, espacements…)   │
│  Pas de JSX, pas de sx, pas de createTheme()      │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│  Couche 2: components.ts                          │
│  Objets SxProps<Theme> réutilisables,              │
│  organisés par famille (form, menu, datagrid…)    │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│  Couche 3: theme.ts                               │
│  createAppTheme(mode) → thème MUI complet          │
│  Palette + Typography + overrides MUI & RA        │
└──────────────────────────────────────────────────┘
```

## Couche 1 — `themeConfig.ts` (Tokens)

Fichier qui exporte UNIQUEMENT des valeurs pures :
- `colors` (light + dark), `gradients`, `shadows` (light + dark)
- `borderRadius`, `transitions`, `spacing`, `typography`
- Fonctions helpers : `getShadow(mode, size)`, `getBorder(mode)`, `getDivider(mode)`…

**Règles :**
- ✅ Valeurs pures uniquement
- ✅ Support light/dark via objets parallèles
- ❌ Pas de composants React
- ❌ Pas d'objets `sx`
- ❌ Pas de `createTheme()` — ça va dans `theme.ts`
- ❌ Pas de logique métier

## Couche 2 — `components.ts` (Objets de style)

Exporte des objets `SxProps<Theme>` prêts à l'emploi, organisés par famille de composants :
`appBarStyles`, `menuStyles`, `formStyles`, `datagridStyles`, `showStyles`, `homePageStyles`, `layoutStyles`…

**Règles :**
- Chaque objet importe ses tokens depuis `themeConfig.ts` — jamais de valeurs hardcodées
- Les valeurs dynamiques (mode light/dark) utilisent des closures : `(theme: Theme) => getXxx(theme.palette.mode)`
- `as const` pour le typage strict

## Couche 3 — `theme.ts` (Thème MUI + surcharges)

Fonction `createAppTheme(mode)` qui produit un thème MUI complet.

**Contenu :**
- **Palette** : construite à partir des tokens `colors` (primary, secondary, light/dark…)
- **Surcharges MUI** : `MuiButton`, `MuiCard`, `MuiTextField`, `MuiTable`…
- **Surcharges RA** : `RaCreate`, `RaEdit`, `RaSimpleForm`, `RaToolbar`, `RaSaveButton`…

**Règles :**
- Tous les composants MUI et RA sont surchargés ici, pas dans les composants
- Les valeurs varient selon le mode via des closures ou des appels à `getXxx(mode)`

---

# Utilisation dans le code

## Imports

```tsx
// Depuis les composants métier — tokens purs
import { gradients, borderRadius as br, getShadow, colors } from '../../style/themeConfig'

// Depuis les composants métier — sx pré-composés
import { formStyles, datagridStyles } from '../../style/components'
```

## Dans les composants

Les 3 façons d'appliquer du style, par ordre de préférence :

```tsx
// 1. sx pré-composé depuis components.ts
<Card sx={formStyles.card}>
  <Typography>Contenu</Typography>
</Card>

// 2. sx avec tokens depuis themeConfig.ts
<Button sx={{
  background: gradients.primary,
  borderRadius: br.md,
  transition: transitions.default,
  '&:hover': { filter: 'brightness(1.1)' },
}}>

// 3. Closures pour valeurs dynamiques (dark mode)
<Box sx={{
  boxShadow: (theme) => getShadow(theme.palette.mode, 'sm'),
  border: (theme) => `1px solid ${getBorder(theme.palette.mode)}`,
}}>
```

## Anti-patrons

```tsx
// ❌ style={} — jamais
<Card style={{ borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>

// ❌ valeurs hardcodées
<Typography sx={{ color: '#5f6368', fontSize: '0.75rem' }}>
<Card sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

// ❌ surcharge RA dans un fichier métier
// (à mettre dans theme.ts)
```

---

# Personnalisation des pages React Admin

Toutes les personnalisations de pages RA passent par le thème — pas de wrappers ni de CSS dans les fichiers métier.

## Créer / Éditer / Voir

```ts
// style/theme.ts → commonComponentOverrides(mode)
RaCreate: {
  styleOverrides: {
    main: {
      backgroundColor: 'transparent',
      maxWidth: { xs: '100%', md: '900px' },
      margin: { xs: '8px', sm: '16px', md: '24px auto' },
    },
  },
},
RaEdit: { /* idem */ },
RaShow: { /* idem */ },
```

## Formulaire

```ts
RaSimpleForm: {
  styleOverrides: {
    root: {
      backgroundColor: mode === 'light' ? '#ffffff' : '#1e293b',
      borderRadius: br.lg,
      padding: { xs: 2, sm: 3, md: 4 },
      boxShadow: getShadow(mode, 'sm'),
      border: `1px solid ${getBorder(mode)}`,
    },
  },
},
RaTabbedForm: { /* idem avec overflow hidden */ },
```

## Barre d'outils (Save / Delete)

```ts
RaToolbar: {
  styleOverrides: {
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: spConfig.md,
      padding: { xs: 2, md: 3 },
      marginTop: { xs: 2, md: 3 },
      borderTop: `1px solid ${getDivider(mode)}`,
    },
  },
},
RaSaveButton: {
  styleOverrides: {
    root: {
      background: gradients.primary,
      borderRadius: br.md,
      boxShadow: getShadow(mode, 'primary'),
    },
  },
},
```

## Liste / Datagrid

```ts
RaList: {
  styleOverrides: {
    main: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
},

// Style du tableau (MuiDataGrid ou RaDatagrid via MuiTable*)
MuiTableHead: {
  styleOverrides: {
    root: {
      backgroundColor: getSubtleBg(mode),
      '& .MuiTableCell-head': {
        fontWeight: 600,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        color: getTextSecondary(mode),
      },
    },
  },
},
MuiTableBody: {
  styleOverrides: {
    root: {
      '& .MuiTableRow-root:hover': {
        backgroundColor: alpha(colors.primary.main, 0.04),
      },
    },
  },
},
```

## Filtres

```ts
RaFilterForm: {
  styleOverrides: {
    root: {
      backgroundColor: '#ffffff',
      borderRadius: br.lg,
      padding: { xs: 2, md: 3 },
      boxShadow: getShadow(mode, 'sm'),
      border: `1px solid ${getBorder(mode)}`,
      marginBottom: { xs: 2, md: 3 },
    },
  },
},
```

## Champs en mode Show

```ts
RaTextField: {
  styleOverrides: {
    root: {
      '& .MuiTypography-root:first-of-type': {
        color: getTextSecondary(mode),
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        fontWeight: 500,
        letterSpacing: '0.04em',
        marginBottom: '4px',
      },
      '& .MuiTypography-root:last-child': {
        fontSize: '0.9375rem',
        fontWeight: 500,
      },
    },
  },
},
```

## États spéciaux

```ts
RaEmpty: {
  styleOverrides: {
    root: {
      padding: { xs: 4, md: 6 },
      textAlign: 'center',
    },
  },
},
RaLoading: {
  styleOverrides: {
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: { xs: 4, md: 6 },
    },
  },
},
```

---

# Gestion du dark mode

Le `ThemeContext` fournit `{ mode, toggleMode }` persistant dans localStorage.

- Les tokens sont séparés en `colors.light.*` / `colors.dark.*`
- Les helpers `getXxx(mode)` retournent la bonne valeur selon le mode
- Dans les objets `sx` et surcharges, les valeurs dynamiques utilisent des closures :

```ts
sx={{
  boxShadow: (theme) => getShadow(theme.palette.mode, 'sm'),
  border: (theme) => `1px solid ${getBorder(theme.palette.mode)}`,
}}
```

---

# Checklist

- [ ] Pas de valeurs hardcodées — tout passe par les tokens
- [ ] Les tokens sont dans `themeConfig.ts` (pas de JSX, pas de `createTheme`)
- [ ] Les `sx` réutilisables sont dans `components.ts`
- [ ] Pas de `style={}` — uniquement `sx`
- [ ] Les surcharges RA (`RaCreate`, `RaList`, `RaSimpleForm`…) sont dans `theme.ts`
- [ ] Les pages Create/Edit/Show ont leur max-width centré via le thème
- [ ] Les boutons Save/Delete/Edit sont stylisés dans le thème
- [ ] Le dark mode est géré (tokens light/dark + closures)
- [ ] Pas de magic numbers — utiliser les helpers ou `theme.spacing()`
