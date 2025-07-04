export interface ListTodosDTO {
    title?: string;
    body?: string;
    due_date_start?: Date; 
    due_date_end?: Date;
    completed?: boolean;
}