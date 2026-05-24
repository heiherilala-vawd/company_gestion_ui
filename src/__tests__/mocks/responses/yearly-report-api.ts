/* eslint-disable @typescript-eslint/no-explicit-any */
import { YearlyReport, YearlyReportSummary, JobWithFinancials } from '../../../gen-ts/src'

export const yearlyReportMock: YearlyReport = {
  year: 2025,
  jobs_with_financials: [
    {
      job: {
        id: 'job1_id',
        description: 'Construction of Building A',
        status: 'IN_PROGRESS' as any,
      } as any,
      total_income: 500000,
      total_expense: 350000,
      net_profit: 150000,
    } as JobWithFinancials,
    {
      job: {
        id: 'job2_id',
        description: 'Hotel Renovation',
        status: 'PENDING_SIGNATURE' as any,
      } as any,
      total_income: 200000,
      total_expense: 180000,
      net_profit: 20000,
    } as JobWithFinancials,
  ] as JobWithFinancials[],
  summary: {
    total_income: 700000,
    total_expense: 530000,
    net_profit: 170000,
    job_count: 2,
    in_progress_job_count: 1,
  } as YearlyReportSummary,
}

export const yearlyReportEmptyMock: YearlyReport = {
  year: 2026,
  jobs_with_financials: [],
  summary: {
    total_income: 0,
    total_expense: 0,
    net_profit: 0,
    job_count: 0,
    in_progress_job_count: 0,
  } as YearlyReportSummary,
}
