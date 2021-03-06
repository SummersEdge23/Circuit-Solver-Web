'use strict';
class OnScreenKeyboard {
    constructor() {
        this.KEYBOARD_MAX_KEYS = 67;
        this.bounds = new RectF(0, 0, 0, 0);
        this.height_ratio = 0.5;
        this.bounds.left = view_port.left;
        this.bounds.right = view_port.right;
        this.bounds.top = view_port.bottom - view_port.view_height * this.height_ratio;
        this.bounds.bottom = view_port.bottom;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(1.5 * global.variables.canvas_stroke_width_2);
        this.line_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_5);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(paint.style.FILL);
        this.bounds_paint.set_paint_cap(paint.cap.ROUND);
        this.bounds_paint.set_paint_join(paint.join.ROUND);
        this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.bounds_paint.set_color(global.COLORS.GENERAL_INPUT_COLOR);
        this.bounds_paint.set_text_size(global.variables.canvas_text_size_5);
        this.bounds_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.bounds_paint.set_alpha(255);
        this.bounds_paint.set_paint_align(paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(paint.style.FILL);
        this.fill_paint.set_paint_cap(paint.cap.ROUND);
        this.fill_paint.set_paint_join(paint.join.ROUND);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
        this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(paint.align.CENTER);
        this.fill_paint_alt = new Paint();
        this.fill_paint_alt.set_paint_style(paint.style.FILL);
        this.fill_paint_alt.set_paint_cap(paint.cap.ROUND);
        this.fill_paint_alt.set_paint_join(paint.join.ROUND);
        this.fill_paint_alt.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint_alt.set_color(global.COLORS.GENERAL_BLACK_COLOR);
        this.fill_paint_alt.set_text_size(global.variables.canvas_text_size_5);
        this.fill_paint_alt.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint_alt.set_alpha(255);
        this.fill_paint_alt.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(paint.align.CENTER);
        this.flag_caps_lock = false;
        this.flag_shift = false;
        this.flag_enter = false;
        this.cap_ref = 0;
        this.LETTER_ROW_1 = 'qwertyuiop';
        this.LETTER_ROW_2 = 'asdfghjkl';
        this.LETTER_ROW_3 = 'zxcvbnm';
        this.alt_1_ref = 0;
        this.alt_2_ref = 0;
        this.exit_ref = 0;
        this.tab_ref = 0;
        this.backspace_ref = 0;
        this.shift_1_ref = 0;
        this.enter_ref = 0;
        this.ctrl_1_ref = 0;
        this.ctrl_2_ref = 0;
        this.shift_2_ref = 0;
        this.KEYBOARD_LETTER_REF = [];
        this.KEYBOARD_SPECIAL_REF = [];
        this.KEYBOARD_MAPPING = [];
        this.KEYBOARD_INCREMENT_AT = [];
        this.KEYBOARD_BLOCK_EXPAND = [];
        this.KEYBOARD_INCREMENT_AT.push(14);
        this.KEYBOARD_INCREMENT_AT.push(29);
        this.KEYBOARD_INCREMENT_AT.push(42);
        this.KEYBOARD_INCREMENT_AT.push(55);
        this.KEYBOARD_EXPAND_FORMAT = {
            Id: null,
            Factor: null
        };
        this.KEYBOARD_EXPAND_FORMAT['Id'] = 14;
        this.KEYBOARD_EXPAND_FORMAT['Factor'] = 1.5;
        this.KEYBOARD_BLOCK_EXPAND.push(global.utils.copy(this.KEYBOARD_EXPAND_FORMAT));
        this.KEYBOARD_EXPAND_FORMAT['Id'] = 15;
        this.KEYBOARD_EXPAND_FORMAT['Factor'] = 1.5;
        this.KEYBOARD_BLOCK_EXPAND.push(global.utils.copy(this.KEYBOARD_EXPAND_FORMAT));
        this.KEYBOARD_EXPAND_FORMAT['Id'] = 30;
        this.KEYBOARD_EXPAND_FORMAT['Factor'] = 2.0;
        this.KEYBOARD_BLOCK_EXPAND.push(global.utils.copy(this.KEYBOARD_EXPAND_FORMAT));
        this.KEYBOARD_EXPAND_FORMAT['Id'] = 42;
        this.KEYBOARD_EXPAND_FORMAT['Factor'] = 2.5;
        this.KEYBOARD_BLOCK_EXPAND.push(global.utils.copy(this.KEYBOARD_EXPAND_FORMAT));
        this.KEYBOARD_EXPAND_FORMAT['Id'] = 43;
        this.KEYBOARD_EXPAND_FORMAT['Factor'] = 2.5;
        this.KEYBOARD_BLOCK_EXPAND.push(global.utils.copy(this.KEYBOARD_EXPAND_FORMAT));
        this.KEYBOARD_EXPAND_FORMAT['Id'] = 55;
        this.KEYBOARD_EXPAND_FORMAT['Factor'] = 2.0;
        this.KEYBOARD_BLOCK_EXPAND.push(global.utils.copy(this.KEYBOARD_EXPAND_FORMAT));
        this.KEYBOARD_EXPAND_FORMAT['Id'] = 60;
        this.KEYBOARD_EXPAND_FORMAT['Factor'] = 5.5;
        this.KEYBOARD_BLOCK_EXPAND.push(global.utils.copy(this.KEYBOARD_EXPAND_FORMAT));
        this.KEYBOARD_KEYS = [];
        this.flag_key_down = false;
        this.flag_key_up = false;
        this.engineering_keyboard_mode = false;
        this.ENGINEERING_KEYBOARD_FILTER = /[-.kmu0123456789MnGpf]/;
        this.FILE_NAME_KEYBOARD_FILTER = /[-abcdefghijklmn opqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()]/;
        this.ENGINEERING_KEYBOARD_FILTER_INDEX = [];
        this.FILE_NAME_KEYBOARD_FILTER_INDEX = [];
        this.hover_index = -1;
        this.KEYBOARD_KEY_EVENT = {
            code: 'keyA'
        };
        this.line_buffer = [];
        this.load_keyboard();
    }
    load_keyboard() {
        this.KEYBOARD_KEYS.splice(0, this.KEYBOARD_KEYS.length);
        this.KEYBOARD_MAPPING.splice(0, this.KEYBOARD_MAPPING.length);
        this.KEYBOARD_LETTER_REF.splice(0, this.KEYBOARD_LETTER_REF.length);
        this.ENGINEERING_KEYBOARD_FILTER_INDEX.splice(0, this.ENGINEERING_KEYBOARD_FILTER_INDEX.length);
        this.FILE_NAME_KEYBOARD_FILTER_INDEX.splice(0, this.FILE_NAME_KEYBOARD_FILTER_INDEX.length);
        let DEFAULT_WIDTH = this.bounds.get_width() * 0.06452 - 1.0;
        let DEFAULT_HEIGHT = this.bounds.get_height() * 0.2;
        let Y_COUNTER = 0;
        let BLOCK_EXPAND_INDEX = 0;
        let INCREMENT_INDEX = 0;
        let IS_SPECIAL_KEY = false;
        let MULTIPLIER = 0;
        let SKIP_INDEX = 0;
        for (var i = 0; i < this.KEYBOARD_MAX_KEYS; i++) {
            IS_SPECIAL_KEY = false;
            if (i === 0) {
                this.KEYBOARD_KEYS.push(new RectF(this.bounds.left, this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT, this.bounds.left + DEFAULT_WIDTH, this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT));
            }
            else {
                if (BLOCK_EXPAND_INDEX < this.KEYBOARD_BLOCK_EXPAND.length) {
                    if (i === this.KEYBOARD_BLOCK_EXPAND[BLOCK_EXPAND_INDEX]['Id']) {
                        IS_SPECIAL_KEY = true;
                        MULTIPLIER = this.KEYBOARD_BLOCK_EXPAND[BLOCK_EXPAND_INDEX]['Factor'];
                        BLOCK_EXPAND_INDEX++;
                    }
                }
                if (!IS_SPECIAL_KEY) {
                    if (i !== SKIP_INDEX + 1 || i === 1) {
                        this.KEYBOARD_KEYS.push(new RectF(this.KEYBOARD_KEYS[i - 1].right, this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT, this.KEYBOARD_KEYS[i - 1].right + DEFAULT_WIDTH, this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT));
                    }
                    else {
                        this.KEYBOARD_KEYS.push(new RectF(this.bounds.left, this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT, this.bounds.left + DEFAULT_WIDTH, this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT));
                    }
                }
                else {
                    if (i !== SKIP_INDEX + 1 || i === 1) {
                        this.KEYBOARD_KEYS.push(new RectF(this.KEYBOARD_KEYS[i - 1].right, this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT, this.KEYBOARD_KEYS[i - 1].right + DEFAULT_WIDTH * MULTIPLIER, this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT));
                    }
                    else {
                        this.KEYBOARD_KEYS.push(new RectF(this.bounds.left, this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT, this.bounds.left + DEFAULT_WIDTH * MULTIPLIER, this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT));
                    }
                }
            }
            if (i === this.KEYBOARD_MAX_KEYS - 1) {
                this.KEYBOARD_KEYS[i].right = this.bounds.right;
            }
            if (INCREMENT_INDEX < this.KEYBOARD_INCREMENT_AT.length) {
                if (i === this.KEYBOARD_INCREMENT_AT[INCREMENT_INDEX]) {
                    this.KEYBOARD_KEYS[i].right = this.bounds.right;
                    SKIP_INDEX = this.KEYBOARD_INCREMENT_AT[INCREMENT_INDEX];
                    Y_COUNTER++;
                    INCREMENT_INDEX++;
                }
            }
        }
        this.KEYBOARD_MAPPING.push('ESC');
        this.KEYBOARD_MAPPING.push("'");
        for (var i = 1; i < 11; i++) {
            if (i !== 11 - 1) {
                this.KEYBOARD_MAPPING.push(i + '');
            }
            else {
                this.KEYBOARD_MAPPING.push(0 + '');
            }
        }
        this.KEYBOARD_MAPPING.push('-');
        this.KEYBOARD_MAPPING.push('=');
        this.KEYBOARD_MAPPING.push('<<');
        this.backspace_ref = this.KEYBOARD_MAPPING.length - 1;
        this.KEYBOARD_MAPPING.push('TAB');
        this.tab_ref = this.KEYBOARD_MAPPING.length - 1;
        for (var i = 0; i < this.LETTER_ROW_1.length; i++) {
            this.KEYBOARD_MAPPING.push(this.LETTER_ROW_1.charAt(i) + '');
            this.KEYBOARD_LETTER_REF.push(this.KEYBOARD_MAPPING.length - 1);
        }
        this.KEYBOARD_MAPPING.push('[');
        this.KEYBOARD_MAPPING.push(']');
        this.KEYBOARD_MAPPING.push("''");
        this.KEYBOARD_MAPPING.push('\\');
        this.KEYBOARD_MAPPING.push('CAPS');
        this.cap_ref = this.KEYBOARD_MAPPING.length - 1;
        for (var i = 0; i < this.LETTER_ROW_2.length; i++) {
            this.KEYBOARD_MAPPING.push(this.LETTER_ROW_2.charAt(i) + '');
            this.KEYBOARD_LETTER_REF.push(this.KEYBOARD_MAPPING.length - 1);
        }
        this.KEYBOARD_MAPPING.push(';');
        this.KEYBOARD_MAPPING.push("'");
        this.KEYBOARD_MAPPING.push('ENTER');
        this.enter_ref = this.KEYBOARD_MAPPING.length - 1;
        this.KEYBOARD_MAPPING.push('SHIFT');
        this.shift_1_ref = this.KEYBOARD_MAPPING.length - 1;
        for (var i = 0; i < this.LETTER_ROW_3.length; i++) {
            this.KEYBOARD_MAPPING.push(this.LETTER_ROW_3.charAt(i) + '');
            this.KEYBOARD_LETTER_REF.push(this.KEYBOARD_MAPPING.length - 1);
        }
        this.KEYBOARD_MAPPING.push(',');
        this.KEYBOARD_MAPPING.push('.');
        this.KEYBOARD_MAPPING.push('/');
        this.KEYBOARD_MAPPING.push('^');
        this.KEYBOARD_MAPPING.push('SHIFT');
        this.shift_2_ref = this.KEYBOARD_MAPPING.length - 1;
        this.KEYBOARD_MAPPING.push('FN');
        this.KEYBOARD_MAPPING.push('CTRL');
        this.ctrl_1_ref = this.KEYBOARD_MAPPING.length - 1;
        this.KEYBOARD_MAPPING.push('WIN');
        this.KEYBOARD_MAPPING.push('ALT');
        this.alt_1_ref = this.KEYBOARD_MAPPING.length - 1;
        this.KEYBOARD_MAPPING.push(language_manager.SPACE);
        this.KEYBOARD_MAPPING.push('ALT');
        this.alt_2_ref = this.KEYBOARD_MAPPING.length - 1;
        this.KEYBOARD_MAPPING.push('CTRL');
        this.ctrl_2_ref = this.KEYBOARD_MAPPING.length - 1;
        this.KEYBOARD_MAPPING.push('<');
        this.KEYBOARD_MAPPING.push('_');
        this.KEYBOARD_MAPPING.push('>');
        this.KEYBOARD_MAPPING.push('INS');
        this.exit_ref = this.KEYBOARD_MAPPING.length - 1;
        this.KEYBOARD_SPECIAL_REF.push(this.cap_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.backspace_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.shift_1_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.shift_2_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.enter_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.ctrl_1_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.alt_1_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.ctrl_2_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.alt_2_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.exit_ref);
        this.KEYBOARD_SPECIAL_REF.push(this.tab_ref);
        for (var i = 0; i < this.KEYBOARD_MAPPING.length; i++) {
            this.engineering_keyboard_mode = true;
            if (this.filter_keys(this.KEYBOARD_MAPPING[i])) {
                this.ENGINEERING_KEYBOARD_FILTER_INDEX.push(true);
            }
            else {
                this.ENGINEERING_KEYBOARD_FILTER_INDEX.push(false);
            }
            this.engineering_keyboard_mode = false;
            if (this.filter_keys(this.KEYBOARD_MAPPING[i])) {
                this.FILE_NAME_KEYBOARD_FILTER_INDEX.push(true);
            }
            else {
                this.FILE_NAME_KEYBOARD_FILTER_INDEX.push(false);
            }
        }
    }
    resize_keyboard() {
        if (MOBILE_MODE) {
            this.bounds.left = view_port.left;
            this.bounds.right = view_port.right;
            this.bounds.top = view_port.bottom - view_port.view_height * this.height_ratio;
            this.bounds.bottom = view_port.bottom;
            this.load_keyboard();
            this.line_paint.set_stroke_width(1.5 * global.variables.canvas_stroke_width_2);
            this.line_paint.set_text_size(global.variables.canvas_text_size_5);
            this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
            this.text_paint.set_text_size(global.variables.canvas_text_size_5);
            this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
            this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
            this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
            this.bounds_paint.set_text_size(global.variables.canvas_text_size_5);
            this.fill_paint_alt.set_stroke_width(global.variables.canvas_stroke_width_1);
            this.fill_paint_alt.set_text_size(global.variables.canvas_text_size_5);
        }
    }
    mouse_down() {
        if (MOBILE_MODE && (global.flags.flag_save_circuit || global.flags.flag_save_image || global.flags.flag_select_timestep || global.flags.flag_element_options_edit)) {
            this.flag_key_up = false;
            for (var i = 0; i < this.KEYBOARD_MAPPING.length; i++) {
                if (this.KEYBOARD_KEYS[i].contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                    this.flag_key_down = true;
                    this.hover_index = i;
                    break;
                }
            }
        }
    }
    mouse_move() {
        if (MOBILE_MODE && (global.flags.flag_save_circuit || global.flags.flag_save_image || global.flags.flag_select_timestep || global.flags.flag_element_options_edit) && this.flag_key_down) {
        }
    }
    mouse_up() {
        if (MOBILE_MODE && (global.flags.flag_save_circuit || global.flags.flag_save_image || global.flags.flag_select_timestep || global.flags.flag_element_options_edit) && this.flag_key_down) {
            this.hover_index = -1;
            let FOUND = false;
            for (var i = 0; i < this.KEYBOARD_MAPPING.length; i++) {
                if (this.KEYBOARD_KEYS[i].contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                    FOUND = true;
                    if (this.KEYBOARD_MAPPING[i].length === 1 && this.approve_keys(i)) {
                        this.KEYBOARD_KEY_EVENT.code = global.utils.key_to_code(this.KEYBOARD_MAPPING[i]);
                        global.flags.flag_key_down_event = true;
                        global.flags.flag_key_up_event = true;
                        global.events.key_down_event_queue.push({
                            event: global.utils.copy(this.KEYBOARD_KEY_EVENT),
                            alt: false,
                            shift: this.flag_shift,
                            ctrl: false,
                            caps: this.flag_caps_lock
                        });
                        break;
                    }
                    else {
                        if (this.KEYBOARD_MAPPING[i] === 'SHIFT') {
                            this.flag_shift = !this.flag_shift;
                            FOUND = false;
                            break;
                        }
                        else if (this.KEYBOARD_MAPPING[i] === 'CAPS') {
                            this.flag_caps_lock = !this.flag_caps_lock;
                            break;
                        }
                        else if (this.KEYBOARD_MAPPING[i] === 'ENTER') {
                            this.flag_enter = !this.flag_enter;
                            this.KEYBOARD_KEY_EVENT.code = global.KEY_CODES.KEY_CODE_ENTER;
                            global.flags.flag_key_down_event = true;
                            global.flags.flag_key_up_event = true;
                            global.events.key_down_event_queue.push({
                                event: global.utils.copy(this.KEYBOARD_KEY_EVENT),
                                alt: false,
                                shift: this.flag_shift,
                                ctrl: false,
                                caps: this.flag_caps_lock
                            });
                            break;
                        }
                        else if (this.KEYBOARD_MAPPING[i] === '<<') {
                            this.KEYBOARD_KEY_EVENT.code = global.KEY_CODES.KEY_CODE_BACKSPACE;
                            global.flags.flag_key_down_event = true;
                            global.flags.flag_key_up_event = true;
                            global.events.key_down_event_queue.push({
                                event: global.utils.copy(this.KEYBOARD_KEY_EVENT),
                                alt: false,
                                shift: this.flag_shift,
                                ctrl: false,
                                caps: this.flag_caps_lock
                            });
                            break;
                        }
                        else {
                        }
                    }
                }
            }
            if (FOUND === true) {
                if (this.flag_shift) {
                    this.flag_shift = false;
                }
            }
            this.flag_key_up = true;
        }
    }
    filter_keys(input) {
        let output = false;
        let filter;
        if (this.flag_shift || this.flag_caps_lock) {
            input = input.toUpperCase();
        }
        if (this.engineering_keyboard_mode === true) {
            filter = this.ENGINEERING_KEYBOARD_FILTER;
        }
        else {
            filter = this.FILE_NAME_KEYBOARD_FILTER;
        }
        output = filter.test(input);
        if (input === 'INS' || input === 'CTRL' || input === 'ALT' || input === 'WIN' || input === 'FN' || input === 'TAB' || input === 'ESC') {
            output = false;
        }
        return output || input === 'CAPS' || input === 'ENTER' || input === '<<' || input === 'SHIFT' || input === ' ';
    }
    approve_keys(index) {
        if (this.engineering_keyboard_mode === true) {
            return this.ENGINEERING_KEYBOARD_FILTER_INDEX[index];
        }
        else {
            return this.FILE_NAME_KEYBOARD_FILTER_INDEX[index];
        }
    }
    draw_keyboard(canvas) {
        if (MOBILE_MODE && (global.flags.flag_save_circuit || global.flags.flag_save_image || global.flags.flag_select_timestep || global.flags.flag_element_options_edit)) {
            if (global.flags.flag_element_options_edit === true || global.flags.flag_select_timestep === true) {
                if (global.variables.selected_type !== global.ELEMENT_TYPES.TYPE_NOTE && global.variables.selected_type !== global.ELEMENT_TYPES.TYPE_NET) {
                    this.engineering_keyboard_mode = true;
                }
                else {
                    if (global.flags.flag_element_options_edit) {
                        this.engineering_keyboard_mode = false;
                    }
                    else {
                        this.engineering_keyboard_mode = true;
                    }
                }
            }
            else {
                this.engineering_keyboard_mode = false;
            }
            canvas.draw_rect2(this.bounds, this.bounds_paint);
            let indexer = 0;
            for (var i = 0; i < this.KEYBOARD_MAPPING.length; i++) {
                this.line_buffer[indexer++] = Array(this.KEYBOARD_KEYS[i].left, this.KEYBOARD_KEYS[i].top, this.KEYBOARD_KEYS[i].left, this.KEYBOARD_KEYS[i].bottom);
                this.line_buffer[indexer++] = Array(this.KEYBOARD_KEYS[i].right, this.KEYBOARD_KEYS[i].top, this.KEYBOARD_KEYS[i].right, this.KEYBOARD_KEYS[i].bottom);
                if (this.engineering_keyboard_mode) {
                    if (this.ENGINEERING_KEYBOARD_FILTER_INDEX[i]) {
                        if (this.hover_index === i) {
                            canvas.draw_rect2(this.KEYBOARD_KEYS[i], this.fill_paint);
                        }
                        if (this.flag_shift || this.flag_caps_lock) {
                            if (this.KEYBOARD_MAPPING[i].toUpperCase() !== 'F' &&
                                this.KEYBOARD_MAPPING[i].toUpperCase() !== 'U' &&
                                this.KEYBOARD_MAPPING[i].toUpperCase() !== 'N' &&
                                this.KEYBOARD_MAPPING[i].toUpperCase() !== 'K' &&
                                this.KEYBOARD_MAPPING[i].toUpperCase() !== 'P') {
                                canvas.draw_text(this.KEYBOARD_MAPPING[i].toUpperCase(), this.KEYBOARD_KEYS[i].get_center_x(), this.KEYBOARD_KEYS[i].get_center_y(), this.text_paint);
                            }
                        }
                        else {
                            canvas.draw_text(this.KEYBOARD_MAPPING[i], this.KEYBOARD_KEYS[i].get_center_x(), this.KEYBOARD_KEYS[i].get_center_y(), this.text_paint);
                        }
                    }
                }
                else {
                    if (this.FILE_NAME_KEYBOARD_FILTER_INDEX[i]) {
                        if (this.hover_index === i) {
                            canvas.draw_rect2(this.KEYBOARD_KEYS[i], this.fill_paint);
                        }
                        if (this.flag_shift || this.flag_caps_lock) {
                            canvas.draw_text(this.KEYBOARD_MAPPING[i].toUpperCase(), this.KEYBOARD_KEYS[i].get_center_x(), this.KEYBOARD_KEYS[i].get_center_y(), this.text_paint);
                        }
                        else {
                            canvas.draw_text(this.KEYBOARD_MAPPING[i], this.KEYBOARD_KEYS[i].get_center_x(), this.KEYBOARD_KEYS[i].get_center_y(), this.text_paint);
                        }
                    }
                }
            }
            this.line_buffer[indexer++] = Array(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top);
            this.line_buffer[indexer++] = Array(this.bounds.left, this.bounds.bottom, this.bounds.right, this.bounds.bottom);
            this.line_buffer[indexer++] = Array(this.bounds.left, this.bounds.top, this.bounds.left, this.bounds.bottom);
            this.line_buffer[indexer++] = Array(this.bounds.right, this.bounds.top, this.bounds.right, this.bounds.bottom);
            this.line_buffer[indexer++] = Array(this.bounds.left, this.KEYBOARD_KEYS[0].bottom, this.bounds.right, this.KEYBOARD_KEYS[0].bottom);
            this.line_buffer[indexer++] = Array(this.bounds.left, this.KEYBOARD_KEYS[15].bottom, this.bounds.right, this.KEYBOARD_KEYS[15].bottom);
            this.line_buffer[indexer++] = Array(this.bounds.left, this.KEYBOARD_KEYS[30].bottom, this.bounds.right, this.KEYBOARD_KEYS[30].bottom);
            this.line_buffer[indexer++] = Array(this.bounds.left, this.KEYBOARD_KEYS[43].bottom, this.bounds.right, this.KEYBOARD_KEYS[43].bottom);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
        }
        if (this.flag_key_up) {
            this.flag_key_up = false;
            this.flag_key_down = false;
        }
    }
}
