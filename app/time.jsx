//var system_events = require('./system-events');

var Time = {
    season: 'winter'
};

var TimeReact = React.createClass({
    getInitialState: function() {
        return {
            ticks: 0,
            day: 0,
            year: 0,
            season: 'winter'
        };
    },

    tick: function () {
        var ticks = this.state.ticks + 1;
        var season = ['winter', 'spring', 'summer', 'autumn'][Math.floor((ticks % 365) / (365 / 4))];
        var state = {
            ticks: ticks,
            day:  ticks % 365,
            year:  Math.floor(ticks / 365),
            season: season,
        };
        this.setState(state);

        system_events.time.dispatch(state);
    },

    render: function() {
        Time.season = this.state.season;
        return (
            <div>
                <span> Year: </span> <span> {this.state.year} </span>
                <span> Day: </span> <span> {this.state.day} </span>
                <span> Season: </span> <span> {this.state.season} </span>
            </div>
        );
    }
});
