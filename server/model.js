const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require("dotenv").config()
mongoose.connect(process.env.DATABASE)
const developerPlanSchema = new mongoose.Schema({applicant_name: {type: String, required: [true, "Applicant name is required."]}, applicant_phone_number: {type: String, required: [true, "Applicant phone number is required."]}, applicant_email: {type: String, required: [true, "Applicant email is required."]}, developer_name: {type: String, required: [true, "Developer name is required."]}, developer_phone_number: {type: String, required: [true, "Developer phone number is required."]}, developer_email: {type: String, required: [true, "Developer email is required."]}, developer_address: {type: String, required: [true, "Developer address is required."]}, applicant_address: {type: String, required: [true, "Applicant address is required."]}, project_name: {type: String, required: [true, "Project name is required."]}, project_address: {type: String, required: [true, "Project address is required."]}, project_type: {type: String, required: [true, "Project type is required."]}, current_zoning: {type: String, required: [true, "Current zoning is required."]}, development_size: {type: Number, required: [true, "Development size is required."]}, waterline_size: {type: Number, required: [true, "Waterline size is required."]}, sewer_size: {type: Number, required: [true, "Sewer size is required."]}, storm_drain_size: {type: Number, required: [true, "Storm drain size is required."]}, power_company: {type: String, required: [true, "Power company is required."]}, internet_company: {type: String, required: [true, "Fiber is required."]}, roadway_width: {type: Number, required: [true, "Roadway width is required."]}, asphalt_width: {type: Number, required: [true, "Asphalt width is required."]}, sidewalk_width: {type: Number, required: [true, "Sidewalk width is required."]}, asphalt_thickness: {type: Number, required: [true, "Asphalt thickness is required."]}, roadbase_thickness: {type: Number, required: [true, "Roadbase thickness is required."]}, approved:{type: Boolean, required: [true, "Approval is required."]}, user: {type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: [true, "Developer plan must belong to a user."]}})
const cityStandardsSchema = new mongoose.Schema({min_development_size: {type: Number, required: [true, "Minimum development size is required."]}, max_development_size: {type: Number, required: [true, "Maximum development size is required."]}, min_waterline_size: {type: Number, required: [true, "Minimum waterline size is required."]}, max_waterline_size: {type: Number, required: [true, "Maximum waterline size is required."]}, min_sewer_size: {type: Number, required: [true, "Minimum sewer size is required."]}, max_sewer_size: {type: Number, required: [true, "Maximum sewer size is required."]}, min_storm_drain_size: {type: Number, required: [true, "Minimum storm drain size is required."]}, max_storm_drain_size: {type: Number, required: [true, "Maximum storm drain size is required."]}, min_roadway_width: {type: Number, required: [true, "Minimum roadway width is required."]}, max_roadway_width: {type: Number, required: [true, "Maximum roadway width is required."]}, min_asphalt_width: {type: Number, required: [true, "Minimum asphalt width is required."]}, max_asphalt_width: {type: Number, required: [true, "Maximum asphalt width is required."]}, min_sidewalk_width: {type: Number, required: [true, "Minimum sidewalk width is required."]}, max_sidewalk_width: {type: Number, required: [true, "Maximum sidewalk width is required."]}, min_asphalt_thickness: {type: Number, required: [true, "Minimum asphalt thickness is required."]}, max_asphalt_thickness: {type: Number, required: [true, "Maximum asphalt thickness is required."]}, min_roadbase_thickness: {type: Number, required: [true, "Minimum roadbase thickness is required."]}, max_roadbase_thickness: {type: Number, required: [true, "Maximum roadbase thickness is required."]}, user: {type: mongoose.Schema.Types.ObjectId, ref: "City", required: [true, "City standards must belong to a user."]}})
const userDeveloperSchema = new mongoose.Schema({name: {type: String, required: [true, "First name is required."]}, username: {type: String, required: [true, "Username is required"], unique: true}, email: {type: String, required: [true, "Email is required"]}, encryptedPassword: {type: String, required: [true, "Password is required."]}, phone: {type: String, required: [true, "Phone number is required."]}, address: {type: String, required: [true, "Address is required."]}}, {toJSON: {versionKey: false, transform: function (doc, ret) {
    delete ret.encryptedPassword
}}})
const userCitySchema = new mongoose.Schema({cityID: {type: String, required: [true, "City ID is required."], unique: true}, encryptedPassword: {type: String, required: [true, "Password is required."]}, location: {type: String, required: [true, "Location is required."]}, phone: {type: String, required: [true, "Phone number is required."]}}, {toJSON: {versionKey: false, transform: function (doc, ret) {
    delete ret.encryptedPassword
}}})
userDeveloperSchema.methods.setEncryptedPassword = function (plainPassword) {//encrypt given plain password and store into model instance.
    var promise = new Promise((resolve, reject) => {
        //resolve is then()
        //reject is catch()
        bcrypt.hash(plainPassword, 12).then((hash) => {
            //set the encryptedPassword value on the model instance.
            this.encryptedPassword = hash
            //resolve the promise, eventually.
            resolve() //this invokes the caller's then() function.
        })
    })
    return promise
}
userDeveloperSchema.methods.verifyEncryptedPassword = function (plainPassword) {//verify an attempted password compared to stored encrypted password.
    var promise = new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, this.encryptedPassword).then((result) => {
            resolve(result)
        })
    })
    return promise
}
userCitySchema.methods.setEncryptedPassword = function (plainPassword) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, 12).then((hash) => {
            this.encryptedPassword = hash
            resolve()
        })
    })
    return promise
}
userCitySchema.methods.verifyEncryptedPassword = function (plainPassword) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, this.encryptedPassword).then((result) => {
            resolve(result)
        })
    })
    return promise
}
const Plan = mongoose.model("developer_plans", developerPlanSchema)
const Standards = mongoose.model("city_standards", cityStandardsSchema)
const Developer = mongoose.model("developer_users", userDeveloperSchema)
const City = mongoose.model("city_users", userCitySchema)
module.exports = {Plan: Plan, Standards: Standards, Developer: Developer, City: City}