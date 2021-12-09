const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        //unique email ,no two users can have the same email 
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            //just in case we need any admin functionality in our app 
            type: Boolean,
            required: true,
            default: false
        },
        picture: {
            type: String,
            required: true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
    },
    { timestamps: true } // display when created and updated 
)

// instructions that before saving, db need to encrypt the user password 
// before saving encrypt the password 
userSchema.pre('save', async function (next) {
    // check if the password is not modified 
    if (!this.isModified('password')) {
        next();
    }
    //otherwise generate a salt from bcrypt
    const salt = await bcrypt.genSaltSync(10);//value=10. the more higher the value the more secure the password 
    // user enter a password, then adding salt to it and then making it encrypted
    this.password = await bcrypt.hash(this.password, salt);
})

//function that decrypt the password 

userSchema.methods.matchPassword = async function (enteredPassword) {
    // compare the passwords from the db and the entered password 
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('UserCollection', userSchema)

