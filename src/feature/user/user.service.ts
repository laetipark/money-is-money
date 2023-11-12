import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLib } from './user.lib';
import { ErrorType } from '../../enum/errorType.enum';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userLib: UserLib) {}

  /** 사용자 정보 조회
   * @Param id 로그인한 사용자 생성 ID */
  async getUserInfo(id: number) {
    const user = await this.userLib.getUserById(id);
    if (!user) {
      throw new UnauthorizedException(ErrorType.USERNAME_NOT_EXIST);
    }

    return user;
  }

  /** 사용자 정보 업데이트
   * @Param id 로그인한 사용자 생성 ID
   * @Param updateUserDto 사용자 업데이트 정보 */
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userLib.getUserById(id);
    const isCorrectedPassword = await bcrypt.compare(
      updateUserDto.password,
      user.password,
    );
    if (!isCorrectedPassword) {
      throw new ConflictException(ErrorType.PASSWORD_MISMATCH);
    }

    const encryptedPassword = await bcrypt.hash(
      updateUserDto.confirmPassword,
      10,
    );
    const isValidPassword = await bcrypt.compare(
      updateUserDto.password,
      encryptedPassword,
    );
    if (!isValidPassword) {
      throw new ConflictException(ErrorType.CONFIRM_PASSWORD_MISMATCH);
    }
    if (
      !updateUserDto.isRecommendNotified &&
      !updateUserDto.isExpenseNotified
    ) {
      throw new ConflictException(ErrorType.USER_UPDATE_BAD_REQUEST);
    }

    const isUpdated = await this.userLib.updateUser(id, {
      password: await bcrypt.hash(updateUserDto.password, 10),
      isRecommendNotified: updateUserDto.isRecommendNotified,
      isExpenseNotified: updateUserDto.isExpenseNotified,
    });
    if (!isUpdated.affected) {
      throw new BadRequestException(ErrorType.USER_UPDATE_FAILED);
    }
  }
}