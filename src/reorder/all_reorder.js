var toggle_dendro_view = require('../dendrogram/toggle_dendro_view');

module.exports = function(params, inst_order, tmp_row_col) {

  // row/col names are swapped, will improve later
  var row_col;
  if (tmp_row_col==='row'){
    row_col = 'col';
  } else if (tmp_row_col === 'col'){
    row_col = 'row';
  }

  params.viz.run_trans = true;

  // save order state
  if (row_col === 'row'){
    params.viz.inst_order.row = inst_order;
  } else if (row_col === 'col'){
    params.viz.inst_order.col = inst_order;
  }

  toggle_dendro_view(params);

  var row_nodes_obj = params.network_data.row_nodes;
  var row_nodes_names = _.pluck(row_nodes_obj, 'name');

  var col_nodes_obj = params.network_data.col_nodes;
  var col_nodes_names = _.pluck(col_nodes_obj, 'name');

  if (row_col === 'row'){

    params.viz.x_scale
      .domain( params.matrix.orders[ params.viz.inst_order.row + '_row' ] );

  } else if (row_col == 'col') {

    params.viz.y_scale
      .domain( params.matrix.orders[ params.viz.inst_order.col + '_col' ] );

  }

  var t;

  // only animate transition if there are a small number of tiles
  if (d3.selectAll(params.root+' .tile')[0].length < params.matrix.def_large_matrix){

    // define the t variable as the transition function
    t = d3.select(params.root+' .clust_group')
      .transition().duration(2500);

    t.selectAll('.row')
      .attr('transform', function(d) {
        var tmp_index = _.indexOf(row_nodes_names, d.name);
        return 'translate(0,' + params.viz.y_scale(tmp_index) + ')';
        })
      .selectAll('.tile')
      .attr('transform', function(d) {
        return 'translate(' + params.viz.x_scale(d.pos_x) + ' , 0)';
      });

    t.selectAll('.tile_up')
      .attr('transform', function(d) {
        return 'translate(' + params.viz.x_scale(d.pos_x) + ' , 0)';
      });

    t.selectAll('.tile_dn')
      .attr('transform', function(d) {
        return 'translate(' + params.viz.x_scale(d.pos_x) + ' , 0)';
      });

    // Move Row Labels
    d3.select(params.root+' .row_label_zoom_container')
      .selectAll('.row_label_group')
      .transition().duration(2500)
      .attr('transform', function(d) {
        var inst_index = _.indexOf(row_nodes_names, d.name);
        return 'translate(0,' + params.viz.y_scale(inst_index) + ')';
      });

    // t.selectAll('.column')
    d3.select(params.root+' .col_zoom_container')
      .selectAll('.col_label_text')
      .transition().duration(2500)
      .attr('transform', function(d) {
        var inst_index = _.indexOf(col_nodes_names, d.name);
        return 'translate(' + params.viz.x_scale(inst_index) + ') rotate(-90)';
      });

    // reorder row_label_triangle groups
    d3.selectAll(params.root+' .row_cat_group')
      .transition().duration(2500)
      .attr('transform', function(d) {
        var inst_index = _.indexOf(row_nodes_names, d.name);
        return 'translate(0,' + params.viz.y_scale(inst_index) + ')';
      });

    // reorder col_class groups
    d3.selectAll(params.root+' .col_cat_group')
      .transition().duration(2500)
      .attr('transform', function(d) {
        var inst_index = _.indexOf(col_nodes_names, d.name);
        return 'translate(' + params.viz.x_scale(inst_index) + ',0)';
      });

  } else {

    // define the t variable as the transition function
    t = d3.select(params.root+' .clust_group');

    // reorder matrix
    t.selectAll('.row')
      .attr('transform', function(d) {
        var tmp_index = _.indexOf(row_nodes_names, d.name);
        return 'translate(0,' + params.viz.y_scale(tmp_index) + ')';
      })
      .selectAll('.tile')
      .attr('transform', function(d) {
        return 'translate(' + params.viz.x_scale(d.pos_x) + ' , 0)';
      });

    t.selectAll('.tile_up')
      .attr('transform', function(d) {
        return 'translate(' + params.viz.x_scale(d.pos_x) + ' , 0)';
      });

    t.selectAll('.tile_dn')
      .attr('transform', function(d) {
        return 'translate(' + params.viz.x_scale(d.pos_x) + ' , 0)';
      });

    // Move Row Labels
    d3.select(params.root+' .row_label_zoom_container')
      .selectAll('.row_label_group')
      .attr('transform', function(d) {
        var inst_index = _.indexOf(row_nodes_names, d.name);
        return 'translate(0,' + params.viz.y_scale(inst_index) + ')';
      });

    // t.selectAll('.column')
    d3.select(params.root+' .col_zoom_container')
      .selectAll('.col_label_text')
      .attr('transform', function(d) {
        var inst_index = _.indexOf(col_nodes_names,d.name);
        return 'translate(' + params.viz.x_scale(inst_index) + ') rotate(-90)';
      });

    // reorder row_label_triangle groups
    d3.selectAll(params.root+' .row_cat_group')
      .attr('transform', function(d) {
        var inst_index = _.indexOf(row_nodes_names,d.name);
        return 'translate(0,' + params.viz.y_scale(inst_index) + ')';
      });

    // reorder col_class groups
    d3.selectAll(params.root+' .col_cat_group')
      .attr('transform', function(d) {
        var inst_index = _.indexOf(col_nodes_names,d.name);
        return 'translate(' + params.viz.x_scale(inst_index) + ',0)';
      });

  }

  // redefine x and y positions
  params.network_data.links.forEach(function(d){
    d.x = params.viz.x_scale(d.target);
    d.y = params.viz.y_scale(d.source);
  });

  setTimeout(function(){
    params.viz.run_trans = false;
  }, 2500);


};
