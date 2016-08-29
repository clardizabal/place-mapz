# place-mapz

PlaceMapz helps you find whatever you're looking for near you. It utilizes the Google Places API to find whatever you're interested in finding nearby.

### Tech Stack
[Angular](https://angularjs.org/)

##Usage
You'll need API keys for [Google Places](https://developers.google.com/places/web-service/get-api-key)
Add key to the config file in `/client/config`, following the format of the example files. Remove `.example` from the filename.

Ensure all [dependencies](#installing-dependencies) are installed then run npm start to bring up an http-server. From within the root directory:
```
npm install -g http-server
npm install
npm start

```
Visit the http address provided by the server followed by /client/index.html in the browser.
i.e.
```

http://127.0.0.1:8080

```

##Testing
Comes with a suite of tests in /spec directory. Run from the root directory:
```

npm test

```
