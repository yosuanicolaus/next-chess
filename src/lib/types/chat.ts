export interface Message {
  text: string;
  name: string;
  uid: string;
  createdAt: string;
}

export interface Chat {
  [messageID: string]: Message;
}
