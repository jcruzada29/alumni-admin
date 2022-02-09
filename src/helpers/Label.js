const LabelHelper = {
	eventType(eventType) {
		switch (eventType) {
			case 'external':
				return 'External';
			case 'internal':
				return 'Internal';
			case 'none':
				return 'None';
			default:
		}
		return '';
	},
	eventPublishStatus(eventPublishStatus) {
		switch (eventPublishStatus) {
			case 'unpublished':
				return 'Unpublished';
			case 'published':
				return 'Published';
			default:
		}
		return '';
	},
	eventRequiredLogin(eventRequiredLogin) {
		switch (eventRequiredLogin) {
			case 'required':
				return 'Required';
			case 'not_required':
				return 'Not Required';
			default:
		}
		return '';
	},
	eventVisibility(eventVisibility) {
		switch (eventVisibility) {
			case 'visible':
				return 'Visible';
			case 'invisible':
				return 'Invisible';
			default:
		}
		return '';
	},
	eventWaitingList(eventWaitingList) {
		switch (eventWaitingList) {
			case 'allow':
				return 'Allow';
			case 'disallow':
				return 'Disallow';
			default:
		}
		return '';
	},
	eventShowQuota(eventShowQuota) {
		switch (eventShowQuota) {
			case 'show':
				return 'Show';
			case 'hidden':
				return 'Hidden';
			default:
		}
		return '';
	},
	eventFormFieldType(eventFormFieldType) {
		switch (eventFormFieldType) {
			case 'text':
				return 'Text';
			case 'dropdown':
				return 'Dropdown';
			default:
		}
		return '';
	},
	eventPriceGroupType(eventPriceGroupType) {
		switch (eventPriceGroupType) {
			case 'early_bird':
				return 'Early Bird';
			case 'standard':
				return 'Standard';
			default:
		}
		return '';
	},
	highlightsLocation(location) {
		switch (location) {
			case 'home':
				return 'Home Screen';
			case 'library':
				return 'Library';
			case 'facility':
				return 'Facility Booking';
			case 'parking':
				return 'Parking';
			case 'coupon':
				return 'Coupon';
			default:
				break;
		}
	},
	highlightsPublishStatus(status) {
		switch (status) {
			case 'unpublished':
				return 'Unpublished';
			case 'published':
				return 'Published';
			default:
				break;
		}
	},
	popupPublishStatus(status) {
		switch (status) {
			case 'unpublished':
				return 'Unpublished';
			case 'published':
				return 'Published';
			default:
				break;
		}
	},
	notificationStatus(status) {
		switch (status) {
			case 'pending':
				return 'Pending';
			case 'queued':
				return 'Queued';
			case 'sent':
				return 'Sent';
			case 'cancelled':
				return 'Cancelled';
			default:
				break;
		}
	},
	paymentStatus(status){
		switch (status) {
			case 'paid':
				return 'Paid';
			case 'pending':
				return 'Pending';
			case 'confirmed':
				return 'Confirmed';
			case 'refunded':
				return 'Refunded';
			case 'cancelled':
				return 'Cancelled';
			default:
				break;
		}
	},
	eventStatus(status) {
		switch (status) {
			case 'pending':
				return 'Pending';
			case 'confirmed':
				return 'Confirmed';
			case 'waiting_list':
				return 'Waiting List';
			case 'waived':
				return 'Waived';
			case 'cancelled':
				return 'Cancelled';
			default:
				break;
		}
	},
	paymentMethod(method) {
		switch (method) {
			case 'alipay':
				return 'Alipay (Web)';
			case 'alipay_hk_app':
				return 'AlipayHK (InApp)';
			case 'alipay_cn_app':
				return '支付宝 (InApp)';
			case 'wechat_pay':
				return 'WeChat Pay';
			case 'fps':
				return 'FPS';
			case 'union_pay':
				return 'Union Pay';
			case 'visa_master':
				return 'Visa / Master';
			default:
		}
		return '';
	}
};

export default LabelHelper;
