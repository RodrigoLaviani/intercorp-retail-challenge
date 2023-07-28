const request = require('supertest');
import app from "../../application";
import { default as PetService } from '../../src/services/pet.service';
import { findByTagsResponse } from "../mocks/findByResponse";

describe('Find by tags endpoint', () => {
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

  
  test('OK - 200 - Two tags', async () => {
    const findByTagsMock = jest
    .spyOn(PetService, 'findPetByTags')
    .mockResolvedValueOnce(findByTagsResponse);
    
    const response = await request(server).get(`/api/v3/pet/findByTags?tags=Mono&tags=Peleador`);

    expect(response.statusCode).toBe(200);
    expect(findByTagsMock).toHaveBeenCalledTimes(1);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toBe("Monkey");

    findByTagsMock.mockReset();
  });

  test('OK - 200 - One tag', async () => {
    const findByTagsMock = jest
    .spyOn(PetService, 'findPetByTags')
    .mockResolvedValueOnce(findByTagsResponse);
    
    const response = await request(server).get(`/api/v3/pet/findByTags?tags=Mono`);

    expect(response.statusCode).toBe(200);
    expect(findByTagsMock).toHaveBeenCalledTimes(1);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toBe("Monkey");

    findByTagsMock.mockReset();
  });


  test('Bad request - 400', async () => {
    const response = await request(server).get(`/api/v3/pet/findByTags`);

    expect(response.statusCode).toBe(400);
  });

  test('Internal server error - 500', async () => {
    const findByTagsMock = jest
    .spyOn(PetService, 'findPetByTags')
    .mockRejectedValue({
        code: 500,
        type: "Internal Server Error",
        message: "Error in service"
    });

    const response = await request(server).get(`/api/v3/pet/findByTags?tags=Mono&tags=Peleador`);

    expect(response.statusCode).toBe(500);
    expect(findByTagsMock).toHaveBeenCalledTimes(1);

    findByTagsMock.mockReset();
  });
});
