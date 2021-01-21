'use strict';
class VoltageControlledResistorSymbol {
    constructor(rect, index, page) {
        this.index = index;
        this.page = page;
        this.bounds = new RectF(0, 0, 0, 0);
        if (global.not_null(rect)) {
            this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        }
        this.p1 = new PointF(this.bounds.left, this.bounds.get_center_y());
        this.p2 = new PointF(this.bounds.get_center_x(), this.bounds.get_center_y() - (this.bounds.get_width() >> 1));
        this.p3 = new PointF(this.bounds.right, this.bounds.get_center_y());
        this.vcr_0 = new PointF(0, 0);
        this.vcr_1 = new PointF(0, 0);
        this.vcr_2 = new PointF(0, 0);
        this.vcr_3 = new PointF(0, 0);
        this.vcr_4 = new PointF(0, 0);
        this.vcr_6 = new PointF(0, 0);
        this.vcr_5 = new PointF(0, 0);
        this.vcr_7 = new PointF(0, 0);
        this.vcr_8 = new PointF(0, 0);
        this.vcr_9 = new PointF(0, 0);
        this.vcr_10 = new PointF(0, 0);
        this.vcr_11 = new PointF(0, 0);
        this.vcr_12 = new PointF(0, 0);
        this.vcr_13 = new PointF(0, 0);
        this.vcr_14 = new PointF(0, 0);
        this.vcr_15 = new PointF(0, 0);
        this.vcr_16 = new PointF(0, 0);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.theta_m90 = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
        this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
        this.x_space = this.bounds.get_width() >> 2;
        this.y_space = this.bounds.get_height() >> 2;
        this.connect1_x = 0;
        this.connect1_y = 0;
        this.connect2_x = 0;
        this.connect2_y = 0;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.point_paint = new Paint();
        this.point_paint.set_paint_style(this.point_paint.style.FILL);
        this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
        this.point_paint.set_paint_join(this.point_paint.join.MITER);
        this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.point_paint.set_font(global.DEFAULT_FONT);
        this.point_paint.set_alpha(255);
        this.point_paint.set_paint_align(this.point_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        this.text_background_paint = new Paint();
        this.text_background_paint.set_paint_style(this.text_background_paint.style.FILL);
        this.text_background_paint.set_paint_cap(this.text_background_paint.cap.ROUND);
        this.text_background_paint.set_paint_join(this.text_background_paint.join.MITER);
        this.text_background_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.text_background_paint.set_color(global.GENERAL_HOVER_COLOR);
        this.text_background_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.text_background_paint.set_font(global.DEFAULT_FONT);
        this.text_background_paint.set_alpha(255);
        this.text_background_paint.set_paint_align(this.text_background_paint.align.CENTER);
        this.build_element();
        this.FLAG_ADD_ELEMENT = false;
        this.TAG = language_manager.TAG_VCR;
        this.DRAW_TAG = false;
        this.text_bounds = new RectF(0, 0, 0, 0);
        this.HEIGHT_RATIO = 0.35;
        this.line_buffer = [];
        this.circle_buffer = [];
    }
    update() {
        if (this.FLAG_ADD_ELEMENT) {
            if (workspace.bounds.contains_xywh(global.mouse_x, global.mouse_y, workspace.bounds.get_width() - 4.5 * global.node_space_x, workspace.bounds.get_height() - 4.5 * global.node_space_y) &&
                !this.bounds.contains_xy(global.mouse_x, global.mouse_y)) {
                shortcut_manager.TEMP_HISTORY_SNAPSHOT = engine_functions.history_snapshot();
                global.SIGNAL_HISTORY_LOCK = true;
                engine_functions.add_vcr();
                this.FLAG_ADD_ELEMENT = false;
            }
        }
    }
    mouse_down(page, width, height) {
        if (this.page === page) {
            if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
                if (!this.FLAG_ADD_ELEMENT) {
                    this.FLAG_ADD_ELEMENT = true;
                    global.SIGNAL_ADD_ELEMENT = true;
                    global.component_touched = true;
                }
            }
        }
    }
    mouse_move(page, width, height) {
        if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height) && !global.MOBILE_MODE) {
            this.DRAW_TAG = true;
        }
        else {
            this.DRAW_TAG = false;
        }
        if (this.page === page) {
        }
    }
    mouse_up(page, width, height) {
        if (this.page === page) {
            if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
            }
            this.FLAG_ADD_ELEMENT = false;
            global.SIGNAL_ADD_ELEMENT = false;
        }
    }
    build_element() {
        let cache_0 = 0.66 * this.x_space;
        let cache_1 = 0.66 * this.y_space;
        let cache_2 = 0.33 * this.x_space;
        let cache_3 = 0.33 * this.y_space;
        let cache_4 = 0.667 * this.x_space;
        let cache_5 = 0.667 * this.y_space;
        let cache_6 = 0.5 * this.x_space;
        let cache_7 = 0.5 * this.y_space;
        let cache_8 = this.x_space;
        let cache_9 = this.y_space;
        this.connect1_x = this.c_x - cache_8 * global.cosine(this.theta);
        this.connect1_y = this.c_y - cache_9 * global.sine(this.theta);
        this.connect2_x = this.c_x + cache_8 * global.cosine(this.theta);
        this.connect2_y = this.c_y + cache_9 * global.sine(this.theta);
        this.vcr_4.x = this.c_x - cache_0 * global.cosine(this.theta) + (cache_8 >> 1) * global.cosine(this.theta_m90);
        this.vcr_4.y = this.c_y - cache_1 * global.sine(this.theta) + (cache_9 >> 1) * global.sine(this.theta_m90);
        this.vcr_5.x = this.c_x + (cache_8 >> 1) * global.cosine(this.theta_m90);
        this.vcr_5.y = this.c_y + (cache_9 >> 1) * global.sine(this.theta_m90);
        this.vcr_6.x = this.c_x - cache_2 * global.cosine(this.theta) + (cache_8 >> 1) * global.cosine(Math.PI + this.theta_m90);
        this.vcr_6.y = this.c_y - cache_3 * global.sine(this.theta) + (cache_9 >> 1) * global.sine(Math.PI + this.theta_m90);
        this.vcr_7.x = this.c_x + cache_2 * global.cosine(this.theta) + (cache_8 >> 1) * global.cosine(Math.PI + this.theta_m90);
        this.vcr_7.y = this.c_y + cache_3 * global.sine(this.theta) + (cache_9 >> 1) * global.sine(Math.PI + this.theta_m90);
        this.vcr_8.x = this.c_x + cache_0 * global.cosine(this.theta) + (cache_8 >> 1) * global.cosine(this.theta_m90);
        this.vcr_8.y = this.c_y + cache_1 * global.sine(this.theta) + (cache_9 >> 1) * global.sine(this.theta_m90);
        this.vcr_9.x = this.c_x + cache_8 * global.cosine(this.theta) + cache_4 * global.cosine(this.theta_m90);
        this.vcr_9.y = this.c_y + cache_9 * global.sine(this.theta) + cache_5 * global.sine(this.theta_m90);
        this.vcr_10.x = this.c_x - cache_8 * global.cosine(this.theta) + cache_4 * global.cosine(this.theta_m90);
        this.vcr_10.y = this.c_y - cache_9 * global.sine(this.theta) + cache_5 * global.sine(this.theta_m90);
        this.vcr_11.x = this.c_x + cache_8 * global.cosine(this.theta) + cache_4 * global.cosine(Math.PI + this.theta_m90);
        this.vcr_11.y = this.c_y + cache_9 * global.sine(this.theta) + cache_5 * global.sine(Math.PI + this.theta_m90);
        this.vcr_12.x = this.c_x - cache_8 * global.cosine(this.theta) + cache_4 * global.cosine(Math.PI + this.theta_m90);
        this.vcr_12.y = this.c_y - cache_9 * global.sine(this.theta) + cache_5 * global.sine(Math.PI + this.theta_m90);
        this.vcr_0.x = this.connect1_x + cache_8 * global.cosine(this.theta) + cache_6 * global.cosine(this.theta_m90);
        this.vcr_0.y = this.connect1_y + cache_9 * global.sine(this.theta) + cache_7 * global.sine(this.theta_m90);
        this.vcr_13.x = this.p1.x + 1.5 * cache_8 * global.cosine(this.theta - global.PI_DIV_4);
        this.vcr_13.y = this.p1.y + 1.5 * cache_9 * global.sine(this.theta - global.PI_DIV_4);
        this.vcr_14.x = this.p3.x - 1.5 * cache_8 * global.cosine(this.theta - global.PI_DIV_4);
        this.vcr_14.y = this.p3.y - 1.5 * cache_9 * global.sine(this.theta - global.PI_DIV_4);
        this.theta = global.retrieve_angle_radian(this.vcr_14.x - this.vcr_13.x, this.vcr_14.y - this.vcr_13.y);
        this.vcr_15.x = this.vcr_14.x - 0.4 * cache_8 * global.cosine(this.theta + global.PI_DIV_6);
        this.vcr_15.y = this.vcr_14.y - 0.4 * cache_9 * global.sine(this.theta + global.PI_DIV_6);
        this.vcr_16.x = this.vcr_14.x - 0.4 * cache_8 * global.cosine(this.theta - global.PI_DIV_6);
        this.vcr_16.y = this.vcr_14.y - 0.4 * cache_9 * global.sine(this.theta - global.PI_DIV_6);
        this.theta = global.retrieve_angle_radian(-(this.c_x - this.p2.x), -(this.c_y - this.p2.y));
        this.vcr_1.x = this.p2.x + 0.8 * cache_8 * global.cosine(this.phi);
        this.vcr_1.y = this.p2.y + 0.8 * cache_9 * global.sine(this.phi);
        this.vcr_2.x = this.vcr_1.x + 0.4 * cache_8 * global.cosine(this.theta - global.PI_DIV_6);
        this.vcr_2.y = this.vcr_1.y + 0.4 * cache_9 * global.sine(this.theta - global.PI_DIV_6);
        this.vcr_3.x = this.vcr_1.x + 0.4 * cache_8 * global.cosine(this.theta + global.PI_DIV_6);
        this.vcr_3.y = this.vcr_1.y + 0.4 * cache_9 * global.sine(this.theta + global.PI_DIV_6);
        this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
    }
    resize(rect) {
        this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = this.bounds.get_width() >> 2;
        this.y_space = this.bounds.get_height() >> 2;
        this.p1.set_point(this.bounds.left, this.bounds.get_center_y());
        this.p2.set_point(this.bounds.get_center_x(), this.bounds.get_center_y() - (this.bounds.get_width() >> 1));
        this.p3.set_point(this.bounds.right, this.bounds.get_center_y());
        this.theta_m90 = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
        this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
        this.build_element();
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    }
    recolor() {
        if (this.FLAG_ADD_ELEMENT) {
            this.line_paint.set_color(global.SELECTED_COLOR);
            this.point_paint.set_color(global.SELECTED_COLOR);
            this.text_paint.set_color(global.SELECTED_COLOR);
        }
        else {
            this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
            this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
            this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        }
    }
    draw_symbol(canvas, page) {
        this.recolor();
        if (this.page === page) {
            let indexer = 0;
            this.circle_buffer = [];
            this.line_buffer = [];
            this.line_buffer[indexer++] = Array(this.connect1_x, this.connect1_y, this.vcr_4.x, this.vcr_4.y);
            this.line_buffer[indexer++] = Array(this.vcr_4.x, this.vcr_4.y, this.vcr_6.x, this.vcr_6.y);
            this.line_buffer[indexer++] = Array(this.vcr_6.x, this.vcr_6.y, this.vcr_5.x, this.vcr_5.y);
            this.line_buffer[indexer++] = Array(this.vcr_5.x, this.vcr_5.y, this.vcr_7.x, this.vcr_7.y);
            this.line_buffer[indexer++] = Array(this.vcr_7.x, this.vcr_7.y, this.vcr_8.x, this.vcr_8.y);
            this.line_buffer[indexer++] = Array(this.vcr_8.x, this.vcr_8.y, this.connect2_x, this.connect2_y);
            this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
            this.line_buffer[indexer++] = Array(this.p3.x, this.p3.y, this.connect2_x, this.connect2_y);
            this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.vcr_1.x, this.vcr_1.y);
            this.line_buffer[indexer++] = Array(this.vcr_2.x, this.vcr_2.y, this.vcr_1.x, this.vcr_1.y);
            this.line_buffer[indexer++] = Array(this.vcr_3.x, this.vcr_3.y, this.vcr_1.x, this.vcr_1.y);
            this.line_buffer[indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_13.x, this.vcr_13.y);
            this.line_buffer[indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_15.x, this.vcr_15.y);
            this.line_buffer[indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_16.x, this.vcr_16.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            indexer = 0;
            this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.CANVAS_STROKE_WIDTH_2);
            this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.CANVAS_STROKE_WIDTH_2);
            this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.CANVAS_STROKE_WIDTH_2);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            if (this.DRAW_TAG && !global.SIGNAL_ADD_ELEMENT) {
                this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
                this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.HEIGHT_RATIO * this.bounds.get_height();
                this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
                this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.HEIGHT_RATIO * this.bounds.get_height();
                canvas.draw_rect2(this.text_bounds, this.text_background_paint);
                canvas.draw_text(this.TAG, this.bounds.get_center_x(), this.text_bounds.get_center_y(), this.text_paint);
            }
        }
    }
}
