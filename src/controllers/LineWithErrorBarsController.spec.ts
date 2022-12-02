import { registry, LinearScale, CategoryScale, LineElement } from 'chart.js';
import createChart from '../__tests__/createChart';
import { LineWithErrorBarsController } from './LineWithErrorBarsController';
import { PointWithErrorBar } from '../elements';

describe('line', () => {
  beforeAll(() => {
    registry.addControllers(LineWithErrorBarsController);
    registry.addElements(PointWithErrorBar, LineElement);
    registry.addScales(LinearScale, CategoryScale);
  });
  test('default', () => {
    return createChart({
      type: LineWithErrorBarsController.id,
      data: {
        labels: ['A', 'B'],
        datasets: [
          {
            data: [
              {
                y: 4,
                yMin: 1,
                yMax: 6,
              },
              {
                y: 2,
                yMin: 1,
                yMax: 4,
              },
            ],
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    }).toMatchImageSnapshot();
  });

  test('linear scale', () => {
    return createChart({
      type: LineWithErrorBarsController.id,
      data: {
        datasets: [
          {
            data: [
              {
                x: 1,
                y: 4,
                yMin: 1,
                yMax: 6,
              },
              {
                x: 2,
                y: 2,
                yMin: 1,
                yMax: 4,
              },
            ],
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    }).toMatchImageSnapshot();
  });
});
