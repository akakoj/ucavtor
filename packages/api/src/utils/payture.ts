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

export const init = (data: object) => new Promise((resolve, reject) => {
  inpay.init(
    data,
    (error: object, _response: object, _body: object, responseObject: object) => {
      if (error) reject(error);

      resolve(responseObject);
    });
});

export const status = (orderId: string) => new Promise((resolve, reject) => {
  inpay.payStatus(
    orderId,
    (error: object, _response: object, _body: object, responseObject: object) => {
      if (error) reject(error);

      resolve(responseObject);
    });
});
