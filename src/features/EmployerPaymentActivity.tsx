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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  CircularProgress,
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

export default function EmployerPaymentActivity() {
  const navigate = useNavigate()

  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [serverFilters, setServerFilters] = useState({
    invoice_reference: '',
    description: '',
    amount: '',
  })
  const [showSummary, setShowSummary] = useState(false)

  const queryFilters = useMemo(
    () => cleanFilters({ ...serverFilters, money_received: false }),
    [serverFilters],
  )

  const {
    data: allIncomes = [],
    isLoading,
    refetch,
  } = useGetList('incomes', {
    pagination: { page: 1, perPage: 499 },
    filter: queryFilters,
  })

  const filteredIncomes = useMemo(() => {
    if (!search) return allIncomes
    const q = search.toLowerCase()
    return allIncomes.filter((item: any) =>
      Object.values(item).some((v) =>
        String(v ?? '')
          .toLowerCase()
          .includes(q),
      ),
    )
  }, [allIncomes, search])

  const total = filteredIncomes.length
  const incomes = filteredIncomes.slice(page * perPage, (page + 1) * perPage)

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

  const handleValidate = () => {
    const summary = {
      type: 'payment_validation',
      items: selectedItems.map((i: any) => ({
        id: i.id,
        source_organization: i.source_organization,
        invoice_reference: i.invoice_reference,
        amount: i.amount,
        description: i.description,
      })),
    }
    console.log('Validation summary:', summary)
    setShowSummary(false)
    setSelectedItems([])
    refetch()
  }

  return (
    <Box sx={{ p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 1 }}>
        Retour
      </Button>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Paiements en attente de réception
      </Typography>

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
            label="Réf. facture"
            size="small"
            value={serverFilters.invoice_reference}
            onChange={handleFilterChange('invoice_reference')}
          />
          <TextField
            label="Description"
            size="small"
            value={serverFilters.description}
            onChange={handleFilterChange('description')}
          />
          <TextField
            label="Montant"
            size="small"
            value={serverFilters.amount}
            onChange={handleFilterChange('amount')}
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
                  <TableCell sx={{ fontWeight: 600 }}>Organisation</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Réf. facture</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Montant</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Chantier</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Créé le</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomes.map((income: any) => (
                  <TableRow
                    key={income.id}
                    hover
                    selected={selectedItems.some((i) => i.id === income.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.some((i) => i.id === income.id)}
                        onChange={() => toggleSelect(income)}
                      />
                    </TableCell>
                    <TableCell>{income.source_organization}</TableCell>
                    <TableCell>{income.invoice_reference}</TableCell>
                    <TableCell>
                      {Number(income.amount).toLocaleString('fr-FR', {
                        minimumFractionDigits: 2,
                      })}{' '}
                      €
                    </TableCell>
                    <TableCell>{income.description}</TableCell>
                    <TableCell>{income.job?.description}</TableCell>
                    <TableCell>
                      {income.created_at
                        ? new Date(income.created_at).toLocaleDateString('fr-FR')
                        : ''}
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
        disabled={selectedItems.length === 0}
        onClick={() => setShowSummary(true)}
        sx={{ mt: 2 }}
      >
        Effectuer la validation ({selectedItems.length})
      </Button>

      <Dialog open={showSummary} onClose={() => setShowSummary(false)} maxWidth="md" fullWidth>
        <DialogTitle>Résumé de la validation</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Éléments sélectionnés ({selectedItems.length}) :
          </Typography>
          {selectedItems.map((item: any) => (
            <Typography key={item.id} sx={{ mb: 0.5 }}>
              • {item.source_organization} — {item.invoice_reference} —{' '}
              {Number(item.amount).toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
              })}{' '}
              €
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
