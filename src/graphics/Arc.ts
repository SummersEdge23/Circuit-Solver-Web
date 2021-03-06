'use strict';
class Arc {
	public amplitude: number;
	private arc_paint: Paint;
	private x1: number;
	private x2: number;
	private y1: number;
	private y2: number;
	public transform_scaled: boolean;
	constructor(x1: number, y1: number, x2: number, y2: number, amplitude: number) {
		this.amplitude = amplitude;
		this.arc_paint = new Paint();
		this.arc_paint.set_paint_style(paint.style.STROKE);
		this.arc_paint.set_paint_cap(paint.cap.ROUND);
		this.arc_paint.set_paint_join(paint.join.ROUND);
		this.arc_paint.set_stroke_width(global.variables.canvas_stroke_width_2_zoom);
		this.arc_paint.set_color(global.COLORS.ELEMENT_COLOR);
		this.arc_paint.set_text_size(global.variables.canvas_text_size_4_zoom);
		this.arc_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.arc_paint.set_alpha(255);
		this.arc_paint.set_paint_align(paint.align.CENTER);
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.transform_scaled = true;
	}
	set_points(x1: number, y1: number, x2: number, y2: number): void {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	resize(): void {
		this.arc_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
		this.arc_paint.set_text_size(global.variables.canvas_text_size_4_zoom);
	}
	resize2(): void {
		this.arc_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.arc_paint.set_text_size(global.variables.canvas_text_size_4);
	}
	set_color(color: string): void {
		this.arc_paint.set_color(color);
	}
	draw_arc(canvas: GraphicsEngine): void {
		if (this.transform_scaled) {
			this.resize();
		} else {
			this.resize2();
		}
		canvas.draw_arc2(this.x1, this.y1, this.x2, this.y2, -this.amplitude, this.arc_paint);
	}
}
