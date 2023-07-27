import { default as CommonsValidators } from './commons';

const petBodyValidators = [
    CommonsValidators.idBodyValidator,
    CommonsValidators.nameBodyValidator,
    CommonsValidators.photoUrlsBodyValidator,
    CommonsValidators.statusBodyValidator,
    CommonsValidators.tagsBodyValidator,
    CommonsValidators.categoryBodyValidator,
]

const updatesPetStatusValidators = [
    CommonsValidators.petIdParamValidator,
    CommonsValidators.nameQueryValidator,
    CommonsValidators.statusQueryValidator
]

const deletePetValidator = [
    CommonsValidators.apiKeyHeaderValidator,
    CommonsValidators.petIdParamValidator
]

const uploadImageValidator = [
    CommonsValidators.petIdParamValidator,
    CommonsValidators.additionalMetadataQueryValidator
]

export default {
    petBodyValidators,
    updatesPetStatusValidators,
    deletePetValidator,
    uploadImageValidator
}