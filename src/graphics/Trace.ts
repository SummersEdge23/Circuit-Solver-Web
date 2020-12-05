/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Trace.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle the drawing of traces on the graph window.
 *
 * Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF PHASORSYSTEMS.
 *
 * Revision History  :
 *
 * Date        Author      	Ref    Revision (Date in YYYYMMDD format)
 * 20190928    nboatengc     1      Initial Commit.
 *
 ***********************************************************************/
class Trace {
  /* The trace path of the trace itself. */
  public trace_path: Path = new Path();
  /* The list of all the trace points magnitudes */
  public magnitude_list: Array<PointF> = [];
  /* The trace points that we will generate the path from. */
  public trace: Array<PointF> = [];
  /* The norm of the trace points (Maximum value) */
  public norm: number = 1;
  /* The last norm. This is used to track if the graph should be re-scaled. */
  public last_norm: number = 1;
  /* A temporary value we will be using for calculation. */
  public temporary_norm: number = 1;
  /* The bounds of the trace. */
  public bounds: RectF = new RectF(0, 0, 0, 0);
  /* The purpose of these variables is to genetate a bezier or quadratic curve from
two points calculating their mid-point. This is to ensure that the graph have curvature
but it passes through all the points generated from the solutions of the system. */
  /* A point used to calculate the path of the trace. */
  public previous_point: PointF = new PointF(0, 0);
  /* Another point used to calculate the path of the trace. */
  public current_point: PointF = new PointF(0, 0);
  /* Yet another point to calculate the path of the trace. */
  public mid_point: PointF = new PointF(0, 0);
  /* Trim on the left and right hand side of the trace (this is for the idea of inner and
outer bounds)*/
  public trim: number = 0;
  /* The width of the trace space */
  public width: number = 0;
  /* The height of the trace space */
  public height: number = 0;
  /* A helper variable used to store the magnitudes of the traces if they need to be re-scaled */
  public plot_magnitude: number = 0;
  /* A ratio of the spacing (in the y direction) of the traces. */
  public ratio: number = -1;
  /* The X-AXIS length of the trace */
  public X_AXIS_LENGTH: number = -1;
  /* The Y-AXIS length of the trace */
  public Y_AXIS_LENGTH: number = -1;
  /*  Trace Stroke Paint  */
  public trace_stroke_paint: Paint = new Paint();
  /* Trace Fill Paint  */
  public trace_fill_paint: Paint = new Paint();

  constructor(x_len: number, y_len: number, ratio: number) {
    /* The trace path of the trace itself. */
    this.trace_path = new Path();
    /* The list of all the trace points magnitudes */
    this.magnitude_list = [];
    /* The trace points that we will generate the path from. */
    this.trace = [];
    /* The norm of the trace points (Maximum value) */
    this.norm = 1;
    /* The last norm. This is used to track if the graph should be re-scaled. */
    this.last_norm = 1;
    /* A temporary value we will be using for calculation. */
    this.temporary_norm = 1;
    /* The bounds of the trace. */
    this.bounds = new RectF(0, 0, 0, 0);
    /* The purpose of these variables is to genetate a bezier or quadratic curve from
    two points calculating their mid-point. This is to ensure that the graph have curvature
    but it passes through all the points generated from the solutions of the system. */
    /* A point used to calculate the path of the trace. */
    this.previous_point = new PointF(0, 0);
    /* Another point used to calculate the path of the trace. */
    this.current_point = new PointF(0, 0);
    /* Yet another point to calculate the path of the trace. */
    this.mid_point = new PointF(0, 0);
    /* Trim on the left and right hand side of the trace (this is for the idea of inner and
  outer bounds)*/
    this.trim = 0;
    /* The width of the trace space */
    this.width = 0;
    /* The height of the trace space */
    this.height = 0;
    /* A helper variable used to store the magnitudes of the traces if they need to be re-scaled */
    this.plot_magnitude = 0;
    /* A ratio of the spacing (in the y direction) of the traces. */
    this.ratio = ratio;
    /* The X-AXIS length of the trace */
    this.X_AXIS_LENGTH = x_len;
    /* The Y-AXIS length of the trace */
    this.Y_AXIS_LENGTH = y_len;
    /*  Trace Stroke Paint  */
    this.trace_stroke_paint = new Paint();
    this.trace_stroke_paint.set_paint_style(this.trace_stroke_paint.style.STROKE);
    this.trace_stroke_paint.set_paint_cap(this.trace_stroke_paint.cap.ROUND);
    this.trace_stroke_paint.set_paint_join(this.trace_stroke_paint.join.MITER);
    this.trace_stroke_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.trace_stroke_paint.set_color(global.TRACE_DEFAULT_COLOR);
    this.trace_stroke_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.trace_stroke_paint.set_font(global.DEFAULT_FONT);
    this.trace_stroke_paint.set_alpha(255);
    this.trace_stroke_paint.set_paint_align(this.trace_stroke_paint.align.CENTER);
    /* Trace Fill Paint  */
    this.trace_fill_paint = new Paint();
    this.trace_fill_paint.set_paint_style(this.trace_fill_paint.style.FILL);
    this.trace_fill_paint.set_paint_cap(this.trace_fill_paint.cap.ROUND);
    this.trace_fill_paint.set_paint_join(this.trace_fill_paint.join.MITER);
    this.trace_fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.trace_fill_paint.set_color(global.TRACE_DEFAULT_COLOR);
    this.trace_fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.trace_fill_paint.set_font(global.DEFAULT_FONT);
    this.trace_fill_paint.set_alpha(255);
    this.trace_fill_paint.set_paint_align(this.trace_fill_paint.align.CENTER);
  }
  /* Set the color of the trace */
  set_color(color: string): void {
    this.trace_stroke_paint.set_color(color);
    this.trace_fill_paint.set_color(color);
  }
  /* Set the x axis length of the trace */
  set_x_axis_length(len: number): void {
    this.X_AXIS_LENGTH = len;
  }
  /* Set the the y axis length of the trace */
  set_y_axis_length(len: number): void {
    this.Y_AXIS_LENGTH = len;
  }
  /* Set the ratio of the trace */
  set_ratio(ratio: number): void {
    this.ratio = ratio;
  }
  /* Set the maximum width of the trace (spacial confinds) */
  set_width(width: number): void {
    this.width = width;
  }
  /* Set the maximum height of the trace (spacial confinds) */
  set_height(height: number): void {
    this.height = height;
  }
  /* Set the trim of the trace */
  set_trim(trim: number): void {
    this.trim = trim;
  }
  /* A nice function to handle updating all of the parameters of the trace at once. */
  update_parameters(bounds: RectF, ratio: number, width: number, height: number, trim: number): void {
    this.set_bounds(bounds);
    this.set_ratio(ratio);
    this.set_width(width);
    this.set_height(height);
    this.set_trim(trim);
  }
  /* Set the bounds of the trace */
  set_bounds(rect: RectF): void {
    this.bounds.left = rect.left;
    this.bounds.top = rect.top;
    this.bounds.right = rect.right;
    this.bounds.bottom = rect.bottom;
  }
  /* Resize the trace (dynamically) */
  resize_trace(): void {
    if (this.trace.length > 0) {
      this.trace_stroke_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
      this.trace_stroke_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
      this.trace_fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
      this.trace_fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
      let constant: number = this.width / (this.X_AXIS_LENGTH >> 1);
      let constant2: number = (this.height * this.ratio) / this.temporary_norm;
      for (var i: number = 0; i < this.trace.length; i++) {
        this.trace[i].x = i * constant + this.trim;
        if (this.temporary_norm > 0 && i < this.magnitude_list.length) {
          this.trace[i].y = this.magnitude_list[i].y * constant2;
        } else {
          this.trace[i].y = 0;
        }
      }
      this.create_path();
    }
  }
  /* Reset the trace. (Remove data and remove the trace path) */
  reset(): void {
    this.trace.splice(0, this.trace.length);
    this.magnitude_list.splice(0, this.magnitude_list.length);
    this.norm = 1;
    this.last_norm = 1;
    this.temporary_norm = 1;
    this.reset_path();
  }
  reset_path(): void {
    this.trace_path.reset();
  }
  /* Get a specific value of the trace at at specific index. */
  get_value(index: number): Array<string> {
    let ret: Array<string> = [];
    if (index > -1 && index < this.magnitude_list.length && index < Math.round(this.X_AXIS_LENGTH >> 1) - 2) {
      ret.push(global.exponentiate_quickly(this.magnitude_list[index].x));
      ret.push(global.exponentiate_quickly(-this.magnitude_list[index].y));
    }
    return ret;
  }
  /* Get a specific value of the trace at at specific index. */
  get_value_double(index: number): Array<number> {
    let ret: Array<number> = [];
    if (index > -1 && index < this.magnitude_list.length && index < Math.round(this.X_AXIS_LENGTH >> 1) - 2) {
      ret.push(this.magnitude_list[index].x);
      ret.push(-this.magnitude_list[index].y);
    }
    return ret;
  }
  /* Add a new entry to the trace. */
  push(value: number, t: number): void {
    value *= -1;
    if (Math.abs(value) < 1e-18) {
      value = 0;
    }
    this.magnitude_list.push(new PointF(t, value));
    this.last_norm = this.norm;
    this.norm = 0;
    this.plot_magnitude = 0;
    let abs_temp: number = 0;
    for (var i: number = 0; i < this.magnitude_list.length; i++) {
      abs_temp = Math.abs(this.magnitude_list[i].y);
      if (abs_temp > this.norm) {
        this.norm = abs_temp;
      }
    }
    this.norm = 2 * this.norm;
    this.temporary_norm = this.norm;
    if (this.last_norm != 0 && this.temporary_norm != 0) {
      let temp_div: number = this.last_norm / (this.height * this.ratio);
      let temp_const: number = (this.height * this.ratio) / this.temporary_norm;
      for (var i: number = 0; i < this.trace.length; i++) {
        this.plot_magnitude = this.trace[i].y * temp_div;
        this.trace[i].y = this.plot_magnitude * temp_const;
      }
    }
    let constant: number = this.width / (this.X_AXIS_LENGTH >> 1);
    let constant2: number = (this.height * this.ratio) / this.temporary_norm;
    if (this.temporary_norm > 0) {
      if (global.not_null(value / this.temporary_norm)) {
        this.trace.push(new PointF(this.trace.length * constant + this.trim, value * constant2));
      } else {
        this.trace.push(new PointF(this.trace.length * constant + this.trim, 0));
      }
      if (this.trace.length > this.X_AXIS_LENGTH >> 1) {
        this.trace.splice(0, 1);
        this.magnitude_list.splice(0, 1);
        for (var i: number = 0; i < this.trace.length; i++) {
          this.trace[i].x = i * constant + this.trim;
        }
      }
    } else {
      this.trace.push(new PointF(this.trace.length * constant + this.trim, 0));
      if (this.trace.length > this.X_AXIS_LENGTH >> 1) {
        this.trace.splice(0, 1);
        this.magnitude_list.splice(0, 1);
        for (var i: number = 0; i < this.trace.length; i++) {
          this.trace[i].x = i * constant + this.trim;
        }
      }
    }
    this.create_path();
  }
  /* Create the path of the trace based on the trace points */
  create_path(): void {
    if (this.trace.length > 0) {
      let temp_height: number = this.height >> 1;
      this.previous_point.set_point(this.trace[0].x, this.trace[0].y + this.bounds.top + temp_height);
      this.trace_path.reset();
      for (var i: number = 1; i < this.trace.length; i++) {
        this.current_point.set_point(this.trace[i].x, this.trace[i].y + this.bounds.top + temp_height);
        if (i === 0) {
          this.trace_path.move_to(this.current_point.x, this.current_point.y);
        } else {
          this.mid_point.set_point((this.previous_point.x + this.current_point.x) >> 1, (this.previous_point.y + this.current_point.y) >> 1);
          if (i === 1) {
            this.trace_path.line_to(this.mid_point.x, this.mid_point.y);
          } else {
            this.trace_path.quad_to(this.previous_point.x, this.previous_point.y, this.mid_point.x, this.mid_point.y);
          }
        }
        this.previous_point.set_point(this.current_point.x, this.current_point.y);
      }
      this.trace_path.line_to(this.previous_point.x, this.previous_point.y);
    }
  }
  /* Draw the trace itself! */
  draw_trace(canvas: GraphicsEngine, x_offset: number, y_offset: number): void {
    if (this.trace.length > 0) {
      canvas.draw_path2(this.trace_path, x_offset, y_offset, this.trace_stroke_paint);
    }
  }
}
