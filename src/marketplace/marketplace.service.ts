import { Injectable } from '@nestjs/common';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';
import { Marketplace } from './entities/marketplace.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Marketplace)
    private readonly marketplaceRepository: Repository<Marketplace>,
  ) {}

  async create(body: CreateMarketplaceDto): Future {
    try {
      const marketplace = this.marketplaceRepository.create(body);
      await this.marketplaceRepository.save(marketplace);
      return successResponse(
        'Marketplace product created successfully',
        marketplace,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findAll(): Future {
    try {
      const marketplaces = await this.marketplaceRepository.find();
      if (!marketplaces) {
        return errorResponse('Marketplace products not found');
      }
      return successResponse(
        'Marketplace products retrieved successfully',
        marketplaces,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findOne(id: number): Future {
    const marketplace = await this.marketplaceRepository.findOne({
      where: { id },
    });
    if (!marketplace) {
      return errorResponse('Marketplace product not found');
    }
    return successResponse(
      'Marketplace product retrieved successfully',
      marketplace,
    );
  }

  async update(id: number, body: UpdateMarketplaceDto): Future {
    try {
      const marketplace = await this.marketplaceRepository.findOne({
        where: { id },
      });
      if (!marketplace) {
        return errorResponse('Marketplace product not found');
      }
      Object.assign(marketplace, body);
      await this.marketplaceRepository.save(marketplace);
      return successResponse(
        'Marketplace product updated successfully',
        marketplace,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }

  async remove(id: number): Future {
    try {
      const marketplace = await this.marketplaceRepository.findOne({
        where: { id },
      });
      if (!marketplace) {
        return errorResponse('Marketplace product not found');
      }
      await this.marketplaceRepository.remove(marketplace);
      return successResponse('Marketplace product deleted successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async getTotalNumberOfProducts(): Future {
    try {
      const count = await this.marketplaceRepository.count();
      if (!count) {
        return errorResponse('No products found');
      }
      return successResponse(
        'Total number of products retrieved successfully',
        {
          totalProducts: count,
        },
      );
    } catch (e) {
      return errorResponse(e);
    }
  }
}
