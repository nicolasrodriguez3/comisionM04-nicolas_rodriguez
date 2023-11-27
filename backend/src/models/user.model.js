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
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	],
	ImageUrl: {
		type: String,
	},
})

// userSchema.set("toJSON", {
// 	transform: (document, returnedObject) => {
// 		delete returnedObject.__v
// 		delete returnedObject.password
// 	},
// })

userSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id
		delete ret.password
	},
})

const User = model("User", userSchema)

module.exports = User
