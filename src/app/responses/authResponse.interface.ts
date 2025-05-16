export interface AuthResponse extends Response{
    accessToken: string;
    refreshToken: string;
    userId: number;
}