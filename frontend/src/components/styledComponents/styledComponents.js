import HomePage from '../HomePage';
import IndexView from '../IndexView';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import SubmitDomain from '../SubmitDomain';
import Header from '../reusable/Header';

import { withStyles } from '@material-ui/core/styles';
import * as styles from './styles' ;

export const styledHomePage = withStyles(styles.homePageStyles)(HomePage);
export const styledHeader = withStyles(styles.headerStyles)(Header);
export const styledIndexView = withStyles(styles.indexViewStyles)(IndexView);
export const styledLoginForm = withStyles(styles.loginStyles)(LoginForm);
export const styledSignUpForm = withStyles(styles.loginStyles)(SignUpForm);
export const styledSubmitDomain = withStyles(styles.loginStyles)(SubmitDomain);