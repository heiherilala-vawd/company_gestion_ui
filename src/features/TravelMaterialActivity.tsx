import { useState, useMemo } from 'react'
import { useGetList, useNotify } from 'react-admin'
import { getMiddleUrl } from '../config/dynamicResources'
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
  MenuItem,
  Select,
  FormControl,
} from '@mui/material'

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
  const notify = useNotify()

  const [entityType, setEntityType] = useState<'materials' | 'equipment'>('materials')
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [serverFilters, setServerFilters] = useState<Record<string, string>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [quantityReceived, setQuantityReceived] = useState<Record<string, number>>({})
  const [quantityLost, setQuantityLost] = useState<Record<string, number>>({})
  const [equipmentStatuses, setEquipmentStatuses] = useState<Record<string, string>>({})

  const getToken = () => localStorage.getItem('token')

  const confirmArrival = async (resource: string, body: any[]) => {
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
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Erreur HTTP ${response.status}`)
    }
    return response.json()
  }

  const resource = entityType === 'materials' ? 'travel_materials' : 'travel_equipment'
  const queryFilters = useMemo(
    () => cleanFilters({ ...serverFilters, not_arrived: true }),
    [serverFilters],
  )

  const {
    data: allItems = [],
    isLoading,
    refetch,
  } = useGetList(resource, {
    pagination: { page: 1, perPage: 400 },
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
      setQuantityReceived({})
      setQuantityLost({})
      setEquipmentStatuses({})
    }
  }

  const handleQuantityReceivedChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityReceived((prev) => ({ ...prev, [id]: Number(e.target.value) }))
  }

  const handleQuantityLostChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityLost((prev) => ({ ...prev, [id]: Number(e.target.value) }))
  }

  const handleEquipmentStatusChange = (id: string) => (e: any) => {
    setEquipmentStatuses((prev) => ({ ...prev, [id]: e.target.value }))
  }

  const handleValidate = async () => {
    try {
      if (entityType === 'materials') {
        const body = selectedItems.map((item: any) => ({
          id: item.id,
          quantity_received: quantityReceived[item.id] ?? 0,
          quantity_lost: quantityLost[item.id] ?? 0,
        }))
        await confirmArrival('travel_materials_arrival', body)
      } else {
        const body = selectedItems.map((item: any) => ({
          id: item.id,
          status: equipmentStatuses[item.id] || 'ARRIVED',
        }))
        await confirmArrival('travel_equipments_arrival', body)
      }
      notify('Réception confirmée avec succès !', { type: 'success' })
    } catch (err: any) {
      console.error('Validation failed:', err)
      notify(`Erreur : ${err.message}`, { type: 'error' })
    }

    setShowSummary(false)
    setSelectedItems([])
    setSelectedLocation('')
    setQuantityReceived({})
    setQuantityLost({})
    setEquipmentStatuses({})
    refetch()
  }

  const locationName = warehouses.find((w: any) => w.id === selectedLocation)?.name

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Réception - Éléments non arrivés
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, color: 'text.secondary' }}>
            Lieu de réception
          </Typography>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            data-testid="warehouse-select"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '0.875rem',
              borderRadius: '4px',
              border: '1px solid #bdbdbd',
              background: '#fff',
            }}
          >
            <option value="">Aucun</option>
            {warehouses.map((w: any) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </Box>
        <ToggleButtonGroup value={entityType} exclusive onChange={handleEntityChange}>
          <ToggleButton value="materials" data-testid="toggle-materials">
            Matériaux
          </ToggleButton>
          <ToggleButton value="equipment" data-testid="toggle-equipment">
            Équipement
          </ToggleButton>
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
            label="Commentaire"
            size="small"
            value={serverFilters.comment || ''}
            onChange={handleFilterChange('comment')}
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
                      <TableCell sx={{ fontWeight: 600 }}>Matériau</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Reste</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Qté à recevoir</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Qté perdue</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Trajet</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ fontWeight: 600 }}>Équipement</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Trajet</TableCell>
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
                      <input
                        type="checkbox"
                        checked={selectedItems.some((i) => i.id === item.id)}
                        onChange={() => toggleSelect(item)}
                        data-testid={'checkbox-' + item.id}
                      />
                    </TableCell>
                    {entityType === 'materials' ? (
                      <>
                        <TableCell>{item.material?.name}</TableCell>
                        <TableCell>
                          {Math.max(
                            0,
                            (item.quantity || 0) -
                              (item.quantity_received || 0) -
                              (item.quantity_lost || 0),
                          )}{' '}
                          {item.material?.unit}
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            value={quantityReceived[item.id] ?? 0}
                            onChange={handleQuantityReceivedChange(item.id)}
                            inputProps={{ min: 0, style: { width: 70 } }}
                            disabled={!selectedItems.some((i) => i.id === item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            value={quantityLost[item.id] ?? 0}
                            onChange={handleQuantityLostChange(item.id)}
                            inputProps={{ min: 0, style: { width: 70 } }}
                            disabled={!selectedItems.some((i) => i.id === item.id)}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{item.equipment?.name}</TableCell>
                        <TableCell>
                          <FormControl size="small" sx={{ minWidth: 140 }}>
                            <Select
                              value={equipmentStatuses[item.id] || 'ARRIVED'}
                              onChange={handleEquipmentStatusChange(item.id)}
                              disabled={!selectedItems.some((i) => i.id === item.id)}
                              data-testid={'status-select-' + item.id}
                            >
                              <MenuItem value="ARRIVED">Arrivé</MenuItem>
                              <MenuItem value="LOST">Perdu</MenuItem>
                              <MenuItem value="DAMAGED">Endommagé</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      {item.travel?.departure_location?.name} →{' '}
                      {item.travel?.arrival_location?.name}
                    </TableCell>
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
        onClick={() => setShowSummary(true)}
        sx={{ mt: 2 }}
        data-testid="validate-btn"
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
                ? `• ${item.material?.name || '?'} — Reçu: ${quantityReceived[item.id] ?? 0}, Perdu: ${quantityLost[item.id] ?? item.quantity_lost ?? 0}`
                : `• ${item.equipment?.name || item.equipment?.id} → ${equipmentStatuses[item.id] || 'ARRIVED'}`}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSummary(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleValidate} data-testid="dialog-confirm-arrival">
            Confirmer la réception
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
