import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
  TableCell,
  TableRow,
  IconButton,
} from '@material-ui/core';
import styles from '../../../../themes/adminTheme.js';
import ImageIcon from '@material-ui/icons/Image';
import YouTubeIcon from '@material-ui/icons/YouTube';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import Fade from 'react-reveal/Fade';

class SectionToChoose extends Component {
  addchosen = (section) => (event) => {
    console.log('addchosen clicked', section);
    this.props.dispatch({ type: 'ADD_CHOSEN', payload: section });
    this.props.dispatch({
      type: 'REMOVE_SECTION_ALLSECTIONS',
      payload: section,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell
          align="left"
          component="th"
          scope="row"
          className={classes.tableCell}
        >
          {this.props.section.title}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {this.props.section.type_name === 'image' ? (
            <ImageIcon className={classes.addSectionResourceIcon} />
          ) : (
            ''
          )}
          {this.props.section.type_name === 'video' ? (
            <YouTubeIcon className={classes.addSectionResourceIcon} />
          ) : (
            ''
          )}
          {this.props.section.type_name === 'text' ? (
            <DescriptionIcon className={classes.addSectionResourceIcon} />
          ) : (
            ''
          )}
        </TableCell>
        <TableCell align="right">
          <IconButton
            variant="contained"
            color="primary"
            size="large"
            onClick={this.addchosen(this.props.section)}
            aria-label="delete"
            className={classes.addSectionResourceIcon}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  sections: reduxState.allSections,
  chosenSections: reduxState.chosenSections,
});

SectionToChoose.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(mapReduxStateToProps)(SectionToChoose)
);
