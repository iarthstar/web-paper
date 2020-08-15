import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../Commons/Layout';
import Paper from '../Components/Paper';
import { Grid, Box } from '@material-ui/core';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const colors = [
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'royalblue' }} />,
    name: 'Royal Blue',
    value: '#4169E1'
  },
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'gold' }} />,
    name: 'Gold',
    value: '#FFD700'
  },
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'limegreen' }} />,
    name: 'Lime Green',
    value: '#32CD32'
  },
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'crimson' }} />,
    name: 'Crimson',
    value: '#DC143C'
  },
  {
    icon: <span className='color-circle' style={{ backgroundColor: 'gainsboro' }} />,
    name: 'Gains Boro',
    value: '#DCDCDC'
  },
];

const brushes = (color) => ([
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '4px', height: '4px' }} />,
    name: 'Royal Blue',
    value: 2
  },
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '8px', height: '8px' }} />,
    name: 'Gold',
    value: 4
  },
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '12px', height: '12px' }} />,
    name: 'Lime Green',
    value: 8
  },
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '16px', height: '16px' }} />,
    name: 'Crimson',
    value: 12
  },
  {
    icon: <span className='br-round' style={{ backgroundColor: color, width: '20px', height: '20px' }} />,
    name: 'Gains Boro',
    value: 16
  },
]);

const useStyles = makeStyles((theme) => ({
  colorDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    '& button': {
      backgroundColor: 'white'
    },
    '& button:hover': {
      backgroundColor: 'white'
    }
  },
  brushDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(10),
    '& button': {
      backgroundColor: 'white'
    },
    '& button:hover': {
      backgroundColor: 'white'
    }
  },
}));

const initDials = {
  'color': false,
  'brush': false
};

const Draw = () => {
  const classes = useStyles();

  const [dials, setDials] = useState(initDials);
  const [strokeColor, setStrokeColor] = useState('gold');
  const [strokeWidth, setStrokeWidth] = useState(2);

  const toggleDial = (name) => (state) => () => setDials({ ...dials, [name]: state });
  const changeColor = (name) => (color) => () => {
    setStrokeColor(color);
    return toggleDial(name)(false);
  }

  const changeWidth = (name) => (width) => () => {
    console.log(width);
    setStrokeWidth(width);
    return toggleDial(name)(false);
  }

  const brushView = (
    <span
      className='br-round'
      style={{
        backgroundColor: strokeColor,
        width: strokeWidth === 2 ? '4px' : (strokeWidth + 4) + 'px',
        height: strokeWidth === 2 ? '4px' : (strokeWidth + 4) + 'px'
      }} />
  );

  const colorView = (
    <span
      className='br-round'
      style={{
        backgroundColor: strokeColor,
        width: '44px',
        height: '44px'
      }} />
  );

  return (
    <Layout title='Paper'>
      <Grid className='flex-grow-1'>
        <Grid item xs={12}>
          <Box p={2}>
            <Paper
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
            />
          </Box>
        </Grid>
      </Grid>
      <SpeedDial
        ariaLabel="Colors SpeedDial"
        className={classes.colorDial}
        icon={colorView}
        onClose={toggleDial('color')(false)}
        onOpen={toggleDial('color')(true)}
        open={dials['color']}
      >
        {colors.map((action, i) => (
          <SpeedDialAction
            key={i}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={changeColor('color')(action.value)}
          />
        ))}
      </SpeedDial>
      <SpeedDial
        ariaLabel="Brush SpeedDial"
        className={classes.brushDial}
        icon={brushView}
        onClose={toggleDial('brush')(false)}
        onOpen={toggleDial('brush')(true)}
        open={dials['brush']}
      >
        {brushes(strokeColor).map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={changeWidth('brush')(action.value)}
          />
        ))}
      </SpeedDial>
    </Layout>
  );
};

export default Draw;