# minifyURL

Live demo: https://minifyurl-sllb.onrender.com/ <br/>
Might take awhile to load on first try, due to render.com

## Tech stack used

Frontend: ReactJS, Typescript <br/>
Backend: NodeJS <br/>
Database: Postgresql on Render.com

## Libraries/frameworks used

Frontend: Material-UI (MUI), axios <br />
Backend: Knexjs, express, zod 

## Thought process

As the required application has a simplified function, I have chosen such a design so it captures the users attention on where they need to interact with the app instantly. The simplicity also makes it easily scaled to mobile phone sizes via responsive web design.
The words surrounding the call to action succinctly describes what the site is for and what the expected result can be used for.
<br/><br/>
I have also made sure that every possible action by the user receives a feedback, be it positive or negative, via the use of snackbars. This ensures that their action's data was successfully sent to the backend to process, and they received the appropriate feedback.
<br/><br/>
After a successful shortening, a modal will pop up giving the user the shortened URL that is required. Focusing on making the app easy for the user, I have included the option to copy the shortened URL with a click of a button, saving precious time for the user by not needing to highlight the new URL and copying it manually.
<br/><br/>
Whereas for the rerouting, the backend does most of the work here, if the shortened URL exists in the database, the user instantly gets rerouted. Otherwise, they are transported back to minifyURL with a snackbar explaining that the URL was invalid, then inviting them to create a new one.
<br/><br/>
As for the color theme, why yellow? I'm just a big fan of Pikachu 	:smile:
I even named the custom theme pallette after it.
