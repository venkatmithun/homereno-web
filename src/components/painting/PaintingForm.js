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

class PaintingForm extends React.Component {
  constructor(props) {
    super(props);
    this.emptyRoom = {
      size: 'M',
      type: 'kitchen',
      ceiling: 10,
      windows: 2,
      doors: 2,
      windowTrims: 2,
      doorTrims: 2,
      mouldings: 0,
      additional: '',
    };
    this.state = {
      currentStep: 1,
      username: '',
      password: '',
      rooms: [{ ...this.emptyRoom }],
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, password } = this.state;
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`);
  };

  addRoom = () => {
    this.setState({
      rooms: [...this.state.rooms, { ...this.emptyRoom }],
    });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  /*
   * the functions for our button
   */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    const { user, logOut } = this.props;
    return (
      <div>
        <Header user={user} logOut={logOut} />

        <h1>Painting Form</h1>
        <p>Step {this.state.currentStep} </p>

        <form onSubmit={this.handleSubmit}>
          {/* 
        render the form steps and pass required props in
          */}
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            rooms={this.state.rooms}
            addRoom={this.addRoom}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            username={this.state.username}
          />
          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            password={this.state.password}
          />
          {this.previousButton()}
          {this.nextButton()}
        </form>
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
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group">
      <Button onClick={props.addRoom}>Add room</Button>
      {props.rooms.map((room, idx) => {
        return (
          <div key={idx} className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Room {idx + 1}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl className={classes.formControl}>
                  <InputLabel id="roomSize-label">Size</InputLabel>
                  <Select
                    labelId="roomSize-label"
                    // id="roomSize"
                    value={room.size}
                    onChange={props.handleChange}
                  >
                    <MenuItem value={'S'}>Small</MenuItem>
                    <MenuItem value={'M'}>Medium</MenuItem>
                    <MenuItem value={'L'}>Large</MenuItem>
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

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        className="form-control"
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
        value={props.username}
        onChange={props.handleChange}
      />
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={props.password}
          onChange={props.handleChange}
        />
      </div>
      <button className="btn btn-success btn-block">Sign up</button>
    </React.Fragment>
  );
}

export default PaintingForm;
