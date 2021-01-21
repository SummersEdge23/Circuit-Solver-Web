'use strict';
class ShortcutManager {
	public SHORTCUT_COPY: string;
	public SHORTCUT_PASTE: string;
	public SHORTCUT_UNDO: string;
	public SHORTCUT_ADD_ELEMENT: string;
	public SHORTCUT_REDO: string;
	public SHORTCUT_SAVE_IMAGE: string;
	public SHORTCUT_SAVE_CIRCUIT: string;
	public SHORTCUT_ROTATE: string;
	public SHORTCUT_DELETE: string;
	public SHORTCUT_FLIP: string;
	public SHORTCUT_EDIT: string;
	public SHORTCUT_REMOVE_ALL: string;
	public SHORTCUT_SIMULATE: string;
	public SHORTCUT_QUERY: string;
	public SHORTCUT_RESET_WINDOW: string;
	public SHORTCUT_TOGGLE_SWITCH: string;
	public MULTI_MOVED_ELEMENT: boolean;
	public MULTI_DELETED_ELEMENT: boolean;
	public ENABLE_ARROW_KEYS: boolean;
	public TEMP_HISTORY_SNAPSHOT: string;
	public command: string;
	public shift: boolean;
	public caps: boolean;
	constructor() {
		this.SHORTCUT_COPY = global.KEY_CODE_C;
		this.SHORTCUT_PASTE = global.KEY_CODE_V;
		this.SHORTCUT_UNDO = global.KEY_CODE_Z;
		this.SHORTCUT_ADD_ELEMENT = global.KEY_CODE_N;
		this.SHORTCUT_REDO = global.KEY_CODE_Y;
		this.SHORTCUT_SAVE_IMAGE = global.KEY_CODE_I;
		this.SHORTCUT_SAVE_CIRCUIT = global.KEY_CODE_S;
		this.SHORTCUT_ROTATE = global.KEY_CODE_R;
		this.SHORTCUT_DELETE = global.KEY_CODE_DELETE;
		this.SHORTCUT_FLIP = global.KEY_CODE_F;
		this.SHORTCUT_EDIT = global.KEY_CODE_E;
		this.SHORTCUT_REMOVE_ALL = global.KEY_CODE_X;
		this.SHORTCUT_SIMULATE = global.KEY_CODE_A;
		this.SHORTCUT_QUERY = global.KEY_CODE_Q;
		this.SHORTCUT_RESET_WINDOW = global.KEY_CODE_M;
		this.SHORTCUT_TOGGLE_SWITCH = global.KEY_CODE_SPACE;
		this.MULTI_MOVED_ELEMENT = false;
		this.MULTI_DELETED_ELEMENT = false;
		this.ENABLE_ARROW_KEYS = true;
		this.TEMP_HISTORY_SNAPSHOT = '';
		this.command = '';
		this.shift = false;
		this.caps = false;
	}
	listen(key_event: KEY_EVENT_T): void {
		if (!global.MOBILE_MODE) {
			if (
				!global.flag_save_image &&
				!global.flag_save_circuit &&
				!global.flag_zoom &&
				!global.flag_element_options &&
				!global.flag_element_options_edit &&
				!global.flag_select_element &&
				!global.flag_select_timestep &&
				!global.flag_select_settings &&
				!global.flag_remove_all
			) {
				if (!global.flag_graph) {
					if (!global.flag_simulating && !global.flag_menu_element_toolbox) {
						this.handle_rotate_shortcut(key_event);
						this.handle_delete_shortcut(key_event);
						this.handle_undo_shortcut(key_event);
						this.handle_redo_shortcut(key_event);
						this.handle_flip_shortcut(key_event);
						this.handle_edit_shortcut(key_event);
						this.handle_remove_all_shortcut(key_event);
						this.handle_copy_shortcut(key_event);
						this.handle_paste_shortcut(key_event);
						this.handle_add_element_flag(key_event);
						this.handle_escape_shortcut(key_event);
						this.handle_select_all(key_event);
						if (this.ENABLE_ARROW_KEYS) {
							this.handle_arrow_keys_multi_select(key_event);
							this.handle_arrow_keys_select(key_event);
						}
					} else if (!global.flag_simulating) {
						if (!global.signal_add_element) {
							this.handle_add_element_flag(key_event);
						} else {
							this.handle_escape_shortcut(key_event);
							this.handle_flip_shortcut(key_event);
							this.handle_rotate_shortcut(key_event);
						}
					} else if (global.flag_simulating && !global.flag_menu_element_toolbox) {
						this.handle_edit_shortcut(key_event);
						this.handle_toggle_switches(key_event);
						this.handle_query_shortcut(key_event);
					}
					if (this.ENABLE_ARROW_KEYS) {
						this.handle_arrow_keys_menu_open_down(key_event);
					}
				}
				if (!global.flag_menu_element_toolbox) {
					this.handle_simulate_shortcut(key_event);
				}
			}
			if (!global.flag_save_image && !global.flag_save_circuit && !global.flag_element_options_edit && !global.flag_select_timestep) {
				this.handle_reset_window_shortcut(key_event);
			}
			if (
				!global.flag_save_image &&
				!global.flag_save_circuit &&
				!global.flag_zoom &&
				!global.flag_element_options &&
				!global.flag_element_options_edit &&
				!global.flag_graph &&
				!global.flag_select_element &&
				!global.flag_select_timestep &&
				!global.flag_select_settings &&
				!global.flag_remove_all &&
				!global.flag_menu_element_toolbox
			) {
				this.handle_save_image_flag(key_event);
				this.handle_save_circuit_flag(key_event);
			}
		}
	}
	handle_select_all(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_SIMULATE && key_event['ctrl'] === true) {
			global.selected_id = global.NULL;
			global.selected_type = -1;
			global.selected_bounds = global.NULL;
			global.selected_properties = global.NULL;
			global.selected_wire_style = global.NULL;
			global.selected = false;
			global.multi_selected = true;
			/* #INSERT_GENERATE_MULTI_SELECT_ELEMENTS_SHORTCUT# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			for (var i: number = 0; i < resistors.length; i++) {
				resistors[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < capacitors.length; i++) {
				capacitors[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < inductors.length; i++) {
				inductors[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < grounds.length; i++) {
				grounds[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < dcsources.length; i++) {
				dcsources[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < dccurrents.length; i++) {
				dccurrents[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < acsources.length; i++) {
				acsources[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < accurrents.length; i++) {
				accurrents[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < squarewaves.length; i++) {
				squarewaves[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < sawwaves.length; i++) {
				sawwaves[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < trianglewaves.length; i++) {
				trianglewaves[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < constants.length; i++) {
				constants[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < wires.length; i++) {
				wires[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < nets.length; i++) {
				nets[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < notes.length; i++) {
				notes[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < rails.length; i++) {
				rails[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < voltmeters.length; i++) {
				voltmeters[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < ohmmeters.length; i++) {
				ohmmeters[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < ammeters.length; i++) {
				ammeters[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < wattmeters.length; i++) {
				wattmeters[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < fuses.length; i++) {
				fuses[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < spsts.length; i++) {
				spsts[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < spdts.length; i++) {
				spdts[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < nots.length; i++) {
				nots[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < diodes.length; i++) {
				diodes[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < leds.length; i++) {
				leds[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < zeners.length; i++) {
				zeners[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < potentiometers.length; i++) {
				potentiometers[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < ands.length; i++) {
				ands[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < ors.length; i++) {
				ors[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < nands.length; i++) {
				nands[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < nors.length; i++) {
				nors[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < xors.length; i++) {
				xors[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < xnors.length; i++) {
				xnors[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < dffs.length; i++) {
				dffs[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < vsats.length; i++) {
				vsats[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < adders.length; i++) {
				adders[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < subtractors.length; i++) {
				subtractors[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < multipliers.length; i++) {
				multipliers[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < dividers.length; i++) {
				dividers[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < gains.length; i++) {
				gains[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < absvals.length; i++) {
				absvals[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < vcsws.length; i++) {
				vcsws[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < vcvss.length; i++) {
				vcvss[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < vccss.length; i++) {
				vccss[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < cccss.length; i++) {
				cccss[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < ccvss.length; i++) {
				ccvss[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < opamps.length; i++) {
				opamps[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < nmosfets.length; i++) {
				nmosfets[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < pmosfets.length; i++) {
				pmosfets[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < npns.length; i++) {
				npns[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < pnps.length; i++) {
				pnps[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < adcs.length; i++) {
				adcs[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < dacs.length; i++) {
				dacs[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < sandhs.length; i++) {
				sandhs[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < pwms.length; i++) {
				pwms[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < integrators.length; i++) {
				integrators[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < differentiators.length; i++) {
				differentiators[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < lowpasses.length; i++) {
				lowpasses[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < highpasses.length; i++) {
				highpasses[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < relays.length; i++) {
				relays[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < pids.length; i++) {
				pids[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < luts.length; i++) {
				luts[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < vcrs.length; i++) {
				vcrs[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < vccas.length; i++) {
				vccas[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < vcls.length; i++) {
				vcls[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < grts.length; i++) {
				grts[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < tptzs.length; i++) {
				tptzs[i].MULTI_SELECTED = true;
			}
			for (var i: number = 0; i < transformers.length; i++) {
				transformers[i].MULTI_SELECTED = true;
			}
			/* <!-- END AUTOMATICALLY GENERATED !--> */
		}
	}
	handle_toggle_switches(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (key_event['event'].code === this.SHORTCUT_TOGGLE_SWITCH) {
			if (global.selected_type === global.TYPE_SPST) {
				let index: number = engine_functions.get_spst(global.selected_id);
				if (index > -1 && index < spsts.length) {
					if (spsts[index].elm.properties['Switch State'] === global.ON) {
						spsts[index].elm.properties['Switch State'] = global.OFF;
					} else if (spsts[index].elm.properties['Switch State'] === global.OFF) {
						spsts[index].elm.properties['Switch State'] = global.ON;
					}
					global.selected_properties['Switch State'] = spsts[index].elm.properties['Switch State'];
				}
			} else if (global.selected_type === global.TYPE_SPDT) {
				let index: number = engine_functions.get_spdt(global.selected_id);
				if (index > -1 && index < spdts.length) {
					if (spdts[index].elm.properties['Switch State'] === global.ON) {
						spdts[index].elm.properties['Switch State'] = global.OFF;
					} else if (spdts[index].elm.properties['Switch State'] === global.OFF) {
						spdts[index].elm.properties['Switch State'] = global.ON;
					}
					global.selected_properties['Switch State'] = spdts[index].elm.properties['Switch State'];
				}
			}
		}
	}
	handle_escape_shortcut(key_event: KEY_EVENT_T): void {
		if (key_event['event'].code === global.KEY_CODE_ESCAPE) {
			if (global.signal_history_lock && this.TEMP_HISTORY_SNAPSHOT !== '') {
				engine_functions.parse_elements(this.TEMP_HISTORY_SNAPSHOT);
				this.TEMP_HISTORY_SNAPSHOT = '';
				global.signal_history_lock = false;
				if (global.signal_add_element) {
					global.signal_add_element = false;
					menu_bar.escape_interrupt = true;
					menu_bar.mouse_move();
				}
			}
		}
	}
	handle_add_element_flag(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_ADD_ELEMENT) {
			if (!global.flag_menu_open) {
				menu_bar.handle_menu_open_flag(!global.flag_menu_open);
			}
			menu_bar.handle_menu_open_down_flag(!global.flag_menu_element_toolbox);
		}
	}
	handle_arrow_keys_menu_open_down(key_event: KEY_EVENT_T): void {
		if (global.flag_menu_element_toolbox) {
			if (!global.focused) {
				if (
					key_event['event'].code === global.KEY_CODE_ARROW_LEFT ||
					key_event['event'].code === global.KEY_CODE_ARROW_RIGHT ||
					key_event['event'].code === global.KEY_CODE_END ||
					key_event['event'].code === global.KEY_CODE_HOME
				) {
					if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
						let temp_x: number = global.mouse_x;
						let temp_y: number = global.mouse_y;
						global.mouse_x = menu_bar.element_window.positions[menu_bar.element_window.NAVIGATE_BACK].get_center_x();
						global.mouse_y = menu_bar.element_window.positions[menu_bar.element_window.NAVIGATE_BACK].get_center_y();
						menu_bar.element_window.mouse_down();
						menu_bar.element_window.mouse_up();
						global.mouse_x = temp_x;
						global.mouse_y = temp_y;
					} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
						let temp_x: number = global.mouse_x;
						let temp_y: number = global.mouse_y;
						global.mouse_x = menu_bar.element_window.positions[menu_bar.element_window.NAVIGATE_FORWARD].get_center_x();
						global.mouse_y = menu_bar.element_window.positions[menu_bar.element_window.NAVIGATE_FORWARD].get_center_y();
						menu_bar.element_window.mouse_down();
						menu_bar.element_window.mouse_up();
						global.mouse_x = temp_x;
						global.mouse_y = temp_y;
					} else if (key_event['event'].code === global.KEY_CODE_END) {
						menu_bar.element_window.PAGE_NUMBER = menu_bar.element_window.MAX_PAGE_NUMBER;
					} else if (key_event['event'].code === global.KEY_CODE_HOME) {
						menu_bar.element_window.PAGE_NUMBER = 0;
					}
				}
			}
		}
	}
	handle_arrow_keys_select(key_event: KEY_EVENT_T): void {
		if (
			key_event['event'].code === global.KEY_CODE_ARROW_UP ||
			key_event['event'].code === global.KEY_CODE_ARROW_DOWN ||
			key_event['event'].code === global.KEY_CODE_ARROW_LEFT ||
			key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
		) {
			global.signal_build_element = true;
			if (global.selected) {
				/* #INSERT_GENERATE_HANDLE_SELECT_ELEMENTS_MOVE# */
				/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
				if (global.selected_type === global.TYPE_RESISTOR) {
					var index: number = engine_functions.get_resistor(global.selected_id);
					if (index < resistors.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							resistors[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							resistors[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							resistors[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							resistors[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_CAPACITOR) {
					var index: number = engine_functions.get_capacitor(global.selected_id);
					if (index < capacitors.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							capacitors[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							capacitors[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							capacitors[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							capacitors[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_INDUCTOR) {
					var index: number = engine_functions.get_inductor(global.selected_id);
					if (index < inductors.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							inductors[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							inductors[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							inductors[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							inductors[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_GROUND) {
					var index: number = engine_functions.get_ground(global.selected_id);
					if (index < grounds.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							grounds[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							grounds[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							grounds[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							grounds[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_DCSOURCE) {
					var index: number = engine_functions.get_dcsource(global.selected_id);
					if (index < dcsources.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							dcsources[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							dcsources[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							dcsources[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							dcsources[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_DCCURRENT) {
					var index: number = engine_functions.get_dccurrent(global.selected_id);
					if (index < dccurrents.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							dccurrents[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							dccurrents[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							dccurrents[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							dccurrents[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_ACSOURCE) {
					var index: number = engine_functions.get_acsource(global.selected_id);
					if (index < acsources.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							acsources[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							acsources[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							acsources[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							acsources[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_ACCURRENT) {
					var index: number = engine_functions.get_accurrent(global.selected_id);
					if (index < accurrents.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							accurrents[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							accurrents[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							accurrents[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							accurrents[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_SQUAREWAVE) {
					var index: number = engine_functions.get_squarewave(global.selected_id);
					if (index < squarewaves.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							squarewaves[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							squarewaves[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							squarewaves[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							squarewaves[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_SAW) {
					var index: number = engine_functions.get_sawwave(global.selected_id);
					if (index < sawwaves.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							sawwaves[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							sawwaves[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							sawwaves[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							sawwaves[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_TRI) {
					var index: number = engine_functions.get_trianglewave(global.selected_id);
					if (index < trianglewaves.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							trianglewaves[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							trianglewaves[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							trianglewaves[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							trianglewaves[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_CONSTANT) {
					var index: number = engine_functions.get_constant(global.selected_id);
					if (index < constants.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							constants[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							constants[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							constants[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							constants[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_NET) {
					var index: number = engine_functions.get_net(global.selected_id);
					if (index < nets.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							nets[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							nets[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							nets[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							nets[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_NOTE) {
					var index: number = engine_functions.get_note(global.selected_id);
					if (index < notes.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							notes[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							notes[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							notes[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							notes[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_RAIL) {
					var index: number = engine_functions.get_rail(global.selected_id);
					if (index < rails.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							rails[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							rails[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							rails[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							rails[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_VOLTMETER) {
					var index: number = engine_functions.get_voltmeter(global.selected_id);
					if (index < voltmeters.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							voltmeters[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							voltmeters[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							voltmeters[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							voltmeters[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_OHMMETER) {
					var index: number = engine_functions.get_ohmmeter(global.selected_id);
					if (index < ohmmeters.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							ohmmeters[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							ohmmeters[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							ohmmeters[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							ohmmeters[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_AMMETER) {
					var index: number = engine_functions.get_ammeter(global.selected_id);
					if (index < ammeters.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							ammeters[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							ammeters[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							ammeters[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							ammeters[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_WATTMETER) {
					var index: number = engine_functions.get_wattmeter(global.selected_id);
					if (index < wattmeters.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							wattmeters[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							wattmeters[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							wattmeters[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							wattmeters[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_FUSE) {
					var index: number = engine_functions.get_fuse(global.selected_id);
					if (index < fuses.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							fuses[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							fuses[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							fuses[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							fuses[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_SPST) {
					var index: number = engine_functions.get_spst(global.selected_id);
					if (index < spsts.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							spsts[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							spsts[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							spsts[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							spsts[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_SPDT) {
					var index: number = engine_functions.get_spdt(global.selected_id);
					if (index < spdts.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							spdts[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							spdts[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							spdts[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							spdts[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_NOT) {
					var index: number = engine_functions.get_not(global.selected_id);
					if (index < nots.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							nots[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							nots[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							nots[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							nots[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_DIODE) {
					var index: number = engine_functions.get_diode(global.selected_id);
					if (index < diodes.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							diodes[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							diodes[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							diodes[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							diodes[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_LED) {
					var index: number = engine_functions.get_led(global.selected_id);
					if (index < leds.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							leds[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							leds[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							leds[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							leds[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_ZENER) {
					var index: number = engine_functions.get_zener(global.selected_id);
					if (index < zeners.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							zeners[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							zeners[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							zeners[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							zeners[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_POTENTIOMETER) {
					var index: number = engine_functions.get_potentiometer(global.selected_id);
					if (index < potentiometers.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							potentiometers[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							potentiometers[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							potentiometers[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							potentiometers[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_AND) {
					var index: number = engine_functions.get_and(global.selected_id);
					if (index < ands.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							ands[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							ands[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							ands[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							ands[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_OR) {
					var index: number = engine_functions.get_or(global.selected_id);
					if (index < ors.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							ors[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							ors[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							ors[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							ors[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_NAND) {
					var index: number = engine_functions.get_nand(global.selected_id);
					if (index < nands.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							nands[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							nands[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							nands[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							nands[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_NOR) {
					var index: number = engine_functions.get_nor(global.selected_id);
					if (index < nors.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							nors[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							nors[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							nors[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							nors[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_XOR) {
					var index: number = engine_functions.get_xor(global.selected_id);
					if (index < xors.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							xors[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							xors[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							xors[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							xors[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_XNOR) {
					var index: number = engine_functions.get_xnor(global.selected_id);
					if (index < xnors.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							xnors[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							xnors[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							xnors[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							xnors[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_DFF) {
					var index: number = engine_functions.get_dff(global.selected_id);
					if (index < dffs.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							dffs[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							dffs[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							dffs[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							dffs[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_VSAT) {
					var index: number = engine_functions.get_vsat(global.selected_id);
					if (index < vsats.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							vsats[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							vsats[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							vsats[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							vsats[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_ADD) {
					var index: number = engine_functions.get_adder(global.selected_id);
					if (index < adders.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							adders[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							adders[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							adders[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							adders[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_SUB) {
					var index: number = engine_functions.get_subtractor(global.selected_id);
					if (index < subtractors.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							subtractors[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							subtractors[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							subtractors[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							subtractors[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_MUL) {
					var index: number = engine_functions.get_multiplier(global.selected_id);
					if (index < multipliers.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							multipliers[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							multipliers[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							multipliers[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							multipliers[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_DIV) {
					var index: number = engine_functions.get_divider(global.selected_id);
					if (index < dividers.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							dividers[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							dividers[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							dividers[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							dividers[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_GAIN) {
					var index: number = engine_functions.get_gain(global.selected_id);
					if (index < gains.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							gains[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							gains[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							gains[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							gains[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_ABS) {
					var index: number = engine_functions.get_absval(global.selected_id);
					if (index < absvals.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							absvals[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							absvals[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							absvals[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							absvals[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_VCSW) {
					var index: number = engine_functions.get_vcsw(global.selected_id);
					if (index < vcsws.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							vcsws[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							vcsws[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							vcsws[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							vcsws[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_VCVS) {
					var index: number = engine_functions.get_vcvs(global.selected_id);
					if (index < vcvss.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							vcvss[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							vcvss[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							vcvss[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							vcvss[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_VCCS) {
					var index: number = engine_functions.get_vccs(global.selected_id);
					if (index < vccss.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							vccss[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							vccss[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							vccss[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							vccss[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_CCCS) {
					var index: number = engine_functions.get_cccs(global.selected_id);
					if (index < cccss.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							cccss[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							cccss[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							cccss[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							cccss[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_CCVS) {
					var index: number = engine_functions.get_ccvs(global.selected_id);
					if (index < ccvss.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							ccvss[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							ccvss[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							ccvss[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							ccvss[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_OPAMP) {
					var index: number = engine_functions.get_opamp(global.selected_id);
					if (index < opamps.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							opamps[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							opamps[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							opamps[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							opamps[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_NMOS) {
					var index: number = engine_functions.get_nmosfet(global.selected_id);
					if (index < nmosfets.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							nmosfets[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							nmosfets[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							nmosfets[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							nmosfets[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_PMOS) {
					var index: number = engine_functions.get_pmosfet(global.selected_id);
					if (index < pmosfets.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							pmosfets[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							pmosfets[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							pmosfets[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							pmosfets[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_NPN) {
					var index: number = engine_functions.get_npn(global.selected_id);
					if (index < npns.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							npns[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							npns[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							npns[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							npns[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_PNP) {
					var index: number = engine_functions.get_pnp(global.selected_id);
					if (index < pnps.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							pnps[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							pnps[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							pnps[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							pnps[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_ADC) {
					var index: number = engine_functions.get_adc(global.selected_id);
					if (index < adcs.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							adcs[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							adcs[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							adcs[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							adcs[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_DAC) {
					var index: number = engine_functions.get_dac(global.selected_id);
					if (index < dacs.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							dacs[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							dacs[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							dacs[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							dacs[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_SAH) {
					var index: number = engine_functions.get_samplers(global.selected_id);
					if (index < sandhs.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							sandhs[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							sandhs[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							sandhs[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							sandhs[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_PWM) {
					var index: number = engine_functions.get_pwm(global.selected_id);
					if (index < pwms.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							pwms[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							pwms[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							pwms[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							pwms[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_INTEGRATOR) {
					var index: number = engine_functions.get_integrator(global.selected_id);
					if (index < integrators.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							integrators[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							integrators[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							integrators[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							integrators[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
					var index: number = engine_functions.get_differentiator(global.selected_id);
					if (index < differentiators.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							differentiators[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							differentiators[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							differentiators[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							differentiators[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_LPF) {
					var index: number = engine_functions.get_lowpass(global.selected_id);
					if (index < lowpasses.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							lowpasses[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							lowpasses[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							lowpasses[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							lowpasses[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_HPF) {
					var index: number = engine_functions.get_highpass(global.selected_id);
					if (index < highpasses.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							highpasses[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							highpasses[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							highpasses[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							highpasses[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_REL) {
					var index: number = engine_functions.get_relay(global.selected_id);
					if (index < relays.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							relays[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							relays[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							relays[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							relays[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_PID) {
					var index: number = engine_functions.get_pid(global.selected_id);
					if (index < pids.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							pids[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							pids[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							pids[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							pids[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_LUT) {
					var index: number = engine_functions.get_lut(global.selected_id);
					if (index < luts.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							luts[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							luts[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							luts[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							luts[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_VCR) {
					var index: number = engine_functions.get_vcr(global.selected_id);
					if (index < vcrs.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							vcrs[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							vcrs[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							vcrs[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							vcrs[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_VCCA) {
					var index: number = engine_functions.get_vcca(global.selected_id);
					if (index < vccas.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							vccas[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							vccas[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							vccas[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							vccas[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_VCL) {
					var index: number = engine_functions.get_vcl(global.selected_id);
					if (index < vcls.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							vcls[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							vcls[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							vcls[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							vcls[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_GRT) {
					var index: number = engine_functions.get_grt(global.selected_id);
					if (index < grts.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							grts[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							grts[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							grts[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							grts[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_TPTZ) {
					var index: number = engine_functions.get_tptz(global.selected_id);
					if (index < tptzs.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							tptzs[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							tptzs[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							tptzs[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							tptzs[index].move_element(global.node_space_x, 0);
						}
					}
				} else if (global.selected_type === global.TYPE_TRAN) {
					var index: number = engine_functions.get_transformer(global.selected_id);
					if (index < transformers.length) {
						if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
							transformers[index].move_element(0, -global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
							transformers[index].move_element(0, global.node_space_y);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
							transformers[index].move_element(-global.node_space_x, 0);
						} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
							transformers[index].move_element(global.node_space_x, 0);
						}
					}
				}
				/* <!-- END AUTOMATICALLY GENERATED !--> */
			}
		}
	}
	/* Look at where this is called, it could be that the SELECTED_COMPONENTS_BOUNDS is reset to max when it's called <_< */
	handle_arrow_keys_multi_select(key_event: KEY_EVENT_T): void {
		if (
			key_event['event'].code === global.KEY_CODE_ARROW_UP ||
			key_event['event'].code === global.KEY_CODE_ARROW_DOWN ||
			key_event['event'].code === global.KEY_CODE_ARROW_LEFT ||
			key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
		) {
			global.signal_build_element = true;
			this.MULTI_MOVED_ELEMENT = false;
			let elm_max: number = global.element_max();
			for (var i: number = 0; i < elm_max; i++) {
				/* #INSERT_GENERATE_HANDLE_MULTI_SELECT_ELEMENTS_MOVE_CALL# */
				/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
				this.handle_move_resistors(i, key_event);
				this.handle_move_capacitors(i, key_event);
				this.handle_move_inductors(i, key_event);
				this.handle_move_grounds(i, key_event);
				this.handle_move_dcsources(i, key_event);
				this.handle_move_dccurrents(i, key_event);
				this.handle_move_acsources(i, key_event);
				this.handle_move_accurrents(i, key_event);
				this.handle_move_squarewaves(i, key_event);
				this.handle_move_sawwaves(i, key_event);
				this.handle_move_trianglewaves(i, key_event);
				this.handle_move_constants(i, key_event);
				this.handle_move_wires(i, key_event);
				this.handle_move_nets(i, key_event);
				this.handle_move_notes(i, key_event);
				this.handle_move_rails(i, key_event);
				this.handle_move_voltmeters(i, key_event);
				this.handle_move_ohmmeters(i, key_event);
				this.handle_move_ammeters(i, key_event);
				this.handle_move_wattmeters(i, key_event);
				this.handle_move_fuses(i, key_event);
				this.handle_move_spsts(i, key_event);
				this.handle_move_spdts(i, key_event);
				this.handle_move_nots(i, key_event);
				this.handle_move_diodes(i, key_event);
				this.handle_move_leds(i, key_event);
				this.handle_move_zeners(i, key_event);
				this.handle_move_potentiometers(i, key_event);
				this.handle_move_ands(i, key_event);
				this.handle_move_ors(i, key_event);
				this.handle_move_nands(i, key_event);
				this.handle_move_nors(i, key_event);
				this.handle_move_xors(i, key_event);
				this.handle_move_xnors(i, key_event);
				this.handle_move_dffs(i, key_event);
				this.handle_move_vsats(i, key_event);
				this.handle_move_adders(i, key_event);
				this.handle_move_subtractors(i, key_event);
				this.handle_move_multipliers(i, key_event);
				this.handle_move_dividers(i, key_event);
				this.handle_move_gains(i, key_event);
				this.handle_move_absvals(i, key_event);
				this.handle_move_vcsws(i, key_event);
				this.handle_move_vcvss(i, key_event);
				this.handle_move_vccss(i, key_event);
				this.handle_move_cccss(i, key_event);
				this.handle_move_ccvss(i, key_event);
				this.handle_move_opamps(i, key_event);
				this.handle_move_nmosfets(i, key_event);
				this.handle_move_pmosfets(i, key_event);
				this.handle_move_npns(i, key_event);
				this.handle_move_pnps(i, key_event);
				this.handle_move_adcs(i, key_event);
				this.handle_move_dacs(i, key_event);
				this.handle_move_sandhs(i, key_event);
				this.handle_move_pwms(i, key_event);
				this.handle_move_integrators(i, key_event);
				this.handle_move_differentiators(i, key_event);
				this.handle_move_lowpasses(i, key_event);
				this.handle_move_highpasses(i, key_event);
				this.handle_move_relays(i, key_event);
				this.handle_move_pids(i, key_event);
				this.handle_move_luts(i, key_event);
				this.handle_move_vcrs(i, key_event);
				this.handle_move_vccas(i, key_event);
				this.handle_move_vcls(i, key_event);
				this.handle_move_grts(i, key_event);
				this.handle_move_tptzs(i, key_event);
				this.handle_move_transformers(i, key_event);
				/* <!-- END AUTOMATICALLY GENERATED !--> */
			}
			if (this.MULTI_MOVED_ELEMENT) {
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				this.MULTI_MOVED_ELEMENT = false;
			}
		}
	}
	handle_delete_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (key_event['event'].code === this.SHORTCUT_DELETE) {
			if (!global.multi_selected) {
				let index: number = -1;
				/* #INSERT_GENERATE_REMOVE_ELEMENTS_SHORTCUT# */
				/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
				if (global.selected_type === global.TYPE_RESISTOR) {
					index = engine_functions.get_resistor(global.selected_id);
					if (index < resistors.length) {
						engine_functions.remove_resistor(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_CAPACITOR) {
					index = engine_functions.get_capacitor(global.selected_id);
					if (index < capacitors.length) {
						engine_functions.remove_capacitor(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_INDUCTOR) {
					index = engine_functions.get_inductor(global.selected_id);
					if (index < inductors.length) {
						engine_functions.remove_inductor(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_GROUND) {
					index = engine_functions.get_ground(global.selected_id);
					if (index < grounds.length) {
						engine_functions.remove_ground(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_DCSOURCE) {
					index = engine_functions.get_dcsource(global.selected_id);
					if (index < dcsources.length) {
						engine_functions.remove_dcsource(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_DCCURRENT) {
					index = engine_functions.get_dccurrent(global.selected_id);
					if (index < dccurrents.length) {
						engine_functions.remove_dccurrent(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_ACSOURCE) {
					index = engine_functions.get_acsource(global.selected_id);
					if (index < acsources.length) {
						engine_functions.remove_acsource(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_ACCURRENT) {
					index = engine_functions.get_accurrent(global.selected_id);
					if (index < accurrents.length) {
						engine_functions.remove_accurrent(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_SQUAREWAVE) {
					index = engine_functions.get_squarewave(global.selected_id);
					if (index < squarewaves.length) {
						engine_functions.remove_squarewave(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_SAW) {
					index = engine_functions.get_sawwave(global.selected_id);
					if (index < sawwaves.length) {
						engine_functions.remove_sawwave(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_TRI) {
					index = engine_functions.get_trianglewave(global.selected_id);
					if (index < trianglewaves.length) {
						engine_functions.remove_trianglewave(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_CONSTANT) {
					index = engine_functions.get_constant(global.selected_id);
					if (index < constants.length) {
						engine_functions.remove_constant(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_WIRE) {
					index = engine_functions.get_wire(global.selected_id);
					if (index < wires.length) {
						engine_functions.remove_wire(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_NET) {
					index = engine_functions.get_net(global.selected_id);
					if (index < nets.length) {
						engine_functions.remove_net(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_NOTE) {
					index = engine_functions.get_note(global.selected_id);
					if (index < notes.length) {
						engine_functions.remove_note(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_RAIL) {
					index = engine_functions.get_rail(global.selected_id);
					if (index < rails.length) {
						engine_functions.remove_rail(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_VOLTMETER) {
					index = engine_functions.get_voltmeter(global.selected_id);
					if (index < voltmeters.length) {
						engine_functions.remove_voltmeter(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_OHMMETER) {
					index = engine_functions.get_ohmmeter(global.selected_id);
					if (index < ohmmeters.length) {
						engine_functions.remove_ohmmeter(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_AMMETER) {
					index = engine_functions.get_ammeter(global.selected_id);
					if (index < ammeters.length) {
						engine_functions.remove_ammeter(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_WATTMETER) {
					index = engine_functions.get_wattmeter(global.selected_id);
					if (index < wattmeters.length) {
						engine_functions.remove_wattmeter(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_FUSE) {
					index = engine_functions.get_fuse(global.selected_id);
					if (index < fuses.length) {
						engine_functions.remove_fuse(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_SPST) {
					index = engine_functions.get_spst(global.selected_id);
					if (index < spsts.length) {
						engine_functions.remove_spst(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_SPDT) {
					index = engine_functions.get_spdt(global.selected_id);
					if (index < spdts.length) {
						engine_functions.remove_spdt(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_NOT) {
					index = engine_functions.get_not(global.selected_id);
					if (index < nots.length) {
						engine_functions.remove_not(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_DIODE) {
					index = engine_functions.get_diode(global.selected_id);
					if (index < diodes.length) {
						engine_functions.remove_diode(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_LED) {
					index = engine_functions.get_led(global.selected_id);
					if (index < leds.length) {
						engine_functions.remove_led(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_ZENER) {
					index = engine_functions.get_zener(global.selected_id);
					if (index < zeners.length) {
						engine_functions.remove_zener(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_POTENTIOMETER) {
					index = engine_functions.get_potentiometer(global.selected_id);
					if (index < potentiometers.length) {
						engine_functions.remove_potentiometer(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_AND) {
					index = engine_functions.get_and(global.selected_id);
					if (index < ands.length) {
						engine_functions.remove_and(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_OR) {
					index = engine_functions.get_or(global.selected_id);
					if (index < ors.length) {
						engine_functions.remove_or(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_NAND) {
					index = engine_functions.get_nand(global.selected_id);
					if (index < nands.length) {
						engine_functions.remove_nand(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_NOR) {
					index = engine_functions.get_nor(global.selected_id);
					if (index < nors.length) {
						engine_functions.remove_nor(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_XOR) {
					index = engine_functions.get_xor(global.selected_id);
					if (index < xors.length) {
						engine_functions.remove_xor(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_XNOR) {
					index = engine_functions.get_xnor(global.selected_id);
					if (index < xnors.length) {
						engine_functions.remove_xnor(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_DFF) {
					index = engine_functions.get_dff(global.selected_id);
					if (index < dffs.length) {
						engine_functions.remove_dff(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_VSAT) {
					index = engine_functions.get_vsat(global.selected_id);
					if (index < vsats.length) {
						engine_functions.remove_vsat(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_ADD) {
					index = engine_functions.get_adder(global.selected_id);
					if (index < adders.length) {
						engine_functions.remove_adder(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_SUB) {
					index = engine_functions.get_subtractor(global.selected_id);
					if (index < subtractors.length) {
						engine_functions.remove_subtractor(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_MUL) {
					index = engine_functions.get_multiplier(global.selected_id);
					if (index < multipliers.length) {
						engine_functions.remove_multiplier(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_DIV) {
					index = engine_functions.get_divider(global.selected_id);
					if (index < dividers.length) {
						engine_functions.remove_divider(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_GAIN) {
					index = engine_functions.get_gain(global.selected_id);
					if (index < gains.length) {
						engine_functions.remove_gain(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_ABS) {
					index = engine_functions.get_absval(global.selected_id);
					if (index < absvals.length) {
						engine_functions.remove_absval(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_VCSW) {
					index = engine_functions.get_vcsw(global.selected_id);
					if (index < vcsws.length) {
						engine_functions.remove_vcsw(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_VCVS) {
					index = engine_functions.get_vcvs(global.selected_id);
					if (index < vcvss.length) {
						engine_functions.remove_vcvs(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_VCCS) {
					index = engine_functions.get_vccs(global.selected_id);
					if (index < vccss.length) {
						engine_functions.remove_vccs(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_CCCS) {
					index = engine_functions.get_cccs(global.selected_id);
					if (index < cccss.length) {
						engine_functions.remove_cccs(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_CCVS) {
					index = engine_functions.get_ccvs(global.selected_id);
					if (index < ccvss.length) {
						engine_functions.remove_ccvs(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_OPAMP) {
					index = engine_functions.get_opamp(global.selected_id);
					if (index < opamps.length) {
						engine_functions.remove_opamp(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_NMOS) {
					index = engine_functions.get_nmosfet(global.selected_id);
					if (index < nmosfets.length) {
						engine_functions.remove_nmosfet(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_PMOS) {
					index = engine_functions.get_pmosfet(global.selected_id);
					if (index < pmosfets.length) {
						engine_functions.remove_pmosfet(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_NPN) {
					index = engine_functions.get_npn(global.selected_id);
					if (index < npns.length) {
						engine_functions.remove_npn(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_PNP) {
					index = engine_functions.get_pnp(global.selected_id);
					if (index < pnps.length) {
						engine_functions.remove_pnp(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_ADC) {
					index = engine_functions.get_adc(global.selected_id);
					if (index < adcs.length) {
						engine_functions.remove_adc(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_DAC) {
					index = engine_functions.get_dac(global.selected_id);
					if (index < dacs.length) {
						engine_functions.remove_dac(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_SAH) {
					index = engine_functions.get_samplers(global.selected_id);
					if (index < sandhs.length) {
						engine_functions.remove_samplers(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_PWM) {
					index = engine_functions.get_pwm(global.selected_id);
					if (index < pwms.length) {
						engine_functions.remove_pwm(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_INTEGRATOR) {
					index = engine_functions.get_integrator(global.selected_id);
					if (index < integrators.length) {
						engine_functions.remove_integrator(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
					index = engine_functions.get_differentiator(global.selected_id);
					if (index < differentiators.length) {
						engine_functions.remove_differentiator(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_LPF) {
					index = engine_functions.get_lowpass(global.selected_id);
					if (index < lowpasses.length) {
						engine_functions.remove_lowpass(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_HPF) {
					index = engine_functions.get_highpass(global.selected_id);
					if (index < highpasses.length) {
						engine_functions.remove_highpass(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_REL) {
					index = engine_functions.get_relay(global.selected_id);
					if (index < relays.length) {
						engine_functions.remove_relay(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_PID) {
					index = engine_functions.get_pid(global.selected_id);
					if (index < pids.length) {
						engine_functions.remove_pid(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_LUT) {
					index = engine_functions.get_lut(global.selected_id);
					if (index < luts.length) {
						engine_functions.remove_lut(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_VCR) {
					index = engine_functions.get_vcr(global.selected_id);
					if (index < vcrs.length) {
						engine_functions.remove_vcr(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_VCCA) {
					index = engine_functions.get_vcca(global.selected_id);
					if (index < vccas.length) {
						engine_functions.remove_vcca(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_VCL) {
					index = engine_functions.get_vcl(global.selected_id);
					if (index < vcls.length) {
						engine_functions.remove_vcl(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_GRT) {
					index = engine_functions.get_grt(global.selected_id);
					if (index < grts.length) {
						engine_functions.remove_grt(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_TPTZ) {
					index = engine_functions.get_tptz(global.selected_id);
					if (index < tptzs.length) {
						engine_functions.remove_tptz(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				} else if (global.selected_type === global.TYPE_TRAN) {
					index = engine_functions.get_transformer(global.selected_id);
					if (index < transformers.length) {
						engine_functions.remove_transformer(index);
						global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
					}
				}
				/* <!-- END AUTOMATICALLY GENERATED !--> */
			} else {
				this.handle_remove_multi_select_elements();
			}
		}
	}
	handle_rotate_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_ROTATE) {
			global.signal_build_element = true;
			let index: number = -1;
			/* #INSERT_GENERATE_ELEMENT_ROTATE_SHORTCUT# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			if (global.selected_type === global.TYPE_RESISTOR) {
				index = engine_functions.get_resistor(global.selected_id);
				if (index < resistors.length) {
					resistors[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_CAPACITOR) {
				index = engine_functions.get_capacitor(global.selected_id);
				if (index < capacitors.length) {
					capacitors[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_INDUCTOR) {
				index = engine_functions.get_inductor(global.selected_id);
				if (index < inductors.length) {
					inductors[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_GROUND) {
				index = engine_functions.get_ground(global.selected_id);
				if (index < grounds.length) {
					grounds[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_DCSOURCE) {
				index = engine_functions.get_dcsource(global.selected_id);
				if (index < dcsources.length) {
					dcsources[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_DCCURRENT) {
				index = engine_functions.get_dccurrent(global.selected_id);
				if (index < dccurrents.length) {
					dccurrents[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_ACSOURCE) {
				index = engine_functions.get_acsource(global.selected_id);
				if (index < acsources.length) {
					acsources[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_ACCURRENT) {
				index = engine_functions.get_accurrent(global.selected_id);
				if (index < accurrents.length) {
					accurrents[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_SQUAREWAVE) {
				index = engine_functions.get_squarewave(global.selected_id);
				if (index < squarewaves.length) {
					squarewaves[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_SAW) {
				index = engine_functions.get_sawwave(global.selected_id);
				if (index < sawwaves.length) {
					sawwaves[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_TRI) {
				index = engine_functions.get_trianglewave(global.selected_id);
				if (index < trianglewaves.length) {
					trianglewaves[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_CONSTANT) {
				index = engine_functions.get_constant(global.selected_id);
				if (index < constants.length) {
					constants[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_WIRE) {
				index = engine_functions.get_wire(global.selected_id);
				if (index < wires.length) {
					wires[index].increment_style();
				}
			} else if (global.selected_type === global.TYPE_NET) {
				index = engine_functions.get_net(global.selected_id);
				if (index < nets.length) {
					nets[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_NOTE) {
				index = engine_functions.get_note(global.selected_id);
				if (index < notes.length) {
					notes[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_RAIL) {
				index = engine_functions.get_rail(global.selected_id);
				if (index < rails.length) {
					rails[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_VOLTMETER) {
				index = engine_functions.get_voltmeter(global.selected_id);
				if (index < voltmeters.length) {
					voltmeters[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_OHMMETER) {
				index = engine_functions.get_ohmmeter(global.selected_id);
				if (index < ohmmeters.length) {
					ohmmeters[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_AMMETER) {
				index = engine_functions.get_ammeter(global.selected_id);
				if (index < ammeters.length) {
					ammeters[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_WATTMETER) {
				index = engine_functions.get_wattmeter(global.selected_id);
				if (index < wattmeters.length) {
					wattmeters[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_FUSE) {
				index = engine_functions.get_fuse(global.selected_id);
				if (index < fuses.length) {
					fuses[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_SPST) {
				index = engine_functions.get_spst(global.selected_id);
				if (index < spsts.length) {
					spsts[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_SPDT) {
				index = engine_functions.get_spdt(global.selected_id);
				if (index < spdts.length) {
					spdts[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_NOT) {
				index = engine_functions.get_not(global.selected_id);
				if (index < nots.length) {
					nots[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_DIODE) {
				index = engine_functions.get_diode(global.selected_id);
				if (index < diodes.length) {
					diodes[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_LED) {
				index = engine_functions.get_led(global.selected_id);
				if (index < leds.length) {
					leds[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_ZENER) {
				index = engine_functions.get_zener(global.selected_id);
				if (index < zeners.length) {
					zeners[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_POTENTIOMETER) {
				index = engine_functions.get_potentiometer(global.selected_id);
				if (index < potentiometers.length) {
					potentiometers[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_AND) {
				index = engine_functions.get_and(global.selected_id);
				if (index < ands.length) {
					ands[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_OR) {
				index = engine_functions.get_or(global.selected_id);
				if (index < ors.length) {
					ors[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_NAND) {
				index = engine_functions.get_nand(global.selected_id);
				if (index < nands.length) {
					nands[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_NOR) {
				index = engine_functions.get_nor(global.selected_id);
				if (index < nors.length) {
					nors[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_XOR) {
				index = engine_functions.get_xor(global.selected_id);
				if (index < xors.length) {
					xors[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_XNOR) {
				index = engine_functions.get_xnor(global.selected_id);
				if (index < xnors.length) {
					xnors[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_DFF) {
				index = engine_functions.get_dff(global.selected_id);
				if (index < dffs.length) {
					dffs[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_VSAT) {
				index = engine_functions.get_vsat(global.selected_id);
				if (index < vsats.length) {
					vsats[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_ADD) {
				index = engine_functions.get_adder(global.selected_id);
				if (index < adders.length) {
					adders[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_SUB) {
				index = engine_functions.get_subtractor(global.selected_id);
				if (index < subtractors.length) {
					subtractors[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_MUL) {
				index = engine_functions.get_multiplier(global.selected_id);
				if (index < multipliers.length) {
					multipliers[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_DIV) {
				index = engine_functions.get_divider(global.selected_id);
				if (index < dividers.length) {
					dividers[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_GAIN) {
				index = engine_functions.get_gain(global.selected_id);
				if (index < gains.length) {
					gains[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_ABS) {
				index = engine_functions.get_absval(global.selected_id);
				if (index < absvals.length) {
					absvals[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_VCSW) {
				index = engine_functions.get_vcsw(global.selected_id);
				if (index < vcsws.length) {
					vcsws[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_VCVS) {
				index = engine_functions.get_vcvs(global.selected_id);
				if (index < vcvss.length) {
					vcvss[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_VCCS) {
				index = engine_functions.get_vccs(global.selected_id);
				if (index < vccss.length) {
					vccss[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_CCCS) {
				index = engine_functions.get_cccs(global.selected_id);
				if (index < cccss.length) {
					cccss[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_CCVS) {
				index = engine_functions.get_ccvs(global.selected_id);
				if (index < ccvss.length) {
					ccvss[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_OPAMP) {
				index = engine_functions.get_opamp(global.selected_id);
				if (index < opamps.length) {
					opamps[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_NMOS) {
				index = engine_functions.get_nmosfet(global.selected_id);
				if (index < nmosfets.length) {
					nmosfets[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_PMOS) {
				index = engine_functions.get_pmosfet(global.selected_id);
				if (index < pmosfets.length) {
					pmosfets[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_NPN) {
				index = engine_functions.get_npn(global.selected_id);
				if (index < npns.length) {
					npns[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_PNP) {
				index = engine_functions.get_pnp(global.selected_id);
				if (index < pnps.length) {
					pnps[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_ADC) {
				index = engine_functions.get_adc(global.selected_id);
				if (index < adcs.length) {
					adcs[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_DAC) {
				index = engine_functions.get_dac(global.selected_id);
				if (index < dacs.length) {
					dacs[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_SAH) {
				index = engine_functions.get_samplers(global.selected_id);
				if (index < sandhs.length) {
					sandhs[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_PWM) {
				index = engine_functions.get_pwm(global.selected_id);
				if (index < pwms.length) {
					pwms[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_INTEGRATOR) {
				index = engine_functions.get_integrator(global.selected_id);
				if (index < integrators.length) {
					integrators[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
				index = engine_functions.get_differentiator(global.selected_id);
				if (index < differentiators.length) {
					differentiators[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_LPF) {
				index = engine_functions.get_lowpass(global.selected_id);
				if (index < lowpasses.length) {
					lowpasses[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_HPF) {
				index = engine_functions.get_highpass(global.selected_id);
				if (index < highpasses.length) {
					highpasses[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_REL) {
				index = engine_functions.get_relay(global.selected_id);
				if (index < relays.length) {
					relays[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_PID) {
				index = engine_functions.get_pid(global.selected_id);
				if (index < pids.length) {
					pids[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_LUT) {
				index = engine_functions.get_lut(global.selected_id);
				if (index < luts.length) {
					luts[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_VCR) {
				index = engine_functions.get_vcr(global.selected_id);
				if (index < vcrs.length) {
					vcrs[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_VCCA) {
				index = engine_functions.get_vcca(global.selected_id);
				if (index < vccas.length) {
					vccas[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_VCL) {
				index = engine_functions.get_vcl(global.selected_id);
				if (index < vcls.length) {
					vcls[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_GRT) {
				index = engine_functions.get_grt(global.selected_id);
				if (index < grts.length) {
					grts[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_TPTZ) {
				index = engine_functions.get_tptz(global.selected_id);
				if (index < tptzs.length) {
					tptzs[index].increment_rotation();
				}
			} else if (global.selected_type === global.TYPE_TRAN) {
				index = engine_functions.get_transformer(global.selected_id);
				if (index < transformers.length) {
					transformers[index].increment_rotation();
				}
			}
			/* <!-- END AUTOMATICALLY GENERATED !--> */
		}
	}
	handle_reset_window_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_RESET_WINDOW) {
			menu_bar.handle_element_options_flag(false);
			menu_bar.handle_element_options_edit_flag(false);
			menu_bar.handle_menu_open_flag(false);
			menu_bar.handle_menu_open_down_flag(false);
			menu_bar.handle_save_image_flag(false);
			menu_bar.handle_save_circuit_flag(false);
			menu_bar.handle_select_settings_flag(false);
			if (global.flag_simulating === true) {
				menu_bar.handle_simulation_flag(false);
			}
			if (global.flag_graph === true) {
				menu_bar.handle_graph_flag(false);
			}
			if (global.flag_remove_all === true) {
				menu_bar.handle_remove_all_flag(false);
			}
			if (global.flag_zoom === true) {
				menu_bar.handle_zoom_flag(false);
			}
			bottom_menu.handle_timestep_flag(false);
		}
	}
	handle_query_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_QUERY) {
			var text_input: HTMLElement = document.getElementById('text_input');
			let MeterTemplate: MeterTemplate_T = {
				Tag: '',
				Value: -1
			};
			let solution_vector: Array<MeterTemplate_T> = [];
			let met_max: number = global.meter_max();
			for (var i: number = 0; i < met_max; i++) {
				if (i < voltmeters.length) {
					MeterTemplate['Tag'] = voltmeters[i].elm.properties['tag'] + voltmeters[i].elm.id;
					MeterTemplate['Value'] = voltmeters[i].elm.properties['Voltage'];
					solution_vector.push(global.copy(MeterTemplate));
				}
				if (i < ohmmeters.length) {
					MeterTemplate['Tag'] = ohmmeters[i].elm.properties['tag'] + ohmmeters[i].elm.id;
					MeterTemplate['Value'] = ohmmeters[i].elm.properties['Sensed Resistance'];
					solution_vector.push(global.copy(MeterTemplate));
				}
				if (i < ammeters.length) {
					MeterTemplate['Tag'] = ammeters[i].elm.properties['tag'] + ammeters[i].elm.id;
					MeterTemplate['Value'] = ammeters[i].elm.properties['Current'];
					solution_vector.push(global.copy(MeterTemplate));
				}
				if (i < wattmeters.length) {
					MeterTemplate['Tag'] = wattmeters[i].elm.properties['tag'] + wattmeters[i].elm.id;
					MeterTemplate['Value'] = wattmeters[i].elm.properties['Wattage'];
					solution_vector.push(global.copy(MeterTemplate));
				}
			}
			//@ts-ignore
			text_input.value = JSON.stringify(solution_vector);
			//@ts-ignore
			text_input.select();
			//@ts-ignore
			text_input.setSelectionRange(0, 99999);
			document.execCommand('copy');
		}
	}
	handle_undo_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_UNDO) {
			history_manager.undo();
		}
	}
	handle_redo_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_REDO) {
			history_manager.redo();
		}
	}
	handle_save_image_flag(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_SAVE_IMAGE) {
			menu_bar.handle_save_image_flag(!global.flag_save_image);
		}
	}
	handle_save_circuit_flag(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_SAVE_CIRCUIT) {
			menu_bar.handle_save_circuit_flag(!global.flag_save_circuit);
		}
	}
	handle_flip_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_FLIP) {
			global.signal_build_element = true;
			let index: number = -1;
			/* #INSERT_GENERATE_ELEMENT_FLIP_SHORTCUT# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			if (global.selected_type === global.TYPE_RESISTOR) {
				index = engine_functions.get_resistor(global.selected_id);
				if (index < resistors.length) {
					resistors[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_CAPACITOR) {
				index = engine_functions.get_capacitor(global.selected_id);
				if (index < capacitors.length) {
					capacitors[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_INDUCTOR) {
				index = engine_functions.get_inductor(global.selected_id);
				if (index < inductors.length) {
					inductors[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_GROUND) {
				index = engine_functions.get_ground(global.selected_id);
				if (index < grounds.length) {
					grounds[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_DCSOURCE) {
				index = engine_functions.get_dcsource(global.selected_id);
				if (index < dcsources.length) {
					dcsources[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_DCCURRENT) {
				index = engine_functions.get_dccurrent(global.selected_id);
				if (index < dccurrents.length) {
					dccurrents[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_ACSOURCE) {
				index = engine_functions.get_acsource(global.selected_id);
				if (index < acsources.length) {
					acsources[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_ACCURRENT) {
				index = engine_functions.get_accurrent(global.selected_id);
				if (index < accurrents.length) {
					accurrents[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_SQUAREWAVE) {
				index = engine_functions.get_squarewave(global.selected_id);
				if (index < squarewaves.length) {
					squarewaves[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_SAW) {
				index = engine_functions.get_sawwave(global.selected_id);
				if (index < sawwaves.length) {
					sawwaves[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_TRI) {
				index = engine_functions.get_trianglewave(global.selected_id);
				if (index < trianglewaves.length) {
					trianglewaves[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_CONSTANT) {
				index = engine_functions.get_constant(global.selected_id);
				if (index < constants.length) {
					constants[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_WIRE) {
				index = engine_functions.get_wire(global.selected_id);
				if (index < wires.length) {
					wires[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_NET) {
				index = engine_functions.get_net(global.selected_id);
				if (index < nets.length) {
					nets[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_NOTE) {
				index = engine_functions.get_note(global.selected_id);
				if (index < notes.length) {
					notes[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_RAIL) {
				index = engine_functions.get_rail(global.selected_id);
				if (index < rails.length) {
					rails[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_VOLTMETER) {
				index = engine_functions.get_voltmeter(global.selected_id);
				if (index < voltmeters.length) {
					voltmeters[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_OHMMETER) {
				index = engine_functions.get_ohmmeter(global.selected_id);
				if (index < ohmmeters.length) {
					ohmmeters[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_AMMETER) {
				index = engine_functions.get_ammeter(global.selected_id);
				if (index < ammeters.length) {
					ammeters[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_WATTMETER) {
				index = engine_functions.get_wattmeter(global.selected_id);
				if (index < wattmeters.length) {
					wattmeters[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_FUSE) {
				index = engine_functions.get_fuse(global.selected_id);
				if (index < fuses.length) {
					fuses[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_SPST) {
				index = engine_functions.get_spst(global.selected_id);
				if (index < spsts.length) {
					spsts[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_SPDT) {
				index = engine_functions.get_spdt(global.selected_id);
				if (index < spdts.length) {
					spdts[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_NOT) {
				index = engine_functions.get_not(global.selected_id);
				if (index < nots.length) {
					nots[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_DIODE) {
				index = engine_functions.get_diode(global.selected_id);
				if (index < diodes.length) {
					diodes[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_LED) {
				index = engine_functions.get_led(global.selected_id);
				if (index < leds.length) {
					leds[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_ZENER) {
				index = engine_functions.get_zener(global.selected_id);
				if (index < zeners.length) {
					zeners[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_POTENTIOMETER) {
				index = engine_functions.get_potentiometer(global.selected_id);
				if (index < potentiometers.length) {
					potentiometers[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_AND) {
				index = engine_functions.get_and(global.selected_id);
				if (index < ands.length) {
					ands[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_OR) {
				index = engine_functions.get_or(global.selected_id);
				if (index < ors.length) {
					ors[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_NAND) {
				index = engine_functions.get_nand(global.selected_id);
				if (index < nands.length) {
					nands[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_NOR) {
				index = engine_functions.get_nor(global.selected_id);
				if (index < nors.length) {
					nors[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_XOR) {
				index = engine_functions.get_xor(global.selected_id);
				if (index < xors.length) {
					xors[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_XNOR) {
				index = engine_functions.get_xnor(global.selected_id);
				if (index < xnors.length) {
					xnors[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_DFF) {
				index = engine_functions.get_dff(global.selected_id);
				if (index < dffs.length) {
					dffs[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_VSAT) {
				index = engine_functions.get_vsat(global.selected_id);
				if (index < vsats.length) {
					vsats[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_ADD) {
				index = engine_functions.get_adder(global.selected_id);
				if (index < adders.length) {
					adders[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_SUB) {
				index = engine_functions.get_subtractor(global.selected_id);
				if (index < subtractors.length) {
					subtractors[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_MUL) {
				index = engine_functions.get_multiplier(global.selected_id);
				if (index < multipliers.length) {
					multipliers[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_DIV) {
				index = engine_functions.get_divider(global.selected_id);
				if (index < dividers.length) {
					dividers[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_GAIN) {
				index = engine_functions.get_gain(global.selected_id);
				if (index < gains.length) {
					gains[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_ABS) {
				index = engine_functions.get_absval(global.selected_id);
				if (index < absvals.length) {
					absvals[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_VCSW) {
				index = engine_functions.get_vcsw(global.selected_id);
				if (index < vcsws.length) {
					vcsws[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_VCVS) {
				index = engine_functions.get_vcvs(global.selected_id);
				if (index < vcvss.length) {
					vcvss[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_VCCS) {
				index = engine_functions.get_vccs(global.selected_id);
				if (index < vccss.length) {
					vccss[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_CCCS) {
				index = engine_functions.get_cccs(global.selected_id);
				if (index < cccss.length) {
					cccss[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_CCVS) {
				index = engine_functions.get_ccvs(global.selected_id);
				if (index < ccvss.length) {
					ccvss[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_OPAMP) {
				index = engine_functions.get_opamp(global.selected_id);
				if (index < opamps.length) {
					opamps[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_NMOS) {
				index = engine_functions.get_nmosfet(global.selected_id);
				if (index < nmosfets.length) {
					nmosfets[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_PMOS) {
				index = engine_functions.get_pmosfet(global.selected_id);
				if (index < pmosfets.length) {
					pmosfets[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_NPN) {
				index = engine_functions.get_npn(global.selected_id);
				if (index < npns.length) {
					npns[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_PNP) {
				index = engine_functions.get_pnp(global.selected_id);
				if (index < pnps.length) {
					pnps[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_ADC) {
				index = engine_functions.get_adc(global.selected_id);
				if (index < adcs.length) {
					adcs[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_DAC) {
				index = engine_functions.get_dac(global.selected_id);
				if (index < dacs.length) {
					dacs[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_SAH) {
				index = engine_functions.get_samplers(global.selected_id);
				if (index < sandhs.length) {
					sandhs[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_PWM) {
				index = engine_functions.get_pwm(global.selected_id);
				if (index < pwms.length) {
					pwms[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_INTEGRATOR) {
				index = engine_functions.get_integrator(global.selected_id);
				if (index < integrators.length) {
					integrators[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
				index = engine_functions.get_differentiator(global.selected_id);
				if (index < differentiators.length) {
					differentiators[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_LPF) {
				index = engine_functions.get_lowpass(global.selected_id);
				if (index < lowpasses.length) {
					lowpasses[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_HPF) {
				index = engine_functions.get_highpass(global.selected_id);
				if (index < highpasses.length) {
					highpasses[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_REL) {
				index = engine_functions.get_relay(global.selected_id);
				if (index < relays.length) {
					relays[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_PID) {
				index = engine_functions.get_pid(global.selected_id);
				if (index < pids.length) {
					pids[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_LUT) {
				index = engine_functions.get_lut(global.selected_id);
				if (index < luts.length) {
					luts[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_VCR) {
				index = engine_functions.get_vcr(global.selected_id);
				if (index < vcrs.length) {
					vcrs[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_VCCA) {
				index = engine_functions.get_vcca(global.selected_id);
				if (index < vccas.length) {
					vccas[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_VCL) {
				index = engine_functions.get_vcl(global.selected_id);
				if (index < vcls.length) {
					vcls[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_GRT) {
				index = engine_functions.get_grt(global.selected_id);
				if (index < grts.length) {
					grts[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_TPTZ) {
				index = engine_functions.get_tptz(global.selected_id);
				if (index < tptzs.length) {
					tptzs[index].increment_flip();
				}
			} else if (global.selected_type === global.TYPE_TRAN) {
				index = engine_functions.get_transformer(global.selected_id);
				if (index < transformers.length) {
					transformers[index].increment_flip();
				}
			}
			/* <!-- END AUTOMATICALLY GENERATED !--> */
		}
	}
	handle_edit_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_EDIT) {
			let index: number = -1;
			if (global.not_null(global.selected_properties)) {
				if (global.not_null(global.selected_properties['options'])) {
					if (
						element_options.opts['c1'] === element_options.EDIT_ICON ||
						element_options.opts['c2'] === element_options.EDIT_ICON ||
						element_options.opts['c3'] === element_options.EDIT_ICON ||
						element_options.opts['c4'] === element_options.EDIT_ICON
					) {
						menu_bar.handle_element_options_flag(!global.flag_element_options);
					}
					if (
						element_options.opts['c1'] === element_options.EYE_ICON ||
						element_options.opts['c2'] === element_options.EYE_ICON ||
						element_options.opts['c3'] === element_options.EYE_ICON ||
						element_options.opts['c4'] === element_options.EYE_ICON
					) {
						element_options.handle_eye_option();
					}
				}
			}
		}
	}
	handle_remove_all_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_REMOVE_ALL) {
			if (!global.flag_remove_all) {
				menu_bar.handle_remove_all_flag(!global.flag_remove_all);
			}
		}
	}
	handle_simulate_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_SIMULATE && key_event['ctrl'] === false) {
			menu_bar.handle_simulation_flag(!global.flag_simulating);
		}
	}
	handle_copy_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_COPY) {
			if (!global.multi_selected) {
				if (global.not_null(global.selected_type) && global.not_null(global.selected_properties) && global.not_null(global.selected_id)) {
					if (global.selected_type !== global.TYPE_WIRE) {
						global.clipboard_type = global.selected_type;
						global.clipboard_rotation = -1;
						global.clipboard_flip = -1;
						let index: number = -1;
						/* #INSERT_GENERATE_COPY_ELEMENT# */
						/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
						if (global.clipboard_type === global.TYPE_RESISTOR) {
							index = engine_functions.get_resistor(global.selected_id);
							if (index < resistors.length) {
								global.clipboard_rotation = resistors[index].elm.rotation;
								global.clipboard_flip = resistors[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_CAPACITOR) {
							index = engine_functions.get_capacitor(global.selected_id);
							if (index < capacitors.length) {
								global.clipboard_rotation = capacitors[index].elm.rotation;
								global.clipboard_flip = capacitors[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_INDUCTOR) {
							index = engine_functions.get_inductor(global.selected_id);
							if (index < inductors.length) {
								global.clipboard_rotation = inductors[index].elm.rotation;
								global.clipboard_flip = inductors[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_GROUND) {
							index = engine_functions.get_ground(global.selected_id);
							if (index < grounds.length) {
								global.clipboard_rotation = grounds[index].elm.rotation;
								global.clipboard_flip = grounds[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_DCSOURCE) {
							index = engine_functions.get_dcsource(global.selected_id);
							if (index < dcsources.length) {
								global.clipboard_rotation = dcsources[index].elm.rotation;
								global.clipboard_flip = dcsources[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_DCCURRENT) {
							index = engine_functions.get_dccurrent(global.selected_id);
							if (index < dccurrents.length) {
								global.clipboard_rotation = dccurrents[index].elm.rotation;
								global.clipboard_flip = dccurrents[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_ACSOURCE) {
							index = engine_functions.get_acsource(global.selected_id);
							if (index < acsources.length) {
								global.clipboard_rotation = acsources[index].elm.rotation;
								global.clipboard_flip = acsources[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_ACCURRENT) {
							index = engine_functions.get_accurrent(global.selected_id);
							if (index < accurrents.length) {
								global.clipboard_rotation = accurrents[index].elm.rotation;
								global.clipboard_flip = accurrents[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_SQUAREWAVE) {
							index = engine_functions.get_squarewave(global.selected_id);
							if (index < squarewaves.length) {
								global.clipboard_rotation = squarewaves[index].elm.rotation;
								global.clipboard_flip = squarewaves[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_SAW) {
							index = engine_functions.get_sawwave(global.selected_id);
							if (index < sawwaves.length) {
								global.clipboard_rotation = sawwaves[index].elm.rotation;
								global.clipboard_flip = sawwaves[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_TRI) {
							index = engine_functions.get_trianglewave(global.selected_id);
							if (index < trianglewaves.length) {
								global.clipboard_rotation = trianglewaves[index].elm.rotation;
								global.clipboard_flip = trianglewaves[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_CONSTANT) {
							index = engine_functions.get_constant(global.selected_id);
							if (index < constants.length) {
								global.clipboard_rotation = constants[index].elm.rotation;
								global.clipboard_flip = constants[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_NET) {
							index = engine_functions.get_net(global.selected_id);
							if (index < nets.length) {
								global.clipboard_rotation = nets[index].elm.rotation;
								global.clipboard_flip = nets[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_NOTE) {
							index = engine_functions.get_note(global.selected_id);
							if (index < notes.length) {
								global.clipboard_rotation = notes[index].elm.rotation;
								global.clipboard_flip = notes[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_RAIL) {
							index = engine_functions.get_rail(global.selected_id);
							if (index < rails.length) {
								global.clipboard_rotation = rails[index].elm.rotation;
								global.clipboard_flip = rails[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_VOLTMETER) {
							index = engine_functions.get_voltmeter(global.selected_id);
							if (index < voltmeters.length) {
								global.clipboard_rotation = voltmeters[index].elm.rotation;
								global.clipboard_flip = voltmeters[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_OHMMETER) {
							index = engine_functions.get_ohmmeter(global.selected_id);
							if (index < ohmmeters.length) {
								global.clipboard_rotation = ohmmeters[index].elm.rotation;
								global.clipboard_flip = ohmmeters[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_AMMETER) {
							index = engine_functions.get_ammeter(global.selected_id);
							if (index < ammeters.length) {
								global.clipboard_rotation = ammeters[index].elm.rotation;
								global.clipboard_flip = ammeters[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_WATTMETER) {
							index = engine_functions.get_wattmeter(global.selected_id);
							if (index < wattmeters.length) {
								global.clipboard_rotation = wattmeters[index].elm.rotation;
								global.clipboard_flip = wattmeters[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_FUSE) {
							index = engine_functions.get_fuse(global.selected_id);
							if (index < fuses.length) {
								global.clipboard_rotation = fuses[index].elm.rotation;
								global.clipboard_flip = fuses[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_SPST) {
							index = engine_functions.get_spst(global.selected_id);
							if (index < spsts.length) {
								global.clipboard_rotation = spsts[index].elm.rotation;
								global.clipboard_flip = spsts[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_SPDT) {
							index = engine_functions.get_spdt(global.selected_id);
							if (index < spdts.length) {
								global.clipboard_rotation = spdts[index].elm.rotation;
								global.clipboard_flip = spdts[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_NOT) {
							index = engine_functions.get_not(global.selected_id);
							if (index < nots.length) {
								global.clipboard_rotation = nots[index].elm.rotation;
								global.clipboard_flip = nots[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_DIODE) {
							index = engine_functions.get_diode(global.selected_id);
							if (index < diodes.length) {
								global.clipboard_rotation = diodes[index].elm.rotation;
								global.clipboard_flip = diodes[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_LED) {
							index = engine_functions.get_led(global.selected_id);
							if (index < leds.length) {
								global.clipboard_rotation = leds[index].elm.rotation;
								global.clipboard_flip = leds[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_ZENER) {
							index = engine_functions.get_zener(global.selected_id);
							if (index < zeners.length) {
								global.clipboard_rotation = zeners[index].elm.rotation;
								global.clipboard_flip = zeners[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_POTENTIOMETER) {
							index = engine_functions.get_potentiometer(global.selected_id);
							if (index < potentiometers.length) {
								global.clipboard_rotation = potentiometers[index].elm.rotation;
								global.clipboard_flip = potentiometers[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_AND) {
							index = engine_functions.get_and(global.selected_id);
							if (index < ands.length) {
								global.clipboard_rotation = ands[index].elm.rotation;
								global.clipboard_flip = ands[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_OR) {
							index = engine_functions.get_or(global.selected_id);
							if (index < ors.length) {
								global.clipboard_rotation = ors[index].elm.rotation;
								global.clipboard_flip = ors[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_NAND) {
							index = engine_functions.get_nand(global.selected_id);
							if (index < nands.length) {
								global.clipboard_rotation = nands[index].elm.rotation;
								global.clipboard_flip = nands[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_NOR) {
							index = engine_functions.get_nor(global.selected_id);
							if (index < nors.length) {
								global.clipboard_rotation = nors[index].elm.rotation;
								global.clipboard_flip = nors[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_XOR) {
							index = engine_functions.get_xor(global.selected_id);
							if (index < xors.length) {
								global.clipboard_rotation = xors[index].elm.rotation;
								global.clipboard_flip = xors[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_XNOR) {
							index = engine_functions.get_xnor(global.selected_id);
							if (index < xnors.length) {
								global.clipboard_rotation = xnors[index].elm.rotation;
								global.clipboard_flip = xnors[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_DFF) {
							index = engine_functions.get_dff(global.selected_id);
							if (index < dffs.length) {
								global.clipboard_rotation = dffs[index].elm.rotation;
								global.clipboard_flip = dffs[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_VSAT) {
							index = engine_functions.get_vsat(global.selected_id);
							if (index < vsats.length) {
								global.clipboard_rotation = vsats[index].elm.rotation;
								global.clipboard_flip = vsats[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_ADD) {
							index = engine_functions.get_adder(global.selected_id);
							if (index < adders.length) {
								global.clipboard_rotation = adders[index].elm.rotation;
								global.clipboard_flip = adders[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_SUB) {
							index = engine_functions.get_subtractor(global.selected_id);
							if (index < subtractors.length) {
								global.clipboard_rotation = subtractors[index].elm.rotation;
								global.clipboard_flip = subtractors[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_MUL) {
							index = engine_functions.get_multiplier(global.selected_id);
							if (index < multipliers.length) {
								global.clipboard_rotation = multipliers[index].elm.rotation;
								global.clipboard_flip = multipliers[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_DIV) {
							index = engine_functions.get_divider(global.selected_id);
							if (index < dividers.length) {
								global.clipboard_rotation = dividers[index].elm.rotation;
								global.clipboard_flip = dividers[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_GAIN) {
							index = engine_functions.get_gain(global.selected_id);
							if (index < gains.length) {
								global.clipboard_rotation = gains[index].elm.rotation;
								global.clipboard_flip = gains[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_ABS) {
							index = engine_functions.get_absval(global.selected_id);
							if (index < absvals.length) {
								global.clipboard_rotation = absvals[index].elm.rotation;
								global.clipboard_flip = absvals[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_VCSW) {
							index = engine_functions.get_vcsw(global.selected_id);
							if (index < vcsws.length) {
								global.clipboard_rotation = vcsws[index].elm.rotation;
								global.clipboard_flip = vcsws[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_VCVS) {
							index = engine_functions.get_vcvs(global.selected_id);
							if (index < vcvss.length) {
								global.clipboard_rotation = vcvss[index].elm.rotation;
								global.clipboard_flip = vcvss[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_VCCS) {
							index = engine_functions.get_vccs(global.selected_id);
							if (index < vccss.length) {
								global.clipboard_rotation = vccss[index].elm.rotation;
								global.clipboard_flip = vccss[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_CCCS) {
							index = engine_functions.get_cccs(global.selected_id);
							if (index < cccss.length) {
								global.clipboard_rotation = cccss[index].elm.rotation;
								global.clipboard_flip = cccss[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_CCVS) {
							index = engine_functions.get_ccvs(global.selected_id);
							if (index < ccvss.length) {
								global.clipboard_rotation = ccvss[index].elm.rotation;
								global.clipboard_flip = ccvss[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_OPAMP) {
							index = engine_functions.get_opamp(global.selected_id);
							if (index < opamps.length) {
								global.clipboard_rotation = opamps[index].elm.rotation;
								global.clipboard_flip = opamps[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_NMOS) {
							index = engine_functions.get_nmosfet(global.selected_id);
							if (index < nmosfets.length) {
								global.clipboard_rotation = nmosfets[index].elm.rotation;
								global.clipboard_flip = nmosfets[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_PMOS) {
							index = engine_functions.get_pmosfet(global.selected_id);
							if (index < pmosfets.length) {
								global.clipboard_rotation = pmosfets[index].elm.rotation;
								global.clipboard_flip = pmosfets[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_NPN) {
							index = engine_functions.get_npn(global.selected_id);
							if (index < npns.length) {
								global.clipboard_rotation = npns[index].elm.rotation;
								global.clipboard_flip = npns[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_PNP) {
							index = engine_functions.get_pnp(global.selected_id);
							if (index < pnps.length) {
								global.clipboard_rotation = pnps[index].elm.rotation;
								global.clipboard_flip = pnps[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_ADC) {
							index = engine_functions.get_adc(global.selected_id);
							if (index < adcs.length) {
								global.clipboard_rotation = adcs[index].elm.rotation;
								global.clipboard_flip = adcs[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_DAC) {
							index = engine_functions.get_dac(global.selected_id);
							if (index < dacs.length) {
								global.clipboard_rotation = dacs[index].elm.rotation;
								global.clipboard_flip = dacs[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_SAH) {
							index = engine_functions.get_samplers(global.selected_id);
							if (index < sandhs.length) {
								global.clipboard_rotation = sandhs[index].elm.rotation;
								global.clipboard_flip = sandhs[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_PWM) {
							index = engine_functions.get_pwm(global.selected_id);
							if (index < pwms.length) {
								global.clipboard_rotation = pwms[index].elm.rotation;
								global.clipboard_flip = pwms[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_INTEGRATOR) {
							index = engine_functions.get_integrator(global.selected_id);
							if (index < integrators.length) {
								global.clipboard_rotation = integrators[index].elm.rotation;
								global.clipboard_flip = integrators[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_DIFFERENTIATOR) {
							index = engine_functions.get_differentiator(global.selected_id);
							if (index < differentiators.length) {
								global.clipboard_rotation = differentiators[index].elm.rotation;
								global.clipboard_flip = differentiators[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_LPF) {
							index = engine_functions.get_lowpass(global.selected_id);
							if (index < lowpasses.length) {
								global.clipboard_rotation = lowpasses[index].elm.rotation;
								global.clipboard_flip = lowpasses[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_HPF) {
							index = engine_functions.get_highpass(global.selected_id);
							if (index < highpasses.length) {
								global.clipboard_rotation = highpasses[index].elm.rotation;
								global.clipboard_flip = highpasses[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_REL) {
							index = engine_functions.get_relay(global.selected_id);
							if (index < relays.length) {
								global.clipboard_rotation = relays[index].elm.rotation;
								global.clipboard_flip = relays[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_PID) {
							index = engine_functions.get_pid(global.selected_id);
							if (index < pids.length) {
								global.clipboard_rotation = pids[index].elm.rotation;
								global.clipboard_flip = pids[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_LUT) {
							index = engine_functions.get_lut(global.selected_id);
							if (index < luts.length) {
								global.clipboard_rotation = luts[index].elm.rotation;
								global.clipboard_flip = luts[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_VCR) {
							index = engine_functions.get_vcr(global.selected_id);
							if (index < vcrs.length) {
								global.clipboard_rotation = vcrs[index].elm.rotation;
								global.clipboard_flip = vcrs[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_VCCA) {
							index = engine_functions.get_vcca(global.selected_id);
							if (index < vccas.length) {
								global.clipboard_rotation = vccas[index].elm.rotation;
								global.clipboard_flip = vccas[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_VCL) {
							index = engine_functions.get_vcl(global.selected_id);
							if (index < vcls.length) {
								global.clipboard_rotation = vcls[index].elm.rotation;
								global.clipboard_flip = vcls[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_GRT) {
							index = engine_functions.get_grt(global.selected_id);
							if (index < grts.length) {
								global.clipboard_rotation = grts[index].elm.rotation;
								global.clipboard_flip = grts[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_TPTZ) {
							index = engine_functions.get_tptz(global.selected_id);
							if (index < tptzs.length) {
								global.clipboard_rotation = tptzs[index].elm.rotation;
								global.clipboard_flip = tptzs[index].elm.flip;
							}
						} else if (global.clipboard_type === global.TYPE_TRAN) {
							index = engine_functions.get_transformer(global.selected_id);
							if (index < transformers.length) {
								global.clipboard_rotation = transformers[index].elm.rotation;
								global.clipboard_flip = transformers[index].elm.flip;
							}
						}
						/* <!-- END AUTOMATICALLY GENERATED !--> */
						global.clipboard_property = global.copy(global.selected_properties);
						toast.set_text(language_manager.COPIED[global.LANGUAGES[global.language_index]] + ' {' + global.selected_properties['tag'] + global.selected_id + '}');
						toast.show();
					} else {
						toast.set_text(language_manager.CANNOT_COPY_WIRE[global.LANGUAGES[global.language_index]] + '.');
						toast.show();
					}
				}
			} else {
				toast.set_text(language_manager.CANNOT_MULTI_SELECT[global.LANGUAGES[global.language_index]] + '.');
				toast.show();
			}
		}
	}
	handle_paste_shortcut(key_event: KEY_EVENT_T): void {
		this.shift = key_event['shift'];
		this.command = key_event['event'].code;
		this.caps = key_event['caps'];
		if (this.command === this.SHORTCUT_PASTE) {
			global.signal_build_element = true;
			this.TEMP_HISTORY_SNAPSHOT = engine_functions.history_snapshot();
			let id: number = -1;
			let index: number = -1;
			if (global.not_null(global.clipboard_type) && global.not_null(global.clipboard_property)) {
				/* #INSERT_GENERATE_PASTE_ELEMENT# */
				/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
				if (global.clipboard_type === global.TYPE_RESISTOR) {
					id = engine_functions.get_resistor_assignment();
					engine_functions.add_resistor();
					index = engine_functions.get_resistor(id);
					if (index < resistors.length) {
						resistors[index].elm.set_properties(global.copy(global.clipboard_property));
						resistors[index].elm.set_rotation(global.clipboard_rotation);
						resistors[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_CAPACITOR) {
					id = engine_functions.get_capacitor_assignment();
					engine_functions.add_capacitor();
					index = engine_functions.get_capacitor(id);
					if (index < capacitors.length) {
						capacitors[index].elm.set_properties(global.copy(global.clipboard_property));
						capacitors[index].elm.set_rotation(global.clipboard_rotation);
						capacitors[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_INDUCTOR) {
					id = engine_functions.get_inductor_assignment();
					engine_functions.add_inductor();
					index = engine_functions.get_inductor(id);
					if (index < inductors.length) {
						inductors[index].elm.set_properties(global.copy(global.clipboard_property));
						inductors[index].elm.set_rotation(global.clipboard_rotation);
						inductors[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_GROUND) {
					id = engine_functions.get_ground_assignment();
					engine_functions.add_ground();
					index = engine_functions.get_ground(id);
					if (index < grounds.length) {
						grounds[index].elm.set_properties(global.copy(global.clipboard_property));
						grounds[index].elm.set_rotation(global.clipboard_rotation);
						grounds[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_DCSOURCE) {
					id = engine_functions.get_dcsource_assignment();
					engine_functions.add_dcsource();
					index = engine_functions.get_dcsource(id);
					if (index < dcsources.length) {
						dcsources[index].elm.set_properties(global.copy(global.clipboard_property));
						dcsources[index].elm.set_rotation(global.clipboard_rotation);
						dcsources[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_DCCURRENT) {
					id = engine_functions.get_dccurrent_assignment();
					engine_functions.add_dccurrent();
					index = engine_functions.get_dccurrent(id);
					if (index < dccurrents.length) {
						dccurrents[index].elm.set_properties(global.copy(global.clipboard_property));
						dccurrents[index].elm.set_rotation(global.clipboard_rotation);
						dccurrents[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_ACSOURCE) {
					id = engine_functions.get_acsource_assignment();
					engine_functions.add_acsource();
					index = engine_functions.get_acsource(id);
					if (index < acsources.length) {
						acsources[index].elm.set_properties(global.copy(global.clipboard_property));
						acsources[index].elm.set_rotation(global.clipboard_rotation);
						acsources[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_ACCURRENT) {
					id = engine_functions.get_accurrent_assignment();
					engine_functions.add_accurrent();
					index = engine_functions.get_accurrent(id);
					if (index < accurrents.length) {
						accurrents[index].elm.set_properties(global.copy(global.clipboard_property));
						accurrents[index].elm.set_rotation(global.clipboard_rotation);
						accurrents[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_SQUAREWAVE) {
					id = engine_functions.get_squarewave_assignment();
					engine_functions.add_squarewave();
					index = engine_functions.get_squarewave(id);
					if (index < squarewaves.length) {
						squarewaves[index].elm.set_properties(global.copy(global.clipboard_property));
						squarewaves[index].elm.set_rotation(global.clipboard_rotation);
						squarewaves[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_SAW) {
					id = engine_functions.get_sawwave_assignment();
					engine_functions.add_sawwave();
					index = engine_functions.get_sawwave(id);
					if (index < sawwaves.length) {
						sawwaves[index].elm.set_properties(global.copy(global.clipboard_property));
						sawwaves[index].elm.set_rotation(global.clipboard_rotation);
						sawwaves[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_TRI) {
					id = engine_functions.get_trianglewave_assignment();
					engine_functions.add_trianglewave();
					index = engine_functions.get_trianglewave(id);
					if (index < trianglewaves.length) {
						trianglewaves[index].elm.set_properties(global.copy(global.clipboard_property));
						trianglewaves[index].elm.set_rotation(global.clipboard_rotation);
						trianglewaves[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_CONSTANT) {
					id = engine_functions.get_constant_assignment();
					engine_functions.add_constant();
					index = engine_functions.get_constant(id);
					if (index < constants.length) {
						constants[index].elm.set_properties(global.copy(global.clipboard_property));
						constants[index].elm.set_rotation(global.clipboard_rotation);
						constants[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_NET) {
					id = engine_functions.get_net_assignment();
					engine_functions.add_net();
					index = engine_functions.get_net(id);
					if (index < nets.length) {
						nets[index].elm.set_properties(global.copy(global.clipboard_property));
						nets[index].elm.set_rotation(global.clipboard_rotation);
						nets[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_NOTE) {
					id = engine_functions.get_note_assignment();
					engine_functions.add_note();
					index = engine_functions.get_note(id);
					if (index < notes.length) {
						notes[index].elm.set_properties(global.copy(global.clipboard_property));
						notes[index].elm.set_rotation(global.clipboard_rotation);
						notes[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_RAIL) {
					id = engine_functions.get_rail_assignment();
					engine_functions.add_rail();
					index = engine_functions.get_rail(id);
					if (index < rails.length) {
						rails[index].elm.set_properties(global.copy(global.clipboard_property));
						rails[index].elm.set_rotation(global.clipboard_rotation);
						rails[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_VOLTMETER) {
					id = engine_functions.get_voltmeter_assignment();
					engine_functions.add_voltmeter();
					index = engine_functions.get_voltmeter(id);
					if (index < voltmeters.length) {
						voltmeters[index].elm.set_properties(global.copy(global.clipboard_property));
						voltmeters[index].elm.set_rotation(global.clipboard_rotation);
						voltmeters[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_OHMMETER) {
					id = engine_functions.get_ohmmeter_assignment();
					engine_functions.add_ohmmeter();
					index = engine_functions.get_ohmmeter(id);
					if (index < ohmmeters.length) {
						ohmmeters[index].elm.set_properties(global.copy(global.clipboard_property));
						ohmmeters[index].elm.set_rotation(global.clipboard_rotation);
						ohmmeters[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_AMMETER) {
					id = engine_functions.get_ammeter_assignment();
					engine_functions.add_ammeter();
					index = engine_functions.get_ammeter(id);
					if (index < ammeters.length) {
						ammeters[index].elm.set_properties(global.copy(global.clipboard_property));
						ammeters[index].elm.set_rotation(global.clipboard_rotation);
						ammeters[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_WATTMETER) {
					id = engine_functions.get_wattmeter_assignment();
					engine_functions.add_wattmeter();
					index = engine_functions.get_wattmeter(id);
					if (index < wattmeters.length) {
						wattmeters[index].elm.set_properties(global.copy(global.clipboard_property));
						wattmeters[index].elm.set_rotation(global.clipboard_rotation);
						wattmeters[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_FUSE) {
					id = engine_functions.get_fuse_assignment();
					engine_functions.add_fuse();
					index = engine_functions.get_fuse(id);
					if (index < fuses.length) {
						fuses[index].elm.set_properties(global.copy(global.clipboard_property));
						fuses[index].elm.set_rotation(global.clipboard_rotation);
						fuses[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_SPST) {
					id = engine_functions.get_spst_assignment();
					engine_functions.add_spst();
					index = engine_functions.get_spst(id);
					if (index < spsts.length) {
						spsts[index].elm.set_properties(global.copy(global.clipboard_property));
						spsts[index].elm.set_rotation(global.clipboard_rotation);
						spsts[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_SPDT) {
					id = engine_functions.get_spdt_assignment();
					engine_functions.add_spdt();
					index = engine_functions.get_spdt(id);
					if (index < spdts.length) {
						spdts[index].elm.set_properties(global.copy(global.clipboard_property));
						spdts[index].elm.set_rotation(global.clipboard_rotation);
						spdts[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_NOT) {
					id = engine_functions.get_not_assignment();
					engine_functions.add_not();
					index = engine_functions.get_not(id);
					if (index < nots.length) {
						nots[index].elm.set_properties(global.copy(global.clipboard_property));
						nots[index].elm.set_rotation(global.clipboard_rotation);
						nots[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_DIODE) {
					id = engine_functions.get_diode_assignment();
					engine_functions.add_diode();
					index = engine_functions.get_diode(id);
					if (index < diodes.length) {
						diodes[index].elm.set_properties(global.copy(global.clipboard_property));
						diodes[index].elm.set_rotation(global.clipboard_rotation);
						diodes[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_LED) {
					id = engine_functions.get_led_assignment();
					engine_functions.add_led();
					index = engine_functions.get_led(id);
					if (index < leds.length) {
						leds[index].elm.set_properties(global.copy(global.clipboard_property));
						leds[index].elm.set_rotation(global.clipboard_rotation);
						leds[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_ZENER) {
					id = engine_functions.get_zener_assignment();
					engine_functions.add_zener();
					index = engine_functions.get_zener(id);
					if (index < zeners.length) {
						zeners[index].elm.set_properties(global.copy(global.clipboard_property));
						zeners[index].elm.set_rotation(global.clipboard_rotation);
						zeners[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_POTENTIOMETER) {
					id = engine_functions.get_potentiometer_assignment();
					engine_functions.add_potentiometer();
					index = engine_functions.get_potentiometer(id);
					if (index < potentiometers.length) {
						potentiometers[index].elm.set_properties(global.copy(global.clipboard_property));
						potentiometers[index].elm.set_rotation(global.clipboard_rotation);
						potentiometers[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_AND) {
					id = engine_functions.get_and_assignment();
					engine_functions.add_and();
					index = engine_functions.get_and(id);
					if (index < ands.length) {
						ands[index].elm.set_properties(global.copy(global.clipboard_property));
						ands[index].elm.set_rotation(global.clipboard_rotation);
						ands[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_OR) {
					id = engine_functions.get_or_assignment();
					engine_functions.add_or();
					index = engine_functions.get_or(id);
					if (index < ors.length) {
						ors[index].elm.set_properties(global.copy(global.clipboard_property));
						ors[index].elm.set_rotation(global.clipboard_rotation);
						ors[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_NAND) {
					id = engine_functions.get_nand_assignment();
					engine_functions.add_nand();
					index = engine_functions.get_nand(id);
					if (index < nands.length) {
						nands[index].elm.set_properties(global.copy(global.clipboard_property));
						nands[index].elm.set_rotation(global.clipboard_rotation);
						nands[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_NOR) {
					id = engine_functions.get_nor_assignment();
					engine_functions.add_nor();
					index = engine_functions.get_nor(id);
					if (index < nors.length) {
						nors[index].elm.set_properties(global.copy(global.clipboard_property));
						nors[index].elm.set_rotation(global.clipboard_rotation);
						nors[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_XOR) {
					id = engine_functions.get_xor_assignment();
					engine_functions.add_xor();
					index = engine_functions.get_xor(id);
					if (index < xors.length) {
						xors[index].elm.set_properties(global.copy(global.clipboard_property));
						xors[index].elm.set_rotation(global.clipboard_rotation);
						xors[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_XNOR) {
					id = engine_functions.get_xnor_assignment();
					engine_functions.add_xnor();
					index = engine_functions.get_xnor(id);
					if (index < xnors.length) {
						xnors[index].elm.set_properties(global.copy(global.clipboard_property));
						xnors[index].elm.set_rotation(global.clipboard_rotation);
						xnors[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_DFF) {
					id = engine_functions.get_dff_assignment();
					engine_functions.add_dff();
					index = engine_functions.get_dff(id);
					if (index < dffs.length) {
						dffs[index].elm.set_properties(global.copy(global.clipboard_property));
						dffs[index].elm.set_rotation(global.clipboard_rotation);
						dffs[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_VSAT) {
					id = engine_functions.get_vsat_assignment();
					engine_functions.add_vsat();
					index = engine_functions.get_vsat(id);
					if (index < vsats.length) {
						vsats[index].elm.set_properties(global.copy(global.clipboard_property));
						vsats[index].elm.set_rotation(global.clipboard_rotation);
						vsats[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_ADD) {
					id = engine_functions.get_adder_assignment();
					engine_functions.add_adder();
					index = engine_functions.get_adder(id);
					if (index < adders.length) {
						adders[index].elm.set_properties(global.copy(global.clipboard_property));
						adders[index].elm.set_rotation(global.clipboard_rotation);
						adders[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_SUB) {
					id = engine_functions.get_subtractor_assignment();
					engine_functions.add_subtractor();
					index = engine_functions.get_subtractor(id);
					if (index < subtractors.length) {
						subtractors[index].elm.set_properties(global.copy(global.clipboard_property));
						subtractors[index].elm.set_rotation(global.clipboard_rotation);
						subtractors[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_MUL) {
					id = engine_functions.get_multiplier_assignment();
					engine_functions.add_multiplier();
					index = engine_functions.get_multiplier(id);
					if (index < multipliers.length) {
						multipliers[index].elm.set_properties(global.copy(global.clipboard_property));
						multipliers[index].elm.set_rotation(global.clipboard_rotation);
						multipliers[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_DIV) {
					id = engine_functions.get_divider_assignment();
					engine_functions.add_divider();
					index = engine_functions.get_divider(id);
					if (index < dividers.length) {
						dividers[index].elm.set_properties(global.copy(global.clipboard_property));
						dividers[index].elm.set_rotation(global.clipboard_rotation);
						dividers[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_GAIN) {
					id = engine_functions.get_gain_assignment();
					engine_functions.add_gain();
					index = engine_functions.get_gain(id);
					if (index < gains.length) {
						gains[index].elm.set_properties(global.copy(global.clipboard_property));
						gains[index].elm.set_rotation(global.clipboard_rotation);
						gains[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_ABS) {
					id = engine_functions.get_absval_assignment();
					engine_functions.add_absval();
					index = engine_functions.get_absval(id);
					if (index < absvals.length) {
						absvals[index].elm.set_properties(global.copy(global.clipboard_property));
						absvals[index].elm.set_rotation(global.clipboard_rotation);
						absvals[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_VCSW) {
					id = engine_functions.get_vcsw_assignment();
					engine_functions.add_vcsw();
					index = engine_functions.get_vcsw(id);
					if (index < vcsws.length) {
						vcsws[index].elm.set_properties(global.copy(global.clipboard_property));
						vcsws[index].elm.set_rotation(global.clipboard_rotation);
						vcsws[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_VCVS) {
					id = engine_functions.get_vcvs_assignment();
					engine_functions.add_vcvs();
					index = engine_functions.get_vcvs(id);
					if (index < vcvss.length) {
						vcvss[index].elm.set_properties(global.copy(global.clipboard_property));
						vcvss[index].elm.set_rotation(global.clipboard_rotation);
						vcvss[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_VCCS) {
					id = engine_functions.get_vccs_assignment();
					engine_functions.add_vccs();
					index = engine_functions.get_vccs(id);
					if (index < vccss.length) {
						vccss[index].elm.set_properties(global.copy(global.clipboard_property));
						vccss[index].elm.set_rotation(global.clipboard_rotation);
						vccss[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_CCCS) {
					id = engine_functions.get_cccs_assignment();
					engine_functions.add_cccs();
					index = engine_functions.get_cccs(id);
					if (index < cccss.length) {
						cccss[index].elm.set_properties(global.copy(global.clipboard_property));
						cccss[index].elm.set_rotation(global.clipboard_rotation);
						cccss[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_CCVS) {
					id = engine_functions.get_ccvs_assignment();
					engine_functions.add_ccvs();
					index = engine_functions.get_ccvs(id);
					if (index < ccvss.length) {
						ccvss[index].elm.set_properties(global.copy(global.clipboard_property));
						ccvss[index].elm.set_rotation(global.clipboard_rotation);
						ccvss[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_OPAMP) {
					id = engine_functions.get_opamp_assignment();
					engine_functions.add_opamp();
					index = engine_functions.get_opamp(id);
					if (index < opamps.length) {
						opamps[index].elm.set_properties(global.copy(global.clipboard_property));
						opamps[index].elm.set_rotation(global.clipboard_rotation);
						opamps[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_NMOS) {
					id = engine_functions.get_nmosfet_assignment();
					engine_functions.add_nmosfet();
					index = engine_functions.get_nmosfet(id);
					if (index < nmosfets.length) {
						nmosfets[index].elm.set_properties(global.copy(global.clipboard_property));
						nmosfets[index].elm.set_rotation(global.clipboard_rotation);
						nmosfets[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_PMOS) {
					id = engine_functions.get_pmosfet_assignment();
					engine_functions.add_pmosfet();
					index = engine_functions.get_pmosfet(id);
					if (index < pmosfets.length) {
						pmosfets[index].elm.set_properties(global.copy(global.clipboard_property));
						pmosfets[index].elm.set_rotation(global.clipboard_rotation);
						pmosfets[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_NPN) {
					id = engine_functions.get_npn_assignment();
					engine_functions.add_npn();
					index = engine_functions.get_npn(id);
					if (index < npns.length) {
						npns[index].elm.set_properties(global.copy(global.clipboard_property));
						npns[index].elm.set_rotation(global.clipboard_rotation);
						npns[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_PNP) {
					id = engine_functions.get_pnp_assignment();
					engine_functions.add_pnp();
					index = engine_functions.get_pnp(id);
					if (index < pnps.length) {
						pnps[index].elm.set_properties(global.copy(global.clipboard_property));
						pnps[index].elm.set_rotation(global.clipboard_rotation);
						pnps[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_ADC) {
					id = engine_functions.get_adc_assignment();
					engine_functions.add_adc();
					index = engine_functions.get_adc(id);
					if (index < adcs.length) {
						adcs[index].elm.set_properties(global.copy(global.clipboard_property));
						adcs[index].elm.set_rotation(global.clipboard_rotation);
						adcs[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_DAC) {
					id = engine_functions.get_dac_assignment();
					engine_functions.add_dac();
					index = engine_functions.get_dac(id);
					if (index < dacs.length) {
						dacs[index].elm.set_properties(global.copy(global.clipboard_property));
						dacs[index].elm.set_rotation(global.clipboard_rotation);
						dacs[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_SAH) {
					id = engine_functions.get_samplers_assignment();
					engine_functions.add_samplers();
					index = engine_functions.get_samplers(id);
					if (index < sandhs.length) {
						sandhs[index].elm.set_properties(global.copy(global.clipboard_property));
						sandhs[index].elm.set_rotation(global.clipboard_rotation);
						sandhs[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_PWM) {
					id = engine_functions.get_pwm_assignment();
					engine_functions.add_pwm();
					index = engine_functions.get_pwm(id);
					if (index < pwms.length) {
						pwms[index].elm.set_properties(global.copy(global.clipboard_property));
						pwms[index].elm.set_rotation(global.clipboard_rotation);
						pwms[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_INTEGRATOR) {
					id = engine_functions.get_integrator_assignment();
					engine_functions.add_integrator();
					index = engine_functions.get_integrator(id);
					if (index < integrators.length) {
						integrators[index].elm.set_properties(global.copy(global.clipboard_property));
						integrators[index].elm.set_rotation(global.clipboard_rotation);
						integrators[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_DIFFERENTIATOR) {
					id = engine_functions.get_differentiator_assignment();
					engine_functions.add_differentiator();
					index = engine_functions.get_differentiator(id);
					if (index < differentiators.length) {
						differentiators[index].elm.set_properties(global.copy(global.clipboard_property));
						differentiators[index].elm.set_rotation(global.clipboard_rotation);
						differentiators[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_LPF) {
					id = engine_functions.get_lowpass_assignment();
					engine_functions.add_lowpass();
					index = engine_functions.get_lowpass(id);
					if (index < lowpasses.length) {
						lowpasses[index].elm.set_properties(global.copy(global.clipboard_property));
						lowpasses[index].elm.set_rotation(global.clipboard_rotation);
						lowpasses[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_HPF) {
					id = engine_functions.get_highpass_assignment();
					engine_functions.add_highpass();
					index = engine_functions.get_highpass(id);
					if (index < highpasses.length) {
						highpasses[index].elm.set_properties(global.copy(global.clipboard_property));
						highpasses[index].elm.set_rotation(global.clipboard_rotation);
						highpasses[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_REL) {
					id = engine_functions.get_relay_assignment();
					engine_functions.add_relay();
					index = engine_functions.get_relay(id);
					if (index < relays.length) {
						relays[index].elm.set_properties(global.copy(global.clipboard_property));
						relays[index].elm.set_rotation(global.clipboard_rotation);
						relays[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_PID) {
					id = engine_functions.get_pid_assignment();
					engine_functions.add_pid();
					index = engine_functions.get_pid(id);
					if (index < pids.length) {
						pids[index].elm.set_properties(global.copy(global.clipboard_property));
						pids[index].elm.set_rotation(global.clipboard_rotation);
						pids[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_LUT) {
					id = engine_functions.get_lut_assignment();
					engine_functions.add_lut();
					index = engine_functions.get_lut(id);
					if (index < luts.length) {
						luts[index].elm.set_properties(global.copy(global.clipboard_property));
						luts[index].elm.set_rotation(global.clipboard_rotation);
						luts[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_VCR) {
					id = engine_functions.get_vcr_assignment();
					engine_functions.add_vcr();
					index = engine_functions.get_vcr(id);
					if (index < vcrs.length) {
						vcrs[index].elm.set_properties(global.copy(global.clipboard_property));
						vcrs[index].elm.set_rotation(global.clipboard_rotation);
						vcrs[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_VCCA) {
					id = engine_functions.get_vcca_assignment();
					engine_functions.add_vcca();
					index = engine_functions.get_vcca(id);
					if (index < vccas.length) {
						vccas[index].elm.set_properties(global.copy(global.clipboard_property));
						vccas[index].elm.set_rotation(global.clipboard_rotation);
						vccas[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_VCL) {
					id = engine_functions.get_vcl_assignment();
					engine_functions.add_vcl();
					index = engine_functions.get_vcl(id);
					if (index < vcls.length) {
						vcls[index].elm.set_properties(global.copy(global.clipboard_property));
						vcls[index].elm.set_rotation(global.clipboard_rotation);
						vcls[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_GRT) {
					id = engine_functions.get_grt_assignment();
					engine_functions.add_grt();
					index = engine_functions.get_grt(id);
					if (index < grts.length) {
						grts[index].elm.set_properties(global.copy(global.clipboard_property));
						grts[index].elm.set_rotation(global.clipboard_rotation);
						grts[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_TPTZ) {
					id = engine_functions.get_tptz_assignment();
					engine_functions.add_tptz();
					index = engine_functions.get_tptz(id);
					if (index < tptzs.length) {
						tptzs[index].elm.set_properties(global.copy(global.clipboard_property));
						tptzs[index].elm.set_rotation(global.clipboard_rotation);
						tptzs[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				} else if (global.clipboard_type === global.TYPE_TRAN) {
					id = engine_functions.get_transformer_assignment();
					engine_functions.add_transformer();
					index = engine_functions.get_transformer(id);
					if (index < transformers.length) {
						transformers[index].elm.set_properties(global.copy(global.clipboard_property));
						transformers[index].elm.set_rotation(global.clipboard_rotation);
						transformers[index].elm.set_flip(global.clipboard_flip);
						global.signal_history_lock = true;
					}
				}
				/* <!-- END AUTOMATICALLY GENERATED !--> */
			} else {
				toast.set_text(language_manager.NO_CLIPBOARD_DATA[global.LANGUAGES[global.language_index]] + '.');
				toast.show();
			}
		}
	}
	/* #INSERT_GENERATE_HANDLE_MULTI_SELECT_ELEMENTS_MOVE# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	handle_move_resistors(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < resistors.length) {
			if (resistors[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						resistors[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						resistors[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						resistors[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						resistors[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_capacitors(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < capacitors.length) {
			if (capacitors[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						capacitors[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						capacitors[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						capacitors[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						capacitors[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_inductors(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < inductors.length) {
			if (inductors[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						inductors[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						inductors[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						inductors[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						inductors[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_grounds(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < grounds.length) {
			if (grounds[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						grounds[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						grounds[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						grounds[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						grounds[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_dcsources(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < dcsources.length) {
			if (dcsources[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						dcsources[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						dcsources[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dcsources[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dcsources[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_dccurrents(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < dccurrents.length) {
			if (dccurrents[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						dccurrents[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						dccurrents[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dccurrents[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dccurrents[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_acsources(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < acsources.length) {
			if (acsources[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						acsources[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						acsources[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						acsources[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						acsources[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_accurrents(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < accurrents.length) {
			if (accurrents[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						accurrents[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						accurrents[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						accurrents[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						accurrents[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_squarewaves(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < squarewaves.length) {
			if (squarewaves[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						squarewaves[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						squarewaves[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						squarewaves[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						squarewaves[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_sawwaves(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < sawwaves.length) {
			if (sawwaves[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						sawwaves[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						sawwaves[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						sawwaves[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						sawwaves[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_trianglewaves(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < trianglewaves.length) {
			if (trianglewaves[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						trianglewaves[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						trianglewaves[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						trianglewaves[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						trianglewaves[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_constants(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < constants.length) {
			if (constants[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						constants[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						constants[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						constants[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						constants[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_wires(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < wires.length) {
			if (wires[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						wires[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						wires[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						wires[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						wires[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_nets(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < nets.length) {
			if (nets[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						nets[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						nets[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nets[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nets[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_notes(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < notes.length) {
			if (notes[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						notes[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						notes[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						notes[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						notes[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_rails(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < rails.length) {
			if (rails[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						rails[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						rails[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						rails[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						rails[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_voltmeters(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < voltmeters.length) {
			if (voltmeters[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						voltmeters[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						voltmeters[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						voltmeters[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						voltmeters[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_ohmmeters(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < ohmmeters.length) {
			if (ohmmeters[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						ohmmeters[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						ohmmeters[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ohmmeters[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ohmmeters[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_ammeters(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < ammeters.length) {
			if (ammeters[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						ammeters[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						ammeters[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ammeters[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ammeters[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_wattmeters(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < wattmeters.length) {
			if (wattmeters[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						wattmeters[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						wattmeters[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						wattmeters[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						wattmeters[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_fuses(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < fuses.length) {
			if (fuses[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						fuses[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						fuses[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						fuses[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						fuses[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_spsts(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < spsts.length) {
			if (spsts[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						spsts[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						spsts[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						spsts[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						spsts[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_spdts(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < spdts.length) {
			if (spdts[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						spdts[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						spdts[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						spdts[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						spdts[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_nots(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < nots.length) {
			if (nots[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						nots[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						nots[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nots[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nots[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_diodes(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < diodes.length) {
			if (diodes[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						diodes[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						diodes[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						diodes[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						diodes[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_leds(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < leds.length) {
			if (leds[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						leds[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						leds[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						leds[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						leds[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_zeners(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < zeners.length) {
			if (zeners[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						zeners[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						zeners[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						zeners[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						zeners[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_potentiometers(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < potentiometers.length) {
			if (potentiometers[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						potentiometers[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						potentiometers[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						potentiometers[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						potentiometers[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_ands(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < ands.length) {
			if (ands[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						ands[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						ands[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ands[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ands[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_ors(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < ors.length) {
			if (ors[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						ors[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						ors[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ors[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ors[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_nands(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < nands.length) {
			if (nands[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						nands[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						nands[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nands[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nands[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_nors(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < nors.length) {
			if (nors[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						nors[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						nors[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nors[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nors[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_xors(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < xors.length) {
			if (xors[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						xors[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						xors[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						xors[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						xors[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_xnors(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < xnors.length) {
			if (xnors[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						xnors[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						xnors[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						xnors[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						xnors[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_dffs(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < dffs.length) {
			if (dffs[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						dffs[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						dffs[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dffs[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dffs[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_vsats(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < vsats.length) {
			if (vsats[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						vsats[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						vsats[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vsats[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vsats[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_adders(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < adders.length) {
			if (adders[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						adders[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						adders[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						adders[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						adders[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_subtractors(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < subtractors.length) {
			if (subtractors[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						subtractors[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						subtractors[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						subtractors[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						subtractors[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_multipliers(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < multipliers.length) {
			if (multipliers[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						multipliers[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						multipliers[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						multipliers[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						multipliers[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_dividers(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < dividers.length) {
			if (dividers[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						dividers[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						dividers[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dividers[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dividers[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_gains(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < gains.length) {
			if (gains[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						gains[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						gains[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						gains[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						gains[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_absvals(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < absvals.length) {
			if (absvals[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						absvals[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						absvals[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						absvals[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						absvals[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_vcsws(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < vcsws.length) {
			if (vcsws[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						vcsws[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						vcsws[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vcsws[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vcsws[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_vcvss(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < vcvss.length) {
			if (vcvss[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						vcvss[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						vcvss[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vcvss[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vcvss[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_vccss(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < vccss.length) {
			if (vccss[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						vccss[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						vccss[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vccss[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vccss[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_cccss(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < cccss.length) {
			if (cccss[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						cccss[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						cccss[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						cccss[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						cccss[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_ccvss(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < ccvss.length) {
			if (ccvss[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						ccvss[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						ccvss[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ccvss[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						ccvss[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_opamps(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < opamps.length) {
			if (opamps[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						opamps[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						opamps[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						opamps[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						opamps[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_nmosfets(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < nmosfets.length) {
			if (nmosfets[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						nmosfets[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						nmosfets[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nmosfets[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						nmosfets[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_pmosfets(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < pmosfets.length) {
			if (pmosfets[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						pmosfets[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						pmosfets[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						pmosfets[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						pmosfets[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_npns(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < npns.length) {
			if (npns[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						npns[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						npns[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						npns[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						npns[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_pnps(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < pnps.length) {
			if (pnps[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						pnps[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						pnps[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						pnps[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						pnps[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_adcs(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < adcs.length) {
			if (adcs[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						adcs[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						adcs[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						adcs[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						adcs[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_dacs(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < dacs.length) {
			if (dacs[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						dacs[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						dacs[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dacs[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						dacs[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_sandhs(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < sandhs.length) {
			if (sandhs[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						sandhs[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						sandhs[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						sandhs[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						sandhs[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_pwms(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < pwms.length) {
			if (pwms[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						pwms[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						pwms[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						pwms[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						pwms[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_integrators(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < integrators.length) {
			if (integrators[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						integrators[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						integrators[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						integrators[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						integrators[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_differentiators(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < differentiators.length) {
			if (differentiators[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						differentiators[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						differentiators[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						differentiators[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						differentiators[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_lowpasses(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < lowpasses.length) {
			if (lowpasses[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						lowpasses[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						lowpasses[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						lowpasses[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						lowpasses[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_highpasses(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < highpasses.length) {
			if (highpasses[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						highpasses[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						highpasses[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						highpasses[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						highpasses[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_relays(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < relays.length) {
			if (relays[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						relays[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						relays[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						relays[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						relays[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_pids(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < pids.length) {
			if (pids[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						pids[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						pids[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						pids[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						pids[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_luts(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < luts.length) {
			if (luts[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						luts[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						luts[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						luts[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						luts[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_vcrs(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < vcrs.length) {
			if (vcrs[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						vcrs[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						vcrs[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vcrs[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vcrs[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_vccas(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < vccas.length) {
			if (vccas[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						vccas[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						vccas[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vccas[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vccas[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_vcls(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < vcls.length) {
			if (vcls[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						vcls[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						vcls[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vcls[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						vcls[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_grts(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < grts.length) {
			if (grts[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						grts[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						grts[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						grts[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						grts[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_tptzs(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < tptzs.length) {
			if (tptzs[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						tptzs[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						tptzs[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						tptzs[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						tptzs[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}

	handle_move_transformers(i: number, key_event: KEY_EVENT_T): void {
		if (i > -1 && i < transformers.length) {
			if (transformers[i].MULTI_SELECTED) {
				if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						global.signal_build_element = true;
						transformers[i].move_element(0, -global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y) {
						this.MULTI_MOVED_ELEMENT = true;
						transformers[i].move_element(0, global.node_space_y);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						transformers[i].move_element(-global.node_space_x, 0);
					}
				} else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
					if (multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x) {
						this.MULTI_MOVED_ELEMENT = true;
						transformers[i].move_element(global.node_space_x, 0);
					}
				}
			}
		}
	}
	/* <!-- END AUTOMATICALLY GENERATED !--> */
	handle_remove_multi_select_elements() {
		this.MULTI_DELETED_ELEMENT = false;
		let elm_max: number = global.element_max();
		for (var i: number = elm_max - 1; i > -1; i--) {
			/* #INSERT_GENERATE_HANDLE_REMOVE_MULTI_SELECT_ELEMENTS# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			if (i > -1 && i < resistors.length) {
				if (resistors[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_resistor(i);
				}
			}
			if (i > -1 && i < capacitors.length) {
				if (capacitors[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_capacitor(i);
				}
			}
			if (i > -1 && i < inductors.length) {
				if (inductors[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_inductor(i);
				}
			}
			if (i > -1 && i < grounds.length) {
				if (grounds[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_ground(i);
				}
			}
			if (i > -1 && i < dcsources.length) {
				if (dcsources[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_dcsource(i);
				}
			}
			if (i > -1 && i < dccurrents.length) {
				if (dccurrents[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_dccurrent(i);
				}
			}
			if (i > -1 && i < acsources.length) {
				if (acsources[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_acsource(i);
				}
			}
			if (i > -1 && i < accurrents.length) {
				if (accurrents[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_accurrent(i);
				}
			}
			if (i > -1 && i < squarewaves.length) {
				if (squarewaves[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_squarewave(i);
				}
			}
			if (i > -1 && i < sawwaves.length) {
				if (sawwaves[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_sawwave(i);
				}
			}
			if (i > -1 && i < trianglewaves.length) {
				if (trianglewaves[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_trianglewave(i);
				}
			}
			if (i > -1 && i < constants.length) {
				if (constants[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_constant(i);
				}
			}
			if (i > -1 && i < wires.length) {
				if (wires[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_wire(i);
				}
			}
			if (i > -1 && i < nets.length) {
				if (nets[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_net(i);
				}
			}
			if (i > -1 && i < notes.length) {
				if (notes[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_note(i);
				}
			}
			if (i > -1 && i < rails.length) {
				if (rails[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_rail(i);
				}
			}
			if (i > -1 && i < voltmeters.length) {
				if (voltmeters[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_voltmeter(i);
				}
			}
			if (i > -1 && i < ohmmeters.length) {
				if (ohmmeters[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_ohmmeter(i);
				}
			}
			if (i > -1 && i < ammeters.length) {
				if (ammeters[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_ammeter(i);
				}
			}
			if (i > -1 && i < wattmeters.length) {
				if (wattmeters[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_wattmeter(i);
				}
			}
			if (i > -1 && i < fuses.length) {
				if (fuses[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_fuse(i);
				}
			}
			if (i > -1 && i < spsts.length) {
				if (spsts[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_spst(i);
				}
			}
			if (i > -1 && i < spdts.length) {
				if (spdts[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_spdt(i);
				}
			}
			if (i > -1 && i < nots.length) {
				if (nots[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_not(i);
				}
			}
			if (i > -1 && i < diodes.length) {
				if (diodes[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_diode(i);
				}
			}
			if (i > -1 && i < leds.length) {
				if (leds[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_led(i);
				}
			}
			if (i > -1 && i < zeners.length) {
				if (zeners[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_zener(i);
				}
			}
			if (i > -1 && i < potentiometers.length) {
				if (potentiometers[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_potentiometer(i);
				}
			}
			if (i > -1 && i < ands.length) {
				if (ands[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_and(i);
				}
			}
			if (i > -1 && i < ors.length) {
				if (ors[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_or(i);
				}
			}
			if (i > -1 && i < nands.length) {
				if (nands[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_nand(i);
				}
			}
			if (i > -1 && i < nors.length) {
				if (nors[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_nor(i);
				}
			}
			if (i > -1 && i < xors.length) {
				if (xors[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_xor(i);
				}
			}
			if (i > -1 && i < xnors.length) {
				if (xnors[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_xnor(i);
				}
			}
			if (i > -1 && i < dffs.length) {
				if (dffs[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_dff(i);
				}
			}
			if (i > -1 && i < vsats.length) {
				if (vsats[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_vsat(i);
				}
			}
			if (i > -1 && i < adders.length) {
				if (adders[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_adder(i);
				}
			}
			if (i > -1 && i < subtractors.length) {
				if (subtractors[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_subtractor(i);
				}
			}
			if (i > -1 && i < multipliers.length) {
				if (multipliers[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_multiplier(i);
				}
			}
			if (i > -1 && i < dividers.length) {
				if (dividers[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_divider(i);
				}
			}
			if (i > -1 && i < gains.length) {
				if (gains[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_gain(i);
				}
			}
			if (i > -1 && i < absvals.length) {
				if (absvals[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_absval(i);
				}
			}
			if (i > -1 && i < vcsws.length) {
				if (vcsws[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_vcsw(i);
				}
			}
			if (i > -1 && i < vcvss.length) {
				if (vcvss[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_vcvs(i);
				}
			}
			if (i > -1 && i < vccss.length) {
				if (vccss[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_vccs(i);
				}
			}
			if (i > -1 && i < cccss.length) {
				if (cccss[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_cccs(i);
				}
			}
			if (i > -1 && i < ccvss.length) {
				if (ccvss[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_ccvs(i);
				}
			}
			if (i > -1 && i < opamps.length) {
				if (opamps[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_opamp(i);
				}
			}
			if (i > -1 && i < nmosfets.length) {
				if (nmosfets[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_nmosfet(i);
				}
			}
			if (i > -1 && i < pmosfets.length) {
				if (pmosfets[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_pmosfet(i);
				}
			}
			if (i > -1 && i < npns.length) {
				if (npns[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_npn(i);
				}
			}
			if (i > -1 && i < pnps.length) {
				if (pnps[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_pnp(i);
				}
			}
			if (i > -1 && i < adcs.length) {
				if (adcs[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_adc(i);
				}
			}
			if (i > -1 && i < dacs.length) {
				if (dacs[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_dac(i);
				}
			}
			if (i > -1 && i < sandhs.length) {
				if (sandhs[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_samplers(i);
				}
			}
			if (i > -1 && i < pwms.length) {
				if (pwms[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_pwm(i);
				}
			}
			if (i > -1 && i < integrators.length) {
				if (integrators[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_integrator(i);
				}
			}
			if (i > -1 && i < differentiators.length) {
				if (differentiators[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_differentiator(i);
				}
			}
			if (i > -1 && i < lowpasses.length) {
				if (lowpasses[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_lowpass(i);
				}
			}
			if (i > -1 && i < highpasses.length) {
				if (highpasses[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_highpass(i);
				}
			}
			if (i > -1 && i < relays.length) {
				if (relays[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_relay(i);
				}
			}
			if (i > -1 && i < pids.length) {
				if (pids[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_pid(i);
				}
			}
			if (i > -1 && i < luts.length) {
				if (luts[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_lut(i);
				}
			}
			if (i > -1 && i < vcrs.length) {
				if (vcrs[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_vcr(i);
				}
			}
			if (i > -1 && i < vccas.length) {
				if (vccas[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_vcca(i);
				}
			}
			if (i > -1 && i < vcls.length) {
				if (vcls[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_vcl(i);
				}
			}
			if (i > -1 && i < grts.length) {
				if (grts[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_grt(i);
				}
			}
			if (i > -1 && i < tptzs.length) {
				if (tptzs[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_tptz(i);
				}
			}
			if (i > -1 && i < transformers.length) {
				if (transformers[i].MULTI_SELECTED) {
					this.MULTI_DELETED_ELEMENT = true;
					engine_functions.remove_transformer(i);
				}
			}
			/* <!-- END AUTOMATICALLY GENERATED !--> */
		}
		if (this.MULTI_DELETED_ELEMENT) {
			global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			this.MULTI_DELETED_ELEMENT = false;
		}
	}
}
