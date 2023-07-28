import { body, param, header, query } from 'express-validator';

const petBodyValidators = [
    body('id').isNumeric().withMessage('El campo "id" debe ser un número entero.'),
    body('name').notEmpty().withMessage('El campo "name" no puede estar vacío.'),
    body('category.id').isInt().withMessage('El campo "category.id" debe ser un número entero.'),
    body('category.name').notEmpty().withMessage('El campo "category.name" no puede estar vacío.'),
    body('photoUrls').isArray({ min: 1 }).withMessage('El campo "photoUrls" debe ser un array con al menos un elemento.'),
    body('tags').isArray({ min: 1 }).withMessage('El campo "tags" debe ser un array con al menos un elemento.'),
    body('tags.*.id').isInt().withMessage('El campo "tags.*.id" debe ser un número entero.'),
    body('tags.*.name').notEmpty().withMessage('El campo "tags.*.name" no puede estar vacío.'),
    body('status').isIn(['available', 'pending', 'sold']).withMessage('El campo "status" debe ser uno de "available", "pending" o "sold".')
]

const findByStatusValidators = [
    query('status').isIn(['available', 'pending', 'sold']).withMessage('El campo "status" debe ser uno de "available", "pending" o "sold".')
]

const findByTagsValidators = [
    query('tags')
    .customSanitizer((value) => {
      if (typeof value === 'string') {
        return [value];
      }
      return value;
    })
    .isArray({ min: 1 })
    .withMessage('El parámetro "tags" debe ser un string o un array con al menos un elemento.')
]

const findByIdValidators = [
    param('petId').isInt().withMessage('El paramentro "petId" debe ser un número entero.')
]

const updatesPetStatusValidators = [
    param('petId').isInt().withMessage('El paramentro "petId" debe ser un número entero.'),
    query('name').notEmpty().withMessage('El campo "name" no puede estar vacío.'),
    query('status').isIn(['available', 'pending', 'sold']).withMessage('El campo "status" debe ser uno de "available", "pending" o "sold".')
]

const deletePetValidator = [
    header('api_key').notEmpty().withMessage('El header "api_key" no puede estar vacío.'),
    param('petId').isInt().withMessage('El paramentro "petId" debe ser un número entero.')
]

const uploadImageValidator = [
    param('petId').isInt().withMessage('El paramentro "petId" debe ser un número entero.'),
    query('additionalMetadata').notEmpty().withMessage('El campo "additionalMetadata" no puede estar vacío.'),
    body().custom((value, _) => {
        if (!(value instanceof Buffer)) {
          throw new Error('El body debe ser un Buffer.');
        }
        return true;
      })
]

export default {
    petBodyValidators,
    updatesPetStatusValidators,
    findByStatusValidators,
    findByTagsValidators,
    findByIdValidators,
    deletePetValidator,
    uploadImageValidator
}