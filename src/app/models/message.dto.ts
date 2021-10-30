export interface Message {
  id: string;
  text: string;
  sender: string;
  from?: string;
}

export class MessageDto implements Message {
  public from?: string;

  constructor(public id: string, public text: string, public sender: string) {}
}
