import { UUID } from "crypto";
import { Account, LoginDto, RegisterAccountDto } from "src/account";

export interface IAuthService{
    login(requestsBody: LoginDto);
    register(requestsBody: RegisterAccountDto);
    hashData(data: string)
    updateRefreshToken(account_id: UUID, refreshToken: string)
    getTokens(userId: string, username: string,email:string)
    logout(userId: UUID)
    refreshTokens(id:string,refreshToken:string)
} 