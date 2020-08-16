import React from 'react';

export const colors = [
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'royalblue' }} />,
    name: 'Royal Blue',
    value: 'royalblue',
  },
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'gold' }} />,
    name: 'Gold',
    value: 'gold',
  },
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'limegreen' }} />,
    name: 'Lime Green',
    value: 'limegreen',
  },
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'crimson' }} />,
    name: 'Crimson',
    value: 'crimson',
  },
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'gainsboro' }} />,
    name: 'Gains Boro',
    value: 'gainsboro',
  },
];

export const brushes = (color) => ([
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '4px', height: '4px' }} />,
    name: '2',
    value: 2
  },
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '8px', height: '8px' }} />,
    name: '4',
    value: 4
  },
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '12px', height: '12px' }} />,
    name: '8',
    value: 8
  },
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '16px', height: '16px' }} />,
    name: '12',
    value: 12
  },
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '20px', height: '20px' }} />,
    name: '16',
    value: 16
  },
]);