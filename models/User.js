const {Schema, model} = require('mongoose');

// Schemas define the shape of the documents within the collection.
const userSchema = new Schema({
  // Schemas define the properties of the document
  username: { type: String, required: true, unique:true, trim:true },
  email: { type: String, required: true, unique:true, match:[/.+@.+\..+/,"please provide a valid email address"] },
  thoughts: [{type:Schema.Types.ObjectId, ref:'Thought'}],
  friends: [{type:Schema.Types.ObjectId, ref:'User'}]
}, {
    toJSON: {
        virtuals:true
    }, 
    id:false
}
);

// Extend methods object with custom method
userSchema.virtual ("friendCount").get (function(){
    return this.friends.length;
})
  

// Create model using mongoose.model()
const User = model('User', userSchema);

module.exports = User;