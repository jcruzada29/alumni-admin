import React from 'react';
import UrlParse from 'url-parse';
import { Segment, Header, Grid, Input } from 'semantic-ui-react';
import Loading from '../../../components/loading';

class UserBasicPage extends React.Component {

	componentDidMount() {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		this.props.getUserById(query.id);
	}

	render() {
		const { user, loading } = this.props.DetailsUserPageReducer;

		return (
			<div>
				<Grid>
					<Grid.Row columns={2}>
						<Grid.Column>
							<Segment>
								<Grid.Row>
									<Header
										as="h5"
										style={{ borderBottom: '1px solid #f2f2f2', padding: '15px 15px 15px 15px' }}
									>Basic Information</Header>
								</Grid.Row>
								<Grid.Row style={{ padding: '15px 15px 0px 15px' }}>
									{
										!user && (<Grid>
											<Grid.Row>
												<Grid.Column>
													<Header
														as="h4"
														color="grey"
													>No data found</Header>
												</Grid.Column>
											</Grid.Row>
										</Grid>)
									}
									{loading && <Loading />}
									{
										(user && !loading) && (<Grid>
											<Grid.Row columns={2}>
												<Grid.Column>
													<label>
														<Input
															fluid
															placeholder={user ? `${user.first_name} ${user.last_name}` : ''}
															disabled
															className="disable-bg-color"
														/>
														<small style={{ marginLeft: '15px', color: '#999', fontSize: '10px' }}>Name</small>
													</label>
												</Grid.Column>
												<Grid.Column>
													<label>
														<Input
															fluid
															placeholder={user ? user.emplid : ''}
															disabled
															className="disable-bg-color"
														/>
														<small style={{ marginLeft: '15px', color: '#999', fontSize: '10px' }}>Student ID</small>
													</label>
												</Grid.Column>
											</Grid.Row>
											<Grid.Row columns={2}>
												<Grid.Column>
													<label>
														<Input
															fluid
															placeholder={user.zr_email_srch ? user.zr_email_srch.split('|')[0] : ''}
															disabled
															className="disable-bg-color"
														/>
														<small style={{ marginLeft: '15px', color: '#999', fontSize: '10px' }}>Email</small>
													</label>
												</Grid.Column>
												<Grid.Column>
													<label>
														<Input
															fluid
															placeholder={user ? user.term_desc : ''}
															disabled
															className="disable-bg-color"
														/>
														<small style={{ marginLeft: '15px', color: '#999', fontSize: '10px' }}>Graduation Term</small>
													</label>
												</Grid.Column>
											</Grid.Row>
											<Grid.Row columns={2}>
												<Grid.Column>
													<label>
														<Input
															fluid
															placeholder={user ? user.acad_group : ''}
															disabled
															className="disable-bg-color"
														/>
														<small style={{ marginLeft: '15px', color: '#999', fontSize: '10px' }}>School</small>
													</label>
												</Grid.Column>
												<Grid.Column>
													<label>
														<Input
															fluid
															placeholder={user ? user.zr_plan_descr : ''}
															disabled
															className="disable-bg-color"
														/>
														<small style={{ marginLeft: '15px', color: '#999', fontSize: '10px' }}>Degree</small>
													</label>
												</Grid.Column>
											</Grid.Row>
										</Grid>)
									}
								</Grid.Row>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default UserBasicPage;