                                                                -------------------------------
                                                                    Assignment-4 
                                                                    Name: Shrey Amin
                                                                    Course: CSCI-5709
                                                                    Banner-ID: B00822245
                                                                    Project:- RateMyDalCourse
                                                                -------------------------------
                                                                
----------------------------------------------------------------------------------------------------------------------------------------
Project Links
----------------------------------------------------------------------------------------------------------------------------------------

 Git repository link:- https://git.cs.dal.ca/chintan/ratemydalcourse_group3
 Feature branch:- registration_shrey_amin
 Bluenose application link:- http://129.173.22.34:20002
 Files related to feature:- registration.component.ts
                            registration.component.html
                            register.service.ts
                            course.service.ts
                            server.js
                            routes.js
Database used:- Mongo Atlas

Further, use word wrap option in the editor to view the file in a proper format
----------------------------------------------------------------------------------------------------------------------------------------
What Is RateMyDalCourse?
----------------------------------------------------------------------------------------------------------------------------------------

RateMyDalCourse is a platform for computer science students for exploring different courses and participate in the course discussion forum. It is an ideal portal for undergraduate, graduate and students who are interested in pursuing further studies in the computer science department of Dalhousie University. Students can set up their accounts by selecting the courses they have already completed. Then, they can rate the courses, share their learning experience and provide information regarding the course. Further, they can solve their doubts and queries regarding the courses they wish to take in the future terms by participating in the course discussion forum. In this, way students can connect with their peers and seniors to get detailed information about any computer science course. Thus, based on ratings and feedback of the course, students can figure out whether a particular course is worth taking or not.

------------------------------------------------------------------------------------------------------------------------------------------------
Steps to setup folder structure and its related dependencies
------------------------------------------------------------------------------------------------------------------------------------------------

1) Git clone the project "rateMyDalCourse_group3" using Clone with HTTPS URL: https://git.cs.dal.ca/chintan/ratemydalcourse_group3.git into your local machine using the command "git clone <url>".

2) Feature branch for the project is "registration_shrey_amin". From the local repository, switch to feature branch using the command
 "git checkout registration_shrey_amin".

3) Install "node" in your local machine along with "Angular/cli".

4) Then follow the steps mentioned below:-
    - Navigate to folder "Group3_Tech_Intellect".
	- Install node modules in the current directory using the command "npm install". This will install and upgrade the existing node modules for the frontend part for the web application. 
    - Then navigate to the backend folder "server" and install the node modules using the same command "npm install". This folder contains two files. The first is "server.js" which is used to create the server and importing the required modules. 
    - The second file is in the "routes" folder called "routes.js". This file defines all the endpoints and functionalities to handle HTTP request from the client by accessing MongoDB database created on "Mongo Atlas".

------------------------------------------------------------------------------------------------------------------------------------------------
Steps to start frontend and backend of the web application
------------------------------------------------------------------------------------------------------------------------------------------------

Following are the steps required to start the frontend and backend part of the application.
1. Open the first terminal window in the directory "Group3_Tech_Intellect".
2. Execute the command "npm start" or "ng serve" to start the frontend of the application in the web browser.
3. Open the second terminal window in the "server" directory.
4. Execute the command "node server.js" to start the backend server and establishing connection to the mongodb database on mongo atlas. You can also use install "nodemon" module by running "npm install -g --save nodemon" and then start the server by executing command "nodemon server.js".

------------------------------------------------------------------------------------------------------------------------------------------------
How to interact with the feature?
------------------------------------------------------------------------------------------------------------------------------------------------

The registration feature is used to create an account or profile for new students. The account details are stored in central database which can be used for carrying out other necessary activities on our web application.

Following are the steps for registering into our web application:-

1. The first step is to open the home page of our application. 
2. Then, click on the "Register" option on the navigation bar.
3. Fill the fields shown in the registration form. All the fields are mandatory.
4. Click the submit button to create the user account. 
5. On successful registration, feedback will be displayed from the server and you can then login into your course dashboard.

------------------------------------------------------------------------------------------------------------------------------------------------
Workflow of the feature
------------------------------------------------------------------------------------------------------------------------------------------------

The overall flow of the feature is described below:

1. Dropdown menu of courses on the registration form is dynamically populated.
2. User will have to fill the registration form.
3. Form data will be validated using client-side validations.
4. User details will be stored in a unique user model.
5. Web service for register activity will send data to the server in the form of a POST request.
6. If the user is not registered then the details will be stored in "User" collection in the MongoDB database server and response will be sent.
7. If the user is already registered then an error message will be shown.

------------------------------------------------------------------------------------------------------------------------------------------------
Technologies used
------------------------------------------------------------------------------------------------------------------------------------------------

1. HTML5 and CSS3 [1]
   HTML is used to define the structure and layout of the web pages. I have used HTML 5 for designing the web pages. Apart from this, I have used CSS 3 for styling the HTML elements and adding different animations.

2. Bootstrap-4 [1]
   It open source front-end framework and it simplifies the process of web development. For this assignment, I have used bootstrap version 4. Bootstrap is used along with HTML and CSS. It provides predefined classes for creating grid layout, cards, navigation menu, forms etc. I have used the grid layout for framing the structure of my web pages. Additionally, bootstrap helps a novice user to create responsive web design very easily using predefined classes and UI components. Moreover, I have also used CSS classes and different properties along with bootstrap to create layouts with rich UI and animations. 

3. MEAN (MongoDB, Express, Angular, NodeJs) stack framework [2]
   MEAN is a full-stack development toolkit used to develop a fast and robust web application. Here, a module called Express will be used as the backend framework and Angular will be used as the frontend framework.

------------------------------------------------------------------------------------------------------------------------------------------------
W3C compliance check
------------------------------------------------------------------------------------------------------------------------------------------------

All the web pages are W3C compliant and it follows proper naming and coding convention. I have checked W3C compliancy of the HTML and CSS files associated with my registration feature.

------------------------------------------------------------------------------------------------------------------------------------------------
References
------------------------------------------------------------------------------------------------------------------------------------------------

-------------------------------
Websites and Coding tutorials
-------------------------------

[1]  S. Amin, "Assignment-1", CSCI5709 – Advanced Web Services, 2019. 

[2]  S. Amin, "Assignment-3", CSCI5709 – Advanced Web Services, 2019. 

[3]  "Angular 8 Tutorial - YouTube", YouTube, 2019. [Online]. Available: https://www.youtube.com/playlist?list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ

[4]  "Node.js + Express - Tutorial - Insert and Get Data with MongoDB", YouTube, 2019. [Online]. Available: https://www.youtube.com/watch?v=ZKwrOXl5TDI

[5]  Guru99.com, 2019. [Online]. Available: https://www.guru99.com/node-js-mongodb.html

[6]  "Connect via Driver — MongoDB Atlas", Docs.atlas.mongodb.com, 2019. [Online]. Available: https://docs.atlas.mongodb.com/driver-connection/

[7]  "The W3C Markup Validation Service", _Validator.w3.org_, 2019. [Online]. Available: https://validator.w3.org/#validate_by_upload

[8]  F. Akogun, "Caesars Cipher Algorithm (Javascript) - Codeniro", Codeniro, 2019. [Online]. Available: http://codeniro.com/caesars-cipher-algorithm-javascript/

