import Marionette from 'backbone.marionette';
import template from '../templates/taskManager.jst';
import WeekManager from './WeekManager';

export default Marionette.View.extend({
  template: template,
  events: {
    "click .addNewRow": "addRow"
  },
  regions: {
    week0: '.week0'
  },
  onRender: function() {
    var me = this;

    console.log(WeekManager);

    me.model.get("regions").forEach(function(region){
      var weekModel,
          weeks = me.model.get("weeks");

      for(var index in weeks){
        if(weeks[index].week == region){
          weekModel = weeks[index];
          break;
        }
      }
      me.showChildView(region, new WeekManager({
        model: new Backbone.Model({
          availableTasks: me.model.get("availableTasks"),
          totalHours: weekModel.totalHours,
          days: weekModel.days
        })
      }));
    });
  },
  addRow: function(){
    var newWeek = "week"+ this.model.get("regions").length;

    this.addRegion(newWeek, "."+ newWeek)

    this.model.get("regions").push(newWeek);
    this.model.get("weeks").push({week: newWeek, days: [], totalHours: 0});

    this.render();
  }
});
