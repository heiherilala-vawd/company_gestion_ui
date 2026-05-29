export const department1Mock = {
  id: 'dept1_id',
  name: 'Construction',
  description: 'Département construction et rénovation',
}

export const department2Mock = {
  id: 'dept2_id',
  name: 'Administration',
  description: 'Département administratif et financier',
}

export const departmentsMock = [department1Mock, department2Mock]

export const crupdateDepartmentsMock = [
  {
    id: 'dept1_id',
    name: 'Construction - Mis à jour',
    description: 'Département construction mis à jour',
  },
  {
    id: 'dept3_id',
    name: 'Nouveau département',
    description: 'Description nouveau département',
  },
]

export const createOrUpdateDepartments = (depts: any[]) =>
  depts.map((d: any) => ({ ...d, id: d.id || 'newId' }))
