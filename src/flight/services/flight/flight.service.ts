import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { BaseRepository } from 'src/core/base-repository';
import { FlightDto } from 'src/flight/dto/flight.dto';

@Injectable()
export class FlightService extends BaseRepository<FlightDto, IFlight> {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {
    super(model);
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(
      flightId,
      {
        $addToSet: { passengers: passengerId },
      },
      { new: true },
    );
  }
}
