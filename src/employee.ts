import * as mongodb from 'mongodb';

export interface  Employee {
    name: string;
    position: string;
    level: 'junior' | 'mid' | 'senior';
    id?: mongodb.ObjectId;
}