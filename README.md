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

`CREATE TABLE "users" ("id" bigint NOT NULL AUTO_INCREMENT PRIMARY KEY, "email" varchar(255) DEFAULT '' NOT NULL, "password_digest" varchar(255) DEFAULT '' NOT NULL, "salt" varchar(255), "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL)`

I also added an index on the email of the user.

`CREATE UNIQUE INDEX "index_users_on_email"  ON "users" ("email")`

#### Domains Table

The domains table has 6 fields:
1. id ~ primary key
2. name ~ has index
3. description
4. created_at
5. updated_at

When run, the migration for the *domains* table outputted this sql query: 

`CREATE TABLE "domains" ("id" bigint NOT NULL AUTO_INCREMENT PRIMARY KEY, "name" varchar(255) DEFAULT '' NOT NULL, "description" text NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL)`

I also added an index on the email of the user.

`CREATE UNIQUE INDEX "index_domains_on_name"  ON "domains" ("name")`

### Accessing DB Logs

If you would like to view the SQL commands used on this database in more detail, please read the active_record log in ./log/active_record.log