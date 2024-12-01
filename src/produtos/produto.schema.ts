import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Produto extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  preco: number;

  @Prop()
  descricao: string;

  @Prop({ default: Date.now })
  criadoEm: Date;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
