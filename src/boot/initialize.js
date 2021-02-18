
import MiddlewareStylesheet from 'src/helpers/stylesheets'
import { initialize } from 'src/helpers/general'

export default async ({ store, router }) => {
  router.beforeEach(MiddlewareStylesheet)
  initialize(store, router)
}
