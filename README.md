
  # [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  # Social Network API

  ## Table of Contents
 - [Description](#description)
 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Test Instructions](#test-instructions)
 - [Credits](#credits)
 - [Questions](#questions)
  
  ## Description
  This is an API for a social network which allows interaction with Users, Thoughts and Reactions to Users Thoughts. It also supports the concept of Friends between Users. The API provides end points for all the CRUD operations on Users, Thoughts and Reactions to Thoughts. The application contains the Controller and Model part of a regular MVC application.

  Routing is done using Express.js and Node.js and the application uses Mongoose to interact with MongoDB where the data is stored. The application uses the package date-fns for date formatting.
  
  The application is developed using the following technologies:
  - Javascript
  - Node.js
  - Mongoose
  - MongoDB
  - Express.js
  - Date-fns

  The main challenge in developing this application was getting all the routes developed correctly and in the correct file structure using part of the MVC pattern. 


  ## Installation
  Ensure node is installed. Test by running 
  ```
  node -v
  ```

  To install this package run:
  ```
  npm install
  ```

  ## Usage
  To run this application ensure you are in the main social-network-api directory and run the command below
  
```
npm start
```
You should see the server startup message:

![Here is a screenshot showing the server started.](/images/server-start.png)

Once the server is running you can open Insomnia or a similar application to test the API endpoints:

GET routes for All Users and Thoughts:
```
/api/users
/api/thoughts
```
GET and DELETE routes for a single user or thought:
```
/api/users/:userId
/api/thoughts/:thoughtId
```
PUT routes for users and thoughts follow the above format with the below sample body content.

User:
```
{
  "username": "User One",
  "email": "user.one@mail.com.au"
}
```
Thought:
```
{
	"thoughtText": "This is thought ONE from user ONE",
	"username": "User One",
	"userId": "642965e18a8bad169ae4f4d4"
}
```
Friend routes follow the below format:
```
/api/users/:userId/friends/:friendId
```
Reaction routes follow the below format:
```
/api/thoughts/:thoughtId/reactions
```

Below is a sample of the date retrieved for a user. Note the thoughts, reactions, reactionCount, friends and friendCount:
![Here is a screenshot showing the home page.](/images/user.png)


  ## License
  This project is covered by the "The MIT License" license.
  For more details click on the link below:
  [License](https://opensource.org/licenses/MIT)
  
  
  ## Test Instructions
  The application can be tested by following the instructions above under the Usage section.


  ## Credits
  I would like to thank the instructors at UWA Bootcamp. 
  
  ## Questions
 If you have any questions or feedback please contact me. My details are below. As this is a learning challenge for me I would appreciate any feedback, or ideas for improvement.

 Github : https://github.com/HelenELee 

 Email : helenelee3@outlook.com
  
