import { Router } from 'express'
import { default as PetController } from '../controllers/pet.controller';
import { validate } from '../middlewares/validate';
import { default as PetValidators } from '../validators/pet';

const router = Router();

/** routes */
// Update an existing pet
router.route('').put(validate(PetValidators.petBodyValidators), PetController.updatePet);

// Add a new pet to the store
router.route('').post(validate(PetValidators.petBodyValidators), PetController.addPet);

// Finds Pets by status
router.route('/findByStatus').get(validate(PetValidators.findByStatusValidators), PetController.findPetByStatus);

// Finds Pets by tags
router.route('/findByTags').get(validate(PetValidators.findByTagsValidators), PetController.findPetByTags);

// Find pet by ID
router.route('/:petId').get(validate(PetValidators.findByIdValidators), PetController.findPetById);

// Updates a pet in the store with form data
router.route('/:petId').post(validate(PetValidators.updatesPetStatusValidators), PetController.updatePetStatus);

// Deletes a pet
router.route('/:petId').delete(validate(PetValidators.deletePetValidator), PetController.deletePet);

// Uploads an image
router.route('/:petId/uploadImage').post(validate(PetValidators.uploadImageValidator), PetController.uploadImage);


export default router;