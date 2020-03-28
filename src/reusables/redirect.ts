import { UserRoles, AuthRoutes, NonAuthRoutes } from '../constants';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const redirect = (role: string, company: string) => {
    //decide routes based on role
    if (role === UserRoles.admin) {
        return `${AuthRoutes.dashboard}${company}`;
    } else if (role === UserRoles.user) {
        return `${AuthRoutes.dashboard}${company}${AuthRoutes.newsale}`;
    } else {
        return `${AuthRoutes.dashboard}${company}${NonAuthRoutes.unauthorized}`;
    }
};
