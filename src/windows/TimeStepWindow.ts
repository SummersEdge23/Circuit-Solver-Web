'use strict';
class TimeStepWindow {
	public readonly TITLE_HEIGHT_RATIO: number;
	public readonly BUTTON_WIDTH_RATIO: number;
	public readonly BUTTON_HEIGHT_RATIO: number;
	public readonly PADDING: number;
	public line_paint: Paint;
	public point_paint: Paint;
	public text_paint: Paint;
	public hover_paint: Paint;
	public bounds_paint: Paint;
	public select_paint: Paint;
	public width: number;
	public height: number;
	public bounds: RectF;
	public title_bounds: Button;
	public okay_button: Button;
	public cancel_button: Button;
	public exit_button: Button;
	public input_button: Button;
	public cursor_position: number;
	public select_all: boolean;
	public offset_x: number;
	public offset_y: number;
	public window_anchored: boolean;
	public anchor_x: number;
	public anchor_y: number;
	public first_touch_x: number;
	public first_touch_y: number;
	public measured_text: number;
	public initial_cursor_down: number;
	public select_start: number;
	public select_end: number;
	public select_width: number;
	public select_offset_x: number;
	public mouse_down_flag: boolean;
	public ascending_flag: boolean;
	constructor() {
		this.TITLE_HEIGHT_RATIO = 0.25;
		this.BUTTON_WIDTH_RATIO = 0.3;
		this.BUTTON_HEIGHT_RATIO = 0.25;
		this.PADDING = 0.025;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(PAINT.style.STROKE);
		this.line_paint.set_paint_cap(PAINT.cap.ROUND);
		this.line_paint.set_paint_join(PAINT.join.MITER);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(PAINT.align.CENTER);
		this.point_paint = new Paint();
		this.point_paint.set_paint_style(PAINT.style.FILL);
		this.point_paint.set_paint_cap(PAINT.cap.ROUND);
		this.point_paint.set_paint_join(PAINT.join.MITER);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.point_paint.set_alpha(255);
		this.point_paint.set_paint_align(PAINT.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(PAINT.style.FILL);
		this.text_paint.set_paint_cap(PAINT.cap.ROUND);
		this.text_paint.set_paint_join(PAINT.join.MITER);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.text_paint.set_color(global.COLORS.GENERAL_YELLOW_COLOR);
		if (global.CONSTANTS.MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.text_paint.align.LEFT);
		this.hover_paint = new Paint();
		this.hover_paint.set_paint_style(PAINT.style.FILL);
		this.hover_paint.set_paint_cap(PAINT.cap.ROUND);
		this.hover_paint.set_paint_join(PAINT.join.MITER);
		this.hover_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
		this.hover_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
		this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
		this.hover_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.hover_paint.set_alpha(255);
		this.hover_paint.set_paint_align(PAINT.align.CENTER);
		this.bounds_paint = new Paint();
		this.bounds_paint.set_paint_style(PAINT.style.FILL);
		this.bounds_paint.set_paint_cap(PAINT.cap.ROUND);
		this.bounds_paint.set_paint_join(PAINT.join.MITER);
		this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.bounds_paint.set_color(global.COLORS.GENERAL_FILL_COLOR);
		this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
		this.bounds_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.bounds_paint.set_alpha(255);
		this.bounds_paint.set_paint_align(PAINT.align.CENTER);
		this.select_paint = new Paint();
		this.select_paint.set_paint_style(PAINT.style.FILL);
		this.select_paint.set_paint_cap(PAINT.cap.ROUND);
		this.select_paint.set_paint_join(PAINT.join.MITER);
		this.select_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
		this.select_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
		this.select_paint.set_text_size(global.variables.canvas_text_size_5);
		this.select_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.select_paint.set_alpha(64);
		this.select_paint.set_paint_align(PAINT.align.CENTER);
		if (global.CONSTANTS.MOBILE_MODE) {
			this.width = view_port.view_width * 0.2625;
			this.height = view_port.view_height * 0.15;
		} else {
			this.width = view_port.view_width * 0.15;
			this.height = view_port.view_height * 0.075;
		}
		this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
		this.title_bounds = new Button(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
		this.title_bounds.text = '';
		this.title_bounds.text_paint.set_paint_align(this.title_bounds.text_paint.align.LEFT);
		this.title_bounds.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.title_bounds.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.title_bounds.fill_paint.set_alpha(130);
		this.title_bounds.draw_stroke = false;
		this.title_bounds.draw_fill = true;
		this.title_bounds.draw_text = false;
		let padding: number = this.PADDING * this.bounds.get_width();
		let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
		let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
		this.okay_button = new Button(this.bounds.right - 2 * padding - 2 * width, this.bounds.bottom - height - padding, this.bounds.right - 2 * padding - width, this.bounds.bottom - padding);
		this.okay_button.text = '';
		this.okay_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.okay_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.okay_button.fill_paint.set_alpha(130);
		this.okay_button.draw_stroke = false;
		this.okay_button.draw_fill = true;
		this.cancel_button = new Button(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
		this.cancel_button.text = '';
		this.cancel_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.cancel_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.cancel_button.fill_paint.set_alpha(130);
		this.cancel_button.draw_stroke = false;
		this.cancel_button.draw_fill = true;
		this.exit_button = new Button(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
		this.exit_button.draw_stroke = true;
		this.exit_button.draw_fill = false;
		this.exit_button.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.input_button = new Button(this.title_bounds.left + padding, this.title_bounds.bottom + padding, this.cancel_button.right, this.okay_button.top - padding);
		this.input_button.text = global.utils.exponentiate_quickly(simulation_manager.time_step);
		this.input_button.fill_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.input_button.line_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.input_button.draw_stroke = true;
		this.input_button.draw_fill = true;
		this.input_button.draw_cursor = false;
		this.input_button.draw_text = false;
		this.input_button.text_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
		this.input_button.resize_paint();
		this.cursor_position = 0;
		this.select_all = false;
		this.offset_x = 0;
		this.offset_y = 0;
		this.window_anchored = true;
		this.anchor_x = 0;
		this.anchor_y = 0;
		this.first_touch_x = 0;
		this.first_touch_y = 0;
		this.measured_text = -1;
		this.initial_cursor_down = -1;
		this.select_start = -1;
		this.select_end = -1;
		this.select_width = -1;
		this.select_offset_x = -1;
		this.mouse_down_flag = false;
		this.ascending_flag = false;
	}
	mouse_down(): void {
		if (global.flags.flag_select_timestep) {
			if (
				this.title_bounds.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
				!this.exit_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y)
			) {
				this.anchor_x = global.variables.mouse_x - this.offset_x;
				this.anchor_y = global.variables.mouse_y - this.offset_y;
				this.window_anchored = false;
			}
			this.first_touch_x = global.variables.mouse_x;
			this.first_touch_y = global.variables.mouse_y;
			this.initial_cursor_down = this.insert_cursor(false, false);
			this.mouse_down_flag = true;
		}
	}
	mouse_move(): void {
		if (global.flags.flag_select_timestep) {
			if (!this.window_anchored) {
				this.offset_x = global.variables.mouse_x - this.anchor_x;
				this.offset_y = global.variables.mouse_y - this.anchor_y;
				if (this.bounds.right + this.offset_x >= view_port.right) {
					this.offset_x = view_port.right - this.bounds.right;
				}
				if (this.bounds.left + this.offset_x <= view_port.left) {
					this.offset_x = view_port.left - this.bounds.left;
				}
				if (this.bounds.top + this.offset_y <= view_port.top) {
					this.offset_y = view_port.top - this.bounds.top;
				}
				if (global.CONSTANTS.MOBILE_MODE) {
					if (this.bounds.bottom + this.offset_y >= on_screen_keyboard.bounds.top) {
						this.offset_y = on_screen_keyboard.bounds.top - this.bounds.bottom;
					}
				} else {
					if (this.bounds.bottom + this.offset_y >= view_port.bottom) {
						this.offset_y = view_port.bottom - this.bounds.bottom;
					}
				}
			} else {
				if (this.mouse_down_flag && this.initial_cursor_down !== -1) {
					this.insert_cursor(true, true);
				}
			}
		}
	}
	mouse_up(): void {
		if (global.flags.flag_select_timestep) {
			if (!global.variables.mouse_keyboard_lock) {
				if (this.window_anchored) {
					this.insert_cursor(true, false);
					this.initial_cursor_down = -1;
					if (
						!this.bounds.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						!this.bounds.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						if (global.CONSTANTS.MOBILE_MODE) {
							if (!on_screen_keyboard.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
								bottom_menu.handle_timestep_flag(!global.flags.flag_select_timestep);
								global.variables.component_touched = true;
							}
						} else {
							bottom_menu.handle_timestep_flag(!global.flags.flag_select_timestep);
							global.variables.component_touched = true;
						}
					} else if (
						this.okay_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.okay_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						bottom_menu.handle_timestep_flag(!global.flags.flag_select_timestep);
						global.variables.component_touched = true;
					} else if (
						this.cancel_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.cancel_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						bottom_menu.handle_timestep_flag(!global.flags.flag_select_timestep);
						global.variables.component_touched = true;
					} else if (
						this.exit_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.exit_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						bottom_menu.handle_timestep_flag(!global.flags.flag_select_timestep);
						global.variables.component_touched = true;
					} else if (
						this.input_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) &&
						this.input_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)
					) {
						if (this.select_all && !global.flags.mouse_double_click_event_flag) {
							this.select_all = false;
						}
					}
				} else {
					this.anchor_x = global.variables.mouse_x - this.offset_x;
					this.anchor_y = global.variables.mouse_y - this.offset_y;
				}
				this.window_anchored = true;
				this.mouse_down_flag = false;
			}
		}
	}
	insert_cursor(is_mouse_up: boolean, is_mouse_move: boolean): number {
		let min: number = this.input_button.get_center_x() - this.measured_text * 0.5;
		let max: number = this.input_button.get_center_x() + this.measured_text * 0.5;
		let remapped_x = global.variables.mouse_x - this.offset_x;
		let remapped_y = global.variables.mouse_y - this.offset_y;
		if (remapped_x <= min) {
			remapped_x = min;
		}
		if (remapped_x >= max) {
			remapped_x = max;
		}
		let width: number = max - min;
		let char_length: number = (this.input_button.text.substring(0, this.cursor_position) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length)).length;
		let percent: number = (remapped_x - min) / width;
		let insert_at: number = Math.ceil(percent * char_length);
		if (is_mouse_up && this.input_button.contains_xy(this.first_touch_x - this.offset_x, this.first_touch_y - this.offset_y)) {
			if (!is_mouse_move) {
				this.cursor_position = insert_at;
			}
			if (this.initial_cursor_down !== -1 && insert_at !== this.initial_cursor_down) {
				if (this.initial_cursor_down < insert_at) {
					this.ascending_flag = true;
				} else {
					this.ascending_flag = false;
				}
				this.select_start = Math.min(insert_at, this.initial_cursor_down);
				this.select_end = Math.max(insert_at, this.initial_cursor_down);
			} else {
				this.select_start = -1;
				this.select_end = -1;
			}
		}
		return insert_at;
	}
	key_down(key_event: KEY_EVENT_T): void {
		if (global.flags.flag_select_timestep) {
			this.handle_keyboard(key_event);
		}
	}
	key_up(): void {
		if (global.flags.flag_select_timestep) {
		}
	}
	handle_keyboard(key_event: KEY_EVENT_T): void {
		if (global.utils.is_valid_si_units(key_event) && key_event['event'].code !== global.KEY_CODES.KEY_CODE_DELETE && !key_event['ctrl']) {
			if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
				if (!this.select_all) {
					if (this.select_start !== -1 && this.select_end !== -1) {
						this.handle_partial_select();
					}
					this.input_button.text =
						this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
					if (this.cursor_position < this.input_button.text.length) {
						this.cursor_position++;
					}
				} else {
					this.input_button.text = '';
					this.cursor_position = 0;
					this.select_all = false;
					this.input_button.text =
						this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
					if (this.cursor_position < this.input_button.text.length) {
						this.cursor_position++;
					}
				}
			} else {
				if (this.select_all) {
					this.input_button.text = '';
					this.cursor_position = 0;
					this.select_all = false;
					this.input_button.text =
						this.input_button.text.substring(0, this.cursor_position) + global.utils.decode_key(key_event) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
					if (this.cursor_position < this.input_button.text.length) {
						this.cursor_position++;
					}
				}
			}
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_BACKSPACE && !key_event['ctrl']) {
			if (this.input_button.text.length > 0) {
				if (!this.select_all) {
					if (this.select_start === this.select_end) {
						this.select_start = -1;
						this.select_end = -1;
					}
					if (this.select_start !== -1 && this.select_end !== -1) {
						this.handle_partial_select();
					} else {
						this.input_button.text = this.input_button.text.substring(0, this.cursor_position - 1) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
						if (this.cursor_position > 0) {
							this.cursor_position--;
						}
					}
				} else {
					this.input_button.text = '';
					this.cursor_position = 0;
					this.select_all = false;
				}
			}
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_DELETE && !key_event['ctrl']) {
			if (this.input_button.text.length > 0) {
				if (!this.select_all) {
					if (this.select_start === this.select_end) {
						this.select_start = -1;
						this.select_end = -1;
					}
					if (this.select_start !== -1 && this.select_end !== -1) {
						this.handle_partial_select();
					} else {
						if (this.cursor_position < this.input_button.text.length) {
							this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + this.input_button.text.substring(this.cursor_position + 1, this.input_button.text.length);
						}
					}
				} else {
					this.input_button.text = '';
					this.cursor_position = 0;
					this.select_all = false;
				}
			}
		} else if ((key_event['event'].code === global.KEY_CODES.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODES.KEY_CODE_NUMPAD_MINUS) && !key_event['shift']) {
			if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
				if (!this.select_all) {
					if (this.select_start !== -1 && this.select_end !== -1) {
						this.handle_partial_select();
					}
					this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '-' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
					if (this.cursor_position < this.input_button.text.length) {
						this.cursor_position++;
					}
				} else {
					this.input_button.text = '';
					this.cursor_position = 0;
					this.select_all = false;
					this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '-' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
					if (this.cursor_position < this.input_button.text.length) {
						this.cursor_position++;
					}
				}
			}
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_PERIOD && !key_event['shift'] && !key_event['ctrl']) {
			if (this.input_button.text.length < global.CONSTANTS.MAX_TEXT_LENGTH) {
				if (!this.select_all) {
					if (this.select_start !== -1 && this.select_end !== -1) {
						this.handle_partial_select();
					}
					this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '.' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
					if (this.cursor_position < this.input_button.text.length) {
						this.cursor_position++;
					}
				} else {
					this.input_button.text = '';
					this.cursor_position = 0;
					this.select_all = false;
					this.input_button.text = this.input_button.text.substring(0, this.cursor_position) + '.' + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
					if (this.cursor_position < this.input_button.text.length) {
						this.cursor_position++;
					}
				}
			}
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ENTER && !key_event['ctrl']) {
			simulation_manager.time_step = string_operator.parse(this.input_button.text);
			bottom_menu.handle_timestep_flag(!global.flags.flag_select_timestep);
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_LEFT && !key_event['ctrl']) {
			if (key_event['shift'] === false) {
				this.select_start = -1;
				this.select_end = -1;
				if (this.cursor_position > 0) {
					this.cursor_position--;
					this.select_all = false;
				}
			} else {
				if (this.select_start === -1 && this.select_end === -1) {
					this.select_start = this.cursor_position - 1;
					this.select_end = this.cursor_position;
					if (this.select_start < 0) {
						this.select_start = 0;
						this.select_end = 0;
					}
					this.cursor_position = this.select_start;
					this.ascending_flag = false;
				} else {
					if (this.ascending_flag) {
						if (this.select_end > 0) {
							this.select_end--;
							this.cursor_position = this.select_end;
						}
					} else {
						if (this.select_start > 0) {
							this.select_start--;
							this.cursor_position = this.select_start;
						}
					}
				}
			}
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ARROW_RIGHT && !key_event['ctrl']) {
			if (key_event['shift'] === false) {
				this.select_start = -1;
				this.select_end = -1;
				if (this.cursor_position < this.input_button.text.length) {
					this.cursor_position++;
					this.select_all = false;
				}
			} else {
				if (this.select_start === -1 && this.select_end === -1) {
					this.select_start = this.cursor_position;
					this.select_end = this.cursor_position + 1;
					if (this.cursor_position >= this.input_button.text.length) {
						this.select_start = this.cursor_position;
						this.select_end = this.cursor_position;
					}
					this.cursor_position = this.select_end;
					this.ascending_flag = true;
				} else {
					if (this.ascending_flag) {
						if (this.select_end < this.input_button.text.length) {
							this.select_end++;
							this.cursor_position = this.select_end;
						}
					} else {
						if (this.select_start < this.input_button.text.length) {
							this.select_start++;
							this.cursor_position = this.select_start;
						}
					}
				}
			}
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_ESCAPE && !key_event['ctrl']) {
			bottom_menu.handle_timestep_flag(!global.flags.flag_select_timestep);
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_HOME) {
			if (key_event['shift'] === false) {
				this.select_start = -1;
				this.select_end = -1;
				this.cursor_position = 0;
				this.select_all = false;
			} else {
				if (this.select_start === -1 && this.select_end === -1) {
					this.select_all = false;
					this.select_start = 0;
					this.select_end = this.cursor_position;
					if (this.select_start < 0) {
						this.select_start = 0;
						this.select_end = 0;
					}
					this.cursor_position = this.select_start;
					this.ascending_flag = false;
				} else {
					if (this.ascending_flag) {
						this.select_all = false;
						if (this.select_end > 0) {
							this.select_end = 0;
							this.cursor_position = this.select_end;
						}
					} else {
						this.select_all = false;
						if (this.select_start > 0) {
							this.select_start = 0;
							this.cursor_position = this.select_start;
						}
					}
				}
			}
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_END && !key_event['ctrl']) {
			if (key_event['shift'] === false) {
				this.reset_cursor();
			} else {
				if (this.select_start === -1 && this.select_end === -1) {
					this.select_all = false;
					this.select_start = this.cursor_position;
					this.select_end = this.input_button.text.length;
					if (this.cursor_position >= this.input_button.text.length) {
						this.select_start = this.cursor_position;
						this.select_end = this.cursor_position;
					}
					this.cursor_position = this.select_end;
					this.ascending_flag = true;
				} else {
					if (this.ascending_flag) {
						this.select_all = false;
						if (this.select_end < this.input_button.text.length) {
							this.select_end = this.input_button.text.length;
							this.cursor_position = this.select_end;
						}
					} else {
						this.select_all = false;
						if (this.select_start < this.input_button.text.length) {
							this.select_start = this.input_button.text.length;
							this.cursor_position = this.select_start;
						}
					}
				}
			}
		} else if (key_event['event'].code === global.KEY_CODES.KEY_CODE_A && key_event['ctrl'] === true) {
			this.select_all = false;
			this.select_start = 0;
			this.ascending_flag = true;
			this.select_end = this.input_button.text.length;
			this.cursor_position = this.input_button.text.length;
		}
	}
	handle_partial_select(): void {
		if (this.select_start !== this.select_end) {
			let min: number = Math.min(this.select_start, this.select_end);
			let max: number = Math.max(this.select_start, this.select_end);
			this.input_button.text = this.input_button.text.substring(0, min) + this.input_button.text.substring(max, this.input_button.text.length);
			if (this.cursor_position > 0) {
				this.cursor_position = Math.min(min, max);
			}
		}
		this.select_start = -1;
		this.select_end = -1;
	}
	reset_cursor(): void {
		this.cursor_position = this.input_button.text.length;
		this.select_all = false;
		this.select_start = -1;
		this.select_end = -1;
	}
	double_click(): void {
		if (global.flags.mouse_double_click_event_flag) {
			if (this.input_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y)) {
				this.select_all = !this.select_all;
				if (this.select_all) {
					this.select_start = 0;
					this.ascending_flag = true;
					this.select_end = this.input_button.text.length;
					this.cursor_position = this.input_button.text.length;
				}
			}
		}
	}
	resize_window(): void {
		if (global.CONSTANTS.MOBILE_MODE) {
			this.width = view_port.view_width * 0.2625;
			this.height = view_port.view_height * 0.15;
		} else {
			this.width = view_port.view_width * 0.15;
			this.height = view_port.view_height * 0.075;
		}
		this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
		this.title_bounds.set_bounds(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
		this.title_bounds.resize_paint();
		let padding: number = this.PADDING * this.bounds.get_width();
		let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
		let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
		this.okay_button.set_bounds(this.bounds.right - 2 * padding - 2 * width, this.bounds.bottom - height - padding, this.bounds.right - 2 * padding - width, this.bounds.bottom - padding);
		this.okay_button.resize_paint();
		this.cancel_button.set_bounds(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
		this.cancel_button.resize_paint();
		this.exit_button.set_bounds(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
		this.exit_button.resize_paint();
		this.input_button.set_bounds(this.title_bounds.left + padding, this.title_bounds.bottom + padding, this.cancel_button.right, this.okay_button.top - padding);
		this.input_button.resize_paint();
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (global.CONSTANTS.MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.hover_paint.set_stroke_width(0.6 * global.variables.canvas_stroke_width_3);
		this.hover_paint.set_text_size(global.variables.canvas_text_size_5);
		this.select_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.select_paint.set_text_size(global.variables.canvas_text_size_4);
		this.reset_cursor();
		if (global.CONSTANTS.MOBILE_MODE) {
			if (this.bounds.bottom + this.offset_y >= on_screen_keyboard.bounds.top) {
				this.offset_y = -0.25 * view_port.view_height;
			}
		}
	}
	draw_window(canvas: GraphicsEngine): void {
		if (global.flags.flag_select_timestep) {
			if (!global.CONSTANTS.MOBILE_MODE) {
				canvas.draw_color2(global.COLORS.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
			}
			if (global.CONSTANTS.MOBILE_MODE) {
				if (this.bounds.bottom + this.offset_y >= on_screen_keyboard.bounds.top) {
					this.offset_y = on_screen_keyboard.bounds.top - this.bounds.bottom;
				}
			}
			this.title_bounds.text = language_manager.SET_TIME_STEP[global.CONSTANTS.LANGUAGES[global.variables.language_index]];
			this.okay_button.text = language_manager.OKAY[global.CONSTANTS.LANGUAGES[global.variables.language_index]];
			this.cancel_button.text = language_manager.CANCEL[global.CONSTANTS.LANGUAGES[global.variables.language_index]];
			canvas.draw_rect(this.bounds.left + this.offset_x, this.bounds.top + this.offset_y, this.bounds.right + this.offset_x, this.bounds.bottom + this.offset_y, this.bounds_paint);
			this.title_bounds.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
			this.title_bounds.draw_button_text(canvas, this.title_bounds.left + this.PADDING * this.title_bounds.get_width() + this.offset_x, this.title_bounds.get_center_y() + this.offset_y);
			if (this.okay_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) && this.window_anchored && !global.CONSTANTS.MOBILE_MODE) {
				this.okay_button.fill_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
				this.okay_button.fill_paint.set_alpha(255);
			} else {
				this.okay_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
				this.okay_button.fill_paint.set_alpha(130);
			}
			this.okay_button.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
			if (this.cancel_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) && this.window_anchored && !global.CONSTANTS.MOBILE_MODE) {
				this.cancel_button.fill_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
				this.cancel_button.fill_paint.set_alpha(255);
			} else {
				this.cancel_button.fill_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
				this.cancel_button.fill_paint.set_alpha(130);
			}
			this.cancel_button.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
			this.input_button.draw_button_dxdy(canvas, this.offset_x, this.offset_y);
			let text: string = this.input_button.text.substring(0, this.cursor_position) + this.input_button.text.substring(this.cursor_position, this.input_button.text.length);
			canvas.draw_text(text, this.input_button.get_center_x() + this.offset_x, this.input_button.get_center_y() + this.offset_y, this.input_button.text_paint);
			this.measured_text = this.input_button.text_paint.measure_text(text);
			let adj_text: string = this.input_button.text;
			if (this.select_all && this.select_start === -1 && this.select_end === -1) {
				canvas.draw_rect3(
					this.input_button.get_center_x() + this.offset_x,
					this.input_button.get_center_y() + this.offset_y,
					this.measured_text * 1.1,
					this.input_button.get_height() * 0.7,
					this.select_paint
				);
			}
			let cached_measured_text: number = this.measured_text * 0.5;
			if (this.select_start !== -1 && this.select_end !== -1) {
				let min = Math.min(this.select_start, this.select_end);
				let max = Math.max(this.select_start, this.select_end);
				this.select_width = this.text_paint.measure_text(adj_text.substring(min, max));
				this.select_offset_x = this.text_paint.measure_text(adj_text.substring(0, min));
				canvas.draw_rect(
					this.input_button.get_center_x() - cached_measured_text + this.select_offset_x + this.offset_x,
					this.input_button.get_center_y() - this.input_button.get_height() * 0.35 + this.offset_y,
					this.input_button.get_center_x() - cached_measured_text + this.select_offset_x + this.offset_x + this.select_width,
					this.input_button.get_center_y() + this.input_button.get_height() * 0.35 + this.offset_y,
					this.select_paint
				);
			}
			canvas.draw_text(
				'  _',
				this.input_button.get_center_x() - cached_measured_text + this.input_button.text_paint.measure_text(adj_text.substring(0, this.cursor_position)) + this.offset_x,
				this.input_button.get_center_y() + this.offset_y,
				this.input_button.text_paint
			);
			if (this.exit_button.contains_xy(global.variables.mouse_x - this.offset_x, global.variables.mouse_y - this.offset_y) && this.window_anchored && !global.CONSTANTS.MOBILE_MODE) {
				canvas.draw_rect(
					this.exit_button.left + this.offset_x,
					this.exit_button.top + this.offset_y,
					this.exit_button.right + this.offset_x,
					this.exit_button.bottom + this.offset_y,
					this.hover_paint
				);
			}
			let width_mul_0p3636: number = this.exit_button.get_width() * 0.3636;
			let height_mul_0p3636: number = this.exit_button.get_height() * 0.3636;
			canvas.draw_line(
				this.exit_button.left + width_mul_0p3636 + this.offset_x,
				this.exit_button.top + height_mul_0p3636 + this.offset_y,
				this.exit_button.right - width_mul_0p3636 + this.offset_x,
				this.exit_button.bottom - height_mul_0p3636 + this.offset_y,
				this.line_paint
			);
			canvas.draw_line(
				this.exit_button.right - width_mul_0p3636 + this.offset_x,
				this.exit_button.top + height_mul_0p3636 + this.offset_y,
				this.exit_button.left + width_mul_0p3636 + this.offset_x,
				this.exit_button.bottom - height_mul_0p3636 + this.offset_y,
				this.line_paint
			);
			canvas.draw_text(
				'(' + this.input_button.text.length + ' / ' + global.CONSTANTS.MAX_TEXT_LENGTH + ')',
				this.input_button.left + this.offset_x,
				this.okay_button.get_center_y() + this.offset_y,
				this.text_paint
			);
		}
	}
}
