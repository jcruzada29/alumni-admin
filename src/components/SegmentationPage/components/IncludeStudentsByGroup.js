import React, { useEffect } from 'react';
import _ from 'lodash';
import { Table, Icon, Form, Button } from 'semantic-ui-react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderFormSelect } from './../../../helpers/redux_form';
import OptionHelper from '../../../helpers/Option';

const handleOnAddAccessGroup = ({
	fields,
	change,
	academic_groups,
	academic_plans,
	addGradYear,
	addAcadGroup,
	addAcadPlan,
	selectedAccessGroups
}) => {
	if (
		!selectedAccessGroups
		|| (
			selectedAccessGroups
			&& selectedAccessGroups.findIndex(
				ag => ag.grad_year === addGradYear
					&& ag.acad_group.acad_group === addAcadGroup
					&& ag.acad_plan.acad_plan === addAcadPlan
			) === -1
		)
	) {
		const toAddAcadGroup = addAcadGroup === 'any'
			? { id: 'any', descr: 'Any' }
			: academic_groups.find(al => al.acad_group === addAcadGroup);

		const toAddAcadPlan = addAcadPlan === 'any'
			? { id: 'any', descr: 'Any' }
			: academic_plans.find(ap => ap.acad_plan === addAcadPlan);

		fields.push({
			grad_year: addGradYear,
			acad_group: toAddAcadGroup,
			acad_plan: toAddAcadPlan
		});

		// clear fields
		change('add_grad_year', '');
		change('add_acad_group', '');
		change('add_acad_plan', '');
	}
};

let IncludeStudentsByGroup = ({
	// redux-form props
	fields,
	change,
	initialize,
	// passed props
	loadingAccessGroups,
	academic_groups,
	loadingAcademicGroups,
	academic_plans,
	loadingAcademicPlans,
	isVisibleAll,
	addGradYear,
	addAcadGroup,
	addAcadPlan,
	selectedAccessGroups
}) => {
	// useEffect(() => {
	// 	if (!(_.isNil(addAcadGroup) || addAcadGroup === 'any')) {
	// 		change('add_acad_plan', 'any');
	// 	}
	// }, [addAcadGroup, change]);

	// const optionsAcadGroups = [{ value: 'any', text: 'Any' }]
	// 	.concat(
	// 		academic_groups.map(ag => ({
	// 			value: ag.id,
	// 			text: ag.acad_gp_full_nam
	// 		}))
	// 	);
	// const optionsAcadPlans = [{ value: 'any', text: 'Any' }]
	// 	.concat(
	// 		academic_plans
	// 			.filter(ap => {
	// 				if (_.isNil(addAcadGroup) || addAcadGroup === 'any') {
	// 					return true;
	// 				}

	// 				return ap.acad_group === addAcadGroup;
	// 			})
	// 			.map(ap => ({
	// 				value: ap.id,
	// 				text: ap.acad_plan_nam
	// 			}))
	// 	);

	// TBC
	// useEffect(() => {
	// 	if (!_.isNil(addAcadGroup)) {
	// 		change('add_acad_plan', '');
	// 	}
	// }, [addAcadGroup, change]);

	const optionsGradYear = OptionHelper.graduationYears();
	const optionsAcadGroups = OptionHelper.acadGroups(academic_groups);
	const optionsAcadPlans = OptionHelper.acadPlans(academic_plans);


	return (
		<React.Fragment>
			<Form className="content-header">
				<Form.Group>
					<Field
						component={renderFormSelect}
						style={{ width: '100%' }}
						name="add_grad_year"
						placeholder="Grad. Year"
						options={optionsGradYear}
						disabled={isVisibleAll}
						width={4}
					/>
					<Field
						component={renderFormSelect}
						style={{ width: '100%' }}
						name="add_acad_group"
						placeholder="School"
						options={optionsAcadGroups}
						disabled={isVisibleAll || loadingAccessGroups || loadingAcademicGroups}
						width={6}
					/>
					<Field
						component={renderFormSelect}
						style={{ width: '100%' }}
						name="add_acad_plan"
						placeholder="Program"
						options={optionsAcadPlans}
						disabled={isVisibleAll || loadingAccessGroups || loadingAcademicPlans}
						width={6}
					/>
					<Form.Field>
						<Button
							primary
							onClick={() => handleOnAddAccessGroup({
								fields,
								change,
								academic_groups,
								academic_plans,
								addGradYear,
								addAcadGroup,
								addAcadPlan,
								selectedAccessGroups
							})}
							content="Add"
							disabled={isVisibleAll || !addAcadGroup || !addAcadPlan || loadingAccessGroups || loadingAcademicGroups || loadingAcademicPlans}
						/>
					</Form.Field>
				</Form.Group>
			</Form>
			<Table columns={1}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Graduation Year</Table.HeaderCell>
						<Table.HeaderCell>School</Table.HeaderCell>
						<Table.HeaderCell>Program</Table.HeaderCell>
						<Table.HeaderCell>Actions</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{fields.length === 0 &&
						<Table.Row key={0}>
							<Table.Cell
								colSpan={4}
								textAlign="center"
							>No Group(s)</Table.Cell>
						</Table.Row>
					}
					{fields.map((item, index) => (
						<Table.Row key={`result-${index}`}>
							<Table.Cell width={4}>{_.startCase(fields.get(index).grad_year)}</Table.Cell>
							<Table.Cell width={5}>{fields.get(index).acad_group.descr}</Table.Cell>
							<Table.Cell width={5}>{fields.get(index).acad_plan.descr}</Table.Cell>
							<Table.Cell width={2}>
								<Icon
									link
									name="minus circle"
									size="large"
									onClick={() => fields.remove(index)}
								/>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</React.Fragment>
	);
};

// Decorate with connect to read form values
const parentSelector = formValueSelector('SegmentationPage');
const selector = formValueSelector('IncludeStudentsByGroup');
IncludeStudentsByGroup = connect(state => {
	// can select values individually
	// or together as a group
	const {
		add_grad_year,
		add_acad_group,
		add_acad_plan
	} = selector(state, 'add_grad_year', 'add_acad_group', 'add_acad_plan');
	const selectedAccessGroups = parentSelector(state, 'access_groups');
	const isVisibleAll = parentSelector(state, 'is_visible_all');
	return {
		addGradYear: add_grad_year,
		addAcadGroup: add_acad_group,
		addAcadPlan: add_acad_plan,
		selectedAccessGroups,
		isVisibleAll: isVisibleAll ? true : false
	};
})(IncludeStudentsByGroup);

export default (
	reduxForm({
		form: 'IncludeStudentsByGroup'
	})
)(IncludeStudentsByGroup);