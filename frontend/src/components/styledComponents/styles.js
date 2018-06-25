export const headerStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  link: {
    textDecoration: "none"
  }
});


export const indexViewStyles  = theme => ({
  root: theme.mixins.gutters({
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }),
  table: {
    minWidth: 700,
  },
});

export const loginStyles  = theme => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 16,
  }),
});
