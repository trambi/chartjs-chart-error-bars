﻿'use strict';

import * as Chart from 'chart.js';
import {calculateErrorBarValuesPixels} from './utils';
import {updateErrorBarElement} from '../elements/render';

const defaults = {};

Chart.defaults.barWithErrorBars = Chart.helpers.merge({}, [Chart.defaults.bar, defaults]);
Chart.defaults.horizontalBarWithErrorBars = Chart.helpers.merge({}, [Chart.defaults.horizontalBar, defaults]);

const barWithErrorBars = {
  dataElementType: Chart.elements.RectangleWithErrorBar,

  _elementOptions() {
    return this.chart.options.elements.rectangleWithErrorBar;
  },

  /**
   * @private
   */
  _updateElementGeometry(elem, index, reset) {
    updateErrorBarElement(this, elem, index, reset);

    Chart.controllers.bar.prototype._updateElementGeometry.call(this, elem, index, reset);
    calculateErrorBarValuesPixels(this, elem._model, index, reset);
  }
};

/**
 * This class is based off controller.bar.js from the upstream Chart.js library
 */
export const BarWithErrorBars = Chart.controllers.barWithErrorBars = Chart.controllers.bar.extend(barWithErrorBars);
export const HorizontalBarWithErrorBars = Chart.controllers.horizontalBarWithErrorBars = Chart.controllers.horizontalBar.extend(barWithErrorBars);
