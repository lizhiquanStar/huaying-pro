import { Component } from 'vue-property-decorator';
import UIComponentFactory from '@/core/factory/component-ui.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto.ts';

@Component({})
export class BsBinjiaMoreFormConfig extends UIComponentFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
}
