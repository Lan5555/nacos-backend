import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('create-product')
  create(@Body() createMarketplaceDto: CreateMarketplaceDto) {
    return this.marketplaceService.create(createMarketplaceDto);
  }

  @Get('find-all-products')
  findAll() {
    return this.marketplaceService.findAll();
  }

  @Get('find-one-product/:id')
  findOne(@Param('id') id: string) {
    return this.marketplaceService.findOne(+id);
  }

  @Patch('update-product/:id')
  update(
    @Param('id') id: string,
    @Body() updateMarketplaceDto: UpdateMarketplaceDto,
  ) {
    return this.marketplaceService.update(+id, updateMarketplaceDto);
  }

  @Delete('delete-product/:id')
  remove(@Param('id') id: string) {
    return this.marketplaceService.remove(+id);
  }
  @Get('total-products')
  async getTotalNumberOfProducts() {
    return await this.marketplaceService.getTotalNumberOfProducts();
  }
}
