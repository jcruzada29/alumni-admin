import _ from 'lodash';

const GeneralHelper = {
	queryStringToObject(queryString) {
		if (!queryString || !_.isString(queryString)) {
			return {};
		}
		if (queryString.indexOf('?') === 0) {
			queryString = queryString.substring(1);
		}
		try {
			return JSON.parse(
				'{"' +
				decodeURI(queryString)
					.replace(/"/g, '\\"')
					.replace(/&/g, '","')
					.replace(/=/g, '":"') +
				'"}'
			);
		} catch (e) { }
		return {};
	},
	isEmailValid(email) {
		const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailRegex.test(email);
	},
	isUstEmail(email) {
		if (!email || !GeneralHelper.isEmailValid(email)) {
			return false;
		}
		return _.endsWith(email, '@ust.hk') || _.endsWith(email, '.ust.hk');
	},
	getImageBasePath() {
		let path = '/msalum/admin';

		if (process.env.NODE_ENV === 'local') {
			path = '';
		}

		return path;
	}
};

export default GeneralHelper;
