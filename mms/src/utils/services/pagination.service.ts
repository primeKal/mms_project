import { Model, ModelCtor, Includeable } from 'sequelize';

export class PaginationService<T extends Model> {
  private model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async findAll(page: number, pageSize: number, include?: Includeable | Includeable[]): Promise<T[]> {
    try {
      const offset = (page - 1) * pageSize;
      const models = await this.model.findAll({
        offset,
        limit: pageSize,
        include,
      });
      return models;
    } catch (error) {
      throw new Error(`Error retrieving models: ${error}`);
    }
  }
}
