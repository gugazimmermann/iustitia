export interface AttachmentInterface {
  id: string;
  date: string;
  name: string;
  link: string;
}

export interface AttachmentGetAllInterface {
  ownerId: string;
}

export interface AttachmentCreateInterface {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUploadProgress: any;
}

