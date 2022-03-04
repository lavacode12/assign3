/************************************************************************************
* WEB322 â€“ Project (Winter 2022)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Lavanya
* Student ID: 160824181
* Course/Section: WEB322/NDD
*
************************************************************************************/

const path = require("path");
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const service = require("./models/mealkit-db");
const bodyParser = require("body-parser");
const validation = require("./models/validation");

app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layout' }));

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true}))

const defaultStyles = ["main", "header", "footer"];

app.get("/", (req, res) => {
    res.render("home", {
        title: 'Home',
        topMeals: service.getTopMeals(),
        stylesheets: [...defaultStyles, "home", "hero", "mealkit"],
        home: true
    });
})

app.get("/onTheMenu", (req, res) => {
    res.render("onTheMenu", {
        title: 'On The Menu',
        stylesheets: [...defaultStyles, "onTheMenu", "mealkit"],
        categories: service.getMealsByCategory(),
        menu: true
    });
})

app.get("/registration", (req, res) => {
    res.render("registration", {
        title: 'Registration',
        stylesheets: [...defaultStyles, "login"],
        heading: "Register",
        signup: true,
        action: "registration"
    });
})

app.get("/sign-in", (req, res) => {
    res.render("signin", {
        title: 'Sign In',
        stylesheets: [...defaultStyles, "login"],
        heading: "Sign In",
        login: true,
        action: "sign-in"
    });
})

app.get("/welcome", (req, res) => {
    res.render("welcome", {
        title: "Welcome",
        stylesheets: [...defaultStyles, "welcome", "mealkit"],

    })
})

app.post("/registration", (req, res) => {
    const { body = {}} = req;
    
    let errObj = validation.validateFields(body, ['firstname', 'lastname', 'email', 'password']);

    if (Object.keys(errObj).length > 0) {
        res.render("registration", {
            title: 'Registration',
            stylesheets: [...defaultStyles, "login"],
            heading: "Register",
            signup: true,
            action: "registration",
            values: {
                firstname: body.firstname || null,
                lastname: body.lastname || null,
                email: body.email || null,
                password: body.password || null
            },
            errors: {
                firstname: false,
                lastname: false,
                email: false,
                password: false,
                ...errObj
            }
        });
    } else {
        res.redirect("/welcome");
    }
})

app.post("/sign-in", (req, res) => {
    const { body = {}} = req;
    
    let errObj = validation.validateFields(body, ['email', 'password']);

    if (Object.keys(errObj).length > 0) {
        res.render("registration", {
            title: 'Sign In',
            stylesheets: [...defaultStyles, "login"],
            heading: "Sign In",
            login: true,
            action: "sign-in",
            values: {
                email: body.email || null,
                password: body.password || null
            },
            errors: {
                email: false,
                password: false,
                ...errObj
            }
        });
    } else {
        res.redirect("/welcome");
    }
})

app.post("/sign-in", (req, res) => {

})


// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);
