export enum TOAST_TYPES {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
};
export interface ToastType {
    id: number;
    message: string;
    type: TOAST_TYPES;
}