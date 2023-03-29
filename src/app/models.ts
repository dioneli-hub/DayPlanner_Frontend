export interface Task {
    id?: number,
    context: string,
    dueDate: string,
    board: string
}

export interface Board {
    id?: number,
    name: string,
    tasks: Task[]
}