import {body} from 'express-validator';

export const regValidation = [
  body('email', "Неверный формат почты").isEmail(),
  body('password', "Пароль должен состоять минимум из 10 символов").isLength({ min: 10 }),
  body('fullName', "Укажите ваше полное имя" ).isLength({ min: 3 }),
  body('avatarURL', "Неверная ссылка на аватарку").optional({ checkFalsy: true }).isURL(),
];
