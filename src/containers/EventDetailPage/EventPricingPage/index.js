import { connect } from 'react-redux';
import EventPricingPage from './EventPricingPage';
import {
	getEventPriceGroups,
	getEventPriceGroupById,
	getEventUserTypes,
	onSubmit,
	onDeleteEventPriceGroupById,
	setnNullSelectedEventPriceGroup,
	resetMeta,
	reset
} from '../../../actions/EventDetailPage/EventPricingPage';

const mapsStateToProps = state => ({
	pageProps: state.eventDetailPage.eventPricingPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEventPriceGroups: options => dispatch(getEventPriceGroups(options)),
	getEventPriceGroupById: id => dispatch(getEventPriceGroupById(id)),
	getEventUserTypes: options => dispatch(getEventUserTypes(options)),
	onSubmit: fields => dispatch(onSubmit(fields)),
	onDeleteEventPriceGroupById: id => dispatch(onDeleteEventPriceGroupById(id)),
	setnNullSelectedEventPriceGroup: () => dispatch(setnNullSelectedEventPriceGroup()),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EventPricingPage);

