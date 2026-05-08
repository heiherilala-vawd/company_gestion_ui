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
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [filters, setFilters] = useState({
    source_organization: '',
    invoice_reference: '',
    description: '',
    amount: '',
  })
  const [showSummary, setShowSummary] = useState(false)

  const queryFilters = useMemo(() => cleanFilters({ ...filters, money_received: false }), [filters])

  const {
    data: incomes = [],
    total,
    isLoading,
    refetch,
  } = useGetList('incomes', {
    pagination: { page: page + 1, perPage },
    filter: queryFilters,
  })

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleFilterChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }))
    setPage(0)
  }

  const handleValidate = () => {
    const selectedItems = incomes.filter((i: any) => selectedIds.includes(i.id))
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
    setSelectedIds([])
    refetch()
  }

  const selectedItems = useMemo(
    () => incomes.filter((i: any) => selectedIds.includes(i.id)),
    [incomes, selectedIds],
  )

  return (
    <Box sx={{ p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 1 }}>
        Retour
      </Button>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Paiements en attente de réception
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Organisation"
          size="small"
          value={filters.source_organization}
          onChange={handleFilterChange('source_organization')}
        />
        <TextField
          label="Réf. facture"
          size="small"
          value={filters.invoice_reference}
          onChange={handleFilterChange('invoice_reference')}
        />
        <TextField
          label="Description"
          size="small"
          value={filters.description}
          onChange={handleFilterChange('description')}
        />
        <TextField
          label="Montant"
          size="small"
          value={filters.amount}
          onChange={handleFilterChange('amount')}
        />
      </Box>

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
                  <TableRow key={income.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIds.includes(income.id)}
                        onChange={() => toggleSelect(income.id)}
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
        disabled={selectedIds.length === 0}
        onClick={() => setShowSummary(true)}
        sx={{ mt: 2 }}
      >
        Effectuer la validation ({selectedIds.length})
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
