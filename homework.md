- create a respository

-Episode 05
-Multiple route Handlers
-next()
-next function and errors along with res.send()

- app.use("/route",rH1, rH2,rH3,rH4,rH5,rH6)
  time- 1:10:25 remaining

## Episode 11

-
-
- -create routes folder for managing auth, profile,req routes
  -create authRouter, profileRouter, requestRouter
  -import these routers in app.js

- -Create post/logout api
  -create patch/profile/edit api
  -create patch/profile/passward =>forgot password api
  -make validate all data in every post/patch(it is v vvv IM P)

## Episode -13

- write api with proper validartion for post/request/review/:status/:requestId
  -thought process- POST vs GET
  -Read about ref and populate https://mongoosejs.com/docs/populate.html
  -create GEt user/requests/received with all the checks
  -Create GET Get /users/connections

## Episode-14

-Logic for GET /feed APi
-explore the $nin,$and and $ne and other comparision operators
-Pagination

## Testing Data

{
"age":39,
"gender": "male",
"skills":["C","C++","Java","JavaScript","Python","JQuery","Dutch","Problem Solver","cooking","Painting","Running"]
}

{
"email": "dennis@gmail.com",
"password": "Dennis@123"
}

{
"firstName": "Dennis",
"lastName": "Ritchie",
"email": "dennis@gmail.com",
"password": "Dennis@123"
}

{
"email": "akshay@gmail.com",
"password": "Akshay@123"
}
