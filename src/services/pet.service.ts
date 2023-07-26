import { DeleteRequest } from "../interfaces/deleteRequest.interface";
import { Pet } from "../interfaces/pet.interface";
import { UpdatePartsRequest } from "../interfaces/updatePartsRequest.interface";
import { UploadImageRequest } from "../interfaces/uploadImageRequest.interface";

const URL: string = 'https://petstore3.swagger.io/api/v3/pet';

const updatePet = async (pet: Pet) => {
  return await fetch(URL, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  })
}

const addPet = async (pet: Pet) => {
  return await fetch(URL, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  })
}

const findPetByStatus = async (status: string) => {
  return await fetch(`${URL}?status=${status}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const findPetByTags = async (tags: string[]) => {
  const queryString = `?tags=${encodeURIComponent(JSON.stringify(tags))}`

  return await fetch(`${URL}${queryString}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer"
  })
}

const findPetById = async (petId: number) => {
  return (await fetch(`${URL}/${petId}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })).json()
}

const updatePetNameAndStatus = async (request: UpdatePartsRequest) => {
  const queryString = `?name=${request.name}&status${request.status}`

  return await fetch(`${URL}/${request.petId}${queryString}`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const deletePet = async (request: DeleteRequest) => {
  return await fetch(`${URL}/${request.petId}`, {
    method: "DELETE",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "api_key": request.apiKey,
    },
    referrerPolicy: "no-referrer"
  })
}

const uploadImage = async (request: UploadImageRequest) => {
  const queryString = `?additionalMetadata=${request.additionalMetadata}`

  return await fetch(`${URL}/${request.petId}${queryString}`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export default {
  updatePet,
  addPet,
  findPetById,
  findPetByStatus,
  findPetByTags,
  deletePet,
  updatePetNameAndStatus,
  uploadImage
}