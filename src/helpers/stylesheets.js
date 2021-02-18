const stylesheets = {
  web:
    '/css/web.css',
  budget:
    '/css/budget.css',
  login:
    '/css/login.css',
  admin:
    '/css/admin.css'
}
const cssElement = document.getElementById('stylesheet-data')
const defaultStylesheet = stylesheets.web
export default function stylesheet (to, from, next) {
  if (to.meta.template !== from.meta.template) {
    cssElement.href = stylesheets[to.meta.template] || defaultStylesheet
  }
  return next()
}
