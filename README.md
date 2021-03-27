# Issue Tracking Map

React app created with UI5 Web Components, Google Maps and Context API for state management. Google Firebase is used for backend with data stored in Firestore.

## Demo

[Deployed on Heroku](https://issue-tracking-map.herokuapp.com/)

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [Context API w/ hooks](https://reactjs.org/docs/context.html) - State management
- [UI5 Web Components](https://sap.github.io/ui5-webcomponents-react/) - Fiori component library
- [Google Maps API](https://developers.google.com/maps) - Google Maps integration
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation) - Browser geolocation
- [React Router](https://reactrouter.com/) - General routing & navigation
- [Styled Components](https://www.styled-components.com/) - UI styling library

#### Back-end

- [Google Firebase](https://firebase.google.com/) - Backend development platform by Google
- [Google Firestore](https://cloud.google.com/firestore) - NoSQL document database

## Features

- Authentication (login/register w/ username & password)
- OAuth with Google account
- View all open issues
- View and add comments on issues
- View location of issues on map
- Add new issue by selecting location on map

## Screenshots

#### Desktop/Tablet

![Desktop-1](https://github.com/tylersanderson/issue-tracking-map/blob/main/screenshots/desktop1.jpg)
![Desktop-2](https://github.com/tylersanderson/issue-tracking-map/blob/main/screenshots/desktop4.jpg)
![Desktop-3](https://github.com/tylersanderson/issue-tracking-map/blob/main/screenshots/desktop2.jpg)
![Desktop-3](https://github.com/tylersanderson/issue-tracking-map/blob/main/screenshots/desktop3.jpg)

#### Mobile

![Mobile-1](https://github.com/tylersanderson/issue-tracking-map/blob/main/screenshots/mobile1.jpg)
![Mobile-2](https://github.com/tylersanderson/issue-tracking-map/blob/main/screenshots/mobile2.jpg)
![Mobile-3](https://github.com/tylersanderson/issue-tracking-map/blob/main/screenshots/mobile3.jpg)
![Mobile-4](https://github.com/tylersanderson/issue-tracking-map/blob/main/screenshots/mobile4.jpg)

## Usage

#### Env variable:

Create a .env file in server directory and add the following:

```
REACT_APP_GOOGLE_MAPS_API_KEY = "your api key here"

```

#### Client:

Run client development server:

```
cd client
npm install
npm start
```
