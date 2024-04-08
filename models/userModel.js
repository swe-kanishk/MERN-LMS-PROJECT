import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [3, 'Name must be at least of 3 characters!'],  
        maxLength: [30, 'Name should be less than 30 characters!'],  
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address!'],
    },    
    password: {
        type: String,
        required: [true, 'Your password is required'],
        minLength: [8, 'Password must be at least consist 8 characters!'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: String,

}, {
    timestamps: true
});

const User = model('User', userSchema);

export default User;