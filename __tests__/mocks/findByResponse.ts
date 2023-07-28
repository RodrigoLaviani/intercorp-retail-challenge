import { Pet } from "../../src/interfaces/pet";

export const findByStatusResponse : Pet[] = [
    {
      "id": 155,
      "category": {
        "id": 117,
        "name": "Peagon"
      },
      "name": "Bird",
      "photoUrls": [
        "https://samplephoto.com/5"
      ],
      "tags": [
        {
          "id": 11,
          "name": "Bird_01"
        }
      ],
      "status": "available"
    },
    {
      "id": 55987,
      "name": "Monkey",
      "category": {
        "id": 117,
        "name": "Mono"
      },
      "photoUrls": [
        "photoUrls_55467"
      ],
      "tags": [
        {
          "id": 55037,
          "name": "Mono"
        },
        {
          "id": 55037,
          "name": "Peleador"
        }
      ],
      "status": "available"
    },
    {
      "id": 12,
      "category": {
        "id": 1,
        "name": "Dogs"
      },
      "name": "doggie",
      "photoUrls": [
        ""
      ],
      "tags": [
        {
          "id": 0,
          "name": "Mimoso"
        }
      ],
      "status": "available"
    }
  ]

  export const findByTagsResponse : Pet[] = [
    {
      "id": 55987,
      "name": "Monkey",
      "category": {
        "id": 117,
        "name": "Mono"
      },
      "photoUrls": [
        "photoUrls_55467"
      ],
      "tags": [
        {
          "id": 55037,
          "name": "Mono"
        },
        {
          "id": 55037,
          "name": "Peleador"
        }
      ],
      "status": "available"
    }
  ]