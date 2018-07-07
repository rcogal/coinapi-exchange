import {Response} from './Response';

export class BaseController {
    public json(error: boolean, data?: any[], message?: string): Response {
        return new Response(error, data, message || '');
    }
}