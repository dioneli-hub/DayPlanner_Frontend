export class ServiceResponse <T> {
    data?: T;
    message: string = '';
    isSuccess: boolean = true;
}