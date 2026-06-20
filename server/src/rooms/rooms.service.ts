import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { RoomRepository } from '../database/mongodb/repositories/room.repository';

@Injectable()
export class RoomsService implements OnModuleInit {
  constructor(private roomRepository: RoomRepository) {}

  async onModuleInit() {
    // Seed some dummy rooms if the database is empty
    const count = await this.roomRepository.findAll();
    if (count.length === 0) {
      await this.roomRepository.create({
        name: 'Khách sạn Mường Thanh Luxury',
        destination: 'Đà Nẵng',
        price: 1500000,
        rating: 4.8,
        description: 'Khách sạn sang trọng với tầm nhìn ra biển Mỹ Khê.',
        image_url: 'https://picsum.photos/seed/dananghotel/600/400',
        status: 'AVAILABLE'
      });
      await this.roomRepository.create({
        name: 'Vinpearl Resort & Spa',
        destination: 'Vũng Tàu',
        price: 2500000,
        rating: 4.9,
        description: 'Nghỉ dưỡng đẳng cấp quốc tế 5 sao.',
        image_url: 'https://picsum.photos/seed/vungtauresort/600/400',
        status: 'AVAILABLE'
      });
      await this.roomRepository.create({
        name: 'InterContinental Hanoi',
        destination: 'Hà Nội',
        price: 3200000,
        rating: 5.0,
        description: 'Khách sạn nổi trên mặt hồ Tây.',
        image_url: 'https://picsum.photos/seed/hanoihotel/600/400',
        status: 'AVAILABLE'
      });
      console.log('Dummy rooms seeded!');
    }
  }

  async search(destination?: string) {
    if (destination) {
      return this.roomRepository.findByDestination(destination);
    }
    return this.roomRepository.findAll();
  }

  async create(roomData: any) {
    return this.roomRepository.create({
      ...roomData,
      status: 'AVAILABLE',
      rating: 0,
    });
  }

  async findOne(id: string) {
    const room = await this.roomRepository.findById(id);
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async update(id: string, updateData: any) {
    const updated = await this.roomRepository.update(id, updateData);
    if (!updated) throw new NotFoundException('Room not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.roomRepository.delete(id);
    if (!deleted) throw new NotFoundException('Room not found');
    return deleted;
  }
}
