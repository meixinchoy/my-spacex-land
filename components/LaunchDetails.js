
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import "antd/dist/antd.css";
import "../styles/Components.module.css"

const LaunchDetails = ({ data }) => {
    const [missionPatch, setMP] = useState(null);
    const [video, setVideo] = useState(null);
    const [images, setImg] = useState(null);

    const contentStyle = {
        height: '300px',
        width: '420px',
        objectFit: 'contain',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    useEffect(() => {
        if (data) {
            const dataObj = JSON.parse(data);

            if (dataObj.links.flickr_images.length > 0) {
                setImg(
                    dataObj.links.flickr_images.map((img) =>
                        <div key={img}>
                            <img src={img} style={contentStyle}></img>
                        </div>));
            }

            if (dataObj.links.mission_patch) {
                setMP(
                    <div>
                        <img src={dataObj.links.mission_patch} style={contentStyle}></img>
                    </div>);
            }

            if (dataObj.links.video_link) {
                setVideo(
                    <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + dataObj.links.video_link.substr(17)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                )
            }
            console.log(dataObj)
        }

    }, [data])

    return (<div style={{
        display: 'block', maxWidth: '95vw', minWidth: '40vw', minHeight: '35vw', padding: 30
    }}>

        <Carousel autoplay class="carousel" style={{
            width: 400, height: 350
        }}>
            {images}
            {missionPatch}
            {video}
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
    </div>
    );
}

export default LaunchDetails;