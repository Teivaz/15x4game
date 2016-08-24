//var ReactDispatcher = require('react-flux-dispatcher');

var Civilization={
    happiness: 0,

    updates: {
        communication: new Billet('communication', {culture: culture_rate}, 1.6, "Raises culture soft-cap."),
        attentiveness: new Billet('attentiveness', {culture: culture_rate}, 1.7, "Soften culture soft-cap."),
        teamwork: new Billet('teamwork', {culture: culture_rate * 5}, 1.4, "Expands the maximum size of the teams."),
        sharing: new Billet('sharing', {culture: culture_rate * 10}, 1.7, "Expands maximum storage size."),
    },
    works: {
        popularization: new Workplace('popularization', {culture: culture_rate}, 1.4, "Slowly increase volunteers, consuming culture.",
            function () { return (Time.season == 'winter') ? 2 : 1; }),
        education: new Workplace('education', {culture: culture_rate}, 1.5, "Slowly increase knowledge, consuming enthusiasm.",
            function () { return (Time.season == 'autumn') ? 2 : 1; }),
        motivation: new Workplace('motivation', {culture: culture_rate}, 1.6, "Increases happiness, consuming culture.",
            function () { return (Time.season == 'spring') ? 2 : 1; }),
        activism: new Workplace('activism', {culture: culture_rate}, 1.7, "Decreases happiness, slowly increase enthusiasm and action points.",
            function () { return (Time.season == 'summer') ? 2 : 1; }),
    }
};
Civilization.getHappiness = function() {
    return 0;
}

Civilization.tick = function() {
    Player.culture_rate = 0;

    this.happiness = 0;

    Player.culture_soft_cap = (Civilization.updates.communication.level) * 10;
    if (!Player.culture_soft_cap) Player.culture_soft_cap = 10;
    if (Player.culture_soft_cap < 10) Player.culture_soft_cap = 10;

    var soft_cap = Math.sqrt(Player.culture - Player.culture_soft_cap);
    Player.culture_rate = Civilization.getHappiness() * Player.volunteers * 0.1 / (soft_cap ? (soft_cap / ((( Civilization.updates.attentiveness.level - 1) * 0.1) + 1)) : 1);
   // console.log(Player.culture_rate, Civilization.happiness, Player.volunteers, soft_cap);
    if (Player.culture_rate > 0) Player.reward('culture', Player.culture_rate, 1);

    if (Civilization.works.motivation.workers > 0 &&
        Player.withdraw('culture', Civilization.works.motivation.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.motivation.workers * 0.01;
        this.happiness += Civilization.works.motivation.getEfficiency() / Civilization.getHappiness();
    }

    if (Civilization.works.activism.workers > 0) {
        Player.culture_rate -= Civilization.works.activism.workers * 0.01;
        this.happiness -= Civilization.works.activism.getEfficiency() / Civilization.getHappiness();
        var debuff = Player.volunteers_memory * 1000 + Player.action_points * 1000 + (Player.likes + Player.design * 10 + Player.money * 100 + Player.ideas * 1000);
        Player.enthusiasm += Civilization.works.activism.getEfficiency() / Civilization.getHappiness() * 0.1 * Math.max(0, (-1 * Math.pow((Player.enthusiasm-100)/100, 3)));
        Player.action_points += Civilization.works.activism.getEfficiency() / Civilization.getHappiness() * 50 / (1 + debuff);
    }

    // enthusiasm boost happiness
    this.happiness += Player.enthusiasm;


    if (Civilization.works.popularization.workers > 0 &&
        Player.withdraw('culture', Civilization.works.popularization.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.popularization.workers * 0.01;
        var new_volunteers = Civilization.works.popularization.getEfficiency() * 0.5 * 0.01 * Math.max(100, 200 - Player.volunteers_memory) / Math.pow(Player.volunteers_memory, 2);
        Gatherer.found(new_volunteers);
        Player.volunteers += new_volunteers;
        Player.volunteers_memory += new_volunteers;
    }

    if (Civilization.works.education.workers > 0 &&
        Player.withdraw('enthusiasm', Civilization.works.education.workers * 0.01, 1)) {
        //Player.culture_rate -= Civilization.works.education.workers * 0.01;
        Player.revealSecret('knowledge');
        Player.knowledge += Civilization.works.education.getEfficiency() * 5 * 0.01 / (2 * (1 + Player.writing + Player.drawing + Player.programming + Player.management + 5*Player.knowledge + 0.5*Player.volunteers_memory));
    }

};

// TODO: remove this hackery
function fakeCivilization(self) {
    var fake = {
        updates: {communication:{},attentiveness:{},teamwork:{},sharing:{}},
        works: {popularization:{},education:{},motivation:{},activism:{}},
        getHappiness: self.getHappiness,
        tick: Civilization.tick,

        setState: self.setState.bind(self)
    };

    function prop(field, object, property) {
        Object.defineProperty(fake[field][object], property, {
            set: function(val) {var state={};state[property]=val;self.refs[object].setState(state);},
            get: function() {return self.refs[object].state[property];}
        })
    }
    Object.defineProperty(fake, 'happiness', {
        get: self.getHappiness,
        set: self.setHappiness
    });
    for(var key in fake.updates) {
        prop('updates', key, 'level');
    }
    for(var key in fake.works) {
        prop('works', key, 'level');
    }
    return fake;
}


// TODO: culture_rate should be in config
var CivilizationReact = React.createClass({
    updates: [
        {
            name: 'communication', 
            base_cost: {culture: culture_rate}, 
            cost_grow_rate: 1.6,
            text: 'Raises culture soft-cap.'
        },
        {
            name: 'attentiveness',
            base_cost: {culture: culture_rate},
            cost_grow_rate: 1.7,
            text: "Soften culture soft-cap."
        },
        {
            name: 'teamwork',
            base_cost: {culture: culture_rate * 5},
            cost_grow_rate: 1.4,
            text: 'Expands the maximum size of the teams.'
        },
        {
            name: 'sharing',
            base_cost: {culture: culture_rate * 10},
            cost_grow_rate: 1.7,
            text: 'Expands maximum storage size.'
        }
    ],
    works: [
        {
            name: 'popularization',
            base_cost: {culture: culture_rate},
            cost_grow_rate: 1.4, 
            text: "Slowly increase volunteers, consuming culture.",
            season: 'winter'
        },
        {
            name: 'education',
            base_cost: {culture: culture_rate},
            cost_grow_rate: 1.5,
            text: "Slowly increase knowledge, consuming enthusiasm.",
            season: 'autumn'
        },
        {
            name: 'motivation',
            base_cost: {culture: culture_rate},
            cost_grow_rate: 1.6,
            text: "Increases happiness, consuming culture.",
            season: 'spring'
        },
        {
            name: 'activism',
            base_cost: {culture: culture_rate},
            cost_grow_rate: 1.7,
            text: "Decreases happiness, slowly increase enthusiasm and action points.",
            season:'summer'
        }
    ],
    getInitialState: function(){
        // TODO: remove me if you dare
        Civilization = fakeCivilization(this);
        return {
            open: true,

            culture: 0,
            culture_soft_cap: 0,
            culture_rate: 0,
            season: 'winter',

            happiness: 0,
            secrets: [] //Player.found_secrets,
        };
    },
    componentDidMount: function() {
        system_events.player.register(this, this.setState);
        system_events.time.register(this, this.setState);
    },
    componentWillUpdate: function() {
        var refs = this.refs;
        var season = this.state.season;
        var volunteers = this.state.volunteers;
        this.works.forEach( function(work) {
            refs[work.name].setState({
                season: season,
                volunteers: volunteers
            });
        });
    },
    getHappiness: function() {
        return (1+(this.state.happiness / 100));
    },
    setHappiness: function(happiness) {
        this.setState({happiness: happiness});
    },
    onCollapse: function() {
        this.setState({open: !this.state.open});
    },
    unlockSecret: function(secret) {
        this.setState({secrets: this.state.secrets.concat(secret)});
    },
    render: function() {
        var culture = this.state.culture;
        var culture_soft_cap = this.state.culture_soft_cap;
        var happiness = this.state.happiness;
        var culture_rate = this.state.culture_rate;
        var secrets = this.state.secrets;
        function secretClass(item) {
            return (secrets.indexOf(item.name) != -1)
        }
        return (
            <div>
                <hr />
                <button className="collapsar" onClick={this.onCollapse}>
                    {this.state.open?'-':'+'}
                </button>
                <div>
                    Community. 
                    <span title="many factors can change happiness">
                        Happiness bonus: <span>{happiness.toFixed(2)}</span>%
                    </span>
                </div>
                <ProgressGauge text="Culture: " a={culture} b={culture_soft_cap} aToFixed='2' bToFixed='2'>
                    (<span>{culture_rate.toFixed(2)}</span>/day)
                </ProgressGauge>
                <ReactBootstrap.Collapse in={this.state.open}>
                    <div>
                    <div className="flex-container-column" id="culture">
                        <div className="flex-container-row" id="culture_updates">
                            {this.updates.map(function(update, i){
                                return <BilletReact secretClass={secretClass(update)} {...update} ref={update.name} key={i}/>
                            })}
                        </div>
                        <br />
                        <div className="flex-container-row" id="culture_works">
                            {this.works.map(function(work, i){
                                return <WorkplaceReact secretClass={secretClass(work)} {...work} ref={work.name} key={i}/>
                            })}
                        </div>
                    </div>
                    </div>
                </ReactBootstrap.Collapse>
            </div>
        )
    }
});
