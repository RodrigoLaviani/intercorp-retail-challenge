const request = require('supertest');
import app from "../../application";
import { default as PetService } from '../../src/services/pet.service';
import { petResponseMock } from "../mocks/petResponse";

describe('Update Pet endpoint', () => {
  let server: any;

  beforeAll((done) => {
    server = app.listen(3000, () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  
  test('OK - 200', async () => {
    const updateService = jest
    .spyOn(PetService, 'updatePet')
    .mockResolvedValueOnce(petResponseMock);

    const response = await request(server).put(`/api/v3/pet`).send({
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
    });

    expect(response.statusCode).toBe(200);
    expect(updateService).toHaveBeenCalledTimes(1);

    expect(response.body.name).toBe("doggie")

    updateService.mockRestore();
  });

  test('Bad request - 400', async () => {
    const response = await request(server).put(`/api/v3/pet`)

    expect(response.statusCode).toBe(400);
  });

  test('Internal server error - 500', async () => {
    const updateService = jest
    .spyOn(PetService, 'updatePet')
    .mockRejectedValue({
        code: 500,
        type: "Internal Server Error",
        message: "Error in service"
    });

    const response = await request(server).put(`/api/v3/pet`).send({
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
    });

    expect(response.statusCode).toBe(500);
    expect(updateService).toHaveBeenCalledTimes(1);

    updateService.mockRestore();
  });
});
