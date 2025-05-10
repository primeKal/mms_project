import baseAPI from "../base";

class UserAPI {
  static getUsersByCompany() {
    return baseAPI.get('user/company');
  }

  static updateUser(id, data) {
    return baseAPI.put(`user/${id}`, data);
  }

  static createUser(data) {
    return baseAPI.post('user', data);
  }
}

export default UserAPI; 