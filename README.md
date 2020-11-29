# Bookable

A generic seat reservation system for buses and flights

## Running the web server

### Requirements

- node and npm
- A MySQL Database

### Instructions

1. Clone the repository using `git clone`
2. Navigate to the repository directory using `cd`
3. Install the required dependencies using ``npm install``
4. Create a .env file. The file should contain the fields DB_HOST, DB_USER, DB_PASS and DB_NAME. For example,
`DB_HOST=localhost
DB_USER=Username 
DB_PASS=password  
DB_NAME=databaseName`  
5. Run `npm start`
6. Open localhost:3000 on a web browser.
7. Done! 

If everything goes well, the website homepage should open:

![Bookable Homepage](./static/Image/bookable-pic.png)

## Technologies Used

- NodeJS for the web server
- JQuery
- Sequelize ORM
- MySQL Database
