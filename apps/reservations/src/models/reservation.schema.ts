import { AbstractDocumnet } from "@app/common";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false})
export class ReservationDocument extends AbstractDocumnet{
    @Prop()
    timestamp: Date;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    userId: string;

    @Prop()
    placeId: string;

    @Prop()
    onvoiceId: string;
}

export const ReservationSchema =
 SchemaFactory.createForClass(ReservationDocument)