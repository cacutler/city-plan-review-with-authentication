const express = require("express")
const model = require("./model")
const cors = require("cors")
const session = require("express-session")
const app = express()
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        callback(null, origin)
    }
}))
app.use(express.urlencoded({extended:false}))
app.use(express.static("../public"))
app.use(session({
    secret: "thisisjunkdataatadknujsisiht",
    saveUninitialized: true,
    resave: false//, cookie: {//secure: true, // sameSite: "None"//}//this breaks postman but fixes Chrome
}))
function authorizeRequest(request, response, next) {
    if (request.session && request.session.developer) {
        model.Developer.findOne({_id: request.session.developer._id}).then(function (developer) {
            if (developer) {
                next()
            }
        })
    } else if (request.session && request.session.city) {
        model.City.findOne({_id: request.session.city._id}).then(function (city) {
            if (city) {
                next()
            }
        })
    } else {
        response.status(401).send("Not authenticated.")
    }
}
function authorizeRequestHelper(city, developer, request, response, next) {
    console.log("request session in authorize request helper function:", request.session)
    if (request.session && developer) {
        console.log("request session developer user if developer:", request.session.developer)
        model.Developer.findOne({_id: request.session.developer._id}).then(function (user) {
            console.log("request session developer id:", request.session.developer._id)
            if (user) {
                next()
            }
        })
    } else if (request.session && city) {
        console.log("request session city user if city:", request.session.city)
        model.City.findOne({_id: request.session.city._id}).then(function (user) {
            console.log("request session city id:", request.session.city._id)
            if (user) {
                next()
            }
        })
    } else {
        response.status(401).send("Not authenticated.")
    }
}
function authorizeDevRequest(request, response, next) {//my middlewares
    authorizeRequestHelper(false, true, request, response, next)
}
function authorizeCityRequest(request, response, next) {
    authorizeRequestHelper(true, false, request, response, next)
}
app.get("/city_standards", authorizeRequest, function (request, response) {
    model.Standards.find().then((standards) => {
        response.json(standards)
    })
})
app.get("/city_standards/:city_standardsID", authorizeCityRequest, function (request, response) {
    console.log("retrieve standards with id:", request.params.city_standardsID)
    model.Standards.findOne({_id:request.params.city_standardsID, user: request.session.city._id}).then((city_standards) => {
        if (city_standards) {
            response.json(city_standards)
        } else {
            response.sendStatus(404)
        }
    }).catch((error) => {
        console.error("Failed to query city standards with ID:", request.params.city_standardsID)
        response.sendStatus(404)
    })
})
app.put("/city_standards/:city_standardsID", authorizeCityRequest, function (request, response) {
    console.log("Update city standards with id:", request.params.city_standardsID)
    console.log("Request body:", request.body)
    model.Standards.findOneAndUpdate({_id: request.params.city_standardsID, user: request.session.city._id}, {
        min_development_size: parseInt(request.body.minDevelopmentSize),
        max_development_size: parseInt(request.body.maxDevelopmentSize),
        min_waterline_size: parseInt(request.body.minWaterlineSize),
        max_waterline_size: parseInt(request.body.maxWaterlineSize),
        min_sewer_size: parseInt(request.body.minSewerSize),
        max_sewer_size: parseInt(request.body.maxSewerSize),
        min_storm_drain_size: parseInt(request.body.minStormDrainSize),
        max_storm_drain_size: parseInt(request.body.maxStormDrainSize),
        min_roadway_width: parseInt(request.body.minRoadwayWidth),
        max_roadway_width: parseInt(request.body.maxRoadwayWidth),
        min_asphalt_width: parseInt(request.body.minAsphaltWidth),
        max_asphalt_width: parseInt(request.body.maxAsphaltWidth),
        min_sidewalk_width: parseInt(request.body.minSidewalkWidth),
        max_sidewalk_width: parseInt(request.body.maxSidewalkWidth),
        min_asphalt_thickness: parseInt(request.body.minAsphaltThickness),
        max_asphalt_thickness: parseInt(request.body.maxAsphaltThickness),
        min_roadbase_thickness: parseInt(request.body.minRoadbaseThickness),
        max_roadbase_thickness: parseInt(request.body.maxRoadbaseThickness),
        user: request.session.user
    }).then(() => {
        response.status(200).send("Updated city standards.")
    }).catch((error) => {
        var errorMessages = {}
        if (error.errors) {//mongoose validation failed!
            for (var fieldName in error.errors) {
                errorMessages[fieldName] = error.errors[fieldName].errorMessages
            }
            response.status(422).send(error.errors)
        } else {
            response.status(500).send("Unknown error updating city standards.")
        }
    })
})
app.get("/developer_plans", authorizeRequest, function (request, response) {
    model.Plan.find().then((plans) => {
        response.json(plans)
    })
})
app.get("/developer_plans/:developer_planID", authorizeDevRequest, function (request, response) {
    console.log("retrieve plan with id:", request.params.developer_planID)
    model.Plan.findOne({_id:request.params.developer_planID, user: request.session.developer}).then((developer_plan) => {
        if (developer_plan) {
            response.json(developer_plan)
        } else {
            response.sendStatus(404)
        }
    }).catch((error) => {
        console.error("Failed to query developer plan with ID:", request.params.developer_planID)
        response.sendStatus(404)
    })
})
app.post("/developer_plans", authorizeDevRequest, function (request, response) {
    console.log("request body:", request.body)
    var newPlan = new model.Plan({
        applicant_name: request.body.applicantName,
        applicant_phone_number: request.body.applicantPhone,
        applicant_email: request.body.applicantEmail,
        developer_name: request.body.developerName,
        developer_phone_number: request.body.developerPhone,
        developer_email: request.body.developerEmail,
        developer_address: request.body.developerAddress,
        applicant_address: request.body.applicantAddress,
        project_name: request.body.projectName,
        project_address: request.body.projectAddress,
        project_type: request.body.projectType,
        current_zoning: request.body.currentZoning,
        development_size: parseInt(request.body.developmentSize),
        waterline_size: parseInt(request.body.waterlineSize),
        sewer_size: parseInt(request.body.sewerSize),
        storm_drain_size: parseInt(request.body.stormDrainSize),
        power_company: request.body.powerCompany,
        internet_company: request.body.internetCompany,
        roadway_width: parseInt(request.body.roadwayWidth),
        asphalt_width: parseInt(request.body.asphaltWidth),
        sidewalk_width: parseInt(request.body.sidewalkWidth),
        asphalt_thickness: parseInt(request.body.asphaltThickness),
        roadbase_thickness: parseInt(request.body.roadbaseThickness),
        approved: request.body.approved,
        user: request.session.developer
    })
    newPlan.save().then(() => {
        response.status(201).send("Created new developer plan.")
    }).catch((error) => {
        var errorMessages = {}
        if (error.errors) {//mongoose validation failed!
            for (var fieldName in error.errors) {
                errorMessages[fieldName] = error.errors[fieldName].errorMessages
            }
            response.status(422).send(errorMessages)
        } else {
            response.status(500).send("Unknown error creating developer plan.")
        }
    })
})
app.delete("/developer_plans/:developer_planID", authorizeDevRequest, function (request, response) {
    console.log("Delete plan with id:", request.params.developer_planID)
    model.Plan.deleteOne({_id: request.params.developer_planID, user: request.session.developer}).then((response) => {
        response.status(200).send("Deleted plan.")
    }).catch((error) => {
        console.error("Failed to delete developer plan with ID:", request.params.developer_planID)
        response.sendStatus(404)
    })
})
app.put("/developer_plans/:developer_planID", authorizeDevRequest, function (request, response) {
    console.log("Update plan with id:", request.params.developer_planID);
    console.log("Request body:", request.body)
    model.Plan.findOneAndUpdate({_id: request.params.developer_planID, user: request.session.developer._id}, {
        applicant_name: request.body.applicantName,
        applicant_phone_number: request.body.applicantPhone,
        applicant_email: request.body.applicantEmail,
        developer_name: request.body.developerName,
        developer_phone_number: request.body.developerPhone,
        developer_email: request.body.developerEmail,
        developer_address: request.body.developerAddress,
        applicant_address: request.body.applicantAddress,
        project_name: request.body.projectName,
        project_address: request.body.projectAddress,
        project_type: request.body.projectType,
        current_zoning: request.body.currentZoning,
        development_size: parseInt(request.body.developmentSize),
        waterline_size: parseInt(request.body.waterlineSize),
        sewer_size: parseInt(request.body.sewerSize),
        storm_drain_size: parseInt(request.body.stormDrainSize),
        power_company: request.body.powerCompany,
        internet_company: request.body.internetCompany,
        roadway_width: parseInt(request.body.roadwayWidth),
        asphalt_width: parseInt(request.body.asphaltWidth),
        sidewalk_width: parseInt(request.body.sidewalkWidth),
        asphalt_thickness: parseInt(request.body.asphaltThickness),
        roadbase_thickness: parseInt(request.body.roadbaseThickness),
        approved: request.body.approved,
        user: request.session.developer
    }).then(() => {
        response.status(200).send("Updated plan.")
    }).catch((error) => {
        var errorMessages = {}
        if (error.errors) {//mongoose validation failed!
            for (var fieldName in error.errors) {
                errorMessages[fieldName] = error.errors[fieldName].errorMessages
            }
            response.status(422).send(error.errors)
        } else {
            response.status(500).send("Unknown error updating developer plan.")
        }
    })
})
app.post("/developer_users", function (request, response) {
    console.log("Developer users post request body:", request.body)
    const newDeveloper = new model.Developer({
        username: request.body.devSignUpUsername,
        name: request.body.devSignUpName,
        phone: request.body.devSignUpPhone,
        email: request.body.devSignUpEmail,
        address: request.body.devSignUpAddress
    })
    newDeveloper.setEncryptedPassword(request.body.devSignUpPlainPassword).then(function () {
        //at this time, the password has been encrypted and assigned on the user.
        //now save the user and respond to the client.
        newDeveloper.save().then(() => {
            response.status(201).send("Created new user.")
        }).catch((error) => {
            var errorMessages = {}
            if (error.errors) {//mongoose validation failed!
                for (var fieldName in error.errors) {
                    errorMessages[fieldName] = error.errors[fieldName].errorMessages
                }
                response.status(422).send(errorMessages)
            } else if (error.code == 11000) {
                response.status(422).json({username: "Developer user with that username already exists."})
            } else {
                console.error("Unknown error creating developer user:", error)
                response.status(500).send("Unknown error creating developer user.")
            }
        })
    })
})
app.get("/developer_session", function (request, response) {//retrieve session.  Maybe use this in the load functions???
    console.log("session:", request.session)
    if (request.session && request.session.developer) {
        model.Developer.findOne({_id: request.session.developer._id}).then(function (developer) {
            if (developer) {
                response.status(200).json(developer)
            } else {
                response.status(401).send("Not authenticated.")
            }
        })
    } else {
        response.status(401).send("Not authenticated.")
    }
})
app.delete("/developer_session", authorizeDevRequest, function(request, response) {
    request.session.developer = null
    response.status(200).send("Logged developer user out.")
})
app.post("/developer_session", function (request, response) {//authentication: create session
    //step 1: access user's given credentials - request.body.username and request.body.plainPassword
    //step 2: find user from DB using given username
    model.Developer.findOne({username: request.body.devLoginUsername}).then(function (developer) {
        if (developer) {
            //step 3: if found - verify given password against encryptedPassword from DB
            developer.verifyEncryptedPassword(request.body.devLoginPlainPassword).then(function (match) {
                //step 4: if password is verified - respond with 201
                if (match) {
                    //save user's ID into session data
                    request.session.developer = developer
                    console.log("Request developer session user data:", request.session.developer)
                    response.status(201).json(developer)
                } else {
                    response.status(401).send("Not authenticated.")
                }
            })
        } else {
            response.status(401).send("Not authenticated.")
        }
    })
})
app.post("/city_users", function (request, response) {
    console.log("City users post request body:", request.body)
    const newCity = new model.City({
        cityID: request.body.citySignUpCityID,
        location: request.body.citySignUpCityLocation,
        phone: request.body.citySignUpPhone
    })
    newCity.setEncryptedPassword(request.body.citySignUpPlainPassword).then(function () {
        //at this time, the password has been encrypted and assigned on the user.
        //now save the user and respond to the client.
        newCity.save().then(() => {
            response.status(201).send("Created new user.")
        }).catch((error) => {
            var errorMessages = {}
            if (error.errors) {//mongoose validation failed!
                for (var fieldName in error.errors) {
                    errorMessages[fieldName] = error.errors[fieldName].errorMessages
                }
                response.status(422).send(errorMessages)
            } else if (error.code == 11000) {
                response.status(422).json({cityID: "City user with city ID already exists."})
            } else {
                console.error("Unknown error creating city user:", error)
                response.status(500).send("Unknown error creating city user.")
            }
        })
    })
})
app.get("/city_session", function (request, response) {//Maybe use this in the load functions???
    console.log("getting city user session:", request.session)
    if (request.session && request.session.city) {
        model.City.findOne({_id: request.session.city._id}).then(function (city) {
            if (city) {
                response.status(200).json(city)
            } else {
                response.status(401).send("Not authenticated.")
            }
        })
    } else {
        response.status(401).send("Not authenticated.")
    }
})
app.delete("/city_session", authorizeCityRequest, function(request, response) {
    request.session.city = null
    response.status(200).send("Logged city user out.")
})
app.post("/city_session", function (request, response) {
    model.City.findOne({cityID: request.body.cityLoginCityID}).then(function (city) {
        if (city) {//step 3: if found - verify given password against encryptedPassword from DB
            city.verifyEncryptedPassword(request.body.cityLoginPlainPassword).then(function (match) {//step 4: if password is verified - respond with 201
                if (match) {//save user's ID into session data
                    request.session.city = city
                    console.log("Request session city user data:", request.session.city)
                    console.log("Request session:", request.session)
                    response.status(201).json(city)
                } else {
                    response.status(401).send("Not authenticated.")
                }
            })
        } else {
            response.status(401).send("Not authenticated.")
        }
    })
})
app.listen(8080, function () {
    console.log("Server is running...")
})