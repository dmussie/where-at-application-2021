import { useDispatch } from 'react-redux';
//import { DataGrid } from '@mui/x-data-grid';
import { 
    Button, 
    TableRow,
    TableCell,    
    Link,
} from '@mui/material';
//import Button from '@material-ui/core/Button';
import './ReviewItem.css';

function ReviewItem({userConcerts}) {
    const dispatch = useDispatch();

    console.log('what is rows?', userConcerts);

    // const columns = [
    //     {field: 'displayName', headerName: 'Event', width: 700},
    //     {field: 'city', headerName: 'City', width: 150},
    //     {field: 'time', headerName: 'Time', width: 150},
    //     {field: 'uri', headerName: 'Event Page', width: 200, renderCell: (params) => {
    //         return <Button style={{ backgroundColor: '#E7F2F8' }} variant="contained"><a style={{ color: 'black', fontWeight: '500' }} href={`https://${params.row.uri}`} target="_blank">Get Tickets!</a></Button>
    //     }},
    //     {
    //         field: 'id', headerName: 'Delete Concert', width: 160, renderCell: (params) => {
    //             return <Button variant="contained" style={{ backgroundColor: '#FFA384', color: 'white', fontWeight: '600', padding: '0 6px' }} size="small"
    //                 onClick={removeConcert(params.row.id)}> Delete </Button>
    //         }
    //     },
    // ]

    // this function handles the deletion of an event upon selecting the delete button
    const removeConcert = () => {
        dispatch({type: 'DELETE_CONCERT', payload: userConcerts});
    };

    // the saved user concert data is rendered below and displayed as a table
    // events can be deleted with the delete button
    return(
        // <>
        //     <div style={{ height: 500, width: '100%' }}>
        //                     <DataGrid
        //                         rows={rows}
        //                         columns={columns}
        //                         pageSize={8}
        //                         rowsPerPageOptions={[8]}
        //                         checkboxSelection
        //                         disableSelectionOnClick
        //                     />
        //     </div>
        // </>
        <>
        <TableRow>
            <TableCell>{userConcerts.displayName}</TableCell>
            <TableCell>{userConcerts.city}</TableCell>
            <TableCell>{userConcerts.time}</TableCell>
            <TableCell>
            <Link id="tickets-link" href={userConcerts.uri} target="_blank"> Get Tickets!</Link>
            </TableCell>
            <TableCell>
                <Button 
                variant="contained" 
                color="secondary" 
                onClick={removeConcert}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
        </>
    )
}

export default ReviewItem;