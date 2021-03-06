import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
    FormGroup,
    Input,
    } from 'reactstrap';
import MatButton from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
// React Notification
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';  
import {url} from 'axios/url';
import PatientVitals from 'components/PatientDashboard/PatientVitals';
import PatientAllergies from 'components/PatientDashboard/PatientAllergies';
// {/* Auto textfield complete */}



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
   
  

export default function ConsultationPage(props) {
    const classes = useStyles();  
    const {getpatient} =props.getpatientdetails ;
    const PatientID = getpatient.row.patientId;
    const visitId = getpatient.row.id;
//    console.log(getpatient);
//    alert(getpatient);
    //Save Assign Clinician 
    const [consult, setconsult] = useState({ 
            present_consultation: '', 
            patientId: PatientID, 
            visitId:visitId,
            consultation_notes:'',
            formName: 'CONSULTATION_FORM',
            serviceName: 'GENERAL_SERVICE' 
        }); 
        const [newAllergy, setNewAllergy] = useState([]);

    //    console.log(clinician);
    const [showLoading, setShowLoading] = useState(false);  
    const apiUrl = url+"encounters/GENERAL_SERVICE/CONSULTATION_FORM/"+PatientID;  
    const Saveconsult = (e) => { 
    e.preventDefault();  

    const data = {
            formData :newAllergy,
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
<form className={classes.form} onSubmit={Saveconsult}>
<Grid container spacing={2}>
        <Grid item xs='6'>                    
              <PatientVitals  height={props.height} getpatientID={PatientID} />                 
        </Grid>
       
        <Grid item xs='6'>
            <PatientAllergies height={props.height} addstatus={true} patientAllergies={["Penicilin"]} setNewAllergy={setNewAllergy}/>
        </Grid>
    
        <Grid item xs='6'>
            <Card className={classes.cardroot} style={{ height: '200px'}}>
                    <CardContent>
                        <Typography className={classes.title} color="primary" gutterBottom>
                        Presenting Complaints 
                        </Typography>
                            <Grid container spacing={12}>
                                <Grid item xs='12'>
                                    <Typography className={classes.pos} color="textSecondary" >
                                    <FormGroup>
                                    
                                    <Input type="textarea" name="consultation_notes"  id="consultation_notes" style={{height: '150px' }} value={consult.consultation_notes}
                                    onChange={onChange}/>
                                    </FormGroup>
                                        
                                    </Typography>
                                </Grid>
                                
                            </Grid>   
                                         
                    </CardContent>                      
                </Card>
        </Grid>
        <Grid item xs='6'>
        <Card className={classes.cardroot} style={{ height: '200px'}}>
                    <CardContent>
                        <Typography className={classes.title} color="primary" gutterBottom>
                           Consultation Notes
                        </Typography>
                            <Grid container spacing={12}>
                                <Grid item xs='12'>
                                    <Typography className={classes.pos} color="textSecondary" >
                                    <FormGroup>
                                    
                                    <Input type="textarea" name="present_consultation"  id="present_consultation" style={{height: '150px' }} value={consult.present_consultation}
                                    onChange={onChange}/>
                                    <br></br>
                                    </FormGroup>
                                        
                                    </Typography>
                                    
                                </Grid>
                                
                            </Grid>                               
                    </CardContent>                      
                </Card>
        </Grid>
    <br/>

        <Grid item xs={12} spacing={3}>
            
                {showLoading && 
                    
                    <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner> 
                } 
            
        <MatButton  
                type="submit" 
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                >
                Save
        </MatButton>
                        
        </Grid>
    </Grid>
</form>    
)
}