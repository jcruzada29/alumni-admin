import local from './environment/local';
import dev from './environment/dev';
import prod from './environment/prod';
import testing from './environment/testing';
import testing2 from './environment/testing2';
import uat from './environment/uat';
import sit from './environment/sit';

const configs = {
	local,
	dev,
	prod,
	testing,
	testing2,
	uat,
	sit
};

export default configs[process.env.NODE_ENV] || configs.local;
