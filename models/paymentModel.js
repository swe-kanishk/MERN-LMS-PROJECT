import {Schema, model} from 'mongoose';
const paymentSchema = new Schema({
    paymentId: {
        type: String,
        required: [true, 'Payment id is required!'],
    },
    subscriptionId: {
        type: String,
        required: [true, 'Subscription id is required!'],
    },
    signature: {
        type: String,
        required: [true, 'signature is required!'],
    }
},
{ timestamps: true }
);

const Payment = model('Payment', paymentSchema);

export default Payment;