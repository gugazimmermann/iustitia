export interface AttachmentsInterface {
  id: string;
  date: string;
  name: string;
  link: string;
  ownerId?: string;
}

export interface AttachmentsGetAllInterface {
  ownerId: string;
}

export interface AttachmentsCreateInterface {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUploadProgress: any;
}
