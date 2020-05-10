import React, { Component } from 'react';
import { Line } from 'rc-progress';
import { Chart } from "react-google-charts";

import { millisToMinutesAndSeconds } from '../../../lib/util';
import 'array-flat-polyfill';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class TrackDetails extends Component {
    hAxisStyle = {
        title: 'Time / MS', gridlines: { color: 'transparent' },
        titleTextStyle: { color: 'whitesmoke', italic: false, bold: true }, textStyle: { color: 'whitesmoke' }
    };
    vAxisStyle = { ...this.hAxisStyle, title: 'Loudness / dB' };

    // tempo, key, mode, time_signature, and loudness.
    mapSection = (section) => {
        let start = section.start || 0;
        let end = start + section.duration;
        let data = section.loudness;
        return [[start, data], [end, data]]
    }

    render() {
        const { track, audioFeatures, audioAnalysis } = this.props.details;
        const attributes = this.props.attributes;
        const danceability = attributes.filter(attribute => attribute.name === "danceability")[0].value;
        const energy = attributes.filter(attribute => attribute.name === "energy")[0].value;
        const tempo = attributes.filter(attribute => attribute.name === "tempo")[0].value;

        let data = null;
        if (audioAnalysis && audioAnalysis.sections) { data = audioAnalysis.sections.map(section => this.mapSection(section)).flat() }

        return (
            <div className="trackdetails">
                <span className="temp-titlespan">Track info</span>
                <table>
                    <tbody>
                        <tr><th>Title</th><td>{track.name}</td></tr>
                        <tr><th>Artists</th><td>{track.artists.map(artist => artist.name).join(", ")}</td></tr>
                        <tr><th>Album</th><td>{track.album.name}</td></tr>
                        <tr><th><FontAwesomeIcon icon={faClock} /></th><td>{millisToMinutesAndSeconds(track.duration_ms)}</td></tr>
                        <tr><th><FontAwesomeIcon icon={faThumbsUp} /></th><td>{track.popularity}%</td></tr>
                        <tr><th>Explicit</th><td>{track.explicit ? "Explicit lyrics" : "No explicit lyrics"}</td></tr>
                    </tbody>
                </table>
                <span className="temp-titlespan">Track attributes</span>

                <div className="attributes">
                    <div className="attribute">
                        <span>Danceability: </span>
                        <Line percent={audioFeatures.danceability * 100} strokeWidth="6" strokeColor="#1db954" trailWidth="0" trailColor="grey" />
                        <Line percent={danceability * 100} strokeWidth="6" strokeColor="#f59542" trailWidth="0" trailColor="grey" />
                    </div>
                    <div className="attribute">
                        <span>Energy:</span>
                        <Line percent={audioFeatures.energy * 100} strokeWidth="6" strokeColor="#1db954" trailWidth="0" trailColor="grey" />
                        <Line percent={energy * 100} strokeWidth="6" strokeColor="#f59542" trailWidth="0" trailColor="grey" />
                    </div>
                    <div className="attribute">
                        <span>Tempo: {Math.round(audioFeatures.tempo)} bpm</span>
                        <Line percent={(audioFeatures.tempo - 80) / .80} strokeWidth="6" strokeColor="#1db954" trailWidth="0" trailColor="grey" />
                        <Line percent={(tempo - 80) / .80} strokeWidth="6" strokeColor="#f59542" trailWidth="0" trailColor="grey" />
                    </div>
                </div>
                {
                    data &&
                    <div className="analysis">
                        <Chart
                            width={'100%'}
                            height={'auto'}
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                [
                                    { type: 'number', label: 'x' },
                                    { type: 'number', label: 'values' },

                                ],
                                ...data
                            ]}
                            options={{
                                title: 'Loudness evolution',
                                titleTextStyle: {
                                    color: "whitesmoke",    // any HTML string color ('red', '#cc00cc')
                                    fontName: "'Nunito', sans-serif", // i.e. 'Times New Roman'
                                    fontSize: 24, // 12, 18 whatever you want (don't specify px)
                                    bold: false,    // true or false
                                    italic: false   // true of false
                                },
                                hAxis: this.hAxisStyle,
                                vAxis: this.vAxisStyle,
                                curveType: 'function',
                                series: [{ color: '#1db954' }],
                                intervals: { style: 'line' },
                                legend: 'none',
                                backgroundColor: "#181818",
                            }}
                            rootProps={{ 'data-testid': '3' }}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default TrackDetails;
