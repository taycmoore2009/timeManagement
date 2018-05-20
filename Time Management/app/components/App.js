import Marionette from 'backbone.marionette';
import TaskManager from './TaskManager';

export default Marionette.Application.extend({
  region: '#app',

  onStart() {
    var taskManager = new TaskManager({
      model: new Backbone.Model({
        totalTime: 0,
        availableTasks: [
          {id: 1, name: "Project 1"},
          {id: 2, name: "Project 2"},
          {id: 3, name: "Project 3"},
          {id: 4, name: "Project 4"}
        ],
        regions: ["week0"],
        weeks: new Backbone.Collection([{
          id: "week0",
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
          task: ""
        }])
      })
    });

    this.showView(taskManager);
    window.taskManager = taskManager;
  }
});
