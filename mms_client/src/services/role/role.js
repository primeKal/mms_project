import baseAPI from '../base';

class RoleAPI {
  static getRoles() {
    return baseAPI.get('role');
  }
}

export default RoleAPI; 