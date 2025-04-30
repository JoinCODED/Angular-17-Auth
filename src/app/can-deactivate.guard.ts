import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component, 
  currentRoute, 
  currentState, 
  nextState) => {
    return component.canDeactivate ? component.canDeactivate() : true;
};
