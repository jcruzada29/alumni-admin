import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Header, Divider } from 'semantic-ui-react';
import './index.scss';

export class Drawer extends Component {
	getActiveItem({ pathname, search }) {
		// const { query } = URLParse(search, true);
		switch (true) {
			case /^\/events/.test(pathname):
				return 'events';
			case /^\/check-in/.test(pathname):
				return 'check-in';
			case /^\/onboarding-screens/.test(pathname):
				return 'onboarding-screens';
			case /\/merchants/.test(pathname):
				return 'merchants';
			case /^\/news/.test(pathname):
				return 'news';
			case /^\/users/.test(pathname):
				return 'users';
			case /^\/admins/.test(pathname):
				return 'admins';
			case /^\/settings/.test(pathname):
				return 'settings';
			case /^\/parking-privileges/.test(pathname):
				return 'parking-privileges';
			case /^\/parking-admins/.test(pathname):
				return 'parking-admins';
			case /^\/coupons/.test(pathname):
				return 'coupons';
			case /^\/highlights/.test(pathname):
				return 'highlights';
			case /^\/popups/.test(pathname):
				return 'popups';
			case /^\/push-notifications/.test(pathname):
				return 'push-notifications';
			default:
				return 'events';
		}
	}
	getImageBasePath() {
		return process.env.NODE_ENV === 'local' ? '' : '/msalum/admin';
	}
	render() {
		const activeItem = this.getActiveItem({
			pathname: this.props.location.pathname,
			search: this.props.location.search
		});

		return (
			<div className="drawer-container">
				<Menu
					fluid
					secondary
					vertical
					className="bt-drawer"
					style={{ margin: 0 }}
				>
					<center style={{ paddingTop: 23, fontSize: 17 }}><Header as="h5">Alumni App (Admin)</Header></center>
					<Divider />
					<Menu.Item>
						<Menu.Header>
							<Icon
								name="users"
								className="bt-drawer-header-icon"
							/>
							Events
						</Menu.Header>
						<Menu.Menu>
							<Menu.Item
								name="events"
								active={activeItem === 'events'}
								onClick={this.handleItemClick}
								as={Link}
								to="/events"
							>
								Events
							</Menu.Item>
							<Menu.Item
								name="check-in"
								active={activeItem === 'check-in'}
								onClick={this.handleItemClick}
								as={Link}
								to="/check-in"
							>
								Check-in App Admin
							</Menu.Item>
						</Menu.Menu>
					</Menu.Item>

					<Menu.Item>
						<Menu.Header>
							<Icon
								name="bookmark"
								className="bt-drawer-header-icon"
							/>
							Coupons
						</Menu.Header>
						<Menu.Menu>
							<Menu.Item
								name="coupons"
								active={activeItem === 'coupons'}
								onClick={this.handleItemClick}
								as={Link}
								to="/coupons"
							>
								Coupons
							</Menu.Item>
							<Menu.Item
								name="merchants"
								active={activeItem === 'merchants'}
								onClick={this.handleItemClick}
								as={Link}
								to="/merchants"
							>
								Merchants
							</Menu.Item>
						</Menu.Menu>
					</Menu.Item>

					<Menu.Item>
						<Menu.Header>
							<Icon
								name="car"
								className="bt-drawer-header-icon"
							/>
							Parking
						</Menu.Header>
						<Menu.Menu>
							<Menu.Item
								name="parking-privileges"
								active={activeItem === 'parking-privileges'}
								onClick={this.handleItemClick}
								as={Link}
								to="/parking-privileges"
							>
								Parking Privileges
							</Menu.Item>
							<Menu.Item
								name="parking-admins"
								active={activeItem === 'parking-admins'}
								onClick={this.handleItemClick}
								as={Link}
								to="/parking-admins"
							>
								Parking App Admins
							</Menu.Item>
						</Menu.Menu>
					</Menu.Item>

					<Menu.Item>
						<Menu.Header>
							<Icon
								name="bell"
								className="bt-drawer-header-icon"
							/>
							Information
						</Menu.Header>
						<Menu.Menu>
							<Menu.Item
								name="download"
								active={activeItem === 'onboarding-screens'}
								onClick={this.handleItemClick}
								as={Link}
								to="/onboarding-screens"
							>
								Onboarding Screen
							</Menu.Item>
							<Menu.Item
								name="download"
								active={activeItem === 'highlights'}
								onClick={this.handleItemClick}
								as={Link}
								to="/highlights"
							>
								Highlights
							</Menu.Item>
							<Menu.Item
								name="news"
								active={activeItem === 'news'}
								onClick={this.handleItemClick}
								as={Link}
								to="/news"
							>
								News
							</Menu.Item>
							<Menu.Item
								name="popups"
								active={activeItem === 'popups'}
								onClick={this.handleItemClick}
								as={Link}
								to="/popups"
							>
								Popups
							</Menu.Item>
							<Menu.Item
								name="push-notifications"
								active={activeItem === 'push-notifications'}
								onClick={this.handleItemClick}
								as={Link}
								to="/push-notifications"
							>
								Push Notifications
							</Menu.Item>
						</Menu.Menu>
					</Menu.Item>
					<Menu.Item>
						<Menu.Header>
							<Icon
								name="address card"
								className="bt-drawer-header-icon"
							/>
							Users
						</Menu.Header>
						<Menu.Menu>
							<Menu.Item
								name="users"
								active={activeItem === 'users'}
								onClick={this.handleItemClick}
								as={Link}
								to="/users"
							>
								Alumni
							</Menu.Item>
							<Menu.Item
								name="admins"
								active={activeItem === 'admins'}
								onClick={this.handleItemClick}
								as={Link}
								to="/admins"
							>
								Admins
							</Menu.Item>
						</Menu.Menu>
					</Menu.Item>
					<Menu.Item>
						<Menu.Header>
							<Icon
								name="cog"
								className="bt-drawer-header-icon"
							/>
							Settings
						</Menu.Header>
						<Menu.Menu>
							<Menu.Item
								name="settings"
								active={activeItem === 'settings'}
								onClick={this.handleItemClick}
								as={Link}
								to="/settings"
							>
								General
							</Menu.Item>
						</Menu.Menu>
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

export default Drawer;
