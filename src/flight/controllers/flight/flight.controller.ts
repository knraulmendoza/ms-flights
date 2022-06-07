import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMsg } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightDto } from 'src/flight/dto/flight.dto';
import { FlightService } from 'src/flight/services/flight/flight.service';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMsg.CREATE)
  create(@Payload() entity: FlightDto): Promise<IFlight> {
    return this.flightService.create(entity);
  }
  @MessagePattern(FlightMsg.FIND_ALL)
  findAll(): Promise<IFlight[]> {
    return this.flightService.getAll();
  }
  @MessagePattern(FlightMsg.FIND_ONE)
  findOne(@Payload() id: string): Promise<IFlight> {
    return this.flightService.getById(id);
  }
  @MessagePattern(FlightMsg.UPDATE)
  update(@Payload() payload: any): Promise<IFlight> {
    return this.flightService.update(payload.id, payload.FlightDto);
  }
  @MessagePattern(FlightMsg.DELETE)
  delete(@Payload() id: string): Promise<IFlight> {
    return this.flightService.delete(id);
  }

  @MessagePattern(FlightMsg.ADD_PASSENGER)
  addPassenger(@Payload() payload: any) {
    return this.flightService.addPassenger(
      payload.flightId,
      payload.passengerId,
    );
  }
}
