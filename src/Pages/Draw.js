import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../Commons/Layout';
import Paper from '../Components/Paper';
import { Grid, Box, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { colors, brushes } from '../Constants';
import { project } from 'paper';
import { newPaper, prevPaper, nextPaper, savePaper } from '../Redux/Actions/Paper';

const useStyles = makeStyles((theme) => ({
  // actionsDial: {
  //   position: 'absolute',
  //   bottom: theme.spacing(2),
  //   right: theme.spacing(2),
  // },
  colorsDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    '& button': {
      backgroundColor: 'white'
    },
    '& button:hover': {
      backgroundColor: 'white'
    }
  },
  brushesDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(12),
    '& button': {
      backgroundColor: 'white'
    },
    '& button:hover': {
      backgroundColor: 'white'
    }
  },
  actions: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  actionsFab: {
    marginLeft: theme.spacing(2)
  }
}));

const initDials = {
  'color': false,
  'brush': false,
  'actions': false
};

const Draw = (props) => {
  const classes = useStyles();

  const {
    currentPaper,
    savePaper
  } = props;

  const [dials, setDials] = useState(initDials);
  const [strokeColor, setStrokeColor] = useState('gold');
  const [strokeWidth, setStrokeWidth] = useState(8);

  const toggleDial = (name) => (state) => () => setDials({ ...dials, [name]: state });

  const handleDial = (name) => (value) => () => {
    switch (name) {
      case 'colors': setStrokeColor(value); break;
      case 'brushes': setStrokeWidth(value); break;
    }
    return toggleDial(name)(false)();
  };

  const handleAction = (name) => () => {
    switch (name) {
      case 'NEW': props.newPaper(); break;
      case 'PREV': props.prevPaper(); break;
      case 'NEXT': props.nextPaper(); break;
      case 'SAVE': props.savePaper(project.activeLayer.exportJSON()); break;
    }
  };

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
              json={currentPaper}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              savePaper={savePaper}
            />
          </Box>
        </Grid>
      </Grid>
      <SpeedDial
        ariaLabel="Colors SpeedDial"
        className={classes.colorsDial}
        icon={colorView}
        onClose={toggleDial('colors')(false)}
        onOpen={toggleDial('colors')(true)}
        open={dials['colors']}
      >
        {colors.map((action, i) => (
          <SpeedDialAction
            key={i}
            icon={action.icon}
            onClick={handleDial('colors')(action.value)}
          />
        ))}
      </SpeedDial>
      <SpeedDial
        ariaLabel="Brush SpeedDial"
        className={classes.brushesDial}
        icon={brushView}
        onClose={toggleDial('brushes')(false)}
        onOpen={toggleDial('brushes')(true)}
        open={dials['brushes']}
      >
        {brushes(strokeColor).map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={handleDial('brushes')(action.value)}
          />
        ))}
      </SpeedDial>
      <div className={classes.actions}>
      <Fab className={classes.actionsFab} aria-label="prev" onClick={handleAction('PREV')}>
          <ArrowBackIcon />
        </Fab>
        <Fab className={classes.actionsFab} aria-label="next"onClick={handleAction('NEXT')}>
          <ArrowForwardIcon />
        </Fab>
        <Fab className={classes.actionsFab} color="secondary" aria-label="new" onClick={handleAction('NEW')}>
          <AddIcon />
        </Fab>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  currentPaper: state.paper.currentPaper,
});

export default connect(mapStateToProps, {
  newPaper,
  prevPaper,
  nextPaper,
  savePaper
})(Draw);