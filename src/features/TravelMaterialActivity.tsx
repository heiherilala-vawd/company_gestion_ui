import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetList } from 'react-admin'
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

  const resource = entityType === 'materials' ? 'materials' : 'equipment'
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
    }
  }

  const handleValidate = () => {
    const locationName = warehouses.find((w: any) => w.id === selectedLocation)?.name || ''
    const summary = {
      type: 'reception_validation',
      entityType,
      location: { id: selectedLocation, name: locationName },
      items: selectedItems.map((i: any) => ({
        id: i.id,
        name: i.name || i.description,
        description: i.description,
        ...(entityType === 'materials' ? { unit: i.unit } : {}),
      })),
    }
    console.log('Validation summary:', summary)
    setShowSummary(false)
    setSelectedItems([])
    setSelectedLocation('')
    refetch()
  }

  const locationName = warehouses.find((w: any) => w.id === selectedLocation)?.name

  return (
    <Box sx={{ p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 1 }}>
        Retour
      </Button>
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
            value={filters.description || ''}
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
                      <TableCell sx={{ fontWeight: 600 }}>Nom</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Unité</TableCell>
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
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.unit}</TableCell>
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
        onClick={() => setShowSummary(true)}
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
              • {item.name || item.description}
              {entityType === 'materials' ? ` (${item.unit})` : ''}
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
