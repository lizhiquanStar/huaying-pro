import { Component } from 'vue-property-decorator';
import ViewFactory from '@/core/factory/view.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto.ts';

@Component({})
export class TheError403Config extends ViewFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
}
