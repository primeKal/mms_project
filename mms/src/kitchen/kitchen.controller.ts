import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { CreateKitchenDto, AddItemsToKitchenDto, RegisterPayloadDto, UpdateKitchenDto } from './dtos/kitchen.dtos';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';

@ApiTags('kitchen')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new kitchen' })
  @ApiResponse({ status: 201, description: 'Kitchen successfully created.' })
  create(@Body() createKitchenDto: CreateKitchenDto, @Req() req: any) {

    return this.kitchenService.create(createKitchenDto, req.user?.company?.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all kitchens' })
  @ApiResponse({ status: 200, description: 'Return all kitchens.' })
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return this.kitchenService.findAll(page, pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a kitchen by id' })
  @ApiResponse({ status: 200, description: 'Return the kitchen.' })
  @ApiResponse({ status: 404, description: 'Kitchen not found.' })
  findOne(@Param('id') id: string) {
    return this.kitchenService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a kitchen' })
  @ApiResponse({ status: 200, description: 'Kitchen successfully updated.' })
  @ApiResponse({ status: 404, description: 'Kitchen not found.' })
  update(
    @Param('id') id: string,
    @Body() updateKitchenDto: UpdateKitchenDto
  ) {
    return this.kitchenService.update(+id, updateKitchenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a kitchen' })
  @ApiResponse({ status: 200, description: 'Kitchen successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Kitchen not found.' })
  remove(@Param('id') id: string) {
    return this.kitchenService.remove(+id);
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Add items to a kitchen' })
  @ApiResponse({ status: 200, description: 'Items successfully added to kitchen.' })
  @ApiResponse({ status: 404, description: 'Kitchen not found.' })
  addItems(
    @Param('id') id: string,
    @Body() addItemsDto: AddItemsToKitchenDto
  ) {
    return this.kitchenService.addItems(+id, addItemsDto);
  }

  @Delete(':id/items')
  @ApiOperation({ summary: 'Clear all items from a kitchen' })
  @ApiResponse({ status: 200, description: 'Kitchen items successfully cleared.' })
  @ApiResponse({ status: 404, description: 'Kitchen not found.' })
  clearKitchen(@Param('id') id: string) {
    return this.kitchenService.clearKitchen(+id);
  }

  @Post(':id/payload')
  @ApiOperation({ summary: 'Register a payload for a kitchen' })
  @ApiResponse({ status: 201, description: 'Payload successfully registered.' })
  @ApiResponse({ status: 404, description: 'Kitchen not found.' })
  registerPayload(
    @Param('id') id: string,
    @Body() registerPayloadDto: RegisterPayloadDto
  ) {
    return this.kitchenService.registerPayload(+id, registerPayloadDto);
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Get kitchen history' })
  @ApiResponse({ status: 200, description: 'Return kitchen history.' })
  @ApiResponse({ status: 404, description: 'Kitchen not found.' })
  getKitchenHistory(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return this.kitchenService.getKitchenHistory(+id, page, pageSize);
  }

  @Get(':id/items')
  @ApiOperation({ summary: 'Get all items in a kitchen' })
  @ApiResponse({ status: 200, description: 'Return all kitchen items.' })
  @ApiResponse({ status: 404, description: 'Kitchen not found.' })
  getKitchenItems(@Param('id') id: string) {
    return this.kitchenService.getKitchenItems(+id);
  }

  @Get('requests/pending')
  @ApiOperation({ summary: 'Get all pending item requests' })
  @ApiResponse({ status: 200, description: 'Return all pending item requests.' })
  getPendingItemRequests(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return this.kitchenService.getPendingItemRequests(page, pageSize);
  }

  @Post('requests/:id/approve')
  @ApiOperation({ summary: 'Approve an item request' })
  @ApiResponse({ status: 200, description: 'Item request successfully approved.' })
  @ApiResponse({ status: 404, description: 'Item request not found.' })
  approveItemRequest(@Param('id') id: string) {
    return this.kitchenService.approveItemRequest(+id);
  }

  @Post('requests/:id/disapprove')
  @ApiOperation({ summary: 'Disapprove an item request' })
  @ApiResponse({ status: 200, description: 'Item request successfully disapproved.' })
  @ApiResponse({ status: 404, description: 'Item request not found.' })
  disapproveItemRequest(@Param('id') id: string) {
    return this.kitchenService.disapproveItemRequest(+id);
  }
}
