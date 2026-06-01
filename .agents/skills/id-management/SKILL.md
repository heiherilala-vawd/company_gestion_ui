---
name: id-management
description: Manage hidden auto-generated UUID identifiers in React Admin forms. Use whenever creating or modifying forms to ensure every entity has a hidden `id` field with an auto-generated UUID value.
---

# Gestion des Identifiants (ID)

## Contexte

Dans une application React Admin, chaque entité envoyée à une API REST nécessite un identifiant unique. Cet `id` est généralement un UUID généré côté client, **toujours caché** dans l'interface utilisateur mais présent dans chaque payload.

## Principe

L'`id` ne doit jamais être saisi par l'utilisateur. Il est soit :
- **généré automatiquement** via une fonction UUID (pour les nouvelles entités)
- **préservé** depuis l'entité existante (pour les modifications)

## Fonction de génération d'UUID

```tsx
export default function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
```

---

## Patterns

### 1. CRUD Sub-form (`isCreate` / `isCreateForm`)

Pour les formulaires rendus dans `<SimpleForm>` ou `<TabbedForm>` via les composants `<Create>` et `<Edit>` de React Admin.

```tsx
import generateId from '../path/to/utils'

export default function SomeForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
        />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {/* champs métier... */}
    </>
  )
}
```

**Props :**
- `isCreate` → `true` quand le formulaire est dans un contexte de création (ajoute un champ `id` caché)
- `isCreateForm` → `true` quand le formulaire est utilisé dans une boîte de dialogue de création (affiche l'`id` en lecture seule pour information)

### 2. Préfixe dynamique (`souce` param)

Quand un formulaire est imbriqué dans un parent et que les champs sont préfixés (ex: `expense.id`, `expense.amount`).

```tsx
export default function NestedForm({
  isCreate = false, isCreateForm = false,
  souce = '',
}) {
  return (
    <>
      {isCreate && (
        <TextInput
          source={souce + 'id'}
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
        />
      )}
      {isCreateForm && <TextInput source={souce + 'newId'} readOnly defaultValue={generateId()} />}
      {/* champs avec {souce + 'amount'}, {souce + 'description'}, etc. */}
    </>
  )
}
```

### 3. Helper `addAutoId` (ArrayInput / lignes dynamiques)

Pour les formulaires avec `ArrayInput` et `SimpleFormIterator` où chaque ligne a besoin d'IDs uniques.

```tsx
const addAutoId = (source: string) => (
  <TextInput source={source} readOnly defaultValue={generateId()} sx={{ display: 'none' }} />
)

// Usage dans un SimpleFormIterator :
<ArrayInput source="lines">
  <SimpleFormIterator>
    {addAutoId('line_id')}
    {/* autres champs de la ligne */}
  </SimpleFormIterator>
</ArrayInput>
```

### 4. État initial avec IDs pré-générés

Pour les formulaires complexes où les IDs sont préparés avant le rendu.

```tsx
const initialLine = {
  line_id: generateId(),
  expense_id: generateId(),
  purchase_id: generateId(),
  amount: '',
}

<Form
  onSubmit={onSubmit}
  defaultValues={{ lines: [initialLine] }}
>
  {/* ... */}
</Form>
```

### 5. IDs générés au moment du submit

Pour les formulaires d'activité personnalisés (sans `SimpleForm`, avec `fetch` direct).

**Simple :**
```tsx
const onSubmit = async (data: any) => {
  const payload = [{
    id: generateId(),
    // ...
  }]
}
```

**Avec IDs imbriqués :**
```tsx
const id = generateId()
const nestedId = generateId()
const payload = [{
  id,
  nested: { id: nestedId, /* ... */ },
}]
```

**Dans une boucle (multi-création) :**
```tsx
for (const item of items) {
  const payload = [{ id: generateId(), /* ... */ }]
}
```

**Pour des IDs différés (confirmation dialog) :**
```tsx
setConfirmTarget({
  data: item,
  newId: generateId(), // utilisé plus tard lors de la confirmation
})
```

### 6. Bare `<TextInput>` sans guards

Quand le formulaire est directement dans un wrapper `<Create>` + `<SimpleForm>` sans passer par un sous-composant.

```tsx
<Create>
  <SimpleForm>
    <TextInput source="id" readOnly defaultValue={generateId()} sx={{ display: 'none' }} />
    {/* champs métier */}
  </SimpleForm>
</Create>
```

### 7. Raw `<input>` (hors React Admin)

Pour les formulaires HTML standards sans React Admin.

```tsx
<input type="hidden" name="id" value={generateId()} />
```

---

## Convention de nommage des `source`

Les noms des champs (`source`) dans les formulaires React Admin doivent correspondre exactement aux noms de propriétés attendus par l'API.

**Règles :**
1. Consulter la spécification de l'API (OpenAPI/Swagger, documentation, ou types générés) pour connaître les noms exacts des propriétés
2. Recopier ces noms **exactement** dans le `source` du champ React Admin
3. Si l'API utilise le `snake_case` (ex: `equipment_id`, `consumption_date`), le `source` doit être en `snake_case`
4. Si l'API utilise le `camelCase` (ex: `equipmentId`, `consumptionDate`), le `source` doit être en `camelCase`
5. **Ne pas inventer ou dévier** des noms de l'API

```tsx
// ✅ CORRECT — nom identique à la spec API
<TextInput source="equipment_id" />
<TextInput source="consumptionDate" />
<TextInput source="usage_status" />

// ❌ INCORRECT — ne pas changer le casing
<TextInput source="equipmentId" />     // ← faux si l'API attend equipment_id
<TextInput source="consumption_date" /> // ← faux si l'API attend consumptionDate
<TextInput source="warehouse" />        // ← faux si l'API attend warehouse_id
```

## Règles générales

- **Toujours cacher** l'`id` avec `sx={{ display: 'none' }}`
- **Toujours mettre** `readOnly` sur le champ `id`
- Le `source` doit **exactement correspondre** au nom de la propriété dans l'API
- **Ne jamais** envoyer `id: undefined` ou `id: null` dans le payload
- Pour les `ArrayInput`, chaque ligne doit avoir ses propres IDs uniques
- `generateId()` doit être appelé une fois par entité — pas de réutilisation d'un même ID
- Privilégier le même import path style que le reste du projet (avec ou sans extension)

## Vérification

- En édition CRUD : l'`id` existant est préservé automatiquement par React Admin via `source="id"`
- En création : `generateId()` appelé pour chaque nouvelle entité
- Tous les noms de `source` correspondent exactement aux noms de la spec API
