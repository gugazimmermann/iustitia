export interface NotesGetAllInterface {
  ownerId: string;
}

export interface NotesFormDataInterface {
  formData: NoteInterface;
}

export interface NoteInterface {
  id?: string;
  date: string;
  title: string;
  content: string;
  tenantId?: string;
  ownerId: string;
}
