import { Request } from 'express';

export interface AttachmentFileInterface extends File {
  originalname: string;
  buffer: Buffer;
}

export interface UserRequest extends Request {
  userId: string;
  file: AttachmentFileInterface;
  files?: AttachmentFileInterface[];
};

export interface ApiMessageInterface {
  message: string;
}

export interface ApiIdInterface {
  id: string;
}

export interface ApiFormDataInterface {
  formData: FormData;
}
