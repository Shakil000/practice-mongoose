import { model, Schema } from "mongoose";
import { INote } from "../../interfaces/note.interface";

const noteSchema = new Schema<INote>({
    title: {type: String, required: true, trim: true},
    content: {type: String, default: ""},
    category: {type: String,
        enum: ["Personal", "Study", "Work", "Other"],
        default: "Personal"
    },
    pinned: {type: Boolean, default: false},
    tags: {
        label: {type: String, require: true},
        color: {type: String, default: "red"},
    }
},
{
    versionKey: false,
    timestamps: true,
})

export const Note = model<INote>("Note", noteSchema);