
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import "antd/dist/antd.css";
import "../styles/Components.module.css"

const LaunchDetails = ({ data }) => {
    const [missionPatch, setMP] = useState(null);
    const [video, setVideo] = useState(null);
    const [images, setImg] = useState(null);
    const [title, setTitle] = useState(null);
    const [launchDate, setLaunchDate] = useState(null);
    const [launchSite, setLaunchSite] = useState("-");
    const [launchStatus, setLaunchStatus] = useState("unsuccessful");
    const [rocketName, setRocketName] = useState("-");
    const [rocketType, setRocketType] = useState("-");
    const [details, setDetails] = useState(null);

    const contentStyle = {
        height: '300px',
        width: '500px',
        objectFit: 'contain',
        background: '#364d79'
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
                    <iframe height='300' width='500' src={"https://www.youtube.com/embed/" + dataObj.links.video_link.substr(17)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                )
            }

            if (dataObj.launch_site && dataObj.launch_site.site_name) {
                setLaunchSite(dataObj.launch_site.site_name);
            }

            if (dataObj.launch_success) {
                setLaunchStatus("Success");
            }

            if (dataObj.rocket) {
                if (dataObj.rocket.rocket_name)
                    setRocketName(dataObj.rocket.rocket_name);

                if (dataObj.rocket.rocket_type)
                    setRocketType(dataObj.rocket.rocket_type);
            }

            setDetails(dataObj.details);
            setTitle(dataObj.mission_name);
            setLaunchDate(new Date(dataObj.launch_date_local).toLocaleDateString("en-US"));

            console.log(dataObj)
        }

    }, [data])

    return (
        <div class="launchDetails">
            <h1>{title}</h1>
            <Carousel autoplay class="carousel" style={{
                width: 500, height: 300, marginTop: 10, marginBottom: 15
            }}>
                {images}
                {missionPatch}
                {video}
            </Carousel>
            <h3>Launch date: {launchDate}</h3>
            <h3>Launch site: {launchSite}</h3>
            <h3>Launch status: {launchStatus}</h3>
            <h3>Rocket name: {rocketName}</h3>
            <h3>Rocket type: {rocketType}</h3>
            {details&&<h3>Additional Details:</h3>}
            <p class="wrapword" style={{ width: 500 }}>{details}</p>
        </div>
    );
}

export default LaunchDetails;