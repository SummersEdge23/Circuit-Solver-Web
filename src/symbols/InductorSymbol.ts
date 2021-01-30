'use strict';
class InductorSymbol {
	public index: number;
	public page: number;
	public bounds: RectF;
	public p1: PointF;
	public p2: PointF;
	public theta_m90: number;
	public theta: number;
	public inductor_arc_0: Arc;
	public inductor_arc_1: Arc;
	public inductor_arc_2: Arc;
	public inductor_arc_3: Arc;
	public ind_0: PointF;
	public ind_1: PointF;
	public ind_2: PointF;
	public ind_3: PointF;
	public c_x: number;
	public c_y: number;
	public x_space: number;
	public y_space: number;
	public connect1_x: number;
	public connect1_y: number;
	public connect2_x: number;
	public connect2_y: number;
	public line_paint: Paint;
	public point_paint: Paint;
	public text_paint: Paint;
	public text_background_paint: Paint;
	public flag_add_element: boolean;
	public TAG: string;
	public draw_tag: boolean;
	public text_bounds: RectF;
	public height_ratio: number;
	public line_buffer: Array<Array<number>>;
	public circle_buffer: Array<Array<number>>;
	constructor(rect: RectF, index: number, page: number) {
		this.index = index;
		this.page = page;
		this.bounds = new RectF(0, 0, 0, 0);
		if (global.not_null(rect)) {
			this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		}
		this.p1 = new PointF(this.bounds.left, this.bounds.get_center_y());
		this.p2 = new PointF(this.bounds.right, this.bounds.get_center_y());
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.inductor_arc_0 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5);
		this.inductor_arc_0.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.inductor_arc_0.transform_scaled = false;
		this.inductor_arc_1 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5);
		this.inductor_arc_1.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.inductor_arc_1.transform_scaled = false;
		this.inductor_arc_2 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5);
		this.inductor_arc_2.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.inductor_arc_2.transform_scaled = false;
		this.inductor_arc_3 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5);
		this.inductor_arc_3.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.inductor_arc_3.transform_scaled = false;
		this.ind_0 = new PointF(0, 0);
		this.ind_1 = new PointF(0, 0);
		this.ind_2 = new PointF(0, 0);
		this.ind_3 = new PointF(0, 0);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.x_space = this.bounds.get_width() >> 2;
		this.y_space = this.bounds.get_height() >> 2;
		this.connect1_x = 0;
		this.connect1_y = 0;
		this.connect2_x = 0;
		this.connect2_y = 0;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(PAINT.style.STROKE);
		this.line_paint.set_paint_cap(PAINT.cap.ROUND);
		this.line_paint.set_paint_join(PAINT.join.MITER);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(PAINT.align.CENTER);
		this.point_paint = new Paint();
		this.point_paint.set_paint_style(PAINT.style.FILL);
		this.point_paint.set_paint_cap(PAINT.cap.ROUND);
		this.point_paint.set_paint_join(PAINT.join.MITER);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.point_paint.set_alpha(255);
		this.point_paint.set_paint_align(PAINT.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(PAINT.style.FILL);
		this.text_paint.set_paint_cap(PAINT.cap.ROUND);
		this.text_paint.set_paint_join(PAINT.join.MITER);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(PAINT.align.CENTER);
		this.text_background_paint = new Paint();
		this.text_background_paint.set_paint_style(PAINT.style.FILL);
		this.text_background_paint.set_paint_cap(PAINT.cap.ROUND);
		this.text_background_paint.set_paint_join(PAINT.join.MITER);
		this.text_background_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.text_background_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
		this.text_background_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_background_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_background_paint.set_alpha(255);
		this.text_background_paint.set_paint_align(PAINT.align.CENTER);
		this.build_element();
		this.flag_add_element = false;
		this.TAG = language_manager.TAG_INDUCTOR;
		this.draw_tag = false;
		this.text_bounds = new RectF(0, 0, 0, 0);
		this.height_ratio = 0.35;
		this.line_buffer = [];
		this.circle_buffer = [];
	}
	update() {
		if (this.flag_add_element) {
			if (
				workspace.bounds.contains_xywh(
					global.mouse_x,
					global.mouse_y,
					workspace.bounds.get_width() - 4.5 * global.variables.node_space_x,
					workspace.bounds.get_height() - 4.5 * global.variables.node_space_y
				) &&
				!this.bounds.contains_xy(global.mouse_x, global.mouse_y)
			) {
				shortcut_manager.temp_history_snapshot = engine_functions.history_snapshot();
				global.signal_history_lock = true;
				engine_functions.add_inductor();
				this.flag_add_element = false;
			}
		}
	}
	mouse_down(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
				if (!this.flag_add_element) {
					this.flag_add_element = true;
					global.signal_add_element = true;
					global.component_touched = true;
				}
			}
		}
	}
	mouse_move(page: number, width: number, height: number) {
		if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height) && !global.CONSTANTS.MOBILE_MODE) {
			this.draw_tag = true;
		} else {
			this.draw_tag = false;
		}
		if (this.page === page) {
		}
	}
	mouse_up(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
			}
			this.flag_add_element = false;
			global.signal_add_element = false;
		}
	}
	build_element() {
		this.connect1_x = this.c_x - this.x_space * global.cosine(this.theta);
		this.connect1_y = this.c_y - this.y_space * global.sine(this.theta);
		this.connect2_x = this.c_x + this.x_space * global.cosine(this.theta);
		this.connect2_y = this.c_y + this.y_space * global.sine(this.theta);
		this.ind_0.x = this.c_x + this.x_space * global.cosine(this.theta);
		this.ind_0.y = this.c_y + this.y_space * global.sine(this.theta);
		this.ind_1.x = this.c_x + (this.x_space >> 1) * global.cosine(this.theta);
		this.ind_1.y = this.c_y + (this.y_space >> 1) * global.sine(this.theta);
		this.ind_2.x = this.c_x + (this.x_space >> 1) * global.cosine(this.theta - global.to_radians(180));
		this.ind_2.y = this.c_y + (this.y_space >> 1) * global.sine(this.theta - global.to_radians(180));
		this.ind_3.x = this.c_x + this.x_space * global.cosine(this.theta - global.to_radians(180));
		this.ind_3.y = this.c_y + this.y_space * global.sine(this.theta - global.to_radians(180));
		this.inductor_arc_0.set_points(this.ind_0.x, this.ind_0.y, this.ind_1.x, this.ind_1.y);
		this.inductor_arc_0.amplitude = global.variables.canvas_stroke_width_5;
		this.inductor_arc_1.set_points(this.ind_1.x, this.ind_1.y, this.c_x, this.c_y);
		this.inductor_arc_1.amplitude = global.variables.canvas_stroke_width_5;
		this.inductor_arc_2.set_points(this.c_x, this.c_y, this.ind_2.x, this.ind_2.y);
		this.inductor_arc_2.amplitude = global.variables.canvas_stroke_width_5;
		this.inductor_arc_3.set_points(this.ind_2.x, this.ind_2.y, this.ind_3.x, this.ind_3.y);
		this.inductor_arc_3.amplitude = global.variables.canvas_stroke_width_5;
	}
	resize(rect: RectF) {
		this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.x_space = this.bounds.get_width() >> 2;
		this.y_space = this.bounds.get_height() >> 2;
		this.p1.set_point(this.bounds.left, this.bounds.get_center_y());
		this.p2.set_point(this.bounds.right, this.bounds.get_center_y());
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.build_element();
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		this.inductor_arc_0.resize2();
		this.inductor_arc_1.resize2();
		this.inductor_arc_2.resize2();
		this.inductor_arc_3.resize2();
	}
	recolor() {
		if (this.flag_add_element) {
			this.line_paint.set_color(global.SELECTED_COLOR);
			this.point_paint.set_color(global.SELECTED_COLOR);
			this.text_paint.set_color(global.SELECTED_COLOR);
			this.inductor_arc_0.set_color(global.SELECTED_COLOR);
			this.inductor_arc_1.set_color(global.SELECTED_COLOR);
			this.inductor_arc_2.set_color(global.SELECTED_COLOR);
			this.inductor_arc_3.set_color(global.SELECTED_COLOR);
		} else {
			this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.inductor_arc_0.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.inductor_arc_1.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.inductor_arc_2.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.inductor_arc_3.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		}
	}
	draw_symbol(canvas: GraphicsEngine, page: number) {
		this.recolor();
		if (this.page === page) {
			this.inductor_arc_0.draw_arc(canvas);
			this.inductor_arc_1.draw_arc(canvas);
			this.inductor_arc_2.draw_arc(canvas);
			this.inductor_arc_3.draw_arc(canvas);
			let indexer: number = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
			this.line_buffer[indexer++] = Array(this.connect2_x, this.connect2_y, this.p2.x, this.p2.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			indexer = 0;
			this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.variables.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.variables.canvas_stroke_width_2);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (this.draw_tag && !global.signal_add_element) {
				this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
				this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
				this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
				this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
			}
		}
	}
}
