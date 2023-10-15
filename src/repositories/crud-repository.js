const { Logger } = require("winston");
const AppError = require("../utils/errors/appError");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    const res = await this.model.create(data);
    return res;
  }
  async destroy(data) {
    try {
      const res = await this.model.destroy({
        where: { id: data },
      });
      return res;
    } catch (error) {
      Logger.error("error in crud repo: destroy", error.message);
      throw error;
    }
  }
  async get(data) {
    try {
      const res = await this.model.find({
        where: { id: data },
      });
      return res;
    } catch (error) {
      Logger.error("error in crud repo: get", error.message);
      throw error;
    }
  }
  async getAll() {
    try {
      const res = await this.model.findAll();
      return res;
    } catch (error) {
      Logger.error("error in crud repo: getAll", error.message);
      throw error;
    }
  }
  async update(id, data) {
    //data must be object
    try {
      const res = await this.model.update(data, {
        where: { id: id },
      });
      return res;
    } catch (error) {
      Logger.error("error in crud repo: update", error.message);
      throw error;
    }
  }
}
module.exports = CrudRepository;
