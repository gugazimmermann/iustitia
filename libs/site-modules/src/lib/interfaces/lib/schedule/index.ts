export interface ScheduleGetAllEventsInterface {
  officeId?: string;
}

export interface ScheduleFormDataEventInterface {
  formData: ScheduleEventInterface
}

export interface ScheduleEventInterface {
  id: string;
  startDate: Date;
  endDate: Date;
  fullDay: boolean;
  color: string;
  title: string;
  description: string;
  tenantId: string;
}
