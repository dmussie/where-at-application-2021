import { useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import './ReviewItem.css';

function ReviewItem({rows}) {
    const dispatch = useDispatch();

    const columns = [
        {field: 'displayName', headerName: 'Event', width: 700},
        {field: 'city', headerName: 'City', width: 150},
        {field: 'time', headerName: 'Time', width: 150},
        {field: 'uri', headerName: 'Event Page', width: 200, renderCell: (params) => {
            return <Button style={{ backgroundColor: '#E7F2F8' }} variant="contained"><a style={{ color: 'black', fontWeight: '500' }} href={`https://${params.row.uri}`} target="_blank">Get Tickets!</a></Button>
        }}
    ]

    // this function handles the deletion of an event upon selecting the delete button
    const removeConcert = () => {
        dispatch({type: 'DELETE_CONCERT', payload: userConcert});
    };

    // the saved user concert data is rendered below and displayed as a table
    // events can be deleted with the delete button
    return(
        <>
            <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={8}
                                rowsPerPageOptions={[8]}
                                checkboxSelection
                                disableSelectionOnClick
                            />
            </div>
        </>
        // <tr>
        //     <td>{userConcert.displayName}</td>
        //     <td>{userConcert.city}</td>
        //     <td>{userConcert.time}</td>
        //     <td>
        //     <a id="tickets-link" href={userConcert.uri} target="_blank"> Get Tickets!</a>
        //     </td>
        //     <td>
        //         <Button 
        //         variant="contained" 
        //         color="secondary" 
        //         onClick={removeConcert}>
        //             Delete
        //         </Button>
        //     </td>
        // </tr>
        // </>
    )
}

export default ReviewItem;