import { inject } from '@angular/core';
import { AppContextService } from "@/app/services/app-context.service";

export const appContextMustBeLoaded = async (): Promise<boolean> => {
  const _appContext = inject(AppContextService)
  if (_appContext.isLoaded) {
    return true;
  }
  await _appContext.pull()

  return true;
}
