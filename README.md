# liri-node-app
This is a app that works on the terminal and that shall help you find information on movies but run spotify or 
show a tweet etc. 

To make this run, go to OMDB and get access to the API Key. They Shall provide you something like shown below:

```
exports.twitterKeys = {
  consumer_key: 'Some Key',
  consumer_secret: 'Some Key',
  access_token_key: 'Some Key',
  access_token_secret: 'Some Key',
}

exports.omdb = {
  lock: "Some Key",
}

```
once you get the key. Simply create a keys.js file and paste it in there.

install the dependencies

```
npm install

```

and then simply run node.
