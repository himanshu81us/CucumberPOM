
Route folder will have env files.

Report folders will have json and html report structure. After executing the test, we can just run index.js file which will give us the report.

Reports also have screenshots added in both pass and failed cases. Also screenshots gets stored in .screenShots folder.

gitignore file is used restricting some files while pushing to git hub.

Driver suite has chromedriver.exe file which is compatible with current chrome browser machines. This can be used and saved in our machines and should be added to 'Path' environment variable for the first time we clone this project.

TO RUN
in git bash terminal; NODE_ENV=auto npm test
and to see the reports; node index.js

More info will get added soon 