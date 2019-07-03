import React from 'react';
import BountyCard from './BountyCard'
import BountyFab from './BountyFab';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  main: {
    margin: theme.spacing.unit*3,
  },
});

class CardDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }

  update() {
    let cards = [];
    fetch('/api/bounties/all', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        // add cards from response to array
        data.forEach(
          data => cards.push(<BountyCard 
            subject={data.subject}
            description={data.description}
            userName={data.user}
            bounty={data.bounty}
            key={data.userName+data.subject}/>)
        )
        // set card array as state
        this.setState({cards: cards});
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Grid container spacing={24}>
          {this.state.cards}
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    this.update();
  }
}

export default withStyles(styles)(CardDisplay);