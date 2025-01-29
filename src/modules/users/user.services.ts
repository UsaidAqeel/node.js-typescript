import { NextFunction } from "express";
import { User, IUsers } from "./user.model";
import { comparePassword, hashPassword, ResponsePacket } from "src/utils";
import { httpStatusCodes } from "src/libs";

export const isEmailExistService = async (
  email: any,
  next: NextFunction
): Promise<boolean | undefined | void> => {
  try {
    const isUser = await User.findOne({ email: email });

    return !!isUser;
  } catch (error) {
    (error as any).statusCode = 400;
    return next(error);
  }
};

export const createUserService = async (
  data: IUsers
): Promise<Record<string, any>> => {
  try {
    const password = await hashPassword(data?.password as string);
    if (!password)
      throw new Error("Error: An error occurred while hashing the password");

    data.password = password;

    const newUser = new User(data);
    const result = await newUser.save();

    const user = result.toJSON();
    delete user.password;

    return ResponsePacket.success(
      httpStatusCodes.CREATED,
      "User Created SuccesFully",
      user
    );
  } catch (error) {
    console.error("Error: Creating user service", error);

    return ResponsePacket.failure(
      httpStatusCodes.NOT_ACCEPTABLE,
      "Failed to create user. Please try again.",
      null
    );
  }
};

export const loginUserSerivce = async (body: {
  password: string;
  email: string;
}): Promise<Record<string, any>> => {
  try {
    const user = await User.findOne({
      email: body.email,
    });

    const userPassword = user?.password as string;
    const isPasswordMatch = await comparePassword(body.password, userPassword);

    if (!isPasswordMatch) {
      return ResponsePacket.failure(
        httpStatusCodes.UNAUTHORIZED,
        "Invalid Email or Password",
        null
      );
    }

    return ResponsePacket.success(
      httpStatusCodes.OK,
      "Login Success",
      null
    );
  } catch (error) {
    console.error("Error: Login user service", error);
    return ResponsePacket.failure(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to login user. Please try again.",
      null
    );
  }
};
