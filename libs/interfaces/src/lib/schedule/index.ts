export interface ScheduleEventsInterface {
  id?: string;
  startDate?: Date;
  endDate?: Date;
  fullDay?: boolean;
  color?: string;
  title?: string;
  description?: string;
  userId?: string;
  officeId?: string;
  tenantId?: string;
}

export interface ScheduleEventsGetAllInterface {
  officeId?: string;
}

export interface ScheduleEventsFormDataInterface {
  formData: ScheduleEventsInterface
}
