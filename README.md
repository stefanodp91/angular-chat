# ChatApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Client

Run two instances of the application to different ports like this:

Run `ng serve --port 4200` for a dev server. Navigate to `http://localhost:4200/`.
Run `ng serve --port 4200` for a dev server. Navigate to `http://localhost:4300/`.

The app will automatically reload if you change any of the source files.

## Server

Install json-server from `https://www.npmjs.com/package/json-server`

Move to `/src/assets ` folder and start the json server with `run json-server --watch db.json`

Angular application will reload if it detects any change in the files being watched inside assets folder. This allows to reload every time a new message is received.

This will start the rest to the `http://localhost:3000/`

Follow the `https://www.npmjs.com/package/json-server` to customize the server provider under `src/app/providers/db-service`

### Reset database

It is possible to edit the `database db.json`.
Just copy and past the following code withint that file to restore it

```json
{
  "messages": []
}
```
