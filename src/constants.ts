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
    home = '/',
    dashboard = 'dashboard',
    sales = 'sales/',
    products = 'products/',
    users = 'users/',
    employees = 'employees/',
    stocks = 'stocks/',
    supplies = 'supplies/',
    expenses = 'expenses/',
    newsale = 'newsale/',
    newstock = 'newstock/',
    newsupply = 'newsupply/',
    newexpense = 'newexpense/',
    resetlink = 'settings/send-password-reset-link',
}

export enum NonAuthRoutes {
    login = '/login',
    unauthorized = '/unauthorized',
    resetpassword = '/settings/reset-password/',
}

export enum codes {
    PMS = 1,
    AGO = 2,
    LPG = 3,
    LUBE = 4,
}
