import { UserRoles, AuthRoutes, NonAuthRoutes } from '../constants';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const redirect = (role: string, company: string, companyID: string) => {
    //decide routes based on role
    if (role === UserRoles.admin) {
        return `${AuthRoutes.dashboard}${companyID}/${company}`;
    } else if (role === UserRoles.user) {
        return `${AuthRoutes.dashboard}${companyID}/${company}${AuthRoutes.newsale}`;
    } else {
        return `${AuthRoutes.dashboard}${NonAuthRoutes.unauthorized}`;
    }
};
