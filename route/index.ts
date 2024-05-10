import authorRoute from './author.route';
import otherRoute from './others.route';
import * as Hapi from '@hapi/hapi';

const routes: Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [...authorRoute, ...otherRoute];

export default routes;
