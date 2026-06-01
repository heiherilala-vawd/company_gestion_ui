# Dashboard Endpoints — Rapport complet

## Base URL

Tous les endpoints : `GET /companies/{comp_id}/dashboard/...`

## Query params communs

| Param | Type | Requis | Description |
|-------|------|--------|-------------|
| `job_id` | string | non | Filtre par chantier (sauf cashflow, budget) |
| `date_from` | date (ISO) | non | Début de période |
| `date_to` | date (ISO) | non | Fin de période |
| `granularity` | string | non (défaut: `month`) | Agrégation temporelle : `day`, `2day`, `week`, `month`, `quarter`, `year` |

## Sécurité (rôles)

| Rôle | Accès |
|------|-------|
| `ADMIN` | Tout |
| `ADMINISTRATION` | Tout |
| `WAREHOUSE_WORKER` | Matériaux + Équipement uniquement |
| `EMPLOYEE` | Rien |

---

## 1. Vues d'ensemble (4 endpoints)

### `GET /materials` — `MaterialDashboardResponse`

```json
{
  "stock_value_total": 150000.00,
  "consumption_cost_total": 45000.00,
  "top5_stock_value": [
    { "material_id": "mat_001", "material_name": "Ciment", "unit": "kg", "quantity": 5000, "value": 25000.00 }
  ],
  "top5_consumption_cost": [
    { "material_id": "mat_001", "material_name": "Ciment", "unit": "kg", "quantity": 1200, "cost": 6000.00, "period": "2024-01" }
  ],
  "stock_by_material": [
    { "material_id": "mat_001", "material_name": "Ciment", "unit": "kg", "quantity": 5000, "stock_value": 25000.00, "warehouse": "Entrepôt Principal" }
  ],
  "consumption_by_material": [
    { "material_id": "mat_001", "material_name": "Ciment", "unit": "kg", "quantity": 200, "cost": 1000.00, "period": "2024-01" }
  ],
  "expiring_materials": [
    { "material_id": "mat_003", "material_name": "Peinture", "expiry_date": "2025-06-15", "stock_quantity": 50, "warehouse": "Entrepôt Principal" }
  ]
}
```

### `GET /equipment` — `EquipmentDashboardResponse`

```json
{
  "total_equipment": 45,
  "broken_count": 3,
  "available_count": 38,
  "usage_rate": 0.72,
  "avg_age_years": 4.5,
  "lost_count": 1,
  "category_distribution": [ { "category": "Engins", "count": 15 } ],
  "maintenance_cost_by_equipment": [ { "equipment_id": "eq_001", "equipment_name": "Pelle mécanique", "total_cost": 25000.00, "count": 4 } ],
  "scheduled_maintenances": [ { "equipment_id": "eq_002", "equipment_name": "Camion", "description": "Vidange", "scheduled_date": "2025-03-01" } ],
  "leased_equipment": [ { "equipment_id": "eq_010", "equipment_name": "Nacelle", "lease_end_date": "2025-06-30" } ],
  "usage_by_job": [ { "job_id": "job_001", "job_description": "Chantier A", "hours_used": 120.5 } ]
}
```

### `GET /hr` — `HrDashboardResponse`

```json
{
  "total_employees": 28,
  "new_hires": 3,
  "payroll_total": 185000.00,
  "tasks_completed": 42,
  "employees_by_department": [ { "department": "Terrain", "count": 18 } ],
  "leave_summary": {
    "total_days_approved": 45.5,
    "absence_rate": 0.035,
    "by_leave_type": [ { "leave_type": "Congé annuel", "days": 30, "count": 5 } ],
    "by_status": [ { "status": "APPROVED", "count": 5 } ]
  },
  "payroll_by_type": [ { "payment_type": "SALARY", "total_amount": 150000.00 } ],
  "leave_balances": [ { "user_id": "usr_001", "user_name": "Jean Dupont", "accrued": 25, "taken": 10, "remaining": 15 } ],
  "tasks_by_priority": [ { "priority": "HIGH", "count": 8 } ],
  "employees_by_job": [ { "job_id": "job_001", "job_description": "Chantier A", "count": 12 } ],
  "labor_cost_by_job": [ { "job_id": "job_001", "job_description": "Chantier A", "total_amount": 85000.00 } ]
}
```

### `GET /monetary` — `MonetaryDashboardResponse`

```json
{
  "total_revenue": 500000.00,
  "total_expenses": 350000.00,
  "gross_margin": 150000.00,
  "expected_revenue": 600000.00,
  "receivables": 45000.00,
  "fixed_costs_total": 25000.00,
  "expected_vs_actual": [ { "job_id": "job_001", "job_description": "Chantier A", "expected": 300000, "actual": 280000, "gap": -20000 } ],
  "cash_accounts": [ { "account_id": "ca_001", "account_name": "BNI", "balance": 75000.00 } ],
  "cash_flow": { "total_credits": 500000.00, "total_debits": 350000.00, "net": 150000.00 },
  "expenses_by_type": [ { "type": "PURCHASE", "total": 200000.00 } ],
  "budget_vs_actual": [ { "category": "Matériaux", "planned": 120000, "actual": 115000, "variance": 5000 } ],
  "active_loans": [ { "loan_id": "loan_001", "lender": "BOA", "remaining_amount": 50000.00, "next_payment_date": "2025-02-15" } ],
  "profitability_by_job": [ { "job_id": "job_001", "job_description": "Chantier A", "revenue": 280000, "expense": 210000, "profit": 70000, "margin": 0.25 } ],
  "revenue_by_job": [ { "job_id": "job_001", "job_description": "Chantier A", "total": 280000.00 } ],
  "expense_by_job": [ { "job_id": "job_001", "job_description": "Chantier A", "total": 210000.00, "by_type": [ { "type": "PURCHASE", "total": 120000 } ] } ]
}
```

---

## 2. Summary vs Breakdown

### Principe

| | **Summary** | **Breakdown** | **Dashboard** |
|---|---|---|---|
| **Contenu** | Scalaires, compteurs, KPI | Listes ventilées par dimension | Summary + Breakdown combinés |
| **Volume** | Léger (4–9 champs) | Lourd (listes) | Le plus lourd |
| **Usage** | Cartes KPI, indicateurs | Tableaux détaillés, graphiques | Page complète |

---

## 3. Matériaux (`/materials`)

### `GET /summary` — `MaterialSummaryResponse`

| Champ | Type | Description |
|-------|------|-------------|
| `stock_value_total` | number | Valeur totale du stock |
| `consumption_cost_total` | number | Coût total de consommation |
| `total_materials_count` | integer | Nombre de matériaux distincts |
| `expiring_count` | integer | Nombre de matériaux proches de péremption |

### `GET /breakdown` — `MaterialBreakdownResponse`

| Champ | Type | Description |
|-------|------|-------------|
| `top5_stock_value[]` | MaterialValueItem | Top 5 par valeur de stock |
| `top5_consumption_cost[]` | MaterialValueItem | Top 5 par coût de consommation |
| `stock_by_material[]` | MaterialStockItem | Stock par matériau (avec entrepôt) |
| `consumption_by_material[]` | MaterialConsumptionItem | Consommation par matériau (avec période) |
| `stock_value_by_warehouse[]` | WarehouseStockValue | Valeur de stock par entrepôt |
| `expiring_materials[]` | ExpiringMaterialItem | Matériaux proches de péremption |

**Items :**

| Item | Champs |
|------|--------|
| `MaterialValueItem` | `material_id`, `material_name`, `unit`, `quantity`, `value` |
| `MaterialStockItem` | `material_id`, `material_name`, `unit`, `quantity`, `stock_value`, `warehouse` |
| `MaterialConsumptionItem` | `material_id`, `material_name`, `unit`, `quantity`, `cost`, `period` |
| `MaterialBreakdownResponse.WarehouseStockValue` | `warehouse`, `total_value` |
| `ExpiringMaterialItem` | `material_id`, `material_name`, `expiry_date`, `stock_quantity`, `warehouse` |

---

## 4. Équipement (`/equipment`)

### `GET /summary` — `EquipmentSummaryResponse`

| Champ | Type | Description |
|-------|------|-------------|
| `total_equipment` | integer | Nombre total d'équipements |
| `available_count` | integer | Disponibles |
| `broken_count` | integer | En panne |
| `lost_count` | integer | Perdus |
| `avg_age_years` | number | Âge moyen |
| `total_usage_hours` | number | Heures d'utilisation totales |

### `GET /breakdown` — `EquipmentBreakdownResponse`

| Champ | Type | Description |
|-------|------|-------------|
| `category_distribution[]` | CategoryCount | Par catégorie |
| `status_breakdown[]` | StatusCount | Par statut (disponible, en panne, perdu) |
| `usage_by_job[]` | JobUsage | Utilisation par chantier |
| `maintenance_cost_by_equipment[]` | EquipmentMaintenanceCost | Coût maintenance par équipement |
| `leased_equipment[]` | LeasedEquipmentItem | Équipements en leasing |
| `scheduled_maintenances[]` | ScheduledMaintenanceItem | Maintenances planifiées |

**Items :**

| Item | Champs |
|------|--------|
| `CategoryCount` | `category`, `count` |
| `StatusCount` | `status`, `count` |
| `JobUsage` | `job_id`, `job_description`, `hours_used` |
| `EquipmentMaintenanceCost` | `equipment_id`, `equipment_name`, `total_cost`, `count` |
| `LeasedEquipmentItem` | `equipment_id`, `equipment_name`, `lease_end_date` |
| `ScheduledMaintenanceItem` | `equipment_id`, `equipment_name`, `description`, `scheduled_date` |

---

## 5. RH (`/hr`)

### `GET /summary` — `HrSummaryResponse`

| Champ | Type | Description |
|-------|------|-------------|
| `total_employees` | integer | Effectif total |
| `new_hires` | integer | Nouvelles embauches |
| `payroll_total` | number | Masse salariale |
| `tasks_completed` | integer | Tâches terminées |
| `leave_days_approved` | number | Jours de congé approuvés |
| `absence_rate` | number | Taux d'absentéisme |

### `GET /breakdown` — `HrBreakdownResponse`

| Champ | Type | Description |
|-------|------|-------------|
| `employees_by_department[]` | DepartmentCount | Effectif par département |
| `leave_days_by_type[]` | LeaveTypeDays | Congés par type |
| `leave_by_status[]` | LeaveStatusCount | Congés par statut |
| `employees_by_job[]` | JobCount | Effectif par chantier |
| `labor_cost_by_job[]` | JobCost | Coût main-d'œuvre par chantier |
| `payroll_by_type[]` | PayrollByType | Paie par type |
| `leave_balances[]` | LeaveBalanceItem | Soldes de congés par employé |

**Items :**

| Item | Champs |
|------|--------|
| `DepartmentCount` | `department`, `count` |
| `LeaveTypeDays` | `leave_type`, `days`, `count` |
| `LeaveStatusCount` | `status`, `count` |
| `JobCount` | `job_id`, `job_description`, `count` |
| `JobCost` | `job_id`, `job_description`, `total_amount` |
| `PayrollByType` | `payment_type`, `total_amount` |
| `LeaveBalanceItem` | `user_id`, `user_name`, `accrued`, `taken`, `remaining` |

---

## 6. Monétaire (`/monetary`)

### `GET /summary` — `MonetarySummaryResponse`

| Champ | Type | Description |
|-------|------|-------------|
| `total_revenue` | number | Revenus totaux |
| `total_expenses` | number | Dépenses totales |
| `gross_margin` | number | Marge brute |
| `expected_revenue` | number | Revenus attendus |
| `receivables` | number | Créances |
| `fixed_costs_total` | number | Coûts fixes totaux |
| `cash_flow` | CashFlowSummary | Résumé flux trésorerie |
| `cash_accounts[]` | CashAccountItem | Comptes bancaires |
| `active_loans_count` | integer | Nombre de prêts actifs |

### `GET /breakdown` — `MonetaryBreakdownResponse`

| Champ | Type | Description |
|-------|------|-------------|
| `expenses_by_type[]` | ExpenseByType | Dépenses par type |
| `budget_vs_actual[]` | BudgetVariance | Budget vs réel par catégorie |
| `expected_vs_actual[]` | ExpectedVsActual | Prévu vs réel par chantier |
| `revenue_by_job[]` | JobRevenue | Revenus par chantier |
| `expense_by_job[]` | JobExpense | Dépenses par chantier (sous-détail par type) |
| `profitability_by_job[]` | JobProfitability | Rentabilité par chantier |
| `active_loans[]` | ActiveLoanItem | Prêts actifs |

**Items :**

| Item | Champs |
|------|--------|
| `CashFlowSummary` | `total_credits`, `total_debits`, `net` |
| `CashAccountItem` | `account_id`, `account_name`, `balance` |
| `ExpenseByType` | `type`, `total` |
| `BudgetVariance` | `category`, `planned`, `actual`, `variance` |
| `ExpectedVsActual` | `job_id`, `job_description`, `expected`, `actual`, `gap` |
| `JobRevenue` | `job_id`, `job_description`, `total` |
| `JobExpense` | `job_id`, `job_description`, `total`, `by_type[]` |
| `JobProfitability` | `job_id`, `job_description`, `revenue`, `expense`, `profit`, `margin` |
| `ActiveLoanItem` | `loan_id`, `lender`, `remaining_amount`, `next_payment_date` |

---

## 7. Time Series (7 endpoints)

Tous retournent `TimeSeriesResponse`.

### `TimeSeriesResponse`

```json
{
  "schema": "revenue",
  "period": { "from": "2024-01-01", "to": "2024-12-31" },
  "granularity": "month",
  "intervals": [
    { "label": "2024-01", "value": 50000 },
    { "label": "2024-02", "value": 45000 }
  ],
  "cumulative": [50000, 95000],
  "total": 600000,
  "filtered_by_job": "job_001"
}
```

### Endpoints

| `GET /dashboard/monetary/...` | Métrique | `job_id` ? | Source de données |
|---|---|---|---|
| `/revenue` | Revenus par période | Oui | `income_money.created_at` |
| `/expenses` | Dépenses par période | Oui | `expense_money.created_at` |
| `/cashflow` | Flux de trésorerie net | **Non** | `cash_transaction.transaction_date` |
| `/profit` | Profit (revenue - expenses) | Oui | Income + Expense combinés |
| `/receivables` | Créances non payées par période | Oui | `income_money.facturation_date` — `income_receipt.amount` |
| `/budget` | Variance budget (planned - actual) | **Non** | `budget_line.period_start` |
| `/expense_breakdown` | Dépenses par type (par période) | Oui | `expense_money.created_at` JOIN 6 sous-tables |

### Granularités supportées

| Valeur | Format SQL |
|--------|-----------|
| `day` / `1day` / `2day` | `YYYY-MM-DD` |
| `week` | `YYYY-IW` |
| `month` (défaut) | `YYYY-MM` |
| `quarter` | `YYYY-Q` |
| `year` | `YYYY` |

### Types de dépenses (expense_breakdown)

| Type | Source |
|------|--------|
| `LABOR` | `employee_payment` |
| `TRANSPORT` | `travel_expense` |
| `PURCHASE` | `purchase` |
| `BANK` | `bank_fee` |
| `OTHER` | `other_expense` |
| `MAINTENANCE` | `maintenance` |

Le label des intervalles utilise le format `{période}-{type}`, ex : `"2024-01-LABOR"`.

---

## 8. Architecture technique

### Controller unique

`DashboardController.java` — 19 méthodes `@GetMapping`

### Services (5 classes)

| Service | Endpoints |
|---------|-----------|
| `DashboardMaterialService` | `/materials`, `/materials/summary`, `/materials/breakdown` |
| `DashboardEquipmentService` | `/equipment`, `/equipment/summary`, `/equipment/breakdown` |
| `DashboardHrService` | `/hr`, `/hr/summary`, `/hr/breakdown` |
| `DashboardMonetaryService` | `/monetary`, `/monetary/summary`, `/monetary/breakdown` |
| `DashboardTimeSeriesService` | `/monetary/revenue`, `/monetary/expenses`, `/monetary/cashflow`, `/monetary/profit`, `/monetary/receivables`, `/monetary/budget`, `/monetary/expense_breakdown` |

### DTOs (13 classes)

`com.example.demo.model.dashboard.*`

### Tests

| Fichier | Type | Lignes |
|---------|------|--------|
| `DashboardIT.java` | Intégration | ~660 |
| `DashboardMaterialServiceTest.java` | Unitaire | 185 |
| `DashboardEquipmentServiceTest.java` | Unitaire | 150 |
| `DashboardHrServiceTest.java` | Unitaire | 140 |
| `DashboardMonetaryServiceTest.java` | Unitaire | 207 |
