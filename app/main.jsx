
var Main = React.createClass({

    componentDidMount: function() {
        setInterval(this.tick, 1000, this); 
    },

    tick: function() {
        this.refs.Time.tick();
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

        message("A new day.");

        localStorage.setItem("Player", JSON.stringify(Player));
        localStorage.setItem("lectures.db", JSON.stringify(lectures.db));
        draw_all();
    },

    render: function() {
        return (
            <div>
                <TimeReact ref="Time"/>
            </div>
        )
    }
})

window.onload = function() {
    draw_all();

    ReactDOM.render(
        <Main />,
        //document.getElementById('main_content') // Uncomment when done
        document.getElementById('time_container')
    );

    Player.revealSecret('seek');
    Player.revealSecret('popularization');
    Player.revealSecret('communication');
    Player.revealSecret('attentiveness');
    //Player.revealSecret('motivation');
    events.db.push(Event.generator());

    var savedPlayer = JSON.parse(localStorage.getItem("Player"));
    if (savedPlayer) {
        console.log("savedPlayer" + savedPlayer);

        for (var i = 0; i < savedPlayer.volunteers_memory; i++) {
            Gatherer.found(1);
            Player.volunteers_memory++;
            Player.volunteers++;
        }
        Player.volunteers += savedPlayer.volunteers_memory - i;
        Player.volunteers_memory += savedPlayer.volunteers_memory - i;

        Player.race_win_points = savedPlayer.race_win_points;
        Player.race_win_points_memory = savedPlayer.race_win_points_memory;
    }

    var savedLectures = JSON.parse(localStorage.getItem("lectures.db"));
    if (savedLectures) {
        lectures.db = savedLectures;
    }
}