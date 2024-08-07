import { Body, Controller, Post } from '@nestjs/common';
import { AutocompletionService } from './autocompletion.service';
import { AutocompletionDto } from './dto/autocompletion.dto';
import { TagResponseDto } from '../tag/dto/tag-response.dto';
import { Public } from '../authentication/public.guard';

@Controller('autocompletion')
export class AutocompletionController {
  constructor(
    private readonly autocompletionService: AutocompletionService
  ) { }

  @Post() @Public()
  async autocompletion(@Body() dto: AutocompletionDto): Promise<TagResponseDto[]> {
    const tags = await this.autocompletionService.autocompletion(dto.query);
    return tags.map(tag => TagResponseDto.fromEntity(tag));
  }
}
