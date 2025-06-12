import { ITEM_COUNT_REPOSITORY, KITCHEN_PAYLOAD_REPOSITORY, KITCHEN_REPOSITORY } from "src/utils/constants";
import { Kitchen } from "./entities/kitchen.entity";
import { KitchenPayload } from "./entities/kitchen-payload.entity";
import { ItemCount } from "./entities/item-count.entity";

export const kitchenProvider = [
    {
      provide: KITCHEN_REPOSITORY,
      useValue: Kitchen,
    },
  ];

export const kitchenPayloadProvider = [
    {
      provide: KITCHEN_PAYLOAD_REPOSITORY,
      useValue: KitchenPayload,
    },
];

export const itemCountProvider = [
    {
      provide: ITEM_COUNT_REPOSITORY,
      useValue: ItemCount,
    },
];