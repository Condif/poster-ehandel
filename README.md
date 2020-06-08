# Imagi 
## E-commerce - Posters

Link to [github repo](https://github.com/Condif/poster-ehandel).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
and built using [Material-UI](https://material-ui.com/getting-started/installation/).
The server is built using [Node.js](https://nodejs.org/en/).
The database is built with [MongoDB](https://docs.mongodb.com/guides/).

## Project description

E-commerce site that sells posters. The customers should easily be able to choose their favorite poster by category. A customer can register and log in. Add, remove and manipulate the amount of products in their cart. If the user leaves the site their cart is saved in localstorage. They can go from cart to a checkout site, choose delivery option and purchase. After purchace the customer an order proof will be saved to the database which will be presented to the customer when they are logged into the site.

## Installation

When the project is cloned to your drive, start the project and run;

#### `npm i`

to install dependencies.

### Starting the project

The following command line is used in the projects server directory to start the backend part of the project
(cd server).


#### `node expressApp.js`

If you intend to run the frontend part side by side, open a new terminal window and run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Additional scripts

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Assignment grading

This part is only for our teacher's reference, not the actual grading of the assignment. 

### Passing grades:

- All sites should be responsive.(Completed) </br>
  The site is fully responsive, from desktop to mobile. </br>
- The project should be implemented with a React frontend and an Express backend. (Completed)</br>
  See above.</br>
- Make an ER-diagram and a codediagram. These should be handed over at the idéapproval. (Completed)</br>
- Describe your business idea in a short text presentation. This should be handed over at the idéapproval.(Completed)</br>
- All content should be saved in MongoDB. (Completed) </br>
  We are using MongoDB atlas. </br>
- You should be able to login as an administrator. (Completed)</br>
  Each user has a role, which is saved in the user document in the database. When the user logs in we do a role validation check. If the   user is approved as an admin, they get access to admin features. </br>
- All passwords should be encrypted in the database. (Completed)</br>
  We are using bcrypt, and all the passwords in the database are hashed. </br>
- A user should be able to order products from the site, which updates the inventory in the database. (Completed) </br>
  When the user makes a purchase, a PUT is triggered, which sends an array of objects. We find each product via its id and then subtract   the current inventory with the cartAmount. Then we replace the old object with the new updated one. </br>
- An administrator should be allowed to update the inventory from the admin part of the site. (Completed)</br>
  An administrator can update the inventory by clicking “Edit Products”. There the admin can add or remove items in the inventory. By     pushing the “update” button, the old object is replaced with the new, through a PUT, and the inventory in the database is updated.</br>
- Administrators can see a list of all orders that have been made. (Completed)</br>
  By clicking “see orders” the admin can see all orders.</br>
- The products on the site should be divided into categories. A product ought to belong to at least one category. (Completed)</br>
  Every product has a category property. In layout the products are mapped through and gets divided into their different categories.       Each category gets its own Route with a CategoryPage (and slugs are also created). So, when the user clicks “Forrest”, all the           pictures with the category forrest is shown etc. </br>
- The user should be able to see a list of all products, but also just one category. (Completed)</br>
  When the user visits the page, or click “home”, all products are shown. But then when a category is clicked, only products under that   category are displayed. </br>
- The user should be able to put items in a cart, which is saved on local storage. (Completed)</br>
  The user can add an item to a cart, which is an array that we keep in our userContext. When a user adds an item in the cart, the item   is set in localstorage. 
- A user making an order should be presented the opportunity to register and login, and must be logged in, as a customer, before the       order is created. (Completed)</br>
  They user can add products to the cart, but when they click the “to payment” they get a warning that they have to be logged in or       register. </br>
- The user should be allowed to choose one out of several shipment alternatives. (Completed)</br>
  The user can choose from DHL, Posten or Schenker during the checkout. </br>
- The shipment alternatives should be retrieved from the database. (Completed)</br>
  In our checkout component we GET all the shipping alternatives from the database and maps through them, so that the user can choose a   shipment. </br>
- The checkout, in the frontend application, should have validation on all fields. (Completed)</br>
  The user can not make a purchase if the fields does not contain the right type of information. An error message will be displayed if     the input is incorrect. </br>

### Extra credits

- The backend application must have a working global error handler. (Completed)</br>
  In our expressApp we have a middleware that handles global errors. We also have a ServerError class that throws a new error if           something goes wrong. 
 
### Inlog

email: admin@gmail.com 
password: admin

Register yourself as an user to check out the page. 
