/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TaskSchedule {
  id?: string
  task_id?: string
  scheduled_date?: any
  start_time?: string
  end_time?: string
}

export const taskSchedule1Mock: TaskSchedule = {
  id: 'ts1_id',
  task_id: 'task1_id',
  scheduled_date: '2025-06-10' as any,
  start_time: '09:00',
  end_time: '12:00',
}

export const taskSchedule2Mock: TaskSchedule = {
  id: 'ts2_id',
  task_id: 'task1_id',
  scheduled_date: '2025-06-12' as any,
  start_time: '14:00',
  end_time: '17:00',
}

export const taskSchedulesMock: TaskSchedule[] = [taskSchedule1Mock, taskSchedule2Mock]

export const crupdateTaskSchedulesMock: TaskSchedule[] = [
  {
    id: 'ts1_id',
    task_id: 'task1_id',
    scheduled_date: '2025-06-11' as any,
    start_time: '09:00',
    end_time: '13:00',
  },
  {
    id: 'ts3_id',
    task_id: 'task2_id',
    scheduled_date: '2025-06-18' as any,
    start_time: '08:00',
    end_time: '12:00',
  },
]

export const createOrUpdateTaskSchedules = (schedules: TaskSchedule[]): TaskSchedule[] => {
  return schedules.map((s) => ({
    ...s,
    id: s.id || 'new_ts_id',
  }))
}
