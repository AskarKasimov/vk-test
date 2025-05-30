import { User, UserDTO } from './types';

export const adaptUser = (dto: UserDTO): User => ({
  id: dto.id,
  fullName: dto.name,
  email: dto.email,
  createdAt: new Date(dto.created_at),
});
