# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


### DB Setup 

Dodomain is using mysql v 8.0.11

There are 3 associated databases with this web application

dodomain_development, dodomain_test, dodomain_production

These databases were created with the `CREATE DATABASE dodomain_{environment}` command.

I created two tables for this application: users and domains

The SQL was run using Rails migrations, which you can view in the ./db/migrate file.

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

##Authentication

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

