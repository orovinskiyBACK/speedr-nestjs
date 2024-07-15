import { AbstractDocumnet } from "@app/common";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false})
export class UserDocument extends AbstractDocumnet{
    @Prop()
    email: string

    @Prop()
    password: string
}

export const UserSchema =
 SchemaFactory.createForClass(UserDocument)