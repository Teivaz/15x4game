
var Time = {
    ticks: 0,
    day: 0,
    ear: 0,
    season: 'winter'
};

var TimeReact = React.createClass({
    getInitialState: function() {
        return {
            ticks: 0,
            day: 0,
            ear: 0,
            season: 'winter'
        };
    },

    tick: function () {

        var ticks = this.state.ticks + 1;
        this.setState({
            ticks: ticks,
            day:  ticks % 356,
            ear:  Math.floor(ticks / 356),
            season:  ['winter', 'spring', 'summer', 'autumn'][Math.floor((ticks % 356) / (356 / 4))],
        })

        message("A new day.");

        Player.tick();
        Gatherer.tick();
        Badge.tick();
        Civilization.tick();
        Dungeon.tick();
        Space.tick();
        Rally.tick();
        Castle.tick();
        Lecture.tick();
        Startup.tick();

        localStorage.setItem("Player", JSON.stringify(Player));
        localStorage.setItem("lectures.db", JSON.stringify(lectures.db));

        draw_all();
    },

    componentDidMount: function() {
        setInterval(this.tick, 1000, this); 
    },

    render: function() {
        Time.season = this.state.season;
        return (
            <div>
                <span> Ear: {this.state.ear} </span>    
                <span> Day: {this.state.day} </span>    
                <span> Season: {this.state.season} </span>    
            </div>
        );
    }
});

ReactDOM.render(
  <TimeReact />,
  document.getElementById('time_container')
);
