-----------------------------CHINTAN PATEL-----------------------------
-------------------------------B00826089-------------------------------

-------SUBMISSION DETAILS-------

Feature completed: Profile management (edit profile)
GitLab repository URL: https://git.cs.dal.ca/chintan/ratemydalcourse_group3
Branch URL in GitLab: https://git.cs.dal.ca/chintan/ratemydalcourse_group3/tree/feature/EditProfile
Bluenose application link: http://129.173.22.35:25001
Direct link to Bluenose feature: http://129.173.22.35:25001/editprofile
Files contributed: editprofile.component.html
				   editprofile.component.css
				   editprofile.component.ts
				   updateuser.ts
				   editprofile.component.ts
				   confirm-equal-validator.directive.ts
				   getcourse.service.ts
				   getcourse.service.spec.ts
				   getuser.service.ts
				   getuser.service.spec.ts
				   updateuser.service.ts
				   updateuser.service.spec.ts
				   server folder

-------INTRODUCTION-------

---RateMyDalCourse---
The purpose of this web application is to provide a platform for the students of the computer science department at Dalhousie University. Our web application will be referred to as ‘RateMyDalCourse’. The students will get necessary information regarding the course they are willing to register. The students will be able to add reviews and comments for the subjects they have completed. In addition, they can also participate in a discussion forum where they will help students who are intended to register for that course. Thus, this web application will reduce the communication gap between the students of computer science department regarding the selection of course. [1]


-------ABOUT MY FEATURE-------

---Profile management (Edit Profile)---
The user can update his/ her profile once registered. Using edit profile feature, the user can update name, password, add/ drop courses. It is not allowed to update email address which was used to create profile. It is necessary to add old password every time the user wants to update profile.


-------INSTALLATION STEPS-------

---Local installation
1. Clone the repository. Edit profile feature is implemented in feature/EditProfile branch.
	Repository URL in GitLab: https://git.cs.dal.ca/chintan/ratemydalcourse_group3
	Branch URL in GitLab: https://git.cs.dal.ca/chintan/ratemydalcourse_group3/tree/feature/EditProfile
2. Run 'npm install' command in 2 folders.
	a. Inside the Group3_Tech_Intellect folder
	b. Inside the server folder.

---direct testing
Bluenose application link: http://129.173.22.35:25001
Direct link to Bluenose feature: http://129.173.22.35:25001/editprofile

-------TESTING STEPS-------

1. Run command 'ng serve' in main folder i.e. Group3_Tech_Intellect.
2. Run command 'node server' in server folder.
3. The application can be tested on http://localhost:4200 which is default URL for Angular. It can be changed accordingly port of Angular.
4. The server runs on 3000 port. However, it is not required to open URL in browser because it runs in background and the application sends and handles request in background.
5. To directly check edit profile feature, http://localhost:4200/editProfile is direct link if running locally.


-------DETAILS OF EDIT PROFILE-------

As of now, login feature is not implemented. Thus, the user data is not being kept as session. So, which user is logged in, is not being kept because login feature is not implemented. To implement edit profile feature and to test working of the feature, I have kept user static. For example, I have assumed that user with email 'chintan.patel@dal.ca' and password '@Passw0rd' is already logged in he wants to update profile. Thus, testing is being made on user with email 'chintan.patel@dal.ca' and user cannot be changed as of now without login feature being implemented. The old password for this user is '@Passw0rd'. If the password is updated, the new password will be the newly added password. When updating the profile, if the profile gets updated, the success message will be 'Profile successfully updated.'. If old password is matched, but no updated data is sent from user, the error will be 'Old password not matched or nothing to update.'. For example, if user directly submits form by adding old password, error with message 'Old password not matched or nothing to update.' will be returned.


-------TECHNOLOGIES USED-------
1. HTML5 and CSS3
HTML5 is used for front-end of the application. It is used to define structure and layout of the web application. CSS3 is used to provide styles and formatting for the web application

2. Bootstrap-4
It is used to give attractive look and feel to the application. To make the web application responsive in terms of device screen, it is used.

3. MEAN (MongoDB, Express, Angular, Node.js)
MongoDB is used to store the database of the web application. The database for the web application is hosted on Mongo Atlas. 
Express is used to make server that can be used to connect with database and make queries related to the database.
Angular is used to make user interaction with the web application. It is also used for front-end validations. 
Node.js is used for backend of the web application. It is used to handle interactions with front-end and backend of the web application. For example in edit profile feature, it takes form data coming from front-end and requests server with form data and handles response from the server.


-------W3C compliace check-------
All the pages are W3C compliance and it follows required naming conversation.


-------CODE SOURCES USED-------
1. https://stackoverflow.com/a/1187628 [2]
This source is used to check difference in arrays. It was needed to check difference between array all courses offered and array of user registered courses. The difference array is to be shown in add course drop-down menu.

2. http://codeniro.com/caesars-cipher-algorithm-javascript/ [3]
The password is not stored in plain text manner in the database. Caesar cipher technique is used to encrypt the password into cipher text. The algorithm is taken from this source. The source contains encrypt and decrypt functions. Some changes like function removal, shift key changes are made from this source.

3. https://stackoverflow.com/a/55257919 [4]
This source is used to show courses in dynamic dropdown menu. The bootstrap class 'selectpicker' cannot load array dynamically as it gets initiated during initial page load. Thus, this source is used to solve the issue of dynamic array not getting loaded in drop-down.

4. https://stackoverflow.com/a/5767357 [5]
This source is used to remove specific value from the array. Once the user submits form, it is needed to update and add and drop course arrays for next operations. Thus, the source is used to get an idea about removing specific values from the array.

5. https://www.youtube.com/watch?v=jwA-9XXybdM&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ&index=45 [6]
This source is used to get an insight about how to setup express server. This server is used to interect with database set up on the Mongo Atlas.


-------REFERENCES-------
[1] C. Patel, "Assignment-3", CSCI5709 – Advanced Topics in Web Development, 2019. [Accessed: 14 - July - 2019]. 

[2] Thinker, "How to get the difference between two arrays in Javascript?", Stack Overflow, 2019. [Online]. Available: https://stackoverflow.com/a/1187628. [Accessed: 10- Jul- 2019].

[3] F. Akogun, "Caesars Cipher Algorithm (Javascript) - Codeniro", Codeniro, 2019. [Online]. Available: http://codeniro.com/caesars-cipher-algorithm-javascript/. [Accessed: 10- Jul- 2019].

[4] W. Akram, "bootstrap selectpicker not working with angularjs dynamic data load for dropdown", Stack Overflow, 2019. [Online]. Available: https://stackoverflow.com/a/55257919. [Accessed: 09- Jul- 2019].

[5] T. Wadley, "How do I remove a particular element from an array in JavaScript?", Stack Overflow, 2019. [Online]. Available: https://stackoverflow.com/a/5767357. [Accessed: 12- Jul- 2019].

[6] Codevolution, "Angular Forms Tutorial - 13 - Express Server to Receive Form Data", YouTube, 2019. [Online]. Available: https://www.youtube.com/watch?v=jwA-9XXybdM&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ&index=45. [Accessed: 09- Jul- 2019].