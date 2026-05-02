# Guide de création de tests E2E Cypress

Ce guide est basé sur l'analyse complète des tests existants (`jobs.cy.ts`, `companies.cy.ts`, `auth.cy.ts`, `main-menu.cy.ts`) et des mocks associés.

## Table des matières

1. [Structure des fichiers](#structure-des-fichiers)
2. [Mocks](#mocks)
3. [Configuration du `beforeEach`](#configuration-du-beforeeach)
4. [Utilisation de `cy.intercept`](#utilisation-de-cyintercept)
5. [Attributs `data-testid`](#attributs-data-testid)
6. [Gestion des `ReferenceSelectWithCreate`](#gestion-des-referenceselectwithcreate)
7. [Fonctions `createOrUpdate*` et helpers](#fonctions-createorupdate-et-helpers)
8. [Patterns de tests](#patterns-de-tests)
9. [Exemple complet de test](#exemple-complet-de-test)

---

## Structure des fichiers

```
src/__tests__/
├── e2e/
│   ├── auth.cy.ts          # Tests d'authentification
│   ├── companies.cy.ts     # Tests des entreprises
│   ├── jobs.cy.ts          # Tests des chantiers
│   └── main-menu.cy.ts     # Tests du menu principal
├── mocks/
│   └── responses/
│       ├── index.ts        # Export centralisé
│       ├── auth-api.ts     # Mocks d'authentification
│       ├── companies-api.ts
│       ├── jobs-api.ts
│       └── ... (autres ressources)
├── support/
│   ├── commands.ts
│   └── e2e.ts
└── cypress.config.ts
```

---

## Mocks

### Emplacement

Les mocks sont placés dans `src/__tests__/mocks/responses/` avec un fichier par ressource.

### Utilisation des types générés

Toujours utiliser les types générés par OpenAPI Generator :

```typescript
// jobs-api.ts
import { Job, CrupdateJob, JobStatus } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { company1Mock, company2Mock } from './companies-api.ts'

// Mock d'un Job complet
export const job1Mock: Job = {
  id: 'job1_id',
  company: {
    id: company1Mock.id,
    name: company1Mock.name,
    rib: company1Mock.rib,
    description: company1Mock.description,
    company_type: company1Mock.company_type,
    comment: company1Mock.comment,
  },
  description: 'Construction of Building A',
  contract_signature_date: '2022-01-10',
  start_date: '2022-02-01',
  end_date: '2022-12-31',
  status: 'IN_PROGRESS' as JobStatus,
  comment: 'Main construction project',
  created_at: '2022-01-05T08:00:00Z',
  updated_at: '2022-03-15T10:30:00Z',
  created_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
  updated_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
}

// Plusieurs mocks pour les tests
export const job2Mock: Job = { ... }
export const job3Mock: Job = { ... }
export const jobsMock: Job[] = [job1Mock, job2Mock, job3Mock]

// Mock pour la création/mise à jour (type CrupdateJob)
export const crupdateJobsMock: CrupdateJob[] = [
  {
    id: 'job1_id',              // Présent pour UPDATE
    company_id: company1Mock.id,
    description: 'Construction of Building A - Updated',
    contract_signature_date: '2022-01-10',
    start_date: '2022-02-01',
    end_date: '2022-12-31',
    status: 'IN_PROGRESS' as JobStatus,
    comment: 'Updated project details',
  },
  {
    id: 'job4_id',              // Nouvel ID pour CREATE
    company_id: company2Mock.id,
    description: 'New Landscaping Project',
    contract_signature_date: '2022-07-01',
    start_date: '2022-08-01',
    end_date: '2022-10-31',
    status: 'PENDING_SIGNATURE' as JobStatus,
    comment: 'New project creation',
  },
]
```

### Fonction `createOrUpdate*` dynamique

Cette fonction permet de simuler la création/mise à jour avec les données envoyées par le formulaire :

```typescript
export const createOrUpdateJobs = (jobs: CrupdateJob[]): Job[] => {
  return jobs.map((job) => ({
    ...job,
    id: job.id || `job_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    company: {
      id: job.company_id || company1Mock.id,
      name: job.company_id === company2Mock.id ? company2Mock.name : company1Mock.name,
      rib: job.company_id === company2Mock.id ? company2Mock.rib : company1Mock.rib,
      description:
        job.company_id === company2Mock.id ? company2Mock.description : company1Mock.description,
      company_type:
        job.company_id === company2Mock.id ? company2Mock.company_type : company1Mock.company_type,
      comment: job.company_id === company2Mock.id ? company2Mock.comment : company1Mock.comment,
    },
    created_at: job.id ? job1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: {
      id: user1Mock.id,
      role: user1Mock.role,
      first_name: user1Mock.first_name,
      last_name: user1Mock.last_name,
      sex: user1Mock.sex,
      email: user1Mock.email,
    },
    updated_by: {
      id: user1Mock.id,
      role: user1Mock.role,
      first_name: user1Mock.first_name,
      last_name: user1Mock.last_name,
      sex: user1Mock.sex,
      email: user1Mock.email,
    },
  }))
}
```

---

## Configuration du `beforeEach`

Le `beforeEach` sert à :

1. Nettoyer le storage
2. Intercepter les endpoints d'authentification
3. Intercepter les endpoints de données principales
4. Intercepter les endpoints pour les sélecteurs (dropdowns)
5. Effectuer le login
6. Vérifier la redirection

### Exemple type :

```typescript
describe('E2E: Jobs', () => {
  beforeEach(() => {
    // 1. Nettoyage
    cy.clearLocalStorage()
    cy.clearCookies()

    // 2. Définir currentCompanyId (pour ressources dynamiques)
    cy.window().then((win) => {
      win.localStorage.setItem('currentCompanyId', 'comp1_id')
    })

    // 3. Intercepter l'authentification
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as('whoami')

    // 4. Intercepter les endpoints principaux (liste, détail)
    cy.intercept('GET', '/companies/comp1_id/jobs*', mockSuccessResponse(jobsMock)).as('getJobs')
    cy.intercept('GET', '/companies/comp1_id/jobs/job1_id*', mockSuccessResponse(job1Mock)).as(
      'getJob',
    )
    cy.intercept('GET', '/companies*', mockSuccessResponse(companiesMock)).as('getCompanies')
    cy.intercept('GET', '/companies/comp1_id', mockSuccessResponse(company1Mock)).as('getCompany')

    // 5. Intercepter les endpoints pour les sélecteurs (ReferenceInput, etc.)
    cy.intercept('GET', '**/companies', mockSuccessResponse([company2Mock])).as(
      'getCompaniesSelection',
    )
    cy.intercept('GET', '**/companies/*/jobs', mockSuccessResponse([job3Mock])).as(
      'getJobsSelection',
    )
    cy.intercept('GET', '**/companies/*/jobs/*/users', mockSuccessResponse([user3Mock])).as(
      'getJobUsersSelection',
    )
    cy.intercept('GET', '**/expenses', mockSuccessResponse([expense2Mock])).as(
      'getExpensesSelection',
    )

    // 6. Visiter et login
    cy.visit('/', { failOnStatusCode: false })
    cy.get('input[name="username"]').type(<string>loginRequestMock.email)
    cy.get('input[name="password"]').type(<string>loginRequestMock.password)
    cy.get('button[type="submit"]').click()
    cy.wait(['@login', '@whoami'])
    cy.url().should('not.include', '/login')
  })
})
```

### Points clés :

- Toujours nettoyer avec `cy.clearLocalStorage()` et `cy.clearCookies()`
- Configurer `currentCompanyId` dans le localStorage avant le login
- Séparer les intercepts pour la liste principale et les sélecteurs (avec des alias différents)
- Utiliser `{ failOnStatusCode: false }` sur `cy.visit()` pour éviter les erreurs 401 initiales
- Attendre `@login` et `@whoami` après le clic sur submit

---

## Utilisation de `cy.intercept`

### Pattern pour les réponses succès (GET, liste)

```typescript
// Pour une liste avec wildcard
cy.intercept('GET', '/companies/comp1_id/jobs*', mockSuccessResponse(jobsMock)).as('getJobs')

// Pour un détail spécifique
cy.intercept('GET', '/companies/comp1_id/jobs/job1_id*', mockSuccessResponse(job1Mock)).as('getJob')

// Avec wildcard pour match flexible
cy.intercept('GET', '**/companies', mockSuccessResponse([company2Mock])).as('getCompaniesSelection')
```

### Pattern pour les créations/mises à jour (PUT/POST) avec données dynamiques

```typescript
// Utiliser une fonction de callback pour traiter req.body
cy.intercept('PUT', '/companies/comp1_id/jobs', (req) => {
  req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
}).as('createJob')
```

### Pattern pour les erreurs

```typescript
// Erreur simple
cy.intercept(
  'PUT',
  '/companies/comp1_id/jobs',
  mockErrorResponse('BadRequestException', 'Invalid data', 400),
).as('createJobFail')

// Ou avec callback pour personnaliser
cy.intercept('PUT', '/companies/comp1_id/jobs', (req) => {
  req.reply(mockErrorResponse('BadRequestException', 'Update failed', 400))
}).as('updateJobFail')
```

### Helpers dans `auth-api.ts`

```typescript
// Réponse succès 200
export const mockSuccessResponse = (body: any) => ({
  statusCode: 200,
  body,
})

// Réponse erreur avec statusCode configurable
export const mockErrorResponse = (type: string, message: string, statusCode: number = 401) => ({
  statusCode,
  body: { type, message },
})
```

---

## Attributs `data-testid`

### Stratégie minimale

N'ajoutez des `data-testid` que sur les éléments interactifs ou difficiles à sélectionner autrement.

### Convention de nommage

- Menu : `menu-<resource>` (ex: `menu-jobs`, `menu-companies`)
- Inputs de formulaire : `input-<field-name>` (ex: `input-description`, `input-status`)
- Pour `ReferenceSelectWithCreate` : `input-<reference>-id` (généré automatiquement)

### Où les ajouter (dans les composants React)

```tsx
// JobForm.tsx
<TextInput
  source="description"
  label="Description"
  multiline
  rows={3}
  data-testid="input-description"  // ← Ajouter sur les inputs
/>
<SelectInput
  source="status"
  label="Statut"
  choices={[...]}
  data-testid="input-status"        // ← Ajouter sur les selects
/>

// ReferenceSelectWithCreate génère automatiquement son data-testid
<ReferenceSelectWithCreate
  source="company_id"
  reference="companies"
  label="Entreprise"
  // data-testid="input-companies-id" généré automatiquement dans le composant en rapport avec le referance utiliser " data-testid={'input-' + reference + '-id'} "
/>
```

### Comment les utiliser dans les tests

```typescript
// Menu
cy.get('[data-testid="menu-jobs"]').click()

// Inputs classiques
cy.get('[data-testid="input-description"] textarea:visible').type('...')
cy.get('[data-testid="input-status"]').click()

// Pour les inputs MUI avec TextInput, cibler 'input' ou 'textarea:visible'
cy.get('[data-testid="input-name"] input').type('...')
cy.get('[data-testid="input-description"] textarea:visible').first().type('...')

// Sélecteurs ReferenceSelectWithCreate
cy.get('[data-testid="input-companies-id"]').click()
```

### Alternative sans data-testid (quand possible)

```typescript
// Par nom d'input (React Admin)
cy.get('input[name="username"]').type('...')
cy.get('input[name="password"]').type('...')

// Par texte visible
cy.contains('Create').click()
cy.contains('Edit').click()
cy.contains('En cours').click({ force: true })
```

---

## Gestion des `ReferenceSelectWithCreate`

### Comment ça marche

`ReferenceSelectWithCreate` est un composant personnalisé qui combine un `ReferenceInput` + `SelectInput` avec un bouton pour créer une nouvelle entrée.

Le composant génère automatiquement un `data-testid` : `'input-' + reference + '-id'`

### Dans le formulaire (JobForm.tsx)

```tsx
<ReferenceSelectWithCreate
  source="company_id"
  reference="companies" // ← reference utilisée pour le data-testid
  label="Entreprise"
  optionText="name"
  createUrlEnd={getMiddleUrl('companies')}
  createForm={<CompanyForm isCreateForm />}
/>
// Génère : data-testid="input-companies-id"
```

### Dans le test - Cliquer et sélectionner

```typescript
// 1. Cliquer sur le select pour ouvrir le dropdown
cy.get('[data-testid="input-companies-id"]').click()

// 2. Attendre le chargement des options (intercept)
cy.wait('@getCompanies') // ou '@getCompaniesSelection'

// 3. Cliquer sur l'option désirée (par texte visible)
cy.contains(<string>company1Mock.name).click({ force: true })

// 4. Attendre le chargement de la ressource liée si nécessaire
cy.wait('@getCompany')
```

### Pour le menu déroulant de statut (SelectInput simple)

```typescript
cy.get('[data-testid="input-status"]').click()
cy.contains('En cours').click({ force: true })
// Les options sont : 'En attente signature', 'En cours', 'Terminé'
```

---

## Fonctions `createOrUpdate*` et helpers

### But

Simuler la création/mise à jour côté backend en utilisant les données envoyées par le formulaire.

### Dans le mock (`jobs-api.ts`)

```typescript
export const createOrUpdateJobs = (jobs: CrupdateJob[]): Job[] => {
  return jobs.map((job) => ({
    ...job,
    id: job.id || `job_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    company: {
      /* reconstruction */
    },
    created_at: job.id ? job1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: {
      /* ... */
    },
    updated_by: {
      /* ... */
    },
  }))
}
```

### Dans le test - Utilisation

```typescript
// CREATE : nouvel ID généré dynamiquement
cy.intercept('PUT', '/companies/comp1_id/jobs', (req) => {
  req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
}).as('createJob')

// UPDATE : utilise l'ID existant
cy.intercept('PUT', '/companies/comp1_id/jobs', (req) => {
  req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
}).as('updateJob')
```

### Différence entre `crupdateJobsMock` et `createOrUpdateJobs`

- **`crupdateJobsMock`** : Données statiques pour pré-remplir le formulaire ou comparer
- **`createOrUpdateJobs(req.body)`** : Fonction qui transforme les données envoyées par le formulaire en réponse API complète

---

## Patterns de tests

### 1. Test d'affichage de liste

```typescript
it('should display jobs list', () => {
  cy.get('[data-testid="menu-jobs"]').click()
  cy.wait('@getJobs')
  cy.contains(<string>job1Mock.description).should('be.visible')
  cy.contains(<string>job2Mock.description).should('be.visible')
})
```

### 2. Test de détail

```typescript
it('should show job details', () => {
  cy.get('[data-testid="menu-jobs"]').click()
  cy.wait('@getJobs')
  cy.contains(<string>job1Mock.description).click()
  cy.wait('@getJob')
  cy.contains(<string>job1Mock.description).should('be.visible')
  cy.contains('En cours').should('be.visible')
})
```

### 3. Test de création

```typescript
it('should create a new job', () => {
  const newJob = crupdateJobsMock[1] // Mock pour la création

  cy.intercept('PUT', '/companies/comp1_id/jobs', (req) => {
    req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
  }).as('createJob')

  cy.get('[data-testid="menu-jobs"]').click()
  cy.wait('@getJobs')
  cy.contains('Create').click()

  // Remplir le formulaire
  cy.get('[data-testid="input-description"] textarea:visible').type(<string>newJob.description)
  cy.get('[data-testid="input-companies-id"]').click()
  cy.wait('@getCompanies')
  cy.contains(<string>company1Mock.name).click({ force: true })
  cy.wait('@getCompany')
  cy.get('[data-testid="input-status"]').click()
  cy.contains('En cours').click({ force: true })
  cy.get('button[type="submit"]').click()

  cy.wait('@createJob')
  cy.url().should('include', '/jobs')
})
```

### 4. Test de mise à jour

```typescript
it('should update an existing job', () => {
  const updatedData = crupdateJobsMock[0] // Mock avec ID existant

  cy.intercept('PUT', '/companies/comp1_id/jobs', (req) => {
    req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
  }).as('updateJob')

  cy.get('[data-testid="menu-jobs"]').click()
  cy.wait('@getJobs')
  cy.contains(<string>job1Mock.description).click()
  cy.wait('@getJob')
  cy.contains('Edit').click()

  cy.get('[data-testid="input-description"] textarea:visible')
    .clear()
    .type(<string>updatedData.description, { force: true })
  cy.get('button[type="submit"]').click()

  cy.wait('@updateJob')
  cy.url().should('include', '/jobs')
})
```

### 5. Test d'erreur (échec création)

```typescript
it('should show error on create failure', () => {
  cy.intercept(
    'PUT',
    '/companies/comp1_id/jobs',
    mockErrorResponse('BadRequestException', 'Invalid data', 400),
  ).as('createJobFail')

  cy.get('[data-testid="menu-jobs"]').click()
  cy.wait('@getJobs')
  cy.contains('Create').click()

  // Remplir le formulaire
  cy.get('[data-testid="input-description"] textarea:visible').type('Test Job Description')
  cy.get('[data-testid="input-companies-id"]').click()
  cy.wait('@getCompanies')
  cy.contains(<string>company1Mock.name).click({ force: true })
  cy.wait('@getCompany')
  cy.get('[data-testid="input-status"]').click()
  cy.contains('En cours').click({ force: true })
  cy.get('button[type="submit"]').click()

  cy.wait('@createJobFail')
  cy.get('.RaNotification-error').should('be.visible')
})
```

### 6. Test d'erreur (échec mise à jour)

```typescript
it('should show error on update failure', () => {
  cy.intercept(
    'PUT',
    '/companies/comp1_id/jobs',
    mockErrorResponse('BadRequestException', 'Update failed', 400),
  ).as('updateJobFail')

  cy.get('[data-testid="menu-jobs"]').click()
  cy.wait('@getJobs')
  cy.contains(<string>job1Mock.description).click()
  cy.wait('@getJob')
  cy.contains('Edit').click()

  cy.get('[data-testid="input-description"] textarea:visible')
    .clear()
    .type('Updated Job Description', { force: true })
  cy.get('button[type="submit"]').click()

  cy.wait('@updateJobFail')
  cy.get('.RaNotification-error').should('be.visible')
})
```

---

## Exemple complet de test

Voici un template complet à adapter pour une nouvelle ressource :

```typescript
import {
  mockSuccessResponse,
  mockErrorResponse,
  loginRequestMock,
  authResponseMock,
  whoamiResponseMock,
} from '../mocks/responses/auth-api'
import { companiesMock, company1Mock } from '../mocks/responses/companies-api'
import {
  resource1Mock,
  resource2Mock,
  resourcesMock,
  crupdateResourcesMock,
  createOrUpdateResources,
} from '../mocks/responses/resource-api'

describe('E2E: ResourceName', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()

    // Configurer currentCompanyId
    cy.window().then((win) => {
      win.localStorage.setItem('currentCompanyId', 'comp1_id')
    })

    // Auth
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as('whoami')

    // Ressource principale
    cy.intercept('GET', '/companies/comp1_id/resources*', mockSuccessResponse(resourcesMock)).as('getResources')
    cy.intercept('GET', '/companies/comp1_id/resources/resource1_id*', mockSuccessResponse(resource1Mock)).as('getResource')

    // Companies (pour les sélecteurs)
    cy.intercept('GET', '/companies*', mockSuccessResponse(companiesMock)).as('getCompanies')
    cy.intercept('GET', '/companies/comp1_id', mockSuccessResponse(company1Mock)).as('getCompany')

    // Sélecteurs additionnels si besoin
    cy.intercept('GET', '**/other-resource', mockSuccessResponse([...])).as('getOtherSelection')

    // Login
    cy.visit('/', { failOnStatusCode: false })
    cy.get('input[name="username"]').type(<string>loginRequestMock.email)
    cy.get('input[name="password"]').type(<string>loginRequestMock.password)
    cy.get('button[type="submit"]').click()
    cy.wait(['@login', '@whoami'])
    cy.url().should('not.include', '/login')
  })

  it('should display resources list', () => {
    cy.get('[data-testid="menu-resources"]').click()
    cy.wait('@getResources')
    cy.contains(<string>resource1Mock.name).should('be.visible')
  })

  it('should create a new resource', () => {
    const newResource = crupdateResourcesMock[1]

    cy.intercept('PUT', '/companies/comp1_id/resources', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateResources(req.body)))
    }).as('createResource')

    cy.get('[data-testid="menu-resources"]').click()
    cy.wait('@getResources')
    cy.contains('Create').click()

    // Remplir le formulaire selon vos champs
    cy.get('[data-testid="input-name"] input').type(<string>newResource.name)
    // ... autres champs

    cy.get('button[type="submit"]').click()
    cy.wait('@createResource')
    cy.url().should('include', '/resources')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '/companies/comp1_id/resources',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createResourceFail')

    cy.get('[data-testid="menu-resources"]').click()
    cy.wait('@getResources')
    cy.contains('Create').click()

    // Remplir le formulaire
    // ...

    cy.get('button[type="submit"]').click()
    cy.wait('@createResourceFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
```

---

## Checklist avant d'écrire un test

- [ ] Les types générés sont importés depuis `src/gen-ts/`
- [ ] Les mocks sont créés dans `src/__tests__/mocks/responses/<resource>-api.ts`
- [ ] La fonction `createOrUpdate<Resource>` est implémentée
- [ ] Les `data-testid` sont ajoutés sur les inputs du formulaire React
- [ ] Le `beforeEach` configure `currentCompanyId` et tous les intercepts nécessaires
- [ ] Les tests couvrent : liste, détail, création, mise à jour, erreurs
- [ ] Les `cy.wait()` correspondent aux aliases des `cy.intercept()`
- [ ] Les assertions vérifient l'URL ou la présence d'éléments visibles

---

## Commandes utiles

```bash
# Lancer le serveur de dev
npm run dev

# Lancer les tests Cypress (UI)
npm run cypress:open

# Lancer les tests Cypress (headless)
npm run cypress:run

# Lancer un test spécifique
npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/jobs.cy.ts"

# Vérifier les types
npm run type-check

# Linter
npm run lint
```

---

## Notes importantes

1. **React Admin utilise `username`** même si l'API attend `email`
2. **Le chemin contient des espaces** : `/home/herilala/Documents/react admin/firt project/test-admin/`
3. **Cypress config est dans `src/__tests__/`** - utiliser `--config-file src/__tests__/cypress.config.ts`
4. **Toujours attendre les `@alias`** après les actions qui déclenchent des requêtes
5. **Utiliser `{ force: true }`** sur `click()` si l'élément est superposé (dropdowns, modals)
6. **`textarea:visible`** pour cibler les TextInput multiline
7. **`.RaNotification-error`** pour vérifier les notifications d'erreur
