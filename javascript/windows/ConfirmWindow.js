'use strict';
class ConfirmWindow {
    constructor() {
        this.PADDING = 0.025;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_5);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(paint.style.FILL);
        this.bounds_paint.set_paint_cap(paint.cap.ROUND);
        this.bounds_paint.set_paint_join(paint.join.ROUND);
        this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.bounds_paint.set_color(global.COLORS.GENERAL_FILL_COLOR);
        this.bounds_paint.set_text_size(global.variables.canvas_text_size_5);
        this.bounds_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.bounds_paint.set_alpha(255);
        this.bounds_paint.set_paint_align(paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(paint.style.FILL);
        this.fill_paint.set_paint_cap(paint.cap.ROUND);
        this.fill_paint.set_paint_join(paint.join.ROUND);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
        this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(paint.align.CENTER);
        this.yes_paint = new Paint();
        this.yes_paint.set_paint_style(paint.style.FILL);
        this.yes_paint.set_paint_cap(paint.cap.ROUND);
        this.yes_paint.set_paint_join(paint.join.ROUND);
        this.yes_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.yes_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        this.yes_paint.set_text_size(global.variables.canvas_text_size_5);
        this.yes_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.yes_paint.set_alpha(255);
        this.yes_paint.set_paint_align(paint.align.CENTER);
        this.no_paint = new Paint();
        this.no_paint.set_paint_style(paint.style.FILL);
        this.no_paint.set_paint_cap(paint.cap.ROUND);
        this.no_paint.set_paint_join(paint.join.ROUND);
        this.no_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.no_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        this.no_paint.set_text_size(global.variables.canvas_text_size_5);
        this.no_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.no_paint.set_alpha(255);
        this.no_paint.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        if (MOBILE_MODE) {
            this.text_paint.set_text_size(0.75 * global.variables.canvas_text_size_6);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        }
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(paint.align.CENTER);
        if (MOBILE_MODE) {
            this.width = view_port.view_width * 0.175;
            this.height = view_port.view_height * 0.13125;
        }
        else {
            this.width = view_port.view_width * 0.1;
            this.height = view_port.view_height * 0.075;
        }
        this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        let padding = this.PADDING * this.bounds.get_width();
        let height = (this.bounds.get_height() - 2 * padding) * 0.3571;
        this.option_0 = new RectF(this.bounds.left + padding, this.bounds.bottom - padding - height, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
        this.option_1 = new RectF(this.bounds.get_center_x() + padding * 0.5, this.bounds.bottom - padding - height, this.bounds.right - padding, this.bounds.bottom - padding);
        this.first_touch_x = 0;
        this.first_touch_y = 0;
    }
    mouse_down() {
        if (global.flags.flag_remove_all) {
            this.first_touch_x = global.variables.mouse_x;
            this.first_touch_y = global.variables.mouse_y;
        }
    }
    mouse_move() {
        if (global.flags.flag_remove_all) {
            if (!MOBILE_MODE) {
                this.hover();
            }
        }
    }
    mouse_up() {
        if (global.flags.flag_remove_all) {
            if (!global.variables.mouse_keyboard_lock) {
                if (!this.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && !this.bounds.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    menu_bar.handle_remove_all_flag(!global.flags.flag_remove_all);
                    global.variables.component_touched = true;
                }
                else if (this.option_0.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_0.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    engine_functions.clear_all_elements();
                    scope_manager.clear_entries();
                    graph_window.reset();
                    global.variables.history['packet'].push(engine_functions.history_snapshot());
                    menu_bar.handle_remove_all_flag(!global.flags.flag_remove_all);
                    global.variables.user_file.title = 'untitled';
                    global.variables.component_touched = true;
                    bottom_menu.resize_bottom_menu();
                }
                else if (this.option_1.contains_xy(global.variables.mouse_x, global.variables.mouse_y) && this.option_1.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    menu_bar.handle_remove_all_flag(!global.flags.flag_remove_all);
                    global.variables.component_touched = true;
                }
            }
        }
    }
    key_down(key_event) {
        if (global.flags.flag_remove_all) {
            if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ENTER || key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE) {
                menu_bar.handle_remove_all_flag(!global.flags.flag_remove_all);
                global.variables.component_touched = true;
            }
        }
    }
    hover() {
        if (this.option_0.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
            this.yes_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
        }
        else {
            this.yes_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        }
        if (this.option_1.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
            this.no_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
        }
        else {
            this.no_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        }
    }
    resize_window() {
        if (MOBILE_MODE) {
            this.width = view_port.view_width * 0.175;
            this.height = view_port.view_height * 0.13125;
        }
        else {
            this.width = view_port.view_width * 0.1;
            this.height = view_port.view_height * 0.075;
        }
        this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        let padding = this.PADDING * this.bounds.get_width();
        let height = (this.bounds.get_height() - 2 * padding) * 0.3571;
        this.option_0.set_bounds(this.bounds.left + padding, this.bounds.bottom - padding - height, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
        this.option_1.set_bounds(this.bounds.get_center_x() + padding * 0.5, this.bounds.bottom - padding - height, this.bounds.right - padding, this.bounds.bottom - padding);
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.line_paint.set_text_size(global.variables.canvas_text_size_5);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        if (MOBILE_MODE) {
            this.text_paint.set_text_size(0.75 * global.variables.canvas_text_size_6);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        }
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
        this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.bounds_paint.set_text_size(global.variables.canvas_text_size_5);
    }
    draw_window(canvas) {
        if (global.flags.flag_remove_all) {
            if (!MOBILE_MODE) {
                canvas.draw_color2(global.COLORS.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
            }
            canvas.draw_rect2(this.bounds, this.bounds_paint);
            canvas.draw_text(language_manager.CONFIRM_REMOVE_ALL[global.CONSTANTS.LANGUAGES[global.variables.language_index]], this.bounds.get_center_x(), this.bounds.top + this.bounds.get_height() * 0.33, this.text_paint);
            canvas.draw_rect2(this.option_0, this.yes_paint);
            canvas.draw_text(language_manager.CONFIRM_YES[global.CONSTANTS.LANGUAGES[global.variables.language_index]], this.option_0.get_center_x(), this.option_0.get_center_y(), this.text_paint);
            canvas.draw_rect2(this.option_1, this.no_paint);
            canvas.draw_text(language_manager.CONFIRM_NO[global.CONSTANTS.LANGUAGES[global.variables.language_index]], this.option_1.get_center_x(), this.option_1.get_center_y(), this.text_paint);
        }
    }
}
