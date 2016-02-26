module.exports = function recalc_params_for_resize(params){

  // Resetting some visualization parameters
  params = get_svg_dim(params);
  params = set_clust_width(params);
  params = is_force_square(params);  

  // zoom_switch from 1 to 2d zoom
  params.viz.zoom_switch = (params.viz.clust.dim.width / params.viz.num_col_nodes) / (params.viz.clust.dim.height / params.viz.num_row_nodes);

  // zoom_switch can not be less than 1
  if (params.viz.zoom_switch < 1) {
    params.viz.zoom_switch = 1;
  }

  // redefine x_scale and y_scale rangeBands
  params.matrix.x_scale.rangeBands([0, params.viz.clust.dim.width]);
  params.matrix.y_scale.rangeBands([0, params.viz.clust.dim.height]);

  // precalc rect_width and height
  params.matrix.rect_width = params.matrix.x_scale.rangeBand();
  params.matrix.rect_height = params.matrix.y_scale.rangeBand();

  // redefine zoom extent
  params.viz.real_zoom = params.norm_label.width.col / (params.matrix.rect_width/2);

  // redefine border width
  params.viz.border_width = params.matrix.rect_width / 55;

  // the default font sizes are set here
  params.labels.default_fs_row = params.matrix.rect_height * 1.07;
  params.labels.default_fs_col = params.matrix.rect_width * 0.87  ;

};