
// class Main should generate all page at the level of #main_container
// It should tick, set number of ticks/days/season to refs that need that


var Main = React.createClass({

    componentDidMount: function() {
        setInterval(this.tick, 1000, this); 
    },

    tick: function() {
        this.refs.Time.tick();

        Player.tick();
        system_events.player.dispatch({
            culture: Player.culture,
            volunteers: Player.volunteers,
            culture_soft_cap: Player.culture_soft_cap,
            culture_rate: Player.culture_rate
        });

        Gatherer.tick();
        Badge.tick();

        // TODO: replace with this.refs.civilization
        Civilization.tick();
        Dungeon.tick();
        Space.tick();
        Rally.tick();
        Castle.tick();
        Lecture.tick();
        Startup.tick();
        // remove it later
        //(window.LogSetTick && window.LogSetTick(ticks));

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

    document.getElementById('seek_container').onclick = Player.seek.bind(Player);
    document.getElementById('button_share_knowledge').onclick = Player.shareKnowledge.bind(Player);
    document.getElementById('reset_container').onclick = Player.reset.bind(Player);

    draw_all();

    ReactDOM.render(
        <Main />,
        //document.getElementById('main_container') // Uncomment when done
        document.getElementById('time_container')
    );
    ReactDOM.render(
        <CivilizationReact />,
        document.getElementById('culture_container')
    );
    ReactDOM.render(
        <SideBarReact />,
        document.getElementById('log_container')
    );

    Player.revealSecret('seek');
    Player.revealSecret('popularization');
    Player.revealSecret('communication');
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