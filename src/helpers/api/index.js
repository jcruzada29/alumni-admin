import auth from './auth';
import events from './events';
import event_form_fields from './event_form_fields';
import event_price_groups from './event_price_groups';
import event_user_types from './event_user_types';
import event_notifications from './event_notifications';
import onboarding_screens from './onboarding_screens';
import assets from './assets';
import check_in_admins from './check_in_admins';
import merchants from './merchants';
import news from './news';
import news_notifications from './news_notifications';
import settings from './settings';
import parking_privileges from './parking_privileges';
import parking_notifications from './parking_notifications';
import parking_usage from './parking_usage';
import parking_admins from './parking_admins';
import coupons from './coupons';
import coupon_notifications from './coupon_notifications';
import coupon_coupons from './coupon_coupons';
import highlights from './highlights';
import highlight_notifications from './highlight_notifications';
import popups from './popups';
import push_notifications from './push_notifications';
import access_groups from './access_groups';
import access_students from './access_students';
import event_registrations from './event_registrations';
import transactions from './transactions';
// sis
import sis_academic_groups from './sis/academic_groups';
import sis_academic_plans from './sis/academic_plans';
import sis_users from './sis/users';

import user_notifications from './user_notifications';

import admins from './admins';

export default {
	auth,
	events,
	event_form_fields,
	event_price_groups,
	event_user_types,
	event_notifications,
	onboarding_screens,
	assets,
	check_in_admins,
	merchants,
	news,
	news_notifications,
	settings,
	parking_privileges,
	parking_notifications,
	parking_usage,
	parking_admins,
	coupons,
	coupon_notifications,
	coupon_coupons,
	highlights,
	highlight_notifications,
	popups,
	push_notifications,
	access_groups,
	access_students,
	event_registrations,
	transactions,
	sis: {
		academic_groups: sis_academic_groups,
		academic_plans: sis_academic_plans,
		users: sis_users
	},
	user_notifications,
	admins
};