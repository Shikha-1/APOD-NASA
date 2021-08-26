import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "3vh 0",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function RecipeReviewCard({data}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={data.title}
        subheader={new Date(data.date).toDateString()}
      />
      {data.media_type === "image" ? (
        <CardMedia
          image={data.hdurl || data.url}
          className={classes.media}
          component={data.media_type}
          title={data.title}
        />
      ) : (
        <CardMedia
          component="iframe"
          src={data.hdurl || data.url}
          autoPlay={true}
          className={classes.media}
          title={data.title}
        />
      )}
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="h4">
          &copy; {data.copyright}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show More"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{data.explanation}</Typography>
          <Typography paragraph>
            <u>
              Source:{" "}
              <a
                href="https://apod.nasa.gov/apod/astropix.html"
                target="_blank"
                rel="noreferrer"
              >
                https://www.nasa.gov/
              </a>
            </u>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
