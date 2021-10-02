export interface AttachmentFileInterface extends File {
  originalname: string;
  buffer: Buffer;
}

export interface ApiMessageInterface {
  message: string;
}

export interface ApiIdInterface {
  id: string;
}

export interface ApiFormDataInterface {
  formData: FormData;
}
