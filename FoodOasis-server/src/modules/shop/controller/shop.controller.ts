import { Service } from 'typedi'
import { ResponseSchema } from 'routing-controllers-openapi';
import { Controller, Body, Post, Get, CurrentUser, Authorized, Put } from 'routing-controllers';

import { SuccessResponse } from '@responses//';
import { ShopService } from '../services/shop.service';
import { CreateShopDto, UpdateShopDto } from '../dto/shop.dto';
import { ShopData, ShopResponse, ShopsData, ShopsResponse } from '../dto/responses/shop.response';

@Service()
@Controller('/api/v1/shops')
export class UserController {
    constructor(
        private readonly shopService: ShopService
    ){}

    @Post()
    @Authorized()
    @ResponseSchema(ShopResponse)
    async createShop(@Body() body: CreateShopDto, @CurrentUser() {userId}: CurrentUser): Promise<ShopResponse> {
        const shop = await this.shopService.createShop({ userId, ...body });
        return new SuccessResponse<ShopData>('Shop Created', { shop });
    }

    @Get()
    @ResponseSchema(ShopsResponse)
    async listShops(): Promise<ShopsResponse> {
        const shops = await this.shopService.listShops();
        return new SuccessResponse<ShopsData>('Shops found', { shops });
    }


    @Get('/user/:id')
    @Authorized()
    @ResponseSchema(ShopsResponse)
    async listOwnedShops(@CurrentUser() {userId}: CurrentUser): Promise<ShopsResponse> {
        const shops = await this.shopService.listShops({userId});
        return new SuccessResponse<ShopsData>('Shops found', { shops });
    }

    @Get('/:id')
    @ResponseSchema(ShopResponse)
    async getShop(@CurrentUser() {userId}: CurrentUser ): Promise<ShopResponse> {
        const shop = await this.shopService.getShop({ userId });
        return new SuccessResponse<ShopData>('Shop Found', { shop });
    }

    @Put('/:id')
    @Authorized()
    @ResponseSchema(ShopResponse)
    async updateShop(@Body() body: UpdateShopDto, @CurrentUser() {userId}: CurrentUser): Promise<ShopResponse> {
        const shop = await this.shopService.update({ userId }, body);
        return new SuccessResponse<ShopData>('Shop Profile', { shop });
    }
}