import mock from './mock'

import './auth/jwt'
import './apps/calendar'

mock.onAny().passThrough()
