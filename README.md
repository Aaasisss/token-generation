# token-generation

A simple API built with express and nodejs that allows to generate users and
tokens.

Tokens are assigned to specific users, along with token expiry date(default 21 days), and all the data is stored in MongoDB.

<img width="911" alt="Screenshot 2022-11-20 at 6 04 56 pm" src="https://user-images.githubusercontent.com/42713799/202890163-745479b9-b237-4eb7-acdd-cf88d6196efe.png">


## run

- clone the repo
- run `npm run devStart`

#### endpoints

http://localhost:3000/users/  
http://localhost:3000/tokens/

to get specific data, append id in the url

http://localhost:3000/users/637445f6175ba5c9b7672010  
http://localhost:3000/tokens/637447e271923e559ccbf155
