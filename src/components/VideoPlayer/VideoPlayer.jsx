import { React, useState } from 'react';
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi';

// import './VideoPlayer.css';

const VideoPlayer = (props) => {
	const [playing, setPlaying] = useState(false);
	const [disappearActual, setDisappearActual] = useState(10);
	const [currTime, setCurrTime] = useState(0);
	const [setMs] = useState(0);
	const [msTimer] = useState(
		new Timer(() => {
			setMs((ms) => ms + 1);
		}, 1)
	);

	const [sTimer] = useState(
		new Timer(() => {
			setCurrTime((currTime) => currTime + 1);
		}, 1000)
	);

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
		};

		this.resume = resume;
		this.pause = pause;

		this.pause();
	}

	const pauseTimers = () => {
		sTimer.pause();
		msTimer.pause();
	};

	const resumeTimers = () => {
		sTimer.resume();
		msTimer.resume();
	};

	const onPlay = () => {
		if (playing) {
			pauseTimers();
		} else {
			resumeTimers();
		}
		setPlaying(!playing);
	};

	const onDisappearValueChange = (e) => {
		setDisappearActual(e.target.value);
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

	return (
		<div id="videoControls">
			<span onClick={onPlay} style={{ cursor: 'pointer' }}>
				{!playing ? (
					<BiPlayCircle style={{ height: '2rem', width: '2rem' }} />
				) : (
					<BiPauseCircle style={{ height: '2rem', width: '2rem' }} />
				)}
			</span>
			<span className="time">
				<span className="video_time">
					{getHHMMSSFromSeconds(currTime)}
				</span>
				<span>/</span>
				<span className="video_length">00:10</span>
			</span>

			<input
				type="range"
				className="time_range"
				step={0.1}
				min={0}
				max={60}
				defaultValue={currTime}
			/>

			<span className="disappear">
				Eye gaze disappearance rate:
				<span className="disappearActual"> {disappearActual}s</span>
				<span>/</span>
				<span className="disappearMax">60s</span>
			</span>

			<input
				onChange={onDisappearValueChange}
				className="disappearRate"
				type="range"
				min={0}
				max={60}
				step={1}
				style={{ width: '5rem' }}
			/>
		</div>
	);
};

export default VideoPlayer;
