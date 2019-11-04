import { Observable } from 'rxjs';

export interface Myfile {
    filename: string;
    size: number;
    date: number;
    path: string;
    id?: string;
    url?: Observable<string>;
}
