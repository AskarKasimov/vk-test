// DTO
export type UserDTO = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

// внутрянка
export type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
};
