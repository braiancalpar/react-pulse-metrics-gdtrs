const Chart = jest.fn().mockImplementation(() => ({
  destroy: jest.fn(),
  update: jest.fn(),
  render: jest.fn(),
}));

Chart.register = jest.fn();

const registerables = [];

module.exports = { Chart, registerables, default: Chart };
