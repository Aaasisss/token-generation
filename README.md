# token-generation

A token generation API built with express and nodejs that allows to generate users and
tokens.

## Features

[X] Create and Validate users  
[X] Generate and validated tokens

## How it works ?

Tokens are assigned to specific users, along with token expiry date(default 21 days), and all the encrypted (bcrypt) data is stored in MongoDB.

## Schema

<img width="911" alt="Screenshot 2022-11-20 at 6 04 56 pm" src="https://user-images.githubusercontent.com/42713799/202890163-745479b9-b237-4eb7-acdd-cf88d6196efe.png">

## Usage

- clone the repo
- run `npm run devStart`

#### endpoints

http://localhost:3000/users/  
http://localhost:3000/tokens/  
http://localhost:3000/auth/token_validation

to get specific data, append id in the url

http://localhost:3000/users/637445f6175ba5c9b7672010  
http://localhost:3000/tokens/637447e271923e559ccbf155

| METHOD | ENDPOINT                                    | DESC                                                                                   |
| ------ | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| GET    | http://localhost:3000/users/                | This method gives the list of users to get specific users, append user id to the url   |
|        | http://localhost:3000/tokens/               | This method gives the list of tokens to get specific token, append token id to the url |
| POST   | http://localhost:3000/users/                |                                                                                        |
|        | http://localhost:3000/tokens/               |                                                                                        |
|        | http://localhost:3000/auth/token_validation |                                                                                        |
| PUT    | http://localhost:3000/users/                |                                                                                        |
|        | http://localhost:3000/tokens/               |                                                                                        |
| DEL    | http://localhost:3000/users/                |                                                                                        |
|        | http://localhost:3000/tokens/               |                                                                                        |
