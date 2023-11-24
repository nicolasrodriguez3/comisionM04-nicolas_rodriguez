const { Schema, model } = require("mongoose")

const commentSchema = new Schema({
	postId: {
		type: Schema.Types.ObjectId,
		ref: "Post",
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Comment = model("Comment", commentSchema)

module.exports = Comment
