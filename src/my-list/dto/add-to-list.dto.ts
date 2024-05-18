// dto/add-to-list.dto.ts
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from 'src/users/entities/user.entity';

export class AddToListDto {
  @IsString()
  @IsNotEmpty()
  contentId: string;

  @IsEnum(['Movie', 'TVShow'])
  contentType: 'Movie' | 'TVShow';
}
