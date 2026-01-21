export interface INote {
    title: string,
    content: string,
    category: "Personal" | "Study" | "Work" | "Other",
    pinned: boolean,
    tags: {
        label: string,
        color: string
    }
}