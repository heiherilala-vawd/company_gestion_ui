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

| Class                  | Method                                                                                 | HTTP request                                                                                                           | Description                                                    |
| ---------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| _AuthApi_              | [**authLoginPost**](docs/AuthApi.md#authloginpost)                                     | **POST** /auth/login                                                                                                   | Login user                                                     |
| _AuthApi_              | [**authRegisterPost**](docs/AuthApi.md#authregisterpost)                               | **POST** /auth/register                                                                                                | Register a new user                                            |
| _AuthApi_              | [**authWhoamiGet**](docs/AuthApi.md#authwhoamiget)                                     | **GET** /auth/whoami                                                                                                   | Get current user                                               |
| _BankFeeApi_           | [**crupdateBankFees**](docs/BankFeeApi.md#crupdatebankfees)                            | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/bank_fees                                                     | Create new bank fees or update existing ones                   |
| _BankFeeApi_           | [**deleteBankFeeById**](docs/BankFeeApi.md#deletebankfeebyid)                          | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/bank_fees/{id}                                             | Delete bank fee by identifier                                  |
| _BankFeeApi_           | [**getBankFeeById**](docs/BankFeeApi.md#getbankfeebyid)                                | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/bank_fees/{id}                                                | Get bank fee by identifier                                     |
| _BankFeeApi_           | [**getBankFees**](docs/BankFeeApi.md#getbankfees)                                      | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/bank_fees                                                     | Get all bank fees                                              |
| _CompanyApi_           | [**crupdateCompanies**](docs/CompanyApi.md#crupdatecompanies)                          | **PUT** /companies                                                                                                     | Create new companies or update existing companies              |
| _CompanyApi_           | [**deleteCompanyById**](docs/CompanyApi.md#deletecompanybyid)                          | **DELETE** /companies/{id}                                                                                             | Delete a company by identifier                                 |
| _CompanyApi_           | [**getCompanies**](docs/CompanyApi.md#getcompanies)                                    | **GET** /companies                                                                                                     | Get all companies                                              |
| _CompanyApi_           | [**getCompanyById**](docs/CompanyApi.md#getcompanybyid)                                | **GET** /companies/{id}                                                                                                | Get company by identifier                                      |
| _EmployeePaymentApi_   | [**crupdateEmployeePayments**](docs/EmployeePaymentApi.md#crupdateemployeepayments)    | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/employee_payments                                             | Create new employee payments or update existing ones           |
| _EmployeePaymentApi_   | [**deleteEmployeePaymentById**](docs/EmployeePaymentApi.md#deleteemployeepaymentbyid)  | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/employee_payments/{id}                                     | Delete employee payment by identifier                          |
| _EmployeePaymentApi_   | [**getEmployeePaymentById**](docs/EmployeePaymentApi.md#getemployeepaymentbyid)        | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/employee_payments/{id}                                        | Get employee payment by identifier                             |
| _EmployeePaymentApi_   | [**getEmployeePayments**](docs/EmployeePaymentApi.md#getemployeepayments)              | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/employee_payments                                             | Get all employee payments                                      |
| _EquipmentApi_         | [**crupdateEquipment**](docs/EquipmentApi.md#crupdateequipment)                        | **PUT** /companies/{comp_id}/equipment                                                                                 | Create new equipment or update existing equipment              |
| _EquipmentApi_         | [**deleteEquipmentById**](docs/EquipmentApi.md#deleteequipmentbyid)                    | **DELETE** /companies/{comp_id}/equipment/{id}                                                                         | Delete equipment by identifier                                 |
| _EquipmentApi_         | [**getEquipment**](docs/EquipmentApi.md#getequipment)                                  | **GET** /companies/{comp_id}/equipment                                                                                 | Get all equipment                                              |
| _EquipmentApi_         | [**getEquipmentById**](docs/EquipmentApi.md#getequipmentbyid)                          | **GET** /companies/{comp_id}/equipment/{id}                                                                            | Get equipment by identifier                                    |
| _ExpenseApi_           | [**crupdateExpenses**](docs/ExpenseApi.md#crupdateexpenses)                            | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses                                                      | Create new expenses or update existing ones                    |
| _ExpenseApi_           | [**deleteExpenseById**](docs/ExpenseApi.md#deleteexpensebyid)                          | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{id}                                              | Delete expense by identifier                                   |
| _ExpenseApi_           | [**getExpenseById**](docs/ExpenseApi.md#getexpensebyid)                                | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{id}                                                 | Get expense by identifier                                      |
| _ExpenseApi_           | [**getExpenses**](docs/ExpenseApi.md#getexpenses)                                      | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses                                                      | Get all expenses                                               |
| _HistoryApi_           | [**getHistories**](docs/HistoryApi.md#gethistories)                                    | **GET** /histories                                                                                                     | Get modification history with filters                          |
| _IncomeApi_            | [**crupdateIncomes**](docs/IncomeApi.md#crupdateincomes)                               | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes                                                       | Create new incomes or update existing ones                     |
| _IncomeApi_            | [**deleteIncomeById**](docs/IncomeApi.md#deleteincomebyid)                             | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{id}                                               | Delete income by identifier                                    |
| _IncomeApi_            | [**getIncomeById**](docs/IncomeApi.md#getincomebyid)                                   | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{id}                                                  | Get income by identifier                                       |
| _IncomeApi_            | [**getIncomes**](docs/IncomeApi.md#getincomes)                                         | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes                                                       | Get all incomes                                                |
| _IncomeTypeApi_        | [**crupdateIncomeTypes**](docs/IncomeTypeApi.md#crupdateincometypes)                   | **PUT** /companies/{comp_id}/income_types                                                                              | Create new income types or update existing ones                |
| _IncomeTypeApi_        | [**deleteIncomeTypeById**](docs/IncomeTypeApi.md#deleteincometypebyid)                 | **DELETE** /companies/{comp_id}/income_types/{id}                                                                      | Delete an income type by identifier                            |
| _IncomeTypeApi_        | [**getIncomeTypes**](docs/IncomeTypeApi.md#getincometypes)                             | **GET** /companies/{comp_id}/income_types                                                                              | Get all income types for a company                             |
| _JobApi_               | [**assignUserToJob**](docs/JobApi.md#assignusertojob)                                  | **PUT** /companies/{comp_id}/jobs/{job_id}/users/{user_id}                                                             | Assign a user to a job                                         |
| _JobApi_               | [**crupdateJobs**](docs/JobApi.md#crupdatejobs)                                        | **PUT** /companies/{comp_id}/jobs                                                                                      | Create new jobs or update existing jobs                        |
| _JobApi_               | [**deleteJobById**](docs/JobApi.md#deletejobbyid)                                      | **DELETE** /companies/{comp_id}/jobs/{id}                                                                              | Delete a job by identifier                                     |
| _JobApi_               | [**getJobById**](docs/JobApi.md#getjobbyid)                                            | **GET** /companies/{comp_id}/jobs/{id}                                                                                 | Get job by identifier                                          |
| _JobApi_               | [**getJobResponsibleUsers**](docs/JobApi.md#getjobresponsibleusers)                    | **GET** /companies/{comp_id}/jobs/{job_id}/users                                                                       | Get responsible users for a job                                |
| _JobApi_               | [**getJobs**](docs/JobApi.md#getjobs)                                                  | **GET** /companies/{comp_id}/jobs                                                                                      | Get all jobs                                                   |
| _JobApi_               | [**unassignUserFromJob**](docs/JobApi.md#unassignuserfromjob)                          | **DELETE** /companies/{comp_id}/jobs/{job_id}/users/{user_id}                                                          | Unassign a user from a job                                     |
| _MaterialApi_          | [**crupdateMaterials**](docs/MaterialApi.md#crupdatematerials)                         | **PUT** /materials                                                                                                     | Create new materials or update existing materials              |
| _MaterialApi_          | [**deleteMaterialById**](docs/MaterialApi.md#deletematerialbyid)                       | **DELETE** /materials/{id}                                                                                             | Delete material by identifier                                  |
| _MaterialApi_          | [**getMaterialById**](docs/MaterialApi.md#getmaterialbyid)                             | **GET** /materials/{id}                                                                                                | Get material by identifier                                     |
| _MaterialApi_          | [**getMaterials**](docs/MaterialApi.md#getmaterials)                                   | **GET** /materials                                                                                                     | Get all materials                                              |
| _OtherExpenseApi_      | [**crupdateOtherExpenses**](docs/OtherExpenseApi.md#crupdateotherexpenses)             | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/other_expenses                                                | Create new other expenses or update existing ones              |
| _OtherExpenseApi_      | [**deleteOtherExpenseById**](docs/OtherExpenseApi.md#deleteotherexpensebyid)           | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/other_expenses/{id}                                        | Delete other expense by identifier                             |
| _OtherExpenseApi_      | [**getOtherExpenseById**](docs/OtherExpenseApi.md#getotherexpensebyid)                 | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/other_expenses/{id}                                           | Get other expense by identifier                                |
| _OtherExpenseApi_      | [**getOtherExpenses**](docs/OtherExpenseApi.md#getotherexpenses)                       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/other_expenses                                                | Get all other expenses                                         |
| _PurchaseApi_          | [**crupdatePurchases**](docs/PurchaseApi.md#crupdatepurchases)                         | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchases                                                     | Create new purchases or update existing ones                   |
| _PurchaseApi_          | [**deletePurchaseById**](docs/PurchaseApi.md#deletepurchasebyid)                       | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchases/{id}                                             | Delete purchase by identifier                                  |
| _PurchaseApi_          | [**getPurchaseById**](docs/PurchaseApi.md#getpurchasebyid)                             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchases/{id}                                                | Get purchase by identifier                                     |
| _PurchaseApi_          | [**getPurchases**](docs/PurchaseApi.md#getpurchases)                                   | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchases                                                     | Get all purchases                                              |
| _PurchaseOperationApi_ | [**createPurchaseOperation**](docs/PurchaseOperationApi.md#createpurchaseoperation)    | **POST** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchase_operations                                          | Register a purchase operation with optional travel             |
| _ReportApi_            | [**companiesCompIdYearlyReportGet**](docs/ReportApi.md#companiescompidyearlyreportget) | **GET** /companies/{comp_id}/yearly-report                                                                             | Get yearly report with job financials                          |
| _TravelEquipmentApi_   | [**crupdateTravelEquipment**](docs/TravelEquipmentApi.md#crupdatetravelequipment)      | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment         | Create new travel equipment or update existing ones            |
| _TravelEquipmentApi_   | [**deleteTravelEquipmentById**](docs/TravelEquipmentApi.md#deletetravelequipmentbyid)  | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment/{id} | Delete travel equipment by identifier                          |
| _TravelEquipmentApi_   | [**getTravelEquipment**](docs/TravelEquipmentApi.md#gettravelequipment)                | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment         | Get all travel equipment                                       |
| _TravelEquipmentApi_   | [**getTravelEquipmentById**](docs/TravelEquipmentApi.md#gettravelequipmentbyid)        | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment/{id}    | Get travel equipment by identifier                             |
| _TravelExpenseApi_     | [**crupdateTravelExpenses**](docs/TravelExpenseApi.md#crupdatetravelexpenses)          | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses                                               | Create new travel expenses or update existing ones             |
| _TravelExpenseApi_     | [**deleteTravelExpenseById**](docs/TravelExpenseApi.md#deletetravelexpensebyid)        | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{id}                                       | Delete travel expense by identifier                            |
| _TravelExpenseApi_     | [**getTravelExpenseById**](docs/TravelExpenseApi.md#gettravelexpensebyid)              | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{id}                                          | Get travel expense by identifier                               |
| _TravelExpenseApi_     | [**getTravelExpenses**](docs/TravelExpenseApi.md#gettravelexpenses)                    | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses                                               | Get all travel expenses                                        |
| _TravelMaterialsApi_   | [**crupdateTravelMaterials**](docs/TravelMaterialsApi.md#crupdatetravelmaterials)      | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials         | Create new travel materials or update existing ones            |
| _TravelMaterialsApi_   | [**deleteTravelMaterialsById**](docs/TravelMaterialsApi.md#deletetravelmaterialsbyid)  | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials/{id} | Delete travel materials by identifier                          |
| _TravelMaterialsApi_   | [**getTravelMaterials**](docs/TravelMaterialsApi.md#gettravelmaterials)                | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials         | Get all travel materials                                       |
| _TravelMaterialsApi_   | [**getTravelMaterialsById**](docs/TravelMaterialsApi.md#gettravelmaterialsbyid)        | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials/{id}    | Get travel materials by identifier                             |
| _TravelOperationApi_   | [**createTravelOperation**](docs/TravelOperationApi.md#createtraveloperation)          | **POST** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_operations                                            | Register a travel operation for equipment, materials or people |
| _TravelPeopleApi_      | [**crupdateTravelPeople**](docs/TravelPeopleApi.md#crupdatetravelpeople)               | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people            | Create new travel people or update existing ones               |
| _TravelPeopleApi_      | [**deleteTravelPeopleById**](docs/TravelPeopleApi.md#deletetravelpeoplebyid)           | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people/{id}    | Delete travel people by identifier                             |
| _TravelPeopleApi_      | [**getTravelPeople**](docs/TravelPeopleApi.md#gettravelpeople)                         | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people            | Get all travel people                                          |
| _TravelPeopleApi_      | [**getTravelPeopleById**](docs/TravelPeopleApi.md#gettravelpeoplebyid)                 | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people/{id}       | Get travel people by identifier                                |
| _UsersApi_             | [**crupdateUsers**](docs/UsersApi.md#crupdateusers)                                    | **PUT** /users                                                                                                         | Create new users or update existing users                      |
| _UsersApi_             | [**deleteUserById**](docs/UsersApi.md#deleteuserbyid)                                  | **DELETE** /users/{id}                                                                                                 | Delete a user by identifier                                    |
| _UsersApi_             | [**getUserById**](docs/UsersApi.md#getuserbyid)                                        | **GET** /users/{id}                                                                                                    | Get user by identifier                                         |
| _UsersApi_             | [**getUsers**](docs/UsersApi.md#getusers)                                              | **GET** /users                                                                                                         | Get all users                                                  |
| _WarehouseApi_         | [**crupdateWarehouses**](docs/WarehouseApi.md#crupdatewarehouses)                      | **PUT** /companies/{comp_id}/warehouses                                                                                | Create new warehouses or update existing warehouses            |
| _WarehouseApi_         | [**deleteWarehouseById**](docs/WarehouseApi.md#deletewarehousebyid)                    | **DELETE** /companies/{comp_id}/warehouses/{id}                                                                        | Delete a warehouse by identifier                               |
| _WarehouseApi_         | [**getWarehouseById**](docs/WarehouseApi.md#getwarehousebyid)                          | **GET** /companies/{comp_id}/warehouses/{id}                                                                           | Get warehouse by identifier                                    |
| _WarehouseApi_         | [**getWarehouses**](docs/WarehouseApi.md#getwarehouses)                                | **GET** /companies/{comp_id}/warehouses                                                                                | Get all warehouses                                             |

### Models

- [ApiException](docs/ApiException.md)
- [AuditFields](docs/AuditFields.md)
- [AuditUser](docs/AuditUser.md)
- [AuthResponse](docs/AuthResponse.md)
- [BadRequestException](docs/BadRequestException.md)
- [BankFee](docs/BankFee.md)
- [Comment](docs/Comment.md)
- [Company](docs/Company.md)
- [CompanyType](docs/CompanyType.md)
- [CrupdateBankFee](docs/CrupdateBankFee.md)
- [CrupdateCompany](docs/CrupdateCompany.md)
- [CrupdateEmployeePayment](docs/CrupdateEmployeePayment.md)
- [CrupdateEquipment](docs/CrupdateEquipment.md)
- [CrupdateExpenseMoney](docs/CrupdateExpenseMoney.md)
- [CrupdateIncomeMoney](docs/CrupdateIncomeMoney.md)
- [CrupdateIncomeType](docs/CrupdateIncomeType.md)
- [CrupdateJob](docs/CrupdateJob.md)
- [CrupdateMaterial](docs/CrupdateMaterial.md)
- [CrupdateMonetaryMovement](docs/CrupdateMonetaryMovement.md)
- [CrupdateOtherExpense](docs/CrupdateOtherExpense.md)
- [CrupdatePurchase](docs/CrupdatePurchase.md)
- [CrupdateTravelEquipment](docs/CrupdateTravelEquipment.md)
- [CrupdateTravelExpense](docs/CrupdateTravelExpense.md)
- [CrupdateTravelMaterials](docs/CrupdateTravelMaterials.md)
- [CrupdateTravelPeople](docs/CrupdateTravelPeople.md)
- [CrupdateUser](docs/CrupdateUser.md)
- [CrupdateWarehouse](docs/CrupdateWarehouse.md)
- [EmployeePayment](docs/EmployeePayment.md)
- [EntityType](docs/EntityType.md)
- [Equipment](docs/Equipment.md)
- [ExpenseMoney](docs/ExpenseMoney.md)
- [History](docs/History.md)
- [IncomeMoney](docs/IncomeMoney.md)
- [IncomeType](docs/IncomeType.md)
- [InternalServerException](docs/InternalServerException.md)
- [Job](docs/Job.md)
- [JobStatus](docs/JobStatus.md)
- [JobWithFinancials](docs/JobWithFinancials.md)
- [LoginRequest](docs/LoginRequest.md)
- [Material](docs/Material.md)
- [MaterialUnit](docs/MaterialUnit.md)
- [MonetaryMovement](docs/MonetaryMovement.md)
- [NotAuthorizedException](docs/NotAuthorizedException.md)
- [OtherExpense](docs/OtherExpense.md)
- [PaymentType](docs/PaymentType.md)
- [Purchase](docs/Purchase.md)
- [PurchaseOperationEquipmentLine](docs/PurchaseOperationEquipmentLine.md)
- [PurchaseOperationMaterialLine](docs/PurchaseOperationMaterialLine.md)
- [PurchaseOperationRequest](docs/PurchaseOperationRequest.md)
- [PurchaseOperationTravel](docs/PurchaseOperationTravel.md)
- [ResourceNotFoundException](docs/ResourceNotFoundException.md)
- [Role](docs/Role.md)
- [Sex](docs/Sex.md)
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
