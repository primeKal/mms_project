import { Model, ModelCtor, Includeable } from 'sequelize';

export class PaginationService<T extends Model> {
  private model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async findAll(page: number, pageSize: number, include?: Includeable | Includeable[], order?: string, where?: any): Promise<T[]> {
    try {
      const offset = (page - 1) * pageSize;
      const orderBy = order ? [['createdAt', order]] : [['createdAt', 'ASC']];
      const whereClause = where || {}; // Directly use the where parameter if it exists
      const models = await this.model.findAll({
        offset,
        limit: pageSize,
        include,
        order: orderBy as any,
        where: whereClause,
      });
      return models;
    } catch (error) {
      throw new Error(`Error retrieving models: ${error}`);
    }
  }
}
