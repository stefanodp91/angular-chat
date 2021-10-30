import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models/message.dto';

@Injectable({
  providedIn: 'root',
})
export class DbServiceService {
  constructor(private http: HttpClient) {}

  sendMessage(message: Message): Observable<Array<Message>> {
    return this.http?.post(`http://localhost:3000/messages/`, {
      message: message,
    }) as Observable<Array<Message>>;
  }

  getMessages(): Observable<Array<Message>> {
    return this.http?.get('http://localhost:3000/messages')?.pipe(
      map((messagesObj) => {
        // deserialize json server reponse to make the result compatible with the client app
        let messages = Array<Message>();
        for (const [key, value] of Object.entries(messagesObj)) {
          let message = value['message'] as Message;
          messages?.push(message);
        }
        // return messages
        return messages;
      })
    );
  }
}
