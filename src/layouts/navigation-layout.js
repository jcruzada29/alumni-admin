import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, Icon } from 'semantic-ui-react';
import Drawer from '../components/drawer';
import './index.scss';
import GeneralHelper from '../helpers/general';
import LocalStorageHelper from '../helpers/local_storage';

export class NavigationLayout extends Component {
	render() {
		const { location, history } = this.props.children.props;
		return (
			<div>
				<div className="navigation-layout-header">
					<div className="navigation-layout-header-left">
						<Image
							className="navigation-layout-header-left-logo"
							src={`${GeneralHelper.getImageBasePath()}/images/logo-white.svg`}
						/>
						<div className="navigation-layout-header-left-separator" />
						<div className="navigation-layout-header-left-product">DEVELOPMENT AND ALUMNI OFFICE</div>
					</div>
					<div className="navigation-layout-header-logout">
						<span>You are logged in as <u><b>{LocalStorageHelper.getUsername()}</b></u></span>
						<span style={{marginLeft: 10, marginRight: 10}}>|</span>
						<Link
							to="/logout"
							style={{color: 'white'}}
						>
							<Icon
								name="sign out"
								style={{ paddingRight: 4 }}
							/>
							Logout
						</Link>
					</div>
				</div>
				<div style={{ display: 'flex', minHeight: '100%' }}>
					<div style={{ flex: '0' }}>
						<Drawer
							location={location}
							history={history}
						/>
					</div>
					<div style={{ flex: '1' }}>
						<div>
							<div style={{ padding: '0px 0px 80px 0px' }}>{this.props.children}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NavigationLayout;
