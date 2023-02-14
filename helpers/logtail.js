'use strict';

import { Logtail } from '@logtail/browser';
const logger = process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN
  ? new Logtail(process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN)
  : null;

export { logger };
