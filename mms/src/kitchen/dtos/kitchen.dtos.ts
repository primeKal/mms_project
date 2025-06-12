export class CreateKitchenDto {
  name: string;
}

export class AddItemsToKitchenDto {
  items: {
    itemId: number;
    count: number;
  }[];
}

export class RegisterPayloadDto {
  comment?: string;
  payload: Record<string, any>;
  clearItems?: boolean;
}

export class UpdateKitchenDto {
  name?: string;
  isActive?: boolean;
} 