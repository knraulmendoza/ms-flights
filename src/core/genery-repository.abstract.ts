export abstract class IGeneryRepository<T, I> {
  abstract getAll(): Promise<I[]>;
  abstract getById(id: string | number): Promise<I>;
  abstract create(body: T): Promise<I>;
  abstract update(id: string | number, body: T): Promise<I>;
  abstract delete(id: string | number): Promise<I>;
}
