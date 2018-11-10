/**
 * User controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle user( login, logout and etc )
 *
 *
 * Module dependencies
 */

import mongoose from 'mongoose';

import { send, json } from 'micro';
import { hashSync, compareSync } from 'bcryptjs';
import { generate } from 'generate-password';
import { createTransport } from 'nodemailer';
import { sign } from 'jsonwebtoken';

const User = mongoose.model('User');

const sendPasswordToEmail = async ({ fio, email }, password) => {
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
      subject: `Доступ к сайту - ( ${email} ) - ucavtor.ru`,
      html: `
        <p>Доступы для входа на сайт:</p>

        <p><strong>Имя пользователя:</strong> ${fio}
        <p><strong>почта для входа на сайт:</strong> ${email}
        <p><strong>Пароль:</strong>  ${password}

        <p>Вход на сайт осуществляется через <a href="http://dashboard.ucavtor.ru/auth">Панель управления</a></p>
      `,
    };

    return transporter.sendMail(mailOptions);
  } catch (e) {
    return null;
  }
}

/*!
 * Expos
 */

export const index = async (req, res) => {
  const users = await User.find();

  return send(res, 200, users);
};

export const create = async (req, res) => {
  try {
    const user = await json(req);
    const hashPassword = generate({ length: 10, numbers: true });
    const password = hashSync(hashPassword, 8);

    const userObj = await User.create({ ...user, password });

    await sendPasswordToEmail(userObj, hashPassword);

    return send(res, 200);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const update = async (req, res) => {
  try {
    const data = await json(req);
    const { _id } = data;

    const user = await User.findOneAndUpdate({ _id }, data, { new: true });
    return send(res, 200, user);
  } catch (e) {
    return send(res, 500, e);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = await json(req);
    const user = await User.findOne(
      { email },
      { _id: 1, fio: 1, position: 1, email: 1, password: 1 }
    );

    if (compareSync(password, user.password)) {
      const token = sign(user.toObject(), '123');
      return send(res, 200, { token });
    }

    return send(res, 403);
  } catch (e) {
    return send(res, 500, e);
  }
}

export const info = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id })
      .populate('organization')
      .populate('courses')
      .populate('finishedCourses');

    return send(res, 200, user);
  } catch (e) {
    return send(res, 500, e);
  }
}

export const destroy = async (req, res) => {
  try {
    const { id } = await json(req);

    await User.findByIdAndRemove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500, e);
  }
};
