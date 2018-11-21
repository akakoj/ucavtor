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

import { sign } from 'jsonwebtoken';
import { send, json } from 'micro';
import { generate } from 'generate-password';
import { createTransport } from 'nodemailer';
import { hashSync, compareSync } from 'bcryptjs';

import { ServerResponse, ServerRequest } from 'microrouter';

import { IUser, IUserModel } from '../global';

const User = mongoose.model('User');

/*!
 * Helpers
 */

const sendPasswordToEmail = async (
  { fio, email }: { fio: string; email: string }, password: string
) => {
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
  } catch (e) {}
}

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  const users = await User.find();

  return send(res, 200, users);
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const user = <IUser> await json(req);
    const hashPassword = generate({ length: 10, numbers: true });
    const password = hashSync(hashPassword, 8);

    const userModel = <IUserModel> await User.create({ ...user, password });

    await sendPasswordToEmail(userModel, hashPassword);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const data = <IUserModel> await json(req);
    const { id } = data;

    const user = await User.findOneAndUpdate({ _id: id }, data, { new: true });

    return send(res, 200, user);
  } catch (e) {
    return send(res, 500);
  }
};

export const login = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { email, password } = <IUser> await json(req);
    const user = <IUserModel> await User.findOne(
      { email },
      { _id: 1, fio: 1, position: 1, email: 1, password: 1 }
    );

    if (compareSync(password, user.password)) {
      const token = sign(user.toObject(), '123');
      return send(res, 200, { token });
    }

    return send(res, 403);
  } catch (e) {
    return send(res, 500);
  }
}

export const info = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { id } = <IUserModel> await json(req);
    const user = await User.findOne({ _id: id })
      .populate('organization')
      .populate('courses')
      .populate('finishedCourses');

    return send(res, 200, user);
  } catch (e) {
    return send(res, 500);
  }
}

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { id } = <IUserModel> await json(req);

    await User.findByIdAndRemove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
