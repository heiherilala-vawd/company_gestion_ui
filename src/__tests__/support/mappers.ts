import type {
  ExpenseMoney,
  CrupdateExpenseMoney,
  Job,
  CrupdateJob,
  Warehouse,
  CrupdateWarehouse,
  Equipment,
  CrupdateEquipment,
  Material,
  CrupdateMaterial,
  Company,
  CrupdateCompany,
  User,
  CrupdateUser,
  IncomeMoney,
  CrupdateIncomeMoney,
  Loan,
  CrupdateLoan,
  TravelEquipment,
  CrupdateTravelEquipment,
  TravelMaterials,
  CrupdateTravelMaterials,
  TravelPeople,
  CrupdateTravelPeople,
  EmployeePayment,
  CrupdateEmployeePayment,
  Purchase,
  CrupdatePurchase,
  BankFee,
  CrupdateBankFee,
  OtherExpense,
  CrupdateOtherExpense,
  TravelExpense,
  CrupdateTravelExpense,
  LoanRepayment,
  CrupdateLoanRepayment,
  IncomeType,
  CrupdateIncomeType,
  AuditUser,
} from '../../gen-ts/src'

export function toCrupdateExpenseMoneyMapper(expense: ExpenseMoney): CrupdateExpenseMoney {
  return {
    id: expense?.id,
    amount: expense.amount,
    description: expense.description,
    job_id: expense.job?.id,
    comment: expense.comment,
  }
}

export function toCrupdateJobMapper(job: Job): CrupdateJob {
  return {
    id: job?.id,
    company_id: job.company?.id,
    description: job.description,
    contract_signature_date: job.contract_signature_date,
    start_date: job.start_date,
    end_date: job.end_date,
    status: job.status,
    comment: job.comment,
  }
}

export function toCrupdateWarehouseMapper(warehouse: Warehouse): CrupdateWarehouse {
  return {
    id: warehouse?.id,
    name: warehouse.name,
    description: warehouse.description,
    job_id: warehouse.job?.id,
    comment: warehouse.comment,
  }
}

export function toCrupdateEquipmentMapper(equipment: Equipment): CrupdateEquipment {
  return {
    id: equipment?.id,
    name: equipment.name,
    description: equipment.description,
    warehouse_id: equipment.warehouse?.id,
    floor_number: equipment.floor_number,
    storage_number: equipment.storage_number,
    comment: equipment.comment,
  }
}

export function toCrupdateMaterialMapper(material: Material): CrupdateMaterial {
  return {
    id: material?.id,
    name: material.name,
    description: material.description,
    unit: material.unit,
    comment: material.comment,
  }
}

export function toCrupdateCompanyMapper(company: Company): CrupdateCompany {
  return {
    id: company?.id,
    name: company.name,
    rib: company.rib,
    description: company.description,
    company_type: company.company_type,
    comment: company.comment,
  }
}

export function toCrupdateUserMapper(user: User): CrupdateUser {
  return {
    id: user?.id,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    sex: user.sex,
    email: user.email,
    comment: user.comment,
    company_id: user.company_id,
  }
}

export function toCrupdateIncomeMoneyMapper(income: IncomeMoney): CrupdateIncomeMoney {
  return {
    id: income?.id,
    amount: income.amount,
    description: income.description,
    source_organization: income.source_organization,
    invoice_reference: income.invoice_reference,
    job_id: income.job?.id,
    income_type_id: income.income_type?.id,
    comment: income.comment,
  }
}

export function toCrupdateLoanMapper(loan: Loan): CrupdateLoan {
  return {
    id: loan?.id,
    amount: loan.amount,
    description: loan.description,
    lender: loan.lender,
    interest_rate: loan.interest_rate,
    start_date: loan.start_date,
    due_date: loan.due_date,
    job_id: loan.job?.id,
    comment: loan.comment,
  }
}

export function toCrupdateTravelEquipmentMapper(te: TravelEquipment): CrupdateTravelEquipment {
  return {
    id: te?.id,
    travel_id: te.travel?.id,
    equipment: te.equipment?.id,
    quantity: te.quantity,
    status: te.status,
    arrival_date: te.arrival_date,
    arrival_location: te.arrival_location?.id,
    comment: te.comment,
  }
}

export function toCrupdateTravelMaterialsMapper(tm: TravelMaterials): CrupdateTravelMaterials {
  return {
    id: tm?.id,
    travel_id: tm.travel?.id,
    material: tm.material?.id,
    quantity: tm.quantity,
    quantity_received: tm.quantity_received,
    arrival_date: tm.arrival_date,
    arrival_location: tm.arrival_location?.id,
    comment: tm.comment,
  }
}

export function toCrupdateTravelPeopleMapper(tp: TravelPeople): CrupdateTravelPeople {
  return {
    id: tp?.id,
    travel_id: tp.travel?.id,
    user_id: tp.user?.id,
    arrival_date: tp.arrival_date,
    arrival_location: tp.arrival_location?.id,
    comment: tp.comment,
  }
}

export function toCrupdateEmployeePaymentMapper(ep: EmployeePayment): CrupdateEmployeePayment {
  return {
    id: ep?.id,
    expense: ep.expense,
    employee_id: ep.employee?.id,
    payment_description: ep.payment_description,
    payment_type: ep.payment_type,
  }
}

export function toCrupdatePurchaseMapper(purchase: Purchase): CrupdatePurchase {
  return {
    id: purchase?.id,
    expense: purchase.expense,
    supplier: purchase.supplier,
    equipment: purchase.equipment?.id,
    material: purchase.material?.id,
    quantity: purchase.quantity,
    is_equipment: purchase.is_equipment,
  }
}

export function toCrupdateBankFeeMapper(bf: BankFee): CrupdateBankFee {
  return {
    id: bf?.id,
    expense: bf.expense,
    bank_name: bf.bank_name,
    description: bf.description,
  }
}

export function toCrupdateOtherExpenseMapper(oe: OtherExpense): CrupdateOtherExpense {
  return {
    id: oe?.id,
    expense: oe.expense,
    description: oe.description,
  }
}

export function toCrupdateTravelExpenseMapper(te: TravelExpense): CrupdateTravelExpense {
  return {
    id: te?.id,
    expense: te.expense,
    departure_location: te.departure_location,
    arrival_location: te.arrival_location,
    departure_date: te.departure_date,
    arrival_date: te.arrival_date,
  }
}

export function toCrupdateLoanRepaymentMapper(lr: LoanRepayment): CrupdateLoanRepayment {
  return {
    id: lr?.id,
    payment_date: lr.payment_date,
    amount: lr.amount,
    loan_id: lr.loan?.id,
    comment: lr.comment,
  }
}

export function toCrupdateIncomeTypeMapper(incType: IncomeType): CrupdateIncomeType {
  return {
    id: incType?.id,
    name: incType.name,
    description: incType.description,
    comment: incType.comment,
    company_id: incType.company_id,
  }
}

export function toAuditUserMapper(user: User): AuditUser {
  return {
    id: user?.id,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    sex: user.sex,
    email: user.email,
  }
}
