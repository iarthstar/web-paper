import React, { useEffect } from 'react';
import { Card } from '@material-ui/core';
import { paper, Tool, Path, Project, project, view } from 'paper';
import { connect } from 'react-redux';

let color = null;
let width = null;

const Paper = (props) => {

  const {
    strokeColor,
    strokeWidth,
    json
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
      path.strokeCap = 'round';
      path.strokeJoin = 'round';
      path.add(point);
    };

    tool.onMouseDrag = ({ point }) => {
      path.add(point);
    };

    tool.onMouseUp = () => {
      props.savePaper(project.activeLayer.exportJSON());
    };

  }, []);

  useEffect(() => {
    color = strokeColor;
  }, [strokeColor]);

  useEffect(() => {
    width = strokeWidth;
  }, [strokeWidth]);

  useEffect(() => {
    project.clear();
    if (json) {
      project.activeLayer.importJSON(json);
    }
  }, [json]);

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