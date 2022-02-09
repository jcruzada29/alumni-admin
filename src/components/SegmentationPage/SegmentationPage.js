import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Grid, Button, Form } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import {
	ExcludeSpecificStudent,
	IncludeSpecificStudents,
	IncludeStudentsByGroup
} from './components';
import { renderCheckbox } from './../../helpers/redux_form';

// // custom redux-form validation
// const validateAccessGroups = value => {
// 	return _.isArray(value) && value.length > 0 ? undefined : 'Add at least one access group';
// };

class SegmentationPage extends Component {
	componentDidMount() {
		const { type, id } = this.props;

		this.props.getAcademicGroups();
		this.props.getAcademicPlans();
		if (type && id) {
			const typeId = {
				...(type === 'event' && { event_id: id }),
				...(type === 'coupon' && { coupon_id: id }),
				...(type === 'parking' && { parking_id: id }),
				...(type === 'highlight' && { highlight_id: id }),
				...(type === 'popup' && { popup_id: id }),
				...(type === 'push' && { push_id: id })
			};

			this.props.getRecordById({ type, id });
			this.props.getAccessGroups({ type, ...typeId });
			this.props.getAccessStudents({ type, access_type: 'include', ...typeId });
			this.props.getAccessStudents({ type, access_type: 'exclude', ...typeId });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { change } = this.props;
		const {
			meta: prevMeta,
			hasLoadedRecord: prev_hasLoadedRecord,
			hasLoadedAccessGroups: prev_hasLoadedAccessGroups,
			hasLoadedAccessStudentsInclude: prev_hasLoadedAccessStudentsInclude,
			hasLoadedAccessStudentsExclude: prev_hasLoadedAccessStudentsExclude
		} = prevProps.pageProps;
		const {
			meta,
			hasLoadedRecord,
			hasLoadedAccessGroups,
			hasLoadedAccessStudentsInclude,
			hasLoadedAccessStudentsExclude
		} = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			// Remove previous notification
			if(this.props.alert.alerts.length > 0) {
				this.props.alert.remove(this.props.alert.alerts[0]);
			}
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (hasLoadedRecord && hasLoadedRecord !== prev_hasLoadedRecord) {
			const { record } = this.props.pageProps;
			change('is_visible_all', _.get(record, 'is_visible_all', false));
		}

		if (hasLoadedAccessGroups && hasLoadedAccessGroups !== prev_hasLoadedAccessGroups) {
			const { access_groups } = this.props.pageProps;
			change('access_groups', access_groups.map(o => ({
				grad_year: o.grad_year,
				acad_group: {
					id: o.acad_group,
					descr: o.acad_group === 'any' ? 'Any': o.academic_group.descr
				},
				acad_plan: {
					id: o.acad_plan,
					descr: o.acad_plan === 'any' ? 'Any': o.academic_plan.descr
				}
			})));
		}

		if (hasLoadedAccessStudentsInclude && hasLoadedAccessStudentsInclude !== prev_hasLoadedAccessStudentsInclude) {
			const { access_students_include } = this.props.pageProps;
			// change('access_students_include', access_students_include.map(o => ({
			// 	...o.student_car
			// })));
			change('access_students_include', access_students_include);
		}

		if (hasLoadedAccessStudentsExclude && hasLoadedAccessStudentsExclude !== prev_hasLoadedAccessStudentsExclude) {
			const { access_students_exclude } = this.props.pageProps;
			// change('access_students_exclude', access_students_exclude.map(o => ({
			// 	...o.student_car
			// })));
			change('access_students_exclude', access_students_exclude);
		}
	}

	componentWillUnmount() {
		this.props.resetPage(); // renamed to resetPage to not conflict redux-form's reset prop
	}

	onSubmit = data => {
		const { type, id } = this.props;

		this.props.onSubmit({
			...data,
			type,
			...(type === 'event' && { event_id: id }),
			...(type === 'coupon' && { coupon_id: id }),
			...(type === 'parking' && { parking_id: id }),
			...(type === 'highlight' && { highlight_id: id }),
			...(type === 'popup' && { popup_id: id }),
			...(type === 'push' && { push_id: id })
		});
	}

	render() {
		const {
			pageProps,
			// redux-form props
			handleSubmit,
			pristine,
			submitting,
			invalid
		} = this.props;
		const {
			loadingSubmit,
			loadingAccessGroups,
			// record
			loadingRecord,
			// include students
			loadingAccessStudentsInclude,
			search_students_include,
			loadingSearchStudentsInclude,
			// exclude students
			loadingAccessStudentsExclude,
			search_students_exclude,
			loadingSearchStudentsExclude,
			// academic groups and plans
			academic_groups,
			loadingAcademicGroups,
			academic_plans,
			loadingAcademicPlans
		} = pageProps;

		return (
			<div className="bt-content-padded">
				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							<Segment>
								<h4>Include Alumni By Group</h4>
								<Form>
									<Form.Group>
										<Field
											type="checkbox"
											component={renderCheckbox}
											name="is_visible_all"
											label="Visible to guest and all alumni"
											disabled={loadingRecord}
										/>
									</Form.Group>
								</Form>
								<FieldArray
									loadingAccessGroups={loadingAccessGroups}
									academic_groups={academic_groups}
									loadingAcademicGroups={loadingAcademicGroups}
									academic_plans={academic_plans}
									loadingAcademicPlans={loadingAcademicPlans}
									name="access_groups"
									// validate={[validateAccessGroups]}
									component={IncludeStudentsByGroup}
								/>
							</Segment>
						</Grid.Column>
						<Grid.Column width={8}>
							<Segment>
								<h4>Include Specific Alumni</h4>
								<FieldArray
									getStudents={this.props.getStudents}
									loadingAccessStudentsInclude={loadingAccessStudentsInclude}
									search_students_include={search_students_include}
									loadingSearchStudentsInclude={loadingSearchStudentsInclude}
									name="access_students_include"
									component={IncludeSpecificStudents}
								/>
							</Segment>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8}>
							<Segment>
								<h4>Exclude Specific Alumni</h4>
								<FieldArray
									getStudents={this.props.getStudents}
									loadingAccessStudentsExclude={loadingAccessStudentsExclude}
									search_students_exclude={search_students_exclude}
									loadingSearchStudentsExclude={loadingSearchStudentsExclude}
									name="access_students_exclude"
									component={ExcludeSpecificStudent}
								/>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Button
					content="Save"
					primary
					disabled={pristine || submitting || invalid || loadingSubmit}
					onClick={handleSubmit((data) => this.onSubmit(data))}
				/>
			</div>
		);
	}
}

SegmentationPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getRecordById: PropTypes.func.isRequired,
	getAcademicGroups: PropTypes.func.isRequired,
	getAcademicPlans: PropTypes.func.isRequired,
	getAccessGroups: PropTypes.func.isRequired,
	getAccessStudents: PropTypes.func.isRequired,
	getStudents: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	resetPage: PropTypes.func.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'SegmentationPage'
	})
)(SegmentationPage);
