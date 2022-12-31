import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Hobby } from "./Hobby";

@Table({
  timestamps: true,
  tableName: "Users",
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
  })
  age!: number;

  @HasMany(() => Hobby, { foreignKey: "UserId" })
  hobby!: Hobby[];
}
