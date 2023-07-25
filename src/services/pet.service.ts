import { DeleteRequest } from "../interfaces/deleteRequest.interface";
import { Pet } from "../interfaces/pet.interface";
import { UpdatePartsRequest } from "../interfaces/updatePartsRequest.interface";
import { UploadImageRequest } from "../interfaces/uploadImageRequest.interface";

export class PetService {
    private url : string = 'https://petstore3.swagger.io/api/v3';

    async updatePet(pet: Pet) {
        return await fetch(this.url, {
            method: "PUT",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pet),
          })
    }

    async addPet(pet: Pet) {
        return await fetch(this.url, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pet),
          })
    }

    async findPetByStatus(status: string) {
        return await fetch(`${this.url}?status=${status}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
          })
    }

    async findPetByTags(tags: string[]) {
        const queryString = `?tags=${encodeURIComponent(JSON.stringify(tags))}`

        return await fetch(`${this.url}${queryString}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer"
          })
    }

    async findPetById(petId: string) {
        return await fetch(`${this.url}/${petId}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
          })
    }

    async updatePetNameAndStatus(request: UpdatePartsRequest) {
        const queryString = `?name=${request.name}&status${request.status}`

        return await fetch(`${this.url}/${request.petId}${queryString}`, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
          })
    }

    async deletePet(request: DeleteRequest) {
        return await fetch(`${this.url}/${request.petId}`, {
            method: "DELETE",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
              "api_key": request.apiKey,
            },
            referrerPolicy: "no-referrer"
          })
    }

    async uploadImage(request: UploadImageRequest) {
        const queryString = `?additionalMetadata=${request.additionalMetadata}`

        return await fetch(`${this.url}/${request.petId}${queryString}`, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
          })
    }
}