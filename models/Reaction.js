const {Schema, Types} = require("mongoose");

// Reactions are comments
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId()
    },
    body: {type:String, minlength: 1, maxlength: 280},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    thoughtId: {type: Schema.Types.ObjectId, ref: "Thought", required: true},
    createdAt: {type: Date, default: Date.now, },
}, {
    toJSON: {
        getters:true
    }, 
    id:false
})

module.exports = reactionSchema;