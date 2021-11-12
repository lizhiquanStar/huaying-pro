import { ButtonAdapter } from './../../../base/button/src/BaseButton.adapter';
import { FunctionalComponentAdapter } from '@/core/dtos/component-functional.dto';

export type buttonGroupAlign = 'left' | 'mid' | 'right';

export interface FlButtonGroupAdapter extends FunctionalComponentAdapter {
  align?: buttonGroupAlign;
  buttons: ButtonAdapter[];
  on?: {};
}
