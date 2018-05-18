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
        weeks: [{week: "week0", days: [], totalHours: 0}]
      })
    });

    this.showView(taskManager);
    window.taskManager = taskManager;
  }
});
