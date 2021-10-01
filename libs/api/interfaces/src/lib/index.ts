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
