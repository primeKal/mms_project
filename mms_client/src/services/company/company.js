/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class CompanyAPI {
  static getCompanyInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await baseAPI.get("company");
        const result = response.data;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  static updateCompanyInfo(companyInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await baseAPI.put("company", companyInfo);
        const result = response.data;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async createAccount(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await baseAPI.post("company", account);
        console.log(response);
        if (response.status === 201) {
          return resolve(response.data);
        }
      } catch (error) {
        return reject(error);
      }
    });
  }
}

export default CompanyAPI;
