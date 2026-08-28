import { UserEntity } from "./UserEntity";

export interface ServiceEntity {
  id?: string;
  title: string;
  description: string;
  category: string;
  dateCreated?: string;
  createdBy?: string | UserEntity;
}