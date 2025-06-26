// ----------------------------------------------------------------------

import { de } from 'date-fns/locale';

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
      resetPassword: `${ROOTS.AUTH}/jwt/reset-password`,
      becomeSeller: `${ROOTS.AUTH}/jwt/becom-seller`,
    },
  },
  // DASHBOARD
  dashboard: {
    mail: `${ROOTS.DASHBOARD}/mail`,
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
    user: {
      root: '/dashboard/user',
      list: '/dashboard/user/list',
      create: '/dashboard/user/create',
      edit: (id: string) => `/dashboard/user/${id}/edit`,
      view: (id: string) => `/dashboard/user/${id}`,
      role: {
        root: '/dashboard/user/role',
        list: '/dashboard/user/role/list',
        create: '/dashboard/user/role/create',
        edit: (id: string) => `/dashboard/user/role/${id}/edit`,
      },
      permission: {
        root: '/dashboard/user/permission',
        list: '/dashboard/user/permission/list',
        create: '/dashboard/user/permission/create',
        edit: (id: string) => `/dashboard/user/permission/${id}/edit`,
      },
    },

    services: '/dashboard/services',
    testimonials: '/dashboard/testimonial',
    interests: '/dashboard/interests',
    projects: {
      root: '/dashboard/projects',
      create: '/dashboard/projects/new',
      edit: (id: string) => `/dashboard/projects/edit/${id}`,
      detail: (id: string) => `/dashboard/projects/detail/${id}`,
    },
    contactManagement: {
      root: '/dashboard/contact-management',
      chat: (id: string) => `/dashboard/contact-management/chat/${id}`,
    },
    settings: {
      admin: '/dashboard/settings/admin',
      seller: '/dashboard/settings/seller',
    },
  },
};

export const NEW_PAGE = '/dashboard/new-page';
