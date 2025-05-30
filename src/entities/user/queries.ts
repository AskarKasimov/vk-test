import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/shared/api/endpoints/users';
import { adaptUser } from './adapters';
import { userDTOSchema } from './schema';
import { User, UserDTO } from './types.ts';

export const useUserQuery = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async (): Promise<User> => {
      const dto: UserDTO = await userApi.getUserById(id);
      const parsed: UserDTO = userDTOSchema.parse(dto);
      return adaptUser(parsed);
    },
  });
};
