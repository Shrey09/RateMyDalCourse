This README file contains detailed information about Assignment-4 related to RateMyDalCourse web application.



# Git repository link and Web application URL
***Git Repository Link***
https://git.cs.dal.ca/chintan/ratemydalcourse_group3
<br/> Branch Name : create_post_harsh_pamnani (https://git.cs.dal.ca/chintan/ratemydalcourse_group3/tree/create_post_harsh_pamnani)

***Web Application URL***
http://129.173.22.34:24126/home



# What Is RateMyDalCourse?
The primary goal of this web application is to make the process of finding reviews of any course more convenient for the students of Dalhousie University. Each course page will provide a short description of the subject, credit hours, overall rating, and reviews from other students. Students will be able to sign-in on the web application with very minimal detail and take advantage of the web application with few clicks. The purpose of Login is to authenticate the student, which will prohibit random review posts by the user. When the user registers with the web application, he will be asked to fill a form which will contain information regarding courses completed and courses aimed in upcoming terms by the student.

The discussion forum will have a feature of comment, which will help students to directly ask a specific question to other students. Moreover, the post will have the “Mark as useful” button to mark it as a useful comment to get a better idea about the comments’ usefulness. The web application will maximize the use of Neilsen’s Components of Usability to make the User Experience smooth and consistent. With the simple and aesthetic design of the web application, even novice users will be able to create and find helpful posts.



# Feature Details
1. Create Post
For the "Create Post" feature, I have developed end-to-end functionalities for creating the post on the discussion forum. The post can be anything related to the course like difficulty level of the course, assignments of the course, or easiness of the subject etc. Once the user submits the post, it will be validated for any offensive content. Also, the post should be at least 20 characters long. If the post is valid, it will be added on the discussion forum, and other users will be able to see it. If any other user knows answer related to a specific question on the discussion forum, they can also post their reply using "Create Post" feature.

2. View Post
I have also developed end-to-end functionalities for the "View Post" feature. Whenever the user visits the discussion forum page, posts from the other users will be displayed on the page. The posts will be sorted on the basis of time when the post was posted. For now, the discussion forum will load all the posts for "CSCI5408 Mobile Computing" course. Once this feature is intergrated with the dashboard page, the discussion forum page will receive a course code from the dashboard page and comments will be loaded for that particular course only.



# Steps to Install
1) Clone the git repository on the local system using following command:
	git clone https://git.cs.dal.ca/chintan/ratemydalcourse_group3

2) My feature branch for assignment-4 is "create_post_harsh_pamnani". Checkout to this branch by using below command:
	git checkout -b create_post_harsh_pamnani origin/create_post_harsh_pamnani

3) Install the node modules required for the front-end and back-end.
	For installing front-end node modules run the below command:
		- cd Group3_Tech_Intellect
		- npm install
	
	For installing back-end node modules run the below command:
		- cd server
		- npm install



# Steps to Run
1) Two command terminals will be needed for running the application, as we have front-end and back-end both.

2) To start the client (front-end), run below commands in the commands prompt:
	- cd Group3_Tech_Intellect
	- ng serve
	- Open the browser, and navigate to http://localhost:4200/home to view the front-end.

3) To start the server (back-end), run below commands in the commands prompt:
	- cd server
	- nodemon server
	- Hit the URL http://localhost:3000/getPosts/CSCI5408/ to access the posts for specific course from server



# Interacting with the feature
Please follow below steps for interacting with the "create post" and "view post" features.
1. Open the URL http://129.173.22.35:24126/home to access the homepage of the application.
2. Click on "Login" button on the top-right corner.
3. Enter any valid email id and 8 characters password. For exmaple, I entered email as "harsh@gmail.com" and password as "Harsh@123".
4. On successful login, it will redirect you to "Dashboard" page.
5. On the dashboard page, click on "Discuss" button for "CSCI5408 Mobile Computing" subject under "All courses".
6. This action will redirect you to "Discussion Forum" page for "CSCI5408 Mobile Computing".
7. The discussion forum page will show course details like course name, credit hours, avrage rating, and comments on the discussion forum for that specific course.
8. There will be a text input for creating a new post on the discussion forum page. For the post to be valid, I have entered 3 validations:
	- Without entering any comment, hit the "Add Comment" button. This will display error message as "Please enter some content for the post."
	- Enter only 10 characters in the input text, and hit the "Add Comment" button. For example I entered "Fun subject" in the input text. This will display error message as "Please enter at least 20 characters for the post."
	- Enter some bad/vulgar words in the input text, and hit the "Add Comment" button. For example I entered "What the hell the subject is." in the input text. This will display error message as "Your post contains bad words. Please remove them and try again."
	- Enter some good comment in the input, and hit the "Add Comment" button. For example I entered "This was a really fun subject and I learnt a lot from the professor in this subject." in the input text. As this is a valid post, it will be added on the discussion forum page, comments count will increase, and the success message "Post successfully created on discussion forum." will be displayed the user.
9. The comments which are displayed on the discussion forum page are not static and it is being fetched from the database. Hence, even if you refresh the page, the newly added comments will be still present on the page.

**NOTE:** As mentioned above, for now, the posts will be created for "CSCI5408" subject and the user will be "Harsh Pamnani". After the integration of Dashboard, Login, and Discussion forum page, the user and the subject will be loaded dynamically.



# W3C compliance check
I have checked W3C compliance for `index.html` file and it passes the check with success message as "Document checking completed; No errors or warnings to show." I have also checked the compliance for CSS file `discussionforum.component.css` and it also passes with success message as "Congratulations! No Error Found.".

However, in our web applicaiton, some of the componenets are reusable. For example, navigation bar and footer remains the same on almost all the pages. As I am using angular for developing front-end, I have seperated out the navigation bar and footer using angular components and importing that components inside `app.component.html` file using using `<app-navbar></app-navbar>` and `<app-footer></app-footer>` tags. Therefore, the navbar componenet's HTML file will show error as it directly starts with <nav> tag and the compliance check always checks for first <html> tag. Also, there are some tags like *ngIf and *ngFor, which are angular specific tags. So, the W3C compliance check will show errors for that as well.



# Technologies used in the project
1. MEAN stack framework
RateMyDalCourse web application is developed using JavaScript software stack – MEAN stack. MEAN stack stands for MongoDB, ExpressJS, AngularJS, and NodeJS. The primary benefit of MEAN stack is that it allows using JavaScript as both front-end and back-end technology. Moreover, it uses MongoDB database. As it is a NoSQL database, data can be altered in any format required by the web application without changing the configuration. Apart from this, it has a significant advantage that it has a lot of community support. <br/><br/> There are mainly two sides: client-side and server-side. Client-side is what the users will see as their webpages on the browser. Server-side is the place where we run the business logic of the application. On the server, we will use a database to store our data. For client-side, AngularJS is used to create user interfaces and for the presentation. On the server-side, NodeJS and ExpressJS are used to running the business logic, and MongoDB is used as a database to store the data.


2. Bootstrap Version 4.3
Bootstrap is a framework which helps to build websites faster and in much simpler way. It includes numerous templates for NavBar, Buttons, Tables, Carousels etc. It also has built-in Javasctipt plugins. In my web applicaiton I have made the applicaiton responsive using bootstrap. Also, NavBar and Buttons are designed using Bootstrap. It is free to download and anyone can modify it according to their requirements. I have used CDN for getting CSS and Javascript file for bootstrap. Following are the CDNs I have used for Bootstrap. 
	  <br/> **CSS for Bootstrap**
	`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">`

	  <br/> **Javascript for Bootstrap**
	`<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>`

	
3. JQuery
JQuery is JS library which aims to simplify DOM traversal for HTML web-pages. Apart from that, it has build-in functionalities for event handling. In my applicaiton, I have used JQuery to handle the click events using bootstrap. For example, Screen Size changes, the navigation bar will be collapsed and it can be accessed using the toggle button on top-right hand corner. I have included the CDN for JQuery. I have used following is the CDN for JQuery.
	  <br/> **Javascript for JQuery**
	`<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>`


4. Popper
Popper is a extensive library used to manager popper in any web applicaiton. I have used this library as it is required to communicate with bootstrap. 
	 <br/>  **Javascript for Popper**
	`<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>`


5. Font Awesome
Font Awesome is the most popular toolkit for icons. The toolkit provides numerous free icons, which can be directly integrated with any web applicaiton. I have used font awesome icons on Login page, Registration page and Web application's footer. I have imported the font awesome CSS using below CDN.
	  <br/> **CSS for Font Awesome**
	`<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">`


6. Google Fonts
Google Fonts is the collection of varities of fonts, which can be used to make the website more aesthetic by using different eye-catching fonts. I have used "Raleway" and "Ubuntu" fonts from Google Fonts. Below is the stylesheet imported for using this 2 fonts from Google Fonts.
	  <br/> **Style Sheet for Google Fonts**
	`<link href="https://fonts.googleapis.com/css?family=Raleway|Ubuntu&display=swap" rel="stylesheet">`



# References
[1]H. Pamnani, "Assignment-2", CSCI5709 – Advanced Topics in Web Development, 2019. [Accessed: 14- Jul- 2019].

[2]H. Pamnani, "Assignment-3", CSCI5709 – Advanced Topics in Web Development, 2019. [Accessed: 14- Jul- 2019].

[3]M. Otto, "Navbar", Getbootstrap.com, 2019. [Online]. Available: https://getbootstrap.com/docs/4.0/components/navbar/. [Accessed: 14- Jul- 2019].

[4]M. Otto, "Cards", Getbootstrap.com, 2019. [Online]. Available: https://getbootstrap.com/docs/4.0/components/card/. [Accessed: 14- Jul- 2019].

[5] "Mean Stack Development [For Developers]", Hacker Noon, 2019. [Online]. Available: https://hackernoon.com/mean-stack-development-for-developers-4d88c40c4103. [Accessed: 14- Jul- 2019].

[6] "Single Page Apps with AngularJS Routing and Templating", Scotch, 2019. [Online]. Available: https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating. [Accessed: 14- Jul- 2019].

[7]"User Authentication with the MEAN Stack — SitePoint", SitePoint, 2019. [Online]. Available: https://www.sitepoint.com/user-authentication-mean-stack/. [Accessed: 14- Jul- 2019].

[8]D. Jamaludin, "MEAN Stack (Angular 5) CRUD Web Application Example", Djamware.com, 2019. [Online]. Available: https://www.djamware.com/post/5a0673c880aca7739224ee21/mean-stack-angular-5-crud-web-application-example. [Accessed: 14- Jul- 2019].

[9]"Simple Styles for hr's", Css-tricks.com, 2019. [Online]. Available: https://css-tricks.com/examples/hrs/. [Accessed: 14- Jul- 2019].

[10]"Footer Designs on Dribbble", Dribbble.com, 2019. [Online]. Available: https://dribbble.com/tags/footer. [Accessed: 14- Jul- 2019].

[11]"How To Create a Password Validation Form", W3schools.com, 2019. [Online]. Available: https://www.w3schools.com/howto/howto_js_password_validation.asp. [Accessed: 14- Jul- 2019].

[12]M. Otto, "Forms", Getbootstrap.com, 2019. [Online]. Available: https://getbootstrap.com/docs/4.0/components/forms/. [Accessed: 14- Jul- 2019].

[13]M. Otto, "Grid system", Getbootstrap.com, 2019. [Online]. Available: https://getbootstrap.com/docs/4.0/layout/grid/. [Accessed: 14- Jul- 2019].

[14]"The W3C CSS Validation Service", Jigsaw.w3.org, 2019. [Online]. Available: https://jigsaw.w3.org/css-validator/. [Accessed: 14- Jul- 2019].

[15]"The W3C Markup Validation Service", Validator.w3.org, 2019. [Online]. Available: https://validator.w3.org/. [Accessed: 14- Jul- 2019].

[16]M. Otto, "Buttons", Getbootstrap.com, 2019. [Online]. Available: https://getbootstrap.com/docs/4.0/components/buttons/. [Accessed: 14- Jul- 2019].

[17]"How to validate an email address in JavaScript?", Stack Overflow, 2019. [Online]. Available: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript. [Accessed: 14- Jul- 2019].