import { Request, Response } from "express";
import { DeleteRequest } from "../interfaces/deleteRequest";
import { Pet } from "../interfaces/pet";
import { UpdatePartsRequest } from "../interfaces/updatePartsRequest";
import { UploadImageRequest } from "../interfaces/uploadImageRequest";
import { default as PetService } from "../services/pet.service";

const updatePet = async (request: Request, response: Response) => {
    try {
        const { code, result } = await PetService.updatePet(request.body as Pet);

        return response.status(code).json(result);
    } catch (error) {
        return response.status(500).json(error);
    }
}

const addPet = async (request: Request, response: Response) => {
    try {
        const result = await PetService.addPet(request.body as Pet);

        return response.status(201).json(result);
    } catch (error) {
        return response.status(500).json(error);
    }
}

const findPetByStatus = async (request: Request, response: Response) => {
    try {
        const result = await PetService.findPetByStatus(request.query.status as string);

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json(error);
    }
}

const findPetByTags = async (request: Request, response: Response) => {
    try {
        const tags : string[] = request.query.tags as string[];
        const tagsFormatted : string[] = tags.map(value => `tags=${value}`)

        const result = await PetService.findPetByTags(tagsFormatted);

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json(error);
    }
}

const findPetById = async (request: Request, response: Response) => {
    try {
        const { code, result } = await PetService.findPetById(Number(request.params.petId));

        return response.status(code).json(result);
    } catch (error) {
        return response.status(500).json(error);
    }
}

const updatePetStatus = async (request: Request, response: Response) => {
    try {
        const data: UpdatePartsRequest = {
            petId: Number(request.params.petId),
            name: request.query.name as string,
            status: request.query.status as string
        }

        const result = await PetService.updatePetStatus(data);

        return response.status(201).json(result);
    } catch (error) {
        return response.status(500).json(error);
    }
}

const deletePet = async (request: Request, response: Response) => {
    try {
        const data: DeleteRequest = {
            petId: Number(request.params.petId),
            apiKey: request.headers['api_key'] as string
        }

        const result = await PetService.deletePet(data);

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json(error);
    }
}

const uploadImage = async (request: Request, response: Response) => {
    try {
        const data: UploadImageRequest = {
            petId: Number(request.params.petId),
            additionalMetadata: request.query.additionalMetadata as string,
            image: request.body
        }

        const result = await PetService.uploadImage(data);
        
        return response.status(201).json(result);
    } catch (error) {
        return response.status(500).json(error);
    }
}

export default {
    updatePet,
    addPet,
    findPetByStatus,
    findPetByTags,
    findPetById,
    updatePetStatus,
    deletePet,
    uploadImage
}