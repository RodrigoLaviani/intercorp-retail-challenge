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

export const petResponsePendingMock: Pet = {
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
  status: "pending"
}

export const petResponseUploadImageMock: Pet = {
  id: 10,
  category: {
    id: 1,
    name: "Dogs"
  },
  name: "doggie",
  photoUrls: [
    "string",
    "/tmp/inflector3585965047447912185.tmp"
  ],
  tags: [
    {
      id: 0,
      name: "string"
    }
  ],
  status: "pending"
}