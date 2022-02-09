import React from 'react'
import {  List, Label, Header } from 'semantic-ui-react';


const MergeTagsInfo = ({ list }) => {
	// props list : { tag : '', description: '' }
	return (
		<List>
			<List.Header as="h5">
				<Header as="h5">List of merged tags: </Header>
			</List.Header>
			{list && list.map(( item, index ) => (
				<List.Item key={index}>
					<Label>{`{{${item.tag}}}`}</Label>
					{`- ${item.description}`}
				</List.Item>
			))}
		</List>
	);
}

export default MergeTagsInfo;