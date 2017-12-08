# UNO-card-game

The UNO card game built in MERN stack. <br/>A online UNO card game version built with Node, React and SocketIO.<br/> The application consist mainly of three pages:
* [Home] In this page you can select or create a room to play
* [Hall] In this page you wait for more people join to that room to start the game, if needed. (theres a chat too)
* [Game] The actual game, in this page you play UNO with everyone in that room.

# Online Version
https://uno-card-game.herokuapp.com/

Since I am using heroku for free the app will take while to start, but it will be worth.

## WARNING
The project is not done yet... I would say:
* [Home] - 99% done
* [Hall] - 99% done
* [Game] - 99% done

## Getting Started

You can get a copy of this project up and running on your local machine using:

```
git clone https://github.com/pedrooaugusto/UNO-card-game.git
```

### Prerequisites

To install this project you need to have **Mongodb**, **NPM** and **Node** installed

### Installing

After cloning the repository follow the steps to get the app running

Install dependencies -server side

```
cd server
npm install
```

Install dependencies -client side

```
cd client
npm install
```

Starting the server -server side

```
cd server
node app.js
```

Starting the reat app -client side

```
cd client
npm start
```

After that you should have a Express server listening to port *3001* with a deployed version in *'/'* and a *DEV webpack server* in port *3000*. Using proxy the DEV version in port *3000* can make requests to the server in port *3001*.<br/>
You can see the deployed static version in *localhost:3001*, or the DEV version in *localhost:3000*.<br/>
You can see a online deployed version in **https://uno-card-game.herokuapp.com/**.


## Built With

* [MONGO] - Database used
* [Express] - Back end framework used
* [React] - Front end Framework used
* [Node] - Server side language used

## Authors

* **Pedro Augusto** - *Initial work* - [pedrooaugusto](https://github.com/pedrooaugusto)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE.md](LICENSE.md) file for details

