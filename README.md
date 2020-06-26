A fully functioaning google docs clone with built in support for rich text editing, templated documents, live collaboration with other users and more.

## Demo
I do intend to host this somewhere someday, but for now this we'll have to do with this gif.

![Output sample](https://drive.google.com/uc?export=view&id=1-llMdndKs9Juz990gWR69hY37XoV8cXI)

## Built with
* Love
* React coupled with Semantic React
* Redux and redux-thunk
* React-Hook-Forms
* Express
* MongoDB coupled with Mongoose
* NEDB for in memory database coupled with camo ORM
* SocketIO.
* Axios
* Slate-React for creating the rich text editor. Kudos to the guys at Slate, this is a gem of a library
* Sendgrid for managing emails.


## Technical discussion and considerations

* It might be noticed that there is usage of React's context API along with the global redux store. This architecture is based on the fact that state should be kept as near to the consumers of the state as possible. Moreover, the global state should only contain things that are actually global. Since we need a context for sharing state only on the editor page and the fact that this state changes very frequently, a store with react's context api was created.

* NEDB was used as an in memory database for caching purposes to improve performance because otherwise each keystroke of the user will incur a call to the actual mongo db. One might argue that the state of the editor should be kept on the client and then sent to server as a whole when the user has finished edititng. This is certainly true when we have only one user editing a document at a time, but in our case we have live synchronization among multiple users which means that each change at one client must be broadcasted to socket IO which then broadcasts it to other clients. One way of handling this is by making each client send its editor state to socketIO when it exits and then by keeping a count of clients on server side, when the last client exits, we use it's state to update the db. This approach will work but it has one fatal flaw, in case the last client loses connection unexpectedly and is not able to broadcast it's latest state then this state will be lost. In conclusion, the latest state of a document must be kept in the server as well and an in memory datastructure serves this pupose well.

[![Kaghaz-Architecture.png](https://i.postimg.cc/3Jxc7jZB/Kaghaz-Architecture.png)](https://postimg.cc/z34jFg6b)

* As for some project strucutre discussion, while developing the project I was of the opinion that API calls must be in the same component that actually make the call (thus we don't even redux-thunk, since we dispatch the actions after calling the API based on Dan Abramov's amazing discussion [here](https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559)), however, in hindsight I believe that refactoring all API calls into a common file/folder make the project more structured.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Pre-Requisites
* Have node installed.
* Have either mongo db installed lovally or running on a cloud (mongo db Atlas is a good option for development and was the one used to build this project)
* Clone the repository.
* Run `npm install` in both client and server folders separately.

### Building

Change the `mongoURI` field in `constants.js` to the url of your own mongo server.

Create a file named `constants.private.js` in your server folder. This file holds API keys and other cosntants that should not be kept private. To run the project you must export an object that has the following properties.

```json
{
    mongoUsername: "username in case of atlas.",
    mongoPassword: "password in case of atlas.",
    jwtSecret: "your jwt secret key.",
    sendgridKey: "sendgrid API key"
}
```

Only the jwtSecret is a requirement, the rest depend on how you set up your mongo server, and whether or not you enable emailing.

### Development Build


```
// in the server folder, serves on 8080.
node server.js 
// in the client folder
npm start, serves on 3000.
```

The requests from client to server have been proxied so CORS won't be an issue while developing.

### Production Build

In the client folder, run `npm run build` which will output a production level build. The server doesn't need to be modified, it will return this build on home route ("/")


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can find more details of common tasks available [here](https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/readme.md)
