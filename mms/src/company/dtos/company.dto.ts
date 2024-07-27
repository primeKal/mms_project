export class CompanyDto {
  readonly name: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly moto: string;
  readonly id?: string;
  readonly website: string;
  readonly story: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly specialFeatures: string;
  readonly address: string;
  readonly contact_information: string;
  readonly imgUrl: string;
  company_img: string;
  readonly telegramUserName: string;
  // readonly roleId : number;
}
export class UpdateCompanyDto {
  readonly name: string;
  readonly username: string;
  readonly moto: string;
  readonly id?: string;
  readonly website: string;
  readonly story: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly specialFeatures: string;
  readonly address: string;
  readonly contact_information: string;
  readonly imgUrl: string;
  company_img: string;
  readonly telegramUserName: string;
  // readonly roleId : number;
}