# place-mapz

PlaceMapz helps you find whatever you're looking for near you. It utilizes the Google Places API to find whatever you're interested in finding nearby.

### Tech Stack
[Angular](https://angularjs.org/)
[Karma](http://karma-runner.github.io/1.0/index.html)
[Gulp](http://gulpjs.com/)

##Development
You'll need an API key for [Google Places](https://developers.google.com/places/web-service/get-api-key)
Add key to the config file in `/client/config`, following the format of the example files. Remove `-example` from the filename.

Ensure all [dependencies](#installing-dependencies) are installed then run npm start to bring up an http-server. From within the root directory:
```
npm install -g http-server
npm install
npm start
```
Recommended browser is Chrome. In order for the Google API to allow access to the origin, you must enable cross-origin resource sharing from your browser. Add this chrome extension: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

Then, enable the extension in your settings and turn on "enable cross-origin resource sharing."

Visit the http address provided by the server followed by /client/index.html in the browser.
i.e.
```
http://127.0.0.1:8080/client/index.html
```

##Testing
Comes with a suite of tests in /spec
directory. Run from the root directory:
```
npm test
```

##Usage
Once the app loads, you can enter whatever you like into the input field where it asks "What are you looking for?" The Find button is disabled until something is entered in the input field and the map is finished loading. Click "Find!" to search for something via the Google Places API. An alert will pop up if the API was unable to return any results. Markers will then be shown on the Google Map with labels for each item in the list of results. A list is shown below the map, and you may click on one to view advanced details. From the Advanced Details dialog, you can visit the website of the place you are interested in or search for similar places. Next to the "Find" button is the "Recent Searches" button which pulls up a side bar of all your recent searches. you can click on them to view those search results again.
