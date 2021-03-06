'use strict';
class SineWave {
    constructor(x1, y1, x2, y2, amplitude) {
        this.amplitude = amplitude;
        this.sine_wave_paint = new Paint();
        this.sine_wave_paint.set_paint_style(paint.style.STROKE);
        this.sine_wave_paint.set_paint_cap(paint.cap.ROUND);
        this.sine_wave_paint.set_paint_join(paint.join.ROUND);
        this.sine_wave_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.sine_wave_paint.set_color(global.COLORS.ELEMENT_COLOR);
        this.sine_wave_paint.set_text_size(global.variables.canvas_text_size_4);
        this.sine_wave_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.sine_wave_paint.set_alpha(255);
        this.sine_wave_paint.set_paint_align(paint.align.CENTER);
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.c_x = 0;
        this.c_y = 0;
        this.last_x1 = -1;
        this.last_x2 = -1;
        this.last_y1 = -1;
        this.last_y2 = -1;
    }
    set_points(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.last_x1 = -1;
        this.last_x2 = -1;
        this.last_y1 = -1;
        this.last_y2 = -1;
    }
    set_amplitude(amplitude) {
        this.amplitude = amplitude;
    }
    set_color(color) {
        this.sine_wave_paint.set_color(color);
    }
    resize(style) {
        if (style === global.CONSTANTS.SINE_WAVE_STYLE_0) {
            this.sine_wave_paint.set_stroke_width(global.variables.canvas_stroke_width_2_zoom);
            this.sine_wave_paint.set_text_size(global.variables.canvas_text_size_4_zoom);
        }
        else if (style === global.CONSTANTS.SINE_WAVE_STYLE_1) {
            this.sine_wave_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
            this.sine_wave_paint.set_text_size(global.variables.canvas_text_size_4);
        }
        this.last_x1 = -1;
        this.last_x2 = -1;
        this.last_y1 = -1;
        this.last_y2 = -1;
    }
    draw_sine_wave(canvas, style) {
        if (this.last_x1 !== this.x1 || this.last_x2 !== this.x2) {
            this.last_x1 = this.x1;
            this.last_x2 = this.x2;
            this.c_x = (this.x2 + this.x1) * 0.5;
        }
        if (this.last_y1 !== this.y1 || this.last_y2 !== this.y2) {
            this.last_y1 = this.y1;
            this.last_y2 = this.y2;
            this.c_y = (this.y2 + this.y1) * 0.5;
        }
        canvas.draw_arc2(this.x1, this.y1, this.c_x, this.c_y, this.amplitude, this.sine_wave_paint);
        canvas.draw_arc2(this.c_x, this.c_y, this.x2, this.y2, -this.amplitude, this.sine_wave_paint);
    }
}
