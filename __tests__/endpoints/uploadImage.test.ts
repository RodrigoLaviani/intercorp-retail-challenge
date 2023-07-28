const request = require('supertest');
import app from "../../application";
import { default as PetService } from '../../src/services/pet.service';
import { petResponseUploadImageMock } from "../mocks/petResponse";

describe('Upload image endpoint', () => {
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
    const updateImageMock = jest
      .spyOn(PetService, 'uploadImage')
      .mockResolvedValueOnce(petResponseUploadImageMock);

    const imageBuffer: Buffer = Buffer.from('Image mock');

    const response = await request(server).post(`/api/v3/pet/10/uploadImage?additionalMetadata=image`)
      .set('content-type', 'application/octet-stream')
      .send(imageBuffer);

    expect(response.statusCode).toBe(201);
    expect(updateImageMock).toHaveBeenCalledTimes(1);

    expect(response.body.name).toBe("doggie");

    updateImageMock.mockReset();
  });

  test('Bad request - 400', async () => {
    const response = await request(server).post(`/api/v3/pet/10/uploadImage?additionalMetadata=image`);

    expect(response.statusCode).toBe(400);
  });

  test('Internal server error - 500', async () => {
    const updateImageMock = jest
      .spyOn(PetService, 'uploadImage')
      .mockRejectedValue({
        code: 500,
        type: "Internal Server Error",
        message: "Error in service"
      });

    const imageBuffer: Buffer = Buffer.from('Image mock');

    const response = await request(server).post(`/api/v3/pet/10/uploadImage?additionalMetadata=image`)
      .set('content-type', 'application/octet-stream')
      .send(imageBuffer);

    expect(response.statusCode).toBe(500);
    expect(updateImageMock).toHaveBeenCalledTimes(1);

    updateImageMock.mockReset();
  });
});
