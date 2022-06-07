import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { IGeneryRepository } from './genery-repository.abstract';
@Injectable()
export class BaseRepository<T, I> implements IGeneryRepository<T, I> {
  constructor(private readonly repository: Model<I>) {}

  getAll(populate?: { populate: string }): Promise<I[]> {
    const getAll = this.repository.find();
    return populate ? getAll.populate(populate.populate).exec() : getAll.exec();
  }
  getById(id: string | number, populate?: { populate: string }): Promise<any> {
    const getById = this.repository.findById(id);
    return populate
      ? getById.populate(populate.populate).exec()
      : getById.exec();
  }
  create(body: T): Promise<I> {
    try {
      return this.repository.create(body);
    } catch (error) {
      throw new RpcException('error');
    }
  }
  update(id: string | number, body: T): Promise<I> {
    return this.repository.findByIdAndUpdate(id, body).exec();
  }
  delete(id: string | number): Promise<I> {
    return this.repository.findByIdAndDelete(id).exec();
  }
}
