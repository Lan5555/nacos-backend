import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('save-result')
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get('find-all-results')
  findAll() {
    return this.resultsService.findAll();
  }

  @Get('find-one-result/:id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch('update-result/:id')
  update(
    @Param('id') id: string,
    @Body() updateResultDto: UpdateResultDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.resultsService.update(+id, updateResultDto, file);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete('delete-result/:id')
  remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
}
