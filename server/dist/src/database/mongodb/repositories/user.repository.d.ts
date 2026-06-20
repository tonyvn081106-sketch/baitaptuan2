import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { UserDocument } from '../schemas/user.schema';
export declare class UserRepository extends BaseRepository<UserDocument, any, any> {
    constructor(model: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
}
