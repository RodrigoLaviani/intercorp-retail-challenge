const request = require('supertest');
import app from "../../application";
import { default as PetService } from '../../src/services/pet.service';
import { petResponsePendingMock } from "../mocks/petResponse";

describe('Update Pet Status endpoint', () => {
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
    const updatePetStatusMock = jest
    .spyOn(PetService, 'updatePetStatus')
    .mockResolvedValueOnce(petResponsePendingMock);
    
    const response = await request(server).post(`/api/v3/pet/10?name=doggie&status=pending`);

    expect(response.statusCode).toBe(201);
    expect(updatePetStatusMock).toHaveBeenCalledTimes(1);

    expect(response.body.name).toBe("doggie");
    expect(response.body.status).toBe("pending");

    updatePetStatusMock.mockReset();
  });

  test('Bad request - 400', async () => {
    const response = await request(server).post(`/api/v3/pet/10?name=doggie`);

    expect(response.statusCode).toBe(400);
  });

  test('Internal server error - 500', async () => {
    const updatePetStatusMock = jest
    .spyOn(PetService, 'updatePetStatus')
    .mockRejectedValue({
        code: 500,
        type: "Internal Server Error",
        message: "Error in service"
    });

    const response = await request(server).post(`/api/v3/pet/10?name=doggie&status=pending`);

    expect(response.statusCode).toBe(500);
    expect(updatePetStatusMock).toHaveBeenCalledTimes(1);

    updatePetStatusMock.mockReset();
  });
});
