# Animo.sys - S11 Group 11

An enrollment website with features similar to the existing animo.sys of DLSU specifically for College of Computer Studies (CSS) students. It will have the following features: Register, Log In, Log Out, View own user profile, View all offered classes, Search and display classes, Add classes, Drop classes, Swap classes, and View summary of enrolled classes.

## Heroku Deployed App

Link: [Animo.sys](https://animosys.herokuapp.com)

## Prerequisites

- [MongoDB](https://www.mongodb.com/download-center#community)
- [MongoDB Compass](https://www.mongodb.com/download-center/compass)

## Setting Up and Running the Project Locally
1. Run `mongod.exe` in the background
2. Open **MongoDB Compass** and make a DB named `animosysdb`
3. Import using MongoDB Compass the three collections found in `\models\data imports` (excluding masterlist_courseclass.csv) with the respective names: `students`, `classes`, `courses`
4. Install dependencies on the **project command line**: `npm install`
5. Enter this to run the server: `node app.js`
6. Navigate to the project through: `http://localhost:3000/`

### Upon Registering and Logging in

Register using a DLSU e-mail address.
*Note: The password should be at least 8 characters.*

Log In using the email and password you used to register or choose one of the following:
|            E-mail          |     Password      |
|:--------------------------:|:-----------------:|
| ninna_manzano@dlsu.edu.ph  |      11111111     |
| kayla_latorre@dlsu.edu.ph  |    kapekape       |
| krissha_calaranan@dlsu.edu.ph  |      rockets123       |

### Features

- Register
- Account Verification
- Log In
- Log Out
- View own user profile
- View all offered classes
- Search and display classes
- Add Classes
- Drop Classes
- Swap Classes
- View summary of enrolled courses

## Authors

**Krissha Calaranan**  
**Kayla Latorre**  
**Ninna Manzano**

