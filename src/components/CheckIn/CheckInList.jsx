
import React from 'react';  

import { makeStyles, withStyles } from '@material-ui/core/styles';  

import Paper from '@material-ui/core/Paper';  

import Table from '@material-ui/core/Table';  

import TableBody from '@material-ui/core/TableBody';  

import TableCell from '@material-ui/core/TableCell';  

import TableContainer from '@material-ui/core/TableContainer';  

import TableHead from '@material-ui/core/TableHead';  

import TablePagination from '@material-ui/core/TablePagination';  

import TableRow from '@material-ui/core/TableRow';  

import axios from 'axios';    

import { useState, useEffect } from 'react' ;
import {
    MdDashboard, MdCancel
} from 'react-icons/md';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {
    FaUserCheck
} from 'react-icons/fa';
import {Link} from 'react-router-dom'; 
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'; 
import CheckInModal from 'components/CheckIn/CheckInModal';
import {url} from 'axios/url';

const useStyles = makeStyles({  

  root: {  

    width: '100%',  

  },  

  container: {  

    maxHeight: 440,  
  }, 
  
  

});  
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

  

export default function MatPaginationTable() {  
  const classes = useStyles();  

  const [page, setPage] = React.useState(0);  

  const [data, setData] = useState([]);  
  //Modal state
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
    //end og modal state
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  //Get list of Visit/checkin patients API 
  const apipatient = url+"patients/";
  useEffect(() => {    

        const GetData = async () => {    

          const result = await axios(apipatient);    

          setData(result.data);  
          console.log(result.data);   
        }  
        GetData();     

}, []);   

  const handleChangePage = (event, newPage) => {  

    setPage(newPage);  

  };  

  const handleChangeRowsPerPage = event => {  

    setRowsPerPage(+event.target.value);  

    setPage(0);  

  };  

  return (  

    <Paper className={classes.root}>  

      <TableContainer className={classes.container}>  

        <Table stickyHeader aria-label="sticky table">  

        <TableHead>  

            <TableRow>  

              <StyledTableCell>Patient ID</StyledTableCell>  

              <StyledTableCell align="right">Patient Name</StyledTableCell>  

              <StyledTableCell align="right">Phone Number</StyledTableCell>  

              <StyledTableCell align="right">Age </StyledTableCell>  

              <StyledTableCell align="right">Action</StyledTableCell>  


            </TableRow>  

          </TableHead>  

          <TableBody>  

            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  

           <StyledTableRow >  

                <TableCell component="th" scope="row">  

                  {row.id}  

                </TableCell>  
                <TableCell align="right">{row.name}</TableCell>  

                <TableCell align="right">{row.email}</TableCell>  

                <TableCell align="right">{row.username}</TableCell>  

                <TableCell align="right">
                    <Tooltip title="Patient Dashboard">
                                    <Link to="/data-table1">
                                        <IconButton aria-label="Collect Sample">
                                            <MdDashboard size={20}/>
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                                <Tooltip title="check in Patient">
                                    <IconButton aria-label="Collect Sample">
                                        < FaUserCheck size={20} onClick={toggle}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Closed Checked In Patient">
                                    <IconButton aria-label="Closed Checked In Patient">
                                        < MdCancel size={20} onClick={toggle}/>
                                    </IconButton>
                                </Tooltip></TableCell>  
 

              </StyledTableRow>  

                 

              );  

            })}  

          </TableBody>  
        </Table>  
            {/* The checkedin modal  */}
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>Check In Patient</ModalHeader>
                <ModalBody>
                    <CheckInModal  />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Check In</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
      </TableContainer>  

      <TablePagination  

        rowsPerPageOptions={[5, 10, 15]}  

        component="div"  

        count={data.length}  

        rowsPerPage={rowsPerPage}  

        page={page}  

        onChangePage={handleChangePage}  

        onChangeRowsPerPage={handleChangeRowsPerPage}  

      />  

    </Paper>  

  );  

} 