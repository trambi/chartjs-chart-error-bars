﻿import { controllers, helpers, defaults } from 'chart.js';
import { calculateScale } from './utils';
import { getMinMax, parseErrorNumberData } from './base';
import { generateTooltipScatter } from './tooltip';
import { animationHints } from '../animate';
import { PointWithErrorBar } from '../elements';
import { styleObjectKeys } from '../elements/render';

const tooltipDefaults = {
  tooltips: {
    callbacks: {
      label: generateTooltipScatter,
    },
  },
};

export class ScatterWithErrorBars extends controllers.scatter {
  getMinMax(scale, canStack) {
    return getMinMax(scale, canStack, (scale, canStack) => super.getMinMax(scale, canStack));
  }

  parseObjectData(meta, data, start, count) {
    const parsed = super.parseObjectData(meta, data, start, count);
    parseErrorNumberData(parsed, meta.xScale, data, start, count);
    parseErrorNumberData(parsed, meta.yScale, data, start, count);
    return parsed;
  }

  updateElement(element, index, properties, mode) {
    if (element instanceof PointWithErrorBar) {
      // inject the other error bar related properties
      calculateScale(properties, this.getParsed(index), this._cachedMeta.xScale, mode === 'reset');
      calculateScale(properties, this.getParsed(index), this._cachedMeta.yScale, mode === 'reset');
    }
    super.updateElement(element, index, properties, mode);
  }
}
ScatterWithErrorBars.prototype.dataElementOptions = Object.assign(
  {},
  controllers.scatter.prototype.dataElementOptions,
  styleObjectKeys
);

ScatterWithErrorBars.id = 'scatterWithErrorBars';
ScatterWithErrorBars.register = () => {
  ScatterWithErrorBars.prototype.dataElementType = PointWithErrorBar.register();
  controllers[ScatterWithErrorBars.id] = ScatterWithErrorBars;
  defaults.set(ScatterWithErrorBars.id, helpers.merge({}, [defaults.scatter, tooltipDefaults, animationHints]));
  return ScatterWithErrorBars;
};
