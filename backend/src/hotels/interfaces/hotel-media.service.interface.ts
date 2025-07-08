interface IHotelMediaService {
  uploadHotelImages(hotelId: string, files: Express.Multer.File[]): Promise<string[]>;
  reorderHotelImages(hotelId: string, newOrder: string[]): Promise<void>;
  deleteHotelImage(hotelId: string, imageId: string): Promise<void>;
}