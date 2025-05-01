export interface AuthRequest {
  name: string;
  email: string;
  password: string;
  image: string;
}

export interface AuthResponse {
  token: string;
}
