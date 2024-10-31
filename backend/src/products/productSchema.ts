/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop()
  bestseller: boolean;

  @Prop([String])
  people_also_buy: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);