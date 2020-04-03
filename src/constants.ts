export enum UserRoles {
    user = 'data_entry',
    admin = 'admin',
    superAdmin = 'super_admin',
}

export const userRoles = {
    admins: [String(UserRoles.superAdmin), String(UserRoles.admin)],
    users: [String(UserRoles.user)],
};

export enum AuthRoutes {
    dashboard = '/',
    sales = '/sales/',
    newsale = '/newsale',
}

export enum NonAuthRoutes {
    login = '/login',
    unauthorized = '/unauthorized',
}
