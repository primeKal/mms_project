export const COMPANY_REPOSITORY = "company_repo";
export const AUTH_REPOSITORY = "auth_repo";
export const MENU_REPOSITORY = "menu_repo";
export const PRODUCT_REPOSITORY = "product_repo";
export const PRODUCT_CATEGORY_REPOSITORY = "product_category_repo";
export const TABLE_REPOSITORY = "table_model_repo";
export const ORDER_REPOSITORY = "order_repo";
export const ORDER_LINE_REPOSITORY = "order_line_repository"
export const CUSTOMER_REPOSITORY = "customer_repo";
export const ROLE_REPOSITORY = "role_repo";
export const PAYMENT_METHOD_REPOSITORY = "payment_method_repo"
export const PAYMENT_REPOSITORY = "payment_repo"
export const BILLING_REPOSITORY = "billing_repo"
export const USER_REPOSITORY = "user_repo"
export const KITCHEN_REPOSITORY = "kitchen_repo"
export const KITCHEN_PAYLOAD_REPOSITORY = "kitchen_payload_repo"
export const ITEM_COUNT_REPOSITORY = "item_count_repo"
export const ITEM_REPOSITORY = "item_repo"

// file constants
export const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;



// ENUM CONSTANT
export const ORDER_STATUS_VALUES = ['Ordered', 'Prepared', 'Closed', 'Canceled'];
export const TABLE_STATUS_VALUES = ['Open', 'Occupied', 'OutOfService', 'Canceled'];

// Role IDs
export const COMPANY_ROLE_ID = 2;

export const PAYMENT_METHOD_TYPES = ['Chapa', 'SantimPay', 'Telebirr']
export const PAYMENT_STATUS = ["Draft", "Pending", "Confirmed"]

export const MEASUREMENT_UNITS = [
  'KG',      // Kilogram
  'G',       // Gram
  'L',       // Liter
  'ML',      // Milliliter
  'MG',      // Milligram
  'TON'      // Ton
] as const;

