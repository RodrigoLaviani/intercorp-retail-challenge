import { Router } from 'express'
import { default as PetController } from '../controllers/pet.controller';

const router = Router();

/** routes */
// Update an existing pet
router.route('').put(PetController.updatePet);

// Add a new pet to the store
router.route('').post(PetController.addPet);

// Finds Pets by status
router.route('/findByStatus').get(PetController.findPetByStatus);

// Finds Pets by tags
router.route('/findByTags').get(PetController.findPetByTags);

// Find pet by ID
router.route('/:petId').get(PetController.findPetById);

// Updates a pet in the store with form data
router.route('/:petId').post(PetController.updatePetNameAndStatus);

// Deletes a pet
router.route('/:petId').delete(PetController.deletePet);

// Uploads an image
router.route('/:petId/uploadImage').post(PetController.uploadImage);


export default router;