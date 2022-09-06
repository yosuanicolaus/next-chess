export interface Message {
  id: string;
  text: string;
  name: string;
  uid: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  messages: Message[];
  createdAt: string;
}
