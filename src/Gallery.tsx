import React from 'react';
import './Gallery.css';

function Gallery() {
    //const base = 'https://superflaco.com/cam/duck/';
    const [image, setImage] = React.useState('');
    const emptyThumbs: string[] = [];
    const [thumbs, setThumbs] = React.useState(emptyThumbs);
    React.useEffect( () => {
        RequestThumbs(setThumbs, setImage);
    },[]) ;


return (
    <div className="gallery" >
        <div className="thumbnails">
            { thumbs.map(imageName => (
                <Thumbnail imageName={imageName} setPreviewImage={setImage} key={imageName} />
            ))}
        </div>
        <br/>
        <div className="preview">
            <img src={image} alt={image} />
        </div>
    </div>);
}



function Thumbnail(props: {imageName: string, setPreviewImage: Function}) {
    return (
        <img onClick={() => props.setPreviewImage(props.imageName)} src={'thumbs/' +props.imageName} alt={props.imageName} />
    );
}

function RequestThumbs (setThumbs: Function, setPreviewImage: Function) {
    let loader = new XMLHttpRequest();
    loader.addEventListener('load', LoadThumbs);
    loader.open('GET',   'thumbs/');
    loader.responseType = 'document';
    loader.send();


    function LoadThumbs(this: XMLHttpRequest) {
        if  (this.responseXML) {
            let links = document.evaluate('//a//text()', this.responseXML)
            let link = links.iterateNext();
            let thumbnails: Array<string> = [];
            while (link) {
                const imageName = link?.textContent
                if (imageName && imageName !== '../') {
                    thumbnails.push(imageName);
                }
                link = links.iterateNext();
            }
            setThumbs(thumbnails)
            setPreviewImage(thumbnails[0])
        }
    }
}

export default Gallery;