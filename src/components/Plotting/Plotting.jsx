import React, { useState, useRef, useEffect } from 'react';
import Plot from 'react-plotly.js';

import { fetch } from '../Auth/AuthHelperMethods';
import { useMountEffect, useLogger } from '../../hooks';

import './Plotting.css';
import './VideoPlayer.css';

import Code from '../Code/Code';

import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi';
import { useStopwatch } from 'react-timer-hook';

const Plotting = ({ taskId, fromStudy, codeSnippets, pretest, test }) => {
	const [setLogs] = useLogger();
	const [startTime, setStartTime] = useState();
	const [pauseTime, setPauseTime] = useState();
	const [pauseTimeDur, setPauseTimeDur] = useState(0);
	const [offset, setOffset] = useState(0);
	const [disappearLast, setDisappearLast] = useState(0);
	const [playTimeLast, setPlayTimeLast] = useState(0);

	const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
		useStopwatch({ autoStart: false });

	const [hasStarted, setHasStarted] = useState(false);

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

	const [disappearActual, setDisappearActual] = useState(5);
	const disappearRef = useRef(disappearActual);
	disappearRef.current = disappearActual;

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
			formattedData.x.push(parseFloat(element.x));
			formattedData.y.push(parseFloat(element.y));
			formattedData.marker.size.push(
				fromStudy
					? parseInt(element.count)
					: parseInt(element.count) / 2 + 39
			);
		});
		return [formattedData];
	};

	const updateData = () => {
		let d = new Date();

		d.setSeconds(d.getSeconds() + offset);
		const time = isRunning
			? d - startTime - (pauseTimeDur || 0) + offset * 1000
			: getFullSeconds() * 1000;
		setScatter(
			formatData(
				dataRef.current.filter(
					(d) =>
						parseFloat(d.end_ms) <= time &&
						time <=
							parseFloat(d.end_ms) + disappearRef.current * 1000
				)
			)
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (isRunning) updateData();
			if (getFullSeconds() >= maxS) pause();
		}, 1e-3);
		return () => clearInterval(interval);
	}, [updateData, pauseTime, pauseTimeDur]);

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
				const minX = Math.min(...res.data.map((d) => d.x));
				const maxY = Math.max(...res.data.map((d) => d.y));

				setLayout({
					...layout,
					xaxis: { ...layout.xaxis, range: [minX, 1920] },
					yaxis: { ...layout.yaxis, range: [1080, minY] },
				});
			})
			.then(() => {
				setLoaded(true);
			});
	});

	const onPlay = () => {
		if (!hasStarted) {
			setHasStarted(true);
			setStartTime(new Date());
		}

		if (playing) {
			setPauseTime(new Date());
			pause();
			setPlaying(false);
		} else {
			setPauseTimeDur(
				(pauseTimeDur) => (new Date() - pauseTime || 0) + pauseTimeDur
			);
			updateData();
			start();
			setPlaying(true);
		}

		setLogs(!playing ? 'play' : 'pause', {
			videoTime: getFullSeconds(),
			taskId: taskId,
		});
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
		if (!startTime) return;
		setOffset(parseFloat(e.target.value));
		let d = new Date();
		d.setSeconds(d.getSeconds() + parseInt(e.target.value));
		let tmp = startTime;
		tmp.setSeconds(tmp.getSeconds() + parseInt(e.target.value));
		setStartTime(d);
		setPlaying(true);
		reset(d);
	};

	const onDissapearMouseDown = (e) => {
		setDisappearLast(disappearActual);
	};

	const onDissapearMouseUp = (e) => {
		setLogs('disappearValueChange', {
			from: disappearLast,
			to: parseFloat(e.target.value),
			taskId: taskId,
		});
	};

	const onPlayTimeMouseDown = (e) => {
		setPlayTimeLast(getFullSeconds());
	};

	const onPlayTimeMouseUp = (e) => {
		setLogs('playTimeValueChange', {
			from: playTimeLast,
			to: parseFloat(e.target.value),
			taskId: taskId,
		});
	};

	const getFullSeconds = () => {
		return hours * 3600 + minutes * 60 + seconds;
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
				{/* <Code
					pretest={pretest}
					codeSnippets={codeSnippets}
					taskId={taskId}
					help={true}
					preId="codeSectionHelp"
				/> */}
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
							{getHHMMSSFromSeconds(getFullSeconds())}
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
						value={getFullSeconds()}
						onChange={onPlayTimeChange}
						onMouseDown={onPlayTimeMouseDown}
						onMouseUp={onPlayTimeMouseUp}
					/>

					<span className="disappear">
						Eye gaze disappearance rate:
						<span className="disappearActual">
							{' '}
							{disappearActual}s
						</span>
						<span>/</span>
						<span className="disappearMax">{maxS}</span>
					</span>

					<input
						onChange={onDisappearValueChange}
						onMouseDown={onDissapearMouseDown}
						onMouseUp={onDissapearMouseUp}
						className="disappearRate"
						type="range"
						min={1}
						max={maxS}
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
