/**
 * Organizations controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle organizations ( create, update and etc )
 *
 * Vendor
 */

import mongoose from 'mongoose';

import { sign } from 'jsonwebtoken';
import { generate } from 'generate-password';
import { send, json } from 'micro';
import { createTransport } from 'nodemailer';
import { hashSync, compareSync } from 'bcryptjs';
import { ServerRequest, ServerResponse } from 'microrouter';

/**
 * Model
 */

import {
  IOrganization,
  IRequestParams,
  IOrganizationModel,
} from '../global';
import { OrganizationSchema } from '../models';

const Organization = mongoose.model('Organization', OrganizationSchema);

const sendPasswordToEmail = async (
  { email }: { email: string }, password: string
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
      subject: 'Доступ к сайту - ucavtor.ru',
      html: `
        <p>Доступы для входа на сайт:</p>

        <p><strong>Имя пользователя:</strong> ${email}
        <p><strong>Пароль:</strong>  ${password}

        <p>Вход на сайт осуществляется через <a href="http://company.ucavtor.ru/login">Панель управления</a></p>
      `,
    };

    return transporter.sendMail(mailOptions);
  } catch (e) { }
};

/*!
 * Expos
 */

export const index = async (_req: ServerRequest, res: ServerResponse) => {
  const organizations = await Organization.find();

  return send(res, 200, organizations);
};

export const create = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const organization = <IOrganization> await json(req);
    const hashPassword = generate({length: 10, numbers: true });
    const password = hashSync(hashPassword, 8);

    const organiztaionObj = <IOrganizationModel> await Organization
      .create({ ...organization, password });

    await sendPasswordToEmail(organiztaionObj, hashPassword);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};

export const employers = (_req: ServerRequest, res: ServerResponse) => {
  return send(res, 200, { employers: [{
    key: '1',
    fio: 'Тройнов Евгений Александрович',
    position: 'ИТ - Специалист',
    email: 'troinof@yandex.ru',
    status: 1,
  }, {
    key: '2',
    fio: 'Кожевников Андрей Алексеевич',
    position: 'Директор',
    email: 'avtorka@list.ru',
    status: 0,
  }]});
}

export const update = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const organization = <IOrganizationModel> await json(req);

    await Organization.update({ _id: organization.id }, organization);
    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};

export const login = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { email, password } = <IOrganization> await json(req);
    const organization = <IOrganizationModel> await Organization.findOne({ email });

    if (compareSync(password, organization.password)) {
      const token = sign(organization.toObject(), '123');

      return send(res, 200, { token });
    }

    return send(res, 403);
  } catch (e) {
    return send(res, 500);
  }
}

export const destroy = async (req: ServerRequest, res: ServerResponse) => {
  try {
    const { id } = <IRequestParams> await json(req);

    await Organization.findByIdAndRemove(id);

    return send(res, 200);
  } catch (e) {
    return send(res, 500);
  }
};
