# Enrollment - S11 Group 11

An enrollment website with features similar to the existing animo.sys of DLSU specifically for BS Information Systems (BSINSYS) students. It will have the following features: Register, Log In, Log Out, View own user profile, View all offered classes, Search and display classes, Add classes, Drop classes, Swap classes, and View summary of enrolled classes.

## Getting Started

1. Install dependencies on the **project** command line: `npm install`
2. Enter this to run the server: `node app.js`
3. Navigate to the project through: `http://localhost:3000/login`

### Prerequisites

- [MongoDB](https://www.mongodb.com/download-center#community)
- [MongoDB Compass](https://www.mongodb.com/download-center/compass)

### Setting up the Project
0. Run **mongod.exe** in the background
1. Make a DB named `animosysdb` in MongoDB Compass
2. Import using MongoDB Compass the three collections found in `\models\data imports` (excluding masterlist_courseclass.csv) with the respective names: *students*, *classes*, *courses*
3. Run the application

## Running the tests

#### Register 
Click on `Don't have an account? Register here` and fill in the necessary information.

#### Log In 
Log In using the email and password you used to register or choose one of the following:
|            E-mail          |     Password      |
|:--------------------------:|:-----------------:|
| ninna_manzano@dlsu.edu.ph  |      11111        |
| kayla_latorre@dlsu.edu.ph  |    kapeuwu        |
| krissha_calaranan@dlsu.edu.ph  |      rockets123        |

#### View own user profile
On the rightmost of the navigation bar, you will see the name of the user and a dropdown arrow. Click it and choose `Profile`

#### View all offered classes
Click `Course Offerings` on the navigation bar.

#### Search and display classes
On the search bar located on the upper right of the page, enter the **course code/course name/class number** of the class you want to search. 

#### Add Classes
Click on the dropdown `Enlistment` and chooses `Add Classes`. Enter the **Class Number** of the class you want to add.

Input three classes:
1. A class that is not in your list (My Classes).
2. A class that is already in your list (My Classes).
3. A class that does not exist.

Then, **input more classes** in to check if it will stop from adding once you reach the maximum units required.

#### Drop Classes
Click on the dropdown `Enlistment` and chooses `Drop Classes`. Enter the **Class Number** of the class you want to drop.

Input two classes:
1. A class that is on the list.
2. A class that is not on the list.

#### Swap Classes
Click on the dropdown `Enlistment` and chooses `Swap Classes`. Enter the **Class Number** of the class you want to swap and as well as the class number of the class you want to swap with.

Input the classes with the ff cases in mind:
1. Class A: is in your classes; Class B: is in the course offerings
2. Class A: is in your classes; Class B: is not in the course offerings
3. Class A: is not in your classes; Class B: is in the course offferings
4. Class A and Class B are not in their respective lists
5. Class A and Class B are the same

#### View summary of enrolled courses
Click `Enrolled Courses` on the navigation bar.

#### Log Out
On the rightmost of the navigation bar, you will see the name of the user and a dropdown arrow. Click it and choose `Log Out`

## Authors

**Krissha Calaranan**  
**Kayla Latorre**  
**Ninna Manzano**

