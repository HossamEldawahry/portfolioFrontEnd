export interface IMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  content: string;
  createdAt: string;
  status?: string;
  isRead?: boolean;
}

export interface ICreateMessageRequest {
  name: string;
  email: string;
  subject: string;
  content: string;
}
