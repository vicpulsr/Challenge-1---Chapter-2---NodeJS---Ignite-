import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const user = users.find((user) => user.id === user_id);

    if (!user) {
      throw new Error("User not found");
    }

    const isAdmin = user.admin === true;

    if (!isAdmin) {
      throw new Error("User is not admin");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
