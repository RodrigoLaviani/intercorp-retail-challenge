const request = require('supertest');
import app from "../../application";
import { default as PetService } from '../../src/services/pet.service';

describe('Delete Pet endpoint', () => {
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
    const deletePetMock = jest
    .spyOn(PetService, 'deletePet')
    .mockResolvedValueOnce("Pet deleted");
    
    const response = await request(server).delete(`/api/v3/pet/10`)
                            .set({ "api_key": 'abc123' });

    expect(response.statusCode).toBe(200);
    expect(deletePetMock).toHaveBeenCalledTimes(1);

    expect(response.body).toBe("Pet deleted");

    deletePetMock.mockReset();
  });

  test('Bad request - 400', async () => {
    const response = await request(server).delete(`/api/v3/pet/10`);

    expect(response.statusCode).toBe(400);
  });

  test('Internal server error - 500', async () => {
    const deletePetMock = jest
    .spyOn(PetService, 'deletePet')
    .mockRejectedValue({
        code: 500,
        type: "Internal Server Error",
        message: "Error in service"
    });

    const response = await request(server).delete(`/api/v3/pet/10`)
                            .set({ "api_key": 'abc123' });

    expect(response.statusCode).toBe(500);
    expect(deletePetMock).toHaveBeenCalledTimes(1);

    deletePetMock.mockReset();
  });
});
