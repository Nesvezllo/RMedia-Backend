import {body} from 'express-validator';

export const postCreateValidation = [
  body('title', "Введите заголовок").isString(),
  body('text', "Введите текст").isString(),
  body('category', "Укажите категорию").isString(),
  body('imageURL', "Неверная ссылка на изображение").optional().isString(),
]