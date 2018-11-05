/*!
 * Vendor
 */

const { PaytureInPay } = require("payture-official/apiLib/InPay");

/*!
 * Expo
 */

const inpay = new PaytureInPay("https://sandbox2.payture.com", {
  Key: "MerchantUcavtor",
  Password: "123"
});

exports.init = data => new Promise((resolve, reject) => {
  inpay.init(data, function(error, response, body, responseObject) {
    if (error) reject(error);

    resolve(responseObject);
  })
});

exports.status = orderId => new Promise((resolve, reject) => {
  inpay.payStatus(orderId, function(error, response, body, responseObject) {
    if (error) reject(error);

    resolve(responseObject);
  });
});
