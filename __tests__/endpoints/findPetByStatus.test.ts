const request = require('supertest');
import app from "../../application";
import { default as PetService } from '../../src/services/pet.service';
import { findByStatusResponse } from "../mocks/findByResponse";

describe('Find by status endpoint', () => {
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
    const findByStatusMock = jest
    .spyOn(PetService, 'findPetByStatus')
    .mockResolvedValueOnce(findByStatusResponse);
    
    const response = await request(server).get(`/api/v3/pet/findByStatus?status=available`);

    expect(response.statusCode).toBe(200);
    expect(findByStatusMock).toHaveBeenCalledTimes(1);

    expect(response.body.length).toEqual(3);

    findByStatusMock.mockReset();
  });

  test('Bad request - 400', async () => {
    const response = await request(server).get(`/api/v3/pet/findByStatus?status=comprado`);

    expect(response.statusCode).toBe(400);
  });

  test('Internal server error - 500', async () => {
    const findByStatusMock = jest
    .spyOn(PetService, 'findPetByStatus')
    .mockRejectedValue({
        code: 500,
        type: "Internal Server Error",
        message: "Error in service"
    });

    const response = await request(server).get(`/api/v3/pet/findByStatus?status=available`);

    expect(response.statusCode).toBe(500);
    expect(findByStatusMock).toHaveBeenCalledTimes(1);

    findByStatusMock.mockReset();
  });
});
