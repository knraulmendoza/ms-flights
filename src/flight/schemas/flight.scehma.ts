import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { Passenger } from 'src/passenger/schema/passenger.schema';

@Schema({ timestamps: true })
export class Flight {
  @Prop({ required: true })
  pilot: string;
  @Prop({ required: true })
  airplane: string;
  @Prop({ required: true })
  destinationCity: string;
  @Prop({ required: true })
  flightDate: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  passengers: string[];
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
