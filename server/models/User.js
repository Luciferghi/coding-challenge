const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    selector: {
        type: String,
        required: true,
        minLength: 2
    },
    unique_id: {
        type: String,
        required: true,
        minLength: 2
    },
    terms: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
    },
})

const User = mongoose.model("User", userSchema);
module.exports = User;