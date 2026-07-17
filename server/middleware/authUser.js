import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
        console.log("req is:", req);
    console.log("headers:", req?.headers);

    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
console.log("req:", req);
console.log("decoded:", token_decode);
console.log("decoded.id:", token_decode?.id);

        req.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser;