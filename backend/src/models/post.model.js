const { Schema, model } = require("mongoose")

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	modifiedAt: {
		type: Date,
	},
	likes: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
})

postSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id
	},
})

const Post = model("Post", postSchema)

module.exports = Post
