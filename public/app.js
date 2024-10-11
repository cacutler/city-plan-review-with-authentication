Vue.createApp({
    data: function () {
        return {
            authenticated: false,
            showCityStandards: false,
            showDeveloperPlans: true,
            devLogin: true,
            devSignUp: false,
            cityLogin: false,
            citySignUp: false,
            plans: [],
            cityStandards: [],
            applicantName: "",
            applicantPhone: "",
            applicantEmail: "",
            applicantAddress: "",
            developerName: "",
            developerPhone: "",
            developerEmail: "",
            developerAddress: "",
            projectName: "",
            projectAddress: "",
            projectType: "",
            currentZoning: "",
            developmentSize: "",
            waterlineSize: "",
            sewerSize: "",
            stormDrainSize: "",
            powerCompany: "",
            internetCompany: "",
            proposedRoadwayWidth: "",
            proposedAsphaltWidth: "",
            proposedSidewalkWidth: "",
            asphaltThickness: "",
            roadbaseThickness: "",
            minDevelopmentSize: "",
            maxDevelopmentSize: "",
            minWaterlineSize: "",
            maxWaterlineSize: "",
            minSewerSize: "",
            maxSewerSize: "",
            minStormDrainSize: "",
            maxStormDrainSize: "",
            minRoadwayWidth: "",
            maxRoadwayWidth: "",
            minAsphaltWidth: "",
            maxAsphaltWidth: "",
            minSidewalkWidth: "",
            maxSidewalkWidth: "",
            minAsphaltThickness: "",
            maxAsphaltThickness: "",
            minRoadbaseThickness: "",
            maxRoadbaseThickness: "",
            approved: false,
            planErrorMessages: {},
            standardsErrorMessages: {},
            planIsValid: false,
            standardsAreValid: false,
            devLoginUsername: "",
            devLoginPlainPassword: "",
            devSignUpUsername: "",
            devSignUpPlainPassword: "",
            devSignUpEmail: "",
            devSignUpPhone: "",
            devSignUpName: "",
            devSignUpAddress: "",
            cityLoginCityID: "",
            cityLoginPlainPassword: "",
            citySignUpCityID: "",
            citySignUpPlainPassword: "",
            citySignUpPhone: "",
            citySignUpCityLocation: "",
            cityLoginErrorMessages: {},
            citySignUpErrorMessages: {},
            devLoginErrorMessages: {},
            devSignUpErrorMessages: {},
            cityLoginIsValid: false,
            citySignUpIsValid: false,
            devLoginIsValid: false,
            devSignUpIsValid: false,
            devUser: false,
            cityUser: false,
            currentDevUser: {},
            currentCityUser: {}
        };
    },
    methods: {
        addPlan: function () {
            console.log("Add button is clicked.");
            this.developerName = this.currentDevUser.name;
            this.developerPhone = this.currentDevUser.phone;
            this.developerEmail = this.currentDevUser.email;
            this.developerAddress = this.currentDevUser.address;
            if (this.validatePlan()) {
                console.log("Validating a new plan.");
                return;
            }
            if (this.applicantName && this.applicantPhone && this.applicantEmail && this.applicantAddress && this.developerName && this.developerPhone && this.developerEmail && this.developerAddress && this.projectName && this.projectAddress && this.projectType && this.currentZoning && this.powerCompany && this.internetCompany && Number(this.cityStandards.at(0).min_development_size) <= Number(this.developmentSize) && Number(this.developmentSize) <= Number(this.cityStandards.at(0).max_development_size) && Number(this.cityStandards.at(0).min_waterline_size) <= Number(this.waterlineSize) && Number(this.waterlineSize) <= Number(this.cityStandards.at(0).max_waterline_size) && Number(this.cityStandards.at(0).min_sewer_size) <= Number(this.sewerSize) && Number(this.sewerSize) <= Number(this.cityStandards.at(0).max_sewer_size) && Number(this.cityStandards.at(0).min_storm_drain_size) <= Number(this.stormDrainSize) && Number(this.stormDrainSize) <= Number(this.cityStandards.at(0).max_storm_drain_size) && Number(this.cityStandards.at(0).min_roadway_width) <= Number(this.proposedRoadwayWidth) && Number(this.proposedRoadwayWidth) <= Number(this.cityStandards.at(0).max_roadway_width) && Number(this.cityStandards.at(0).min_asphalt_thickness) <= Number(this.proposedAsphaltWidth) && Number(this.proposedAsphaltWidth) <= Number(this.cityStandards.at(0).max_asphalt_width) && Number(this.cityStandards.at(0).min_sidewalk_width) <= Number(this.proposedSidewalkWidth) && Number(this.proposedSidewalkWidth) <= Number(this.cityStandards.at(0).max_sidewalk_width) && Number(this.cityStandards.at(0).min_asphalt_thickness) <= Number(this.asphaltThickness) && Number(this.asphaltThickness) <= Number(this.cityStandards.at(0).max_asphalt_thickness) && Number(this.cityStandards.at(0).min_roadbase_thickness) <= Number(this.roadbaseThickness) && Number(this.roadbaseThickness) <= Number(this.cityStandards.at(0).max_roadbase_thickness)) {
                this.approved = true;
            } else {
                this.approved = false;
            }
            var data = "applicantName=" + encodeURIComponent(this.applicantName);
            data += "&applicantPhone=" + encodeURIComponent(this.applicantPhone);
            data += "&applicantEmail=" + encodeURIComponent(this.applicantEmail);
            data += "&developerName=" + encodeURIComponent(this.developerName);
            data += "&developerPhone=" + encodeURIComponent(this.developerPhone);
            data += "&developerEmail=" + encodeURIComponent(this.developerEmail);
            data += "&developerAddress=" + encodeURIComponent(this.developerAddress);
            data += "&applicantAddress=" + encodeURIComponent(this.applicantAddress);
            data += "&projectName=" + encodeURIComponent(this.projectName);
            data += "&projectAddress=" + encodeURIComponent(this.projectAddress);
            data += "&projectType=" + encodeURIComponent(this.projectType);
            data += "&currentZoning=" + encodeURIComponent(this.currentZoning);
            data += "&developmentSize=" + encodeURIComponent(this.developmentSize);
            data += "&waterlineSize=" + encodeURIComponent(this.waterlineSize);
            data += "&sewerSize=" + encodeURIComponent(this.sewerSize);
            data += "&stormDrainSize=" + encodeURIComponent(this.stormDrainSize);
            data += "&powerCompany=" + encodeURIComponent(this.powerCompany);
            data += "&internetCompany=" + encodeURIComponent(this.internetCompany);
            data += "&roadwayWidth=" + encodeURIComponent(this.proposedRoadwayWidth);
            data += "&asphaltWidth=" + encodeURIComponent(this.proposedAsphaltWidth);
            data += "&sidewalkWidth=" + encodeURIComponent(this.proposedSidewalkWidth);
            data += "&asphaltThickness=" + encodeURIComponent(this.asphaltThickness);
            data += "&roadbaseThickness=" + encodeURIComponent(this.roadbaseThickness);
            data += "&approved=" + encodeURIComponent(this.approved);
            console.log("New plan being sent:", data);
            fetch("/developer_plans", {
                credentials: "include",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    console.log("New plan posted.");
                    this.loadPlans();
                    this.$refs.form.reset();
                }
            });
        },
        deletePlan: function (developer_planID) {
            console.log("Plan being deleted:", developer_planID);
            fetch("/developer_plans/" + developer_planID, {
                credentials: "include",
                method: "DELETE"
            }).then((response) => {
                console.log("Plan was deleted from server.");
                this.loadPlans();
            });
        },
        editPlan: function (developer_planID) {
            console.log("Developer plan being edited:", developer_planID);
            fetch("/developer_plans/" + developer_planID, {
                credentials: "include"
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((planFromServer) => {
                        console.log("Received single plan from server:", planFromServer);
                        this.applicantName = planFromServer.applicant_name;
                        this.applicantPhone = planFromServer.applicant_phone_number;
                        this.applicantEmail = planFromServer.applicant_email;
                        this.applicantAddress = planFromServer.applicant_address;
                        this.projectName = planFromServer.project_name;
                        this.projectAddress = planFromServer.project_address;
                        this.projectType = planFromServer.project_type;
                        this.currentZoning = planFromServer.current_zoning;
                        this.developmentSize = planFromServer.development_size;
                        this.waterlineSize = planFromServer.waterline_size;
                        this.sewerSize = planFromServer.sewer_size;
                        this.stormDrainSize = planFromServer.storm_drain_size;
                        this.powerCompany = planFromServer.power_company;
                        this.internetCompany = planFromServer.internet_company;
                        this.proposedAsphaltWidth = planFromServer.asphalt_width;
                        this.proposedRoadwayWidth = planFromServer.roadway_width;
                        this.proposedSidewalkWidth = planFromServer.sidewalk_width;
                        this.asphaltThickness = planFromServer.asphalt_thickness;
                        this.roadbaseThickness = planFromServer.roadbase_thickness;
                    });
                }
            });
        },
        updatePlan: function (developer_planID) {
            console.log("Update was clicked.");
            this.developerName = this.currentDevUser.name;
            this.developerPhone = this.currentDevUser.phone;
            this.developerEmail = this.currentDevUser.email;
            this.developerAddress = this.currentDevUser.address;
            if (this.validatePlan()) {
                console.log("Validating an updated plan.");
                return;
            }
            console.log("Updated plan was validated.");
            console.log("Plan being updated:", developer_planID);
            console.log("City Standards:", this.cityStandards);
            if (this.applicantName && this.applicantPhone && this.applicantEmail && this.applicantAddress && this.developerName && this.developerPhone && this.developerEmail && this.developerAddress && this.projectName && this.projectAddress && this.projectType && this.currentZoning && this.powerCompany && this.internetCompany && Number(this.cityStandards.at(0).min_development_size) <= Number(this.developmentSize) && Number(this.developmentSize) <= Number(this.cityStandards.at(0).max_development_size) && Number(this.cityStandards.at(0).min_waterline_size) <= Number(this.waterlineSize) && Number(this.waterlineSize) <= Number(this.cityStandards.at(0).max_waterline_size) && Number(this.cityStandards.at(0).min_sewer_size) <= Number(this.sewerSize) && Number(this.sewerSize) <= Number(this.cityStandards.at(0).max_sewer_size) && Number(this.cityStandards.at(0).min_storm_drain_size) <= Number(this.stormDrainSize) && Number(this.stormDrainSize) <= Number(this.cityStandards.at(0).max_storm_drain_size) && Number(this.cityStandards.at(0).min_roadway_width) <= Number(this.proposedRoadwayWidth) && Number(this.proposedRoadwayWidth) <= Number(this.cityStandards.at(0).max_roadway_width) && Number(this.cityStandards.at(0).min_asphalt_thickness) <= Number(this.proposedAsphaltWidth) && Number(this.proposedAsphaltWidth) <= Number(this.cityStandards.at(0).max_asphalt_width) && Number(this.cityStandards.at(0).min_sidewalk_width) <= Number(this.proposedSidewalkWidth) && Number(this.proposedSidewalkWidth) <= Number(this.cityStandards.at(0).max_sidewalk_width) && Number(this.cityStandards.at(0).min_asphalt_thickness) <= Number(this.asphaltThickness) && Number(this.asphaltThickness) <= Number(this.cityStandards.at(0).max_asphalt_thickness) && Number(this.cityStandards.at(0).min_roadbase_thickness) <= Number(this.roadbaseThickness) && Number(this.roadbaseThickness) <= Number(this.cityStandards.at(0).max_roadbase_thickness)) {
                this.approved = true;
                console.log("Approved:", this.approved);
                console.log("City Standards:", this.cityStandards);
            } else {
                this.approved = false;
                console.log("Approved:", this.approved);
                console.log("City Standards:", this.cityStandards);
            }
            var data = "applicantName=" + encodeURIComponent(this.applicantName);
            data += "&applicantPhone=" + encodeURIComponent(this.applicantPhone);
            data += "&applicantEmail=" + encodeURIComponent(this.applicantEmail);
            data += "&developerName=" + encodeURIComponent(this.developerName);
            data += "&developerPhone=" + encodeURIComponent(this.developerPhone);
            data += "&developerEmail=" + encodeURIComponent(this.developerEmail);
            data += "&developerAddress=" + encodeURIComponent(this.developerAddress);
            data += "&applicantAddress=" + encodeURIComponent(this.applicantAddress);
            data += "&projectName=" + encodeURIComponent(this.projectName);
            data += "&projectAddress=" + encodeURIComponent(this.projectAddress);
            data += "&projectType=" + encodeURIComponent(this.projectType);
            data += "&currentZoning=" + encodeURIComponent(this.currentZoning);
            data += "&developmentSize=" + encodeURIComponent(this.developmentSize);
            data += "&waterlineSize=" + encodeURIComponent(this.waterlineSize);
            data += "&sewerSize=" + encodeURIComponent(this.sewerSize);
            data += "&stormDrainSize=" + encodeURIComponent(this.stormDrainSize);
            data += "&powerCompany=" + encodeURIComponent(this.powerCompany);
            data += "&internetCompany=" + encodeURIComponent(this.internetCompany);
            data += "&roadwayWidth=" + encodeURIComponent(this.proposedRoadwayWidth);
            data += "&asphaltWidth=" + encodeURIComponent(this.proposedAsphaltWidth);
            data += "&sidewalkWidth=" + encodeURIComponent(this.proposedSidewalkWidth);
            data += "&asphaltThickness=" + encodeURIComponent(this.asphaltThickness);
            data += "&roadbaseThickness=" + encodeURIComponent(this.roadbaseThickness);
            data += "&approved=" + encodeURIComponent(this.approved);
            console.log("Updated plan being sent:", data);
            fetch("/developer_plans/" + developer_planID, {
                credentials: "include",
                method: "PUT",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 200) {
                    console.log("Updated plan sent and loaded.");
                    this.loadPlans();
                    this.$refs.form.reset();
                }
            });
        },
        loadPlans: function () {
            fetch("/developer_plans", {
                credentials: "include"
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((plansFromServer) => {
                        console.log("Received developer plans from API:", plansFromServer);
                        this.plans = plansFromServer;
                    });
                }
            });
        },
        validatePlan: function () {
            this.planErrorMessages = {};
            if (this.applicantName == "") {
                this.planErrorMessages.applicantName = "Please enter an applicant name.";
            }
            if (this.applicantPhone == "") {
                this.planErrorMessages.applicantPhone = "Please enter an applicant phone number.";
            }
            if (this.applicantEmail == "") {
                this.planErrorMessages.applicantEmail = "Please enter an applicant email.";
            }
            if (this.applicantAddress == "") {
                this.planErrorMessages.applicantAddress = "Please enter an applicant address.";
            }
            if (this.projectName == "") {
                this.planErrorMessages.projectName = "Please enter a project name.";
            }
            if (this.projectAddress == "") {
                this.planErrorMessages.projectAddress = "Please enter a project address.";
            }
            if (this.projectType == "") {
                this.planErrorMessages.projectType = "Please enter a project type.";
            }
            if (this.currentZoning == "") {
                this.planErrorMessages.currentZoning = "Please enter a current zoning.";
            }
            if (this.developmentSize == "") {
                this.planErrorMessages.developmentSize = "Please enter a development size.";
            }
            if (this.waterlineSize == "") {
                this.planErrorMessages.waterlineSize = "Please enter a waterline size.";
            }
            if (this.sewerSize == "") {
                this.planErrorMessages.sewerSize = "Please enter a sewer size.";
            }
            if (this.stormDrainSize == "") {
                this.planErrorMessages.stormDrainSize = "Please enter a storm drain size.";
            }
            if (this.powerCompany == "") {
                this.planErrorMessages.powerCompany = "Please enter a power company.";
            }
            if (this.internetCompany == "") {
                this.planErrorMessages.internetCompany = "Please enter a fiber company";
            }
            if (this.proposedRoadwayWidth == "") {
                this.planErrorMessages.proposedRoadwayWidth = "Please enter a proposed roadway width.";
            }
            if (this.proposedAsphaltWidth == "") {
                this.planErrorMessages.proposedAsphaltWidth = "Please enter a proposed asphalt width.";
            }
            if (this.proposedSidewalkWidth == "") {
                this.planErrorMessages.proposedSidewalkWidth = "Please enter a proposed sidewalk width.";
            }
            if (this.asphaltThickness == "") {
                this.planErrorMessages.asphaltThickness = "Please enter an asphalt thickness.";
            }
            if (this.roadbaseThickness == "") {
                this.planErrorMessages.roadbaseThickness = "Please enter a roadbase thickness.";
            }
            return this.planIsValid;
        },
        validPlan: function () {
            if (Object.keys(this.planErrorMessages).length > 0) {
                this.planIsValid = false;
            } else {
                this.planIsValid = true;
            }
        },
        errorMessageForPlanField: function (field) {
            return this.planErrorMessages[field];
        },
        errorStyleForPlanField: function (field) {
            if (this.errorMessageForPlanField(field)) {
                return {color: "red"};
            } else {
                return {};
            }
        },
        editStandards: function (standardsID) {
            console.log("City standards being edited:", standardsID);
            fetch("/city_standards/" + standardsID, {
                credentials: "include"
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((standardFromServer) => {
                        this.minDevelopmentSize = standardFromServer.min_development_size;
                        this.maxDevelopmentSize = standardFromServer.max_development_size;
                        this.minWaterlineSize = standardFromServer.min_waterline_size;
                        this.maxWaterlineSize = standardFromServer.max_waterline_size;
                        this.minSewerSize = standardFromServer.min_sewer_size;
                        this.maxSewerSize = standardFromServer.max_sewer_size;
                        this.minStormDrainSize = standardFromServer.min_storm_drain_size;
                        this.maxStormDrainSize = standardFromServer.max_storm_drain_size;
                        this.minRoadwayWidth = standardFromServer.min_roadway_width;
                        this.maxRoadwayWidth = standardFromServer.max_roadway_width;
                        this.minAsphaltWidth = standardFromServer.min_roadway_width;
                        this.maxAsphaltWidth = standardFromServer.max_asphalt_width;
                        this.minSidewalkWidth = standardFromServer.min_sidewalk_width;
                        this.maxSidewalkWidth = standardFromServer.max_sidewalk_width;
                        this.minAsphaltThickness = standardFromServer.min_asphalt_thickness;
                        this.maxAsphaltThickness = standardFromServer.max_asphalt_thickness;
                        this.minRoadbaseThickness = standardFromServer.min_roadbase_thickness;
                        this.maxRoadbaseThickness = standardFromServer.max_roadbase_thickness;
                    });
                }
            });
        },
        updateStandards: function (standardsID) {
            console.log("Update was clicked");
            if (this.validateStandards()) {
                return;
            }
            console.log("Standards were validated.");
            console.log("City standards being updated:", standardsID);
            var data = "minDevelopmentSize=" + encodeURIComponent(this.minDevelopmentSize);
            data += "&maxDevelopmentSize=" + encodeURIComponent(this.maxDevelopmentSize);
            data += "&minWaterlineSize=" + encodeURIComponent(this.minWaterlineSize);
            data += "&maxWaterlineSize=" + encodeURIComponent(this.maxWaterlineSize);
            data += "&minSewerSize=" + encodeURIComponent(this.minSewerSize);
            data += "&maxSewerSize=" + encodeURIComponent(this.maxSewerSize);
            data += "&minStormDrainSize=" + encodeURIComponent(this.minStormDrainSize);
            data += "&maxStormDrainSize=" + encodeURIComponent(this.maxStormDrainSize);
            data += "&minRoadwayWidth=" + encodeURIComponent(this.minRoadwayWidth);
            data += "&maxRoadwayWidth=" + encodeURIComponent(this.maxRoadwayWidth);
            data += "&minAsphaltWidth=" + encodeURIComponent(this.minAsphaltWidth);
            data += "&maxAsphaltWidth=" + encodeURIComponent(this.maxAsphaltWidth);
            data += "&minSidewalkWidth=" + encodeURIComponent(this.minSidewalkWidth);
            data += "&maxSidewalkWidth=" + encodeURIComponent(this.maxSidewalkWidth);
            data += "&minAsphaltThickness=" + encodeURIComponent(this.minAsphaltThickness);
            data += "&maxAsphaltThickness=" + encodeURIComponent(this.maxAsphaltThickness);
            data += "&minRoadbaseThickness=" + encodeURIComponent(this.minRoadbaseThickness);
            data += "&maxRoadbaseThickness=" + encodeURIComponent(this.maxRoadbaseThickness);
            console.log("Updated standards being sent:", data);
            fetch("/city_standards/" + standardsID, {
                credentials: "include",
                method: "PUT",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 200) {
                    console.log("Updated standards sent and loaded.");
                    this.loadStandards();
                    this.$refs.form.reset();
                }
            });
        },
        createDevUser: function () {
            console.log("Developer sign up button was clicked.");
            if (this.validateDevSignUp()) {
                return;
            }
            var data = "devSignUpUsername=" + encodeURIComponent(this.devSignUpUsername);
            data += "&devSignUpPlainPassword=" + encodeURIComponent(this.devSignUpPlainPassword);
            data += "&devSignUpName=" + encodeURIComponent(this.devSignUpName);
            data += "&devSignUpPhone=" + encodeURIComponent(this.devSignUpPhone);
            data += "&devSignUpEmail=" + encodeURIComponent(this.devSignUpEmail);
            data += "&devSignUpAddress=" + encodeURIComponent(this.devSignUpAddress);
            console.log("Developer sign up request data being sent:", data);
            fetch("/developer_users", {
                credentials: "include",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    this.devSignUpUsername = "";
                    this.devSignUpPlainPassword = "";
                    this.devSignUpName = "";
                    this.devSignUpEmail = "";
                    this.devSignUpPhone = "";
                    this.devSignUpAddress = "";
                    console.log("Developer user created.");
                    alert("Developer user was created.");
                }
            });
        },
        createCityUser: function () {
            console.log("City sign up button was clicked.");
            if (this.validateCitySignUp()) {
                return;
            }
            var data = "citySignUpCityID=" + encodeURIComponent(this.citySignUpCityID);
            data += "&citySignUpPlainPassword=" + encodeURIComponent(this.citySignUpPlainPassword);
            data += "&citySignUpCityLocation=" + encodeURIComponent(this.citySignUpCityLocation);
            data += "&citySignUpPhone=" + encodeURIComponent(this.citySignUpPhone);
            console.log("City sign up request data being sent:", data);
            fetch("/city_users", {
                credentials: "include",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    this.citySignUpCityID = "";
                    this.citySignUpPlainPassword = "";
                    this.citySignUpCityLocation = "";
                    this.citySignUpPhone = "";
                    console.log("City user created.");
                    alert("City user was created.");
                }
            });
        },
        loginDevUser: function () {
            console.log("Developer login button was clicked.");
            if (this.validateDevLogin()) {
                return;
            }
            var data = "devLoginUsername=" + encodeURIComponent(this.devLoginUsername);
            data += "&devLoginPlainPassword=" + encodeURIComponent(this.devLoginPlainPassword);
            console.log("Developer login request data being sent:", data);
            fetch("/developer_session", {
                credentials: "include",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    response.json().then((devdata) => {
                        console.log("Seeing if this is the dev user data:", devdata);
                        this.currentDevUser = devdata;
                    });
                    this.authenticated = true;
                    this.devUser = true;
                    this.devLoginUsername = "";
                    this.devLoginPlainPassword = "";
                    console.log("Developer user authenticated.");
                }
            });
        },
        logoutDevUser: function () {
            console.log("Developer logout button was clicked.");
            fetch("/developer_session", {
                credentials: "include",
                method: "DELETE"
            }).then((response) => {
                this.authenticated = false;
                this.devUser = false;
                this.currentDevUser = {};
            });
        },
        loginCityUser: function () {
            console.log("City login button was clicked.");
            if (this.validateCityLogin()) {
                return;
            }
            var data = "cityLoginCityID=" + encodeURIComponent(this.cityLoginCityID);
            data += "&cityLoginPlainPassword=" + encodeURIComponent(this.cityLoginPlainPassword);
            console.log("City login request data being sent:", data);
            fetch("/city_session", {
                credentials: "include",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201) {
                    response.json().then((citydata) => {
                        console.log(citydata);
                        this.currentCityUser = citydata;
                    });
                    this.authenticated = true;
                    this.cityUser = true;
                    this.cityLoginCityID = "";
                    this.cityLoginPlainPassword = "";
                    console.log("City user authenticated.");
                }
            });
        },
        logoutCityUser: function () {
            console.log("City logout button was clicked.");
            fetch("/city_session", {
                credentials: "include",
                method: "DELETE"
            }).then((response) => {
                this.authenticated = false;
                this.cityUser = false;
                this.currentCityUser = {};
            });
        },
        loadStandards: function () {
            console.log("Loading standards.");
            fetch("/city_standards", {
                credentials: "include"
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((standardsFromServer) => {
                        console.log("Received city standards from API:", standardsFromServer);
                        this.cityStandards = standardsFromServer;
                    });
                }
            });
        },
        getCitySession: function () {
            fetch("/city_session", {
                credentials: "include"
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((citydata) => {
                        console.log(citydata);
                        this.currentCityUser = citydata;
                    });
                    this.cityUser = true;
                    this.authenticated = true;
                }
            });
        },
        getDevSession: function () {
            fetch("/developer_session", {
                credentials: "include"
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((devdata) => {
                        console.log(devdata);
                        this.currentDevUser = devdata;
                    });
                    this.devUser = true;
                    this.authenticated = true;
                }
            });
        },
        validateStandards: function () {
            this.standardsErrorMessages = {};
            if (this.minDevelopmentSize == "") {
                this.standardsErrorMessages.minDevelopmentSize = "Please enter a minimum development size.";
            }
            if (this.maxDevelopmentSize == "") {
                this.standardsErrorMessages.maxDevelopmentSize = "Please enter a maximum development size.";
            }
            if (this.minWaterlineSize == "") {
                this.standardsErrorMessages.minWaterlineSize = "Please enter a minimum waterline size.";
            }
            if (this.maxWaterlineSize == "") {
                this.standardsErrorMessages.maxWaterlineSize = "Please enter a maximum waterline size.";
            }
            if (this.minSewerSize == "") {
                this.standardsErrorMessages.minSewerSize = "Please enter a minimum sewer size.";
            }
            if (this.maxSewerSize == "") {
                this.standardsErrorMessages.maxSewerSize = "Please enter a maximum sewer size.";
            }
            if (this.minStormDrainSize == "") {
                this.standardsErrorMessages.minStormDrainSize = "Please enter a minimum storm drain size.";
            }
            if (this.maxStormDrainSize == "") {
                this.standardsErrorMessages.maxStormDrainSize = "Please enter a maximum storm drain size.";
            }
            if (this.minRoadwayWidth == "") {
                this.standardsErrorMessages.minRoadwayWidth = "Please enter a minimum roadway width.";
            }
            if (this.maxRoadwayWidth == "") {
                this.standardsErrorMessages.maxRoadwayWidth = "Please enter a maximum roadway width.";
            }
            if (this.minAsphaltWidth == "") {
                this.standardsErrorMessages.minAsphaltWidth = "Please enter a minimum asphalt width.";
            }
            if (this.maxAsphaltWidth == "") {
                this.standardsErrorMessages.maxAsphaltWidth = "Please enter a maximum asphalt width.";
            }
            if (this.minSidewalkWidth == "") {
                this.standardsErrorMessages.minSidewalkWidth = "Please enter a minimum sidewalk width.";
            }
            if (this.maxSidewalkWidth == "") {
                this.standardsErrorMessages.maxSidewalkWidth = "Please enter a maximum sidewalk width.";
            }
            if (this.minAsphaltThickness == "") {
                this.standardsErrorMessages.minAsphaltThickness = "Please enter a minimum asphalt thickness.";
            }
            if (this.maxAsphaltThickness == "") {
                this.standardsErrorMessages.maxAsphaltThickness = "Please enter a maximum asphalt thickness.";
            }
            if (this.minRoadbaseThickness == "") {
                this.standardsErrorMessages.minRoadbaseThickness = "Please enter a minimum roadbase thickness.";
            }
            if (this.maxRoadbaseThickness == "") {
                this.standardsErrorMessages.maxRoadbaseThickness = "Please enter a maximum roadbase thickness.";
            }
            return this.standardsAreValid;
        },
        validStandards: function () {
            if (Object.keys(this.standardsErrorMessages).length > 0) {
                this.standardsAreValid = false;
            } else {
                this.standardsAreValid = true;
            }
        },
        errorMessageForStandardsField: function (field) {
            return this.standardsErrorMessages[field];
        },
        errorStyleForStandardsField: function (field) {
            if (this.errorMessageForStandardsField(field)) {
                return {color:"red"};
            } else {
                return {};
            }
        },
        showStandards: function () {
            console.log("Show standards button was clicked.");
            this.showCityStandards = true;
            this.showDeveloperPlans = false;
            this.loadStandards();
            this.loadPlans();
        },
        showPlans: function () {
            console.log("Show plans button was clicked.");
            this.showCityStandards = false;
            this.showDeveloperPlans = true;
            this.loadPlans();
            this.loadStandards();
        },
        showDevLogin: function () {
            console.log("Show developer login button was clicked.");
            this.cityLogin = false;
            this.citySignUp = false;
            this.devLogin = true;
            this.devSignUp = false;
        },
        showDevSignUp: function () {
            console.log("Show developer sign up button was clicked.");
            this.cityLogin = false;
            this.citySignUp = false;
            this.devLogin = false;
            this.devSignUp = true;
        },
        showCityLogin: function () {
            console.log("Show city login button was clicked.");
            this.cityLogin = true;
            this.citySignUp = false;
            this.devLogin = false;
            this.devSignUp = false;
        },
        showCitySignUp: function () {
            console.log("Show city sign up button was clicked.");
            this.cityLogin = false;
            this.citySignUp = true;
            this.devLogin = false;
            this.devSignUp = false;
        },
        validateCityLogin: function () {
            this.cityLoginErrorMessages = {};
            if (this.cityLoginCityID == "") {
                this.cityLoginErrorMessages.cityLoginCityID = "Please enter your city ID.";
            }
            if (this.cityLoginPlainPassword == "") {
                this.cityLoginErrorMessages.cityLoginPlainPassword = "Please enter your password.";
            }
            return this.cityLoginIsValid;
        },
        validateCitySignUp: function () {
            this.citySignUpErrorMessages = {};
            if (this.citySignUpCityID == "") {
                this.citySignUpErrorMessages.citySignUpCityID = "Please enter a new city ID.";
            }
            if (this.citySignUpPlainPassword == "") {
                this.citySignUpErrorMessages.citySignUpPlainPassword = "Please enter a new password.";
            }
            if (this.citySignUpPhone == "") {
                this.citySignUpErrorMessages.citySignUpPhone = "Please enter your city phone number.";
            }
            if (this.citySignUpCityLocation == "") {
                this.citySignUpErrorMessages.citySignUpCityLocation = "Please enter your city location.";
            }
            return this.citySignUpIsValid;
        },
        validateDevLogin: function () {
            this.devLoginErrorMessages = {};
            if (this.devLoginUsername == "") {
                this.devLoginErrorMessages.devLoginUsername = "Please enter your username.";
            }
            if (this.devLoginPlainPassword == "") {
                this.devLoginErrorMessages.devLoginPlainPassword = "Please enter your password.";
            }
            this.devLoginIsValid;
        },
        validateDevSignUp: function () {
            this.devSignUpErrorMessages = {};
            if (this.devSignUpUsername == "") {
                this.devSignUpErrorMessages.devSignUpUsername = "Please enter a new username.";
            }
            if (this.devSignUpPlainPassword == "") {
                this.devSignUpErrorMessages.devSignUpPlainPassword = "Please enter a new password.";
            }
            if (this.devSignUpName == "") {
                this.devSignUpErrorMessages.devSignUpName = "Please enter your name.";
            }
            if (this.devSignUpPhone == "") {
                this.devSignUpErrorMessages.devSignUpPhone = "Please enter your phone number.";
            }
            if (this.devSignUpEmail == "") {
                this.devSignUpErrorMessages.devSignUpEmail = "Please enter your email.";
            }
            if (this.devSignUpAddress == "") {
                this.devSignUpErrorMessages.devSignUpAddress = "Please enter your address.";
            }
            this.devSignUpIsValid;
        },
        validDevSignUp: function () {
            if (Object.keys(this.devSignUpErrorMessages).length > 0) {
                this.devSignUpIsValid = false;
            } else {
                this.devSignUpIsValid = true;
            }
        },
        validDevLogin: function () {
            if (Object.keys(this.devLoginErrorMessages).length > 0) {
                this.devLoginIsValid = false;
            } else {
                this.devLoginIsValid = true;
            }
        },
        validCitySignUp: function () {
            if (Object.keys(this.citySignUpErrorMessages).length > 0) {
                this.citySignUpIsValid = false;
            } else {
                this.citySignUpIsValid = true;
            }
        },
        validCityLogin: function () {
            if (Object.keys(this.cityLoginErrorMessages).length > 0) {
                this.cityLoginIsValid = false;
            } else {
                this.cityLoginIsValid = true;
            }
        },
        errorMessageForCityLogin: function (field) {
            return this.cityLoginErrorMessages[field];
        },
        errorStyleForCityLogin: function (field) {
            if (this.errorMessageForCityLogin(field)) {
                return {color:"red"};
            } else {
                return {};
            }
        },
        errorMessageForCitySignUp: function (field) {
            return this.citySignUpErrorMessages[field];
        },
        errorStyleForCitySignUp: function (field) {
            if (this.errorMessageForCitySignUp(field)) {
                return {color:"red"};
            } else {
                return {};
            }
        },
        errorMessageForDevLogin: function (field) {
            return this.devLoginErrorMessages[field];
        },
        errorStyleForDevLogin: function (field) {
            if (this.errorMessageForDevLogin(field)) {
                return {color:"red"};
            } else {
                return {};
            }
        },
        errorMessageForDevSignUp: function (field) {
            return this.devSignUpErrorMessages[field];
        },
        errorStyleForDevSignUp: function (field) {
            if (this.errorMessageForDevSignUp(field)) {
                return {color:"red"};
            } else {
                return {};
            }
        }
    },
    created: function () {
        this.loadPlans();
        this.loadStandards();
        this.getCitySession();
        this.getDevSession();
    }
}).mount("#app");