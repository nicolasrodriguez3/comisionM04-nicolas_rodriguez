const { Schema, model } = require("mongoose")

const postSchema = new Schema({
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
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
},
{
	timestamps: true,
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
