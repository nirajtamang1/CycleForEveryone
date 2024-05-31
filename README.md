**Cycle Booking System**
**Live URL:**

Backend(URL): https://userauthenticationsystem-1xf9.onrender.com

Frontend(URL): https://cycle-for-everyone.vercel.app/

Admin(id)

•	email: admin1

•	password: admin1

Note: First open the backend URL after backend URL open completely open frontend URL so that the application will run smoothly.


**Project Structure:** 

**Backend project Structure**

•	config: data base connection

•	controller: all the logic for the routes

•	helpers: logic for the hashing password and comparing password

•	middleware: Token verification

•	models: mongoose schemas and model

•	routes: endpoints for the function

•	server.js: Entry point for the backend server


**Frontend project Structure**

•	public: Static file such as index.html

•	src: source code for the react application.

•	components: reusable components 

•	Admin: Displaying the user information for the admin only

•	Auth:  Authenticated the user information

•	Layout: Link for the navigation

•	Pages: Components for the different pages

•	context: creating the context API so that the information present in context API can access all the files.

•	App.js: Main page for the react routing 

•	Index.css: Designing the webpages.

•	Index.js : Entry point for the react application.


**Running the project Locally**

**Prerequisites:**

•	Node.js Installed

•	MongoDB installed and running


**Backend Setup**
1. Navigate to the backend directory
   
•	Using command: cd backend

2.  Install all the dependencies:
   
•	Using command: npm install

3. Set the environment variable
   
Create the “.env” file in the backend directory

Add the following variables.

•	PORT : 8080

•	MONGO_URL : your MongoDB URL

•	JWT_SECRECT: create secret key for eg: akdsnlflkadfnkl2849!#$$

•	FRONTEND_URL: your frontend URL

4. Run the server
   
•	Using command: npm run dev

Now your server will be running on the port in 8080 or whatever port you are given.

 
**Frontend Setup:**

1. Navigate to frontend directory.
   
•	Using command: cd frontend

2. Install all the dependencies
   
•	Using command: npm install

3. Set the environment variable
   
Create the “.env” file in the frontend directory

Add the following variables.

•	REACT_APP_API_URL: your backend URL

4. Run the React application
   
•	Using command: npm start

Now your react application is running on the “http://localhost:3000”
