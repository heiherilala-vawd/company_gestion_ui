import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetList } from 'react-admin'
import { getMiddleUrlWithId } from '../config/dynamicResources'
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
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
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

function LoanTable({
  loans,
  title,
  repaymentAmounts,
  onAmountChange,
  onRepay,
  submittingRepayments,
}: {
  loans: any[]
  title: string
  repaymentAmounts: Record<string, number>
  onAmountChange: (id: string, value: number) => void
  onRepay: (loan: any) => void
  submittingRepayments: Record<string, boolean>
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        {title} ({loans.length})
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Prêteur</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Montant</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Reste</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Taux</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Début</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Montant à retourner</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan: any) => {
              const payAmount = repaymentAmounts[loan.id]
              return (
                <TableRow key={loan.id} hover>
                  <TableCell>{loan.lender}</TableCell>
                  <TableCell>
                    {Number(loan.amount).toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                    })}{' '}
                    €
                  </TableCell>
                  <TableCell>
                    {loan.remaining_amount != null
                      ? Number(loan.remaining_amount).toLocaleString('fr-FR', {
                          minimumFractionDigits: 2,
                        })
                      : '-'}{' '}
                    €
                  </TableCell>
                  <TableCell>{loan.interest_rate ? `${loan.interest_rate / 100}%` : '-'}</TableCell>
                  <TableCell>
                    {loan.start_date
                      ? new Date(loan.start_date).toLocaleDateString('fr-FR')
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={payAmount ?? ''}
                      onChange={(e) => onAmountChange(loan.id, Number(e.target.value))}
                      inputProps={{ min: 0, step: 0.01, style: { width: 120 } }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={!payAmount || payAmount <= 0 || submittingRepayments[loan.id]}
                      onClick={() => onRepay(loan)}
                    >
                      {submittingRepayments[loan.id] ? '...' : 'Valider'}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default function EmployerPaymentActivity() {
  const navigate = useNavigate()

  const [entityType, setEntityType] = useState<'payment' | 'loans'>('payment')
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [serverFilters, setServerFilters] = useState({
    invoice_reference: '',
    description: '',
    amount: '',
  })
  const [paymentAmounts, setPaymentAmounts] = useState<Record<string, number>>({})
  const [repaymentAmounts, setRepaymentAmounts] = useState<Record<string, number>>({})
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({})
  const [submittingRepayments, setSubmittingRepayments] = useState<Record<string, boolean>>({})
  const [confirmTarget, setConfirmTarget] = useState<{ income: any; amount: number } | null>(null)
  const [confirmRepayTarget, setConfirmRepayTarget] = useState<{ loan: any; amount: number } | null>(null)

  const {
    data: loansActive = [],
    isLoading: loadingActive,
    refetch: refetchLoansActive,
  } = useGetList('loans', {
    pagination: { page: 1, perPage: 499 },
    filter: { status: 'ACTIVE' },
  })

  const {
    data: loansDefaulted = [],
    isLoading: loadingDefaulted,
    refetch: refetchLoansDefaulted,
  } = useGetList('loans', {
    pagination: { page: 1, perPage: 499 },
    filter: { status: 'DEFAULTED' },
  })

  const queryFilters = useMemo(
    () => cleanFilters({ ...serverFilters, money_received: false }),
    [serverFilters],
  )

  const {
    data: allIncomes = [],
    isLoading: loadingIncomes,
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(0)
  }

  const handleFilterChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerFilters((prev) => ({ ...prev, [field]: e.target.value }))
    setPage(0)
  }

  const handleAmountChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmounts((prev) => ({ ...prev, [id]: Number(e.target.value) }))
  }

  const handleEntityChange = (_: any, value: 'payment' | 'loans' | null) => {
    if (value) setEntityType(value)
  }

  const handlePay = async (income: any) => {
    const amount = paymentAmounts[income.id]
    if (!amount || amount <= 0) return

    setConfirmTarget(null)
    setSubmitting((prev) => ({ ...prev, [income.id]: true }))

    try {
      const token = localStorage.getItem('token')
      const url = getMiddleUrlWithId('incomes', income.id) + '/receipts'
      const body = [
        {
          id: generateId(),
          payment_date: new Date().toISOString(),
          amount,
          income_id: income.id,
          comment: `Paiement reçu pour la facture ${income.invoice_reference || 'N/A'}`,
        },
      ]

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

      setPaymentAmounts((prev) => {
        const next = { ...prev }
        delete next[income.id]
        return next
      })
      refetch()
    } catch (err) {
      console.error('Payment failed:', err)
    } finally {
      setSubmitting((prev) => ({ ...prev, [income.id]: false }))
    }
  }

  const handleRepaymentAmountChange = (id: string, value: number) => {
    setRepaymentAmounts((prev) => ({ ...prev, [id]: value }))
  }

  const handleRepayLoan = async () => {
    if (!confirmRepayTarget) return
    const { loan, amount } = confirmRepayTarget

    setConfirmRepayTarget(null)
    setSubmittingRepayments((prev) => ({ ...prev, [loan.id]: true }))

    try {
      const token = localStorage.getItem('token')
      const url = getMiddleUrlWithId('loans', loan.id) + '/repayments'
      const body = [
        {
          id: generateId(),
          payment_date: new Date().toISOString().split('T')[0],
          amount,
          loan_id: loan.id,
          comment: `Remboursement pour le prêt ${loan.lender} — ${amount} €`,
        },
      ]

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

      setRepaymentAmounts((prev) => {
        const next = { ...prev }
        delete next[loan.id]
        return next
      })
      refetchLoansActive()
      refetchLoansDefaulted()
    } catch (err) {
      console.error('Repayment failed:', err)
    } finally {
      setSubmittingRepayments((prev) => ({ ...prev, [loan.id]: false }))
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 1 }}>
        Retour
      </Button>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Paiements en attente de réception
      </Typography>

      <ToggleButtonGroup
        value={entityType}
        exclusive
        onChange={handleEntityChange}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="payment">Valider paiement</ToggleButton>
        <ToggleButton value="loans">Retourner emprunt</ToggleButton>
      </ToggleButtonGroup>

      {entityType === 'payment' ? (
        <>
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

          {loadingIncomes ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Organisation</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Montant</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Reste à recevoir</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Montant à recevoir</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incomes.map((income: any) => {
                      const remaining = income.remaining_amount ?? income.amount
                      const payAmount = paymentAmounts[income.id]

                      return (
                        <TableRow key={income.id} hover>
                          <TableCell>{income.source_organization}</TableCell>
                          <TableCell>
                            {Number(income.amount).toLocaleString('fr-FR', {
                              minimumFractionDigits: 2,
                            })}{' '}
                            €
                          </TableCell>
                          <TableCell>
                            {Number(remaining).toLocaleString('fr-FR', {
                              minimumFractionDigits: 2,
                            })}{' '}
                            €
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              size="small"
                              value={payAmount ?? ''}
                              onChange={handleAmountChange(income.id)}
                              inputProps={{ min: 0, step: 0.01, style: { width: 120 } }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={!payAmount || payAmount <= 0 || submitting[income.id]}
                              onClick={() => setConfirmTarget({ income, amount: payAmount })}
                            >
                              {submitting[income.id] ? '...' : 'Valider'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
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
        </>
      ) : (
        <>
          {loadingActive || loadingDefaulted ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <LoanTable
                loans={loansDefaulted}
                title="Emprunts en défaut"
                repaymentAmounts={repaymentAmounts}
                onAmountChange={handleRepaymentAmountChange}
                onRepay={(loan) =>
                  setConfirmRepayTarget({
                    loan,
                    amount: repaymentAmounts[loan.id],
                  })
                }
                submittingRepayments={submittingRepayments}
              />
              <LoanTable
                loans={loansActive}
                title="Emprunts actifs"
                repaymentAmounts={repaymentAmounts}
                onAmountChange={handleRepaymentAmountChange}
                onRepay={(loan) =>
                  setConfirmRepayTarget({
                    loan,
                    amount: repaymentAmounts[loan.id],
                  })
                }
                submittingRepayments={submittingRepayments}
              />
            </>
          )}
        </>
      )}

      <Dialog open={!!confirmTarget} onClose={() => setConfirmTarget(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirmer le paiement</DialogTitle>
        <DialogContent>
          {confirmTarget && (
            <>
              <Typography sx={{ mb: 1 }}>
                <strong>Organisation :</strong> {confirmTarget.income.source_organization}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Réf. facture :</strong> {confirmTarget.income.invoice_reference || 'N/A'}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Montant total :</strong>{' '}
                {Number(confirmTarget.income.amount).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                })}{' '}
                €
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Reste à recevoir :</strong>{' '}
                {Number(
                  confirmTarget.income.remaining_amount ?? confirmTarget.income.amount,
                ).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                })}{' '}
                €
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Montant à recevoir :</strong>
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                {confirmTarget.amount.toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                })}{' '}
                €
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmTarget(null)}>Annuler</Button>
          <Button variant="contained" onClick={() => handlePay(confirmTarget!.income)}>
            Confirmer le paiement
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!confirmRepayTarget}
        onClose={() => setConfirmRepayTarget(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmer le remboursement</DialogTitle>
        <DialogContent>
          {confirmRepayTarget && (
            <>
              <Typography sx={{ mb: 1 }}>
                <strong>Prêteur :</strong> {confirmRepayTarget.loan.lender}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Montant total :</strong>{' '}
                {Number(confirmRepayTarget.loan.amount).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                })}{' '}
                €
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Reste à rembourser :</strong>{' '}
                {Number(
                  confirmRepayTarget.loan.remaining_amount ?? confirmRepayTarget.loan.amount,
                ).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                })}{' '}
                €
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Montant à rembourser :</strong>
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                {confirmRepayTarget.amount.toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                })}{' '}
                €
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmRepayTarget(null)}>Annuler</Button>
          <Button variant="contained" onClick={handleRepayLoan}>
            Confirmer le remboursement
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
