import React from 'react';
import { useDropzone } from 'react-dropzone';

function Dropzone(props) {
	const { acceptedFiles, getRootProps, getInputProps} = useDropzone({
		accept: '.jpeg,.jpg,.png'
	  });
	return (
		<section>
			<div  
				{...getRootProps({ className: 'dropzone-container'})} 
				style={{ margin: 10, padding: 20, textAlign: 'center', border: '1px solid rgba(34,36,38,0.1)' }}
			>
				<input {...getInputProps()} />
				<p>Click / Drag and drop your JPG image here. <br></br>(Recommended size 1080px x1920px)</p>
			</div>
		</section>
	);
}

export default Dropzone;