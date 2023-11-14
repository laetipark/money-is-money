import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../entity/user.entity';

@Injectable()
export class UserLib {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 전체 사용자 조회 데이터 반환
   * @return Promise<User[]>
   */
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * id로 사용자 조회 데이터 반환
   * @param id 사용자 DB ID
   * @return Promise<User>
   */
  getUserByID(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * id의 사용자 정보 변경
   * @param id 사용자 DB ID
   * @param updateUserDto 사용자 업데이트 정보
   * @return Promise<UpdateResult>
   */
  async updateUser(
    id: number,
    updateUserDto: {
      password: string;
      isRecommendNotified: boolean;
      isExpenseNotified: boolean;
    },
  ): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }
}
