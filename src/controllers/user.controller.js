import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";



const regigterUser = asyncHandler(async (req, res) => {
    //logic for registering user
    // 1. get user data from frontend
    // 2. validation - not empty
    // 3. check if user already exists - email, username
    // 4. check for images, avatar
    // 5. upload them to cloudinary, avatar
    // 6. create user object - create entry in db
    // 7. remove password and refresh token fields from response
    // 8. check for user creation success/failure
    // 9. return response to frontend

    //1.
    const { username, email, fullName, password } = req.body;
    //2.
    if(
        [fullName, username, email, password].some(field => !field || field.trim() === "")
    ){
        throw new ApiError("All fields are required", 400)
    }
    //3.
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });
    if(existedUser){
        throw new ApiError("User already exists with this email or username", 409)
    }
    //4. & 5.
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError("Avatar is required", 400)
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError("Could not upload avatar, please try again", 500)
    }

    //6.
    const user = await User.create({
        username: username.trim().toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        fullName,
        password
    })

    //7.
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    //8.
    if(!createdUser){
        throw new ApiError("User registration failed, please try again", 500)
    }

    //9.
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));

})

export {regigterUser};