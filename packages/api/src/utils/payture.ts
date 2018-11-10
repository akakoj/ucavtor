/*!
 * Vendor
 */

const { PaytureInPay } = require('payture-official/apiLib/InPay');

/*!
 * Expo
 */

const inpay = new PaytureInPay('https://sandbox2.payture.com', {
  Key: 'MerchantUcavtor',
  Password: '123',
});

export const init = data => new Promise((resolve, reject) => {
  inpay.init(data, (error, response, body, responseObject) => {
    if (error) reject(error);

    resolve(responseObject);
  });
});

export const status = orderId => new Promise((resolve, reject) => {
  inpay.payStatus(orderId, (error, response, body, responseObject) => {
    if (error) reject(error);

    resolve(responseObject);
  });
});
