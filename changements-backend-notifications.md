# Changements backend nécessaires pour les notifications

## Déjà fait ✅

- Ajout du paramètre `?completed` (boolean) sur `GET /notifications` (lines 10326-10330)

## Changements encore requis

### 1. Ordre de tri par défaut : `created_at DESC`

La spec `GET /notifications` n'a pas de paramètre `sort`. Le data provider React Admin n'envoie pas de paramètre de tri. **Le backend doit retourner les notifications triées par `created_at` DESC (plus récent en premier)** par défaut, sans quoi la liste et le dropdown auront un ordre imprévisible.

### 2. Filtrage par utilisateur authentifié

La spec n'a pas de filtre `user_id`. Le `Notification` schema a un champ `user` (CrupdateUser). Chaque utilisateur ne doit voir que ses propres notifications. Le backend doit déduire l'utilisateur depuis le token JWT (header `Authorization`) et filtrer automatiquement les notifications par `user_id` sur :
- `GET /notifications`
- `GET /notifications/unread_count`
- `GET /notifications/{id}`

### 3. Scope du compteur `unread_count`

Le compteur `GET /notifications/unread_count` doit retourner le nombre de notifications où `read = false`, pour l'utilisateur authentifié, **indépendamment de `completed`**. La spec ne précise pas ce comportement — le backend doit l'implémenter ainsi pour coller au besoin métier ("peu importe qu'elles soient complétées ou non").

### 4. Comportement de pagination

La spec envoie `?page=&page_size=` mais le data provider React Admin existant attend que le backend retourne **tous les éléments** (il fait le slice client-side). C'est la convention actuelle du projet.

- Si le backend ignore `page`/`page_size` et retourne toutes les notifications : compatible avec le data provider existant, mais non scalable si le volume est grand
- Si le backend pagine vraiment : le data provider ne peut pas être utilisé tel quel — il faudra soit une page personnalisée avec fetch direct (comme les activity pages), soit modifier le data provider

### 5. `GET /notifications` retourne un array brut

Le format actuel retourne `type: array`. Le data provider gère ce format (`Array.isArray(response) ? response : response.data`). C'est cohérent avec les autres resources du projet.

### 6. `GET /notifications?completed=false` doit être supporté serveur ✅

Le paramètre est dans la spec. Le backend doit l'implémenter pour ne retourner que les notifications où `completed = false`.

## Résumé des implémentations backend

| N° | Action | Priorité |
|----|--------|----------|
| 1 | Trier `GET /notifications` par `created_at DESC` | Haute |
| 2 | Filtrer automatiquement par utilisateur du token JWT | Haute |
| 3 | `unread_count` compte `read = false` uniquement | Haute |
| 4 | Implémenter le filtre `?completed=false` | Haute |
| 5 | Décider stratégie de pagination (tout retourner vs paginé) | Moyenne |
| 6 | Garder le format de réponse `array` brut | OK (inchangé) |
