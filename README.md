# Dodomain
### A Web Service that lets users track Web site domain names and accompanying descriptions.

Dodomain is built with Ruby on Rails, React, MySQL, RSpec, Jest and Enzyme
![dodo painting](/frontend/src/resources/images/dodo.jpg "Dodomain")


###Quick Guide
 * [DB Setup](#db-setup)
 * [DB Tables](#db-tables)
 * [Authentication](#authentication)
 * [Backend Testing](#backend-testing)
 * [Frontend Orientation](#frontend-orientation)
 * [Frontend Testing](#frontend-testing)
 * [Future Steps](#future-steps)


### DB Setup 

Dodomain is using mysql v 8.0.11

There are 3 associated databases with this web application

dodomain_development, dodomain_test, dodomain_production

These databases were created with the `CREATE DATABASE dodomain_{environment}` command.

I created two tables for this application: users and domains

The SQL was run using Rails migrations, which you can view in the ./db/migrate file.

### DB Tables

#### Users table

The users table has 6 fields:
1. id ~ primary key
2. email ~ has index
3. password_digest
4. salt ~ for each user to discourage use of rainbow tables
5. created_at
6. updated_at

When run, the migration for the *users* table outputted this sql query:
```sql
  CREATE TABLE "users" ("id" bigint NOT NULL AUTO_INCREMENT PRIMARY KEY, "email" varchar(255) DEFAULT '' NOT NULL, "password_digest" varchar(255) DEFAULT '' NOT NULL, "salt" varchar(255), "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL)
```

add an index to the email of the user.
```sql
  CREATE UNIQUE INDEX "index_users_on_email"  ON "users" ("email")
```
#### Domains Table

The domains table has 6 fields:
1. id ~ primary key
2. name ~ has index
3. description
4. created_at
5. updated_at

When run, the migration for the *domains* table outputted this sql query: 
```sql
  CREATE TABLE "domains" ("id" bigint NOT NULL AUTO_INCREMENT PRIMARY KEY, "name" varchar(255) DEFAULT '' NOT NULL, "description" text NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL)
```
add a foreign key to user table
```sql
  ALTER TABLE "domains" ADD "user_id" bigint
```
add an index to the name of the domain.
```sql
  CREATE UNIQUE INDEX "index_domains_on_name"  ON "domains" ("name")
```
### Accessing DB Logs

If you would like to view the SQL commands used on this database in more detail, please read the active_record log in ./log/active_record.log

### Authentication

Authentication for Dodomain uses JSON web tokens (JWTs) that expire after one day of use. 

A JWT is created when a user signs up or signs into the application, and they are sent a blank JWT when they logout. 

The authentication machinery can be found in four places in this repository. Authentication related endpoints(SignIn aka getToken, SignUp and LogOut) are found in the AuthenticationController: `app/controllers/authentication_controller.rb`. 

These endpoints use User defined methods that can be found in the User model: `app/models/user.rb` and the JsonWebToken class, a wrapper for the jwt library, which is defined in the lib folder `lib/json_web_token`.

Two important methods on the User model are the `encrypt_password` function that takes in the plaintext user password and generates a password_digest from it which is stored in the user table, and the `match_password` function that is used in the sign request to compare an user-entered password to the password_digest on file.

```ruby
  #these methods are defined on the user model

  def encrypt_password #add encrypted password to user object
    if password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.password_digest= BCrypt::Engine.hash_secret(password, salt)
    end
  end

  def match_password(login_password="")
    self.password_digest == BCrypt::Engine.hash_secret(login_password, salt)
  end
```

### Authenticating an incoming request

An incoming request to the API utilize the `authenticate_request!` filter in the ApplicationController `app/controllers/application_controller.rb`

```ruby

def authenticate_request!
    unless user_id_in_token? # helper methods to validate incoming JWT
      # code removed for concision
      # return error message if token is not valid
      # this can happen for a couple of reasons: no token exists, an invalid token, or an expired token
    end
    @current_user = User.find(auth_token[:user_id]) #set current_user for use in controllers

  end

  private
  def http_token #checks to make sure auth token exists
    if request.headers['Authorization'].present?
      @http_token = request.headers['Authorization'].split(' ').last
    elsif request.params[:token].present?
      @http_token = request.params[:token]
    else
      return false;
    end
  end

  def auth_token #checks to make sure auth token is valid
    @auth_token = JsonWebToken.decode(http_token)
  end

  def user_id_in_token? #checks to make sure auth_token exists and that it is valid
    http_token && auth_token && auth_token[:user_id].to_i
  end
```

### Frontend Orientation

## Start working with the code

To start working with this code, you will need to have [Node and npm](https://www.npmjs.com/) installed.

### Running your code locally with a proxy server (preferred option)

With this setup, changes you make in the source code will be reloaded in an open application. If you choose to work with your code in a production build, you will need to rebuild the project to see the changes.

* Clone the repo
* `rails s -p 3001`- Start the Rails server on port 3001
* `cd frontend`
* `npm install` - Install all of the dependencies
* `npm run start` - Start the frontend server on port 3000
* Go to your browser and view the app at localhost:3000

All calls that are made in this set up are proxied through the frontend server and sent to the Rails Server. 

### Running your code locally with a production build

* Clone the repo and run `npm postinstall`
* Run `rails s`
* Go to your browser and view the app at localhost:3000


# A short tour of the React frontend

The Dodomain React frontend was build with [create-react-app](https://github.com/facebookincubator/create-react-app), a boilerplate for React projects.

All of the code for the React frontend can be found in the frontend folder. There are three important directories: build, public, and src. There is also a package.json file.

### build directory

The build directory is where all of the bundled JS and CSS go after the `npm run build` command is run. This command correctly bundles React in production mode and optimizes the build for the best performance.

### public directory

The public folder holds assets that will be incorporated into the build directory. For instance, the index.html file, and the favicon.

### src directory

This is where the React code lives!


#### index.js

This is the root of the React code. The Redux store is filtered down into the rest of the App from this code.

#### routes.js

This is where the frontend routing with react-router-dom is done.

#### actions directory

This is where the Redux actions live. These functions update the Redux state.

#### components directory

All of the views for the app live in this folder. 

#### containers directory

The structure of this folder should almost identical to the components directory. Containers are a React pattern that connect components to the Redux store, and connect components to action creators (the functions in the actions directory). They separate how the page looks, from what the page should be doing, i.e. fetching data.

#### reducers directory

Reducers are functions that control access to the Redux state, they listen for types from the action creators and update the state if the type that they are listening for is called.

The root_reducer combines all of the reducers into one file.

#### store

The store creates the Redux store using the root_reducer. In this file we create a function that will only create the store when the DOM has been loaded in index.js

#### util

The api_util file contains all of the AJAX calls that are made from the frontend.


### package.json

Contains functions that you can use to start, and build the project.

## Testing

Before you start using the testing frameworks, you need to install the test dependencies.

run `bundle install` to download the backend dependencies
- In your testing group in the Gemfile you should have:
	* `rspec-rails`
	* `factory_bot_rails`
	* `simplecov`

In /frontend run `npm install` to run the frontend dependencies
- In the dev dependencies of the package.json in /frontend you should have:
	* `enzyme`
	* `enzyme-adapter-react-16`

### Backend Testing	

The backend testing suite uses RSpec, Factorybot, and SimpleCov. 

RSpec is the test runner, and important setup can be found in the rails_helper.rb file.

Factorybot is used to build and destroy data between test cases. I specifically use it to create associations between models.

SimpleCov provides statistics about backend testing coverage. After each run with the command `rspec`, an index.html file is created in the `/coverage` folder. You can view this page to analyze test coverage.

#### Running specific tests on the backend

To run a specific set of tests use `rspec spec/controllers/your_controller.rb` where `your_controller` is the name of the controller you want to test. Ex: `rspec spec/controllers/authentication_controller_spec.rb`

To run a specific test use `rspec spec/your_controller_or_model.rb:line_number`, ex: `rspec spec/controllers/authentication_controller_spec.rb:12`

### Frontend Testing

The frontend testing suite uses Jest, Enzyme. It is primarily used to ensure that frontend routing works.

Jest is the test runner, it can be initiated using the `npm run test` command in the `/frontend folder`. I use Jest's built-in matchers and Enzyme methods and mocks to test the frontend.

Enzyme is a testing utilities library that provides useful helper functions for working with the virtual DOM.

### Future Steps