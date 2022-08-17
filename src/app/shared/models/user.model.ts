export class User {
    id: string
    firstName: string
    lastName: string
    username: string
    password: string
    email: string
    permissions?: string[]
    status: boolean
}

export class Permission {
    id: string
    code: string
    description: string
    checked?: boolean
}