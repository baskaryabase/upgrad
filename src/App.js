import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddAlert from '@material-ui/icons/Add';
import Snackbar from './Snackbar/Snackbar';
const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	table: {
		minWidth: 700
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	}
});

class SubscriberLIst extends React.Component {
	state = {
		open: false,
		list: [ { id: 0, name: 'Baskar', number: 7904852282 } ],
		name: '',
		number: '',
		id: 0,
		view: 'list',
		edit: {},
		index: '',
		showNotification: { open: false, msg: '', type: '' }
	};
	showNotification(alert) {
		this.setState({ showNotification: { type: alert.type, msg: alert.msg, open: true } });
	}
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};
	addToList = () => {
		if (this.state.name == '' || this.state.number == '') {
			return this.showNotification({ type: 'warning', msg: 'Please checkout all fields' });
		}
		if (this.state.number.toString().length < 7) {
			return this.showNotification({ type: 'warning', msg: 'Please Enter a valid mobile number' });
		}
		this.setState({
			list: [
				...this.state.list,
				{
					id: this.state.id + 1,
					name: this.state.name,
					number: this.state.number
				}
			],
			name: '',
			number: '',
			id: this.state.id + 1,
			view: 'list'
		});
		return this.showNotification({ type: 'success', msg: 'Subscriber Added successfully' });
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Snackbar
					place="tc"
					color={this.state.showNotification.type}
					icon={AddAlert}
					message={this.state.showNotification.msg}
					open={this.state.showNotification.open}
					closeNotification={() =>
						this.setState({
							showNotification: { ...this.state.showNotification, open: false }
						})}
					close
				/>
				{this.state.view == 'list' ? (
					<div style={{ margin: 100 }}>
						<Grid>
							<div style={{ float: 'right' }}>
								<Button
									variant="outlined"
									color="primary"
									onClick={() => {
										this.setState({ view: 'add' });
									}}
								>
									Add New SubScriber
								</Button>
							</div>
							<Grid container justify="center" flexDirection={'column'}>
								{/* ADD A Subscriber modal */}
								<Dialog
									open={this.state.open}
									onClose={this.handleClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">Edit Subscriber Details</DialogTitle>
									<DialogContent style={{ height: 50 }}>
										<TextField
											id="outlined-name"
											label="Name"
											className={classes.textField}
											value={this.state.edit.name}
											onChange={(e) => {
												this.setState({
													edit: { ...this.state.edit, name: e.target.value }
												});
											}}
											margin="normal"
											variant="outlined"
										/>
										<TextField
											id="outlined-name"
											label="Phone Number"
											className={classes.textField}
											value={this.state.edit.number}
											type="number"
											onChange={(e) => {
												this.setState({
													edit: { ...this.state.edit, number: e.target.value }
												});
											}}
											margin="normal"
											variant="outlined"
										/>
									</DialogContent>
									<DialogActions>
										<Button onClick={this.handleClose} color="primary">
											cancel
										</Button>
										<Button
											onClick={() => {
												this.setState({
													list: [
														...this.state.list.slice(0, this.state.index),
														this.state.edit,
														...this.state.list.slice(this.state.index + 1)
													],
													open: false
                        });
                        return this.showNotification({ type: 'success', msg: 'Subscriber Detail edited  successfully' });
											}}
											color="primary"
											autoFocus
										>
											Edit
										</Button>
									</DialogActions>
								</Dialog>
								<Grid xs={12}>
									<Paper className={classes.root}>
										<Table className={classes.table}>
											<TableHead>
												<TableRow>
													<TableCell>#</TableCell>
													<TableCell>Id</TableCell>
													<TableCell>Name</TableCell>
													<TableCell align="right">Phone Number</TableCell>
													<TableCell align="right">Actions</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{this.state.list.map((l, i) => {
													return (
														<TableRow>
															<TableCell>{i + 1}</TableCell>
															<TableCell>{l.id}</TableCell>
															<TableCell>{l.name}</TableCell>
															<TableCell align="right">{l.number}</TableCell>
															<TableCell align="right">
																<IconButton
																	className={classes.button}
																	aria-label="Edit"
																	onClick={() => {
																		this.setState({
																			edit: { ...l },
																			index: i,
																			open: true
																		});
																	}}
																	color="primary"
																>
																	<EditIcon />
																</IconButton>
																<IconButton
																	className={classes.button}
																	aria-label="Delete"
																	onClick={() => {
																		this.setState({
																			list: [
																				...this.state.list.slice(0, i),
																				...this.state.list.slice(i + 1)
																			]
																		});
																	}}
																	color="primary"
																>
																	<DeleteIcon />
																</IconButton>
															</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
					</div>
				) : (
					<div style={{ margin: 100 }}>
						<Grid>
							<div>
								<Button
									variant="outlined"
									color="primary"
									onClick={() => this.setState({ view: 'list' })}
								>
									Go Back
								</Button>
							</div>
							<Grid container justify="center" direction={'column'}>
								<TextField
									id="outlined-name"
									label="Name"
									className={classes.textField}
									value={this.state.name}
									onChange={this.handleChange('name')}
									margin="normal"
									variant="outlined"
								/>
								<TextField
									id="outlined-name"
									label="Phone Number"
									className={classes.textField}
									value={this.state.number}
									type="number"
									onChange={this.handleChange('number')}
									margin="normal"
									variant="outlined"
								/>
								<br />
								<Grid>
									Name:{this.state.name}
									<br />
									Number:{this.state.number}
									<Button
										style={{ float: 'right' }}
										variant="outlined"
										color="primary"
										onClick={this.addToList.bind(this)}
									>
										Add Subscriber
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</div>
				)}
			</div>
		);
	}
}

SubscriberLIst.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubscriberLIst);
