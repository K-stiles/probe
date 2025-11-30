import UserModel, { UserDocument } from "../models/user.model";
import AccountModel from "../models/account.model";
import { NotFoundException, UnauthorizedException } from "../utils/appError";
import { ProviderEnum } from "../enums/account-provider.enum";

export const loginUserService = async ({
  email,
  password,
  provider = ProviderEnum.EMAIL,
}: {
  email: string;
  password: string;
  provider?: string;
}): Promise<Omit<UserDocument, "password">> => {
  const account = await AccountModel.findOne({ provider, providerId: email });
  if (!account) {
    throw new NotFoundException("Invalid email or password");
  }

  const user = await UserModel.findById(account.userId);

  if (!user) {
    throw new NotFoundException("User not found for the given account");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return user.omitPassword();
};
