import { Pet } from "../../src/interfaces/pet";

export const petResponseMock: Pet = {
    id: 10,
    name: "doggie",
    category: {
      id: 1,
      name: "Dogs"
    },
    photoUrls: [
      ""
    ],
    tags: [
      {
        id: 0,
        name: "Mimoso"
      }
    ],
    status: "available"
}