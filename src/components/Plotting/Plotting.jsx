import React, { useState, useRef } from 'react';
import Plot from 'react-plotly.js';

import { fetch } from '../Auth/AuthHelperMethods';
import { useMountEffect } from '../../hooks';

import './Plotting.css';
import './VideoPlayer.css';

import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi';

const Plotting = ({ taskId, fromStudy }) => {
	const [data, setData] = useState([]);
	const dataRef = useRef(data);

	const [scatter, setScatter] = useState();

	const [layout, setLayout] = useState({
		xaxis: {
			showgrid: false,
			showline: false,
			showticklabels: false,
			zeroline: false,
		},
		yaxis: {
			showgrid: false,
			showline: false,
			showticklabels: false,
			zeroline: false,
		},
		autosize: true,
		margin: {
			l: 0,
			r: 0,
			b: 0,
			t: 0,
			pad: 0,
		},
		paper_bgcolor: 'rgba(0,0,0,0)',
		plot_bgcolor: 'rgba(0,0,0,0)',
	});

	const [loaded, setLoaded] = useState(false);

	const [playing, setPlaying] = useState(false);

	const [disappearActual, setDisappearActual] = useState(2);
	const disappearRef = useRef(disappearActual);
	disappearRef.current = disappearActual;

	const [currTime, setCurrTime] = useState(0);
	const currTimeRef = useRef(currTime);
	currTimeRef.current = currTime;

	const [ms, setMs] = useState(0);
	const msRef = useRef(ms);
	msRef.current = ms;

	const [msTimer] = useState(
		new Timer(() => {
			setMs((ms) => ms + 10);
			updateData();
		}, 1e-3)
	);

	const [sTimer] = useState(
		new Timer(() => {
			setCurrTime((currTime) => currTime + 1);
		}, 1000)
	);

	const [maxS, setMaxS] = useState(0);
	const maxSRef = useRef(maxS);
	maxSRef.current = maxS;

	const formatData = (data) => {
		let formattedData = {
			x: [],
			y: [],
			type: 'scatter',
			mode: 'lines+markers',
			marker: { color: 'rgba(255, 0, 0 .5)', size: [] },
		};

		data.forEach((element) => {
			formattedData.x.push(parseInt(element.x));
			formattedData.y.push(parseInt(element.y));
			formattedData.marker.size.push(
				fromStudy
					? parseInt(element.count)
					: parseInt(element.count) / 2 + 39
			);
		});
		return [formattedData];
	};

	const updateData = () => {
		setScatter(
			formatData(
				dataRef.current.filter(
					(d) =>
						parseFloat(d.end_ms) <= msRef.current &&
						msRef.current <=
							parseFloat(d.end_ms) + disappearRef.current * 1000
				)
			)
		);
	};

	useMountEffect(() => {
		fetch('get', '/data/' + (taskId || '1'))
			.then((res) => {
				setData(res.data);
				dataRef.current = res.data;
				updateData(res.data);
				setMaxS(
					Math.ceil(
						Math.max(...res.data.map((d) => parseFloat(d.end_s)))
					)
				);

				const minY = Math.min(...res.data.map((d) => d.y));

				setLayout({
					...layout,
					xaxis: { ...layout.xaxis, range: [0, 1920] },
					yaxis: { ...layout.yaxis, range: [1080, minY] },
				});
			})
			.then(() => {
				setLoaded(true);
			});
	});

	function Timer(callback, delay) {
		var timerId,
			start,
			remaining = delay;

		var pause = function () {
			clearTimeout(timerId);
			remaining -= new Date() - start;
		};

		var resume = function () {
			start = new Date();
			timerId = setTimeout(function () {
				remaining = delay;
				resume();
				callback();
			}, remaining);
			if (currTimeRef.current >= maxSRef.current - 1) {
				pause();
				setPlaying(false);
			}
		};

		this.resume = resume;
		this.pause = pause;

		this.pause();
	}

	const pauseTimers = () => {
		sTimer.pause();
		msTimer.pause();
		setPlaying(false);
	};

	const resumeTimers = () => {
		sTimer.resume();
		msTimer.resume();
		setPlaying(true);
	};

	const onPlay = () => {
		if (playing) {
			pauseTimers();
		} else {
			updateData();
			resumeTimers();
		}
	};

	const onDisappearValueChange = (e) => {
		setDisappearActual(e.target.value);
		updateData();
	};

	function getHHMMSSFromSeconds(totalSeconds) {
		if (!totalSeconds) {
			return '00:00:00';
		}
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		const hhmmss =
			padTo2(hours) + ':' + padTo2(minutes) + ':' + padTo2(seconds);
		return hhmmss;
	}

	function padTo2(value) {
		if (!value) {
			return '00';
		}
		return value < 10 ? String(value).padStart(2, '0') : value;
	}

	const onPlayTimeChange = (e) => {
		setCurrTime(parseInt(e.target.value));
		setMs(parseInt(e.target.value) * 1000);
		updateData();
		resumeTimers();
	};

	return (
		loaded && (
			<div id="bg">
				<img
					src={require('./assets/images/Task' +
						(taskId || '1') +
						'_no_path.png')}
					alt="Code background"
					id="backgroundImg"
				/>
				<div id="scanpathOverlay">
					<Plot
						data={scatter}
						layout={layout}
						config={{ staticPlot: true, responsive: true }}
						useResizeHandler={true}
						style={{ height: '100%', width: '100%', margin: 0 }}
					/>
				</div>
				<div id="videoControls">
					<span onClick={onPlay} style={{ cursor: 'pointer' }}>
						{!playing ? (
							<BiPlayCircle
								style={{ height: '2rem', width: '2rem' }}
							/>
						) : (
							<BiPauseCircle
								style={{ height: '2rem', width: '2rem' }}
							/>
						)}
					</span>
					<span className="time">
						<span className="video_time">
							{getHHMMSSFromSeconds(currTime)}
						</span>
						<span>/</span>
						<span className="video_length">
							{getHHMMSSFromSeconds(maxS)}
						</span>
					</span>

					<input
						type="range"
						className="time_range"
						step={0.1}
						min={0}
						max={maxS}
						value={currTime}
						onChange={onPlayTimeChange}
					/>

					<span className="disappear">
						Eye gaze disappearance rate:
						<span className="disappearActual">
							{' '}
							{disappearActual}s
						</span>
						<span>/</span>
						<span className="disappearMax">60s</span>
					</span>

					<input
						onChange={onDisappearValueChange}
						className="disappearRate"
						type="range"
						min={1}
						max={60}
						step={1}
						style={{ width: '5rem' }}
						value={disappearActual}
					/>
				</div>
			</div>
		)
	);
};

export default Plotting;
