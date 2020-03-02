import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MatButton from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  chiproot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
},
chip: {
    margin: theme.spacing(0.5),
},
}));

export default function PatientAlert(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
            <Card className={classes.cardroot} style={props.height}>
                    <CardContent>
                        <Typography className={classes.title} color="primary" gutterBottom>
                            Allergies
                        </Typography>
                            <Grid container spacing={12}>
                                <Grid item xs='12'>
                                    <Typography className={classes.pos} color="textSecondary" >
                                            
                                      <div className={classes.allergiesroot}>
                                    <Chip
                                          label="Pencline"
                                          color="secondary"
                                          variant="outlined"
                                      />
                                      <Chip
                                          label="Nut Shirm"
                                          color="secondary"
                                          variant="outlined"
                                      />
                                      <Chip
                                          label="Deletable secondary"
                                          color="secondary"
                                          variant="outlined"
                                      />
                                      
                                      </div>
                                    </Typography>
                                </Grid>      
                            </Grid> 
                            {props.addstatus && 
                            <Form>
                            <Card >  
                                         
                                <CardContent>
                                
                                        <Row form>
                                            <Col md={4}>
                                            <FormGroup>
                                            
                                            <Input type="select" name="educationId" o>
                                                    <option value="1">Allergies 1</option>
                                                    <option value="2">Allergies</option>
                                                    <option value="3">Allergies</option>
                                                    <option value="4">Allergies</option>
                                                    
                                              </Input>
                                            </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                            <FormGroup>
                                                <Label for="altPhoneNumber"></Label>
                                                <MatButton  
                                                        type="submit" 
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.button}
                                                        startIcon={<SaveIcon />}
                                                        >
                                                        Add
                                                </MatButton>
                                            </FormGroup>
                                            </Col>
                                            
                                        </Row>


                                </CardContent> 
                                </Card> 
                                </Form>
                            }                            
                    </CardContent>                      
            </Card>
    </div>
  );
}