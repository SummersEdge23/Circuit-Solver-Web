'use strict';
class GraphWindow {
	public bounds: RectF;
	public inner_bounds: RectF;
	public X_AXIS_LENGTH: number;
	public Y_AXIS_LENGTH: number;
	public RATIO: number;
	public readonly SCOPE_0_INDEX: number;
	public readonly SCOPE_1_INDEX: number;
	public readonly SCOPE_2_INDEX: number;
	public PADDING: number;
	public BUTTON_WIDTH_RATIO: number;
	public BUTTON_HEIGHT_RATIO: number;
	public line_paint: Paint;
	public bounds_paint: Paint;
	public fill_paint: Paint;
	public text_paint: Paint;
	public hover_paint: Paint;
	public graph_text_a_paint: Paint;
	public graph_text_b_paint: Paint;
	public graph_text_c_paint: Paint;
	public x_axis: Array<PointF>;
	public y_axis: Array<PointF>;
	public graph_trace_a: Trace;
	public graph_trace_b: Trace;
	public graph_trace_c: Trace;
	public meter_hover_index: number;
	public time_axis_value: string;
	public time_tag: string;
	public download_button: Button;
	public first_touch_x: number;
	public first_touch_y: number;
	public line_buffer: Array<Array<number>>;
	public trim: number;
	public width: number;
	public height: number;
	constructor() {
		this.bounds = new RectF(0, 0, 0, 0);
		this.inner_bounds = new RectF(0, 0, 0, 0);
		this.X_AXIS_LENGTH = 1200;
		this.Y_AXIS_LENGTH = 100;
		this.RATIO = 0.75;
		this.SCOPE_0_INDEX = 0;
		this.SCOPE_1_INDEX = 1;
		this.SCOPE_2_INDEX = 2;
		this.bounds.left = view_port.left;
		this.bounds.right = view_port.right;
		this.bounds.top = menu_bar.graph_button.bottom + 2 * global.CANVAS_STROKE_WIDTH_3;
		this.bounds.bottom = view_port.bottom;
		this.width = 1;
		this.height = 1;
		this.trim = 1;
		this.PADDING = global.CANVAS_STROKE_WIDTH_5;
		if (global.MOBILE_MODE) {
			this.BUTTON_WIDTH_RATIO = 0.12;
			this.BUTTON_HEIGHT_RATIO = 0.08;
		} else {
			this.BUTTON_WIDTH_RATIO = 0.085;
			this.BUTTON_HEIGHT_RATIO = 0.05;
		}
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		this.bounds_paint = new Paint();
		this.bounds_paint.set_paint_style(this.bounds_paint.style.FILL);
		this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
		this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
		this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.bounds_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.bounds_paint.set_font(global.DEFAULT_FONT);
		this.bounds_paint.set_alpha(255);
		this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
		this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
		this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
		this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.fill_paint.set_color(global.GRAPH_AREA_COLOR);
		this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.fill_paint.set_font(global.DEFAULT_FONT);
		this.fill_paint.set_alpha(255);
		this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.text_paint.style.FILL);
		this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.text_paint.join.MITER);
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.text_paint.set_color(global.GENERAL_RED_COLOR);
		if (global.MOBILE_MODE) {
			this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		} else {
			this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		}
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.text_paint.align.LEFT);
		this.hover_paint = new Paint();
		this.hover_paint.set_paint_style(this.hover_paint.style.FILL);
		this.hover_paint.set_paint_cap(this.hover_paint.cap.ROUND);
		this.hover_paint.set_paint_join(this.hover_paint.join.MITER);
		this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
		this.hover_paint.set_color(global.GENERAL_HOVER_COLOR);
		this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.hover_paint.set_font(global.DEFAULT_FONT);
		this.hover_paint.set_alpha(255);
		this.hover_paint.set_paint_align(this.hover_paint.align.CENTER);
		this.graph_text_a_paint = new Paint();
		this.graph_text_a_paint.set_paint_style(this.graph_text_a_paint.style.FILL);
		this.graph_text_a_paint.set_paint_cap(this.graph_text_a_paint.cap.ROUND);
		this.graph_text_a_paint.set_paint_join(this.graph_text_a_paint.join.MITER);
		this.graph_text_a_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.graph_text_a_paint.set_color(global.TRACE_I_COLOR);
		this.graph_text_a_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.graph_text_a_paint.set_font(global.DEFAULT_FONT);
		this.graph_text_a_paint.set_alpha(255);
		this.graph_text_a_paint.set_paint_align(this.graph_text_a_paint.align.LEFT);
		this.graph_text_b_paint = new Paint();
		this.graph_text_b_paint.set_paint_style(this.graph_text_b_paint.style.FILL);
		this.graph_text_b_paint.set_paint_cap(this.graph_text_b_paint.cap.ROUND);
		this.graph_text_b_paint.set_paint_join(this.graph_text_b_paint.join.MITER);
		this.graph_text_b_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.graph_text_b_paint.set_color(global.TRACE_II_COLOR);
		this.graph_text_b_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.graph_text_b_paint.set_font(global.DEFAULT_FONT);
		this.graph_text_b_paint.set_alpha(255);
		this.graph_text_b_paint.set_paint_align(this.graph_text_b_paint.align.LEFT);
		this.graph_text_c_paint = new Paint();
		this.graph_text_c_paint.set_paint_style(this.graph_text_c_paint.style.FILL);
		this.graph_text_c_paint.set_paint_cap(this.graph_text_c_paint.cap.ROUND);
		this.graph_text_c_paint.set_paint_join(this.graph_text_c_paint.join.MITER);
		this.graph_text_c_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.graph_text_c_paint.set_color(global.TRACE_III_COLOR);
		this.graph_text_c_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.graph_text_c_paint.set_font(global.DEFAULT_FONT);
		this.graph_text_c_paint.set_alpha(255);
		this.graph_text_c_paint.set_paint_align(this.graph_text_c_paint.align.LEFT);
		this.x_axis = new Array(this.X_AXIS_LENGTH).fill(new PointF(0, 0));
		this.y_axis = new Array(this.Y_AXIS_LENGTH).fill(new PointF(0, 0));
		this.graph_trace_a = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
		this.graph_trace_a.set_color(global.TRACE_I_COLOR);
		this.graph_trace_b = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
		this.graph_trace_b.set_color(global.TRACE_II_COLOR);
		this.graph_trace_c = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
		this.graph_trace_c.set_color(global.TRACE_III_COLOR);
		this.meter_hover_index = -1;
		this.time_axis_value = '';
		this.time_tag = '';
		this.load_axis();
		let padding: number = 0.0125 * this.bounds.get_width();
		if (global.MOBILE_MODE) {
			padding = 0.00875 * this.bounds.get_width();
		}
		let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
		let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
		this.download_button = new Button(this.inner_bounds.right - width, this.inner_bounds.top + padding, this.inner_bounds.right - padding, this.inner_bounds.top + padding + height);
		this.download_button.text = 'CSV';
		this.download_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.download_button.fill_paint.set_color(global.GENERAL_BOUNDS_COLOR);
		this.download_button.fill_paint.set_alpha(255);
		this.download_button.draw_stroke = false;
		this.download_button.draw_fill = true;
		this.first_touch_x = 0;
		this.first_touch_y = 0;
		this.line_buffer = [];
	}
	load_axis(): void {
		this.x_axis = new Array(this.X_AXIS_LENGTH).fill(new PointF(0, 0));
		this.y_axis = new Array(this.Y_AXIS_LENGTH).fill(new PointF(0, 0));
		let left: number = this.bounds.left + this.PADDING;
		let top: number = this.bounds.top + 2 * this.PADDING;
		let right: number = this.bounds.right - this.PADDING;
		let bottom: number = this.bounds.bottom - this.PADDING;
		this.inner_bounds = new RectF(left, top, right, bottom);
		this.trim = (this.bounds.get_width() - this.inner_bounds.get_width()) * 0.5;
		this.width = this.inner_bounds.get_width();
		this.height = this.inner_bounds.get_height();
		this.graph_trace_a.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
		this.graph_trace_b.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
		this.graph_trace_c.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
		for (var i: number = 0; i < this.X_AXIS_LENGTH >> 1; i++) {
			this.x_axis[i] = new PointF(left + (this.width / (this.x_axis.length >> 1)) * i, top);
			this.x_axis[i + (this.x_axis.length >> 1)] = new PointF(left + (this.width / (this.x_axis.length >> 1)) * i, bottom);
			if (i < this.y_axis.length * 0.5) {
				this.y_axis[i] = new PointF(left, top + (this.height / (this.y_axis.length * 0.5)) * i);
				this.y_axis[i + this.y_axis.length * 0.5] = new PointF(right, top + (this.height / (this.y_axis.length * 0.5)) * i);
			}
		}
	}
	resize_window(): void {
		this.PADDING = global.CANVAS_STROKE_WIDTH_5;
		this.bounds.left = view_port.left;
		this.bounds.right = view_port.right;
		this.bounds.top = menu_bar.graph_button.bottom + 2 * global.CANVAS_STROKE_WIDTH_3;
		this.bounds.bottom = view_port.bottom;
		this.load_axis();
		this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		if (global.MOBILE_MODE) {
			this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		} else {
			this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		}
		this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.graph_text_a_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.graph_text_a_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.graph_text_b_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.graph_text_b_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.graph_text_c_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.graph_text_c_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
		this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.graph_trace_a.resize_trace();
		this.graph_trace_b.resize_trace();
		this.graph_trace_c.resize_trace();
		let padding: number = 0.0125 * this.bounds.get_width();
		if (global.MOBILE_MODE) {
			padding = 0.00875 * this.bounds.get_width();
		}
		let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
		let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
		this.download_button.set_bounds(this.inner_bounds.right - width, this.inner_bounds.top + padding, this.inner_bounds.right - padding, this.inner_bounds.top + padding + height);
		this.download_button.resize_paint();
	}
	reset_trace(index: number): void {
		if (index === 0) {
			this.graph_trace_a.reset();
		} else if (index === 1) {
			this.graph_trace_b.reset();
		} else if (index === 2) {
			this.graph_trace_c.reset();
		}
	}
	reset(): void {
		this.graph_trace_a.reset();
		this.graph_trace_b.reset();
		this.graph_trace_c.reset();
	}
	push_trace_a(value: number, t: number): void {
		this.graph_trace_a.push(value, t);
	}
	push_trace_b(value: number, t: number): void {
		this.graph_trace_b.push(value, t);
	}
	push_trace_c(value: number, t: number): void {
		this.graph_trace_c.push(value, t);
	}
	mouse_down(): void {
		if (global.FLAG_GRAPH) {
			this.first_touch_x = global.mouse_x;
			this.first_touch_y = global.mouse_y;
			if (this.download_button.contains_xy(global.mouse_x, global.mouse_y)) {
				this.generate_csv();
			}
		}
	}
	generate_csv(): void {
		let str: string = '';
		let temp_str: string = '';
		let time_stamp: string = '';
		str += 'time, trace_a, trace_b, trace_c\n';
		let max: number = Math.max(Math.max(this.graph_trace_a.trace.length, this.graph_trace_b.trace.length), this.graph_trace_c.trace.length);
		let updated_time: boolean = false;
		for (var i: number = 0; i < max; i++) {
			time_stamp = '0, ';
			updated_time = false;
			temp_str = '';
			if (i < this.graph_trace_a.trace.length) {
				if (!updated_time) {
					time_stamp = this.graph_trace_a.get_value_double(i)[0] + ', ';
					updated_time = true;
				}
				temp_str += this.graph_trace_a.get_value_double(i)[1] + ', ';
			} else {
				temp_str += '0, ';
			}
			if (i < this.graph_trace_b.trace.length) {
				if (!updated_time) {
					time_stamp = this.graph_trace_b.get_value_double(i)[0] + ', ';
					updated_time = true;
				}
				temp_str += this.graph_trace_b.get_value_double(i)[1] + ', ';
			} else {
				temp_str += '0, ';
			}
			if (i < this.graph_trace_c.trace.length) {
				if (!updated_time) {
					time_stamp = this.graph_trace_c.get_value_double(i)[0] + ', ';
					updated_time = true;
				}
				temp_str += this.graph_trace_c.get_value_double(i)[1] + ', ';
			} else {
				temp_str += '0, ';
			}
			temp_str = temp_str.substring(0, temp_str.length - 2);
			temp_str += '\n';
			str += time_stamp + temp_str;
		}
		if (!global.MOBILE_MODE) {
			save_file(global.user_file.title + '_csv.txt', str);
		} else {
			window.JsInterface.javascript_native_hook('push-csv', global.user_file.title + '_csv.txt', str);
		}
	}
	mouse_move(): void {
		if (global.FLAG_GRAPH) {
			this.mouse_hover();
		}
	}
	mouse_up(): void {}
	mouse_hover(): void {
		if (this.inner_bounds.contains_xy(global.mouse_x, global.mouse_y)) {
			this.meter_hover_index = Math.round(((global.mouse_x - this.inner_bounds.left) / (this.inner_bounds.get_width() / this.X_AXIS_LENGTH)) * 0.5);
		} else {
			this.meter_hover_index = -1;
		}
	}
	key_down(key_event: KEY_EVENT_T): void {
		if (global.FLAG_GRAPH) {
			if (key_event['event'].code === global.KEY_CODE_ESCAPE) {
				menu_bar.handle_graph_flag(!global.FLAG_GRAPH);
				global.component_touched = true;
			}
		}
	}
	draw_window(canvas: GraphicsEngine): void {
		if (global.FLAG_GRAPH) {
			canvas.draw_rect2(this.bounds, this.fill_paint);
			canvas.draw_rect2(this.inner_bounds, this.line_paint);
			let cached_value: number = this.x_axis.length >> 1;
			let cached_value_t_p_o1: number = (global.ZERO_PT_FIVE + cached_value * 0.1) >> global.ZERO;
			let temp: number = 0;
			let index: number = 0;
			for (var i: number = 0; i < cached_value; i += cached_value_t_p_o1) {
				temp = i + cached_value;
				this.line_buffer[index++] = Array(this.x_axis[temp].x, this.x_axis[temp].y, this.x_axis[temp].x, this.x_axis[temp].y - this.inner_bounds.get_width() * 0.01);
			}
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			if (scope_manager.ENTRY.length > 0) {
				canvas.draw_text(
					scope_manager.get_scope_name(this.SCOPE_0_INDEX),
					this.bounds.get_center_x() - 1.25 * global.CANVAS_TEXT_SIZE_BASE * (3.5 * this.text_paint.measure_text(scope_manager.get_scope_name(this.SCOPE_0_INDEX))),
					this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1),
					this.graph_text_a_paint
				);
				if (this.meter_hover_index > -1 && this.meter_hover_index < this.graph_trace_a.trace.length) {
					if (this.graph_trace_a.get_value(this.meter_hover_index)[1] !== '') {
						canvas.draw_text(
							this.graph_trace_a.get_value(this.meter_hover_index)[1] + scope_manager.get_units(this.SCOPE_0_INDEX),
							this.inner_bounds.left,
							this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1),
							this.graph_text_a_paint
						);
					} else {
						canvas.draw_text(
							'0' + scope_manager.get_units(this.SCOPE_0_INDEX),
							this.inner_bounds.left,
							this.inner_bounds.top - (this.inner_bounds.top - this.bounds.top) * 0.5,
							this.graph_text_a_paint
						);
					}
					this.time_axis_value = this.graph_trace_a.get_value(this.meter_hover_index)[0];
					if (global.MOBILE_MODE) {
						canvas.draw_line(
							this.bounds.left + this.graph_trace_a.trace[this.meter_hover_index].x,
							this.inner_bounds.top,
							this.bounds.left + this.graph_trace_a.trace[this.meter_hover_index].x,
							this.inner_bounds.bottom,
							this.line_paint
						);
					}
				}
			}
			if (scope_manager.ENTRY.length > 1) {
				canvas.draw_text(
					scope_manager.get_scope_name(this.SCOPE_1_INDEX),
					this.bounds.get_center_x(),
					this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1),
					this.graph_text_b_paint
				);
				if (this.meter_hover_index > -1 && this.meter_hover_index < this.graph_trace_b.trace.length) {
					if (this.graph_trace_b.get_value(this.meter_hover_index)[1] !== '') {
						canvas.draw_text(
							this.graph_trace_b.get_value(this.meter_hover_index)[1] + scope_manager.get_units(this.SCOPE_1_INDEX),
							this.inner_bounds.left + view_port.view_width * 0.1,
							this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1),
							this.graph_text_b_paint
						);
					} else {
						canvas.draw_text(
							'0' + scope_manager.get_units(this.SCOPE_1_INDEX),
							this.inner_bounds.left + view_port.view_width * 0.1,
							this.inner_bounds.top - (this.inner_bounds.top - this.bounds.top) * 0.5,
							this.graph_text_b_paint
						);
					}
					this.time_axis_value = this.graph_trace_b.get_value(this.meter_hover_index)[0];
					if (global.MOBILE_MODE) {
						canvas.draw_line(
							this.bounds.left + this.graph_trace_b.trace[this.meter_hover_index].x,
							this.inner_bounds.top,
							this.bounds.left + this.graph_trace_b.trace[this.meter_hover_index].x,
							this.inner_bounds.bottom,
							this.line_paint
						);
					}
				}
			}
			if (scope_manager.ENTRY.length > 2) {
				canvas.draw_text(
					scope_manager.get_scope_name(this.SCOPE_2_INDEX),
					this.bounds.get_center_x() + 1.25 * global.CANVAS_TEXT_SIZE_BASE * (3.5 * this.text_paint.measure_text(scope_manager.get_scope_name(this.SCOPE_2_INDEX))),
					this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1),
					this.graph_text_c_paint
				);
				if (this.meter_hover_index > -1 && this.meter_hover_index < this.graph_trace_c.trace.length) {
					if (this.graph_trace_c.get_value(this.meter_hover_index)[1] !== '') {
						canvas.draw_text(
							this.graph_trace_c.get_value(this.meter_hover_index)[1] + scope_manager.get_units(this.SCOPE_2_INDEX),
							this.inner_bounds.left + view_port.view_width * 0.2,
							this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1),
							this.graph_text_c_paint
						);
					} else {
						canvas.draw_text(
							'0' + scope_manager.get_units(this.SCOPE_2_INDEX),
							this.inner_bounds.left + view_port.view_width * 0.2,
							this.inner_bounds.top - (this.inner_bounds.top - this.bounds.top) * 0.5,
							this.graph_text_c_paint
						);
					}
					this.time_axis_value = this.graph_trace_c.get_value(this.meter_hover_index)[0];
					if (global.MOBILE_MODE) {
						canvas.draw_line(
							this.bounds.left + this.graph_trace_c.trace[this.meter_hover_index].x,
							this.inner_bounds.top,
							this.bounds.left + this.graph_trace_c.trace[this.meter_hover_index].x,
							this.inner_bounds.bottom,
							this.line_paint
						);
					}
				}
			}
			if (scope_manager.ENTRY.length > 0) {
				if (
					this.meter_hover_index > -1 &&
					(this.meter_hover_index < this.graph_trace_a.trace.length || this.meter_hover_index < this.graph_trace_b.trace.length || this.meter_hover_index < this.graph_trace_c.trace.length)
				) {
					canvas.draw_text(
						this.time_axis_value + 's',
						this.inner_bounds.right -
							this.text_paint.measure_text(global.exponentiate_quickly(global.time_step) + 's/step   ') -
							this.text_paint.measure_text(this.time_axis_value + 's') * 0.5 -
							view_port.view_width * 0.1,
						this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1),
						this.text_paint
					);
				}
			}
			if (this.graph_trace_a.magnitude_list.length > 0) {
				for (var i: number = Math.round(this.X_AXIS_LENGTH * 0.1); i < Math.round(this.X_AXIS_LENGTH >> 1); i += Math.round(this.X_AXIS_LENGTH * 0.1)) {
					if (i < this.graph_trace_a.magnitude_list.length) {
						this.time_tag = global.exponentiate_quickly(this.graph_trace_a.magnitude_list[i].x);
						canvas.draw_text(
							this.time_tag + 's',
							view_port.left + this.graph_trace_a.trace[i].x - (this.text_paint.measure_text(this.time_tag) >> 1),
							this.inner_bounds.bottom - global.CANVAS_STROKE_WIDTH_6,
							this.text_paint
						);
					} else {
						break;
					}
				}
			} else if (this.graph_trace_a.magnitude_list.length === 0 && this.graph_trace_b.magnitude_list.length > 0) {
				for (var i: number = (this.X_AXIS_LENGTH >> 1) * 0.1; i < this.X_AXIS_LENGTH >> 1; i += (this.X_AXIS_LENGTH >> 1) * 0.1) {
					if (i < this.graph_trace_b.magnitude_list.length) {
						this.time_tag = global.exponentiate_quickly(this.graph_trace_b.magnitude_list[i].x);
						canvas.draw_text(
							this.time_tag + 's',
							view_port.left + this.graph_trace_b.trace[i].x - (this.text_paint.measure_text(this.time_tag) >> 1),
							this.inner_bounds.bottom - global.CANVAS_STROKE_WIDTH_6,
							this.text_paint
						);
					} else {
						break;
					}
				}
			} else if (this.graph_trace_a.magnitude_list.length === 0 && this.graph_trace_b.magnitude_list.length === 0 && this.graph_trace_c.magnitude_list.length > 0) {
				for (var i: number = (this.X_AXIS_LENGTH >> 1) * 0.1; i < this.X_AXIS_LENGTH >> 1; i += (this.X_AXIS_LENGTH >> 1) * 0.1) {
					if (i < this.graph_trace_c.magnitude_list.length) {
						this.time_tag = global.exponentiate_quickly(this.graph_trace_c.magnitude_list[i].x);
						canvas.draw_text(
							this.time_tag + 's',
							view_port.left + this.graph_trace_c.trace[i].x - (this.text_paint.measure_text(this.time_tag) >> 1),
							this.inner_bounds.bottom - global.CANVAS_STROKE_WIDTH_6,
							this.text_paint
						);
					} else {
						break;
					}
				}
			}
			canvas.draw_text(
				global.exponentiate_quickly(global.time_step) + 's/step',
				this.inner_bounds.right - this.text_paint.measure_text(global.exponentiate_quickly(global.time_step) + 's/step   '),
				this.inner_bounds.top - ((this.inner_bounds.top - this.bounds.top) >> 1),
				this.text_paint
			);
			if (this.download_button.contains_xy(global.mouse_x, global.mouse_y) && !global.MOBILE_MODE) {
				this.download_button.fill_paint.set_color(global.GENERAL_HOVER_COLOR);
				this.download_button.draw_button(canvas);
				this.download_button.fill_paint.set_color(global.GENERAL_BOUNDS_COLOR);
			} else {
				this.download_button.draw_button(canvas);
			}
			this.graph_trace_a.draw_trace(canvas, view_port.left, 0);
			this.graph_trace_b.draw_trace(canvas, view_port.left, 0);
			this.graph_trace_c.draw_trace(canvas, view_port.left, 0);
		}
	}
}
