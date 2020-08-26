import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';



export default function PhotoWidgetCropper({setImage, imagePreview}) {
    const cropper = useRef(null);

    function cropImage() {
        if (cropper.current &&
            typeof cropper.current.getCroppedCanvas() === 'undefined')
        {
            console.log("PhotoWidghtCropper return");
            return;
        }

        console.log("PhotoWidgetCropper is working");
        cropper && 
        cropper.current && 
        cropper.current.getCroppedCanvas().toBlob((blob) => {
            setImage(blob);
        }, 'image/jpeg');
    };

    return (
        <Cropper
            ref={cropper}
            src={imagePreview}
            style={{ height: 200, width: '100%' }}
            aspectRatio={1}
            preview='.img-preview'
            guides={false}
            viewMode={1}    
            dragMode='move'
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            crop={cropImage}
        />
    )
}
