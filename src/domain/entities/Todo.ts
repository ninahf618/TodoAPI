export interface Todo {
    id: string;
    title: string;
    body: string | null;
    due_date: Date | null;
    completed_at: Date | null;
    created_at: Date;
}