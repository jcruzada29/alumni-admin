import React from 'react';
import { Menu } from 'semantic-ui-react';
import './index.scss';
export default function DetailMenu({ tabs, history }) {
	const { location } = history;
	const getActiveItem = ({ pathname }) => {
		let path_result;
		// loop and get the current active tab path based on the pathname(current)
		tabs.map(tab => {
			// Applied this since /coupons/id/coupon won't work with includes.
			// Previous: (pathname).split('?')[0].includes(tab.path.split('?')[0]) 
			if ('/' + ((pathname).split('?')[0]).split('/')[3] === tab.path.split('?')[0]) {
				path_result = tab.path;
			}
			return tab;
		});
		if (!path_result) {
			return null;
		}
		return path_result.split('?')[0];
	};

	const activeItem = getActiveItem({
		pathname: location.pathname.split('?')[0]
	}) || tabs[0].path.split('?')[0];

	return (
		<div
			style={{ overflow: 'auto' }}
			className="detail-menu"
		>
			<Menu
				pointing
				secondary
				style={{ display: 'flex', marginBottom: 5 }}
			>
				{tabs.map((tab, index) => (
					<Menu.Item
						style={{ marginLeft: 25 }}
						key={index}
						name={tab.title}
						active={activeItem === tab.path.split('?')[0]}
						onClick={
							() => activeItem === tab.path ? undefined
								: history.push(location.pathname.split('/').slice(0, -1).join('/') + tab.path)}
					/>
				))}
			</Menu>
		</div>
	);
}
