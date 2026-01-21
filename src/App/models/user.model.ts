import { model, Schema } from "mongoose";
import { IUser } from "../../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "Please write first name"],
      trim: true,
      minLength: [
        3,
        "First name must be at least 3 character, but got {VALUE}",
      ],
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxlength: 10,
    },
    age: { type: Number, required: true, min: 18, max: 60 },
    email: {
      type: String,
      required: [true, "User email is required" ],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function(value){
            return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/.test(value)
        },
        message: props => `${props.value} is not valid email! please provide correct email`
      },
    },
    password: { type: String, required: true },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: "You are not provide correct role. got {VALUE}"
      },
      default: "USER",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model("user", userSchema);
