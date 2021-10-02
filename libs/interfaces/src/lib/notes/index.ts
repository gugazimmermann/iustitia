export interface NotesInterface {
  id?: string;
  date: string;
  title: string;
  content: string;
  tenantId?: string;
  ownerId?: string;
}

export interface NotesGetAllInterface {
  ownerId: string;
}

export interface NotesFormDataInterface {
  formData: NotesInterface;
}
