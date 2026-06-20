import { Model, Document } from 'mongoose';
export declare abstract class BaseRepository<T extends Document, CreateDto, UpdateDto> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    findAll(query?: any): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(data: CreateDto): Promise<T>;
    update(id: string, data: UpdateDto): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
