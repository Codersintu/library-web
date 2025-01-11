import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    username: { 
        type: String,
         required: [true,'username is required'],
         minLength:[3,'Username must be at least 5 character'],
         maxLength:[50,'Name should be less than 50 characters'],
         lowercase:true,
         trim:true,
        },
    email: {
         type: String,
          required: [true,'Email is required'],
          lowercase:true,
          trim:true,
           unique: true,
        },
    password: { 
        type: String,
         required: [true,'password is required'],
         minLength:[8,'password must be at least 8 characters'],
         select:false,
         },
    role: {
      type: String,
      enum:['USER','ADMIN'],
      default:"USER"
    },
  },
  { timestamps: true }
);
UserSchema.methods={
  generateJwtToken: function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            subscription: this.subscription,
            role: this.role,
        },
        process.env.JWT_SECRET || "2A7$uN76*P1c!b%3^xZqG47HJm&8uB",
        {
            expiresIn: process.env.JWT_EXPIRY || "7d",
        }
    );
},

};

const User= mongoose.models.User || mongoose.model("User", UserSchema);
export default  User;