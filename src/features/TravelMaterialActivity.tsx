import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetList } from 'react-admin'
import { getMiddleUrl } from '../config/dynamicResources'
import generateId from '../utili/utils.tsx'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'

function cleanFilters(raw: Record<string, string | boolean>) {
  const out: Record<string, string | boolean> = {}
  for (const [k, v] of Object.entries(raw)) {
    if (v !== undefined && v !== null && v !== '') {
      out[k] = v
    }
  }
  return out
}

export default function TravelMaterialActivity() {
  const navigate = useNavigate()

  const [entityType, setEntityType] = useState<'materials' | 'equipment'>('materials')
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [serverFilters, setServerFilters] = useState<Record<string, string>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [pendingIds, setPendingIds] = useState<{
    travelId: string
    expenseId: string
    materialLineIds: string[]
  } | null>(null)

  const getToken = () => localStorage.getItem('token')

  const putItems = async (resource: string, body: any[]) => {
    const token = getToken()
    const url = getMiddleUrl(resource)
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  }

  const resource = entityType === 'materials' ? 'material_warehouse' : 'equipment'
  const queryFilters = useMemo(
    () => cleanFilters({ ...serverFilters, not_arrived: true }),
    [serverFilters],
  )

  const {
    data: allItems = [],
    isLoading,
    refetch,
  } = useGetList(resource, {
    pagination: { page: 1, perPage: 499 },
    filter: queryFilters,
  })

  const filteredItems = useMemo(() => {
    if (!search) return allItems
    const q = search.toLowerCase()
    return allItems.filter((item: any) =>
      Object.values(item).some((v) =>
        String(v ?? '')
          .toLowerCase()
          .includes(q),
      ),
    )
  }, [allItems, search])

  const total = filteredItems.length
  const items = filteredItems.slice(page * perPage, (page + 1) * perPage)

  const { data: warehouses = [] } = useGetList('warehouses', {
    pagination: { page: 1, perPage: 100 },
  })

  const toggleSelect = (item: any) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item],
    )
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(0)
  }

  const handleFilterChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerFilters((prev) => ({ ...prev, [field]: e.target.value }))
    setPage(0)
  }

  const handleEntityChange = (_: any, value: 'materials' | 'equipment' | null) => {
    if (value) {
      setEntityType(value)
      setSelectedItems([])
      setPage(0)
      setServerFilters({})
      setSearch('')
      setQuantities({})
    }
  }

  const handleQuantityChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantities((prev) => ({ ...prev, [id]: Number(e.target.value) }))
  }

  const handleValidate = async () => {
    const token = getToken()

    try {
      if (entityType === 'equipment') {
        const body = selectedItems.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          warehouse_id: selectedLocation,
          floor_number: item.floor_number,
          storage_number: item.storage_number,
          comment: item.comment,
        }))
        const result = await putItems('equipment', body)
        console.log('Equipment updated:', result)
      } else {
        const departureWarehouseId = selectedItems[0]?.warehouse?.id
        if (!departureWarehouseId) {
          console.error('No departure warehouse found')
          return
        }

        const payload = {
          comment: null,
          travel: {
            id: pendingIds!.travelId,
            expense_id: pendingIds!.expenseId,
            departure_location: { id: departureWarehouseId },
            arrival_location: { id: selectedLocation },
            departure_date: new Date().toISOString(),
            arrival_date: new Date().toISOString(),
            fee: 0,
          },
          material_lines: selectedItems.map((item: any, index: number) => ({
            id: pendingIds!.materialLineIds[index],
            material: { id: item.material?.id },
            quantity: quantities[item.id] || 0,
          })),
          equipment_lines: [],
          people_lines: [],
        }

        const url = getMiddleUrl('travel_operations')
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `Erreur HTTP ${response.status}`)
        }
        console.log('Travel operation created:', await response.json())
      }
    } catch (err) {
      console.error('Validation failed:', err)
    }

    setShowSummary(false)
    setSelectedItems([])
    setSelectedLocation('')
    setQuantities({})
    refetch()
  }

  const locationName = warehouses.find((w: any) => w.id === selectedLocation)?.name

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Réception - Éléments non arrivés
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Lieu de réception</InputLabel>
          <Select
            value={selectedLocation}
            label="Lieu de réception"
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            {warehouses.map((w: any) => (
              <MenuItem key={w.id} value={w.id}>
                {w.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ToggleButtonGroup value={entityType} exclusive onChange={handleEntityChange}>
          <ToggleButton value="materials">Matériaux</ToggleButton>
          <ToggleButton value="equipment">Équipement</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <TextField
          placeholder="Rechercher..."
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 260 }}
        />
        <Button
          size="small"
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
          color={showFilters ? 'primary' : 'inherit'}
        >
          Filtres
        </Button>
      </Box>

      {showFilters && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            mb: 2,
            '& .MuiTextField-root': { minWidth: 160 },
          }}
        >
          <TextField
            label="Description"
            size="small"
            value={serverFilters.description || ''}
            onChange={handleFilterChange('description')}
          />
        </Box>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ fontWeight: 600 }}>
                    Valider
                  </TableCell>
                  {entityType === 'materials' ? (
                    <>
                      <TableCell sx={{ fontWeight: 600 }}>Lieu</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Matériau</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Quantité actuelle</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Quantité à déplacer</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ fontWeight: 600 }}>Nom</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Entrepôt</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Étage</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Emplacement</TableCell>
                    </>
                  )}
                  <TableCell sx={{ fontWeight: 600 }}>Créé le</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item: any) => (
                  <TableRow
                    key={item.id}
                    hover
                    selected={selectedItems.some((i) => i.id === item.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.some((i) => i.id === item.id)}
                        onChange={() => toggleSelect(item)}
                      />
                    </TableCell>
                    {entityType === 'materials' ? (
                      <>
                        <TableCell>{item.warehouse?.name}</TableCell>
                        <TableCell>{item.material?.name}</TableCell>
                        <TableCell>
                          {item.quantity} {item.material?.unit}
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            value={quantities[item.id] ?? ''}
                            onChange={handleQuantityChange(item.id)}
                            inputProps={{ min: 0, style: { width: 70 } }}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.warehouse?.name}</TableCell>
                        <TableCell>{item.floor_number}</TableCell>
                        <TableCell>{item.storage_number}</TableCell>
                      </>
                    )}
                    <TableCell>
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('fr-FR') : ''}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={total || 0}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={perPage}
            onRowsPerPageChange={(e) => {
              setPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
            labelRowsPerPage="Lignes par page"
          />
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        disabled={selectedItems.length === 0 || !selectedLocation}
        onClick={() => {
          setPendingIds({
            travelId: generateId(),
            expenseId: generateId(),
            materialLineIds: selectedItems.map(() => generateId()),
          })
          setShowSummary(true)
        }}
        sx={{ mt: 2 }}
      >
        Effectuer la validation ({selectedItems.length})
      </Button>

      <Dialog open={showSummary} onClose={() => setShowSummary(false)} maxWidth="md" fullWidth>
        <DialogTitle>Résumé de la validation</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Lieu de réception :
          </Typography>
          <Typography sx={{ mb: 2 }}>{locationName || 'Non spécifié'}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Éléments sélectionnés ({selectedItems.length}) :
          </Typography>
          {selectedItems.map((item: any) => (
            <Typography key={item.id} sx={{ mb: 0.5 }}>
              {entityType === 'materials'
                ? `• ${item.warehouse?.name || '?'} → ${item.material?.name || '?'} — Qté: ${quantities[item.id] || 0}`
                : `• ${item.name || item.description} → ${locationName || selectedLocation}`}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSummary(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleValidate}>
            Effectuer la validation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
