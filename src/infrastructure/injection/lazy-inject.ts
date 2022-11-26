import getDecorators from 'inversify-inject-decorators';
import { dependenciesContainer } from 'src/infrastructure/injection/inversify.config';

export const { lazyInject } = getDecorators(dependenciesContainer);
