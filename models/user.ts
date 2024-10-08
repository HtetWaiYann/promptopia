import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email is already registered'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Password is required'],
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'],
    }, 
    image: {
        type: String, 
    },
});

const User = models.User || model('User', UserSchema);

export default User;