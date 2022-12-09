# TeleMedCS6360

There are two main parts to this system: the database and the interface. 

## Setting Up the Dataabse
- Download PostgresSQL (preferably  15) from https://www.postgresql.org/download/
- When installing, use default settings
- Open pgAdmin4 from start menu
- Create a master password for opening 'pgAdmin 4' (this can be anything, but I recommend 'password')
- Click the servers on the left panel
- Set the 'postgres' user password to be 'password'
- Make sure the 'PostgreSQL 15' line is selected in the left panel
- Create a new database called 'TeleMed' using default everything by going Object>Create>Database
- Right click the 'TeleMed' database on the left panel and select 'Query Tool' near the bottom
- In the top left of the query tool, select the folder icon to open scripts
- Open and run the `CreateTables.sql` script
- Open and run the `DataPopulation.sql` script
- The database is now set up!

## Setting Up the Interface
Extract the files from the zip file (which you've probably already done that if you're reading this)

### Installing Nodejs
- Download Nodejs from https://nodejs.org/en/download/
- Run the installer with default settings

### Starting the Front End
#### Easy Way
- Run the `EasyStart.bat` file (only for windows users)
#### Less Easy Way
- Open the `~/DBD_TELEMED/index.html` in the browser of your choice
    - This is the front end in which you can interact with
- Open a command line and change the directory to `~/Project` (the `Project` directory is found in the same directory as `DBD_TELEMED`. I know this might be confusing since there are two `Project` directories)
- In the command line, while in the 'Project' directory, run the command  `node ./api.js`
    - This is the api server that must be started in order to connect to the database

### Notes for the Front End
- The command window that pops up using the `EastStart.bat` file should not be closed. If the command window is closed, the api server is stopped and the front end will not function properly
- When viewing all the doctors ('Doctor' option in the left panel) the edit button (green icon next to each doctor) does not work properly. Clicking the icon will not redirect you to the 'Edit Doctor' page. To get around this issue, simply open the link in a new tab by right clicking and selecting 'Open in New Tab' or holding CTRL while clicking 
