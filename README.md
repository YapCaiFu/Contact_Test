# Contact List Test Sample

## Assumptions

1. No duplication of email address, empty email field is allowed.
2. No duplication of phone number, empty phone field is allowed.
3. Contacts with same first name / last name are allowed.

## Features

1. At Screen1, list all the contacts based on the information retrieved from data.json as 
shown as in screen1.png. 
2. Clicking on any contact, will redirect the user to the Screen2 as shown in screen2.png 
3. At Screen2, the user will be able to edit the contact’s information. First Name and Last 
Name are required fields, while Email and Phone are optional fields. 
4. Screen 2 should be scrollable and clicking “next” in the keyboard, must bring the user to 
the next input field. 
5. Clicking on the Save button, will update the list at Screen1. 
6. A pull to refresh at Screen 1 will force the App to refresh the list according to the 
information retrieved from data.json. 
7. The search and + button must be there, but the functionality can be omitted. 

## Additional Features
1. TypeScript & Redux added.
2. User allows to search by first name, last name, email and phone.
3. User is able to edit current contact list by selecting all or choosing some contact to perform deletion.
4. Add email format validation, and phone number validation (should be only 0-9, (), whitespace or -).

## Estimated time per task

Note: '*' Indicates additional features handling.
#### Project setup with Typescript* & Redux* (~ 30 min)
#### Screen 1 features
1. Display list of contacts  (~ 15 min)
2. Search function (~ 20 min)
3. Edit function* (~ 25 min)
4. Add function (~ 5 min)
5. Click on details function (~ 5 min)
6. Refresh function (~ 5 min)
7. Overall design (~ 25 min)

#### Screen 2 features
1. Display individual details  (~ 15 min)
2. Save / update function (~ 15 min)
3. Validation & component handling*  (~ 25 min)
4. Overall Design (~ 20 min)

#### README Documentation (~20 min)

## Limitations
1. Project is built on Windows. No physical device & MacBook on hand to configure iOS
2. Systems are tested on specific device only (OPPO Find X3 Pro)

## Constraints
1. Time Constraints
2. UI Styles adjustment

## Enhancements
1. Sorting of contact, and alphabet number selection
2. Storing user data in live
3. Provide drop down list for phone number extension
4. Styling and configuration for iOS
5. Combine duplicated contact

## License
NA