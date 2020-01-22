import {getExtremePoints, getPresentState} from "../stores/connect.mjs";
import {multiply, ToastMessage} from "../utils/index.mjs";
import Coordinate from "./coordinate.mjs";

export default class Zoom {
	constructor(store) {
		this.store = store;
		this.coordinates = new Coordinate();
		this.points = [];
		this.point = null;
		this.isTransformation = false;
		this.$zoom = document.getElementById("zoom");
		this.$zoomExtend = document.getElementById("zoomExtend");
		this.$zoomIn = document.getElementById("zoomIn");
		this.$canvas = document.getElementById("canvas");
	}

	callZoomExtend() {
		const points = getExtremePoints(this.store);
		this.zoomExtend(points);
	}

	zoomExtend(points) {
		const shapes = getPresentState(this.store);

		const x = {min: points[2], max: points[3]};
		const y = {min: points[0], max: points[1]};
		const u = {min: 0, max: this.$canvas.width};
		const v = {min: 0, max: this.$canvas.height};
		const rw = (x.max - x.min) / (y.max - y.min);
		const rv = (u.max - u.min) / (v.max - v.min);

		rw > rv
			? (v.newMax = (u.max - u.min) / rw + v.min)
			: (u.newMax = rw * (v.max - v.min) + u.min);

		let sy = 0;
		let sx = 0;

		if (rw > rv) {
			sy = (v.newMax - v.min) / (y.max - y.min);
			sx = (u.max - u.min) / (x.max - x.min);
		} else {
			sy = (v.max - v.min) / (y.max - y.min);
			sx = (u.newMax - u.min) / (x.max - x.min);
		}
		const line1 = [sx, 0, -sx * x.min];
		const line2 = [0, sy, -sy * y.min];
		const line3 = [0, 0, 1];
		if (rw > rv) {
			const line4 = [1, 0, 0];
			const line5 = [0, 1, (v.max - v.newMax) / 2];
			const line6 = [0, 0, 1];
			for (const [id, value] of Object.entries(shapes)) {
				let matrixPoints = [[], [], []];
				console.log(value.points);
				for (const point of value.points) {
					matrixPoints[0].push(point.x);
					matrixPoints[1].push(point.y);
					matrixPoints[2].push(1);
				}
				console.log(matrixPoints);
				let result = multiply([line1, line2, line3], matrixPoints);
				result = multiply([line4, line5, line6], result);
				let newPoints = [];
				for (let i = 0; i < value.points.length; i++) {
					newPoints.push({x: result[0][i]});
				}
				console.log(newPoints);
				for (let i = 0; i < value.points.length; i++) {
					newPoints[i]["y"] = result[1][i];
				}

				this.store.dispatch({type: "UPDATE", points: newPoints, id: id});
			}
		} else {
			const line4 = [1, 0, (u.max - u.newMax) / 2];
			const line5 = [0, 1, 0];
			const line6 = [0, 0, 1];
			for (const [id, value] of Object.entries(shapes)) {
				let matrixPoints = [[], [], []];
				for (const point of value.points) {
					matrixPoints[0].push(point.x);
					matrixPoints[1].push(point.y);
					matrixPoints[2].push(1);
				}
				let result = multiply([line1, line2, line3], matrixPoints);
				result = multiply([line4, line5, line6], result);
				let newPoints = [];
				for (let i = 0; i < value.points.length; i++) {
					newPoints.push({x: result[0][i]});
				}
				for (let i = 0; i < value.points.length; i++) {
					newPoints[i]["y"] = result[1][i];
				}

				this.store.dispatch({type: "UPDATE", points: newPoints, id: id});
			}
		}
	}

	message(message) {
		ToastMessage.fire({
			icon: "info",
			title: message
		});
	}

	addPoint() {
		if (this.isTransformation) {
			this.points.push(this.point);
			if (this.points.length == 2) {
				this.zoom();
			}
		}
	}

	executeZoom() {
		const shapes = getPresentState(this.store);
		this.zoomExtend(this.points);
	}

	zoom(points) {
		console.log(points);
		this.isTransformation = true;
		if (points.length === 2) {
			this.isTransformation = false;
			this.executeZoom(this.points);
		} else {
			const message = "selecione dois pontos";
			this.message(message);
		}
	}
	addEvents() {
		this.$zoomExtend.addEventListener(
			"click",
			this.callZoomExtend.bind(this),
			false
		);
		this.$zoomIn.addEventListener("click", this.zoom.bind(this), false);
		this.$canvas.addEventListener("click", this.addPoint.bind(this), false);
		this.$canvas.addEventListener(
			"mousedown",
			e => {
				this.point = this.coordinates.getMousePos(this.$canvas, e);
			},
			false
		);
		// this.$zoom.addEventListener("click", this.zoom.bind(this));
	}
}
