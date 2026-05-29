---
name: clean-code
description: Pragmatic clean code standards — DRY, small functions, no repetition, no over-engineering, meaningful names. Use when reviewing code for duplication, refactoring, or writing new code that should be clean and maintainable.
---

# Clean Code — Pragmatic Standards

## Core Principles

| Principe | Règle |
|----------|-------|
| **SRP** | Single Responsibility — chaque fonction/classe fait UNE chose |
| **DRY** | Don't Repeat Yourself — extrais les duplications, réutilise |
| **KISS** | Keep It Simple — solution la plus simple qui marche |
| **YAGNI** | You Aren't Gonna Need It — ne construis pas des fonctionnalités inutilisées |
| **Boy Scout** | Laisse le code plus propre que tu ne l'as trouvé |

## Naming Rules

| Élément | Convention |
|---------|------------|
| **Variables** | Révèle l'intention : `userCount` pas `n` |
| **Fonctions** | Verbe + nom : `getUserById()` pas `user()` |
| **Booléens** | Forme de question : `isActive`, `hasPermission`, `canEdit` |
| **Constantes** | SCREAMING_SNAKE : `MAX_RETRY_COUNT` |

> Si tu as besoin d'un commentaire pour expliquer un nom, renomme-le.

## Function Rules

| Règle | Description |
|-------|-------------|
| **Petite** | Max 20 lignes, idéalement 5-10 |
| **Une chose** | Fait une seule chose, bien |
| **Un niveau** | Un niveau d'abstraction par fonction |
| **Peu de params** | Max 3 arguments, préfère 0-2 |
| **Pas d'effet de bord** | Ne mute pas les entrées de façon inattendue |

## Code Structure

| Pattern | Applique |
|---------|----------|
| **Guard Clauses** | Retours précoces pour les cas limites |
| **Plat > Imbriqué** | Évite l'imbrication profonde (max 2 niveaux) |
| **Composition** | Petites fonctions composées ensemble |
| **Colocation** | Garde le code lié proche |

## Anti-Patterns à éviter

| ❌ Pattern | ✅ Correctif |
|-----------|-------------|
| Commentaire sur chaque ligne | Supprime les commentaires évidents |
| Helper pour une ligne | Inline le code |
| Factory pour 2 objets | Instanciation directe |
| Fonction de 100+ lignes | Découpe par responsabilité |
| Duplication de code | Extrais dans une fonction partagée |
| Nombre magique (`42`) | Constante nommée (`MAX_ITEMS_PER_PAGE`) |
| Imbrication profonde (if dans if dans if) | Guard clauses |
| `utils.ts` avec 1 seule fonction | Mets le code là où il est utilisé |

## Détection de la duplication

**Règle des 3 :** N'extrais pas une abstraction avant que le même pattern apparaisse 3 fois. 2 occurrences = coïncidence, 3 = pattern.

**Quand extraire :**
- Mêmes 5+ lignes répétées à 2 endroits → extrais
- Même logique de validation dupliquée → extrais
- Même helper `cy.intercept()` pattern dans 3+ tests → extrais dans `interceptGeneralEndpoint()`
- Même séquence localStorage dans 3+ tests → extrais dans `insertInToLocalStorage()`

## Checklist

- [ ] Fonctions < 20 lignes
- [ ] Pas de duplication de logique
- [ ] Noms qui révèlent l'intention
- [ ] Pas de nombres magiques — constantes nommées
- [ ] Pas de commentaires qui disent l'évidence
- [ ] Guard clauses pas d'imbrication profonde
- [ ] Chaque fonction fait UNE chose
- [ ] Règle des 3 respectée (pas d'abstraction prématurée)
