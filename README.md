# TECHATHON E-COMMERCE PROJECT
## GROUP 2 TEAM 8 TASK
**This project is to encourage team collaboraton among mentees**

**TASK OVERVIEW**
Login/Register for visiting application
Browse through different products
Filter products based on category, price etc..
Like/review products
Add them to cart/wishlist
Edit/Delete his/her account

Admin can do following tasks on admin dashboard

Add/list products
Update product details, quantity etc..
View list of all the users
Block/unblock a particular user
**Note:** product designers should keep their ui/ux simple

# DESCRIPTION
This project is to build a functional e-commernce website with the above stated functionalities.
## APPLICATION FEATURES
1. Implement the following authentication methods using TWT:
- /auth/login
- /auth/logout
- /auth/admin
- /auth/register and
- /auth/refreshtoken
**Note**
- /auth/admin
- POST /auth/register and
- POST /auth/login should not require authentication to allow new users register and login.
- If there is already a logged in user ith the same credentials, the user should be notified with a message stating “There is already an active session using this account”. And the user should me able to terminate all active session on their account via a rout/endpoing; auth/logout/all.
- Other possible edge cases should be anticipated and access issues effectively resolved.

2. Implement CRUD for the User model (GET, POST, PUT and DELETE) for **/user**:
- Only admin can **delete** all types of users.
- A user can only **edit or delete** his/her account.
## WORK FLOW
This repor will use the following branch for all contributors
1. Introduction: _ This is the branch for all initial features in process.
2. Review : _ This branch handles all featurs that have been finalized.
3. Main : _ This the contains all features that have be approved and merged to the codebase.

3. Implement CRUD for the Product model (GET, POST, PUT,PATCH and DELETE) for **/product**:
- Products can be searched by id, category, price, name, etc through the **/product/search** route.
- A user should send a POST request to **/cart** to add product to **cart/wishlist** with the necessary data of product(name,price,quantity, etc) and total cost will be generated for the cart items.

4. Implement CRUPD for the Review model (GET,POST,PUT and DELETE) for **/product/review**:
- Only Admin can add/create products.
- Only Admin can update product details.
- Only Admin can view all users.
- Only Admin can block/unblock a user.

# DATABASE SCHEMA
The database to be used for this project will be mongo database.

## USER
```
		_id :    -->ObjectId,
username:    -->String,
password:    -->String,
	 email:    -->String,
 address:    -->String,
	status:    -->String->enum["Blocked","Unblock"],
  	type:    -->String ->enum["Admin","User"],
refreshToken: -->[String],
createdAt:     -->Date,
updatedAt:     -->Date
```
## USERLOG
		```
userid:      -->ObjectId,
description: -->String
	createdAt:  -->Date,
	updatedAt:  -->Date
  ```
## PRODUCT
```
	_id:     -->ObjectId,
	name:    -->String,
category:  -->String,
quantity:  -->Number.
	price:   -->Number,
	userid:  -->ObjectId(ref)
createdAt: -->Date,
updatedAt: -->Date
```

## REVIEW 
```
	_id:       -->ObjectId,
productid:    -->ObjectId(ref),
     like:   -->Number,
description:  -->String,
createdAt:    -->Date.
updatedAt:    -->Date,
```
# RULE OF THE PROJECT
- Create a task and assigned to yourself or someone that wants to do it.
- Pick from existing task if the one you want to create already exist.
- Your push should have the name of the Task as the Commit Heading
- Your commit should have a body (Message) explaining or listing the changes/implementations
- If there is a hack in your code please state the **purpose** and **why**
- Finally try to write readably and structured code.
