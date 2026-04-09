export interface IMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  content: string;
  createdAt: string;
}

export interface ICreateMessageRequest {
  name: string;
  email: string;
  subject: string;
  content: string;
}
