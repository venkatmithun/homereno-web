import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Header from '../header/Header';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { history } from '../../state/ReduxStore';

class PaintingForm extends React.Component {
  constructor(props) {
    super(props);
    this.emptyRoom = {
      size: 'M',
      type: 'I',
      ceiling: 10,
      windows: 2,
      doors: 2,
      windowTrims: 2,
      doorTrims: 2,
      mouldings: 0,
      additional: '',
    };
    this.state = {
      rooms: [{ ...this.emptyRoom }],
    };
  }

  handleChange = (event, name, idx) => {
    const { value } = event.target;
    console.log(name, value, idx);
    const temp = [...this.state.rooms];
    temp[idx][name] = value;
    this.setState((state) => ({
      rooms: temp,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { rooms } = this.state;
    this.props.savePaintJob(rooms);
    history.push('/home');
  };

  addRoom = () => {
    this.setState({
      rooms: [...this.state.rooms, { ...this.emptyRoom }],
    });
  };

  render() {
    const { user, logOut } = this.props;
    return (
      <div>
        <Header user={user} logOut={logOut} />
        <div style={{ padding: '20px' }}>
          <h1>Painting Form</h1>

          <form onSubmit={this.handleSubmit}>
            <Step1
              handleChange={this.handleChange}
              rooms={this.state.rooms}
              addRoom={this.addRoom}
            />
            <Button onClick={this.handleSubmit}>Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}

/*
Questionnaire workflow
Exterior/interior
Interior
    Number of rooms
    For each room
    Size of room (S, M, L)
    Type of room
    Height of ceiling
    Number of Windows
    Number. of Doors
    Number of coats?
    Additional
        Window Trims
        Door Trims
        Baseboard/Crown Mouldings
Other (Hallways, bathroom, attic, other specific)

*/

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Step1(props) {
  const classes = useStyles();
  return (
    <div className="form-group">
      <Button onClick={() => props.addRoom()}>Add room</Button>
      {props.rooms.map((room, idx) => {
        return (
          <div key={idx} className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={'panel1a-content' + idx}
                id={'panel1a-header' + idx}
              >
                <Typography className={classes.heading}>
                  Room {idx + 1}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl className={classes.formControl}>
                  <InputLabel id={'roomSize-label' + idx}>Size</InputLabel>
                  <Select
                    labelId={'roomSize-label' + idx}
                    value={room.size}
                    onChange={(e) => props.handleChange(e, 'size', idx)}
                  >
                    <MenuItem value={'S'}>Small</MenuItem>
                    <MenuItem value={'M'}>Medium</MenuItem>
                    <MenuItem value={'L'}>Large</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id={'roomType-label' + idx}>Size</InputLabel>
                  <Select
                    labelId={'roomType-label' + idx}
                    value={room.type}
                    onChange={(e) => props.handleChange(e, 'type', idx)}
                  >
                    <MenuItem value={'E'}>Exterior</MenuItem>
                    <MenuItem value={'I'}>Interior</MenuItem>
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

export default PaintingForm;
