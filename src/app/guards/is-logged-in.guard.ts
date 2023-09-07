import { CanActivateFn } from '@angular/router';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn === 'true';
};

export const isManagerGuard: CanActivateFn = (route, state) => {
  const roles = localStorage.getItem('roles')
  if(!roles) return false;
  return roles.split(',').includes('MANAGER');
}
export const isManager = () => {
  const roles = localStorage.getItem('roles')
  if(!roles) return false;
  return roles.split(',').includes('MANAGER');
}
