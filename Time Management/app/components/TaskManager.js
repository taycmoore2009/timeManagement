import Marionette from 'backbone.marionette';
import template from '../templates/taskManager.jst';
import WeekManager from './WeekManager';

export default Marionette.View.extend({
  template: template,
  events: {
    "click .addNewRow": "addRow",
    "change .tasks": "updateTask"
  },
  regions: {
    week0: '.week0'
  },
  onRender: function() {
    var me = this;

    console.log(WeekManager);

    me.model.get("regions").forEach(function(region){
      var weekModel;

      me.showChildView(region, new WeekManager({
        model: me.model.get("weeks").get(region)
      }));

      me.getChildView(region).on("updateTotal", me.updateTotal.bind(me));

    });
  },
  addRow: function(){
    var newWeek = "week"+ this.model.get("regions").length;

    this.addRegion(newWeek, "."+ newWeek)

    this.model.get("regions").push(newWeek);
    this.model.get("weeks").push({
      id: newWeek, 
      days: [
        {day: "Sunday", hours: 0, notes: ""},
        {day: "Monday", hours: 0, notes: ""},
        {day: "Tuesday", hours: 0, notes: ""},
        {day: "Wednesday", hours: 0, notes: ""},
        {day: "Thursday", hours: 0, notes: ""},
        {day: "Friday", hours: 0, notes: ""},
        {day: "Saturday", hours: 0, notes: ""},
      ], 
      totalHours: 0, 
      task: ""});

    this.render();
  },
  updateTask: function(e){
    var week = $(e.currentTarget).data("week"),
        task = $(e.currentTarget).val();

    this.model.get("weeks").get(week).set("task", task);
  },
  updateTotal: function(e){
    var weeks = this.model.get("weeks"),
        newTotal = weeks.reduce(function(memo, item){
                    return memo + item.get("totalHours");
                  }, 0);
    this.model.set("totalTime", 0);
    this.$el.find(".footer .table-data").text("Total: "+ newTotal);
  }
});
