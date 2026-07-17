export const createPayment = async (req, res) => {
    try {
        const { amount, itemName } = req.body;

        const paymentData = {
            merchant_id: process.env.PAYFAST_MERCHANT_ID,
            merchant_key: process.env.PAYFAST_MERCHANT_KEY,

            return_url: "http://localhost:5173/payment/success",
            cancel_url: "http://localhost:5173/payment/cancel",
            notify_url: "http://localhost:4000/api/payments/itn",

            amount,
            item_name: itemName,
        };

        res.json({
            success: true,
            paymentData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};