import { UserRoles, AuthRoutes, NonAuthRoutes } from '../constants';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const redirect = (role: string, company: string, companyID: string, station: string, stationID: number) => {
    //decide routes based on role
    if (role === UserRoles.admin) {
        return `${AuthRoutes.home}${companyID}/${company}/${AuthRoutes.dashboard}`;
    } else if (role === UserRoles.user) {
        return `${AuthRoutes.home}${companyID}/${company}/${stationID}/${station}/${AuthRoutes.newsale}`;
    } else {
        return `${NonAuthRoutes.unauthorized}`;
    }
};
