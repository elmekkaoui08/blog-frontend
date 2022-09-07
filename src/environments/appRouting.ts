
const ADMIN = '/admin';
const AUTHOR = '/author';
const AUTH = '/auth'
export const AppRouting = {
  admin: {
    dashboard: `${ADMIN}/dashboard`,
  },
  author: {
    dashboard: `${AUTHOR}/dashboard`
  },
  public: {
    home: '/',
    posts: '/posts/'
  },
  auth: {
    signIn: `${AUTH}/sign-in`,
    signUp: `${AUTH}/sign-up`,
    forgotPassword: `${AUTH}/forgot-password`,
    resetPassword: `${AUTH}/reset-password`
  }
}
