# api-client@1.0

A TypeScript SDK client for the api-dev.company.com API.

## Usage

First, install the SDK from npm.

```bash
npm install api-client --save
```

Next, try it out.


```ts
import {
  Configuration,
  AuthApi,
} from 'api-client';
import type { AuthLoginPostRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthApi(config);

  const body = {
    // LoginRequest
    loginRequest: {"email":"jean.dupont@example.com","password":"securePassword123"},
  } satisfies AuthLoginPostRequest;

  try {
    const data = await api.authLoginPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```


## Documentation

### API Endpoints

All URIs are relative to *https://api-dev.company.com*

| Class | Method | HTTP request | Description
| ----- | ------ | ------------ | -------------
*AuthApi* | [**authLoginPost**](docs/AuthApi.md#authloginpost) | **POST** /auth/login | Login user
*AuthApi* | [**authPasswordPut**](docs/AuthApi.md#authpasswordput) | **PUT** /auth/password | Change the authenticated user\&#39;s password
*AuthApi* | [**authRegisterPost**](docs/AuthApi.md#authregisterpost) | **POST** /auth/register | Register a new user
*AuthApi* | [**authWhoamiGet**](docs/AuthApi.md#authwhoamiget) | **GET** /auth/whoami | Get current user
*BankFeeApi* | [**crupdateBankFees**](docs/BankFeeApi.md#crupdatebankfees) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/bank_fees | Create new bank fees or update existing ones
*BankFeeApi* | [**deleteBankFeeById**](docs/BankFeeApi.md#deletebankfeebyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/bank_fees/{id} | Delete bank fee by identifier
*BankFeeApi* | [**getBankFeeById**](docs/BankFeeApi.md#getbankfeebyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/bank_fees/{id} | Get bank fee by identifier
*BankFeeApi* | [**getBankFees**](docs/BankFeeApi.md#getbankfees) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/bank_fees | Get all bank fees
*BudgetLineApi* | [**crupdateBudgetLines**](docs/BudgetLineApi.md#crupdatebudgetlines) | **PUT** /users/{userId}/companies/{companyId}/budget_lines | Create new budget lines or update existing ones
*BudgetLineApi* | [**deleteBudgetLineById**](docs/BudgetLineApi.md#deletebudgetlinebyid) | **DELETE** /users/{userId}/companies/{companyId}/budget_lines/{id} | Delete a budget line by identifier
*BudgetLineApi* | [**getBudgetLineById**](docs/BudgetLineApi.md#getbudgetlinebyid) | **GET** /users/{userId}/companies/{companyId}/budget_lines/{id} | Get a budget line by identifier
*BudgetLineApi* | [**getBudgetLines**](docs/BudgetLineApi.md#getbudgetlines) | **GET** /users/{userId}/companies/{companyId}/budget_lines | Get all budget lines
*CashAccountApi* | [**crupdateCashAccounts**](docs/CashAccountApi.md#crupdatecashaccounts) | **PUT** /users/{userId}/companies/{companyId}/cash_accounts | Create new cash accounts or update existing ones
*CashAccountApi* | [**deleteCashAccountById**](docs/CashAccountApi.md#deletecashaccountbyid) | **DELETE** /users/{userId}/companies/{companyId}/cash_accounts/{id} | Delete a cash account by identifier
*CashAccountApi* | [**getCashAccountById**](docs/CashAccountApi.md#getcashaccountbyid) | **GET** /users/{userId}/companies/{companyId}/cash_accounts/{id} | Get a cash account by identifier
*CashAccountApi* | [**getCashAccounts**](docs/CashAccountApi.md#getcashaccounts) | **GET** /users/{userId}/companies/{companyId}/cash_accounts | Get all cash accounts
*CashTransactionApi* | [**crupdateCashTransactions**](docs/CashTransactionApi.md#crupdatecashtransactions) | **PUT** /users/{userId}/companies/{companyId}/cash_accounts/{cashAccountId}/transactions | Create new cash transactions or update existing ones
*CashTransactionApi* | [**deleteCashTransactionById**](docs/CashTransactionApi.md#deletecashtransactionbyid) | **DELETE** /users/{userId}/companies/{companyId}/cash_accounts/{cashAccountId}/transactions/{id} | Delete a cash transaction by identifier
*CashTransactionApi* | [**getCashTransactionById**](docs/CashTransactionApi.md#getcashtransactionbyid) | **GET** /users/{userId}/companies/{companyId}/cash_accounts/{cashAccountId}/transactions/{id} | Get a cash transaction by identifier
*CashTransactionApi* | [**getCashTransactions**](docs/CashTransactionApi.md#getcashtransactions) | **GET** /users/{userId}/companies/{companyId}/cash_accounts/{cashAccountId}/transactions | Get all cash transactions for an account
*CompanyApi* | [**crupdateCompanies**](docs/CompanyApi.md#crupdatecompanies) | **PUT** /users/{userId}/companies | Create new companies or update existing companies
*CompanyApi* | [**deleteCompanyById**](docs/CompanyApi.md#deletecompanybyid) | **DELETE** /users/{userId}/companies/{companyId} | Delete a company by identifier
*CompanyApi* | [**getCompanies**](docs/CompanyApi.md#getcompanies) | **GET** /users/{userId}/companies | Get all companies for a user
*CompanyApi* | [**getCompanyById**](docs/CompanyApi.md#getcompanybyid) | **GET** /users/{userId}/companies/{companyId} | Get company by identifier
*CompanyFixedCostApi* | [**crupdateCompanyFixedCosts**](docs/CompanyFixedCostApi.md#crupdatecompanyfixedcosts) | **PUT** /users/{userId}/companies/{companyId}/fixed_costs | Create new fixed costs or update existing ones
*CompanyFixedCostApi* | [**deleteCompanyFixedCostById**](docs/CompanyFixedCostApi.md#deletecompanyfixedcostbyid) | **DELETE** /users/{userId}/companies/{companyId}/fixed_costs/{id} | Delete a fixed cost by identifier
*CompanyFixedCostApi* | [**getCompanyFixedCostById**](docs/CompanyFixedCostApi.md#getcompanyfixedcostbyid) | **GET** /users/{userId}/companies/{companyId}/fixed_costs/{id} | Get a fixed cost by identifier
*CompanyFixedCostApi* | [**getCompanyFixedCosts**](docs/CompanyFixedCostApi.md#getcompanyfixedcosts) | **GET** /users/{userId}/companies/{companyId}/fixed_costs | Get all fixed costs for a company
*DepartmentApi* | [**crupdateDepartments**](docs/DepartmentApi.md#crupdatedepartments) | **PUT** /users/{userId}/companies/{companyId}/departments | Create new departments or update existing ones
*DepartmentApi* | [**deleteDepartmentById**](docs/DepartmentApi.md#deletedepartmentbyid) | **DELETE** /users/{userId}/companies/{companyId}/departments/{id} | Delete a department by identifier
*DepartmentApi* | [**getDepartmentById**](docs/DepartmentApi.md#getdepartmentbyid) | **GET** /users/{userId}/companies/{companyId}/departments/{id} | Get a department by identifier
*DepartmentApi* | [**getDepartments**](docs/DepartmentApi.md#getdepartments) | **GET** /users/{userId}/companies/{companyId}/departments | Get all departments
*EmployeePaymentApi* | [**crupdateEmployeePayments**](docs/EmployeePaymentApi.md#crupdateemployeepayments) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/employee_payments | Create new employee payments or update existing ones
*EmployeePaymentApi* | [**deleteEmployeePaymentById**](docs/EmployeePaymentApi.md#deleteemployeepaymentbyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/employee_payments/{id} | Delete employee payment by identifier
*EmployeePaymentApi* | [**getEmployeePaymentById**](docs/EmployeePaymentApi.md#getemployeepaymentbyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/employee_payments/{id} | Get employee payment by identifier
*EmployeePaymentApi* | [**getEmployeePayments**](docs/EmployeePaymentApi.md#getemployeepayments) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/employee_payments | Get all employee payments
*EquipmentApi* | [**crupdateEquipment**](docs/EquipmentApi.md#crupdateequipment) | **PUT** /users/{userId}/companies/{companyId}/equipments | Create new equipment or update existing equipment
*EquipmentApi* | [**deleteEquipmentById**](docs/EquipmentApi.md#deleteequipmentbyid) | **DELETE** /users/{userId}/companies/{companyId}/equipments/{id} | Delete equipment by identifier
*EquipmentApi* | [**getEquipment**](docs/EquipmentApi.md#getequipment) | **GET** /users/{userId}/companies/{companyId}/equipments | Get all equipment
*EquipmentApi* | [**getEquipmentById**](docs/EquipmentApi.md#getequipmentbyid) | **GET** /users/{userId}/companies/{companyId}/equipments/{id} | Get equipment by identifier
*EquipmentUsageApi* | [**crupdateEquipmentUsages**](docs/EquipmentUsageApi.md#crupdateequipmentusages) | **PUT** /users/{userId}/companies/{companyId}/equipment_usages | Create new equipment usage records or update existing ones
*EquipmentUsageApi* | [**deleteEquipmentUsageById**](docs/EquipmentUsageApi.md#deleteequipmentusagebyid) | **DELETE** /users/{userId}/companies/{companyId}/equipment_usages/{id} | Delete an equipment usage record by identifier
*EquipmentUsageApi* | [**getEquipmentUsageById**](docs/EquipmentUsageApi.md#getequipmentusagebyid) | **GET** /users/{userId}/companies/{companyId}/equipment_usages/{id} | Get an equipment usage record by identifier
*EquipmentUsageApi* | [**getEquipmentUsages**](docs/EquipmentUsageApi.md#getequipmentusages) | **GET** /users/{userId}/companies/{companyId}/equipment_usages | Get all equipment usage records
*EquipmentUsageApi* | [**returnEquipment**](docs/EquipmentUsageApi.md#returnequipment) | **PUT** /users/{userId}/companies/{companyId}/equipment_usages/{id}/return | Return equipment from usage
*ExpenseApi* | [**crupdateExpenses**](docs/ExpenseApi.md#crupdateexpenses) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/expenses | Create new expenses or update existing ones
*ExpenseApi* | [**deleteExpenseById**](docs/ExpenseApi.md#deleteexpensebyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/expenses/{id} | Delete expense by identifier
*ExpenseApi* | [**getExpenseById**](docs/ExpenseApi.md#getexpensebyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/expenses/{id} | Get expense by identifier
*ExpenseApi* | [**getExpenses**](docs/ExpenseApi.md#getexpenses) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/expenses | Get all expenses
*HRApi* | [**crupdateEmployeeLeaveConfigs**](docs/HRApi.md#crupdateemployeeleaveconfigs) | **PUT** /users/{userId}/companies/{companyId}/leave_configs | Create or update employee leave configs
*HRApi* | [**crupdateLeaveTypes**](docs/HRApi.md#crupdateleavetypes) | **PUT** /users/{userId}/companies/{companyId}/leave_types | Create or update leave types
*HRApi* | [**crupdateLeaves**](docs/HRApi.md#crupdateleaves) | **PUT** /users/{userId}/companies/{companyId}/leaves | Create or update leaves
*HRApi* | [**deleteLeaveById**](docs/HRApi.md#deleteleavebyid) | **DELETE** /users/{userId}/companies/{companyId}/leaves/{id} | Delete leave by identifier
*HRApi* | [**getEmployeeLeaveConfigById**](docs/HRApi.md#getemployeeleaveconfigbyid) | **GET** /users/{userId}/companies/{companyId}/leave_configs/{id} | Get a leave config by id
*HRApi* | [**getEmployeeLeaveConfigs**](docs/HRApi.md#getemployeeleaveconfigs) | **GET** /users/{userId}/companies/{companyId}/leave_configs | Get all employee leave configs
*HRApi* | [**getEmployeesWithoutLeave**](docs/HRApi.md#getemployeeswithoutleave) | **GET** /users/{userId}/companies/{companyId}/leave_balances/employees_without_leave | Get employees who haven\&#39;t taken any leave
*HRApi* | [**getLeaveBalances**](docs/HRApi.md#getleavebalances) | **GET** /users/{userId}/companies/{companyId}/leave_balances | Get leave balances for all employees in a company
*HRApi* | [**getLeaveById**](docs/HRApi.md#getleavebyid) | **GET** /users/{userId}/companies/{companyId}/leaves/{id} | Get leave by identifier
*HRApi* | [**getLeaveTypeById**](docs/HRApi.md#getleavetypebyid) | **GET** /users/{userId}/companies/{companyId}/leave_types/{id} | Get a leave type by id
*HRApi* | [**getLeaveTypes**](docs/HRApi.md#getleavetypes) | **GET** /users/{userId}/companies/{companyId}/leave_types | Get all leave types
*HRApi* | [**getLeaves**](docs/HRApi.md#getleaves) | **GET** /users/{userId}/companies/{companyId}/leaves | Get all leaves
*HealthApi* | [**ping**](docs/HealthApi.md#ping) | **GET** /ping | Health check endpoint
*HistoryApi* | [**getHistories**](docs/HistoryApi.md#gethistories) | **GET** /histories | Get modification history with filters
*IncomeApi* | [**crupdateIncomes**](docs/IncomeApi.md#crupdateincomes) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes | Create new incomes or update existing ones
*IncomeApi* | [**deleteIncomeById**](docs/IncomeApi.md#deleteincomebyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes/{id} | Delete income by identifier
*IncomeApi* | [**getIncomeById**](docs/IncomeApi.md#getincomebyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes/{id} | Get income by identifier
*IncomeApi* | [**getIncomes**](docs/IncomeApi.md#getincomes) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes | Get all incomes
*IncomeApi* | [**getIncomesExcel**](docs/IncomeApi.md#getincomesexcel) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes/excel | Export incomes to Excel
*IncomeReceiptApi* | [**crupdateIncomeReceipts**](docs/IncomeReceiptApi.md#crupdateincomereceipts) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes_receipts | Create new income receipts or update existing ones
*IncomeReceiptApi* | [**deleteIncomeReceiptById**](docs/IncomeReceiptApi.md#deleteincomereceiptbyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes_receipts/{id} | Delete income receipt by identifier
*IncomeReceiptApi* | [**getIncomeReceiptById**](docs/IncomeReceiptApi.md#getincomereceiptbyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes_receipts/{id} | Get income receipt by identifier
*IncomeReceiptApi* | [**getIncomeReceipts**](docs/IncomeReceiptApi.md#getincomereceipts) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes_receipts | Get all income receipts
*IncomeTypeApi* | [**crupdateIncomeTypes**](docs/IncomeTypeApi.md#crupdateincometypes) | **PUT** /users/{userId}/companies/{companyId}/income_types | Create new income types or update existing ones
*IncomeTypeApi* | [**deleteIncomeTypeById**](docs/IncomeTypeApi.md#deleteincometypebyid) | **DELETE** /users/{userId}/companies/{companyId}/income_types/{id} | Delete an income type by identifier
*IncomeTypeApi* | [**getIncomeTypeById**](docs/IncomeTypeApi.md#getincometypebyid) | **GET** /users/{userId}/companies/{companyId}/income_types/{id} | Get an income type by identifier
*IncomeTypeApi* | [**getIncomeTypes**](docs/IncomeTypeApi.md#getincometypes) | **GET** /users/{userId}/companies/{companyId}/income_types | Get all income types for a company
*JobApi* | [**assignUserToJob**](docs/JobApi.md#assignusertojob) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/assigned_users | Assign a user to a job
*JobApi* | [**crupdateJobs**](docs/JobApi.md#crupdatejobs) | **PUT** /users/{userId}/companies/{companyId}/jobs | Create new jobs or update existing jobs
*JobApi* | [**deleteJobById**](docs/JobApi.md#deletejobbyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{id} | Delete a job by identifier
*JobApi* | [**getJobById**](docs/JobApi.md#getjobbyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{id} | Get job by identifier
*JobApi* | [**getJobResponsibleUsers**](docs/JobApi.md#getjobresponsibleusers) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/assigned_users | Get responsible users for a job
*JobApi* | [**getJobs**](docs/JobApi.md#getjobs) | **GET** /users/{userId}/companies/{companyId}/jobs | Get all jobs
*JobApi* | [**unassignUserFromJob**](docs/JobApi.md#unassignuserfromjob) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/assigned_users | Unassign a user from a job
*LoanApi* | [**crupdateLoans**](docs/LoanApi.md#crupdateloans) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/loans | Create new loans or update existing ones
*LoanApi* | [**deleteLoanById**](docs/LoanApi.md#deleteloanbyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/loans/{id} | Delete loan by identifier
*LoanApi* | [**getLoanById**](docs/LoanApi.md#getloanbyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/loans/{id} | Get loan by identifier
*LoanApi* | [**getLoans**](docs/LoanApi.md#getloans) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/loans | Get all loans
*LoanRepaymentApi* | [**crupdateLoanRepayments**](docs/LoanRepaymentApi.md#crupdateloanrepayments) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/loan_repayments | Create new loan repayments or update existing ones
*LoanRepaymentApi* | [**deleteLoanRepaymentById**](docs/LoanRepaymentApi.md#deleteloanrepaymentbyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/loan_repayments/{id} | Delete loan repayment by identifier
*LoanRepaymentApi* | [**getLoanRepaymentById**](docs/LoanRepaymentApi.md#getloanrepaymentbyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/loan_repayments/{id} | Get loan repayment by identifier
*LoanRepaymentApi* | [**getLoanRepayments**](docs/LoanRepaymentApi.md#getloanrepayments) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/loan_repayments | Get all loan repayments
*MaintenanceApi* | [**crupdateMaintenances**](docs/MaintenanceApi.md#crupdatemaintenances) | **PUT** /users/{userId}/companies/{companyId}/maintenances | Create new maintenances or update existing ones
*MaintenanceApi* | [**deleteMaintenanceById**](docs/MaintenanceApi.md#deletemaintenancebyid) | **DELETE** /users/{userId}/companies/{companyId}/maintenances/{id} | Delete maintenance by identifier
*MaintenanceApi* | [**getMaintenanceById**](docs/MaintenanceApi.md#getmaintenancebyid) | **GET** /users/{userId}/companies/{companyId}/maintenances/{id} | Get maintenance by identifier
*MaintenanceApi* | [**getMaintenances**](docs/MaintenanceApi.md#getmaintenances) | **GET** /users/{userId}/companies/{companyId}/maintenances | Get all maintenances
*MaterialApi* | [**crupdateMaterials**](docs/MaterialApi.md#crupdatematerials) | **PUT** /users/{userId}/companies/{companyId}/materials | Create new materials or update existing materials
*MaterialApi* | [**deleteMaterialById**](docs/MaterialApi.md#deletematerialbyid) | **DELETE** /users/{userId}/companies/{companyId}/materials/{id} | Delete material by identifier
*MaterialApi* | [**getMaterialById**](docs/MaterialApi.md#getmaterialbyid) | **GET** /users/{userId}/companies/{companyId}/materials/{id} | Get material by identifier
*MaterialApi* | [**getMaterials**](docs/MaterialApi.md#getmaterials) | **GET** /users/{userId}/companies/{companyId}/materials | Get all materials
*MaterialConsumptionApi* | [**completeMaterialConsumption**](docs/MaterialConsumptionApi.md#completematerialconsumption) | **PUT** /users/{userId}/companies/{companyId}/material_consumptions/{id}/complete | Complete a material consumption
*MaterialConsumptionApi* | [**crupdateMaterialConsumptions**](docs/MaterialConsumptionApi.md#crupdatematerialconsumptions) | **PUT** /users/{userId}/companies/{companyId}/material_consumptions | Create new material consumption records or update existing ones
*MaterialConsumptionApi* | [**deleteMaterialConsumptionById**](docs/MaterialConsumptionApi.md#deletematerialconsumptionbyid) | **DELETE** /users/{userId}/companies/{companyId}/material_consumptions/{id} | Delete a material consumption record by identifier
*MaterialConsumptionApi* | [**getMaterialConsumptionById**](docs/MaterialConsumptionApi.md#getmaterialconsumptionbyid) | **GET** /users/{userId}/companies/{companyId}/material_consumptions/{id} | Get a material consumption record by identifier
*MaterialConsumptionApi* | [**getMaterialConsumptions**](docs/MaterialConsumptionApi.md#getmaterialconsumptions) | **GET** /users/{userId}/companies/{companyId}/material_consumptions | Get all material consumption records
*MaterialConsumptionApi* | [**returnMaterialsFromConsumption**](docs/MaterialConsumptionApi.md#returnmaterialsfromconsumption) | **PUT** /users/{userId}/companies/{companyId}/material_consumptions/{id}/return | Return materials from a consumption
*MaterialWarehouseApi* | [**crupdateMaterialWarehouses**](docs/MaterialWarehouseApi.md#crupdatematerialwarehouses) | **PUT** /users/{userId}/companies/{companyId}/material_warehouses | Create or update material warehouse stock
*MaterialWarehouseApi* | [**getMaterialWarehouses**](docs/MaterialWarehouseApi.md#getmaterialwarehouses) | **GET** /users/{userId}/companies/{companyId}/material_warehouses | Get all material warehouse stock records
*NotificationApi* | [**crupdateNotifications**](docs/NotificationApi.md#crupdatenotifications) | **PUT** /users/{userId}/companies/{companyId}/notifications | Create or update notifications
*NotificationApi* | [**deleteNotificationById**](docs/NotificationApi.md#deletenotificationbyid) | **DELETE** /users/{userId}/companies/{companyId}/notifications/{id} | Delete notification by identifier
*NotificationApi* | [**getNotificationById**](docs/NotificationApi.md#getnotificationbyid) | **GET** /users/{userId}/companies/{companyId}/notifications/{id} | Get notification by identifier
*NotificationApi* | [**getNotifications**](docs/NotificationApi.md#getnotifications) | **GET** /users/{userId}/companies/{companyId}/notifications | Get all notifications for the current user
*NotificationApi* | [**getUnreadNotificationCount**](docs/NotificationApi.md#getunreadnotificationcount) | **GET** /users/{userId}/companies/{companyId}/notifications/unread_count | Get unread notification count for the current user
*NotificationApi* | [**markNotificationAsCompleted**](docs/NotificationApi.md#marknotificationascompleted) | **PUT** /users/{userId}/companies/{companyId}/notifications/{id}/complete | Mark notification as completed
*NotificationApi* | [**markNotificationAsRead**](docs/NotificationApi.md#marknotificationasread) | **PUT** /users/{userId}/companies/{companyId}/notifications/{id}/read | Mark notification as read
*OrganizationApi* | [**crupdateOrganizations**](docs/OrganizationApi.md#crupdateorganizations) | **PUT** /users/{userId}/companies/{companyId}/organizations | Create or update organizations (crupdate)
*OrganizationApi* | [**deleteOrganizationById**](docs/OrganizationApi.md#deleteorganizationbyid) | **DELETE** /users/{userId}/companies/{companyId}/organizations/{id} | Delete an organization
*OrganizationApi* | [**getOrganizationById**](docs/OrganizationApi.md#getorganizationbyid) | **GET** /users/{userId}/companies/{companyId}/organizations/{id} | Get organization by ID
*OrganizationApi* | [**getOrganizations**](docs/OrganizationApi.md#getorganizations) | **GET** /users/{userId}/companies/{companyId}/organizations | Get all organizations for a company
*OtherExpenseApi* | [**crupdateOtherExpenses**](docs/OtherExpenseApi.md#crupdateotherexpenses) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/other_expenses | Create new other expenses or update existing ones
*OtherExpenseApi* | [**deleteOtherExpenseById**](docs/OtherExpenseApi.md#deleteotherexpensebyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/other_expenses/{id} | Delete other expense by identifier
*OtherExpenseApi* | [**getOtherExpenseById**](docs/OtherExpenseApi.md#getotherexpensebyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/other_expenses/{id} | Get other expense by identifier
*OtherExpenseApi* | [**getOtherExpenses**](docs/OtherExpenseApi.md#getotherexpenses) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/other_expenses | Get all other expenses
*OtherExpenseTypeApi* | [**crupdateOtherExpenseTypes**](docs/OtherExpenseTypeApi.md#crupdateotherexpensetypes) | **PUT** /users/{userId}/companies/{companyId}/other_expense_types | Create new other expense types or update existing ones
*OtherExpenseTypeApi* | [**deleteOtherExpenseTypeById**](docs/OtherExpenseTypeApi.md#deleteotherexpensetypebyid) | **DELETE** /users/{userId}/companies/{companyId}/other_expense_types/{id} | Delete an other expense type by identifier
*OtherExpenseTypeApi* | [**getOtherExpenseTypeById**](docs/OtherExpenseTypeApi.md#getotherexpensetypebyid) | **GET** /users/{userId}/companies/{companyId}/other_expense_types/{id} | Get an other expense type by identifier
*OtherExpenseTypeApi* | [**getOtherExpenseTypes**](docs/OtherExpenseTypeApi.md#getotherexpensetypes) | **GET** /users/{userId}/companies/{companyId}/other_expense_types | Get all other expense types for a company
*PurchaseApi* | [**crupdatePurchases**](docs/PurchaseApi.md#crupdatepurchases) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/purchases | Create new purchases or update existing ones
*PurchaseApi* | [**deletePurchaseById**](docs/PurchaseApi.md#deletepurchasebyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/purchases/{id} | Delete purchase by identifier
*PurchaseApi* | [**getPurchaseById**](docs/PurchaseApi.md#getpurchasebyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/purchases/{id} | Get purchase by identifier
*PurchaseApi* | [**getPurchases**](docs/PurchaseApi.md#getpurchases) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/purchases | Get all purchases
*PurchaseOperationApi* | [**createPurchaseOperation**](docs/PurchaseOperationApi.md#createpurchaseoperation) | **POST** /users/{userId}/companies/{companyId}/jobs/{jobId}/purchase_operations | Register a purchase operation with optional travel
*PurchaseOrderApi* | [**crupdatePurchaseOrders**](docs/PurchaseOrderApi.md#crupdatepurchaseorders) | **PUT** /users/{userId}/companies/{companyId}/purchase_orders | Create or update purchase orders (crupdate)
*PurchaseOrderApi* | [**deletePurchaseOrderById**](docs/PurchaseOrderApi.md#deletepurchaseorderbyid) | **DELETE** /users/{userId}/companies/{companyId}/purchase_orders/{id} | Delete a purchase order
*PurchaseOrderApi* | [**getPurchaseOrderById**](docs/PurchaseOrderApi.md#getpurchaseorderbyid) | **GET** /users/{userId}/companies/{companyId}/purchase_orders/{id} | Get purchase order by ID
*PurchaseOrderApi* | [**getPurchaseOrders**](docs/PurchaseOrderApi.md#getpurchaseorders) | **GET** /users/{userId}/companies/{companyId}/purchase_orders | Get all purchase orders for a company
*ReportApi* | [**getBudgetTimeSeries**](docs/ReportApi.md#getbudgettimeseries) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/budget | Get budget time series
*ReportApi* | [**getCashFlowTimeSeries**](docs/ReportApi.md#getcashflowtimeseries) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/cashflow | Get cash flow time series
*ReportApi* | [**getEquipmentDashboard**](docs/ReportApi.md#getequipmentdashboard) | **GET** /users/{userId}/companies/{companyId}/dashboard/equipment | Get equipment dashboard
*ReportApi* | [**getEquipmentDashboardBreakdown**](docs/ReportApi.md#getequipmentdashboardbreakdown) | **GET** /users/{userId}/companies/{companyId}/dashboard/equipment/breakdown | Get equipment dashboard breakdown
*ReportApi* | [**getEquipmentDashboardSummary**](docs/ReportApi.md#getequipmentdashboardsummary) | **GET** /users/{userId}/companies/{companyId}/dashboard/equipment/summary | Get equipment dashboard summary
*ReportApi* | [**getExpenseBreakdownTimeSeries**](docs/ReportApi.md#getexpensebreakdowntimeseries) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/expense_breakdown | Get expense breakdown time series
*ReportApi* | [**getExpensesTimeSeries**](docs/ReportApi.md#getexpensestimeseries) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/expenses | Get expenses time series
*ReportApi* | [**getHrDashboard**](docs/ReportApi.md#gethrdashboard) | **GET** /users/{userId}/companies/{companyId}/dashboard/hr | Get HR dashboard
*ReportApi* | [**getHrDashboardBreakdown**](docs/ReportApi.md#gethrdashboardbreakdown) | **GET** /users/{userId}/companies/{companyId}/dashboard/hr/breakdown | Get HR dashboard breakdown
*ReportApi* | [**getHrDashboardSummary**](docs/ReportApi.md#gethrdashboardsummary) | **GET** /users/{userId}/companies/{companyId}/dashboard/hr/summary | Get HR dashboard summary
*ReportApi* | [**getMaterialDashboard**](docs/ReportApi.md#getmaterialdashboard) | **GET** /users/{userId}/companies/{companyId}/dashboard/materials | Get material dashboard
*ReportApi* | [**getMaterialDashboardBreakdown**](docs/ReportApi.md#getmaterialdashboardbreakdown) | **GET** /users/{userId}/companies/{companyId}/dashboard/materials/breakdown | Get material dashboard breakdown
*ReportApi* | [**getMaterialDashboardSummary**](docs/ReportApi.md#getmaterialdashboardsummary) | **GET** /users/{userId}/companies/{companyId}/dashboard/materials/summary | Get material dashboard summary
*ReportApi* | [**getMonetaryDashboard**](docs/ReportApi.md#getmonetarydashboard) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary | Get monetary dashboard
*ReportApi* | [**getMonetaryDashboardBreakdown**](docs/ReportApi.md#getmonetarydashboardbreakdown) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/breakdown | Get monetary dashboard breakdown
*ReportApi* | [**getMonetaryDashboardSummary**](docs/ReportApi.md#getmonetarydashboardsummary) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/summary | Get monetary dashboard summary
*ReportApi* | [**getProfitTimeSeries**](docs/ReportApi.md#getprofittimeseries) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/profit | Get profit time series
*ReportApi* | [**getReceivablesTimeSeries**](docs/ReportApi.md#getreceivablestimeseries) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/receivables | Get receivables time series
*ReportApi* | [**getRevenueTimeSeries**](docs/ReportApi.md#getrevenuetimeseries) | **GET** /users/{userId}/companies/{companyId}/dashboard/monetary/revenue | Get revenue time series
*ReportApi* | [**usersUserIdCompaniesCompanyIdYearlyReportGet**](docs/ReportApi.md#usersuseridcompaniescompanyidyearlyreportget) | **GET** /users/{userId}/companies/{companyId}/yearly_report | Get yearly report with job financials
*SupplierApi* | [**crupdateSuppliers**](docs/SupplierApi.md#crupdatesuppliers) | **PUT** /users/{userId}/companies/{companyId}/suppliers | Create or update suppliers (crupdate)
*SupplierApi* | [**deleteSupplierById**](docs/SupplierApi.md#deletesupplierbyid) | **DELETE** /users/{userId}/companies/{companyId}/suppliers/{id} | Delete a supplier
*SupplierApi* | [**getSupplierById**](docs/SupplierApi.md#getsupplierbyid) | **GET** /users/{userId}/companies/{companyId}/suppliers/{id} | Get supplier by ID
*SupplierApi* | [**getSuppliers**](docs/SupplierApi.md#getsuppliers) | **GET** /users/{userId}/companies/{companyId}/suppliers | Get all suppliers for a company
*TaskApi* | [**crupdateTasks**](docs/TaskApi.md#crupdatetasks) | **PUT** /users/{userId}/companies/{companyId}/tasks | Create or update tasks
*TaskApi* | [**deleteTaskById**](docs/TaskApi.md#deletetaskbyid) | **DELETE** /users/{userId}/companies/{companyId}/tasks/{id} | Delete a task by id
*TaskApi* | [**getTaskById**](docs/TaskApi.md#gettaskbyid) | **GET** /users/{userId}/companies/{companyId}/tasks/{id} | Get a task by id
*TaskApi* | [**getTasks**](docs/TaskApi.md#gettasks) | **GET** /users/{userId}/companies/{companyId}/tasks | Get all tasks for a company
*TaskScheduleApi* | [**crupdateTaskSchedules**](docs/TaskScheduleApi.md#crupdatetaskschedules) | **PUT** /users/{userId}/companies/{companyId}/task_schedules | Create or update task schedules
*TaskScheduleApi* | [**deleteTaskScheduleById**](docs/TaskScheduleApi.md#deletetaskschedulebyid) | **DELETE** /users/{userId}/companies/{companyId}/task_schedules/{id} | Delete a task schedule by id
*TaskScheduleApi* | [**getTaskScheduleById**](docs/TaskScheduleApi.md#gettaskschedulebyid) | **GET** /users/{userId}/companies/{companyId}/task_schedules/{id} | Get a task schedule by id
*TaskScheduleApi* | [**getTaskSchedules**](docs/TaskScheduleApi.md#gettaskschedules) | **GET** /users/{userId}/companies/{companyId}/task_schedules | Get all task schedules
*TeamApi* | [**crupdateTeams**](docs/TeamApi.md#crupdateteams) | **PUT** /users/{userId}/companies/{companyId}/teams | Create new teams or update existing teams
*TeamApi* | [**deleteTeamById**](docs/TeamApi.md#deleteteambyid) | **DELETE** /users/{userId}/companies/{companyId}/teams/{id} | Delete team by identifier
*TeamApi* | [**getTeamById**](docs/TeamApi.md#getteambyid) | **GET** /users/{userId}/companies/{companyId}/teams/{id} | Get team by identifier
*TeamApi* | [**getTeams**](docs/TeamApi.md#getteams) | **GET** /users/{userId}/companies/{companyId}/teams | Get all teams
*TravelEquipmentApi* | [**confirmEquipmentArrival**](docs/TravelEquipmentApi.md#confirmequipmentarrival) | **PUT** /users/{userId}/companies/{companyId}/travel_equipments/arrival | Confirm arrival of travel equipment (ARRIVED, LOST or DAMAGED)
*TravelEquipmentApi* | [**crupdateTravelEquipment**](docs/TravelEquipmentApi.md#crupdatetravelequipment) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_equipments | Create new travel equipment or update existing ones
*TravelEquipmentApi* | [**deleteTravelEquipmentById**](docs/TravelEquipmentApi.md#deletetravelequipmentbyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_equipments/{id} | Delete travel equipment by identifier
*TravelEquipmentApi* | [**getTravelEquipment**](docs/TravelEquipmentApi.md#gettravelequipment) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_equipments | Get all travel equipment
*TravelEquipmentApi* | [**getTravelEquipmentById**](docs/TravelEquipmentApi.md#gettravelequipmentbyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_equipments/{id} | Get travel equipment by identifier
*TravelExpenseApi* | [**crupdateTravelExpenses**](docs/TravelExpenseApi.md#crupdatetravelexpenses) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_expenses | Create new travel expenses or update existing ones
*TravelExpenseApi* | [**deleteTravelExpenseById**](docs/TravelExpenseApi.md#deletetravelexpensebyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_expenses/{id} | Delete travel expense by identifier
*TravelExpenseApi* | [**getTravelExpenseById**](docs/TravelExpenseApi.md#gettravelexpensebyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_expenses/{id} | Get travel expense by identifier
*TravelExpenseApi* | [**getTravelExpenses**](docs/TravelExpenseApi.md#gettravelexpenses) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_expenses | Get all travel expenses
*TravelMaterialsApi* | [**confirmMaterialArrival**](docs/TravelMaterialsApi.md#confirmmaterialarrival) | **PUT** /users/{userId}/companies/{companyId}/travel_materials/arrival | Confirm arrival of travel materials with actual quantity received
*TravelMaterialsApi* | [**crupdateTravelMaterials**](docs/TravelMaterialsApi.md#crupdatetravelmaterials) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_materials | Create new travel materials or update existing ones
*TravelMaterialsApi* | [**deleteTravelMaterialsById**](docs/TravelMaterialsApi.md#deletetravelmaterialsbyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_materials/{id} | Delete travel materials by identifier
*TravelMaterialsApi* | [**getTravelMaterials**](docs/TravelMaterialsApi.md#gettravelmaterials) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_materials | Get all travel materials
*TravelMaterialsApi* | [**getTravelMaterialsById**](docs/TravelMaterialsApi.md#gettravelmaterialsbyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_materials/{id} | Get travel materials by identifier
*TravelOperationApi* | [**createTravelOperation**](docs/TravelOperationApi.md#createtraveloperation) | **POST** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_operations | Register a travel operation for equipment, materials or people
*TravelPeopleApi* | [**crupdateTravelPeople**](docs/TravelPeopleApi.md#crupdatetravelpeople) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_people | Create new travel people or update existing ones
*TravelPeopleApi* | [**deleteTravelPeopleById**](docs/TravelPeopleApi.md#deletetravelpeoplebyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_people/{id} | Delete travel people by identifier
*TravelPeopleApi* | [**getTravelPeople**](docs/TravelPeopleApi.md#gettravelpeople) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_people | Get all travel people
*TravelPeopleApi* | [**getTravelPeopleById**](docs/TravelPeopleApi.md#gettravelpeoplebyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/travel_people/{id} | Get travel people by identifier
*UsersApi* | [**crupdateUsers**](docs/UsersApi.md#crupdateusers) | **PUT** /users | Create new users or update existing users
*UsersApi* | [**deleteUserById**](docs/UsersApi.md#deleteuserbyid) | **DELETE** /users/{id} | Delete a user by identifier
*UsersApi* | [**getUserById**](docs/UsersApi.md#getuserbyid) | **GET** /users/{id} | Get user by identifier
*UsersApi* | [**getUsers**](docs/UsersApi.md#getusers) | **GET** /users | Get all users
*WarehouseApi* | [**crupdateWarehouses**](docs/WarehouseApi.md#crupdatewarehouses) | **PUT** /users/{userId}/companies/{companyId}/warehouses | Create new warehouses or update existing warehouses
*WarehouseApi* | [**deleteWarehouseById**](docs/WarehouseApi.md#deletewarehousebyid) | **DELETE** /users/{userId}/companies/{companyId}/warehouses/{id} | Delete a warehouse by identifier
*WarehouseApi* | [**getWarehouseById**](docs/WarehouseApi.md#getwarehousebyid) | **GET** /users/{userId}/companies/{companyId}/warehouses/{id} | Get warehouse by identifier
*WarehouseApi* | [**getWarehouses**](docs/WarehouseApi.md#getwarehouses) | **GET** /users/{userId}/companies/{companyId}/warehouses | Get all warehouses


### Models

- [ApiException](docs/ApiException.md)
- [AuditFields](docs/AuditFields.md)
- [AuditUser](docs/AuditUser.md)
- [AuthResponse](docs/AuthResponse.md)
- [BadRequestException](docs/BadRequestException.md)
- [BankFee](docs/BankFee.md)
- [BudgetLine](docs/BudgetLine.md)
- [CashAccount](docs/CashAccount.md)
- [CashTransaction](docs/CashTransaction.md)
- [CashTransactionType](docs/CashTransactionType.md)
- [Comment](docs/Comment.md)
- [Company](docs/Company.md)
- [CompanyFixedCost](docs/CompanyFixedCost.md)
- [CompanyType](docs/CompanyType.md)
- [ConfirmEquipmentArrival](docs/ConfirmEquipmentArrival.md)
- [ConfirmMaterialArrival](docs/ConfirmMaterialArrival.md)
- [CrupdateBankFee](docs/CrupdateBankFee.md)
- [CrupdateBudgetLine](docs/CrupdateBudgetLine.md)
- [CrupdateCashAccount](docs/CrupdateCashAccount.md)
- [CrupdateCashTransaction](docs/CrupdateCashTransaction.md)
- [CrupdateCompany](docs/CrupdateCompany.md)
- [CrupdateCompanyFixedCost](docs/CrupdateCompanyFixedCost.md)
- [CrupdateDepartment](docs/CrupdateDepartment.md)
- [CrupdateEmployeeLeaveConfig](docs/CrupdateEmployeeLeaveConfig.md)
- [CrupdateEmployeePayment](docs/CrupdateEmployeePayment.md)
- [CrupdateEquipment](docs/CrupdateEquipment.md)
- [CrupdateEquipmentUsage](docs/CrupdateEquipmentUsage.md)
- [CrupdateExpenseMoney](docs/CrupdateExpenseMoney.md)
- [CrupdateIncomeMoney](docs/CrupdateIncomeMoney.md)
- [CrupdateIncomeReceipt](docs/CrupdateIncomeReceipt.md)
- [CrupdateIncomeType](docs/CrupdateIncomeType.md)
- [CrupdateJob](docs/CrupdateJob.md)
- [CrupdateLeave](docs/CrupdateLeave.md)
- [CrupdateLeaveType](docs/CrupdateLeaveType.md)
- [CrupdateLoan](docs/CrupdateLoan.md)
- [CrupdateLoanRepayment](docs/CrupdateLoanRepayment.md)
- [CrupdateMaintenance](docs/CrupdateMaintenance.md)
- [CrupdateMaintenanceSchedule](docs/CrupdateMaintenanceSchedule.md)
- [CrupdateMaterial](docs/CrupdateMaterial.md)
- [CrupdateMaterialConsumption](docs/CrupdateMaterialConsumption.md)
- [CrupdateMaterialWarehouse](docs/CrupdateMaterialWarehouse.md)
- [CrupdateMonetaryMovement](docs/CrupdateMonetaryMovement.md)
- [CrupdateNotification](docs/CrupdateNotification.md)
- [CrupdateOrganization](docs/CrupdateOrganization.md)
- [CrupdateOtherExpense](docs/CrupdateOtherExpense.md)
- [CrupdateOtherExpenseType](docs/CrupdateOtherExpenseType.md)
- [CrupdatePurchase](docs/CrupdatePurchase.md)
- [CrupdatePurchaseOrder](docs/CrupdatePurchaseOrder.md)
- [CrupdatePurchaseOrderLine](docs/CrupdatePurchaseOrderLine.md)
- [CrupdateSupplier](docs/CrupdateSupplier.md)
- [CrupdateTask](docs/CrupdateTask.md)
- [CrupdateTaskSchedule](docs/CrupdateTaskSchedule.md)
- [CrupdateTeam](docs/CrupdateTeam.md)
- [CrupdateTravelEquipment](docs/CrupdateTravelEquipment.md)
- [CrupdateTravelExpense](docs/CrupdateTravelExpense.md)
- [CrupdateTravelMaterials](docs/CrupdateTravelMaterials.md)
- [CrupdateTravelOperationContainer](docs/CrupdateTravelOperationContainer.md)
- [CrupdateTravelPeople](docs/CrupdateTravelPeople.md)
- [CrupdateUser](docs/CrupdateUser.md)
- [CrupdateWarehouse](docs/CrupdateWarehouse.md)
- [Department](docs/Department.md)
- [EmployeeLeaveConfig](docs/EmployeeLeaveConfig.md)
- [EmployeePayment](docs/EmployeePayment.md)
- [EntityType](docs/EntityType.md)
- [Equipment](docs/Equipment.md)
- [EquipmentBreakdownResponse](docs/EquipmentBreakdownResponse.md)
- [EquipmentDashboardResponse](docs/EquipmentDashboardResponse.md)
- [EquipmentSummaryResponse](docs/EquipmentSummaryResponse.md)
- [EquipmentUsage](docs/EquipmentUsage.md)
- [ExpenseMoney](docs/ExpenseMoney.md)
- [History](docs/History.md)
- [HrBreakdownResponse](docs/HrBreakdownResponse.md)
- [HrDashboardResponse](docs/HrDashboardResponse.md)
- [HrSummaryResponse](docs/HrSummaryResponse.md)
- [IncomeMoney](docs/IncomeMoney.md)
- [IncomeReceipt](docs/IncomeReceipt.md)
- [IncomeType](docs/IncomeType.md)
- [InternalServerException](docs/InternalServerException.md)
- [Job](docs/Job.md)
- [JobStatus](docs/JobStatus.md)
- [JobWithFinancials](docs/JobWithFinancials.md)
- [Leave](docs/Leave.md)
- [LeaveBalance](docs/LeaveBalance.md)
- [LeaveStatus](docs/LeaveStatus.md)
- [LeaveType](docs/LeaveType.md)
- [Loan](docs/Loan.md)
- [LoanRepayment](docs/LoanRepayment.md)
- [LoanStatus](docs/LoanStatus.md)
- [LoginRequest](docs/LoginRequest.md)
- [Maintenance](docs/Maintenance.md)
- [MaintenanceSchedule](docs/MaintenanceSchedule.md)
- [MaintenanceScheduleStatus](docs/MaintenanceScheduleStatus.md)
- [Material](docs/Material.md)
- [MaterialBreakdownResponse](docs/MaterialBreakdownResponse.md)
- [MaterialConsumption](docs/MaterialConsumption.md)
- [MaterialDashboardResponse](docs/MaterialDashboardResponse.md)
- [MaterialSummaryResponse](docs/MaterialSummaryResponse.md)
- [MaterialUnit](docs/MaterialUnit.md)
- [MaterialWarehouseInfo](docs/MaterialWarehouseInfo.md)
- [MaterialWarehouseView](docs/MaterialWarehouseView.md)
- [MonetaryBreakdownResponse](docs/MonetaryBreakdownResponse.md)
- [MonetaryDashboardResponse](docs/MonetaryDashboardResponse.md)
- [MonetaryMovement](docs/MonetaryMovement.md)
- [MonetarySummaryResponse](docs/MonetarySummaryResponse.md)
- [NotAuthorizedException](docs/NotAuthorizedException.md)
- [Notification](docs/Notification.md)
- [Organization](docs/Organization.md)
- [OtherExpense](docs/OtherExpense.md)
- [OtherExpenseType](docs/OtherExpenseType.md)
- [PaginatedResponse](docs/PaginatedResponse.md)
- [PasswordChangeRequest](docs/PasswordChangeRequest.md)
- [PaymentType](docs/PaymentType.md)
- [Purchase](docs/Purchase.md)
- [PurchaseOperationEquipmentLine](docs/PurchaseOperationEquipmentLine.md)
- [PurchaseOperationMaterialLine](docs/PurchaseOperationMaterialLine.md)
- [PurchaseOperationRequest](docs/PurchaseOperationRequest.md)
- [PurchaseOperationTravel](docs/PurchaseOperationTravel.md)
- [PurchaseOrder](docs/PurchaseOrder.md)
- [PurchaseOrderLine](docs/PurchaseOrderLine.md)
- [PurchaseOrderStatus](docs/PurchaseOrderStatus.md)
- [ResourceNotFoundException](docs/ResourceNotFoundException.md)
- [Role](docs/Role.md)
- [ScheduleStatus](docs/ScheduleStatus.md)
- [Sex](docs/Sex.md)
- [Supplier](docs/Supplier.md)
- [Task](docs/Task.md)
- [TaskPriority](docs/TaskPriority.md)
- [TaskSchedule](docs/TaskSchedule.md)
- [Team](docs/Team.md)
- [TimeSeriesResponse](docs/TimeSeriesResponse.md)
- [TimeSeriesResponseIntervalsInner](docs/TimeSeriesResponseIntervalsInner.md)
- [TimeSeriesResponsePeriod](docs/TimeSeriesResponsePeriod.md)
- [TooManyRequestsException](docs/TooManyRequestsException.md)
- [TransportStatus](docs/TransportStatus.md)
- [TravelEquipment](docs/TravelEquipment.md)
- [TravelExpense](docs/TravelExpense.md)
- [TravelMaterials](docs/TravelMaterials.md)
- [TravelOperationContainerLine](docs/TravelOperationContainerLine.md)
- [TravelOperationEquipmentLine](docs/TravelOperationEquipmentLine.md)
- [TravelOperationMaterialLine](docs/TravelOperationMaterialLine.md)
- [TravelOperationPeopleLine](docs/TravelOperationPeopleLine.md)
- [TravelOperationRequest](docs/TravelOperationRequest.md)
- [TravelOperationTravel](docs/TravelOperationTravel.md)
- [TravelPeople](docs/TravelPeople.md)
- [UnreadNotificationCountResponse](docs/UnreadNotificationCountResponse.md)
- [UsageStatus](docs/UsageStatus.md)
- [User](docs/User.md)
- [Warehouse](docs/Warehouse.md)
- [YearlyReport](docs/YearlyReport.md)
- [YearlyReportSummary](docs/YearlyReportSummary.md)

### Authorization


Authentication schemes defined for the API:
<a id="BearerAuth"></a>
#### BearerAuth


- **Type**: HTTP Bearer Token authentication

## About

This TypeScript SDK client supports the [Fetch API](https://fetch.spec.whatwg.org/)
and is automatically generated by the
[OpenAPI Generator](https://openapi-generator.tech) project:

- API version: `1.0`
- Package version: `1.0`
- Generator version: `7.22.0`
- Build package: `org.openapitools.codegen.languages.TypeScriptFetchClientCodegen`

The generated npm module supports the following:

- Environments
  * Node.js
  * Webpack
  * Browserify
- Language levels
  * ES5 - you must have a Promises/A+ library installed
  * ES6
- Module systems
  * CommonJS
  * ES6 module system


## Development

### Building

To build the TypeScript source code, you need to have Node.js and npm installed.
After cloning the repository, navigate to the project directory and run:

```bash
npm install
npm run build
```

### Publishing

Once you've built the package, you can publish it to npm:

```bash
npm publish
```

## License

[]()
