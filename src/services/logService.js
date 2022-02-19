import * as Sentry from "@sentry/browser"
import { BrowserTracing } from "@sentry/tracing"

function init() {
  Sentry.init({
    dns: "https://0b569b267214476ba1afcf9d030d0881@o1146451.ingest.sentry.io/6215200",
    release: "1.1.0",
    environment: "development-test",
    integrations: [new BrowserTracing()],
  })
}

function log(error) {
  Sentry.captureException(error)
}

export default { init, log }
