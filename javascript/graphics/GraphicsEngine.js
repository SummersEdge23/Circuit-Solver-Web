'use strict';
class GraphicsEngine {
    constructor(ctx) {
        this.ctx = ctx;
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(paint.style.FILL);
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.temp_x = 0;
        this.temp_y = 0;
        this.radius = 0;
        this.general_path = new Path();
        this.degree = 0;
        this.r_theta = 0;
        this.r_x = 0;
        this.r_y = 0;
        this.general_integer = 0;
        this.padding = 6;
        this.transform_var_1 = 0;
        this.transform_var_2 = 0;
        this.last_alpha = -1;
        this.last_fill_color = '';
        this.last_stroke_color = '';
        this.last_width = -1;
        this.last_join = '';
        this.last_font = '';
        this.last_text_size = -1;
        this.last_text_baseline = '';
        this.last_text_align = '';
        this.last_line_cap = '';
        this.ENABLE_LINE_JOIN = true;
        this.FAST_PI_MUL_2 = 7;
        this.PI_MUL_2 = Math.PI * 2;
        this.dict = null;
        this.command = '';
        this.cache = [];
        this.c_xp = 0;
        this.c_yp = 0;
        this.radiusp = 0;
        this.end_degree_radians = 0;
        this.start_degree_radians = 0;
    }
    set_context(ctx) {
        this.ctx = ctx;
    }
    get_context() {
        return this.ctx;
    }
    on_resize() {
        this.last_alpha = -1;
        this.last_fill_color = '';
        this.last_stroke_color = '';
        this.last_width = -1;
        this.last_join = '';
        this.last_font = '';
        this.last_text_baseline = '';
        this.last_text_size = -1;
        this.last_text_align = '';
        this.last_line_cap = '';
    }
    apply_paint(paint, is_text) {
        this.ctx.beginPath();
        if (paint.style.FILL === paint.paint_style || paint.style.FILL_AND_STROKE === paint.paint_style) {
            this.ctx.fillStyle = paint.color;
            this.last_fill_color = paint.color;
        }
        if (this.last_alpha !== paint.alpha) {
            this.ctx.globalAlpha = paint.alpha;
            this.last_alpha = paint.alpha;
        }
        if (is_text) {
            if (this.last_text_align !== paint.text_align) {
                this.ctx.textAlign = paint.text_align;
                this.last_text_align = paint.text_align;
            }
            if (this.last_text_size !== paint.text_size || this.last_font !== paint.font) {
                this.ctx.font = global.TEMPLATES.FONT_TEMPLATE.replace('s', paint.text_size).replace('f', paint.font);
                this.last_text_size = paint.text_size;
                this.last_font = paint.font;
            }
            if (this.last_text_baseline !== paint.text_baseline) {
                this.ctx.textBaseline = paint.text_baseline;
                this.last_text_baseline = paint.text_baseline;
            }
        }
        else {
            if (paint.style.STROKE === paint.paint_style || paint.style.FILL_AND_STROKE === paint.paint_style) {
                if (this.last_stroke_color !== paint.color) {
                    this.ctx.strokeStyle = paint.color;
                    this.last_stroke_color = paint.color;
                }
                if (this.ENABLE_LINE_JOIN && this.last_join !== paint.paint_join) {
                    this.ctx.lineJoin = paint.paint_join;
                    this.last_join = paint.paint_join;
                }
                if (this.last_line_cap !== paint.paint_cap) {
                    this.ctx.lineCap = paint.paint_cap;
                    this.last_line_cap = paint.paint_cap;
                }
                if (this.last_width !== paint.stroke_width) {
                    this.ctx.lineWidth = paint.stroke_width;
                    this.last_width = paint.stroke_width;
                }
            }
        }
    }
    draw_line(x1, y1, x2, y2, paint) {
        this.apply_paint(paint, false);
        this.ctx.moveTo((global.CONSTANTS.ZERO_PT_FIVE + x1) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + y1) >> global.CONSTANTS.ZERO);
        this.ctx.lineTo((global.CONSTANTS.ZERO_PT_FIVE + x2) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + y2) >> global.CONSTANTS.ZERO);
        this.ctx.stroke();
    }
    draw_line_buffer(coords, paint) {
        this.apply_paint(paint, false);
        for (var i = coords.length - 1; i > -1; i--) {
            this.cache = coords[i];
            this.ctx.moveTo((global.CONSTANTS.ZERO_PT_FIVE + this.cache[0]) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + this.cache[1]) >> global.CONSTANTS.ZERO);
            this.ctx.lineTo((global.CONSTANTS.ZERO_PT_FIVE + this.cache[2]) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + this.cache[3]) >> global.CONSTANTS.ZERO);
        }
        this.ctx.stroke();
    }
    draw_rect(left, top, right, bottom, paint) {
        this.width = (global.CONSTANTS.ZERO_PT_FIVE + (right - left)) >> global.CONSTANTS.ZERO;
        this.height = (global.CONSTANTS.ZERO_PT_FIVE + (bottom - top)) >> global.CONSTANTS.ZERO;
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + left) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + top) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case paint.style.STROKE:
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
            default:
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
        }
    }
    draw_rect2(rect, paint) {
        this.width = (global.CONSTANTS.ZERO_PT_FIVE + rect.get_width()) >> global.CONSTANTS.ZERO;
        this.height = (global.CONSTANTS.ZERO_PT_FIVE + rect.get_height()) >> global.CONSTANTS.ZERO;
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + rect.left) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + rect.top) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case paint.style.STROKE:
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
            default:
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
        }
    }
    draw_rect3(x, y, w, h, paint) {
        this.width = (global.CONSTANTS.ZERO_PT_FIVE + w) >> global.CONSTANTS.ZERO;
        this.height = (global.CONSTANTS.ZERO_PT_FIVE + h) >> global.CONSTANTS.ZERO;
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + (x - (w >> 1))) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + (y - (h >> 1))) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case paint.style.STROKE:
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
            default:
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
        }
    }
    draw_arrow(c_x, c_y, radius, is_up, paint) {
        this.general_path.reset();
        this.c_xp = (global.CONSTANTS.ZERO_PT_FIVE + c_x) >> global.CONSTANTS.ZERO;
        this.c_yp = (global.CONSTANTS.ZERO_PT_FIVE + c_y) >> global.CONSTANTS.ZERO;
        this.radiusp = (global.CONSTANTS.ZERO_PT_FIVE + radius) >> global.CONSTANTS.ZERO;
        if (is_up) {
            this.general_path.move_to(this.c_xp, this.c_yp - this.radiusp);
            this.general_path.line_to(this.c_xp + this.radiusp, this.c_yp + this.radiusp);
            this.general_path.line_to(this.c_xp, this.c_yp + (this.radiusp >> 1));
            this.general_path.line_to(this.c_xp - this.radiusp, this.c_yp + this.radiusp);
            this.general_path.line_to(this.c_xp, this.c_yp - this.radiusp);
        }
        else {
            this.general_path.move_to(this.c_xp, this.c_yp + this.radiusp);
            this.general_path.line_to(this.c_xp + this.radiusp, this.c_yp - this.radiusp);
            this.general_path.line_to(this.c_xp, this.c_yp - (this.radiusp >> 1));
            this.general_path.line_to(this.c_xp - this.radiusp, this.c_yp - this.radiusp);
            this.general_path.line_to(this.c_xp, this.c_yp + this.radiusp);
        }
        this.draw_path(this.general_path, paint);
    }
    draw_circle(x, y, radius, paint) {
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + x) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + y) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        this.ctx.arc(this.x, this.y, radius, 0, this.PI_MUL_2);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fill();
                break;
            case paint.style.STROKE:
                this.ctx.stroke();
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fill();
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
    }
    draw_circle2(rect, paint) {
        this.width = (global.CONSTANTS.ZERO_PT_FIVE + (rect.get_width() >> 1)) >> global.CONSTANTS.ZERO;
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + rect.get_center_x()) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + rect.get_center_y()) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        this.ctx.arc(this.x, this.y, this.width, 0, this.PI_MUL_2);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fill();
                break;
            case paint.style.STROKE:
                this.ctx.stroke();
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fill();
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
    }
    draw_circle3(rect, strech_factor, paint) {
        this.width = (global.CONSTANTS.ZERO_PT_FIVE + ((rect.get_width() * strech_factor) >> 1)) >> global.CONSTANTS.ZERO;
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + rect.get_center_x()) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + rect.get_center_y()) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        this.ctx.arc(this.x, this.y, this.width, 0, this.PI_MUL_2);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fill();
                break;
            case paint.style.STROKE:
                this.ctx.stroke();
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fill();
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
    }
    draw_circle_buffer(buffer, paint) {
        this.apply_paint(paint, false);
        for (var i = buffer.length - 1; i > -1; i--) {
            this.cache = buffer[i];
            this.x = (global.CONSTANTS.ZERO_PT_FIVE + this.cache[0]) >> global.CONSTANTS.ZERO;
            this.y = (global.CONSTANTS.ZERO_PT_FIVE + this.cache[1]) >> global.CONSTANTS.ZERO;
            this.ctx.moveTo(this.x, this.y);
            this.ctx.arc(this.x, this.y, this.cache[2], 0, this.PI_MUL_2);
        }
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fill();
                break;
            case paint.style.STROKE:
                this.ctx.stroke();
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fill();
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
    }
    draw_color(_surface, color, alpha) {
        this.fill_paint.set_color(color);
        this.fill_paint.set_alpha(alpha);
        this.apply_paint(this.fill_paint, false);
        this.ctx.fillRect(0, 0, (global.CONSTANTS.ZERO_PT_FIVE + _surface.width) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + _surface.height) >> global.CONSTANTS.ZERO);
    }
    draw_color2(color, alpha, x, y, w, h) {
        this.fill_paint.set_color(color);
        this.fill_paint.set_alpha(alpha);
        this.apply_paint(this.fill_paint, false);
        this.ctx.fillRect((global.CONSTANTS.ZERO_PT_FIVE + x) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + y) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + w) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + h) >> global.CONSTANTS.ZERO);
    }
    draw_text(txt, x, y, paint) {
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + x) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + y) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, true);
        this.ctx.fillText(txt, this.x, this.y);
    }
    draw_arc(rect, start_degree, end_degree, paint) {
        this.radius = (global.CONSTANTS.ZERO_PT_FIVE + Math.max(rect.get_width() >> 1, rect.get_height() >> 1)) >> global.CONSTANTS.ZERO;
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + rect.get_center_x()) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + rect.get_center_y()) >> global.CONSTANTS.ZERO;
        this.end_degree_radians = (end_degree * global.CONSTANTS.NEG_PI_DIV_180) >> global.CONSTANTS.ZERO;
        this.start_degree_radians = (start_degree * global.CONSTANTS.NEG_PI_DIV_180) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        this.ctx.arc(this.x, this.y, this.radius, this.start_degree_radians, this.end_degree_radians, true);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fill();
                break;
            case paint.style.STROKE:
                this.ctx.stroke();
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fill();
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
    }
    draw_arc2(x1, y1, x2, y2, amplitude, paint) {
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + x1 + x2) >> 1;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + y1 + y2) >> 1;
        this.temp_x = (global.CONSTANTS.ZERO_PT_FIVE + x1) >> global.CONSTANTS.ZERO;
        this.temp_y = (global.CONSTANTS.ZERO_PT_FIVE + y1) >> global.CONSTANTS.ZERO;
        this.degree = global.utils.retrieve_angle_radian(x2 - x1, y2 - y1) - global.CONSTANTS.PI_DIV_2;
        this.general_path.reset();
        this.general_path.move_to(this.temp_x, this.temp_y);
        this.general_path.curve_to(this.temp_x, this.temp_y, (this.x + amplitude * global.utils.cosine(this.degree)) >> global.CONSTANTS.ZERO, (this.y + amplitude * global.utils.sine(this.degree)) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + x2) >> global.CONSTANTS.ZERO, (global.CONSTANTS.ZERO_PT_FIVE + y2) >> global.CONSTANTS.ZERO);
        this.draw_path(this.general_path, paint);
    }
    draw_arc3(c_x, c_y, radius, start_degree, end_degree, paint) {
        this.radius = (global.CONSTANTS.ZERO_PT_FIVE + radius) >> global.CONSTANTS.ZERO;
        this.x = (global.CONSTANTS.ZERO_PT_FIVE + c_x) >> global.CONSTANTS.ZERO;
        this.y = (global.CONSTANTS.ZERO_PT_FIVE + c_y) >> global.CONSTANTS.ZERO;
        this.end_degree_radians = (end_degree * global.CONSTANTS.NEG_PI_DIV_180) >> global.CONSTANTS.ZERO;
        this.start_degree_radians = (start_degree * global.CONSTANTS.NEG_PI_DIV_180) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        this.ctx.arc(this.x, this.y, this.radius, this.start_degree_radians, this.end_degree_radians, true);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fill();
                break;
            case paint.style.STROKE:
                this.ctx.stroke();
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fill();
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
    }
    draw_path(path, paint) {
        this.apply_paint(paint, false);
        for (var i = 0; i < path.path_2d.length; i++) {
            this.dict = path.path_2d[i];
            this.command = this.dict['command'];
            if (this.command === 'MOVE') {
                this.ctx.moveTo(this.dict['x1'], this.dict['y1']);
            }
            else if (this.command === 'LINE') {
                this.ctx.lineTo(this.dict['x1'], this.dict['y1']);
            }
            else if (this.command === 'QUAD') {
                this.ctx.quadraticCurveTo(this.dict['x1'], this.dict['y1'], this.dict['x2'], this.dict['y2']);
            }
            else if (this.command === 'CURVE') {
                this.ctx.bezierCurveTo(this.dict['x1'], this.dict['y1'], this.dict['x2'], this.dict['y2'], this.dict['x3'], this.dict['y3']);
            }
        }
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fill();
                break;
            case paint.style.STROKE:
                this.ctx.stroke();
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fill();
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
    }
    draw_path2(path, x_offset, y_offset, paint) {
        x_offset = (global.CONSTANTS.ZERO_PT_FIVE + x_offset) >> global.CONSTANTS.ZERO;
        y_offset = (global.CONSTANTS.ZERO_PT_FIVE + y_offset) >> global.CONSTANTS.ZERO;
        this.apply_paint(paint, false);
        this.ctx.translate(x_offset, y_offset);
        for (var i = 0; i < path.path_2d.length; i++) {
            this.dict = path.path_2d[i];
            this.command = this.dict['command'];
            if (this.command === 'MOVE') {
                this.ctx.moveTo(this.dict['x1'], this.dict['y1']);
            }
            else if (this.command === 'LINE') {
                this.ctx.lineTo(this.dict['x1'], this.dict['y1']);
            }
            else if (this.command === 'QUAD') {
                this.ctx.quadraticCurveTo(this.dict['x1'], this.dict['y1'], this.dict['x2'], this.dict['y2']);
            }
            else if (this.command === 'CURVE') {
                this.ctx.bezierCurveTo(this.dict['x1'], this.dict['y1'], this.dict['x2'], this.dict['y2'], this.dict['x3'], this.dict['y3']);
            }
        }
        this.ctx.translate(-x_offset, -y_offset);
        switch (paint.paint_style) {
            case paint.style.FILL:
                this.ctx.fill();
                break;
            case paint.style.STROKE:
                this.ctx.stroke();
                break;
            case paint.style.FILL_AND_STROKE:
                this.ctx.fill();
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
    }
    rotate(x, y, angle) {
        this.r_theta = ((global.CONSTANTS.ZERO_PT_FIVE + angle) >> global.CONSTANTS.ZERO) * global.CONSTANTS.PI_DIV_180;
        this.transform_var_1 = global.utils.sine(this.r_theta);
        this.transform_var_2 = global.utils.cosine(this.r_theta);
        this.r_x = (global.CONSTANTS.ZERO_PT_FIVE + x) >> global.CONSTANTS.ZERO;
        this.r_y = (global.CONSTANTS.ZERO_PT_FIVE + y) >> global.CONSTANTS.ZERO;
        this.ctx.transform(this.transform_var_2, this.transform_var_1, -this.transform_var_1, this.transform_var_2, this.r_x, this.r_y);
        this.ctx.translate(-this.r_x, -this.r_y);
    }
    restore() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    clear(_surface) {
        this.ctx.clearRect(0, 0, (_surface.width + global.CONSTANTS.ZERO_PT_FIVE) >> global.CONSTANTS.ZERO, (_surface.height + global.CONSTANTS.ZERO_PT_FIVE) >> global.CONSTANTS.ZERO);
    }
    clear_xywh(x, y, w, h) {
        this.ctx.clearRect((x - this.padding + global.CONSTANTS.ZERO_PT_FIVE) >> global.CONSTANTS.ZERO, (y - this.padding + global.CONSTANTS.ZERO_PT_FIVE) >> global.CONSTANTS.ZERO, ((w + this.padding + global.CONSTANTS.ZERO_PT_FIVE) << 1) >> global.CONSTANTS.ZERO, ((h + this.padding + global.CONSTANTS.ZERO_PT_FIVE) << 1) >> global.CONSTANTS.ZERO);
    }
    release() {
        this.general_path.reset();
        this.cache = [];
        this.dict = global.CONSTANTS.NULL;
        this.restore();
    }
}
