const { Schema, model } = require("mongoose")

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	type: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
})

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		delete returnedObject.__v
		delete returnedObject.password
	},
})

const User = model("User", userSchema)

module.exports = User