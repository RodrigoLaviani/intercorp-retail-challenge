import { Router } from 'express'
import { PetController } from '../controllers/pet.controller';

const petController = new PetController();

const router = Router();

/** routes */
// Update an existing pet
router.route('').put(petController.updatePet);

// Add a new pet to the store
router.route('').post(petController.addPet);

// Finds Pets by status
router.route('/findByStatus').get(petController.findPetByStatus);

// Finds Pets by tags
router.route('/findByTags').get(petController.findPetByTags);

// Find pet by ID
router.route('/:petId').get(petController.findPetById);

// Updates a pet in the store with form data
router.route('/:petId').post(petController.updatePetNameAndStatus);

// Deletes a pet
router.route('/:petId').delete(petController.deletePet);

// Uploads an image
router.route('/:petId/uploadImage').post(petController.uploadImage);


export default router;