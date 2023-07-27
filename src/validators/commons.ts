import { body, query, param, header } from 'express-validator';

const nameBodyValidator = body('**.name').exists().isString().notEmpty();

const idBodyValidator = body('**.id').exists().isNumeric();

const photoUrlsBodyValidator = body('photoUrls').exists().isArray();

const statusBodyValidator = body('**.status').exists().isString().notEmpty().isIn(['available', 'pending', 'sold']);

const tagsBodyValidator = body('tags').exists().isArray();

const categoryBodyValidator = body('category').exists().isArray();

const statusQueryValidator = query('status').exists().isString().notEmpty().isIn(['available', 'pending', 'sold']);

const tagsQueryValidator = query('tags').exists().isArray();

const petIdParamValidator = param('petId').exists().isNumeric();

const nameQueryValidator = query('name').exists().isString().notEmpty();

const additionalMetadataQueryValidator = query('additionalMetadata').exists().isString().notEmpty();

const apiKeyHeaderValidator = header('api_key').exists().isString().notEmpty();

export default {
    nameBodyValidator,
    idBodyValidator,
    photoUrlsBodyValidator,
    statusBodyValidator,
    tagsBodyValidator,
    categoryBodyValidator,
    statusQueryValidator,
    tagsQueryValidator,
    petIdParamValidator,
    nameQueryValidator,
    additionalMetadataQueryValidator,
    apiKeyHeaderValidator
}