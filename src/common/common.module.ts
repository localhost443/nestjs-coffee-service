import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { WrapResponseInterceptor } from './interceptor/wrap-response.interceptor';
import { TimeoutInterceptorInterceptor } from './interceptor/timeout-interceptor.interceptor';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: WrapResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptorInterceptor,
    },
  ],
})
export class CommonModule {}
