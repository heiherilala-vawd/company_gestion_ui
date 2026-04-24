/**
 * Liste des ressources qui nécessitent un companyId dans l'URL
 * Ajoutez ici toutes les ressources concernées
 */
export const DYNAMIC_RESOURCES = ['jobs', 'warehouses', 'equipment'] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicResource = (typeof DYNAMIC_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite companyId)
 */
export const isDynamicResource = (resource: string): boolean => {
  return DYNAMIC_RESOURCES.includes(resource as DynamicResource)
}
