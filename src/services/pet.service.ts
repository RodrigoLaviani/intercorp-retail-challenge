import { DeleteRequest } from "../interfaces/deleteRequest";
import { Pet } from "../interfaces/pet";
import { UpdatePartsRequest } from "../interfaces/updatePartsRequest";
import { UploadImageRequest } from "../interfaces/uploadImageRequest";

const URL: string = 'https://petstore3.swagger.io/api/v3/pet';

const updatePet = async (pet: Pet) => {
  const result = await fetch(URL, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(pet),
  })

  return {
    code: result.status,
    result: await (result.status === 200 ? result.json() : result.text())
};
}

const addPet = async (pet: Pet) => {
  return (await fetch(URL, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(pet),
  })).json();
}

const findPetByStatus = async (status: string) => {
  return (await fetch(`${URL}/findByStatus?status=${status}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })).json()
}

const findPetByTags = async (tags: string[]) => {
  const queryString = `?${tags.toString().split(',').join('&')}`;

  return (await fetch(`${URL}/findByTags${queryString}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })).json();
}

const findPetById = async (petId: number) => {
  const result = await fetch(`${URL}/${petId}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
      code: result.status,
      result: await (result.status === 200 ? result.json() : result.text())
  };
}

const updatePetStatus = async (request: UpdatePartsRequest) => {
  const queryString = `?name=${request.name}&status${request.status}`

  return (await fetch(`${URL}/${request.petId}${queryString}`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })).json();
}

const deletePet = async (request: DeleteRequest) => {
  return (await fetch(`${URL}/${request.petId}`, {
    method: "DELETE",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "api_key": request.apiKey,
    },
  })).text();
}

const uploadImage = async (request: UploadImageRequest) => {
  const queryString = `?additionalMetadata=${request.additionalMetadata}`

  return (await fetch(`${URL}/${request.petId}/uploadImage${queryString}`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: request.image
  })).json();
}

export default {
  updatePet,
  addPet,
  findPetById,
  findPetByStatus,
  findPetByTags,
  deletePet,
  updatePetStatus,
  uploadImage
}