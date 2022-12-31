import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "Hobbies",
  timestamps: true,
})
export class Hobby extends Model<Hobby> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column
  name!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  UserId!: string;

  @BelongsTo(() => User, { foreignKey: "UserId" })
  user!: User;
}
