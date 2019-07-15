 								+++++++++++++++++++
                                                                RateMyDalcourse Website
                                                                +++++++++++++++++++

Git link :- https://git.cs.dal.ca/chintan/ratemydalcourse_group3

Barnch Name:- feature/SearchCourse

Bluenose Link:- http://129.173.22.35:17555

============================================================================================================================================
What Is RateMyDalcourse?
============================================================================================================================================

RateMyDalcourse is web application which provides guidance and information to students regarding various courses of Computer Science at Dalhousie University. The application will be referred to as “RateMyDalcourse.” It is not only helpful to the existing students of the Dalhousie University but also provide insight into multiple courses to the students who want to pursue their Graduation in Computer Science at Dalhousie University. Students can rate the professor as well as courses which they have completed in their previous terms and also join and participate in the discussion forum of any subjects in which they are interested in.

============================================================================================================================================
Steps to install 
============================================================================================================================================

1) Git clone the project using Clone with HTTPS URL : https://git.cs.dal.ca/chintan/ratemydalcourse_group3 into local 
repository through command--> git clone <URL>
2) Feture branch for the project is "feature/SearchCourse". 
3) If you are using visual code please follow the below commands
   Install node modules in the Group3_Tech_Intellect directory using command --> npm install  . 


============================================================================================================================================
Steps to run Project
============================================================================================================================================

1)First create the terminal from the "+" sign in terminal section. Two terminals are needed as we are using database server and localhost
2)In the first terminal use the command in the Group3_Tech_Intellect directory --> npm start <-- which will run the commnd ng serve. If it does not work, use the alternative  command --> ng serve -o <--- for opening the website in browser. This will load the frontend in the angular (port 4200). 
3)In the second terminal, go to the server directory. Use command --> npm start <-- to connect to
database. If the command doesn't work use the alternative command --> node server.js <-- to connect to database. ( port 3000)


=================================================================================================================================================
How to Interact with the feature?
=================================================================================================================================================

Feature 1 :- search course from dynamically loading dashboard and filtering cards

Feature description:- The feature is implemented on the dashboard page Which can be accessed after either login (username:-deep.shah_4@yahoo.com password:- deep@1234)
or directly accessing the dashboard page using (http://localhost:4200/dashboard) or (http://129.173.22.35:17555/dashboard).This will dynamically load the subjects on dashboard from the database in the form of cards.
--> Cards are divided in two categories. 
	1) courses that user has completed 
	2) All the courses.
--> Apart form dynamically loading the dashboard, this feature provides search option to the user by filtering the cards.
--> On the navigation bar, there is a search box and search button is present.
--> When user enters the course code or course name in the search box and click on the search button it will filter the cards and display the courses as per the search string.
--> If searched course is not found then proper error message is displayed on the dashboard.
--> Validations and Alerts are displayed for the special characters in the input string.
--> For ex. if user enter's search string as 'data' and click on the search button it will display the courses as CSCI001 Data Science and CSCI5308 Big Data.

Feature 2:- Display Overall Rating

--> User can check overall rating of the course from the All courses categories on the Course Dashboard page.
--> Users can click on the discuss button for any course to check overall rating of the course which redirect them on discussion forum page and display the overall rating (Average of all the rating given to the course).
--> For ex. If user clicks on the discuss button(Dashboard page) of CSCI5709 Web Technology it will show Overall Rating: 5.0 on the discussion forum page.
--> If no rating is present for the course then it will display No Ratings Available.

Feature Flow:-

	1) Home page --> Login page --> Course Dashboard --> Search Course()

	2) Home page --> Login page --> Course Dashboard--> click on discuss button  --> Discussion Forum --> Display Overall Rating


==================================================================================================================================================
Technologies Used in project
==================================================================================================================================================

1 ) Bootstrap version 4.3.1

< script src=“https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js” integrity=“sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k” crossorigin=“anonymous”>

2) JQuery

< script src=“https://code.jquery.com/jquery-3.2.1.slim.min.js” integrity=“sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN” crossorigin=“anonymous”>
< /script >

3) Font Awesome

< link rel=“stylesheet” href=“https://use.fontawesome.com/releases/v5.8.2/css/all.css” integrity=“sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay” crossorigin=“anonymous”>

4) Popper js for Dropdowns

< script src=“https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js” integrity=“sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q” crossorigin=“anonymous”>

5) HTML5 and CSS

6) MEAN (MongoDB, Express , Angular, NodeJs) stack framework

RateMyDalcourse will use JavaScript framework MEAN stack. MongoDB Express Angular Node.js is full form of MEAN stack. MEAN is an open source web stack which is highly used to create an application that can be easily hosted in Cloud Environment. MEAN stack applications are scalable, flexible and extensible, making them the ideal candidate for cloud hosting. The MEAN includes its own web server so it can be deployed quickly, and the database can be scaled horizontally or vertically on demand to accommodate temporary usage spikes. MEAN applications are cost-effective and provide high performance.Angular is helpful to reduce the html code by providing different functionalities such as ng-for, ng-if. Node is used  for performing CRUD operations with the http request.

The biggest advantage of Node is it provides scalability, which makes him an ideal candidate for cloud-based application. Express provides an interface for us to build our applications. It is minimal, providing us with the required tools to build a flexible application. There are numerous modules available on npm for express, which can be directly plugged into an express. MongoDB is a NoSQL database designed for cloud applications. It uses object-oriented organization and data stored in this database is in JSON format (key-value pair). In the MEAN stack, MongoDB stores the application’s data and also retrieve it very fast as compared to the relational database. Scaling of MongoDB is also efficient as compared to the relational database.


============================================================================================================================================
W3C compliance check
============================================================================================================================================
In this project, I have used angular componenet, so it will throw an error for the attributes like ngFor, ngIf, ngsubmit etc. I only checked all the css file of my feature for the compliancy test. There is no error in the files.


============================================================================================================================================
References
============================================================================================================================================

--------
Websites
--------

[1]M. Otto, “Cards”, Getbootstrap.com, 2019. [Online]. Available: https://getbootstrap.com/docs/4.0/components/card/. [Accessed: 10- Feb- 2019].

Usage: To create the cards, bootstrap provides built-in classes to use into the website.
       I used the code snippets from this website to create the cards for the events.

[2]M. Otto, “Navbar”, Getbootstrap.com, 2019. [Online]. Available: https://getbootstrap.com/docs/4.0/components/navbar/. [Accessed: 10- Feb- 2019].

Usage: Navbar is a classic feature of Bootstrap 4. to create the navbar for the website, 
       I used some classes like navbar-brand, navbar-toggler, navbar-collapse,navbar etc from the documentation provided.

[3]a. Mark Otto, “Cards”, Getbootstrap.com, 2019. [Online]. Available: https://getbootstrap.com/docs/4.3/components/card/#header-and-footer. [Accessed: 01- Jun- 2019].

Usage:- Various footer components are used to create footer design.

[4] Deep Shah, "Assignment-2", CSCI5709 – Advanced Topics in Web Development, 2019. [Accessed: 27 - Jun - 2019]

Usage:- Design of the frontend is modified to develop this assignment.Some of the pages are
	directly taken to develop this assignment while some pages are modified.

[5] Deep Shah, "Assignment-3", CSCI5709 – Advanced Topics in Web Development, 2019. [Accessed: 27 - Jun - 2019]

Usage:- This Asiignment is used to make the selection of the feature as well as to understand the flow of the MEAN application.
	In addition, it also helps to learn how to do interaction between the frontend and the backend.

[6]"MEAN Stack Architecture: AngularJS, NodeJS, ExpressJS & MongoDB", Evince Blog: From Tech Gurus to Techies, 2019. [Online]. Available: https://evincedev.com/blog/mean-stack-architecture/. [Accessed: 27- Jun- 2019]. 

Usage:- Variours component of MEAN stack can be easily understand with the help of this reference.
	Also, what are the advantages and disadvantages of MEAN application and why MEAN applications are
	preferable in cloud deployment can be easily understand using above link.

[7]"MEAN Stack: A Complete Guide", Ibm.com, 2019. [Online]. Available: https://www.ibm.com/cloud/learn/mean-stack-explained. [Accessed: 27- Jun- 2019].

Usage:- Flow of the MEAN application and interaction between frontend and the backend using express and
	mongo db can easily understand using this reference.

[8]"Angular 6 dynamic Navigation Bar - add/remove Route dynamically » grokonez", grokonez, 2019. [Online]. Available: https://grokonez.com/frontend/angular/angular-6/angular-6-dynamic-navigation-bar-add-remove-route-dynamically. [Accessed: 15- Jul- 2019].

Usage:- We need to create different navbar for the individual page. Rather than writing different code
	we can hide the navbar component and displayed it whenever we needed it.

[9]"Window alert() Method", W3schools.com, 2019. [Online]. Available: https://www.w3schools.com/jsref/met_win_alert.asp. [Accessed: 15- Jul- 2019].

Usage:- In the search feature user should not give input as special character.
	If user gives special character as an input then appropriate alert should be displayed
        to enhance the usability.

[10]"Angular 8 Tutorial - 19 - Using a Service", YouTube, 2019. [Online]. Available: https://www.youtube.com/watch?v=69VeYoKzL6I. [Accessed: 15- Jul- 2019].

Usage:- This video tutorial helps to understand how we should create the service to interact with server.


--------
Images
--------

Images used for the background and events
[1]“Blue eyed reflections Bright Colors t”, Kapicor.pw, 2019. [Online]. Available: http://kapicor.pw/Blue-eyed-reflections-Bright-Colors-t.html. [Accessed: 01- Jun- 2019].

Usage:- All the image which is displayed on the course dashboard page is taken from this source.










