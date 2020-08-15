import React, { useEffect } from 'react';
import { Card } from '@material-ui/core';
import { paper, Tool, Path, Project, project, view } from 'paper';
import { connect } from 'react-redux';

let color = null;
let width = null;

const Paper = (props) => {
  
  const {
    strokeColor,
    strokeWidth
  } = props;

  useEffect(() => {
    const canvas = document.getElementById('paper');
    paper.setup(canvas);

    let path;
    const tool = new Tool();

    tool.onMouseDown = ({ point }) => {
      path = new Path();
      path.strokeColor = color;
      path.strokeWidth = width;
      path.strokeJoin = 'round';
			path.add(point);
		};

		tool.onMouseDrag = ({ point }) => {
      path.add(point);
    };

    tool.onMouseUp = () => {
      const saved = project.activeLayer.exportJSON();
    };
    
  },[]);

  useEffect(() => {
    color = strokeColor;
  }, [strokeColor]);

  useEffect(() => {
    width = strokeWidth;
  }, [strokeWidth]);

  return (
    <Card elevation={8}>
      <canvas 
        id='paper' 
        className='w-100 h-100'
        data-paper-resize='true' 
      />
    </Card>
  );
};

export default Paper;