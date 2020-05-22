import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  Button,
  Avatar,
  CardContent,
  CardHeader,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 350,
    margin: 10,
  },
  pos: {
    fontSize: 25,
  },
  avatar: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#5c2a9d",
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className="row" style={{ marginBottom: 5 }}>
          {props.photo ? (
            <Avatar className={classes.avatar} src={props.photo} />
          ) : (
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.username[0]}
            </Avatar>
          )}

          <Typography className={classes.pos} color="textSecondary">
            {props.username}
          </Typography>
        </div>

        <Typography variant="body2" component="p">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
