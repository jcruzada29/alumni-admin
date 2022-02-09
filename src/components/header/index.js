import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './index.scss';

import LocalStorageHelper from '../../helpers/local_storage';

class Header extends Component {
	getImageBasePath() {
		return process.env.NODE_ENV === 'local' ? '' : '/msalum/admin';
	}
	render() {
		if (this.props.compact) {
			return (
				<div className="bt-header">
					<Menu floated="right">
						<Dropdown
							item
							trigger={
								<div>
									<Icon name="user circle" /> {LocalStorageHelper.getUsername()}
								</div>
							}
						>
							<Dropdown.Menu>
								<Dropdown.Item
									icon="sign out"
									text="Logout"
									as={Link}
									to="/logout"
								/>
							</Dropdown.Menu>
						</Dropdown>
					</Menu>
				</div>
			);
		}

		return (
			<div className="bt-header">
				<Image
					className="drawer-logo"
					src={`${this.getImageBasePath()}/images/logo.png`}
				/>
			</div>
		);
	}
}

Header.propTypes = {};

const mapsStateToProps = state => ({});

const mapsDispatchToProps = dispatch => ({});

export default compose(
	connect(
		mapsStateToProps,
		mapsDispatchToProps
	)
)(Header);
