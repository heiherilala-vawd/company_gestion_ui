# api-client@1.0

A TypeScript SDK client for the api-dev.company.com API.

## Usage

First, install the SDK from npm.

```bash
npm install api-client --save
```

Next, try it out.

```ts
import { Configuration, AuthApi } from 'api-client'
import type { AuthLoginPostRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new AuthApi(config)

  const body = {
    // LoginRequest
    loginRequest: { email: 'jean.dupont@example.com', password: 'securePassword123' },
  } satisfies AuthLoginPostRequest

  try {
    const data = await api.authLoginPost(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

## Documentation

### API Endpoints

All URIs are relative to *https://api-dev.company.com*

| Class                    | Method                                                                                            | HTTP request                                                                                                           | Description                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| _AuthApi_                | [**authLoginPost**](docs/AuthApi.md#authloginpost)                                                | **POST** /auth/login                                                                                                   | Login user                                                      |
| _AuthApi_                | [**authRegisterPost**](docs/AuthApi.md#authregisterpost)                                          | **POST** /auth/register                                                                                                | Register a new user                                             |
| _AuthApi_                | [**authWhoamiGet**](docs/AuthApi.md#authwhoamiget)                                                | **GET** /auth/whoami                                                                                                   | Get current user                                                |
| _BankFeeApi_             | [**crupdateBankFees**](docs/BankFeeApi.md#crupdatebankfees)                                       | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/bank_fees                                                     | Create new bank fees or update existing ones                    |
| _BankFeeApi_             | [**deleteBankFeeById**](docs/BankFeeApi.md#deletebankfeebyid)                                     | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/bank_fees/{id}                                             | Delete bank fee by identifier                                   |
| _BankFeeApi_             | [**getBankFeeById**](docs/BankFeeApi.md#getbankfeebyid)                                           | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/bank_fees/{id}                                                | Get bank fee by identifier                                      |
| _BankFeeApi_             | [**getBankFees**](docs/BankFeeApi.md#getbankfees)                                                 | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/bank_fees                                                     | Get all bank fees                                               |
| _BudgetLineApi_          | [**crupdateBudgetLines**](docs/BudgetLineApi.md#crupdatebudgetlines)                              | **PUT** /companies/{comp_id}/budget_lines                                                                              | Create new budget lines or update existing ones                 |
| _BudgetLineApi_          | [**deleteBudgetLineById**](docs/BudgetLineApi.md#deletebudgetlinebyid)                            | **DELETE** /companies/{comp_id}/budget_lines/{id}                                                                      | Delete a budget line by identifier                              |
| _BudgetLineApi_          | [**getBudgetLineById**](docs/BudgetLineApi.md#getbudgetlinebyid)                                  | **GET** /companies/{comp_id}/budget_lines/{id}                                                                         | Get a budget line by identifier                                 |
| _BudgetLineApi_          | [**getBudgetLines**](docs/BudgetLineApi.md#getbudgetlines)                                        | **GET** /companies/{comp_id}/budget_lines                                                                              | Get all budget lines                                            |
| _CashAccountApi_         | [**crupdateCashAccounts**](docs/CashAccountApi.md#crupdatecashaccounts)                           | **PUT** /companies/{comp_id}/cash_accounts                                                                             | Create new cash accounts or update existing ones                |
| _CashAccountApi_         | [**deleteCashAccountById**](docs/CashAccountApi.md#deletecashaccountbyid)                         | **DELETE** /companies/{comp_id}/cash_accounts/{id}                                                                     | Delete a cash account by identifier                             |
| _CashAccountApi_         | [**getCashAccountById**](docs/CashAccountApi.md#getcashaccountbyid)                               | **GET** /companies/{comp_id}/cash_accounts/{id}                                                                        | Get a cash account by identifier                                |
| _CashAccountApi_         | [**getCashAccounts**](docs/CashAccountApi.md#getcashaccounts)                                     | **GET** /companies/{comp_id}/cash_accounts                                                                             | Get all cash accounts                                           |
| _CashTransactionApi_     | [**crupdateCashTransactions**](docs/CashTransactionApi.md#crupdatecashtransactions)               | **PUT** /companies/{comp_id}/cash_accounts/{account_id}/transactions                                                   | Create new cash transactions or update existing ones            |
| _CashTransactionApi_     | [**deleteCashTransactionById**](docs/CashTransactionApi.md#deletecashtransactionbyid)             | **DELETE** /companies/{comp_id}/cash_accounts/{account_id}/transactions/{id}                                           | Delete a cash transaction by identifier                         |
| _CashTransactionApi_     | [**getCashTransactionById**](docs/CashTransactionApi.md#getcashtransactionbyid)                   | **GET** /companies/{comp_id}/cash_accounts/{account_id}/transactions/{id}                                              | Get a cash transaction by identifier                            |
| _CashTransactionApi_     | [**getCashTransactions**](docs/CashTransactionApi.md#getcashtransactions)                         | **GET** /companies/{comp_id}/cash_accounts/{account_id}/transactions                                                   | Get all cash transactions for an account                        |
| _CompanyApi_             | [**crupdateCompanies**](docs/CompanyApi.md#crupdatecompanies)                                     | **PUT** /companies                                                                                                     | Create new companies or update existing companies               |
| _CompanyApi_             | [**deleteCompanyById**](docs/CompanyApi.md#deletecompanybyid)                                     | **DELETE** /companies/{id}                                                                                             | Delete a company by identifier                                  |
| _CompanyApi_             | [**getCompanies**](docs/CompanyApi.md#getcompanies)                                               | **GET** /companies                                                                                                     | Get all companies                                               |
| _CompanyApi_             | [**getCompanyById**](docs/CompanyApi.md#getcompanybyid)                                           | **GET** /companies/{id}                                                                                                | Get company by identifier                                       |
| _CompanyFixedCostApi_    | [**crupdateCompanyFixedCosts**](docs/CompanyFixedCostApi.md#crupdatecompanyfixedcosts)            | **PUT** /companies/{comp_id}/fixed_costs                                                                               | Create new fixed costs or update existing ones                  |
| _CompanyFixedCostApi_    | [**deleteCompanyFixedCostById**](docs/CompanyFixedCostApi.md#deletecompanyfixedcostbyid)          | **DELETE** /companies/{comp_id}/fixed_costs/{id}                                                                       | Delete a fixed cost by identifier                               |
| _CompanyFixedCostApi_    | [**getCompanyFixedCostById**](docs/CompanyFixedCostApi.md#getcompanyfixedcostbyid)                | **GET** /companies/{comp_id}/fixed_costs/{id}                                                                          | Get a fixed cost by identifier                                  |
| _CompanyFixedCostApi_    | [**getCompanyFixedCosts**](docs/CompanyFixedCostApi.md#getcompanyfixedcosts)                      | **GET** /companies/{comp_id}/fixed_costs                                                                               | Get all fixed costs for a company                               |
| _DepartmentApi_          | [**crupdateDepartments**](docs/DepartmentApi.md#crupdatedepartments)                              | **PUT** /companies/{comp_id}/departments                                                                               | Create new departments or update existing ones                  |
| _DepartmentApi_          | [**deleteDepartmentById**](docs/DepartmentApi.md#deletedepartmentbyid)                            | **DELETE** /companies/{comp_id}/departments/{id}                                                                       | Delete a department by identifier                               |
| _DepartmentApi_          | [**getDepartmentById**](docs/DepartmentApi.md#getdepartmentbyid)                                  | **GET** /companies/{comp_id}/departments/{id}                                                                          | Get a department by identifier                                  |
| _DepartmentApi_          | [**getDepartments**](docs/DepartmentApi.md#getdepartments)                                        | **GET** /companies/{comp_id}/departments                                                                               | Get all departments                                             |
| _EmployeePaymentApi_     | [**crupdateEmployeePayments**](docs/EmployeePaymentApi.md#crupdateemployeepayments)               | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/employee_payments                                             | Create new employee payments or update existing ones            |
| _EmployeePaymentApi_     | [**deleteEmployeePaymentById**](docs/EmployeePaymentApi.md#deleteemployeepaymentbyid)             | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/employee_payments/{id}                                     | Delete employee payment by identifier                           |
| _EmployeePaymentApi_     | [**getEmployeePaymentById**](docs/EmployeePaymentApi.md#getemployeepaymentbyid)                   | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/employee_payments/{id}                                        | Get employee payment by identifier                              |
| _EmployeePaymentApi_     | [**getEmployeePayments**](docs/EmployeePaymentApi.md#getemployeepayments)                         | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/employee_payments                                             | Get all employee payments                                       |
| _EquipmentApi_           | [**crupdateEquipment**](docs/EquipmentApi.md#crupdateequipment)                                   | **PUT** /companies/{comp_id}/equipment                                                                                 | Create new equipment or update existing equipment               |
| _EquipmentApi_           | [**deleteEquipmentById**](docs/EquipmentApi.md#deleteequipmentbyid)                               | **DELETE** /companies/{comp_id}/equipment/{id}                                                                         | Delete equipment by identifier                                  |
| _EquipmentApi_           | [**getEquipment**](docs/EquipmentApi.md#getequipment)                                             | **GET** /companies/{comp_id}/equipment                                                                                 | Get all equipment                                               |
| _EquipmentApi_           | [**getEquipmentById**](docs/EquipmentApi.md#getequipmentbyid)                                     | **GET** /companies/{comp_id}/equipment/{id}                                                                            | Get equipment by identifier                                     |
| _EquipmentUsageApi_      | [**crupdateEquipmentUsages**](docs/EquipmentUsageApi.md#crupdateequipmentusages)                  | **PUT** /companies/{comp_id}/equipment_usage                                                                           | Create new equipment usage records or update existing ones      |
| _EquipmentUsageApi_      | [**deleteEquipmentUsageById**](docs/EquipmentUsageApi.md#deleteequipmentusagebyid)                | **DELETE** /companies/{comp_id}/equipment_usage/{id}                                                                   | Delete an equipment usage record by identifier                  |
| _EquipmentUsageApi_      | [**getEquipmentUsageById**](docs/EquipmentUsageApi.md#getequipmentusagebyid)                      | **GET** /companies/{comp_id}/equipment_usage/{id}                                                                      | Get an equipment usage record by identifier                     |
| _EquipmentUsageApi_      | [**getEquipmentUsages**](docs/EquipmentUsageApi.md#getequipmentusages)                            | **GET** /companies/{comp_id}/equipment_usage                                                                           | Get all equipment usage records                                 |
| _ExpenseApi_             | [**crupdateExpenses**](docs/ExpenseApi.md#crupdateexpenses)                                       | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses                                                      | Create new expenses or update existing ones                     |
| _ExpenseApi_             | [**deleteExpenseById**](docs/ExpenseApi.md#deleteexpensebyid)                                     | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{id}                                              | Delete expense by identifier                                    |
| _ExpenseApi_             | [**getExpenseById**](docs/ExpenseApi.md#getexpensebyid)                                           | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{id}                                                 | Get expense by identifier                                       |
| _ExpenseApi_             | [**getExpenses**](docs/ExpenseApi.md#getexpenses)                                                 | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses                                                      | Get all expenses                                                |
| _HRApi_                  | [**crupdateEmployeeLeaveConfigs**](docs/HRApi.md#crupdateemployeeleaveconfigs)                    | **PUT** /companies/{comp_id}/leave_configs                                                                             | Create or update employee leave configs                         |
| _HRApi_                  | [**crupdateLeaveTypes**](docs/HRApi.md#crupdateleavetypes)                                        | **PUT** /companies/{comp_id}/leave_types                                                                               | Create or update leave types                                    |
| _HRApi_                  | [**crupdateLeaves**](docs/HRApi.md#crupdateleaves)                                                | **PUT** /companies/{comp_id}/leaves                                                                                    | Create or update leaves                                         |
| _HRApi_                  | [**deleteLeaveById**](docs/HRApi.md#deleteleavebyid)                                              | **DELETE** /companies/{comp_id}/leaves/{id}                                                                            | Delete leave by identifier                                      |
| _HRApi_                  | [**getEmployeeLeaveConfigById**](docs/HRApi.md#getemployeeleaveconfigbyid)                        | **GET** /companies/{comp_id}/leave_configs/{id}                                                                        | Get a leave config by id                                        |
| _HRApi_                  | [**getEmployeeLeaveConfigs**](docs/HRApi.md#getemployeeleaveconfigs)                              | **GET** /companies/{comp_id}/leave_configs                                                                             | Get all employee leave configs                                  |
| _HRApi_                  | [**getEmployeesWithoutLeave**](docs/HRApi.md#getemployeeswithoutleave)                            | **GET** /companies/{comp_id}/leave_balances/employees_without_leave                                                    | Get employees who haven\&#39;t taken any leave                  |
| _HRApi_                  | [**getLeaveBalances**](docs/HRApi.md#getleavebalances)                                            | **GET** /companies/{comp_id}/leave_balances                                                                            | Get leave balances for all employees in a company               |
| _HRApi_                  | [**getLeaveById**](docs/HRApi.md#getleavebyid)                                                    | **GET** /companies/{comp_id}/leaves/{id}                                                                               | Get leave by identifier                                         |
| _HRApi_                  | [**getLeaveTypeById**](docs/HRApi.md#getleavetypebyid)                                            | **GET** /companies/{comp_id}/leave_types/{id}                                                                          | Get a leave type by id                                          |
| _HRApi_                  | [**getLeaveTypes**](docs/HRApi.md#getleavetypes)                                                  | **GET** /companies/{comp_id}/leave_types                                                                               | Get all leave types                                             |
| _HRApi_                  | [**getLeaves**](docs/HRApi.md#getleaves)                                                          | **GET** /companies/{comp_id}/leaves                                                                                    | Get all leaves                                                  |
| _HistoryApi_             | [**getHistories**](docs/HistoryApi.md#gethistories)                                               | **GET** /histories                                                                                                     | Get modification history with filters                           |
| _IncomeApi_              | [**crupdateIncomes**](docs/IncomeApi.md#crupdateincomes)                                          | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes                                                       | Create new incomes or update existing ones                      |
| _IncomeApi_              | [**deleteIncomeById**](docs/IncomeApi.md#deleteincomebyid)                                        | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{id}                                               | Delete income by identifier                                     |
| _IncomeApi_              | [**getIncomeById**](docs/IncomeApi.md#getincomebyid)                                              | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{id}                                                  | Get income by identifier                                        |
| _IncomeApi_              | [**getIncomes**](docs/IncomeApi.md#getincomes)                                                    | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes                                                       | Get all incomes                                                 |
| _IncomeApi_              | [**getIncomesExcel**](docs/IncomeApi.md#getincomesexcel)                                          | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/excel                                                 | Export incomes to Excel                                         |
| _IncomeReceiptApi_       | [**crupdateIncomeReceipts**](docs/IncomeReceiptApi.md#crupdateincomereceipts)                     | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{income_id}/receipts                                  | Create new income receipts or update existing ones              |
| _IncomeReceiptApi_       | [**deleteIncomeReceiptById**](docs/IncomeReceiptApi.md#deleteincomereceiptbyid)                   | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{income_id}/receipts/{id}                          | Delete income receipt by identifier                             |
| _IncomeReceiptApi_       | [**getIncomeReceiptById**](docs/IncomeReceiptApi.md#getincomereceiptbyid)                         | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{income_id}/receipts/{id}                             | Get income receipt by identifier                                |
| _IncomeReceiptApi_       | [**getIncomeReceipts**](docs/IncomeReceiptApi.md#getincomereceipts)                               | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{income_id}/receipts                                  | Get all receipts for an income                                  |
| _IncomeTypeApi_          | [**crupdateIncomeTypes**](docs/IncomeTypeApi.md#crupdateincometypes)                              | **PUT** /companies/{comp_id}/income_types                                                                              | Create new income types or update existing ones                 |
| _IncomeTypeApi_          | [**deleteIncomeTypeById**](docs/IncomeTypeApi.md#deleteincometypebyid)                            | **DELETE** /companies/{comp_id}/income_types/{id}                                                                      | Delete an income type by identifier                             |
| _IncomeTypeApi_          | [**getIncomeTypeById**](docs/IncomeTypeApi.md#getincometypebyid)                                  | **GET** /companies/{comp_id}/income_types/{id}                                                                         | Get an income type by identifier                                |
| _IncomeTypeApi_          | [**getIncomeTypes**](docs/IncomeTypeApi.md#getincometypes)                                        | **GET** /companies/{comp_id}/income_types                                                                              | Get all income types for a company                              |
| _JobApi_                 | [**assignUserToJob**](docs/JobApi.md#assignusertojob)                                             | **PUT** /companies/{comp_id}/jobs/{job_id}/users/{user_id}                                                             | Assign a user to a job                                          |
| _JobApi_                 | [**crupdateJobs**](docs/JobApi.md#crupdatejobs)                                                   | **PUT** /companies/{comp_id}/jobs                                                                                      | Create new jobs or update existing jobs                         |
| _JobApi_                 | [**deleteJobById**](docs/JobApi.md#deletejobbyid)                                                 | **DELETE** /companies/{comp_id}/jobs/{id}                                                                              | Delete a job by identifier                                      |
| _JobApi_                 | [**getJobById**](docs/JobApi.md#getjobbyid)                                                       | **GET** /companies/{comp_id}/jobs/{id}                                                                                 | Get job by identifier                                           |
| _JobApi_                 | [**getJobResponsibleUsers**](docs/JobApi.md#getjobresponsibleusers)                               | **GET** /companies/{comp_id}/jobs/{job_id}/users                                                                       | Get responsible users for a job                                 |
| _JobApi_                 | [**getJobs**](docs/JobApi.md#getjobs)                                                             | **GET** /companies/{comp_id}/jobs                                                                                      | Get all jobs                                                    |
| _JobApi_                 | [**unassignUserFromJob**](docs/JobApi.md#unassignuserfromjob)                                     | **DELETE** /companies/{comp_id}/jobs/{job_id}/users/{user_id}                                                          | Unassign a user from a job                                      |
| _LoanApi_                | [**crupdateLoans**](docs/LoanApi.md#crupdateloans)                                                | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans                                                         | Create new loans or update existing ones                        |
| _LoanApi_                | [**deleteLoanById**](docs/LoanApi.md#deleteloanbyid)                                              | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{id}                                                 | Delete loan by identifier                                       |
| _LoanApi_                | [**getLoanById**](docs/LoanApi.md#getloanbyid)                                                    | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{id}                                                    | Get loan by identifier                                          |
| _LoanApi_                | [**getLoans**](docs/LoanApi.md#getloans)                                                          | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans                                                         | Get all loans                                                   |
| _LoanRepaymentApi_       | [**crupdateLoanRepayments**](docs/LoanRepaymentApi.md#crupdateloanrepayments)                     | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{loan_id}/repayments                                    | Create new loan repayments or update existing ones              |
| _LoanRepaymentApi_       | [**deleteLoanRepaymentById**](docs/LoanRepaymentApi.md#deleteloanrepaymentbyid)                   | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{loan_id}/repayments/{id}                            | Delete loan repayment by identifier                             |
| _LoanRepaymentApi_       | [**getLoanRepaymentById**](docs/LoanRepaymentApi.md#getloanrepaymentbyid)                         | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{loan_id}/repayments/{id}                               | Get loan repayment by identifier                                |
| _LoanRepaymentApi_       | [**getLoanRepayments**](docs/LoanRepaymentApi.md#getloanrepayments)                               | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{loan_id}/repayments                                    | Get all repayments for a loan                                   |
| _MaintenanceApi_         | [**crupdateMaintenances**](docs/MaintenanceApi.md#crupdatemaintenances)                           | **PUT** /companies/{comp_id}/equipment/{equipment_id}/maintenances                                                     | Create new maintenances or update existing ones                 |
| _MaintenanceApi_         | [**deleteMaintenanceById**](docs/MaintenanceApi.md#deletemaintenancebyid)                         | **DELETE** /companies/{comp_id}/equipment/{equipment_id}/maintenances/{id}                                             | Delete maintenance by identifier                                |
| _MaintenanceApi_         | [**getMaintenanceById**](docs/MaintenanceApi.md#getmaintenancebyid)                               | **GET** /companies/{comp_id}/equipment/{equipment_id}/maintenances/{id}                                                | Get maintenance by identifier                                   |
| _MaintenanceApi_         | [**getMaintenances**](docs/MaintenanceApi.md#getmaintenances)                                     | **GET** /companies/{comp_id}/equipment/{equipment_id}/maintenances                                                     | Get all maintenances for equipment                              |
| _MaterialApi_            | [**crupdateMaterials**](docs/MaterialApi.md#crupdatematerials)                                    | **PUT** /companies/{comp_id}/materials                                                                                 | Create new materials or update existing materials               |
| _MaterialApi_            | [**deleteMaterialById**](docs/MaterialApi.md#deletematerialbyid)                                  | **DELETE** /companies/{comp_id}/materials/{id}                                                                         | Delete material by identifier                                   |
| _MaterialApi_            | [**getMaterialById**](docs/MaterialApi.md#getmaterialbyid)                                        | **GET** /companies/{comp_id}/materials/{id}                                                                            | Get material by identifier                                      |
| _MaterialApi_            | [**getMaterials**](docs/MaterialApi.md#getmaterials)                                              | **GET** /companies/{comp_id}/materials                                                                                 | Get all materials                                               |
| _MaterialConsumptionApi_ | [**crupdateMaterialConsumptions**](docs/MaterialConsumptionApi.md#crupdatematerialconsumptions)   | **PUT** /companies/{comp_id}/material_consumption                                                                      | Create new material consumption records or update existing ones |
| _MaterialConsumptionApi_ | [**deleteMaterialConsumptionById**](docs/MaterialConsumptionApi.md#deletematerialconsumptionbyid) | **DELETE** /companies/{comp_id}/material_consumption/{id}                                                              | Delete a material consumption record by identifier              |
| _MaterialConsumptionApi_ | [**getMaterialConsumptionById**](docs/MaterialConsumptionApi.md#getmaterialconsumptionbyid)       | **GET** /companies/{comp_id}/material_consumption/{id}                                                                 | Get a material consumption record by identifier                 |
| _MaterialConsumptionApi_ | [**getMaterialConsumptions**](docs/MaterialConsumptionApi.md#getmaterialconsumptions)             | **GET** /companies/{comp_id}/material_consumption                                                                      | Get all material consumption records                            |
| _MaterialWarehouseApi_   | [**crupdateMaterialWarehouses**](docs/MaterialWarehouseApi.md#crupdatematerialwarehouses)         | **PUT** /companies/{comp_id}/material_warehouse                                                                        | Create or update material warehouse stock                       |
| _MaterialWarehouseApi_   | [**getMaterialWarehouses**](docs/MaterialWarehouseApi.md#getmaterialwarehouses)                   | **GET** /companies/{comp_id}/material_warehouse                                                                        | Get all material warehouse stock records                        |
| _OtherExpenseApi_        | [**crupdateOtherExpenses**](docs/OtherExpenseApi.md#crupdateotherexpenses)                        | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/other_expenses                                                | Create new other expenses or update existing ones               |
| _OtherExpenseApi_        | [**deleteOtherExpenseById**](docs/OtherExpenseApi.md#deleteotherexpensebyid)                      | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/other_expenses/{id}                                        | Delete other expense by identifier                              |
| _OtherExpenseApi_        | [**getOtherExpenseById**](docs/OtherExpenseApi.md#getotherexpensebyid)                            | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/other_expenses/{id}                                           | Get other expense by identifier                                 |
| _OtherExpenseApi_        | [**getOtherExpenses**](docs/OtherExpenseApi.md#getotherexpenses)                                  | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/other_expenses                                                | Get all other expenses                                          |
| _OtherExpenseTypeApi_    | [**crupdateOtherExpenseTypes**](docs/OtherExpenseTypeApi.md#crupdateotherexpensetypes)            | **PUT** /companies/{comp_id}/other_expense_types                                                                       | Create new other expense types or update existing ones          |
| _OtherExpenseTypeApi_    | [**deleteOtherExpenseTypeById**](docs/OtherExpenseTypeApi.md#deleteotherexpensetypebyid)          | **DELETE** /companies/{comp_id}/other_expense_types/{id}                                                               | Delete an other expense type by identifier                      |
| _OtherExpenseTypeApi_    | [**getOtherExpenseTypeById**](docs/OtherExpenseTypeApi.md#getotherexpensetypebyid)                | **GET** /companies/{comp_id}/other_expense_types/{id}                                                                  | Get an other expense type by identifier                         |
| _OtherExpenseTypeApi_    | [**getOtherExpenseTypes**](docs/OtherExpenseTypeApi.md#getotherexpensetypes)                      | **GET** /companies/{comp_id}/other_expense_types                                                                       | Get all other expense types for a company                       |
| _PurchaseApi_            | [**crupdatePurchases**](docs/PurchaseApi.md#crupdatepurchases)                                    | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchases                                                     | Create new purchases or update existing ones                    |
| _PurchaseApi_            | [**deletePurchaseById**](docs/PurchaseApi.md#deletepurchasebyid)                                  | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchases/{id}                                             | Delete purchase by identifier                                   |
| _PurchaseApi_            | [**getPurchaseById**](docs/PurchaseApi.md#getpurchasebyid)                                        | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchases/{id}                                                | Get purchase by identifier                                      |
| _PurchaseApi_            | [**getPurchases**](docs/PurchaseApi.md#getpurchases)                                              | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchases                                                     | Get all purchases                                               |
| _PurchaseOperationApi_   | [**createPurchaseOperation**](docs/PurchaseOperationApi.md#createpurchaseoperation)               | **POST** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchase_operations                                          | Register a purchase operation with optional travel              |
| _ReportApi_              | [**companiesCompIdYearlyReportGet**](docs/ReportApi.md#companiescompidyearlyreportget)            | **GET** /companies/{comp_id}/yearly_report                                                                             | Get yearly report with job financials                           |
| _TaskApi_                | [**crupdateTasks**](docs/TaskApi.md#crupdatetasks)                                                | **PUT** /companies/{comp_id}/tasks                                                                                     | Create or update tasks                                          |
| _TaskApi_                | [**deleteTaskById**](docs/TaskApi.md#deletetaskbyid)                                              | **DELETE** /companies/{comp_id}/tasks/{id}                                                                             | Delete a task by id                                             |
| _TaskApi_                | [**getTaskById**](docs/TaskApi.md#gettaskbyid)                                                    | **GET** /companies/{comp_id}/tasks/{id}                                                                                | Get a task by id                                                |
| _TaskApi_                | [**getTasks**](docs/TaskApi.md#gettasks)                                                          | **GET** /companies/{comp_id}/tasks                                                                                     | Get all tasks for a company                                     |
| _TaskScheduleApi_        | [**crupdateTaskSchedules**](docs/TaskScheduleApi.md#crupdatetaskschedules)                        | **PUT** /companies/{comp_id}/task_schedules                                                                            | Create or update task schedules                                 |
| _TaskScheduleApi_        | [**deleteTaskScheduleById**](docs/TaskScheduleApi.md#deletetaskschedulebyid)                      | **DELETE** /companies/{comp_id}/task_schedules/{id}                                                                    | Delete a task schedule by id                                    |
| _TaskScheduleApi_        | [**getTaskScheduleById**](docs/TaskScheduleApi.md#gettaskschedulebyid)                            | **GET** /companies/{comp_id}/task_schedules/{id}                                                                       | Get a task schedule by id                                       |
| _TaskScheduleApi_        | [**getTaskSchedules**](docs/TaskScheduleApi.md#gettaskschedules)                                  | **GET** /companies/{comp_id}/task_schedules                                                                            | Get all task schedules                                          |
| _TeamApi_                | [**crupdateTeams**](docs/TeamApi.md#crupdateteams)                                                | **PUT** /companies/{comp_id}/teams                                                                                     | Create new teams or update existing teams                       |
| _TeamApi_                | [**deleteTeamById**](docs/TeamApi.md#deleteteambyid)                                              | **DELETE** /companies/{comp_id}/teams/{id}                                                                             | Delete team by identifier                                       |
| _TeamApi_                | [**getTeamById**](docs/TeamApi.md#getteambyid)                                                    | **GET** /companies/{comp_id}/teams/{id}                                                                                | Get team by identifier                                          |
| _TeamApi_                | [**getTeams**](docs/TeamApi.md#getteams)                                                          | **GET** /companies/{comp_id}/teams                                                                                     | Get all teams                                                   |
| _TravelEquipmentApi_     | [**crupdateTravelEquipment**](docs/TravelEquipmentApi.md#crupdatetravelequipment)                 | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment         | Create new travel equipment or update existing ones             |
| _TravelEquipmentApi_     | [**deleteTravelEquipmentById**](docs/TravelEquipmentApi.md#deletetravelequipmentbyid)             | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment/{id} | Delete travel equipment by identifier                           |
| _TravelEquipmentApi_     | [**getTravelEquipment**](docs/TravelEquipmentApi.md#gettravelequipment)                           | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment         | Get all travel equipment                                        |
| _TravelEquipmentApi_     | [**getTravelEquipmentById**](docs/TravelEquipmentApi.md#gettravelequipmentbyid)                   | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment/{id}    | Get travel equipment by identifier                              |
| _TravelExpenseApi_       | [**crupdateTravelExpenses**](docs/TravelExpenseApi.md#crupdatetravelexpenses)                     | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses                                               | Create new travel expenses or update existing ones              |
| _TravelExpenseApi_       | [**deleteTravelExpenseById**](docs/TravelExpenseApi.md#deletetravelexpensebyid)                   | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{id}                                       | Delete travel expense by identifier                             |
| _TravelExpenseApi_       | [**getTravelExpenseById**](docs/TravelExpenseApi.md#gettravelexpensebyid)                         | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{id}                                          | Get travel expense by identifier                                |
| _TravelExpenseApi_       | [**getTravelExpenses**](docs/TravelExpenseApi.md#gettravelexpenses)                               | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses                                               | Get all travel expenses                                         |
| _TravelMaterialsApi_     | [**crupdateTravelMaterials**](docs/TravelMaterialsApi.md#crupdatetravelmaterials)                 | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials         | Create new travel materials or update existing ones             |
| _TravelMaterialsApi_     | [**deleteTravelMaterialsById**](docs/TravelMaterialsApi.md#deletetravelmaterialsbyid)             | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials/{id} | Delete travel materials by identifier                           |
| _TravelMaterialsApi_     | [**getTravelMaterials**](docs/TravelMaterialsApi.md#gettravelmaterials)                           | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials         | Get all travel materials                                        |
| _TravelMaterialsApi_     | [**getTravelMaterialsById**](docs/TravelMaterialsApi.md#gettravelmaterialsbyid)                   | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials/{id}    | Get travel materials by identifier                              |
| _TravelOperationApi_     | [**createTravelOperation**](docs/TravelOperationApi.md#createtraveloperation)                     | **POST** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_operations                                            | Register a travel operation for equipment, materials or people  |
| _TravelPeopleApi_        | [**crupdateTravelPeople**](docs/TravelPeopleApi.md#crupdatetravelpeople)                          | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people            | Create new travel people or update existing ones                |
| _TravelPeopleApi_        | [**deleteTravelPeopleById**](docs/TravelPeopleApi.md#deletetravelpeoplebyid)                      | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people/{id}    | Delete travel people by identifier                              |
| _TravelPeopleApi_        | [**getTravelPeople**](docs/TravelPeopleApi.md#gettravelpeople)                                    | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people            | Get all travel people                                           |
| _TravelPeopleApi_        | [**getTravelPeopleById**](docs/TravelPeopleApi.md#gettravelpeoplebyid)                            | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people/{id}       | Get travel people by identifier                                 |
| _UsersApi_               | [**crupdateUsers**](docs/UsersApi.md#crupdateusers)                                               | **PUT** /companies/{comp_id}/users                                                                                     | Create new users or update existing users                       |
| _UsersApi_               | [**deleteUserById**](docs/UsersApi.md#deleteuserbyid)                                             | **DELETE** /companies/{comp_id}/users/{id}                                                                             | Delete a user by identifier                                     |
| _UsersApi_               | [**getUserById**](docs/UsersApi.md#getuserbyid)                                                   | **GET** /companies/{comp_id}/users/{id}                                                                                | Get user by identifier                                          |
| _UsersApi_               | [**getUsers**](docs/UsersApi.md#getusers)                                                         | **GET** /companies/{comp_id}/users                                                                                     | Get all users                                                   |
| _WarehouseApi_           | [**crupdateWarehouses**](docs/WarehouseApi.md#crupdatewarehouses)                                 | **PUT** /companies/{comp_id}/warehouses                                                                                | Create new warehouses or update existing warehouses             |
| _WarehouseApi_           | [**deleteWarehouseById**](docs/WarehouseApi.md#deletewarehousebyid)                               | **DELETE** /companies/{comp_id}/warehouses/{id}                                                                        | Delete a warehouse by identifier                                |
| _WarehouseApi_           | [**getWarehouseById**](docs/WarehouseApi.md#getwarehousebyid)                                     | **GET** /companies/{comp_id}/warehouses/{id}                                                                           | Get warehouse by identifier                                     |
| _WarehouseApi_           | [**getWarehouses**](docs/WarehouseApi.md#getwarehouses)                                           | **GET** /companies/{comp_id}/warehouses                                                                                | Get all warehouses                                              |

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
- [CrupdateMaterial](docs/CrupdateMaterial.md)
- [CrupdateMaterialConsumption](docs/CrupdateMaterialConsumption.md)
- [CrupdateMaterialWarehouse](docs/CrupdateMaterialWarehouse.md)
- [CrupdateMonetaryMovement](docs/CrupdateMonetaryMovement.md)
- [CrupdateOtherExpense](docs/CrupdateOtherExpense.md)
- [CrupdateOtherExpenseType](docs/CrupdateOtherExpenseType.md)
- [CrupdatePurchase](docs/CrupdatePurchase.md)
- [CrupdateTask](docs/CrupdateTask.md)
- [CrupdateTaskSchedule](docs/CrupdateTaskSchedule.md)
- [CrupdateTeam](docs/CrupdateTeam.md)
- [CrupdateTravelEquipment](docs/CrupdateTravelEquipment.md)
- [CrupdateTravelExpense](docs/CrupdateTravelExpense.md)
- [CrupdateTravelMaterials](docs/CrupdateTravelMaterials.md)
- [CrupdateTravelPeople](docs/CrupdateTravelPeople.md)
- [CrupdateUser](docs/CrupdateUser.md)
- [CrupdateWarehouse](docs/CrupdateWarehouse.md)
- [Department](docs/Department.md)
- [EmployeeLeaveConfig](docs/EmployeeLeaveConfig.md)
- [EmployeePayment](docs/EmployeePayment.md)
- [EntityType](docs/EntityType.md)
- [Equipment](docs/Equipment.md)
- [EquipmentUsage](docs/EquipmentUsage.md)
- [ExpenseMoney](docs/ExpenseMoney.md)
- [History](docs/History.md)
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
- [Material](docs/Material.md)
- [MaterialConsumption](docs/MaterialConsumption.md)
- [MaterialUnit](docs/MaterialUnit.md)
- [MaterialWarehouseInfo](docs/MaterialWarehouseInfo.md)
- [MaterialWarehouseView](docs/MaterialWarehouseView.md)
- [MonetaryMovement](docs/MonetaryMovement.md)
- [NotAuthorizedException](docs/NotAuthorizedException.md)
- [OtherExpense](docs/OtherExpense.md)
- [OtherExpenseType](docs/OtherExpenseType.md)
- [PaymentType](docs/PaymentType.md)
- [Purchase](docs/Purchase.md)
- [PurchaseOperationEquipmentLine](docs/PurchaseOperationEquipmentLine.md)
- [PurchaseOperationMaterialLine](docs/PurchaseOperationMaterialLine.md)
- [PurchaseOperationRequest](docs/PurchaseOperationRequest.md)
- [PurchaseOperationTravel](docs/PurchaseOperationTravel.md)
- [ResourceNotFoundException](docs/ResourceNotFoundException.md)
- [Role](docs/Role.md)
- [ScheduleStatus](docs/ScheduleStatus.md)
- [Sex](docs/Sex.md)
- [Task](docs/Task.md)
- [TaskPriority](docs/TaskPriority.md)
- [TaskSchedule](docs/TaskSchedule.md)
- [Team](docs/Team.md)
- [TooManyRequestsException](docs/TooManyRequestsException.md)
- [TransportStatus](docs/TransportStatus.md)
- [TravelEquipment](docs/TravelEquipment.md)
- [TravelExpense](docs/TravelExpense.md)
- [TravelMaterials](docs/TravelMaterials.md)
- [TravelOperationEquipmentLine](docs/TravelOperationEquipmentLine.md)
- [TravelOperationMaterialLine](docs/TravelOperationMaterialLine.md)
- [TravelOperationPeopleLine](docs/TravelOperationPeopleLine.md)
- [TravelOperationRequest](docs/TravelOperationRequest.md)
- [TravelOperationTravel](docs/TravelOperationTravel.md)
- [TravelPeople](docs/TravelPeople.md)
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
  - Node.js
  - Webpack
  - Browserify
- Language levels
  - ES5 - you must have a Promises/A+ library installed
  - ES6
- Module systems
  - CommonJS
  - ES6 module system

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
