import { model, Schema } from "mongoose";
import { INote } from "../../interfaces/note.interface";

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: {
        values: ["Personal", "Study", "Work", "Other"],
        message: "You are not provide correct category. got {VALUE}",
      },
      default: "Personal",
    },
    pinned: { type: Boolean, default: false },
    tags: {
      label: { type: String, require: true },
      color: { type: String, default: "red" },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // This User come from(user.model.ts) "User"-> export const User = model("User", userSchema); This is called refference
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Note = model<INote>("Note", noteSchema);
