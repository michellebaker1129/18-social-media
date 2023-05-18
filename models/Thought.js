const {Schema, model} = require('mongoose');
const reactionSchema = require("./Reaction");
// Schemas define the shape of the documents within the collection.
const thoughtSchema = new Schema({
  // Schemas define the properties of the document
  username: { type: String, required: true, trim:true },
  thoughtText: { type: String, required: true, minlength: 1 , maxlength:280 },
  reactions: [reactionSchema],
  createdAt: {type: Date, default: Date.now, },
}, {
    toJSON: {
        getters:true
    }, 
    id:false
}
);

// Extend methods object with custom method
thoughtSchema.virtual ("reactionCount").get (function(){
    return this.reactions.length;
})
  

// Create model using mongoose.model()
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;