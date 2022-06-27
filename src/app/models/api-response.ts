export interface ApiResponse {
  statusCode?: number;
  message?: string;
  metaData?: any;
}

export class TokenData {
  userId?: number;
  userRole?: number;
  isGuest?: any;
  clientSignature?: null;

  constructor(userId = -1, roleId = 2, isGuest = true, signature = null) {
    this.userId = userId;
    this.userRole = roleId;
    this.clientSignature = signature;
  }

  public static createGuest() {
    return new TokenData();
  }

  public static createUser(userId, roleId) {
    return new TokenData(userId, roleId, false, null);
  }
}
