import { UserRoles, AuthRoutes, NonAuthRoutes } from '../constants';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const redirect = (role: string) => {
    //decide routes based on role
    if (role === UserRoles.admin) return AuthRoutes.dashboard;
    else if (role === UserRoles.user) return AuthRoutes.newsale;
    else return NonAuthRoutes.unauthorized;
};
