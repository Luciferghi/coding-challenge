const { default: mongoose } = require("mongoose")

const selectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sub: {
        type: Array,
        default: []
    },
})

const Selector = mongoose.model("Selector", selectorSchema);
module.exports = Selector;