# token-generation
A simple API built with express and nodejs that allows to generate users and
tokens.  

Tokens are assigned to specific users, along with token expiry date(default 21 days), and all the data is stored in MongoDB.  

<img width="1123" alt="Screenshot 2022-11-16 at 5 54 34 pm" src="https://user-images.githubusercontent.com/42713799/202106940-d2278e5e-237c-4a58-a9af-b63978b5372a.png">  

## run
- clone the repo  
- run `npm run devStart`

#### endpoints
http://localhost:3000/users/  
http://localhost:3000/tokens/  

to get specific data, append id in the url  

http://localhost:3000/users/637445f6175ba5c9b7672010  
http://localhost:3000/tokens/637447e271923e559ccbf155  



