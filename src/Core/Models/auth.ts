export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRefreshRequest {
  refreshToken: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAtUtc: string;
}
