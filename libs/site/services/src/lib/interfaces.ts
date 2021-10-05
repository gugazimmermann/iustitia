export interface AttachmentFileRes extends File {
  originalname: string;
  buffer: Buffer;
}

export interface ApiMessageRes {
  message: string;
}

export interface ApiIdReq {
  id: string;
}

export interface ApiFormDataReq {
  formData: FormData;
}
