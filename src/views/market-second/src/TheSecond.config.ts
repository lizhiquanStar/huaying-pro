import { Component } from 'vue-property-decorator';
import ViewFactory from '@/core/factory/view.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto';

@Component({})
export class MarketSecond extends ViewFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
}
