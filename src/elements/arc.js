﻿import { defaults, elements } from 'chart.js';
import { renderErrorBarArc, errorBarDefaults } from './render';

export class ArcWithErrorBar extends elements.Arc {
  draw(ctx) {
    super.draw(ctx);

    renderErrorBarArc(this, ctx);
  }
}
ArcWithErrorBar._type = 'arcWithErrorBar';

defaults.set('elements', {
  [ArcWithErrorBar._type]: Object.assign({}, defaults.elements.arc, errorBarDefaults),
});
