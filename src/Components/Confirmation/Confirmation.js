import { Grid } from '@material-ui/core';

const confirmation = (props) => (
    <Grid container justify="center">
        {!props.orderConfirm ? (
            <div className="card">
                <h1> Order confirmation</h1>
                <h2> Do you want to confirm? </h2>
                <button className="card_button" onClick={props.clickedOrder} value="Confirm">Confirm</button>
                <button className="card_button" onClick={props.clickedClosed} value="Cancel">Cancel</button>
            </div>)
            :
            (
            <div className="card">
                <h1> Order succesfull</h1>
                <button className="card_button" onClick={props.clickedClosed} value="OK">OK</button>
            </div>
            )
        }
    </Grid>
);

export default confirmation;