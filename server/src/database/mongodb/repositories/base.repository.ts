import { Model, Document } from 'mongoose';

export abstract class BaseRepository<T extends Document, CreateDto, UpdateDto> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(query?: any): Promise<T[]> {
    return this.model.find(query).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(data: CreateDto): Promise<T> {
    const createdModel = new this.model(data);
    return createdModel.save();
  }

  async update(id: string, data: UpdateDto): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data as any, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
