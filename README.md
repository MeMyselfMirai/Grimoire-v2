# CSH Grimoire v2

A digital implementation of the Grimoire, a tool used by Storytellers running the game [Blood on the Clocktower](https://bloodontheclocktower.com). 

You can find it online at [grimoire.cs.house](https://grimoire.cs.house).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running as dev

In the project directory, you can run:

`npm ci` 
`npm start`

To run the app in development mode. 
If a webpage doesn't open automatically, go to [http://localhost:3000](http://localhost:3000) to view it in your browser.

See React development for more information.

## Deloying

A dockerfile is available for deployment. To build a deployment image, run:

`docker build -t grimoire --target prod`
`docker run grimoire -p 8080:8080`

And the project can be viewed at [localhost](http://localhost). 


