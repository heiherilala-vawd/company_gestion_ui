import {
  authResponseMock,
  bankFee1Mock,
  company1Mock,
  companiesMock,
  employeePayment1Mock,
  equipment1Mock,
  maintenanceResponseMock,
  expense1Mock,
  income1Mock,
  job1Mock,
  jobsMock,
  material1Mock,
  otherExpense1Mock,
  purchase1Mock,
  travelExpense1Mock,
  travelMaterials1Mock,
  travelPeople1Mock,
  travelEquipment1Mock,
  user1Mock,
  warehouse1Mock,
  warehousesMock,
  whoamiResponseMock,
  mockSuccessResponse,
  loginRequestMock,
  usersMock,
  materialsMock,
  equipmentsMock,
  expensesMock,
  incomesMock,
  bankFeesMock,
  otherExpensesMock,
  employeePaymentsMock,
  purchasesMock,
  travelExpensesMock,
  travelMaterialsMock,
  travelPeoplesMock,
  travelEquipmentsMock,
  warehouse2Mock,
  loansActiveMock,
  loansDefaultedMock,
  materialWarehousesMock,
  otherExpenseType1Mock,
  otherExpenseTypesMock,
  teamsMock,
  leaveTypesMock,
  leavesMock,
  leave1Mock,
  leave2Mock,
  leaveType1Mock,
  fixedCost1Mock,
  fixedCostsMock,
  task1Mock,
  tasksMock,
  taskSchedule1Mock,
  taskSchedulesMock,
  department1Mock,
  departmentsMock,
  budgetLine1Mock,
  budgetLinesMock,
  cashAccount1Mock,
  cashAccountsMock,
  cashTransaction1Mock,
  cashTransactionsMock,
  equipmentUsage1Mock,
  equipmentUsagesMock,
  materialConsumption1Mock,
  materialConsumptionsMock,
  maintenance1Mock,
  maintenancesMock,
  loanRepayment1Mock,
  loanRepaymentsMock,
  receipt1Mock,
  receiptsMock,
  incomeType1Mock,
  incomeTypesMock,
  leaveConfig1Mock,
  leaveConfigsMock,
  yearlyReportMock,
  leaveBalancesMock,
} from '../mocks/responses'

export function interceptGeneralEndpoint(): void {
  // ---------------------- AUTH ------------------------------------------
  cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
  cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as('whoami')

  // ---------------------- USER ------------------------------------------
  cy.intercept('GET', '**/users*', mockSuccessResponse(usersMock)).as('getUsers')
  cy.intercept('GET', '**/users/user1_id', mockSuccessResponse(user1Mock)).as('getUser')
  cy.intercept('GET', '**/users/user2_id', mockSuccessResponse(user1Mock)).as('getUser2')

  // ---------------------- WAREHOUSE ------------------------------------------
  cy.intercept('GET', '/companies/*/warehouses*', mockSuccessResponse(warehousesMock)).as(
    'getWarehouses',
  )
  cy.intercept('GET', '/companies/*/warehouses/wh1_id', mockSuccessResponse(warehouse1Mock)).as(
    'getWarehouse',
  )
  cy.intercept('GET', '/companies/*/warehouses/wh2_id', mockSuccessResponse(warehouse2Mock)).as(
    'getWarehouse',
  )

  // ---------------------- JOB ------------------------------------------
  cy.intercept('GET', '/companies/*/jobs*', mockSuccessResponse(jobsMock)).as('getJobs')
  cy.intercept('GET', '/companies/*/jobs/job1_id', mockSuccessResponse(job1Mock)).as('getJob')

  // ---------------------- COMPANY ------------------------------------------
  cy.intercept('GET', '/companies*', mockSuccessResponse(companiesMock)).as('getCompanies')
  cy.intercept('GET', '/companies/comp1_id', mockSuccessResponse(company1Mock)).as('getCompany')

  // ---------------------- MATERIAL ------------------------------------------
  cy.intercept('GET', '**/materials*', mockSuccessResponse(materialsMock)).as('getMaterials')
  cy.intercept('GET', '**/materials/mat1_id*', mockSuccessResponse(material1Mock)).as('getMaterial')

  // ---------------------- EQUIPMENT ------------------------------------------
  cy.intercept('GET', '**/equipment*', mockSuccessResponse(equipmentsMock)).as('getEquipments')
  cy.intercept('GET', '**/equipment/eq1_id*', mockSuccessResponse(equipment1Mock)).as(
    'getEquipment',
  )

  cy.intercept(
    'PUT',
    '**/equipment/*/maintenances',
    mockSuccessResponse(maintenanceResponseMock),
  ).as('maintenance')

  // ---------------------- EXPENSE ------------------------------------------
  cy.intercept('GET', '**/expenses*', mockSuccessResponse(expensesMock)).as('getExpenses')
  cy.intercept('GET', '**/expenses/exp1_id*', mockSuccessResponse(expense1Mock)).as('getExpense')

  // ---------------------- INCOMES ------------------------------------------
  cy.intercept('GET', '**/incomes*', mockSuccessResponse(incomesMock)).as('getIncomes')
  cy.intercept('GET', '**/incomes/inc1_id*', mockSuccessResponse(income1Mock)).as('getIncome')

  // ---------------------- INCOME TYPES ------------------------------------------
  cy.intercept('GET', '**/income_types*', mockSuccessResponse(incomeTypesMock)).as('getIncomeTypes')
  cy.intercept(
    'GET',
    '**/income_types/' + incomeType1Mock.id + '*',
    mockSuccessResponse(incomeType1Mock),
  ).as('getIncomeType')

  // ---------------------- BANK FEES ------------------------------------------
  cy.intercept('GET', '**/bank_fees*', mockSuccessResponse(bankFeesMock)).as('getBankFees')
  cy.intercept('GET', '**/bank_fees/bf1_id', mockSuccessResponse(bankFee1Mock)).as('getBankFee')
  cy.intercept('GET', '**/bank_fees/newId', mockSuccessResponse(bankFee1Mock)).as(
    'getBankFeeCreate',
  )

  // ---------------------- OTHER EXPENSES ------------------------------------------
  cy.intercept('GET', '**/other_expenses*', mockSuccessResponse(otherExpensesMock)).as(
    'getOtherExpenses',
  )
  cy.intercept('GET', '**/other_expenses/oe1_id*', mockSuccessResponse(otherExpense1Mock)).as(
    'getOtherExpense',
  )

  // ---------------------- EMPLOYEE PAYMENTS ------------------------------------------
  cy.intercept('GET', '**/employee_payments*', mockSuccessResponse(employeePaymentsMock)).as(
    'getEmployeePayments',
  )
  cy.intercept('GET', '**/employee_payments/ep1_id*', mockSuccessResponse(employeePayment1Mock)).as(
    'getEmployeePayment',
  )

  // ---------------------- PURCHASES ------------------------------------------
  cy.intercept('GET', '**/purchases*', mockSuccessResponse(purchasesMock)).as('getPurchases')
  cy.intercept('GET', '**/purchases/pur1_id*', mockSuccessResponse(purchase1Mock)).as('getPurchase')

  // ---------------------- TRAVEL EXPENSES ------------------------------------------
  cy.intercept('GET', '**/travel_expenses*', mockSuccessResponse(travelExpensesMock)).as(
    'getTravelExpenses',
  )
  cy.intercept('GET', '**/travel_expenses/te1_id*', mockSuccessResponse(travelExpense1Mock)).as(
    'getTravelExpense',
  )

  // ---------------------- TRAVEL MATERIALS ------------------------------------------
  cy.intercept('GET', '**/travel_materials*', mockSuccessResponse(travelMaterialsMock)).as(
    'getTravelMaterials',
  )
  cy.intercept('GET', '**/travel_materials/tm1_id*', mockSuccessResponse(travelMaterials1Mock)).as(
    'getTravelMaterial',
  )

  // ---------------------- TRAVEL PEOPLES ------------------------------------------
  cy.intercept('GET', '**/travel_people*', mockSuccessResponse(travelPeoplesMock)).as(
    'getTravelPeoples',
  )
  cy.intercept('GET', '**/travel_people/tp1_id*', mockSuccessResponse(travelPeople1Mock)).as(
    'getTravelPeople',
  )

  // ---------------------- TRAVEL EQUIPMENTS ------------------------------------------
  cy.intercept('GET', '**/travel_equipment*', mockSuccessResponse(travelEquipmentsMock)).as(
    'getTravelEquipments',
  )
  cy.intercept('GET', '**/travel_equipment/teq1_id*', mockSuccessResponse(travelEquipment1Mock)).as(
    'getTravelEquipment',
  )

  // ---------------------- LOANS ------------------------------------------
  cy.intercept('GET', '**/loans*', mockSuccessResponse(loansActiveMock)).as('getLoansGeneral')
  cy.intercept('GET', '**/loans*status=ACTIVE*', mockSuccessResponse(loansActiveMock)).as(
    'getLoansActive',
  )
  cy.intercept('GET', '**/loans*status=DEFAULTED*', mockSuccessResponse(loansDefaultedMock)).as(
    'getLoansDefaulted',
  )

  // ---------------------- MATERIAL WAREHOUSE ------------------------------------------
  cy.intercept('GET', '**/material_warehouse*', mockSuccessResponse(materialWarehousesMock)).as(
    'getMaterialWarehouses',
  )

  // ---------------------- OTHER EXPENSE TYPES ------------------------------------------
  cy.intercept('GET', '**/other_expense_types*', mockSuccessResponse(otherExpenseTypesMock)).as(
    'getOtherExpenseTypes',
  )

  // ---------------------- TEAMS ------------------------------------------
  cy.intercept('GET', '**/teams*', mockSuccessResponse(teamsMock)).as('getTeams')

  // ---------------------- LEAVE TYPES ------------------------------------------
  cy.intercept('GET', '**/leave_types*', mockSuccessResponse(leaveTypesMock)).as('getLeaveTypes')

  // ---------------------- LEAVE CONFIGS ------------------------------------------
  cy.intercept('GET', '**/leave_configs*', mockSuccessResponse([])).as('getLeaveConfigs')

  // ---------------------- LEAVES ------------------------------------------
  cy.intercept('GET', '**/leaves*', mockSuccessResponse(leavesMock)).as('getLeaves')
  cy.intercept('GET', '**/leaves/leave1_id*', mockSuccessResponse(leave1Mock)).as('getLeave')
  cy.intercept('GET', '**/leaves/leave2_id*', mockSuccessResponse(leave2Mock)).as('getLeave2')

  // ---------------------- FIXED COSTS ------------------------------------------
  cy.intercept('GET', '**/fixed_costs*', mockSuccessResponse(fixedCostsMock)).as('getFixedCosts')
  cy.intercept('GET', '**/fixed_costs/fc1_id*', mockSuccessResponse(fixedCost1Mock)).as(
    'getFixedCost',
  )

  // ---------------------- TASKS ------------------------------------------
  cy.intercept('GET', '**/tasks*', mockSuccessResponse(tasksMock)).as('getTasks')
  cy.intercept('GET', '**/tasks/task1_id*', mockSuccessResponse(task1Mock)).as('getTask')

  // ---------------------- TASK SCHEDULES ------------------------------------------
  cy.intercept('GET', '**/task_schedules*', mockSuccessResponse(taskSchedulesMock)).as(
    'getTaskSchedules',
  )
  cy.intercept('GET', '**/task_schedules/ts1_id*', mockSuccessResponse(taskSchedule1Mock)).as(
    'getTaskSchedule',
  )

  // ---------------------- DEPARTMENTS ------------------------------------------
  cy.intercept('GET', '**/departments*', mockSuccessResponse(departmentsMock)).as('getDepartments')
  cy.intercept('GET', '**/departments/dept1_id*', mockSuccessResponse(department1Mock)).as(
    'getDepartment',
  )

  // ---------------------- BUDGET LINES ------------------------------------------
  cy.intercept('GET', '**/budget_lines*', mockSuccessResponse(budgetLinesMock)).as('getBudgetLines')
  cy.intercept('GET', '**/budget_lines/bl1_id*', mockSuccessResponse(budgetLine1Mock)).as(
    'getBudgetLine',
  )

  // ---------------------- CASH ACCOUNTS ------------------------------------------
  cy.intercept('GET', '**/cash_accounts*', mockSuccessResponse(cashAccountsMock)).as(
    'getCashAccounts',
  )
  cy.intercept('GET', '**/cash_accounts/ca1_id', mockSuccessResponse(cashAccount1Mock)).as(
    'getCashAccount',
  )
  cy.intercept('GET', '**/cash_accounts/ca1_id*', mockSuccessResponse(cashAccount1Mock)).as(
    'getCashAccount',
  )

  // ---------------------- CASH TRANSACTIONS ------------------------------------------
  cy.intercept('GET', '**/cash_transactions*', mockSuccessResponse(cashTransactionsMock)).as(
    'getCashTransactions',
  )
  cy.intercept('GET', '**/cash_transactions/ct1_id*', mockSuccessResponse(cashTransaction1Mock)).as(
    'getCashTransaction',
  )

  // ---------------------- EQUIPMENT USAGE ------------------------------------------
  cy.intercept('GET', '**/equipment_usage*', mockSuccessResponse(equipmentUsagesMock)).as(
    'getEquipmentUsages',
  )
  cy.intercept('GET', '**/equipment_usage/eu1_id*', mockSuccessResponse(equipmentUsage1Mock)).as(
    'getEquipmentUsage',
  )

  // ---------------------- MATERIAL CONSUMPTION ------------------------------------------
  cy.intercept('GET', '**/material_consumption*', mockSuccessResponse(materialConsumptionsMock)).as(
    'getMaterialConsumptions',
  )
  cy.intercept(
    'GET',
    '**/material_consumption/mc1_id*',
    mockSuccessResponse(materialConsumption1Mock),
  ).as('getMaterialConsumption')

  // ---------------------- MAINTENANCES ------------------------------------------
  cy.intercept('GET', '**/maintenances*', mockSuccessResponse(maintenancesMock)).as(
    'getMaintenances',
  )
  cy.intercept('GET', '**/maintenances/maint1_id*', mockSuccessResponse(maintenance1Mock)).as(
    'getMaintenance',
  )

  // ---------------------- LOAN REPAYMENTS ------------------------------------------
  cy.intercept('GET', '**/loan_repayments*', mockSuccessResponse(loanRepaymentsMock)).as(
    'getLoanRepayments',
  )
  cy.intercept('GET', '**/loan_repayments/lr1_id*', mockSuccessResponse(loanRepayment1Mock)).as(
    'getLoanRepayment',
  )

  // ---------------------- RECEIPTS (income receipts) --------------------------------
  cy.intercept('GET', '**/receipts*', mockSuccessResponse(receiptsMock)).as('getReceipts')
  cy.intercept('GET', '**/receipts/rec1_id*', mockSuccessResponse(receipt1Mock)).as('getReceipt')

  // ---------------------- LEAVE CONFIGS ------------------------------------------
  cy.intercept('GET', '**/leave_configs*', mockSuccessResponse(leaveConfigsMock)).as(
    'getLeaveConfigs',
  )
  cy.intercept('GET', '**/leave_configs/lc1_id*', mockSuccessResponse(leaveConfig1Mock)).as(
    'getLeaveConfig',
  )

  // ---------------------- YEARLY REPORT ------------------------------------------
  cy.intercept('GET', '**/yearly_report*', mockSuccessResponse(yearlyReportMock)).as(
    'getYearlyReport',
  )

  // ---------------------- LEAVE BALANCES ------------------------------------------
  cy.intercept('GET', '**/leave_balances*', mockSuccessResponse(leaveBalancesMock)).as(
    'getLeaveBalances',
  )

  // ---------------------- SPA ROUTE PASSTHROUGH (exact pathname matching pour cy.visit) --------
  const spaRoutes = [
    '/bank_fees',
    '/budget_lines',
    '/cash_accounts',
    '/cash_transactions',
    '/expenses',
    '/fixed_costs',
    '/incomes',
    '/loans',
    '/loan_repayments',
    '/other_expenses',
    '/purchases',
    '/receipts',
    '/travel_expenses',
    '/material_warehouse',
    '/material_consumption',
    '/equipment_usage',
    '/maintenances',
    '/history',
    '/yearly-report',
    '/expenses_activity',
    '/incomes_activity',
    '/travel_materials_activity',
    '/travel_equipment_activity',
    '/employer_payments_activity',
    '/purchases_activity',
  ]
  spaRoutes.forEach((route) => {
    cy.intercept('GET', new RegExp(`^${route}$`), (req) => req.continue())
  })
}

/**
 * Expand all monetary sub-sections in the sidebar menu.
 * Safe to call even if sections are already expanded (clicking open section keeps it open).
 */
export function expandMonetarySections(): void {
  cy.get('[data-testid="menu-item-home"]', { timeout: 5000 }).should('exist')
  cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 300 })
  cy.get('[data-testid="menu-item-home"]').within(() => {
    cy.contains('Entrées').click({ force: true })
    cy.contains('Sorties ponctuelles').click({ force: true })
    cy.contains('Sorties continues').click({ force: true })
    cy.contains('Trésorerie').click({ force: true })
  })
  cy.wait(100)
}

export function openMobileSidebar(): void {
  cy.wait(1000)
  cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
  cy.wait(1000)
  cy.get('[data-testid="menu-item-home"]', { timeout: 10000 }).should('exist')
}

export function insertInToLocalStorage(): void {
  cy.window().then((win) => {
    win.localStorage.setItem('currentCompanyId', 'company_localStorage_id')
    win.localStorage.setItem('currentExpenseId', 'expense_localStorage_id')
    win.localStorage.setItem('currentJobId', 'job_localStorage_id')
    win.localStorage.setItem('currentCashAccountId', 'cash_account_localStorage_id')
    win.localStorage.removeItem('sidebar.open')
  })
}

export function loginInPage(): void {
  cy.viewport(1280, 720)
  cy.visit('/', { failOnStatusCode: false })
  cy.document().should('have.property', 'readyState', 'complete')
  cy.get('input', { timeout: 10000 })
    .first()
    .should('be.visible')
    .type(<string>loginRequestMock.email)
  cy.get('input[type="password"]').type(<string>loginRequestMock.password)
  cy.get('button[type="submit"]').click()
  cy.wait(['@login', '@whoami'])
  cy.url().should('not.include', '/login')
}

/**
 * Sélectionne une entité dans un composant ReferenceSelectWithCreate
 * @param testId - L'attribut data-testid du champ
 * @param menuId - L'ID du menu déroulant (sans le préfixe #menu-)
 * @param entitySelection - La description de l'entité à sélectionner
 * @param waitAlias - L'alias de la requête à attendre (ex: '@getJobsSelection')
 */
export function selectReferenceWithCreate(
  testId: string,
  menuId: string,
  entitySelection: string,
  elementIndex: number = 0,
): void {
  cy.get(`[data-testid="${testId}"]`)
    .eq(elementIndex)
    .scrollIntoView()
    .within(() => {
      cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
    })
  cy.get('[role="option"]', { timeout: 15000 }).should('be.visible')
  cy.get('body').then(($body) => {
    const options = $body.find('[role="option"]')
    cy.log(
      `Options found: ${options.length}, text: "${options
        .map((_, el) => Cypress.$(el).text().trim())
        .get()
        .join(' | ')}"`,
    )
  })
  cy.contains('[role="option"]', entitySelection).scrollIntoView().click({ force: true })
  cy.get('[role="option"]').should('not.exist')
  cy.wait(200)
}

export function selectEnumType(testId: string, selection: string): void {
  cy.get(`[data-testid="${testId}"]`).scrollIntoView().click()
  cy.get('li[aria-selected]').contains(selection).scrollIntoView().click({ force: true })
  cy.get('li[aria-selected]').should('not.be.visible')
}

export function selectJob(menuId: string = 'job_id'): void {
  selectReferenceWithCreate('input-jobs-id', menuId, <string>job1Mock.description)
}

export function selectCompany(): void {
  selectReferenceWithCreate('input-companies-id', 'company_id', <string>company1Mock.name)
}

export function selectExpense(): void {
  selectReferenceWithCreate('input-expenses-id', 'expense_id', <string>expense1Mock.description)
}

export function selectUser(): void {
  selectReferenceWithCreate(
    'input-users-id',
    'user_id',
    travelPeople1Mock.user?.first_name + ' ' + travelPeople1Mock.user?.last_name,
  )
}

export function selectEmployee(): void {
  selectReferenceWithCreate(
    'input-users-id',
    'employee_id',
    user1Mock.first_name + ' ' + user1Mock.last_name,
  )
}

export function selectWarehouse(menuId: string | null, elementIndex: number = 0): void {
  selectReferenceWithCreate(
    'input-warehouses-id',
    menuId ? menuId : 'warehouse_id',
    <string>warehouse1Mock.name,
    elementIndex,
  )
}

export function selectMaterial(menuId: string | null): void {
  selectReferenceWithCreate(
    'input-materials-id',
    menuId ? menuId : 'material',
    <string>material1Mock.name,
  )
}

export function selectEquipment(menuId: string | null): void {
  selectReferenceWithCreate(
    'input-equipment-id',
    menuId ? menuId : 'equipment',
    <string>equipment1Mock.name,
  )
}

export function selectTravelExpense(
  selection: string = <string>travelExpense1Mock.departure_location,
): void {
  selectReferenceWithCreate('input-travel_expenses-id', 'travel_id', selection)
}

export function selectIncomeType(menuId: string | null): void {
  selectReferenceWithCreate(
    'input-income_types-id',
    menuId ? menuId : 'income_type',
    <string>incomeType1Mock.name,
  )
}

export function selectOtherExpenseType(menuId: string | null): void {
  selectReferenceWithCreate(
    'input-other_expense_types-id',
    menuId ? menuId : 'other_expense_type_id',
    <string>otherExpenseType1Mock.name,
  )
}

export function selectLeaveType(): void {
  selectReferenceWithCreate('input-leave_types-id', 'leave_type_id', <string>leaveType1Mock.name)
}
