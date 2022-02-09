module.exports = {
	tabs: [
		{ title: 'Basic', path: '/basic' },
		{ title: 'Access Control', path: '/access' },
		{ title: 'Email Notifications', path: '/notifications' },
		{ title: 'Submit Confirmation', path: '/submitconfirmation' },
		{ title: 'Cancel Confirmation', path: '/cancelconfirmation' },
		{ title: 'Reports', path: '/reports' }
	],
	status_list: [
		{ value: 'pending', text: 'Pending' },
		{ value: 'published', text: 'Published' }
	],
	email_receipients: [
		{ value: 'all_eligible_students', text: 'All Eligible Students' },
		{ value: 'students_who_have_not_completed_submission', text: 'Students who have not completed submission' },
		{ value: 'students_who_have_completed_submission', text: 'Students who have completed submission' }
	],
	page_features: [
		{ value: 'major_selection', text: 'Major Selection' },
		{ value: 'pre_enrollment', text: 'Pre-enrollment' }
	]
};
