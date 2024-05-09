export interface CreateAuthorPayload {
    name: string;
    email: string;
    age: number;
    status?: 'active' | 'inactive';
};

export type UpdateAuthorPayload = {
    id: string;
    name: string;
    email: string;
    age: number;
};

export type DeleteAuthorPayload = {
    id: string;
};
