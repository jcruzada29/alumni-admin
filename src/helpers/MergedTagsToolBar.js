import React, { Component } from 'react';
import { EditorState, Modifier } from 'draft-js';

class MergedTagsToolBar extends Component {
	state = {
		open: false
	}

  	openMergedTagsDropdown = () => this.setState({open: !this.state.open})

	addMergedTag = (tag) => {
		const { editorState, onChange } = this.props;
		const contentState = Modifier.replaceText(
			editorState.getCurrentContent(),
			editorState.getSelection(),
			tag,
			editorState.getCurrentInlineStyle(),
		);
		onChange(EditorState.push(editorState, contentState, 'insert-characters'));
	}

	listItem = this.props.mergedTagOptions.length > 0 && this.props.mergedTagOptions.map((item, index) => (
		<li
			onClick={this.addMergedTag.bind(this, item.value)}
			key={index}
			className="rdw-dropdownoption-default editor-merged-tag-li"
		>{item.text}</li>
	))

	render() {
		return (
			<div onClick={ this.openMergedTagsDropdown} className="rdw-block-wrapper" aria-label="rdw-block-control">
				<div className="rdw-dropdown-wrapper rdw-block-dropdown custom-toolbar" aria-label="rdw-dropdown">
					<div className="rdw-dropdown-selectedtext" title="Merged Tags">
						<span>Merged Tags</span>
						<div className={`rdw-dropdown-caretto${this.state.open ? "close": "open"}`}></div>
					</div>
					<ul className={`rdw-dropdown-optionwrapper ${this.state.open ? "": "editor-merged-tag-ul"}`}>
						{this.listItem}
					</ul>
				</div>
			</div>
		);
	}
}

export default MergedTagsToolBar;