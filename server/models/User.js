const mongoose = require('mongoose');

const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const saltFactor = 10;

const UserSchema = new Schema({
    userName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

// pre-save middleware to hash password
userSchema.pre('save', async function(next){
    // skip if not modified
    if (!this.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(saltFactor, function(err, salt) {
        if (err) return next(err);
        
        // hash password
        bcrypt.hash(user.password, salt, function(err,hash){
            if (err) return next(err);
            
            // override the cleartext password
            user.password = hash;
            next();
        })
    })
});

// method to compare incoming password with the hashed in database
UserSchema.methods.comparePassword = function(candidatePassword,cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User',UserSchema);
module.exports = User;

