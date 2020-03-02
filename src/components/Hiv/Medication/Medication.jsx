import React, {useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    CardBody,
    Col,
    Row,
    Form,
    Card,
    FormGroup,
    Label,
    Input
    
} from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import 'react-widgets/dist/css/react-widgets.css';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
//import moment from 'moment';
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';  
import {url} from 'axios/url';

//Dtate Picker package
Moment.locale('en');
momentLocalizer();

const useStyles = makeStyles(theme => ({
    root2: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      margin:theme.spacing(7),
      bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 12,
            
        },
        pos: {
          fontSize: 11,
        },
      cardContent:{
          padding: 2,
      },
      cardroot:{
          margin:theme.spacing(1),
          height: 250 + 'px !important' ,
      }
      
      },
      alertmsge:{
          marginTop: theme.spacing(2),
      },
      rootaccordia: {
          width: '100%',
      },
      accordiaheading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
      },
      allergiesroot: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > *': {
          margin: theme.spacing(0.5),
          },
      },
      
      checkboxroot: {
          display: 'flex',
      },
      formControl: {
          margin: theme.spacing(3),
      },
      
      root: {
          '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
          },
          
      },
  
      formroot: {
          '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
          },
      },
  
      heading: {
          fontSize: theme.typography.pxToRem(15),
      },
      secondaryHeading: {
          fontSize: theme.typography.pxToRem(15),
          color: theme.palette.text.secondary,
      },
      icon: {
          verticalAlign: 'bottom',
          height: 20,
          width: 20,
      },
      details: {
          alignItems: 'center',
      },
      column: {
          flexBasis: '33.33%',
      },
      helper: {
          borderLeft: `2px solid ${theme.palette.divider}`,
          padding: theme.spacing(1, 2),
      },
      link: {
          color: theme.palette.primary.main,
          textDecoration: 'none',
          '&:hover': {
          textDecoration: 'underline',
          },
      },
      inforoot: {
          width: '95%',
          margin: 20,
          backgroundColor: '#eee',
      },
      })); 
    const cardStyle = {
        borbderColor: '#fff',
        marginBottom: 10,
    };


export default function Medication(props) {
    const apicountries = url+"encounters/pharmacy/drugs";
    const [countries, setCountries] = React.useState([]);
     //Get countries     
      React.useEffect(() => {
        async function getCharacters() {
          const response = await fetch(apicountries);
          const body = await response.json();
          setCountries(body.map(({ genericName, id }) => ({ label: genericName, value: id })));
           //console.log(body);
        }
        getCharacters();
       
      }, []);
    const classes = useStyles(); 
    //POST METHOD TO SAVE THE RECORD
    const {getpatient} =props.getpatientdetails ;
    const PatientID = getpatient.row.patientId;
    const visitId = getpatient.row.id;
   //console.log(getpatient);
    //Save Assign Clinician 
    const [consult, setconsult] = useState({ 
            present_consultation: '', 
            patientId: PatientID, 
            visitId:visitId,
            consultation_notes:'',
            formName: 'DRUG_ORDER_FORM',
            serviceName: 'GENERAL_SERVICE' 
        }); 
 

    //    console.log(clinician);
    const [showLoading, setShowLoading] = useState(false);  
    const apiUrl = url+"encounters/GENERAL_SERVICE/CONSULTATION_FORM/"+PatientID;  
    const SaveDrug = (e) => { 
    e.preventDefault();  

    const data = {
            formData :'',
            present_consultation: consult.present_consultation, 
            patientId: PatientID, 
            visitId:visitId,
            consultation_notes: consult.consultation_notes,
            formName: 'CONSULTATION_FORM',
            serviceName: 'GENERAL_SERVICE'
    }; 
    console.log(data);
    axios.post(apiUrl, data)
        .then((result) => {          
            setShowLoading(false);
            props.history.push('/checkedin-patients')
            toast.success(" Successful!");
        }).catch((error) => {
            console.log(error);
        setShowLoading(false)
        setconsult(false);

        }
        ); 
    };

    const onChange = (e) => {
    e.persist();     
    setconsult({...consult, [e.target.name]: e.target.value});
    } 

  return (
      <Form onSubmit={SaveDrug}>
          <Row>
                <Col lg={5} >
                  <Card  style={cardStyle} className=" p-3">
                    <CardBody>
                        <Typography className={classes.title} color="primary" gutterBottom>
                                        Drug Order
                        </Typography>
                                <form className={classes.formroot} noValidate autoComplete="off">
                                        
                                        <div>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Input type="select" name="maritalStatusId" id="maritalStatusId" 
                                                    value={consult.consultation_notes}
                                                    onChange={onChange}>
                                                    <Label for="maritalStatus">Marital Status</Label>
                                                        {countries.map(({ label, value }) => (
                                                            <option key={value} value={value}>
                                                            {label}
                                                            </option>
                                                        ))}
                                                    </Input>
                                            </FormGroup>  
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                            <Label for="hospitalNumber">Dosage Strength</Label>
                                                <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Drug Unit" 
                                                    value={consult.consultation_notes}
                                                    onChange={onChange}
                                                />
                                            </FormGroup>  
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                            <Label for="hospitalNumber">Dosage Frequency</Label>
                                                <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Frequency" 
                                                    value={consult.consultation_notes}
                                                    onChange={onChange}
                                                />
                                            </FormGroup>  
                                        </Col>
                                        <Col md={12}>
                                            <Label for="middleName">Start Date</Label>
                                
                                            <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   
                                            defaultValue={new Date()} max={new Date()}
                                            />
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                            <Label for="hospitalNumber">Duration</Label>
                                                <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Duration" 
                                                value={consult.consultation_notes}
                                                onChange={onChange}
                                                />
                                            </FormGroup>  
                                         </Col>
                                        <Col md={12}>
                                                <FormGroup>
                                                <Label for="hospitalNumber">Duration Unit</Label>
                                                <Input type="select" name="genderId" id="genderId" >
                                                    <option value="1">Days</option>
                                                    <option value="2">Weeks</option>
                                                    <option value="3">Months</option>
                                                </Input>
                                                </FormGroup>  
                                        </Col>
                                         <Col md={12}>
                                                <FormGroup>
                                                <Label for="hospitalNumber">Enter Instruction</Label>
                                                    <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Enter Instruction" 
                                                        value={consult.consultation_notes}
                                                        onChange={onChange}
                                                    />
                                                </FormGroup>  
                                         </Col>
                                            {showLoading && 
                    
                                                <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                                </Spinner> 
                                            } 
                                             <br/>

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                
                                                    startIcon={<SaveIcon />}
                                                >
                                                    Save
                                                </Button>
                                        </div>
                                    </form> 
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={7} >
                    <Row>
                        <Col lg={12} >
                            <Card  style={cardStyle} >
                                <CardBody>
                                    <Typography className={classes.title} color="primary" gutterBottom>
                                            Previous Order
                                    </Typography>                   
                                </CardBody>
                            </Card>
                        </Col>
                        <br/>
                        <br/>
                        <Col lg={12} >
                            <Card  style={cardStyle} >
                                <CardBody>
                                    <Typography className={classes.title} color="primary" gutterBottom>
                                            Current Order
                                    </Typography>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                  
                </Col>
               
              </Row>
      </Form>
    
  );
}

