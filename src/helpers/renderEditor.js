import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState , removeEditorStyles} from 'draft-js';
import MergedTagsToolBar from './MergedTagsToolBar';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class TheField extends React.Component {
	constructor(props) {
		super(props);
		const editorState = this.initEditorState(this.props.input.value);
		this.state = {
			editorState
		};
		this.changeValue(editorState);
	}
	/**
     * Initialising the value for <Editor />
     */
	initEditorState(value) {
		// const html = '<p>Your content</p>';
		const contentBlock = htmlToDraft(value);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		return EditorState.createWithContent(contentState);
	}

	/**
     * This is used by <Editor /> to handle change
     */
	handleChange(editorState) {
		this.setState({editorState});
		this.changeValue(editorState);
	}

	/**
     * This updates the redux-form wrapper
     */
	changeValue(editorState) {
		const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		this.props.input.onChange(value);
	}
	handlePastedText = (text, styles, editorState) => {
		this.setState({
		  editorState: removeEditorStyles(text, editorState)
		});
	  };
	render() {
		const { editorState } = this.state;
		const { meta: { touched, error }, mergedTagOptions, ...others } = this.props;
		return (
			<div id="react-wysiwyg">
				<Editor
					{...others}
					style={{ minHeight: 200, border: '1px solid #F1F1F1 !important' }}
					toolbarCustomButtons={ mergedTagOptions ? [<MergedTagsToolBar mergedTagOptions={mergedTagOptions} />] : [] }
					// Docs here https://jpuri.github.io/react-draft-wysiwyg/#/docs
					wrapperStyle={this.props.style}
					editorClassName="render-editor"
					editorState={editorState}
					handlePastedText={ () => this.handlePastedText}
					// wrapperClassName="wrapper-class"
					// editorClassName="editor-class"
					// toolbarClassName="toolbar-class"
					onEditorStateChange={(editorState) => this.handleChange(editorState)}
					toolbar={{
						options: ['inline', 'fontSize', 'list', 'textAlign', 'remove', 'history', 'link'],
						inline: {
							options: ['bold', 'italic', 'underline', 'strikethrough'],
							bold: { className: 'bordered-option-classname' },
							italic: { className: 'bordered-option-classname' },
							underline: { className: 'bordered-option-classname' },
							strikethrough: { className: 'bordered-option-classname' }
						//   code: { className: 'bordered-option-classname' }
						},
						fontSize: {
						  className: 'bordered-option-classname',
						  options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48]
						}
					  }}
				/>
				{touched && error && <div>{error}</div>}
			</div>
		);

	}
}


export default TheField;