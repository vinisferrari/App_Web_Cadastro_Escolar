import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // msgAviso(): string{
  //   return this.appService.msgAviso();
  // }

  // @Get(':peso/:altura')
  // calculaIMC(@Param('peso') peso: number, @Param('altura') altura: number): string {
  //   return "O índice de Massa Corporal (IMC) é: <strong>" + this.appService.calculaIMC(peso,altura) + "</strong>";
  // }
}
