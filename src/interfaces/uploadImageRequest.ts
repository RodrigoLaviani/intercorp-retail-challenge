export interface UploadImageRequest {
    petId: number,
    additionalMetadata: string,
    image: Buffer
}