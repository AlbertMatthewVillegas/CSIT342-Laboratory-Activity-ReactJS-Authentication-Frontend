export type Response<T> = {
    data: T;
    message: string;
    status: number;
};