import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Message, MessageDto } from 'src/app/models/message.dto';
import { User, UserDTO } from 'src/app/models/user.dto';
import { DbServiceService } from 'src/app/providers/db-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // input fields
  form = this.formBuilder.group({
    inputField: '',
  });

  messages: Array<Message> = Array();

  loggedUser?: User;

  constructor(
    private formBuilder: FormBuilder,
    public dbService: DbServiceService
  ) {
    this.performLogin();
  }

  ngOnInit(): void {
    // read messages from local db
    this.dbService?.getMessages()?.subscribe((messages: Array<Message>) => {
      console.log('messages', messages);
      this.messages = messages;
    });
  }

  // mock a login
  private performLogin() {
    const id = `${window?.location?.port}`; // implicit convert to string
    // use the port of the localserer as unique user id
    let mockedDisplayName = id === '4200' ? 'Jason Statham' : 'Chuck Norris';
    this.loggedUser = new UserDTO(id, mockedDisplayName);
    console.log('loggedUser:', this.loggedUser);
  }

  onSubmit(): void {
    // create and add message
    const message = this.createMessage();
    // simulate sending
    this.dbService?.sendMessage(message)?.subscribe((response) => {
      console.log('response', response);
    });
    this.form?.reset(); // reset input field
  }

  private createMessage(): Message {
    const id = this.makeid(20);
    const text = this.form?.value?.inputField;
    const sender = this.loggedUser?.id;
    if (!sender) {
      throw new Error('LOGGED USER ID IS NULL. CANNOT EVALUATE SENDER');
    }
    return new MessageDto(id, text, sender);
  }

  // utils to generate random uid
  private makeid(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
