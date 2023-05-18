const {Schema, Types} = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {type:Schema.Types.ObjectId, default: () => new Types.ObjectId()},
    body: {type:String, minlength: 1, maxlength: 280},
    username: { type: String, required: true, trim:true },
    createdAt: {type: Date, default: Date.now, },
}, {
    toJSON: {
        getters:true
    }, 
    id:false
})

module.exports = reactionSchema;