import Marionette from 'backbone.marionette';
import template from '../templates/weekTemplate.jst';

export default Marionette.View.extend({
    template: template,
    events: {
        "change .day-hours": "updateHours",
        "click .showNotes": "showNotes",
        "blur textarea": "updateNotes"
    },
    updateHours: function(e){
        var $el = $(e.currentTarget),
            days = this.model.get("days"),
            total = 0;

        for(var index in days){
            if(days[index].day == $el.data("day")){
                days[index].hours = Number($el.val());
            }
            total += days[index].hours;
        }

        this.model.set("days", days);
        this.model.set("totalHours", total);
        this.trigger("updateTotal");
        this.$el.find(".total").text(total);
    },
    showNotes: function(e){
        if(!$(e.currentTarget).siblings(".day-popout").hasClass("hide")){
            $(e.currentTarget).siblings(".day-popout").toggleClass("hide");
        } else {
            $(".day-popout").addClass("hide");
            $(e.currentTarget).siblings(".day-popout").toggleClass("hide");
        }
    },
    updateNotes: function(e){
        var note = $(e.currentTarget).val(),
            days = this.model.get("days"),
            day = $(e.currentTarget).data("day");
        
        for(var index in days){
            if(days[index].day == day){
                days[index].notes = note;
                break;
            }
        }

        this.model.set("days", days);
    }
});
