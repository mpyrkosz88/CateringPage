import { Grid } from '@material-ui/core';

const success = (props) => (
    <Grid container justify="center">
            <div className="card">
                <h1> {props.children}</h1>
                <button className="card_button" onClick={props.clickedClosed} value="OK">OK</button>
            </div>
    </Grid>
);

export default success;