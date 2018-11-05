/**
 * Organizations controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle organizations ( create, update and etc )
 *
 *
 * Module dependencies
 */
const mongoose = require('mongoose');

const { send, json } = require('micro');
const { hashSync, compareSync } = require('bcryptjs');
const { generate } = require('generate-password');
const { createTransport } = require('nodemailer');
const { sign } = require('jsonwebtoken');

const Organization = mongoose.model('Organization');

const sendPasswordToEmail = async ({ email }, password) => {
  try {
    const transporter = createTransport({
      service: 'Yandex',
      auth: {
        user: 'access@ucavtor.ru',
        pass: 'uSFC9keV4nZaOlYbAGVVwB',
      },
    });

    const mailOptions = {
      from: 'access@ucavtor.ru',
      to: `${email}, access@ucavtor.ru`,
      subject: 'Доступ к сайту - ucavtor.ru',
      html: `
        <p>Доступы для входа на сайт:</p>

        <p><strong>Имя пользователя:</strong> ${email}
        <p><strong>Пароль:</strong>  ${password}

        <p>Вход на сайт осуществляется через <a href="http://company.ucavtor.ru/login">Панель управления</a></p>
      `,
    };

    return transporter.sendMail(mailOptions);
  } catch(e) {
    return send(res, 500, e);
  }
}

/*!
 * Expos
 */

exports.index = async (req, res) => {
  const organizations = await Organization.find();

  return send(res, 200, organizations);
};

exports.create = async (req, res) => {
  try {
    const organization = await json(req);
    const hashPassword = generate({length: 10, numbers: true });
    const password = hashSync(hashPassword, 8);

    const organiztaionObj = await Organization.create({ ...organization, password });

    const emailStatus = await sendPasswordToEmail(organiztaionObj, hashPassword);

    return send(res, 200);
  } catch(e) {
    return send(res, 500, e);
  }
};

exports.employers = (req, res) => {
  return send(res, 200, { employers: [{
    key: '1',
    fio: 'Тройнов Евгений Александрович',
    position: 'ИТ - Специалист',
    email: 'troinof@yandex.ru',
    status: 1
  }, {
    key: '2',
    fio: 'Кожевников Андрей Алексеевич',
    position: 'Директор',
    email: 'avtorka@list.ru',
    status: 0
  }]});
}

exports.update = async (req, res) => {
  try {
    const organization = await json(req);

    await Organization.update({_id: organization.id }, organization);
    return send(res, 200);
  } catch(e) {
    return send(res, 500, e);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = await json(req);
    const user = await Organization.findOne({ email });

    if (compareSync(password, user.password)) {
      const token = sign(user.toObject(), '123');
      return send(res, 200, { token })
    }

    return send(res, 403);
  } catch(e) {
    console.info(e);
    return send(res, 500, e)
  }
}

exports.destroy = async (req, res) => {
  try {
    const { id } = await json(req);

    await Organization.findByIdAndRemove(id);
    
    return send(res, 200);
  } catch(e) {
    return send(res, 500, e);
  }
};
