const request = require('supertest');
import app from "../../application";
import { default as PetService } from '../../src/services/pet.service';
import { petResponseMock } from "../mocks/petResponse";

describe('Find by Pet Id endpoint', () => {
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
    const findByPetIdMock = jest
    .spyOn(PetService, 'findPetById')
    .mockResolvedValueOnce({ code: 200, result: petResponseMock});
    
    const response = await request(server).get(`/api/v3/pet/10`);

    expect(response.statusCode).toBe(200);
    expect(findByPetIdMock).toHaveBeenCalledTimes(1);

    expect(response.body.name).toBe("doggie");

    findByPetIdMock.mockReset();
  });

  test('Pet Not Found - 404', async () => {
    const findByPetIdMock = jest
    .spyOn(PetService, 'findPetById')
    .mockResolvedValueOnce({ code: 404, result: "Pet not found"});
    
    const response = await request(server).get(`/api/v3/pet/10`);

    expect(response.statusCode).toBe(404);
    expect(findByPetIdMock).toHaveBeenCalledTimes(1);

    expect(response.body).toBe("Pet not found");

    findByPetIdMock.mockReset();
  });

  test('Bad request - 400', async () => {
    const response = await request(server).get(`/api/v3/pet/doggie`);

    expect(response.statusCode).toBe(400);
  });

  test('Internal server error - 500', async () => {
    const findByPetIdMock = jest
    .spyOn(PetService, 'findPetById')
    .mockRejectedValue({
        code: 500,
        type: "Internal Server Error",
        message: "Error in service"
    });

    const response = await request(server).get(`/api/v3/pet/10`);

    expect(response.statusCode).toBe(500);
    expect(findByPetIdMock).toHaveBeenCalledTimes(1);

    findByPetIdMock.mockReset();
  });
});
