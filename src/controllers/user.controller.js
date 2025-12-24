import { asyncHandler } from "../utils/asyncHandler.js";

const regigterUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'ok'
    })
})

export {regigterUser};